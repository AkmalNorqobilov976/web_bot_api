<template>
    <!-- <router-link to="/about">About</router-link> -->
    <toast/>
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue-demi';
import Toast from './components/Toast.vue';
    export default defineComponent({
        components: {
            Toast
        }
    })
</script>
<style lang="scss">
</style>
