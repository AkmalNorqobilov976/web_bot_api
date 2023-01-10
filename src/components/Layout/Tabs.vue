<template>
    <header class="queries-header">
        <nav class="queries-header__navbar">
            <div 
                v-for="(tab, i) in props.tabs"  
                :key="i" 
                class="queries-header__navbar--tab" 
                :class="{active: ($route.path == tab.to)}"
            >
                <router-link to="#">{{ tab.text }}</router-link>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { defineProps } from "vue"
    const props = defineProps({
        tabs: {
            type: Array,

        }
    });

</script>


<style lang="scss" scoped>
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