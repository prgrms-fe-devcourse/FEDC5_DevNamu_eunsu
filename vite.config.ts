import { VitePluginRadar } from "vite-plugin-radar";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
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
        enableDev: true,
        analytics: {
          id: process.env.VITE_GA4_ID,
          disable: process.env.NODE_ENV !== "production",
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
};
