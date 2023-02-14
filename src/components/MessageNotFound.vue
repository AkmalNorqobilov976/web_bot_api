<template>
    <div class="message-not-found">
        <p class="message-not-found__message">Ma'lumot mavjud emas!!</p>
    </div>
</template>

<style lang="scss" scoped>
    .message-not-found {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        &__message {  
            color: $gray;
            font-size: 2.2rem;
        }
    }
</style>