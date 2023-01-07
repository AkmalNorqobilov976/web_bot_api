import { tg } from "./mixinData";

export default {
    created() {
        // if (Object.keys(tg.initDataUnsafe).length === 0) {
        //     // throw new Error("Ketaaa")
        // }
        tg.ready();
        tg.expand();
        tg.onEvent("mainButtonClicked", this.cbFunc({goodness: "goodnesss"}));
        // tg.offEvent("mainButtonClicked", this.cbFunc({goodness: "goodnesss"}));
        tg.MainButton.onClick(() => {
            alert("very well")
        })
    },
    methods: {
        
        cbFunc: (data) => {
            alert(data)
            tg.sendData(data)
        },

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