import { onMounted, onUnmounted } from "vue";

const tg = window.Telegram.WebApp

export function useTelegram() {
    const onClose = () => {
        tg.close();
    }

    const hideMainButton = () => {
        tg.MainButton.hide();
    }
    const showMainButton = () => {
        tg.MainButton.show();
    }
    const tgMainButtonOffClick = () => {
        tg.MainButton.offClick(() => {
        })
    }

    const tgSetParamsToMainButton = ({text, textColor, color,  disabled}) => {
        tg.MainButton.setParams({
            text: text,
            text_color: '#fff',
            color: '#55BE61',
            is_active: !disabled,
        });
    }
    
    const showCloseMainButton = () => {
        onMounted(() => {
            tg.MainButton.show();
        })
        onUnmounted(() => {
            tg.MainButton.hide();
        })
    }
    const tgMainButtonDisable = () => {
        tg.MainButton.disable();
    }

    const tgMainButtonEnable = () => {
        tg.MainButton.enable();
    }

    const notificationOccurred = type => {
        tg.HapticFeedback.notificationOccurred(type);
    }
    
    const tgButtonOnClick = (cbF) => {
        try {
            tg.MainButton.onClick(() => {
                cbF();
                tg.MainButton.offClick(() => {
                    alert("offed")
                })
            })
        } catch (error) {
            tg.MainButton.offClick(() => {
                alert("offed")
            })
        }
    }
    return {
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
        tgMainButtonOffClick,
        tgSetParamsToMainButton,
        tgButtonOnClick,
        showMainButton,
        hideMainButton,
        showCloseMainButton,
        tgMainButtonEnable,
        tgMainButtonDisable,
        notificationOccurred
    }
}