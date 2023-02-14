export default {
    install: (app, options) => {
        app.config.globalProperties.$tg = window.Telegram.WebApp;
    }
}