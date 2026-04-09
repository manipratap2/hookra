import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
import { useColorMode } from '../color-mode'
import { Check, Copy } from 'lucide-react'
import { useState, useCallback } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}

function useCopyToClipboard(text: string) {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    })
  }, [text])

  return { onCopy, hasCopied }
}

export function CodeBlock({ code, language, showLineNumbers, filename }: CodeBlockProps) {
  const { onCopy, hasCopied } = useCopyToClipboard(code)
  const { colorMode } = useColorMode()
  const bg = colorMode === 'dark' ? 'gray.950' : 'gray.900'
  const headerBg = colorMode === 'dark' ? 'gray.900' : 'gray.800'
  const textColor = 'gray.100'
  const lineNumColor = colorMode === 'dark' ? 'gray.600' : 'gray.500'
  const borderColor = 'gray.700'

  const lines = code.split('\n')

  return (
    <Box borderRadius="xl" overflow="hidden" border="1px solid" borderColor={borderColor} my="4">
      {(filename || language) && (
        <HStack
          bg={headerBg}
          px="4"
          py="2"
          justify="space-between"
          borderBottom="1px solid"
          borderColor={borderColor}
        >
          <HStack gap="2">
            <HStack gap="1.5">
              <Box w="3" h="3" borderRadius="full" bg="red.400" />
              <Box w="3" h="3" borderRadius="full" bg="yellow.400" />
              <Box w="3" h="3" borderRadius="full" bg="green.400" />
            </HStack>
            {filename && (
              <Text fontSize="xs" color="gray.400" ml="2" fontFamily="mono">{filename}</Text>
            )}
          </HStack>
          <HStack gap="2">
            {language && (
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">{language}</Text>
            )}
            <IconButton
              aria-label="Copy code"
              size="xs"
              variant="ghost"
              color={hasCopied ? 'green.300' : 'gray.400'}
              _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
              onClick={onCopy}
            >
              {hasCopied ? <Check size={14} /> : <Copy size={14} />}
            </IconButton>
          </HStack>
        </HStack>
      )}
      <Box bg={bg} p="4" overflowX="auto">
        <Box as="pre" fontFamily="mono" fontSize="sm" lineHeight="tall" m="0">
          {lines.map((line, i) => (
            <Box key={i} display="flex">
              {showLineNumbers && (
                <Text
                  as="span"
                  color={lineNumColor}
                  userSelect="none"
                  textAlign="right"
                  w="3ch"
                  mr="4"
                  flexShrink={0}
                >
                  {i + 1}
                </Text>
              )}
              <Text as="span" color={textColor}>{line || '\n'}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

interface InlineCodeCopyProps {
  code: string
  prefix?: string
}

export function InlineCodeCopy({ code, prefix }: InlineCodeCopyProps) {
  const { onCopy, hasCopied } = useCopyToClipboard(code)
  const { colorMode } = useColorMode()
  const bg = colorMode === 'dark' ? 'gray.800' : 'gray.900'
  const borderColor = colorMode === 'dark' ? 'gray.600' : 'gray.700'

  return (
    <HStack
      bg={bg}
      borderRadius="lg"
      px="4"
      py="3"
      border="1px solid"
      borderColor={borderColor}
      justify="space-between"
      fontFamily="mono"
      fontSize="sm"
    >
      <Text color="gray.100">
        {prefix && <Text as="span" color="gray.500">{prefix} </Text>}
        {code}
      </Text>
      <IconButton
        aria-label="Copy"
        size="sm"
        variant="ghost"
        color={hasCopied ? 'green.300' : 'gray.400'}
        _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
        onClick={onCopy}
      >
        {hasCopied ? <Check size={16} /> : <Copy size={16} />}
      </IconButton>
    </HStack>
  )
}
