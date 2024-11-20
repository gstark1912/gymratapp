import { defineStore } from 'pinia';
import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null);

    // Recuperar el usuario del localStorage si existe
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            currentUser.value = JSON.parse(storedUser);
        }
    }

    const { $auth } = useNuxtApp();
    const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            try {

                const unsubscribe =
                    onAuthStateChanged($auth, (user) => {
                        try {
                            if (user) {
                                currentUser.value = user;
                                localStorage.setItem('currentUser', JSON.stringify(user));
                            }
                            else {
                                currentUser.value = null;
                                localStorage.removeItem('currentUser');
                            }
                            resolve(user);
                        } catch (error) {
                            console.log('Error al manejar el estado de autenticación:', error);
                        } finally {
                            // Llama a `unsubscribe()` para detener la escucha después de que el estado se verifique una vez
                            unsubscribe();
                        }
                    }, e => reject(e));

            } catch (error) {
                debugger;
                console.log(error);
            }
        })
    };

    return {
        currentUser,
        getCurrentUser
    };
});
