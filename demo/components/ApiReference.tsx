import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Code,
  Table,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useColorMode } from "../color-mode";
import { CodeBlock } from "./CodeBlock";
import { currentVersion } from "../data/versions";

interface PropRowData {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

function PropsTable({ rows }: { rows: PropRowData[] }) {
  const { colorMode } = useColorMode();
  const headerBg = colorMode === "dark" ? "gray.700" : "gray.50";
  const borderColor = colorMode === "dark" ? "gray.600" : "gray.200";
  const codeBg = colorMode === "dark" ? "whiteAlpha.200" : "gray.100";
  const mutedColor = colorMode === "dark" ? "gray.400" : "gray.600";

  return (
    <Box
      overflowX="auto"
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
    >
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={headerBg}>
            <Table.ColumnHeader borderColor={borderColor} fontSize="xs">
              Prop
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor={borderColor} fontSize="xs">
              Type
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor={borderColor} fontSize="xs">
              Default
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor={borderColor} fontSize="xs">
              Description
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell
                borderColor={borderColor}
                fontFamily="mono"
                fontSize="xs"
                fontWeight="600"
              >
                <HStack gap="1">
                  <Text>{row.name}</Text>
                  {row.required && (
                    <Text color="red.400" fontSize="xs">
                      *
                    </Text>
                  )}
                </HStack>
              </Table.Cell>
              <Table.Cell borderColor={borderColor}>
                <Code fontSize="xs" bg={codeBg} px="1.5" py="0.5">
                  {row.type}
                </Code>
              </Table.Cell>
              <Table.Cell
                borderColor={borderColor}
                fontSize="xs"
                color={mutedColor}
                fontFamily="mono"
              >
                {row.default || "\u2014"}
              </Table.Cell>
              <Table.Cell
                borderColor={borderColor}
                fontSize="xs"
                color={mutedColor}
              >
                {row.description}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

const formBuilderProps: PropRowData[] = [
  {
    name: "schema",
    type: "FormSchema",
    description: "The JSON schema defining form structure, fields, and layout.",
    required: true,
  },
  {
    name: "onSubmit",
    type: "(data) => void",
    description:
      "Callback fired with form values when the form is submitted successfully.",
    required: true,
  },
  {
    name: "onCancel",
    type: "() => void",
    description:
      "Optional callback for a Cancel button. Button only appears when provided.",
  },
  {
    name: "defaultValues",
    type: "Record<string, any>",
    description:
      "Override default values from the schema. Merged with schema-level defaults.",
  },
  {
    name: "registry",
    type: "FieldRegistry",
    description:
      "Custom field component registry, created via createRegistry().",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Renders all fields in read-only mode.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading spinner on the submit button.",
  },
  {
    name: "mode",
    type: "ValidationMode",
    default: '"onBlur"',
    description:
      "React Hook Form validation mode: onChange, onBlur, onSubmit, onTouched, all.",
  },
  {
    name: "submitButton",
    type: "ReactNode | false",
    description: "Custom submit button or false to hide the default one.",
  },
  {
    name: "cancelButton",
    type: "ReactNode | false",
    description: "Custom cancel button or false to hide the default one.",
  },
];

const formSchemaProps: PropRowData[] = [
  {
    name: "title",
    type: "string",
    description: "Form title displayed at the top.",
  },
  {
    name: "description",
    type: "string",
    description: "Form description/helper text below the title.",
  },
  {
    name: "layout",
    type: "FormLayout",
    description:
      "Layout configuration. Currently supports { columns: number }.",
  },
  {
    name: "fields",
    type: "FieldSchema[]",
    description: "Flat list of fields. Use fields OR sections, not both.",
  },
  {
    name: "sections",
    type: "FormSection[]",
    description:
      "Sectioned layout with optional titles and per-section columns.",
  },
  {
    name: "submitLabel",
    type: "string",
    default: '"Submit"',
    description: "Custom label for the submit button.",
  },
  {
    name: "showReset",
    type: "boolean",
    default: "false",
    description: "Show a Reset button next to Submit.",
  },
  {
    name: "resetLabel",
    type: "string",
    default: '"Reset"',
    description: "Custom label for the reset button.",
  },
];

const baseFieldProps: PropRowData[] = [
  {
    name: "name",
    type: "string",
    description:
      "Unique field key used as form value path. Supports dot notation.",
    required: true,
  },
  {
    name: "type",
    type: "FieldType",
    description: "The field type (text, email, select, radio, etc).",
    required: true,
  },
  {
    name: "label",
    type: "string",
    description: "Displayed label. Omit to hide the label.",
  },
  {
    name: "description",
    type: "string",
    description: "Helper text shown below the field.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text for the input.",
  },
  {
    name: "defaultValue",
    type: "unknown",
    description: "Default value for the field.",
  },
  {
    name: "required",
    type: "boolean | string",
    default: "false",
    description: "Mark as required. Pass a string for a custom error message.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the field input.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Make the field read-only.",
  },
  {
    name: "hidden",
    type: "boolean",
    default: "false",
    description: "Completely hide and exclude from form values.",
  },
  {
    name: "width",
    type: "FieldWidth",
    description:
      "Grid column span: 'full', 'half', 'third', 'quarter', 'two-thirds', 'three-quarters', or 1-12.",
  },
  {
    name: "validation",
    type: "FieldValidation",
    description:
      "Validation rules: required, min, max, minLength, maxLength, pattern, validate.",
  },
  {
    name: "dependsOn",
    type: "Condition",
    description:
      "Conditional visibility. Field is unmounted and value cleared when hidden.",
  },
  {
    name: "props",
    type: "Record<string, any>",
    description: "Extra props forwarded to the underlying Chakra component.",
  },
];

const validationProps: PropRowData[] = [
  {
    name: "required",
    type: "boolean | string",
    description: "Mark as required. String value becomes the error message.",
  },
  {
    name: "min",
    type: "number | { value, message }",
    description: "Minimum numeric value.",
  },
  {
    name: "max",
    type: "number | { value, message }",
    description: "Maximum numeric value.",
  },
  {
    name: "minLength",
    type: "number | { value, message }",
    description: "Minimum string length.",
  },
  {
    name: "maxLength",
    type: "number | { value, message }",
    description: "Maximum string length.",
  },
  {
    name: "pattern",
    type: "string | { value, message }",
    description: 'Regex pattern (as string). For example: "^[a-z]+$".',
  },
  {
    name: "validate",
    type: 'RegisterOptions["validate"]',
    description: "Named custom validator functions from React Hook Form.",
  },
];

const validApiSections = [
  "formbuilder",
  "schema",
  "fields",
  "conditions",
  "validation",
  "registry",
];

export function ApiReference({ section }: { section: string }) {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();

  useEffect(() => {
    if (!validApiSections.includes(section)) {
      navigate({ to: "/api/$section", params: { section: "formbuilder" }, replace: true });
      return;
    }
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [section, hash, navigate]);

  const { colorMode } = useColorMode();
  const cardBg = colorMode === "dark" ? "gray.800" : "white";
  const cardBorder = colorMode === "dark" ? "gray.700" : "gray.200";
  const mutedColor = colorMode === "dark" ? "gray.400" : "gray.600";

  return (
    <Container maxW="breakpoint-lg" py="12">
      <VStack gap="12" align="stretch">
        {section === "formbuilder" && (
          <>
            <VStack gap="3" align="flex-start">
              <HStack>
                <Heading size="xl" letterSpacing="-0.03em">
                  API Reference
                </Heading>
                <Badge colorPalette="brand" variant="subtle" fontSize="xs">
                  v{currentVersion.version}
                </Badge>
              </HStack>
              <Text color={mutedColor} fontSize="lg">
                Complete reference for all components, types, and utilities.
              </Text>
            </VStack>

            <Box>
              <Heading size="lg" mb="2">
                {"<FormBuilder />"}
              </Heading>
              <Text color={mutedColor} mb="6">
                The main component. Pass a schema and an onSubmit handler to
                render a complete form.
              </Text>

              <CodeBlock
                code={`import { FormBuilder } from 'hookra'

<FormBuilder
  schema={mySchema}
  onSubmit={(data) => console.log(data)}
  mode="onBlur"
  loading={isSubmitting}
/>`}
                language="tsx"
                filename="Usage"
              />

              <Heading size="sm" mt="6" mb="3">
                Props
              </Heading>
              <PropsTable rows={formBuilderProps} />

              <Heading size="sm" mt="6" mb="3">
                Ref Methods
              </Heading>
              <Text color={mutedColor} fontSize="sm" mb="3">
                Access imperative methods via{" "}
                <Code fontSize="xs">React.useRef&lt;FormBuilderRef&gt;</Code>:
              </Text>
              <Box
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="xl"
                p="5"
              >
                <VStack align="stretch" gap="2" fontSize="sm">
                  <HStack>
                    <Code fontSize="xs">form</Code>
                    <Text color={mutedColor}>
                      — React Hook Form's UseFormReturn instance
                    </Text>
                  </HStack>
                  <HStack>
                    <Code fontSize="xs">submit()</Code>
                    <Text color={mutedColor}>
                      — Programmatically trigger form submission
                    </Text>
                  </HStack>
                  <HStack>
                    <Code fontSize="xs">reset()</Code>
                    <Text color={mutedColor}>
                      — Reset form to default values
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          </>
        )}

        {section === "schema" && (
          <Box>
            <Heading size="lg" mb="2">
              FormSchema
            </Heading>
            <Text color={mutedColor} mb="6">
              The root schema type that defines the form's structure.
            </Text>
            <PropsTable rows={formSchemaProps} />

            <Heading size="sm" mt="6" mb="3">
              FormSection
            </Heading>
            <Text color={mutedColor} fontSize="sm" mb="3">
              When using <Code fontSize="xs">sections</Code> instead of{" "}
              <Code fontSize="xs">fields</Code>, each section can have its own
              title, columns, and collapsible behavior:
            </Text>
            <CodeBlock
              code={`interface FormSection {
  title?: string
  description?: string
  fields: FieldSchema[]
  columns?: number
  collapsible?: boolean
  defaultCollapsed?: boolean
  dependsOn?: Condition
}`}
              language="tsx"
              filename="FormSection type"
            />
          </Box>
        )}

        {section === "fields" && (
          <Box>
            <Heading size="lg" mb="2">
              Field Types
            </Heading>
            <Text color={mutedColor} mb="6">
              All fields extend <Code fontSize="xs">BaseField</Code> with
              type-specific properties.
            </Text>

            <Heading size="sm" mb="3">
              BaseField (shared properties)
            </Heading>
            <PropsTable rows={baseFieldProps} />

            <Heading size="sm" mt="8" mb="3">
              Available Types
            </Heading>

            <Box
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="xl"
              overflow="hidden"
            >
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row bg={colorMode === "dark" ? "gray.700" : "gray.50"}>
                    <Table.ColumnHeader borderColor={cardBorder} fontSize="xs">
                      Category
                    </Table.ColumnHeader>
                    <Table.ColumnHeader borderColor={cardBorder} fontSize="xs">
                      Types
                    </Table.ColumnHeader>
                    <Table.ColumnHeader borderColor={cardBorder} fontSize="xs">
                      Extra Props
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body fontSize="xs">
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Text
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      text, email, password, url, tel, search
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      prefix, suffix
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Numeric
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      number, integer
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      min, max, step, precision
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Textarea
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      textarea
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      rows, resize, maxLength, showCount
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Choice
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      select, multiselect, radio, checkboxgroup
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      options, direction, min, max
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Toggle
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      boolean, switch, checkbox
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      checkboxLabel
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Date/Time
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      date, time, datetime
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      min, max
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Slider
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      slider
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      min, max, step, showValue
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Color
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      color
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      {"\u2014"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      File
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      file
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      accept, multiple, maxSize
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Hidden
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      hidden
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      defaultValue (required)
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Array
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      array
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      itemSchema, minItems, maxItems
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Object
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      object
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      fields, collapsible
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell borderColor={cardBorder} fontWeight="600">
                      Custom
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} fontFamily="mono">
                      custom
                    </Table.Cell>
                    <Table.Cell borderColor={cardBorder} color={mutedColor}>
                      component (registry key)
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        )}

        {section === "conditions" && (
          <Box>
            <Heading size="lg" mb="2">
              Conditions
            </Heading>
            <Text color={mutedColor} mb="6">
              The <Code fontSize="xs">dependsOn</Code> property accepts a{" "}
              <Code fontSize="xs">Condition</Code> type for conditional field
              visibility.
            </Text>
            <CodeBlock
              code={`type Condition = SimpleCondition | CompoundCondition

interface SimpleCondition {
  field: string
  operator?: ConditionOperator  // Default: "eq"
  value?: unknown
}

interface CompoundCondition {
  all?: Condition[]   // AND
  any?: Condition[]   // OR
  not?: Condition     // Negate
}

type ConditionOperator =
  | 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'in' | 'nin' | 'contains' | 'startsWith'
  | 'endsWith' | 'matches' | 'empty' | 'notEmpty'
  | 'truthy' | 'falsy'`}
              language="tsx"
              filename="Condition types"
              showLineNumbers
            />
          </Box>
        )}

        {section === "validation" && (
          <Box>
            <Heading size="lg" mb="2">
              Validation
            </Heading>
            <Text color={mutedColor} mb="6">
              Validation rules are passed via the{" "}
              <Code fontSize="xs">validation</Code> property on each field.
            </Text>
            <PropsTable rows={validationProps} />
            <CodeBlock
              code={`validation: {
  minLength: { value: 8, message: 'Must be at least 8 characters' },
  pattern: {
    value: '(?=.*[A-Z])(?=.*[0-9])',
    message: 'Must contain uppercase and number',
  },
  validate: {
    noSpaces: (v) => !v.includes(' ') || 'No spaces allowed',
  },
}`}
              language="tsx"
              filename="Validation examples"
              showLineNumbers
            />
          </Box>
        )}

        {section === "registry" && (
          <Box>
            <Heading size="lg" mb="2">
              Registry
              <Badge colorPalette="green" ml="2" fontSize="xs" variant="subtle">
                New
              </Badge>
            </Heading>
            <Text color={mutedColor} mb="6">
              The registry system lets you register custom field components or
              override built-in ones.
            </Text>
            <CodeBlock
              code={`import { createRegistry, defaultRegistry } from 'hookra'

const registry = createRegistry(defaultRegistry, {
  'my-datepicker': MyDatePicker,
  'rich-editor': MyRichEditor,
})

// Use in schema with type: 'custom'
{
  name: 'publishDate',
  type: 'custom',
  component: 'my-datepicker',
  label: 'Publish Date',
}`}
              language="tsx"
              filename="Registry API"
              showLineNumbers
            />
          </Box>
        )}
      </VStack>
    </Container>
  );
}
