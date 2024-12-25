import { defineStore } from 'pinia';
import { ref } from 'vue';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { ElLoading } from 'element-plus'

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
                const loadingInstance1 = ElLoading.service({ fullscreen: true });
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
                            unsubscribe();
                        } catch (error) {
                            console.log('Error al manejar el estado de autenticación:', error);
                        }
                    }, e => reject(e));
                loadingInstance1.close();

            } catch (error) {
                console.log(error);
            }
        })
    };

    const updateUserProfile = async (user, displayName, photoURL) => {
        try {
            const loadingInstance1 = ElLoading.service({ fullscreen: true });
            await updateProfile(user, {
                displayName,
                photoURL
            });
            if (currentUser.value) {
                Object.assign(currentUser.value, { displayName, photoURL });
            }
            loadingInstance1.close();
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };

    const logOffUser = async () => {
        const loadingInstance1 = ElLoading.service({ fullscreen: true });
        await signOut($auth)
            .then(() => {
                currentUser.value = null;
                localStorage.removeItem('currentUser');
            })
            .catch((error) => {
                console.log(error);
            });
        loadingInstance1.close();
    };

    return {
        currentUser,
        getCurrentUser,
        logOffUser,
        updateUserProfile
    };
});
