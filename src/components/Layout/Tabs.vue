<template>
    <horizontal-scroll class="queries-header-wrapper">
        <header class="queries-header">
            <nav class="queries-header__navbar">
                <div 
                    v-for="(tab, i) in props.tabs"  
                    :key="i" 
                    class="queries-header__navbar--tab" 
                    :class="{active: ($route.path == tab.to)}"
                >
                    <router-link :to="tab.to">{{ tab.text }}</router-link>
                </div>
            </nav>
        </header>
    </horizontal-scroll>
</template>

<script setup>
    import HorizontalScroll from "@/components/HorizontalScroll.vue";
    import { defineComponent, defineProps } from "vue"
    const props = defineProps({
        tabs: {
            type: Array,

        }
    });

    defineComponent({
        components: {
            HorizontalScroll
        }
    })

</script>


<style lang="scss" scoped>
    .queries-header-wrapper {
        position: relative;
    }
    .queries-header {
        @include card-mixin;
        position: sticky;
        top: 0;
        font-weight: 500;
        font-size: 1.5rem;
        &__navbar {
            display: flex;
            gap: 3.6rem;
            &--tab {
                padding-right: 1.8rem;
                padding-left: 1.8rem;
                a {
                    width: max-content;
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
                        transition: all .5s ease;
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