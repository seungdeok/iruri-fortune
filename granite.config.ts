import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "iruri-fortune",
  brand: {
    displayName: "운세이루리", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3FD599", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "https://static.toss.im/appsintoss/56671/f14698c0-542b-4338-bbfa-7e4340b0eaa7.png",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite dev",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
