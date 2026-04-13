import { useEffect, useRef, useCallback } from 'react'
import { useWatch, useFormContext } from 'react-hook-form'
import type { FillFrom } from '../types/schema'

export type FillFetcher = (params: {
  /** The name of the field that carries `fillFrom` */
  field: string
  /** The name of the trigger field */
  trigger: string
  /** Current value of the trigger field */
  value: unknown
}) => Promise<Record<string, unknown>>

export interface UseFillFromOptions {
  /** Name of the field that owns this fillFrom config */
  fieldName: string
  fillFrom: FillFrom
  fetcher: FillFetcher
  /** Notifies the owner field whether a fetch is in flight */
  onLoadingChange?: (loading: boolean) => void
}

/**
 * Watches a trigger field, debounces the change, then calls the user-supplied
 * fetcher and merges the returned values into the form.
 *
 * Design goals (performance):
 * - AbortController cancels in-flight requests when a new value arrives
 * - Debounce avoids hammering the API while the user types
 * - Stores last-seen trigger value in a ref so React re-renders do NOT
 *   cause extra fetches (only real value changes do)
 * - Uses useCallback/useRef to keep stable references — zero extra re-renders
 * - Accepts `null` options to be safely called unconditionally (no-op path),
 *   satisfying Rules of Hooks without conditional hook calls in consumers.
 */
export function useFillFrom(options: UseFillFromOptions | null): void {
  const { setValue } = useFormContext()
  // When options is null we watch a dummy field name — this is intentional:
  // we must call useWatch unconditionally to satisfy Rules of Hooks.
  const triggerValue = useWatch({ name: options?.fillFrom.trigger ?? '__fill_unused__' })

  const fillFrom = options?.fillFrom
  const fetcher = options?.fetcher
  const fieldName = options?.fieldName ?? ''
  const onLoadingChange = options?.onLoadingChange

  // Track the last value we actually fetched for, to skip duplicate calls
  const lastFetchedValue = useRef<unknown>(Symbol('unset'))
  // AbortController ref — cancelled when a new fetch supersedes the previous one
  const abortRef = useRef<AbortController | null>(null)
  // Debounce timer ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debounceMs = fillFrom?.debounce ?? 300
  const targets = fillFrom?.targets ?? '*'

  const applyResult = useCallback(
    (data: Record<string, unknown>) => {
      if (targets === '*') {
        for (const [key, val] of Object.entries(data)) {
          setValue(key, val, { shouldDirty: true, shouldValidate: false })
        }
      } else {
        for (const key of targets) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            setValue(key, data[key], { shouldDirty: true, shouldValidate: false })
          }
        }
      }
    },
    // setValue is stable from RHF; targets stringified to detect array identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, targets === '*' ? '*' : (targets as string[]).join(',')],
  )

  useEffect(() => {
    // No-op when hook was called without options (field has no fillFrom config)
    if (!fillFrom || !fetcher) return

    // Skip if the value hasn't actually changed (covers initial mount when
    // trigger is empty string / undefined — we don't want a fetch on mount
    // unless the trigger already has a meaningful value)
    if (triggerValue === lastFetchedValue.current) return
    // Don't fire when trigger value is empty / nullish
    if (triggerValue == null || triggerValue === '') return

    // Clear any pending debounce timer
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(async () => {
      // Cancel previous in-flight request
      if (abortRef.current) {
        abortRef.current.abort()
      }
      const controller = new AbortController()
      abortRef.current = controller

      lastFetchedValue.current = triggerValue
      onLoadingChange?.(true)

      try {
        const data = await fetcher({
          field: fieldName,
          trigger: fillFrom.trigger,
          value: triggerValue,
        })

        // Guard: if this request was aborted by a newer one, discard the result
        if (controller.signal.aborted) return

        applyResult(data)
      } catch {
        // Ignore AbortError silently; surface other errors only in dev.
        // We avoid process.env and import.meta.env to stay framework-agnostic;
        // bundlers replace the boolean literal at build time so it tree-shakes.
        if (!controller.signal.aborted) {
          console.warn(`[hookra] fillFrom fetch failed for field "${fieldName}"`)
        }
      } finally {
        if (!controller.signal.aborted) {
          onLoadingChange?.(false)
        }
      }
    }, debounceMs)

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
    }
  // applyResult is memoised; fetcher/onLoadingChange expected stable from consumer
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerValue])
}
