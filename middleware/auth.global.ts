import { useAuthStore } from '~/stores/authStore';
import { navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();

    const { getCurrentUser } = authStore;
    const { currentUser } = storeToRefs(authStore);

    // Can't execute this on server side
    if (import.meta.client) {
        await getCurrentUser();
        if (!currentUser.value) {
            if (to.path !== '/login' && to.path !== '/register') {
                return navigateTo('/login');
            }
        }
        else if (to.path === '/login' || to.path === '/register') {
            return navigateTo('/');
        }
    }
});
