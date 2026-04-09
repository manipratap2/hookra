import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { useColorMode } from '../color-mode'
import {
  Check,
  Pencil,
  Lock,
  RefreshCw,
  Settings,
  Eye,
  Star,
  Info,
} from 'lucide-react'
import { currentVersion } from '../data/versions'

interface Feature {
  icon: typeof Check
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Pencil,
    title: '17+ Field Types',
    description: 'Text, number, select, radio, checkbox, date, time, file, slider, color, textarea, and more — all ready to use out of the box.',
  },
  {
    icon: Eye,
    title: 'Conditional Logic',
    description: 'Show or hide fields dynamically with dependsOn conditions. Supports equality, comparison, regex, compound AND/OR/NOT.',
  },
  {
    icon: Lock,
    title: 'Full TypeScript',
    description: 'Discriminated union types for every field schema. Full autocompletion, compile-time safety, and exported types for your own code.',
  },
  {
    icon: RefreshCw,
    title: 'Nested Structures',
    description: 'Object fields for grouped data and Array fields for dynamic lists. Add/remove rows, collapsible groups, and recursive nesting.',
  },
  {
    icon: Settings,
    title: 'Custom Components',
    description: 'Register your own field components via the registry API. Mix built-in and custom fields seamlessly in the same schema.',
  },
  {
    icon: Check,
    title: 'Built-in Validation',
    description: 'Leverages React Hook Form validation. Required, min/max, pattern, custom validators — with configurable error messages.',
  },
  {
    icon: Star,
    title: 'Grid Layout System',
    description: 'Responsive 12-column grid with friendly width aliases: full, half, third, quarter, two-thirds, three-quarters.',
  },
  {
    icon: Info,
    title: 'Programmatic Control',
    description: 'Access the form instance via ref. Programmatically submit, reset, set values, and read form state from parent components.',
  },
]

export function Features() {
  const current = currentVersion
  const { colorMode } = useColorMode()
  const cardBg = colorMode === 'dark' ? 'gray.800' : 'white'
  const cardBorder = colorMode === 'dark' ? 'gray.700' : 'gray.200'
  const iconBg = colorMode === 'dark' ? 'brand.900' : 'brand.50'
  const iconColor = colorMode === 'dark' ? 'brand.300' : 'brand.500'
  const descColor = colorMode === 'dark' ? 'gray.400' : 'gray.600'

  return (
    <Box py={{ base: '16', md: '24' }} id="features">
      <Container maxW="breakpoint-xl">
        <VStack gap="4" textAlign="center" mb="12">
          <Heading size="xl" letterSpacing="-0.03em">
            Everything you need to build forms
          </Heading>
          <Text color={descColor} maxW="600px" fontSize="lg">
            A complete toolkit for creating dynamic, validated forms from JSON — without writing
            repetitive JSX.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
          {features.map((feature) => (
            <Box
              key={feature.title}
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="xl"
              p="6"
              transition="all 0.2s"
              _hover={{
                borderColor: 'brand.300',
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
            >
              <VStack align="flex-start" gap="3">
                <Box bg={iconBg} p="2.5" borderRadius="lg">
                  <Icon as={feature.icon} boxSize="5" color={iconColor} />
                </Box>
                <Heading size="sm" fontWeight="600">{feature.title}</Heading>
                <Text fontSize="sm" color={descColor} lineHeight="tall">{feature.description}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <Box
          mt="16"
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorder}
          borderRadius="xl"
          p="8"
        >
          <Heading size="md" mb="4">What's in v{current.version}</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="2">
            {current.features.map((f, i) => (
              <Box key={i} display="flex" alignItems="flex-start" gap="2" py="1">
                <Icon as={Check} color="green.400" mt="1" flexShrink={0} boxSize="3" />
                <Text fontSize="sm" color={descColor}>{f}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
