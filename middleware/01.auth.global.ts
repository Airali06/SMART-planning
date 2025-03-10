import { useAuth } from "../store/auth";
import { usePostazioni } from "../store/postazioni";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();
  const authStore = useAuth();
  const postazioniStore = usePostazioni();
  postazioniStore.occupate.splice(0, postazioniStore.occupate.length);
  authStore.init();

  const loggedin = await authStore.controllaSessione();
  console.log(loggedin);

  if (
    (to.path === "/" || to.path === "/index") &&
    authStore.sessione.id_sessione == 0
  ) {
    return;
  }

  if (authStore.sessione.id_sessione == 0) {
    router.push({ name: "index" });
    return;
  }

  if ((await loggedin) == false) {
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
