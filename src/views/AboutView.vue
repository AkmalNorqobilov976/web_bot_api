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
import { ref, watchEffect } from 'vue';
import {useTelegram} from '@/composables/useTelegram';
export default {
    setup() {
        const userInfo = ref({
            firstname: "",
            lastname: ""
        })
        const {tg} = useTelegram()
        watchEffect(() => {
            if (userInfo.value.firstname && userInfo.value.firstname) {
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        })
        return {
            userInfo
        }
    },
}
</script>
