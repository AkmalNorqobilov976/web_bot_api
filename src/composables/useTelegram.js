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
    const tgSetParamsToMainButton = ({text, textColor, color}) => {
        tg.MainButton.hide();
        tg.MainButton.setParams({
            text: text ? text: tg.MainButton.text,
            textColor: textColor ? textColor : tg.MainButton.textColor,
            color: color ? color : tg.MainButton.color
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