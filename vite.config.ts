import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import compileTime from 'vite-plugin-compile-time'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  // this makes all imports relative to the current file, so we don't have to
  // worry about the app being deployed under a nested public path
  base: "",
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    compileTime(),
    tsconfigPaths(),
  ],
})
