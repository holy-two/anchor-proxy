import { defineConfig } from "vite"
import { resolve } from "node:path"
import dts from "vite-plugin-dts"


export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/anchor-proxy.ts'),
      name: 'AnchorProxy',
      fileName: 'anchor-proxy',
    },
    rollupOptions: {
    }
  }
})
