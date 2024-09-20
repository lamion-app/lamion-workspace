export default defineNuxtRouteMiddleware(() => {
    const projects = useProjectsStore();

    if (!projects.isProjectSelected) {
        return navigateTo("/")
    }
})