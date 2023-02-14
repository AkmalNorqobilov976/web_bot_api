<template>
    <div class="wrapper">
        <div class="slider">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: baseline;
    width: 100%;
    grid-gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x;
    scroll-behavior: smooth;
    scrollbar-width: none;
    user-select: none;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

.slider {
    // min-width: calc(50% - .5rem);
    // /* height: 100px; */
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // scroll-snap-align: start;
}
</style>