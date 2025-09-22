// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ["~/plugins/vcalendar.ts"],
  modules: ["@pinia/nuxt", "@nuxt-alt/proxy"],
  proxy: {
    "/api": {
      target: "http://127.0.0.1/SMART-planning_db/api/",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
    },
  },
});
