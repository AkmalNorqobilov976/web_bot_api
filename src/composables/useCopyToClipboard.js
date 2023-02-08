import { useToastStore } from "@/store/useToastStore"

export const useCopyToClipboard = () => {
    const toastStore = useToastStore();
    const copyToClipboard = (e, text, inputE) => {
        console.log(inputE);
        navigator.clipboard.writeText(text)
        .then(() => {
            toastStore.showToastAsAlert({
                message: "Nusxalandi",
                delayTime: 3000,
                type: 'copy'
            })
        })
        .catch(() => {
            inputE.select();
        })
    }

    return {
        copyToClipboard
    }
}