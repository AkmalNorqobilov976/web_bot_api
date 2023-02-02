import { onMounted } from "vue"
import { useRoute } from "vue-router";

export function useLastRoute() {
    const route = useRoute();
    const setLastRoute = () => onMounted(() => {
        localStorage.setItem('last-route', route.fullPath);
    });

    return {
        setLastRoute
    }
}