<script>
export default {
    setup() {

        const tabs = [
            {
                to: "/",
                text: "Barchasi"
            },
            {
                to: "/new",
                text: "Yangi"
            },
            // {
            //     to: "/completed",
            //     text: "Yetkazishga tayyor"
            // }
        ];
        const counter = 1;
        return {
            tabs,
            counter
        }
    }   
}
</script>
<template>
    <header class="queries-header">
        <nav class="queries-header__navbar">
            <div v-for="(tab, i) in tabs"  :key="i" @click="counter = i" class="queries-header__navbar--tab" :class="{active: (i == counter)}">
                <router-link to="#">{{ tab.text }}</router-link>
                <!-- :to="tab.to" -->
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    .queries-header {
        @include card-mixin;
        font-weight: 500;
        font-size: 1.5rem;
        &__navbar {
            display: flex;
            gap: 3.6rem;
            &--tab {
                padding-right: 1.8rem;
                padding-left: 1.8rem;
                a {
                    padding-top: .8rem;
                    padding-bottom: 1.5rem;
                    color: #9B9B9B;
                    display: block;
                }
                &.active {
                    color: red;
                    position: relative;
                    transition: opacity 2s ease;
                    &::after {
                        position: absolute;
                        content: '';
                        background: $blue;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        border-radius: 6.67345px 6.67345px 0px 0px;
                        height: 4px;
                    }
                }

            }
        }
    }
</style>

