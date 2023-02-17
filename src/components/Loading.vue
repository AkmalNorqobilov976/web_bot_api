<template>
    <div class="center">
        <Vue3Lottie :animationData="require('@/assets/images/loading.json')" :height="50" :width="50" />
    </div>
</template>

<style lang="scss" scoped>
    .center {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    }
   

</style>