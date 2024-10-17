import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [
    vike({
      prerender: true
    }),
    vue({
      include: [/\.vue$/]
    })
  ],
  resolve: {
    alias: {
      "~": __dirname
    }
  }
})
