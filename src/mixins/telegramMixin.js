const tg = window.Telegram.WebApp

export default {
    created() {
        // if (Object.keys(tg.initDataUnsafe).length === 0) {
        //     // throw new Error("Ketaaa")
        // }
        tg.ready();
        tg.expand();
    },
    mounted() {
        const cbFunc = (data) => {
            alert(data)
            tg.sendData(data)
        }
        if(data) {
            tg.onEvent("mainButtonClicked", cbFunc(data));
            tg.offEvent("mainButtonClicked", cbFunc(data));
        }
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
        // onSendDataTg(data) {
            
        // },
        
    }
}