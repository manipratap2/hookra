import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Code,
  Grid,
} from "@chakra-ui/react";
import { useColorMode } from "../color-mode";
import { Check, Eye, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FormBuilder } from "hookra";
import { CodeBlock } from "./CodeBlock";
import { toaster } from "../toaster";
import {
  allExamples,
  exampleCategories,
  getExampleById,
  type ExampleDef,
} from "../data/examples";

interface ExamplesProps {
  section?: string;
}

interface ResultPanelProps {
  data: unknown;
}

function ResultPanel({ data }: ResultPanelProps) {
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "gray.950" : "gray.900";
  const headerBg = colorMode === "dark" ? "green.900" : "green.50";
  const headerBorder = colorMode === "dark" ? "green.700" : "green.200";

  if (!data) return null;
  return (
    <Box
      mt="6"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor={headerBorder}
    >
      <Box
        bg={headerBg}
        px="4"
        py="2.5"
        borderBottom="1px solid"
        borderColor={headerBorder}
      >
        <HStack>
          <Check size={12} color="var(--chakra-colors-green-500)" />
          <Badge colorPalette="green" variant="subtle" fontSize="xs">
            Submitted
          </Badge>
          <Text fontSize="xs" color="green.600">
            Form values (JSON)
          </Text>
        </HStack>
      </Box>
      <Box p="4" bg={bg} overflowX="auto">
        <Code
          display="block"
          whiteSpace="pre"
          fontSize="xs"
          fontFamily="mono"
          color="green.300"
          bg="transparent"
        >
          {JSON.stringify(data, null, 2)}
        </Code>
      </Box>
    </Box>
  );
}

