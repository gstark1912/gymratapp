import { useAuthStore } from '~/stores/authStore';
import { navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();

    const { getCurrentUser } = authStore;

    // Can't execute this on server side
    if (import.meta.client) {
        let currentUser = await getCurrentUser();

        console.log(currentUser);
        if (!currentUser) {
            if (to.path !== '/login' && to.path !== '/register') {
                return navigateTo('/login');
            }
        }
    }
});
