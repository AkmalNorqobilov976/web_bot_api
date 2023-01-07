const tg = window.Telegram.WebApp

const sendDataTg = (data) => {
    tg.sendData(data);
}
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
            const cbFunc = (data) => {
                tg.sendData(data)
            }
            if(data) {
                tg.onEvent("mainButtonClicked", cbFunc(data));
                tg.offEvent("mainButtonClicked", cbFunc(data));
            }
        },
        
    }
}