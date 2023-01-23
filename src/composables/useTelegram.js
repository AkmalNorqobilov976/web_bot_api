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
    const tgSetParamsToMainButton = ({text, textColor, color, is_active, disabled}) => {
        if(disabled) {
            tg.MainButton.disable()
        } else {
            tg.MainButton.enable()
        }
        tg.MainButton.hide();
        tg.MainButton.setParams({
            text: text ? text: tg.MainButton.text,
            text_color: textColor ? textColor : tg.MainButton.textColor,
            color: color ? color : tg.MainButton.color,
            is_active: is_active ? is_active : 
        });
        tg.MainButton.show();
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
        tgSetParamsToMainButton,
        tgButtonOnClick,
        showMainButton,
        hideMainButton
    }
}