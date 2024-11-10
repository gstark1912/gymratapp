import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null);

    const { $auth } = useNuxtApp();

    // Recuperar el usuario del localStorage si existe
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            currentUser.value = JSON.parse(storedUser);
        }
    }

    // Monitorea el estado de autenticación cuando se monta la app
    onMounted(() => {
        onAuthStateChanged($auth, (user) => {
            currentUser.value = user;

            // Guarda el usuario en localStorage si está autenticado, o limpia el almacenamiento si no lo está
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                localStorage.removeItem('currentUser');
            }
        });
    });

    return {
        currentUser
    };
});
