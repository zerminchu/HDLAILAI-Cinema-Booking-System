import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  test: {
    coverage: {
      reporter: ["text", "html"],
      provider: "istanbul",
    },
    typecheck: {
      checker: "tsc",
      include: ["**/*.{test,spec}.{ts,js}"],
    },
  },
});
