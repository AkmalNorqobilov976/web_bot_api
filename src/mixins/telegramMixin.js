export default {
    data: () => {
        return {
            tg: window.Telegram.WebApp
        }
    },
    created() {
        // if (Object.keys(this.tg.initDataUnsafe).length === 0) {
        //     // throw new Error("Ketaaa")
        // }
        this.tg.ready();
        this.tg.expand();
    },
    methods: {
        setParamsToMenuBtn: (params) => {
            this.tg.MainButton.setParams({
                ...params
            })
        },

        onToggleMenuBtn: (params) => {
            this.setParamsToMenuBtn(params);
            if (this.tg.MainButton.isVisible) {
                this.tg.MainButton.hide();
            } else {
                this.tg.MainButton.show();
            }
        },
        onHideMenuBtn: () => {
            this.tg.MainButton.hide();
        },
        onShowMenuBtn: () => {
            this.tg.MainButton.show();
        },
        onSendDataTg(eventType, data) {
            if(eventType && data) {
                this.tg.onEvent(eventType, this.sendDataTg(data));
                this.tg.offEvent(eventType, this.sendDataTg(data));
            }
        },
        sendDataTg(data) {
            this.tg.sendData(data);
        }
    }
}