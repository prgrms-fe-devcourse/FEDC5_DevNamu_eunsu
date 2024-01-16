import { VitePluginRadar } from "vite-plugin-radar";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// env를 사용하기 위해선 loadEnv(mode)가 필요해 해당 방식을 사용
// https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      svgr({
        include: "**/*.svg",
      }),
      sentryVitePlugin({
        org: "jojaehun",
        project: "javascript-react",
        telemetry: false,
      }),
      VitePluginRadar({
        enableDev: false,
        analytics: {
          id: process.env.VITE_GA4_ID,
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
