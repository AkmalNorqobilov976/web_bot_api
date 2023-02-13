import { onMounted, onUnmounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTelegram } from "./useTelegram";

export function useBackButton() {
    let customRoute = "";
    const { tg } = useTelegram()
    const router = useRouter()
    const backButtonRouter = () => {
            if(customRoute) {
                router.push(customRoute)
            } else {
                router.go(-1);
            }
    }
    const backButton = (route) => {
        onMounted(() => {
            customRoute = route;
            tg.BackButton.show();
            tg.onEvent('backButtonClicked', backButtonRouter)
        });
        
        onUnmounted(() => {
            customRoute = "";
            tg.offEvent('backButtonClicked', backButtonRouter)
            // tg.BackButton.hide();
        })
    }

    return {
        backButton
    }
} 