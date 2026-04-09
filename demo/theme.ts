import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif` },
        body: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif` },
        mono: { value: `'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace` },
      },
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#b3d9ff' },
          200: { value: '#80bfff' },
          300: { value: '#4da6ff' },
          400: { value: '#1a8cff' },
          500: { value: '#0073e6' },
          600: { value: '#005ab4' },
          700: { value: '#004182' },
          800: { value: '#002851' },
          900: { value: '#001029' },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: { _light: 'gray.50', _dark: 'gray.900' },
      color: { _light: 'gray.800', _dark: 'whiteAlpha.900' },
    },
  },
})

export const system = createSystem(defaultConfig, config)
