import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import { system } from './theme'
import { ColorModeProvider } from './color-mode'
import { router } from './router'

export function App() {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <RouterProvider router={router} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
