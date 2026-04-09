import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Tabs,
  Code,
  List,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useColorMode } from "../color-mode";
import { CodeBlock } from "./CodeBlock";

const validSections = [
  "installation",
  "quick-start",
  "basic-schema",
  "layout",
  "conditions",
  "custom",
];

export function GetStarted({ section }: { section: string }) {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();

  useEffect(() => {
    if (!validSections.includes(section)) {
      navigate({ to: "/get-started/$section", params: { section: "installation" }, replace: true });
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
  const stepNumBg = colorMode === "dark" ? "brand.400" : "brand.500";

  return (
    <Container maxW="breakpoint-lg" py="12">
      <VStack gap="12" align="stretch">
        {section === "installation" && (
          <>
            <VStack gap="3" align="flex-start">
              <HStack>
                <Heading size="xl" letterSpacing="-0.03em">
                  Get Started
                </Heading>
                <Badge colorPalette="brand" variant="subtle" fontSize="xs">
                  v1.0.0
                </Badge>
              </HStack>
              <Text color={mutedColor} fontSize="lg">
                Get up and running with Formora in under 5 minutes.
              </Text>
            </VStack>

            <Box>
              <Heading size="md" mb="4">
                Prerequisites
              </Heading>
              <Text color={mutedColor} mb="3">
                Formora requires the following peer dependencies:
              </Text>
              <Box
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="xl"
                p="5"
              >
                <List.Root as="ol" gap="2" color={mutedColor} fontSize="sm">
                  <List.Item>
                    <Code>react</Code> &gt;= 18.0.0
                  </List.Item>
                  <List.Item>
                    <Code>react-hook-form</Code> &gt;= 7.0.0
                  </List.Item>
                  <List.Item>
                    <Code>@chakra-ui/react</Code> &gt;= 3.0.0 (with{" "}
                    <Code>@emotion/react</Code>)
                  </List.Item>
                </List.Root>
              </Box>
            </Box>

            <Box>
              <HStack gap="3" mb="4">
                <Box
                  w="8"
                  h="8"
                  borderRadius="full"
                  bg={stepNumBg}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="700"
                  fontSize="sm"
                  flexShrink={0}
                >
                  1
                </Box>
                <Heading size="md">Installation</Heading>
              </HStack>

              <Text color={mutedColor} mb="4">
                Install <Code>formora</Code> and its peer dependencies:
              </Text>

              <Tabs.Root
                defaultValue="npm"
                variant="plain"
                colorPalette="brand"
                size="sm"
              >
                <Tabs.List>
                  <Tabs.Trigger value="npm">npm</Tabs.Trigger>
                  <Tabs.Trigger value="yarn">yarn</Tabs.Trigger>
                  <Tabs.Trigger value="pnpm">pnpm</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="npm" px="0">
                  <CodeBlock
                    code="npm install formora"
                    language="bash"
                    filename="Terminal"
                  />
                </Tabs.Content>
                <Tabs.Content value="yarn" px="0">
                  <CodeBlock
                    code="yarn add formora"
                    language="bash"
                    filename="Terminal"
                  />
                </Tabs.Content>
                <Tabs.Content value="pnpm" px="0">
                  <CodeBlock
                    code="pnpm add formora"
                    language="bash"
                    filename="Terminal"
                  />
                </Tabs.Content>
              </Tabs.Root>
            </Box>
          </>
        )}

        {section === "quick-start" && (
          <Box>
            <HStack gap="3" mb="4">
              <Box
                w="8"
                h="8"
                borderRadius="full"
                bg={stepNumBg}
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize="sm"
                flexShrink={0}
              >
                2
              </Box>
              <Heading size="md">Set Up ChakraProvider</Heading>
            </HStack>

            <Text color={mutedColor} mb="4">
              Wrap your app (or the relevant subtree) with{" "}
              <Code>ChakraProvider</Code>:
            </Text>

            <CodeBlock
              code={`import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { FormBuilder } from 'formora'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* Your app content */}
    </ChakraProvider>
  )
}`}
              language="tsx"
              filename="App.tsx"
              showLineNumbers
            />
          </Box>
        )}

        {section === "basic-schema" && (
          <>
            <Box>
              <HStack gap="3" mb="4">
                <Box
                  w="8"
                  h="8"
                  borderRadius="full"
                  bg={stepNumBg}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="700"
                  fontSize="sm"
                  flexShrink={0}
                >
                  3
                </Box>
                <Heading size="md">Define Your Form Schema</Heading>
              </HStack>

              <Text color={mutedColor} mb="4">
                Create a <Code>FormSchema</Code> object that describes your
                form's fields, layout, and validation:
              </Text>

              <CodeBlock
                code={`import type { FormSchema } from 'formora'

const contactSchema: FormSchema = {
  title: 'Contact Us',
  description: 'Fill out the form below and we will get back to you.',
  layout: { columns: 2 },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: 'Name is required',
      width: 'half',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      width: 'half',
    },
    {
      name: 'subject',
      type: 'select',
      label: 'Subject',
      options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing' },
      ],
      required: true,
      width: 'full',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      rows: 4,
      maxLength: 500,
      showCount: true,
      required: true,
      width: 'full',
    },
  ],
}`}
                language="tsx"
                filename="schema.ts"
                showLineNumbers
              />
            </Box>

            <Box>
              <HStack gap="3" mb="4">
                <Box
                  w="8"
                  h="8"
                  borderRadius="full"
                  bg={stepNumBg}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="700"
                  fontSize="sm"
                  flexShrink={0}
                >
                  4
                </Box>
                <Heading size="md">Render the Form</Heading>
              </HStack>

              <Text color={mutedColor} mb="4">
                Pass the schema and an <Code>onSubmit</Code> handler to{" "}
                <Code>FormBuilder</Code>:
              </Text>

              <CodeBlock
                code={`import { FormBuilder } from 'formora'
import { contactSchema } from './schema'

function ContactPage() {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log('Form submitted:', data)
  }

  return (
    <FormBuilder
      schema={contactSchema}
      onSubmit={handleSubmit}
    />
  )
}`}
                language="tsx"
                filename="ContactPage.tsx"
                showLineNumbers
              />
            </Box>
          </>
        )}

        {section === "layout" && (
          <Box>
            <Heading size="md" mb="4">
              Layout & Columns
            </Heading>
            <Text color={mutedColor} mb="4">
              Control layout with the <Code>layout.columns</Code> property at
              the form or section level, and set per-field width using the{" "}
              <Code>width</Code> property:
            </Text>

            <CodeBlock
              code={`// Width aliases map to a 12-column grid:
// 'full'           → 12 columns
// 'half'           → 6 columns
// 'third'          → 4 columns
// 'quarter'        → 3 columns
// 'two-thirds'     → 8 columns
// 'three-quarters' → 9 columns
// Or use a number: 1–12

const schema: FormSchema = {
  layout: { columns: 2 },
  fields: [
    { name: 'first', type: 'text', label: 'First', width: 'half' },
    { name: 'last',  type: 'text', label: 'Last',  width: 'half' },
    { name: 'bio',   type: 'textarea', label: 'Bio', width: 'full' },
  ],
}`}
              language="tsx"
              filename="layout-example.ts"
              showLineNumbers
            />
          </Box>
        )}

        {section === "conditions" && (
          <Box>
            <Heading size="md" mb="4">
              Conditional Fields
            </Heading>
            <Text color={mutedColor} mb="4">
              Use the <Code>dependsOn</Code> property to show/hide fields based
              on other field values. When a field is hidden, it is unmounted and
              its value is cleared.
            </Text>

            <CodeBlock
              code={`// Simple: show when field equals value
{
  name: 'otherRole',
  type: 'text',
  label: 'Describe your role',
  dependsOn: { field: 'role', value: 'other' },
}

// With operators
{
  name: 'seniorOptions',
  type: 'select',
  label: 'Department',
  dependsOn: { field: 'age', operator: 'gte', value: 18 },
}

// Compound: AND / OR / NOT
{
  name: 'state',
  type: 'text',
  label: 'State',
  dependsOn: {
    any: [
      { field: 'country', value: 'us' },
      { field: 'country', value: 'ca' },
    ],
  },
}`}
              language="tsx"
              filename="conditions-example.ts"
              showLineNumbers
            />

            <Box
              mt="4"
              p="4"
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="lg"
            >
              <Heading size="xs" mb="2">
                Available Operators
              </Heading>
              <Text
                fontSize="sm"
                color={mutedColor}
                fontFamily="mono"
                lineHeight="tall"
              >
                eq · ne · gt · gte · lt · lte · in · nin · contains · startsWith
                · endsWith · matches · empty · notEmpty · truthy · falsy
              </Text>
            </Box>
          </Box>
        )}

        {section === "custom" && (
          <>
            <Box>
              <Heading size="md" mb="4">
                Custom Components
              </Heading>
              <Text color={mutedColor} mb="4">
                Register custom field components via the <Code>registry</Code>{" "}
                prop to extend FormBuilder with your own UI:
              </Text>

              <CodeBlock
                code={`import { FormBuilder, createRegistry, defaultRegistry } from 'formora'
import type { FieldComponentProps } from 'formora'

// 1. Create your custom component
function RichTextEditor({ field, fieldSchema }: FieldComponentProps) {
  return (
    <MyRichEditor
      value={field.value}
      onChange={field.onChange}
      placeholder={fieldSchema.placeholder}
    />
  )
}

// 2. Create a merged registry
const registry = createRegistry(defaultRegistry, {
  richtext: RichTextEditor,
})

// 3. Use it in your schema
const schema: FormSchema = {
  fields: [
    { name: 'content', type: 'custom', component: 'richtext', label: 'Content' },
  ],
}

// 4. Pass the registry to FormBuilder
<FormBuilder schema={schema} onSubmit={handleSubmit} registry={registry} />`}
                language="tsx"
                filename="custom-component.tsx"
                showLineNumbers
              />
            </Box>

            <Box
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="xl"
              p="8"
            >
              <Heading size="md" mb="3">
                Next Steps
              </Heading>
              <Text color={mutedColor} lineHeight="tall">
                Check out the Examples to see live forms in action, or dive into
                the API Reference for the complete documentation of every prop,
                type, and utility.
              </Text>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
}
