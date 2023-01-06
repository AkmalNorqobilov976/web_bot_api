export default  {
    created() {
        if(Object.keys(this.$tg.initDataUnsafe).length === 0) {
            // throw new Error("Ketaaa")
        }
    },
    methods: {
        onToggleButton: () => {
            console.log("good");
            console.log("233", this.$tg);
            // if(this.$tg.MainButton.isVisible) {
            //     this.$tg.MainButton.hide();
            // } else {
            //     this.$tg.MainButton.show();
            // }
        }
    }
}