function ExampleDemo({ example }: { example: ExampleDef }) {
  const [lastSubmit, setLastSubmit] = useState<unknown>(null);
  const [view, setView] = useState<"preview" | "schema">("preview");
  const { colorMode } = useColorMode();
  const cardBg = colorMode === "dark" ? "gray.800" : "white";
  const cardBorder = colorMode === "dark" ? "gray.700" : "gray.200";
  const mutedColor = colorMode === "dark" ? "gray.400" : "gray.600";
  const toggleBg = colorMode === "dark" ? "gray.900" : "gray.100";

  const schemaCode = useMemo(
    () => JSON.stringify(example.schema, null, 2),
    [example.schema],
  );

  return (
    <VStack gap="6" align="stretch">
      <Box>
        <Text color={mutedColor} mb="3">
          {example.description}
        </Text>
        <HStack gap="2" flexWrap="wrap">
          {example.features.map((f) => (
            <Badge key={f} variant="subtle" colorPalette="brand" fontSize="2xs">
              {f}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="xl"
        overflow="hidden"
      >
        <HStack
          px={{ base: "3", sm: "6" }}
          py="3"
          justify="space-between"
          flexWrap="wrap"
          gap="2"
          borderBottom="1px solid"
          borderColor={cardBorder}
        >
          <Badge
            colorPalette={view === "preview" ? "green" : "purple"}
            variant="subtle"
            fontSize="xs"
          >
            {view === "preview" ? "Live Preview" : "Schema (JSON)"}
          </Badge>
          <HStack gap="0" bg={toggleBg} p="0.5" borderRadius="lg">
            <Button
              size="xs"
              variant={view === "preview" ? "solid" : "ghost"}
              colorPalette="brand"
              onClick={() => setView("preview")}
              borderRadius="md"
              fontWeight="600"
              fontSize="xs"
            >
              <Eye size={14} />
              Preview
            </Button>
            <Button
              size="xs"
              variant={view === "schema" ? "solid" : "ghost"}
              colorPalette="brand"
              onClick={() => setView("schema")}
              borderRadius="md"
              fontWeight="600"
              fontSize="xs"
            >
              <Code2 size={14} />
              Schema
            </Button>
          </HStack>
        </HStack>

        <Box p={{ base: "3", sm: "6" }}>
          {view === "preview" ? (
            <>
              <FormBuilder
                schema={example.schema}
                readOnly={example.readOnly}
                onlyDirty={example.onlyDirty}
                onFill={example.onFill}
                onSubmit={(data) => {
                  setLastSubmit(data);
                  toaster.create({
                    title: "Form submitted!",
                    description: "Check the output below.",
                    type: "success",
                    duration: 3000,
                  });
                }}
              />
              <ResultPanel data={lastSubmit} />
            </>
          ) : (
            <CodeBlock code={schemaCode} language="json" showLineNumbers />
          )}
        </Box>
      </Box>
    </VStack>
  );
}

function ExampleGrid({ onSelect }: { onSelect: (id: string) => void }) {
  const { colorMode } = useColorMode();
  const cardBg = colorMode === "dark" ? "gray.800" : "white";
  const cardBorder = colorMode === "dark" ? "gray.700" : "gray.200";
  const hoverBorder = colorMode === "dark" ? "brand.400" : "brand.500";
  const mutedColor = colorMode === "dark" ? "gray.400" : "gray.600";

  return (
    <VStack gap="10" align="stretch">
      {exampleCategories.map((cat) => (
        <Box key={cat.id}>
          <Heading size="md" mb="4" letterSpacing="-0.02em">
            {cat.title}
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap="4"
          >
            {cat.examples.map((ex) => (
              <Box
                key={ex.id}
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="xl"
                p="5"
                cursor="pointer"
                transition="all 0.15s"
                _hover={{ borderColor: hoverBorder, shadow: "md" }}
                onClick={() => onSelect(ex.id)}
              >
                <Text fontWeight="600" mb="1">
                  {ex.title}
                </Text>
                <Text fontSize="sm" color={mutedColor} lineClamp={2} mb="3">
                  {ex.description}
                </Text>
                <HStack gap="1.5" flexWrap="wrap">
                  {ex.features.slice(0, 3).map((f) => (
                    <Badge
                      key={f}
                      variant="subtle"
                      colorPalette="gray"
                      fontSize="2xs"
                    >
                      {f}
                    </Badge>
                  ))}
                  {ex.features.length > 3 && (
                    <Badge variant="subtle" colorPalette="gray" fontSize="2xs">
                      +{ex.features.length - 3}
                    </Badge>
                  )}
                </HStack>
              </Box>
            ))}
          </Grid>
        </Box>
      ))}
    </VStack>
  );
}

export function Examples({ section }: ExamplesProps) {
  const { colorMode } = useColorMode();
  const mutedColor = colorMode === "dark" ? "gray.400" : "gray.600";
  const navigate = useNavigate();

  const example = section ? getExampleById(section) : undefined;

  // Find prev/next for navigation
  const currentIdx = example
    ? allExamples.findIndex((e) => e.id === example.id)
    : -1;
  const prevExample = currentIdx > 0 ? allExamples[currentIdx - 1] : undefined;
  const nextExample =
    currentIdx >= 0 && currentIdx < allExamples.length - 1
      ? allExamples[currentIdx + 1]
      : undefined;

  return (
    <Container maxW="breakpoint-lg" py={{ base: "6", md: "12" }} px={{ base: "4", md: "6" }}>
      <VStack gap="8" align="stretch">
        {example ? (
          <>
            <VStack gap="1" align="flex-start">
              <HStack gap="2">
                <Badge colorPalette="gray" variant="subtle" fontSize="2xs">
                  {example.category}
                </Badge>
              </HStack>
              <Heading size={{ base: "lg", md: "xl" }} letterSpacing="-0.03em">
                {example.title}
              </Heading>
            </VStack>
            <ExampleDemo key={example.id} example={example} />
            <HStack justify="space-between" pt="4" flexWrap="wrap" gap="2">
              {prevExample ? (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/examples" search={{ section: prevExample.id }}>
                    <ChevronLeft size={14} /> {prevExample.title}
                  </Link>
                </Button>
              ) : (
                <Box />
              )}
              {nextExample ? (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/examples" search={{ section: nextExample.id }}>
                    {nextExample.title} <ChevronRight size={14} />
                  </Link>
                </Button>
              ) : (
                <Box />
              )}
            </HStack>
          </>
        ) : (
          <>
            <VStack gap="3" align="flex-start">
              <Heading size="xl" letterSpacing="-0.03em">
                Examples
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                {allExamples.length} interactive examples showcasing the full
                capabilities of Hookra. Click any card to see the live
                demo.
              </Text>
            </VStack>
            <ExampleGrid
              onSelect={(id) => {
                navigate({ to: "/examples", search: { section: id } });
              }}
            />
          </>
        )}
      </VStack>
    </Container>
  );
}
