<template>
  <nav>
    Juda sozz
    <form @submit.prevent="">
        <input type="text" v-model="justData.userName" placeholder="Enter name"/>
        <!-- <button type="button" @click="sendDataJust"></button> -->
    </form>
    <i class="ri-home-line" @click="onToggleButton()"></i>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<script>
import telegramMixin from "./mixins/telegramMixin.js";

export default {
    data: () => ({
        justData: {
            userName: ""
        }
    }),
    mixins: [ telegramMixin ],
    watch: {
        'justData.userName'(newOne) {
            
            console.log("well done");
            if(newOne) {
                this.setParamsToMenuBtn({
                    text: "Jo'natsangiz bo'lovradi"
                })
            }
        }
    },
    methods: {
        sendDataJust() {
            this.onSendDataTg('wellDone', this.justData);
        }
    }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
