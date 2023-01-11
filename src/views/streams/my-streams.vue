<template>
    <main class="streams">
        <article class="streams-list">
            <div class="streams-list__image">
                <img :src="require('@/assets/images/round.png')" alt="">
            </div>
            <div class="streams-list__info">
                <div class="streams-list__info--header">
                    Ikkinchi havolam 
                    <span>
                        <i class="ri-eye-line"></i>
                        34094
                    </span>
                </div>
                <div class="streams-list__info--text">
                    Vitek issiq va sovuq havo haydovchi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, repellendus.
                </div>
            </div>
        </article>
    </main>
</template>

<style lang="scss" scoped>
    .streams {
        &-list {
            @include card-mixin;
            padding: 1.4rem 1.6rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
    }
</style>