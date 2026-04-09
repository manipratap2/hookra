import type { ComponentType } from 'react'
import type { FieldType } from '../types/schema'
import type { FieldRegistry } from './createRegistry'

import { TextField } from '../components/fields/TextField'
import { NumberField } from '../components/fields/NumberField'
import { TextareaField } from '../components/fields/TextareaField'
import { SelectField } from '../components/fields/SelectField'
import { MultiSelectField } from '../components/fields/MultiSelectField'
import { RadioField } from '../components/fields/RadioField'
import { CheckboxGroupField } from '../components/fields/CheckboxGroupField'
import { BooleanField } from '../components/fields/BooleanField'
import { DateField } from '../components/fields/DateField'
import { FileField } from '../components/fields/FileField'
import { SliderField } from '../components/fields/SliderField'
import { ColorField } from '../components/fields/ColorField'
import { HiddenField } from '../components/fields/HiddenField'
import { ArrayField } from '../components/fields/ArrayField'
import { ObjectField } from '../components/fields/ObjectField'
import { CustomField } from '../components/fields/CustomField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- registry must accept any field component props
const entries: [FieldType | string, ComponentType<any>][] = [
  ['text', TextField],
  ['email', TextField],
  ['password', TextField],
  ['url', TextField],
  ['tel', TextField],
  ['search', TextField],
  ['number', NumberField],
  ['integer', NumberField],
  ['textarea', TextareaField],
  ['select', SelectField],
  ['multiselect', MultiSelectField],
  ['radio', RadioField],
  ['checkboxgroup', CheckboxGroupField],
  ['boolean', BooleanField],
  ['switch', BooleanField],
  ['checkbox', BooleanField],
  ['date', DateField],
  ['time', DateField],
  ['datetime', DateField],
  ['file', FileField],
  ['slider', SliderField],
  ['color', ColorField],
  ['hidden', HiddenField],
  ['array', ArrayField],
  ['object', ObjectField],
  ['custom', CustomField],
]

export const defaultRegistry: FieldRegistry = new Map(entries)
