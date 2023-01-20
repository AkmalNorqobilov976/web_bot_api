<template>
    <article class="market-card">
        <div class="market-card__header">
            <div>
                <img :src="require('@/assets/images/image.png')" class="market-card__header--img"/>
            </div>
            <div class="market-card__header--list">
                Uy uchun gul idishda - aloe guli
                <p>
                    <i><TriangleInCircle/></i> 
                    94.000 UZS
                </p>
            </div>
        </div>
        <section class="market-card__list">
            <div class="market-card__list--item">
                <div class="market-card__list--item--title">Maxsulot narxi</div>
                <div class="market-card__list--item--value">130.000 so‘m</div>
            </div>
            <div class="market-card__list--item">
                <div class="market-card__list--item--title">Yetkazish xizmati</div>
                <div class="market-card__list--item--btn">
                    <button>
                        <i class="ri-truck-line"></i>
                        Pullik
                    </button>
                </div>
            </div>
            <div class="market-card__list--item">
                <div class="market-card__list--item--title">Zaxirada</div>
                <div class="market-card__list--item--in-store">4.204</div>
            </div>
            <div v-if="isShowBtn" @click="$router.push({name: 'create-stream'})" class="market-card__list--stream-btn">
                <i class="ri-link-m"></i>
                Oqim yaratish
            </div>
        </section>
    </article>
</template>

<script>
import TriangleInCircle from '@/assets/icons/TriangleInCircle.vue';
export default {
    props: {
        isShowBtn: {
            type: Boolean,
            default: true
        }
    },
    components: {
        TriangleInCircle
    }
}
</script>
<style lang="scss" scoped>
    $btn-bg-red: rgba(237, 89, 116, 0.2);
    $btn-bg-green: #CEFFC6;
    .market-card {
        @include card-mixin;
        padding: 1.2rem 1.6rem;
        margin-bottom: .8rem;
        &__header {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            font-size: 1.6rem;
            font-weight: bold;
            &--img {
                object-fit: cover;
            }
            &--list {
                p {
                    margin-top: 1.4rem;
                    display: flex;
                    align-items: center;
                    gap: .6rem;
                    color: $green;
                }
            }
        }

        &__list {
            font-weight: 400;
            font-size: 1.5rem;
            display: flex;
            flex-direction: column;
            margin: 1.8rem 0;
            gap: 2rem;
            &--item {
                display: flex;
                flex-grow: 1;
                justify-content: space-between;
                align-items: center;
                &--title {
                    color: #8C8C8C;
                }

                &--value {
                    color: $black;
                    font-weight: 800;
                }

                &--btn {

                    button {
                        @include btn-mixin;
                        color: $red;
                        display: flex;
                        align-items: center;
                        gap: .45rem;
                        background: $btn-bg-red;
                        font-weight: 600;
                        i {
                            font-weight: 500;
                        }
                    }
                }

                &--in-store {
                    font-weight: 400;
                }
            }
            &--stream-btn {
                display: flex;
                gap: .8rem;
                align-items: center;
                justify-content: center;
                font-size: 1.6rem;
                font-weight: 500;
                background: $blue;
                text-align: center;
                padding: 1.2rem 0;
                color: $white;
                border-radius: .8rem;
            }
        }
    }
</style>