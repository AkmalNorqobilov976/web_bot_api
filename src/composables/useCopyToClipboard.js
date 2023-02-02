import { useToastStore } from "@/store/useToastStore"

export const useCopyToClipboard = () => {
    const toastStore = useToastStore();
    const copyToClipboard = (e, text) => {
            
        navigator.clipboard.writeText(text)
            .then(() => {
                toastStore.showToast({
                    x: e.clientX,
                    y: e.clientY,
                    message: "Nusxalandi",
                    type: "Success",
                    delayTime: 3000
                })
            })
    }

    return {
        copyToClipboard
    }
}