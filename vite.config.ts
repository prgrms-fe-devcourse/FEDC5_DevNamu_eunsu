import { VitePluginRadar } from "vite-plugin-radar";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      telemetry: false,
    }),
    VitePluginRadar({
      enableDev: false,
      analytics: {
        id: process.env.GA4_ID,
      },
    }),
  ],

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },

  build: {
    sourcemap: true,
  },
});
