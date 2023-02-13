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
        // if(disabled) {
        //     tg.MainButton.disable()
        // } else {
        //     tg.MainButton.enable()
        // }
        // tg.MainButton.hide();
        tg.MainButton.setParams({
            text: text,
            text_color: textColor,
            color: color,
        });
        // tg.MainButton.color = color;
        // tg.MainButton.show();
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
        tgMainButtonEnable,
        tgMainButtonDisable,
        notificationOccurred
    }
}