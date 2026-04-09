import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Icon,
} from '@chakra-ui/react'
import { useColorMode } from '../color-mode'
import { Check } from 'lucide-react'
import { useVersion } from '../context/VersionContext'

export function Changelog() {
  const { all } = useVersion()
  const { colorMode } = useColorMode()
  const cardBg = colorMode === 'dark' ? 'gray.800' : 'white'
  const cardBorder = colorMode === 'dark' ? 'gray.700' : 'gray.200'
  const mutedColor = colorMode === 'dark' ? 'gray.400' : 'gray.600'
  const lineBg = colorMode === 'dark' ? 'gray.600' : 'gray.200'

  return (
    <Box py={{ base: '16', md: '24' }} id="changelog">
      <Container maxW="breakpoint-lg">
        <VStack gap="4" textAlign="center" mb="12">
          <Heading size="xl" letterSpacing="-0.03em">Changelog</Heading>
          <Text color={mutedColor} fontSize="lg">
            Release history and what changed in each version.
          </Text>
        </VStack>

        <VStack gap="0" align="stretch" position="relative">
          <Box
            position="absolute"
            left={{ base: '16px', md: '20px' }}
            top="24px"
            bottom="24px"
            w="2px"
            bg={lineBg}
          />

          {all.map((version, idx) => (
            <HStack
              key={version.version}
              align="flex-start"
              gap={{ base: '4', md: '6' }}
              position="relative"
              pb={idx < all.length - 1 ? '10' : '0'}
            >
              <Box
                w={{ base: '34px', md: '42px' }}
                h={{ base: '34px', md: '42px' }}
                borderRadius="full"
                bg={idx === 0 ? 'brand.500' : cardBg}
                border="3px solid"
                borderColor={idx === 0 ? 'brand.500' : lineBg}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                zIndex={1}
              >
                {idx === 0 && <Icon as={Check} color="white" boxSize="3" />}
              </Box>

              <Box
                flex="1"
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="xl"
                p="6"
              >
                <HStack mb="3" flexWrap="wrap" gap="2">
                  <Heading size="sm" fontFamily="mono">v{version.version}</Heading>
                  {version.label && (
                    <Badge colorPalette="green" variant="subtle" fontSize="2xs">{version.label}</Badge>
                  )}
                  <Text fontSize="xs" color={mutedColor}>{version.date}</Text>
                </HStack>

                <VStack align="stretch" gap="1.5">
                  {version.changelog.map((entry, i) => (
                    <HStack key={i} align="flex-start" gap="2">
                      <Icon as={Check} color="green.400" mt="1" boxSize="3" flexShrink={0} />
                      <Text fontSize="sm" color={mutedColor}>{entry}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Container>
    </Box>
  )
}
