import { useAuth } from "../store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  const authStore = useAuth();
  authStore.init();
});
