<template>
  <div class="home">
        <div class="home__card-info">
            <div>
                <p class="home__card-info--title">Hisobingizda</p>
                <p class="home__card-info--balance">12.000.000 uzs</p>
                <p class="home__card-info--guess-balance">
                    Taxminiy balans: <span>86.005.500 uzs</span>
                </p>
            </div>
            <div class="home-button-tab">
                <div class="home-button-tab__button">
                    <i class="ri-wallet-3-line"></i>
                    <p>
                        To‘lo‘vlar
                    </p>
                </div>
                <div class="home-button-tab__button">
                    <i class="ri-link-m"></i>
                    <p>
                        Oqim
                    </p>
                </div>
                <div class="home-button-tab__button">
                    <i class="ri-store-2-line"></i>
                    <p>
                        Market
                    </p>
                </div>
                <div class="home-button-tab__button">
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
                    <router-link to="/customers">
                        <i class="ri-parent-fill"></i>  Doimiy mijozlar
                    </router-link>
                </li>
                
                <li>
                    <router-link to="/queries">
                        <i class="ri-survey-fill"></i>  So‘ro‘vlar
                    </router-link>
                </li>
                
                <li>
                    <router-link to="#">
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
            </ul>
        </div>
  </div>
</template>

<style lang="scss" scoped>
    .home {
        &__card-info {
            @include card-mixin;
            padding: 2.5rem 1.6rem;
            font-weight: 400;
            font-size: 1.6rem;
            &--balance {
                font-size: 2.4rem;
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
                font-size: 1rem;
                &__button {
                    background: $blue;
                    color: $white;
                    padding: .75rem 1rem;
                    text-align: center;
                    box-shadow: $button-box-shadow;
                    border-radius: .8rem;
                    i {
                        margin-bottom: .775rem;
                        font-size: 1.67rem;
                    }
                }
            }

        }

        .service {
            @include card-mixin;
            margin-top: 1.2rem;
            padding: 1.9rem 0;
            font-size: 1.5rem;
            font-weight: 1.4rem;
            &__title {
                color: $blue;
                padding: 0 2.1rem;
                font-weight: 500;
            }

            ul {
                margin-top: 2.45rem;
                li {
                    // margin: 1.6rem 0;
                    a {
                        display: block;
                        padding: 1.6rem 2.1rem;
                        height: 100%;
                        i {
                            color: $gray;
                            margin-right: 2.4rem;
                            font-size: 1.92rem;
                        }
                        color: $black;
                    }
                }
            }
        }
    }
</style>
