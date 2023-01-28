<template>
  <div class="home">
        <div class="home__card-info">
            <div>
                <p class="home__card-info--title">Hisobingizda</p>
                <p class="home__card-info--balance">{{authStore.userInfo.balance}} uzs</p>
                <p class="home__card-info--guess-balance">
                    Taxminiy balans: <span>{{authStore.userInfo.hold_balance}} uzs</span>
                </p>
            </div>
            <div class="home-button-tab">
                <div class="home-button-tab__button" @click="$router.push({name: 'payments'})">
                    <i class="ri-wallet-3-line"></i>
                    <p>
                        To‘lo‘vlar
                    </p>
                </div>
                <div class="home-button-tab__button" @click="$router.push({name: 'my-streams'})">
                    <i class="ri-link-m"></i>
                    <p>
                        Oqim
                    </p>
                </div>
                <div class="home-button-tab__button" @click="$router.push('/markets/preview/all')">
                    <i class="ri-store-2-line"></i>
                    <p>
                        Market
                    </p>
                </div>
                <div class="home-button-tab__button" @click="$router.push('/statistics/preview/all')">
                    <i class="ri-pie-chart-2-line"></i>
                    <p>
                        Statistika
                    </p>
                </div>
            </div>

            
        </div>

        <div class="service">
            <p class="service__title">Xizmatlar</p>

            <ul>
                <li>
                    <router-link :to="{name: 'promo-codes'}">
                        <i class="ri-coupon-3-fill"></i> Promokodlar
                    </router-link>
                </li>
                
                <li>
                    <router-link to="/orders">
                        <i class="ri-survey-fill"></i> So‘ro‘vlar
                    </router-link>
                </li>
                
                <li>
                    <router-link to="/balance-history">
                        <i class="ri-refund-2-fill"></i>  Balans tarixi
                    </router-link>
                </li>
                <li>
                    <router-link to="#">
                        <i class="ri-hand-heart-fill"></i>  Xayriya qutisi
                    </router-link>
                </li>
                <li>
                    <router-link to="#">
                        <i class="ri-trophy-fill"></i> Konkurslar
                    </router-link>
                </li>
                <li>
                    <router-link to="/profile">
                        <i class="ri-user-6-fill"></i> Shaxsiy sahifa
                    </router-link>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import { useTelegram } from '@/composables/useTelegram'
import { onMounted, watchEffect } from '@vue/runtime-core';
import { useAuthStore } from '@/store/authStore';
export default {
    setup() {
        const { tg } = useTelegram();
        const authStore = useAuthStore();
        watchEffect(() => {
            tg.BackButton.hide();
        });

        onMounted(() => {
            authStore.getUserInfo()
        })

        return {
            authStore
        }
    },
}
</script>
<style lang="scss" scoped>
    .home {
        &__card-info {
            @include card-mixin;
            padding: 2.5rem 1.6rem;
            font-weight: 400;
            font-size: 1.6rem;
            &--balance {
                font-size: 3.2rem;
                font-weight: 600;
                padding: 1rem 0;
            }

            &--guess-balance {
                color: $gray;
                span {
                    color: $black;
                    font-weight: 600;
                }
            }

            .home-button-tab {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                margin-top: 2.5rem;
                gap: 1rem;
                font-size: 1.4rem;
                &__button {
                    background: $blue;
                    color: $white;
                    padding: .75rem 1rem;
                    text-align: center;
                    box-shadow: $button-box-shadow;
                    border-radius: .8rem;
                    // i {
                    //     font-size: 2.1rem;
                    // }
                    p {
                        // color: $white;
                        margin-top: .775rem;
                    }
                }
            }

        }

        .service {
            @include card-mixin;
            margin-top: 1.2rem;
            padding: 1.9rem 0;
            padding-bottom: 0;
            font-size: 1.5rem;
            font-weight: 1.4rem;
            &__title {
                color: $blue;
                padding: 0 2.1rem;
                padding-bottom: .9rem;
                font-weight: 500;
            }

            ul {
                font-size: 1.7rem;
                li {
                    // margin: 1.6rem 0;
                    border-bottom: 0.316667px solid #E9EBEA;
                    a {
                        display: flex;
                        align-items: center;
                        padding: 1.6rem 2.1rem;
                        height: 100%;
                        i {
                            color: $gray;
                            margin-right: 2.4rem;
                            font-size: 2.1rem;
                        }
                        color: $black;
                    }
                }

                 li:first-child {
                    border-top: 0.316667px solid #E9EBEA;
                }
                 li:last-child {
                    border-bottom: none;
                }
            }
        }
    }
</style>
