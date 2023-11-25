import PageHome from "./pages/PageHome.svelte";
import PageListProjects from "./pages/PageListProjects.svelte";
import PageProjectDetails from "./pages/PageProjectDetails.svelte";
import PageSignIn from "./pages/PageSignIn.svelte";
import PageSignUp from "./pages/PageSignUp.svelte";
import PageTaskDetails from "./pages/PageTaskDetails.svelte";

export const routes = {
  "/": PageHome,
  "/sign-in": PageSignIn,
  "/sign-up": PageSignUp,
  "/projects": PageListProjects,
  "/projects/:id": PageProjectDetails,
  "/tasks/:id": PageTaskDetails,
};
