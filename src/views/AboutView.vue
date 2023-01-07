<template>
  <div class="about">
    <form action="">
        <label for="">salom</label>
        <input type="text" v-model="userInfo.firstname"/>
        <br>
        <label for="">salom2</label>
        <input type="text" v-model="userInfo.lastname"/>
        <br>
        {{userInfo}}
    </form>
  </div>
</template>

<script>
import { onBeforeMount, ref, watchEffect } from 'vue';
import {useTelegram} from '@/composables/useTelegram';
export default {
    setup() {
        const userInfo = ref({
            firstname: "",
            lastname: ""
        })
        const {tg} = useTelegram()
        watchEffect(() => {
            if (userInfo.value.firstname && userInfo.value.lastname) {
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        });

        const sendData = () => {
            tg.sendData(userInfo.value)
        }
        watchEffect(() => {
            tg.onEvent('mainButtonClicked', sendData);
            return () => {
                tg.offEvent('mainButtonClicked', sendData);
            }
        })

        onBeforeMount(() => {
            tg.MainButton.onClick(() => {
                alert("hi")
                tg.onEvent('mainButtonClicked', sendData);
                    // tg.offEvent('mainButtonClicked', sendData);
                tg.sendData({
                    hi: "kimbor",
                    bye: "nimabor"
                })
            })
        })
        return {
            userInfo
        }
    }
}
</script>
