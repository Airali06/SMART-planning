import { useAuth } from "../store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();
  const authStore = useAuth();

  if (to.path === "/" || to.path === "/index") {
    return;
  }

  if ((await authStore.utente.id_utente) == 0) {
    router.push({ name: "index" });
    return;
  }

  if ((await authStore.sessione.id_sessione) == 0) {
    router.push({ name: "index" });
    return;
  }

  const loggedin = await authStore.controllaSessione();
  console.log(loggedin);
  if (loggedin == false) {
    router.push({ name: "index" });
    return;
  }

  /*
  if (to.name === "topic") {
    // Cambia layout per una specifica route
    to.meta.layout = false;
  }*/
  return;
});
