import { useToastStore } from "@/store/useToastStore"

export const useCopyToClipboard = () => {
    const toastStore = useToastStore();
    const copyToClipboard = (e, text) => {
        navigator.permissions.query({name: 'clipboard-write'})
        .then(() => {
            document.execCommand(text);
            Notification.requestPermission((permission) => {
                console.log(permission);
            })
            navigator.permissions.query({ name: 'persistent-storage' })
            navigator.clipboard.writeText(text)
                .then(() => {
                    toastStore.showToastAsAlert({
                        message: "Nusxalandi",
                        delayTime: 3000,
                        type: 'copy'
                    })
                })
                .catch((error) => {
                    toastStore.showToastAsAlert({
                        message: error.message,
                        delayTime: 3000,
                        type: 'copy'
                    })
                })
        })
    }

    return {
        copyToClipboard
    }
}