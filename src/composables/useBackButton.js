import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTelegram } from "./useTelegram";

export function useBackButton() {
    const { tg } = useTelegram()
    const router = useRouter()
    const backButton = () => watchEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            router.go(-1);
        })
    })

    return {
        backButton
    }
} 