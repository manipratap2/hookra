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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouterState, useNavigate, Link } from "@tanstack/react-router";
import { useColorMode } from "../color-mode";
import { CodeBlock } from "./CodeBlock";
import { currentVersion } from "../data/versions";

const validSections = [
  "installation",
  "quick-start",
  "basic-schema",
  "layout",
  "conditions",
  "custom",
];

function StepNumber({ n, bg }: { n: number; bg: string }) {
  return (
    <Box
      w="8"
      h="8"
      borderRadius="full"
      bg={bg}
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="700"
      fontSize="sm"
      flexShrink={0}
    >
      {n}
    </Box>
  );
}

function NextStepCard({
  label,
  to,
  params,
  cardBg,
  cardBorder,
  mutedColor,
}: {
  label: string;
  to: string;
  params: Record<string, string>;
  cardBg: string;
  cardBorder: string;
  mutedColor: string;
}) {
  return (
    <Box display="flex" justifyContent="flex-end" pt="4">
      <Link to={to} params={params} style={{ textDecoration: "none" }}>
        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorder}
          borderRadius="lg"
          px="5"
          py="3"
          _hover={{ borderColor: "brand.400" }}
          transition="border-color 0.15s"
        >
          <Text fontSize="xs" color={mutedColor} mb="0.5">
            Next
          </Text>
          <Text fontWeight="600" fontSize="sm">
            {label} →
          </Text>
        </Box>
      </Link>
    </Box>
  );
}

