import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  Badge,
  Flex,
  VStack,
  Button,
  Drawer,
} from '@chakra-ui/react'
import { Moon, Sun, Menu } from 'lucide-react'
import { useColorMode } from '../color-mode'
import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'

const navItems = [
  { to: '/' as const, label: 'Home', match: '/' },
  { to: '/get-started/$section' as const, params: { section: 'installation' }, label: 'Get Started', match: '/get-started' },
  { to: '/examples' as const, label: 'Examples', match: '/examples' },
  { to: '/api/$section' as const, params: { section: 'formbuilder' }, label: 'API Reference', match: '/api' },
]

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const bg = colorMode === 'dark' ? 'gray.800' : 'white'
  const borderColor = colorMode === 'dark' ? 'gray.700' : 'gray.200'
  const hoverBg = colorMode === 'dark' ? 'gray.700' : 'gray.100'
  const activeColor = colorMode === 'dark' ? 'brand.300' : 'brand.600'
  const bgAlpha = colorMode === 'dark' ? 'rgba(26,32,44,0.85)' : 'rgba(255,255,255,0.85)'

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="sticky"
        bg={bg}
        borderBottom="1px solid"
        borderColor={borderColor}
        backdropFilter="blur(10px)"
        bgColor={bgAlpha}
      >
        <Container maxW="breakpoint-xl">
          <Flex h="16" align="center" justify="space-between">
            <HStack gap="8">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <HStack gap="2" cursor="pointer" _hover={{ opacity: 0.8 }}>
                  <Box
                    w="8" h="8" borderRadius="lg" bg="brand.500"
                    display="flex" alignItems="center" justifyContent="center"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white" lineHeight="1">H</Text>
                  </Box>
                  <Text fontWeight="700" fontSize="lg" letterSpacing="-0.02em">
                    Hookra
                  </Text>
                  <Badge colorPalette="gray" variant="subtle" fontSize="2xs" fontFamily="mono">
                    v1.0.0
                  </Badge>
                </HStack>
              </Link>

              <HStack gap="1" display={{ base: 'none', md: 'flex' }}>
                {navItems.map((item) => {
                  const isActive = item.match === '/' ? currentPath === '/' : currentPath.startsWith(item.match)
                  return (
                    <Button
                      key={item.to}
                      asChild
                      variant="ghost"
                      size="sm"
                      fontWeight={isActive ? '600' : '500'}
                      color={isActive ? activeColor : undefined}
                      bg={isActive ? hoverBg : undefined}
                      _hover={{ bg: hoverBg }}
                      borderRadius="md"
                    >
                      <Link to={item.to} params={'params' in item ? item.params : undefined}>{item.label}</Link>
                    </Button>
                  )
                })}
              </HStack>
            </HStack>

            <HStack gap="3">
              <Badge
                variant="subtle"
                colorPalette="red"
                fontSize="2xs"
                px="2"
                py="1"
                display={{ base: 'none', sm: 'flex' }}
                asChild
              >
                <a href="https://www.npmjs.com/package/hookra" target="_blank" rel="noopener noreferrer">
                  npm
                </a>
              </Badge>

              <IconButton
                aria-label="Toggle color mode"
                variant="ghost"
                size="sm"
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </IconButton>

              <IconButton
                aria-label="Open menu"
                variant="ghost"
                size="sm"
                display={{ base: 'flex', md: 'none' }}
                onClick={() => setDrawerOpen(true)}
              >
                <Menu size={16} />
              </IconButton>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Drawer.Root open={drawerOpen} onOpenChange={(e) => setDrawerOpen(e.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Body pt="12">
              <VStack gap="2" align="stretch">
                {navItems.map((item) => {
                  const isActive = item.match === '/' ? currentPath === '/' : currentPath.startsWith(item.match)
                  return (
                    <Button
                      key={item.to}
                      asChild
                      variant={isActive ? 'solid' : 'ghost'}
                      colorPalette={isActive ? 'brand' : undefined}
                      justifyContent="flex-start"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <Link to={item.to} params={'params' in item ? item.params : undefined}>{item.label}</Link>
                    </Button>
                  )
                })}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}
