const tg = window.Telegram.WebApp;
export default {
    created() {
        // if (Object.keys(this.$tg.initDataUnsafe).length === 0) {
        //     // throw new Error("Ketaaa")
        // }
        tg.expand();
    },
    methods: {
        onToggleButton: () => {
            // console.log("good");
            // console.log("233", this.$tg);
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
            }
        }
    }
}