<template>
    <horizontal-scroll class="queries-header-wrapper">
        <header class="queries-header">
            <nav class="queries-header__navbar">
                <div 
                    v-for="(tab, i) in tabs"  
                    :key="i" 
                    class="queries-header__navbar--tab" 
                    :class="{active: ($route.path == $lodashGet(tab, 'to'))}"
                >
                    <router-link :to="$lodashGet(tab, 'to')">{{ $lodashGet(tab, 'text') }}</router-link>
                </div>
            </nav>
        </header>
    </horizontal-scroll>
</template>

<script>
    import HorizontalScroll from "@/components/HorizontalScroll.vue";
    import { defineComponent, defineProps } from "vue"
    
    export default defineComponent({
        props: {
            tabs: {
                type: Array,
                default: () => []
            }
        },
        components: {
            HorizontalScroll
        }
    })


</script>


<style lang="scss" scoped>
    .queries-header-wrapper {
        @include card-mixin;
        position: sticky;
        top: 0;
    }
    .queries-header {
        font-weight: 500;
        font-size: 1.5rem;
        &__navbar {
            display: flex;
            // gap: 3.6rem;
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
                a:active {
                    background: none;
                }
                &.active {
                    position: relative;
                    transition: all 2s ease;
                    &::after {
                        position: absolute;
                        content: '';
                        background: $blue;
                        left: 1.8rem;
                        right: 1.8rem;
                        bottom: 0;
                        border-radius: 6.67345px 6.67345px 0px 0px;
                        height: 4px;
                        transition: all 5s ease;
                    }
                }

            }
        }
    }
</style>