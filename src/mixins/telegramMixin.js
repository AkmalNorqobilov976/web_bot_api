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
                ...params
            })
        },

        onToggleMenuBtn: (params) => {
            this.setParamsToMenuBtn(params);
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
            }
        },
        onHideMenuBtn: () => {
            tg.MainButton.hide();
        },
        onShowMenuBtn: () => {
            tg.MainButton.show();
        },
        onSendDataTg(eventType, data) {
            if(eventType && data) {
                tg.onEvent(eventType, this.sendDataTg(data));
                tg.offEvent(eventType, this.sendDataTg(data));
            }
        },
        sendDataTg(data) {
            tg.sendData(data);
        }
    }
}