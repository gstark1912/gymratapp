import { useAuthStore } from '~/stores/authStore';
import { navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();

    if (!authStore.currentUser) {
        if (to.path !== '/login' && to.path !== '/register') {
            return navigateTo('/login');
        }
    }
});
