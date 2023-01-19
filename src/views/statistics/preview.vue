<template>
    <div class="product-sorters">
            <div class="product-sorters__by-name">
                Mahsulot
                <i class="ri-arrow-drop-down-fill" :class="{'active-sorter': true}"></i>
            </div>
            <div class="product-sorters__by-rating">
                Reyting bilan
                <i class="ri-arrow-drop-down-fill"></i>
            </div>
        </div>
        <div class="product-lists">
            <statistics-list/>
            <statistics-list
                btnText = "-500K"
                btnTextBgColor="#ED5974"
            />
            <statistics-list
                btnText = "0.00"
                btnTextBgColor="#9EB2BD"
            />
        </div>
</template>

<script>

import StatisticsList from '@/components/statistics/StatisticsList.vue';
export default {
    setup() {
        
    },
    components: {
        StatisticsList
    }
}
</script>


<style lang="scss" scoped>
    $sorter-color: #9C9EA2;
    .product-sorters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .75rem 1.6rem;
        font-size: 1.3rem;
        color: $sorter-color;
        background: $white;
        @include card-mixin;
        &__by-name, &__by-rating {
            display: flex;
            align-items: center;
            gap: .624rem;
            i {
                font-size: 2.341rem;
                &.active-sorter {
                    color: $blue;
                    transform: rotateZ(180deg);
                }
            }
        }
    }

    .product-lists {
        @include card-mixin;
        // border-top: ;
    }
    
</style>