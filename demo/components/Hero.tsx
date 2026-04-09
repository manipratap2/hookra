import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Badge,
  Wrap,
} from '@chakra-ui/react'
import { useColorMode } from '../color-mode'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { InlineCodeCopy } from './CodeBlock'
import { currentVersion } from '../data/versions'

export function Hero() {
  const { colorMode } = useColorMode()
  const gradientFrom = colorMode === 'dark' ? 'gray.900' : 'brand.50'
  const gradientTo = colorMode === 'dark' ? 'gray.800' : 'white'
  const subtitleColor = colorMode === 'dark' ? 'gray.400' : 'gray.600'
  const tagBg = colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.100'
  const tagColor = colorMode === 'dark' ? 'gray.400' : 'gray.600'

  return (
    <Box
      bgGradient={`linear(to-b, ${gradientFrom}, ${gradientTo})`}
      pt={{ base: '16', md: '24' }}
      pb={{ base: '16', md: '20' }}
    >
      <Container maxW="breakpoint-lg">
        <VStack gap="8" textAlign="center">
          <Badge
            colorPalette="brand"
            variant="subtle"
            px="3"
            py="1"
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
          >
            v{currentVersion.version}
          </Badge>

          <VStack gap="4">
            <Heading
              as="h1"
              size="3xl"
              lineHeight="1.1"
              letterSpacing="-0.04em"
              fontWeight="800"
            >
              Build forms from{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, brand.400, brand.600)"
                bgClip="text"
              >
                JSON schemas
              </Text>
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={subtitleColor}
              maxW="640px"
              lineHeight="tall"
            >
              A type-safe, JSON-driven form builder powered by{' '}
              <Text as="span" fontWeight="600">React Hook Form</Text> and{' '}
              <Text as="span" fontWeight="600">Chakra UI</Text>.
              Conditional logic, nested structures, validation, and 17+ field types — all from a simple schema.
            </Text>
          </VStack>

          <Box w={{ base: '100%', sm: '420px' }}>
            <InlineCodeCopy code="npm install hookra" prefix="$" />
          </Box>

          <HStack gap="4">
            <Button asChild size="lg" colorPalette="brand" px="8">
              <Link to="/get-started">
                Get Started <ArrowRight size={16} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              px="8"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub <ExternalLink size={16} />
              </a>
            </Button>
          </HStack>

          <Wrap justify="center" gap="3" pt="4">
            {[
              'TypeScript',
              'React 19+',
              'Chakra UI v3',
              'React Hook Form v7',
              'Tree-Shakable',
              'Zero Side Effects',
            ].map((tag) => (
              <Badge
                key={tag}
                bg={tagBg}
                color={tagColor}
                px="3"
                py="1"
                borderRadius="full"
                fontWeight="500"
                fontSize="xs"
                textTransform="none"
              >
                {tag}
              </Badge>
            ))}
          </Wrap>
        </VStack>
      </Container>
    </Box>
  )
}
