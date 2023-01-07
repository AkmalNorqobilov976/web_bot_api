const tg = window.Telegram.WebApp
export default {
    created() {
        // if (Object.keys(tg.initDataUnsafe).length === 0) {
        //     // throw new Error("Ketaaa")
        // }
        tg.ready();
        tg.expand();
    },
    methods: {
        setParamsToMenuBtn: (params) => {
            tg.MainButton.setParams({
                text: params.text
            })
        },

        onToggleMenuBtn: () => {
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
            }
        },
        onHideMenuBtn: () => {
            // this.setParamsToMenuBtn(params)
            tg.MainButton.hide();
        },
        onShowMenuBtn: () => {
            tg.MainButton.show();
        },
        onSendDataTg(data) {
            if(data) {
                tg.onEvent("mainButtonClicked", this.sendDataTg(data));
                tg.offEvent("mainButtonClicked", this.sendDataTg(data));
            }
        },
        sendDataTg(data) {
            tg.sendData(data);
        }
    }
}