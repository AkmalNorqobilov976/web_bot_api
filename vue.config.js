const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
        sass: {
            additionalData: `
                @import "@/assets/scss/abstracts/_variables.scss";
                @import "@/assets/scss/abstracts/_mixins.scss";
                @import "@/assets/scss/abstracts/_functions.scss";
                @import "@/assets/scss/base/_typography.scss";
            `
        }
    }
  }
})
