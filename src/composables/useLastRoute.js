import { onMounted } from "vue"
import { useRoute } from "vue-router";

export function useLastRoute() {
    const route = useRoute();
    const setLastRoute = () => onMounted(() => {
        localStorage.setItem('last-route', route.fullPath);
    });
    const removeLastRoute = () => onMounted(() => {
        localStorage.removeItem('last-route');
    })

    return {
        setLastRoute,
        removeLastRoute
    }
}