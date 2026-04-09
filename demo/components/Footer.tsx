import {
  Box,
  Container,
  HStack,
  Text,
  VStack,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react'
import { ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { currentVersion } from '../data/versions'

export function Footer() {
  return (
    <Box bg="gray.900" py="16">
      <Container maxW="breakpoint-xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="8" mb="12">
          <VStack align="flex-start" gap="3">
            <HStack>
              <Box
                w="7" h="7" borderRadius="md" bg="brand.500"
                display="flex" alignItems="center" justifyContent="center"
              >
                <Text fontSize="md" fontWeight="bold" color="white" lineHeight="1">H</Text>
              </Box>
              <Text fontWeight="700" color="gray.100">Hookra</Text>
            </HStack>
            <Text fontSize="sm" color="gray.400" lineHeight="tall">
              JSON-driven form builder for React.<br />
              Built on React Hook Form + Chakra UI.
            </Text>
            <Text fontSize="xs" color="gray.400" fontFamily="mono">v{currentVersion.version}</Text>
          </VStack>

          <VStack align="flex-start" gap="3">
            <Heading size="xs" color="gray.100" textTransform="uppercase" letterSpacing="wider">
              Documentation
            </Heading>
            <Link to="/get-started" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none' }}>
              Get Started
            </Link>
            <Link to="/examples" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none' }}>
              Examples
            </Link>
            <Link to="/api" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none' }}>
              API Reference
            </Link>
          </VStack>

          <VStack align="flex-start" gap="3">
            <Heading size="xs" color="gray.100" textTransform="uppercase" letterSpacing="wider">
              Community
            </Heading>
            <a href="https://github.com/manipratap2/formora" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              GitHub <ExternalLink size={12} />
            </a>
            <a href="https://www.npmjs.com/package/hookra" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              npm <ExternalLink size={12} />
            </a>
          </VStack>

          <VStack align="flex-start" gap="3">
            <Heading size="xs" color="gray.100" textTransform="uppercase" letterSpacing="wider">
              Built With
            </Heading>
            <a href="https://react-hook-form.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              React Hook Form <ExternalLink size={12} />
            </a>
            <a href="https://chakra-ui.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Chakra UI <ExternalLink size={12} />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chakra-colors-gray-300)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              React <ExternalLink size={12} />
            </a>
          </VStack>
        </SimpleGrid>

        <Box borderTop="1px solid" borderColor="gray.800" pt="8">
          <HStack justify="space-between" flexWrap="wrap" gap="4">
            <Text fontSize="sm" color="gray.400">MIT License. Built with care.</Text>
            <Text fontSize="xs" color="gray.400" fontFamily="mono">
              hookra@{currentVersion.version}
            </Text>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
