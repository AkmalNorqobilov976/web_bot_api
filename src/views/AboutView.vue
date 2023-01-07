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
import { onBeforeMount, ref, watchEffect } from 'vue';
import {useTelegram} from '@/composables/useTelegram';
// import { service } from '@/utils/request';
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
        }, {
        });

        const sendDataCallback = () => {
            window.Telegram.WebApp.sendData("Soqqa");
        }
        watchEffect(() => {
            tg.MainButton.onEvent('mainButtonClicked', sendDataCallback)
        })
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
            console.log(window.Telegram.WebApp);
            console.log("here");
            // const data = {
            //     telegram: "beauty is beauty",
            //     yana: "nimadir bor",
            //     endi: "ketamizmi?"
            // };
            // tg.sendData(data);
            // service.get('?text=well')
            // .then(() => {
            //     console.log("well");
            // })
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


        const sendDatas = () => {
            tg.sendData(JSON.stringify({
                hi: "kimbor",
                bye: "nimabor"
            }));
        }
        return {
            tg,
            userInfo,
            sendDatas
        }
    }
}
</script>
