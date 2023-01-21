import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTelegram } from "./useTelegram";

export function useBackButton() {
    const { tg } = useTelegram()
    const router = useRouter()
    const backButton = (route) => watchEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            if(route) {
                router.push(route)
            } else {
                router.go(-1);
            }
        })
    })

    return {
        backButton
    }
} 