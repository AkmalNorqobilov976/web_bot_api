import { useToastStore } from "@/store/useToastStore"

export const useCopyToClipboard = () => {
    const toastStore = useToastStore();
    const copyToClipboard = (e, text, inputE) => {
        inputE.select();
        document.execCommand('copy')
        toastStore.showToastAsAlert({
            message: "Nusxalandi",
            delayTime: 3000,
            type: 'copy'
        })
        // navigator.clipboard.writeText(text)
        // .then(() => {
        //     toastStore.showToastAsAlert({
        //         message: "Nusxalandi",
        //         delayTime: 3000,
        //         type: 'copy'
        //     })
        // })
        // .catch(() => {
        //     inputE.select();
        // })
    }

    return {
        copyToClipboard
    }
}