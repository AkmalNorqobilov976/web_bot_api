<template>
     <section class="info-card__form">
        <p 
            class="info-card__form--title"
        > {{ title }}</p>
        <slot name="body"></slot>
    </section>
</template>


<style lang="scss" scoped>
        .info-card__form {
            @include card-mixin;
            margin-top: .8rem;
            padding: 1.2rem 1.6rem;
            &--title {
                padding: .9rem .5rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                
            }
        }
</style>


<script setup>
    import { defineProps } from 'vue'
    defineProps({
        title: {
            type: String,
            default: "Ma’lumotlarni o‘zgartirish"
        }
    })
</script>