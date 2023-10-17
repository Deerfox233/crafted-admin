// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/%E9%A9%AC%E5%9C%A3%E5%8D%9A/Desktop/crafted-admin/node_modules/.pnpm/vite@4.4.11_@types+node@20.5.1_less@4.2.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/%E9%A9%AC%E5%9C%A3%E5%8D%9A/Desktop/crafted-admin/node_modules/.pnpm/@vitejs+plugin-react@4.1.0_vite@4.4.11/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { viteMockServe } from "file:///C:/Users/%E9%A9%AC%E5%9C%A3%E5%8D%9A/Desktop/crafted-admin/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@4.4.11/node_modules/vite-plugin-mock/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\\u9A6C\u5723\u535A\\Desktop\\crafted-admin";
var isMockOn = process.env.MOCK === "on";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    react(),
    isMockOn && viteMockServe({
      mockPath: "mock",
      logger: true
    })
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTlBNkNcdTU3MjNcdTUzNUFcXFxcRGVza3RvcFxcXFxjcmFmdGVkLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTlBNkNcdTU3MjNcdTUzNUFcXFxcRGVza3RvcFxcXFxjcmFmdGVkLWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTklQTklQUMlRTUlOUMlQTMlRTUlOEQlOUEvRGVza3RvcC9jcmFmdGVkLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcclxuXHJcbmNvbnN0IGlzTW9ja09uID0gcHJvY2Vzcy5lbnYuTU9DSyA9PT0gXCJvblwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiBcIi9cIixcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgaXNNb2NrT24gJiZcclxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XHJcbiAgICAgICAgbW9ja1BhdGg6IFwibW9ja1wiLFxyXG4gICAgICAgIGxvZ2dlcjogdHJ1ZSxcclxuICAgICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW3sgZmluZDogXCJAXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSB9XSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVCxPQUFPLFVBQVU7QUFDM1UsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBSDlCLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sV0FBVyxRQUFRLElBQUksU0FBUztBQUd0QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUNFLGNBQWM7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPLENBQUMsRUFBRSxNQUFNLEtBQUssYUFBYSxLQUFLLFFBQVEsa0NBQVcsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUNwRTtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
