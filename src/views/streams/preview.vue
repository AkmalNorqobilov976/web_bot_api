<template>
    <market-card :isShowBtn="false"/>
    
    <section class="stream-name">
        <form @submit.prevent="">
            <label class="stream-name__title">Oqim nomi</label>
            <!-- error-input class -->
            <div class="stream-name__input">
                <input v-model="streamForm.link" placeholder="Misol uchun: 1-oqim linki" />
                <profile-setting-menu></profile-setting-menu>
            </div>
            <tooltip style="bottom: -2.2rem;" label="Bu nomdagi Oqim linki mavjud"/>
            <div class="stream-name__button-grp">
                <button @click="copyToClipboard($event)"  class="stream-name__button-grp--btn">
                    <copyIcon class="stream-name__button-grp--btn--icon"/> Nusxalash
                </button>
                <button class="stream-name__button-grp--btn">
                    <i class="ri-external-link-line stream-name__button-grp--btn--icon"></i>
                    Reklama posti
                </button>
            </div>
        </form>
    </section>

    <section class="addition-stream-info">
        <header class="addition-stream-info__header">
            <p class="addition-stream-info__header--title">
                Qo‘shimcha
            </p>
        </header>
        <main class="addition-stream-info__main">
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'donation'})">
                <div>
                    5.000 so‘m
                    <p>
                        Xayriyaga pul ajratish
                    </p>
                </div>
                <i class="ri-arrow-right-s-line"></i>
            </div>
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'donation'})">
                <div>
                   100 so‘m
                    <p>
                        Chegirma qo‘yilgan
                    </p>
                </div>
                <i class="ri-arrow-right-s-line"></i>
            </div>
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'advertesiment'})">
                <div>
                   0 so‘m
                    <p>
                        Reklamaga ajratilgan summa
                    </p>
                </div>
                <i class="ri-arrow-right-s-line"></i>
            </div>
        </main>
    </section>

    <section class="stream-visit">
        <p class="stream-visit__statistic">
            Statistika
        </p>
        <p class="stream-visit__title">
            Tashriflar
        </p>
        <p class="stream-visit__number">
            56.482
        </p>
    </section>

    <created-stream-card title="Aktiv"/>
    <created-stream-card 
        :title="'Buyurtma'" 
        :bgCircleColor="'#23B60B'"
        :items="[
            {
                title: 'Yo‘lda',
                value: 5
            },
            {
                title: 'Yetkazib berildi',
                value: 70
            },
            {
                title: 'Qabul qilingan',
                value: 90
            }
        ]"    
    />
    <created-stream-card
        :title="'Arxiv'"
        :bgCircleColor="'#F84F57'"
        :items="[
            {
                title: 'Spam',
                value: 5
            },
            {
                title: 'Qaytib keldi',
                value: 70
            },
            {
                title: 'Arxivlandi',
                value: 69
            }
        ]"    
    />
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
import copyIcon from "@/assets/svgs/copyIcon.vue";
import CreatedStreamCard from '@/components/streams/CreatedStreamCard.vue'
import ProfileSettingMenu from '@/components/menu/ProfileSettingMenu.vue'
import { useBackButton } from '@/composables/useBackButton';
import { defineComponent, onBeforeMount, reactive } from 'vue-demi';
import { useToastStore } from '@/store/useToastStore';
import { getAdminStream } from '@/api/advertiserApi';
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const { backButton } = useBackButton();
        const toastStore = useToastStore();
        const route = useRoute();
        backButton()
        const streamForm = reactive({
            link: ""
        })
        const streamInfo = reactive({})
        const copyToClipboard = (e) => {
            navigator.clipboard.writeText(streamForm.link).then(() => {
                toastStore.$patch({
                    x: `${e.clientX}px`,
                    y: `${e.clientY}px`,
                    isShownToast: true,
                    message: "Nusxalandi",
                    type: "",
                    icon: true
                });
    
                setTimeout(() => {
                    toastStore.$patch({
                        isShownToast: false
                    });
                }, 800) 
            }) 
        }

        const getStream = () => {
            getAdminStream({ id: route.params.id })
                .then(response => {
                    streamInfo.value = response.data.data;
                }).catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }
        onBeforeMount(() => {
            getStream();
        })
        return {
            streamForm,
            copyToClipboard,
            streamInfo
        }
    },
    components: {
        ProfileSettingMenu,
        copyIcon,
        MarketCard,
        CreatedStreamCard
        
    }
})
</script>

<style lang="scss" scoped>
  .stream-name {
        margin-bottom: .8rem;
        font-weight: 400;
        font-size: 1.5rem;
        @include card-mixin;
        padding: .9rem 2.1rem;
        &__title {
            color: $blue;
            font-weight: 500;
            display: block;
            padding: .9rem 0;
        }

        &__input {
            width: 100%;
            padding: 1.8rem 1.9rem;
            font-weight: 500;
            border-radius: 1rem;
            color: $black;
            display: flex;
            align-items: center;
            background: #F5F5F5;
            input {
                flex: 1 1 auto;
                background: inherit;
                border: none;
                outline: none;
            }
        }

        &__button-grp {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            justify-content: center;
            margin: 1.5rem 0 .8rem 0 ;
            button {
                flex: 1 1 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.356rem;
                border: none;
                outline: none;
                background: $blue;
                color: $white;
                padding: 1.1rem 0;
                border-radius: .7rem;
                font-size: 1.3rem;

                i {
                    font-size: 1.5rem;
                }
                &--icon {
                    font-size: 1.5rem;
                }
            }
        }
    }

    .addition-stream-info {
        font-size: 1.5rem;
        padding: 1rem 0;
        @include card-mixin;
        &__header {
            p {
                font-weight: 500;
                color: $blue;
                padding: .9rem 2.1rem;
                border-bottom: #E9EBEA 0.32px solid;
            }
        }

        &__main {
            display: flex;
            flex-direction: column;
            padding: 1.2rem 0;
            gap: 2rem;
            &--list {
                padding: 0 2.1rem;
                flex: 1 1auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-weight: 500;
                & div {
                    font-size: 1.5rem;
                    p {
                        font-weight: 400;
                        font-size: 1.2rem;
                        color: $gray-variant;
                        margin-top: .6rem;
                    }

                }
                i {
                    color: $gray-variant;
                    font-size: 1.5rem;
                }
            }
        }
    }

    .stream-visit {
        @include card-mixin;
        margin-top: .8rem;
        padding: 2rem 0;
        text-align: center;
        &__statistic {
            font-size: 2rem;
            font-weight: 500;
            text-align: left;
            padding: .4rem 1.6rem 2.2rem;
        }
        &__title {
            font-weight: 400;
            font-size: 1.6rem;
        }

        &__number {
            margin-top: 1rem;
            font-size: 2.4rem;
            font-weight: 600;
        }
    }
</style>