import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      'hookra': resolve(__dirname, 'src/index.ts'),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Hookra',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        '@chakra-ui/react',
        '@emotion/react',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-hook-form': 'ReactHookForm',
          '@chakra-ui/react': 'ChakraUI',
          '@emotion/react': 'EmotionReact',
        },
      },
    },
    sourcemap: true,
    minify: true,
  },
})
