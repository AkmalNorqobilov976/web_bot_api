<template>
  <div class="about">
    {{tg}}
    <form action="">
        <label for="">salom</label>
        <input type="text" v-model="userInfo.firstname"/>
        <br>
        <label for="">salom2</label>
        <input type="text" v-model="userInfo.lastname"/>
        <br>
        {{userInfo}}
    </form>
    <button @click="sendDatas">send data</button>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import {useTelegram} from '@/composables/useTelegram';
// import { service } from '@/utils/request';
export default {
    setup() {
        const {tg} = useTelegram()
        const userInfo = ref({
            firstname: "",
            lastname: ""
        })
        // const sendDataCallback = () => {
        //     alert("well")
        //     window.Telegram.WebApp.sendData("Soqqa");
        // }
        watchEffect(() => {
            tg.BackButton.show();
            if (userInfo.value.firstname && userInfo.value.lastname) {
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        }, {
        });
        const sendData = () => {
            alert("alert de")
            window.Telegram.WebApp.sendData(userInfo.value)
        }
        watchEffect(() => {
          
          window.Telegram.WebApp.onEvent('mainButtonClicked', sendData);
            return () => {
                window.Telegram.WebApp.offEvent('mainButtonClicked', sendData);
            }
        })

        const sendDatas = () => {
            // tg.sendData(JSON.stringify({
            //     hi: "kimbor",
            //     bye: "nimabor"
            // }));
            alert(window.Telegram.WebApp.sendData("shunaqa jo'natiladiku"));
            window.Telegram.WebApp.sendData("ketdikuu");
        }
        return {
            tg,
            userInfo,
            sendDatas
        }
    }
}
</script>
