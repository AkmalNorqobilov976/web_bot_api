<template>
    <div class="statistic-list" v-if="listData">
        <div class="statistic-list__product">
            <p class="statistic-list__product--title">{{ listData.name }}</p>
            <p class="statistic-list__product--subtitle">{{ listData.product_title }}</p>
        </div>

        <div class="statistic-list__amount">
            <div class="statistic-list__amount--rating">
                <p class="statistic-list__amount--rating--i1">{{ listData.orders_count }}</p>
                <p class="statistic-list__amount--rating--i2">{{ listData.orders_all_count }}</p>
            </div>
            <div class="statistic-list__amount--btn-text">{{ listData.visits }}</div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'
    defineProps({
        listData: {
            default: () => {}
        },
        title: {
            type: String,
            default: "Yangi 888 oqim"
        },
        subtitle: {
            type: String,
            default: "Ratsiya 888"
        },
        rating1: {
            type: String,
            default: "7,503"
        },
        rating2: {
            type: String,
            default: "7,503"
        },
        btnText: {
            type: String,
            default: "+50K"
        },
        btnTextBgColor: {
            type: String,
            default: "#23B60B"
        }
    })
</script>

<style lang="scss" scoped>
    .statistic-list {
        background: $white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 1.2rem 1.6rem;
        &::after {
            content: '';
            position: absolute;
            background-color: $border-gray;
            width: 90%;
            height: .1rem;
            bottom: 0;
            right: 5%;
        }

        &__product {
            &--title {
                font-size: 1.6rem;
                font-weight: 500;
                margin-bottom: .6rem;
            }

            &--subtitle {
                font-size: 1.2rem;
                font-weight: 400;
                color: $gray;
            }
        }

        &__amount {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: .5rem;
            font-size: 1.6rem;
            &--rating {
                box-sizing: content-box;
                text-align: right;
                &--i1 {
                    color: $blue;
                }

                &--i2 {
                    color: $gray;
                }
            }

            &--btn-text {
                padding: .95rem 0;
                background: v-bind('btnTextBgColor');
                color: $white;
                width: 5.6rem;
                text-align: center;
                border-radius: .8rem;
            }
        }
    }
</style>