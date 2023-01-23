<template>
    <div class="profile-setting-menu">
        <div class="profile-setting-menu__btn" @click="isOpen = !isOpen">
            <slot name="button">
                <i class="ri-settings-4-line"></i>
            </slot>
        </div>
        <transition name="fade">
            <div v-if="isOpen" class="profile-setting-menu__lists">
                <slot name="lists">
                    <div class="profile-setting-menu__lists--item">
                        <i class="ri-logout-box-r-line"></i>
                        <p>Hisobdan chiqish</p>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue-demi";

export default defineComponent({
    setup() {
        const isOpen = ref(false);

        return {
            isOpen
        }

    },
})
</script>
<style lang="scss" scoped>
    .profile-setting-menu {
        display: inline;
        position: relative;

        &__btn {
            color: #676A6F;
            display: inline-block;
        }

        &__lists {
            @include card-mixin;
            border-radius: .5rem;
            position: absolute;
            width: max-content;
            z-index: 5;
            top: -1rem;
            left: 3rem;
            padding: 1.9rem 2.5rem;
            &--item {
                font-size: 1.5rem;
                color: $red;
                display: flex;
                align-items: center;
                gap: 2rem;
            }
        }

    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>