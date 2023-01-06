export default  {
    created() {
        if(Object.keys(this.$tg.initDataUnsafe).length === 0) {
            // throw new Error("Ketaaa")
        }
    },
    methods: {
        onToggleButton: () => {
            if(this.$tg.MainButton.isVisible) {
                this.$tg.MainButton.hide();
            } else {
                this.$tg.MainButton.show();
            }
        }
    }
}