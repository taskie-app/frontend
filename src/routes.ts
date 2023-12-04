import { get } from "svelte/store";
import wrap from "svelte-spa-router/wrap";
import PageHome from "./pages/PageHome.svelte";
import PageListProjects from "./pages/PageListProjects.svelte";
import PageProjectDetails from "./pages/PageProjectDetails.svelte";
import PageSignIn from "./pages/PageSignIn.svelte";
import PageSignUp from "./pages/PageSignUp.svelte";
import PageTaskDetails from "./pages/PageTaskDetails.svelte";
import { authenticated } from "./stores/authStore";
import PageProfile from "./pages/PageProfile.svelte";
import PageMyTasks from "./pages/PageMyTasks.svelte";
import PageProjectSettings from "./pages/PageProjectSettings.svelte";

const conditions = [() => get(authenticated)];

export const routes = {
  "/": PageHome,
  "/sign-in": PageSignIn,
  "/sign-up": PageSignUp,
  "/my-tasks": wrap({
    component: PageMyTasks,
    conditions,
  }),
  "/projects": wrap({
    component: PageListProjects,
    conditions,
  }),
  "/projects/:id": wrap({
    component: PageProjectDetails,
    conditions,
  }),
  "/projects/:id/settings": wrap({
    component: PageProjectSettings,
    conditions,
  }),
  "/tasks/:projectId/:taskId": wrap({
    component: PageTaskDetails,
    conditions,
  }),
  "/profile": wrap({
    component: PageProfile,
    conditions,
  }),
};