export function GetStarted({ section }: { section: string }) {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();

  useEffect(() => {
    if (!validSections.includes(section)) {
      navigate({
        to: "/get-started/$section",
        params: { section: "installation" },
        replace: true,
      });
      return;
    }
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [section, hash, navigate]);

  const { colorMode } = useColorMode();
  const cardBg = colorMode === "dark" ? "gray.800" : "white";
  const cardBorder = colorMode === "dark" ? "gray.700" : "gray.200";
  const mutedColor = colorMode === "dark" ? "gray.400" : "gray.600";
  const stepNumBg = colorMode === "dark" ? "brand.400" : "brand.500";
  const calloutBg = colorMode === "dark" ? "blue.900" : "blue.50";
  const calloutBorder = colorMode === "dark" ? "blue.700" : "blue.200";
  const calloutColor = colorMode === "dark" ? "blue.200" : "blue.700";

  const nextProps = { cardBg, cardBorder, mutedColor };

  return (
    <Container maxW="breakpoint-lg" py="12">
      <VStack gap="12" align="stretch">

        {/* ── Installation ───────────────────────────────────────────── */}
        {section === "installation" && (
          <>
            <VStack gap="3" align="flex-start">
              <HStack>
                <Heading size="xl" letterSpacing="-0.03em">
                  Get Started
                </Heading>
                <Badge colorPalette="brand" variant="subtle" fontSize="xs">
                  v{currentVersion.version}
                </Badge>
              </HStack>
              <Text color={mutedColor} fontSize="lg">
                Get up and running with Hookra in under 5 minutes.
              </Text>
            </VStack>

            <Box>
              <HStack gap="3" mb="4">
                <StepNumber n={1} bg={stepNumBg} />
                <Heading size="md">Install Hookra</Heading>
              </HStack>
              <Text color={mutedColor} mb="4">
                Install <Code>hookra</Code>:
              </Text>
              <Tabs.Root defaultValue="npm" variant="plain" colorPalette="brand" size="sm">
                <Tabs.List>
                  <Tabs.Trigger value="npm">npm</Tabs.Trigger>
                  <Tabs.Trigger value="yarn">yarn</Tabs.Trigger>
                  <Tabs.Trigger value="pnpm">pnpm</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="npm" px="0">
                  <CodeBlock code="npm install hookra" language="bash" filename="Terminal" />
                </Tabs.Content>
                <Tabs.Content value="yarn" px="0">
                  <CodeBlock code="yarn add hookra" language="bash" filename="Terminal" />
                </Tabs.Content>
                <Tabs.Content value="pnpm" px="0">
                  <CodeBlock code="pnpm add hookra" language="bash" filename="Terminal" />
                </Tabs.Content>
              </Tabs.Root>
            </Box>

            <Box>
              <HStack gap="3" mb="4">
                <StepNumber n={2} bg={stepNumBg} />
                <Heading size="md">Install peer dependencies</Heading>
              </HStack>
              <Text color={mutedColor} mb="4">
                Hookra requires{" "}
                <Code>@chakra-ui/react</Code>,{" "}
                <Code>@emotion/react</Code>, and{" "}
                <Code>react-hook-form</Code>. If they aren't already in your
                project, add them now:
              </Text>
              <Tabs.Root defaultValue="npm" variant="plain" colorPalette="brand" size="sm">
                <Tabs.List>
                  <Tabs.Trigger value="npm">npm</Tabs.Trigger>
                  <Tabs.Trigger value="yarn">yarn</Tabs.Trigger>
                  <Tabs.Trigger value="pnpm">pnpm</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="npm" px="0">
                  <CodeBlock
                    code="npm install @chakra-ui/react @emotion/react react-hook-form"
                    language="bash"
                    filename="Terminal"
                  />
                </Tabs.Content>
                <Tabs.Content value="yarn" px="0">
                  <CodeBlock
                    code="yarn add @chakra-ui/react @emotion/react react-hook-form"
                    language="bash"
                    filename="Terminal"
                  />
                </Tabs.Content>
                <Tabs.Content value="pnpm" px="0">
                  <CodeBlock
                    code="pnpm add @chakra-ui/react @emotion/react react-hook-form"
                    language="bash"
                    filename="Terminal"
                  />
                </Tabs.Content>
              </Tabs.Root>
            </Box>

            <NextStepCard
              label="Quick Start"
              to="/get-started/$section"
              params={{ section: "quick-start" }}
              {...nextProps}
            />
          </>
        )}

        {/* ── Quick Start ────────────────────────────────────────────── */}
        {section === "quick-start" && (
          <>
            <VStack gap="3" align="flex-start">
              <Heading size="xl" letterSpacing="-0.03em">
                Quick Start
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                A minimal working form in three steps.
              </Text>
            </VStack>

            <Box>
              <HStack gap="3" mb="4">
                <StepNumber n={1} bg={stepNumBg} />
                <Heading size="md">Wrap your app with ChakraProvider</Heading>
              </HStack>
              <Text color={mutedColor} mb="4">
                Hookra renders Chakra UI components, so your app needs a{" "}
                <Code>ChakraProvider</Code> at the root. If you already have
                one, skip this step.
              </Text>
              <CodeBlock
                code={`// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)`}
                language="tsx"
                filename="main.tsx"
                showLineNumbers
              />
              <Box
                mt="4"
                p="4"
                bg={calloutBg}
                border="1px solid"
                borderColor={calloutBorder}
                borderRadius="lg"
              >
                <Text fontSize="sm" color={calloutColor} lineHeight="tall">
                  <strong>Custom theme?</strong> Pass your own system instead of{" "}
                  <Code fontSize="xs">defaultSystem</Code>:{" "}
                  <Code fontSize="xs">
                    {"createSystem(defaultConfig, { theme: { … } })"}
                  </Code>
                </Text>
              </Box>
            </Box>

            <Box>
              <HStack gap="3" mb="4">
                <StepNumber n={2} bg={stepNumBg} />
                <Heading size="md">Define a schema</Heading>
              </HStack>
              <Text color={mutedColor} mb="4">
                Describe your form as a plain object — no JSX needed.
              </Text>
              <CodeBlock
                code={`// schema.ts
import type { FormSchema } from 'hookra'

export const contactSchema: FormSchema = {
  title: 'Contact Us',
  fields: [
    { name: 'name',    type: 'text',     label: 'Name',    required: true },
    { name: 'email',   type: 'email',    label: 'Email',   required: true },
    { name: 'message', type: 'textarea', label: 'Message', rows: 4 },
  ],
}`}
                language="ts"
                filename="schema.ts"
                showLineNumbers
              />
            </Box>

            <Box>
              <HStack gap="3" mb="4">
                <StepNumber n={3} bg={stepNumBg} />
                <Heading size="md">Render FormBuilder</Heading>
              </HStack>
              <Text color={mutedColor} mb="4">
                Pass the schema and an <Code>onSubmit</Code> handler — that's
                it.
              </Text>
              <CodeBlock
                code={`// ContactForm.tsx
import { FormBuilder } from 'hookra'
import { contactSchema } from './schema'

export function ContactForm() {
  return (
    <FormBuilder
      schema={contactSchema}
      onSubmit={(data) => console.log(data)}
    />
  )
}`}
                language="tsx"
                filename="ContactForm.tsx"
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
                <Text fontSize="sm" color={mutedColor} lineHeight="tall">
                  The form renders with labels, validation, and a submit button
                  out of the box. The <Code fontSize="xs">data</Code> object
                  passed to <Code fontSize="xs">onSubmit</Code> is keyed by
                  each field's <Code fontSize="xs">name</Code>.
                </Text>
              </Box>
            </Box>

            <NextStepCard
              label="Basic Schema"
              to="/get-started/$section"
              params={{ section: "basic-schema" }}
              {...nextProps}
            />
          </>
        )}

        {/* ── Basic Schema ───────────────────────────────────────────── */}
        {section === "basic-schema" && (
          <>
            <VStack gap="3" align="flex-start">
              <Heading size="xl" letterSpacing="-0.03em">
                Basic Schema
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                A fuller contact form showing validation, multi-column layout,
                and select options.
              </Text>
            </VStack>

            <Box>
              <Heading size="sm" mb="3">
                Schema
              </Heading>
              <CodeBlock
                code={`import type { FormSchema } from 'hookra'

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
                language="ts"
                filename="schema.ts"
                showLineNumbers
              />
            </Box>

            <Box>
              <Heading size="sm" mb="3">
                Component
              </Heading>
              <CodeBlock
                code={`import { FormBuilder } from 'hookra'
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

            <NextStepCard
              label="Layout & Columns"
              to="/get-started/$section"
              params={{ section: "layout" }}
              {...nextProps}
            />
          </>
        )}

        {/* ── Layout ─────────────────────────────────────────────────── */}
        {section === "layout" && (
          <>
            <VStack gap="3" align="flex-start">
              <Heading size="xl" letterSpacing="-0.03em">
                Layout & Columns
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                Control the grid at the form level, then override per field.
              </Text>
            </VStack>

            <Box>
              <Text color={mutedColor} mb="4">
                Set <Code>layout.columns</Code> on the form (or a section), then
                use the <Code>width</Code> property on individual fields to span
                more or fewer columns:
              </Text>
              <CodeBlock
                code={`// Width aliases map to a 12-column grid:
// 'full'           → 12 cols
// 'half'           → 6 cols
// 'third'          → 4 cols
// 'quarter'        → 3 cols
// 'two-thirds'     → 8 cols
// 'three-quarters' → 9 cols
// Or use a number: 1–12

const schema: FormSchema = {
  layout: { columns: 2 },
  fields: [
    { name: 'first', type: 'text',     label: 'First', width: 'half' },
    { name: 'last',  type: 'text',     label: 'Last',  width: 'half' },
    { name: 'bio',   type: 'textarea', label: 'Bio',   width: 'full' },
  ],
}`}
                language="ts"
                filename="layout-example.ts"
                showLineNumbers
              />
            </Box>

            <NextStepCard
              label="Conditional Fields"
              to="/get-started/$section"
              params={{ section: "conditions" }}
              {...nextProps}
            />
          </>
        )}

        {/* ── Conditions ─────────────────────────────────────────────── */}
        {section === "conditions" && (
          <>
            <VStack gap="3" align="flex-start">
              <Heading size="xl" letterSpacing="-0.03em">
                Conditional Fields
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                Show or hide fields based on other field values using{" "}
                <Code>dependsOn</Code>.
              </Text>
            </VStack>

            <Box>
              <Text color={mutedColor} mb="4">
                When a field is hidden it is unmounted and its value is removed
                from the form data automatically.
              </Text>
              <CodeBlock
                code={`// Simple: show when field equals value
{
  name: 'otherRole',
  type: 'text',
  label: 'Describe your role',
  dependsOn: { field: 'role', value: 'other' },
}

// With an operator
{
  name: 'seniorOptions',
  type: 'select',
  label: 'Department',
  dependsOn: { field: 'age', operator: 'gte', value: 18 },
}

// Compound — OR
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
                language="ts"
                filename="conditions-example.ts"
                showLineNumbers
              />
            </Box>

            <Box
              p="4"
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="lg"
            >
              <Heading size="xs" mb="2">
                Available operators
              </Heading>
              <Text fontSize="sm" color={mutedColor} fontFamily="mono" lineHeight="tall">
                eq · ne · gt · gte · lt · lte · in · nin · contains ·
                startsWith · endsWith · matches · empty · notEmpty · truthy ·
                falsy
              </Text>
            </Box>

            <NextStepCard
              label="Custom Components"
              to="/get-started/$section"
              params={{ section: "custom" }}
              {...nextProps}
            />
          </>
        )}

        {/* ── Custom Components ──────────────────────────────────────── */}
        {section === "custom" && (
          <>
            <VStack gap="3" align="flex-start">
              <Heading size="xl" letterSpacing="-0.03em">
                Custom Components
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                Register your own field components via the{" "}
                <Code>registry</Code> prop.
              </Text>
            </VStack>

            <Box>
              <CodeBlock
                code={`import { FormBuilder, createRegistry, defaultRegistry } from 'hookra'
import type { FieldComponentProps } from 'hookra'

// 1. Build your component
function RichTextEditor({ field, fieldSchema }: FieldComponentProps) {
  return (
    <MyRichEditor
      value={field.value}
      onChange={field.onChange}
      placeholder={fieldSchema.placeholder}
    />
  )
}

// 2. Merge it into the default registry
const registry = createRegistry(defaultRegistry, {
  richtext: RichTextEditor,
})

// 3. Reference it in the schema
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
              p="6"
            >
              <Heading size="sm" mb="3">
                You're all set
              </Heading>
              <Text color={mutedColor} lineHeight="tall" mb="4">
                Check out the{" "}
                <Link to="/examples" style={{ textDecoration: "underline" }}>
                  Examples
                </Link>{" "}
                to see live forms in action, or open the{" "}
                <Link
                  to="/api/$section"
                  params={{ section: "formbuilder" }}
                  style={{ textDecoration: "underline" }}
                >
                  API Reference
                </Link>{" "}
                for the full prop, type, and utility docs.
              </Text>
            </Box>
          </>
        )}

      </VStack>
    </Container>
  );
}
