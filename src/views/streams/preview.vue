<template>
    <div v-if="streamsStore.$state.stream">
        <custom-confirm 
        title="Oqimni chindan ham o‘chirmoqchimisiz?"
        subtitle="Agar o‘chirilsangiz oqimni qayta tiklab bo‘lmaydi"
        sayNo="Yo‘q, ortga qaytish"
        sayYes="Ha, o‘chirilsin"
        :showConfirm="openDeleteStreamConfirmDialog" 
        @onConfirm="onConfirm($event)"
    />
    <market-card :isShowBtn="false" :cardData="streamsStore.$state.stream.product"/>
    <section class="stream-name">
        <form @submit.prevent="">
            <label class="stream-name__title">Oqim nomi</label>
            <!-- error-input class -->
            <div class="stream-name__input">
                <input 
                    v-model="streamsStore.$state.stream.name" 
                    placeholder="Misol uchun: 1-oqim linki" 
                />
                <profile-setting-menu left="-16rem" top="3rem">
                    <template #button>
                        <i class="ri-more-2-fill"></i>
                    </template>
                    <template #lists>
                        <div @click="openDeleteStreamConfirmDialog = true" class="profile-setting-menu__lists--item">
                            <i class="ri-delete-bin-6-fill"></i>
                            <p>Oqimni o‘chirish</p>
                        </div>
                    </template>
                </profile-setting-menu>
            </div>
            <tooltip style="bottom: -2.2rem;" label="Bu nomdagi Oqim linki mavjud"/>
            <div class="stream-name__button-grp">
                <button @click="copyToClipboard($event, streamsStore.$state.stream.name)"  class="stream-name__button-grp--btn">
                    <copyIcon class="stream-name__button-grp--btn--icon"/> Nusxalash
                </button>
                <button class="stream-name__button-grp--btn" @click="openPost">
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
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'donation-update', params: { id: $route.params.id }})">
                <div>
                    {{ $filter.numberFormat(streamsStore.$state.stream.charity) }} so‘m
                    <p>
                        Xayriyaga pul ajratish
                    </p>
                </div>
                <i class="ri-arrow-right-s-line"></i>
            </div>
            <div 
                class="addition-stream-info__main--list" 
                @click="$router.push({name: 'define-amount-update', params: {id: $route.params.id}})"
            >
                <div>
                   {{ $filter.numberFormat(streamsStore.$state.stream.discount) }} so‘m
                    <p>
                        Chegirma qo‘yilgan
                    </p>
                </div>
                <i class="ri-arrow-right-s-line"></i>
            </div>
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'advertesiment-update', params: { id: $route.params.id }})">
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
            {{ streamsStore.$state.stream.visits }}
        </p>
    </section>

    <created-stream-card 
        v-if="streamsStore.$state.stream"
        title="Aktiv"
        :isTwoItem="true"
        :items="[
            {
                title: 'Yangi',
                value: streamsStore.$state.stream.orders_stats.new ? streamsStore.$state.stream.orders_stats.new: 0
            },
            {
                title: 'Qayta qo‘ng’iroq',
                value: streamsStore.$state.stream.orders_stats.pending
            },
            {
            }
        ]"    
    />
    <created-stream-card 
        :title="'Buyurtma'" 
        :bgCircleColor="'#23B60B'"
        :items="[
            {
                title: 'Yo‘lda',
                value: streamsStore.$state.stream.orders_stats.sent
            },
            {
                title: 'Yetkazib berildi',
                value: streamsStore.$state.stream.orders_stats.delivered
            },
            {
                title: 'Qabul qilingan',
                value: streamsStore.$state.stream.orders_stats.accepted
            }
        ]"    
    />
    <created-stream-card
        :title="'Arxiv'"
        :bgCircleColor="'#F84F57'"
        :items="[
            {
                title: 'Spam',
                value: streamsStore.$state.stream.orders_stats.spam
            },
            {
                title: 'Qaytib keldi',
                value: streamsStore.$state.stream.orders_stats.canceled
            },
            {
                title: 'Arxivlandi',
                value: streamsStore.$state.stream.orders_stats.archived
            }
        ]"    
    />
    </div>
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
import copyIcon from "@/assets/svgs/copyIcon.vue";
import CreatedStreamCard from '@/components/streams/CreatedStreamCard.vue'
import ProfileSettingMenu from '@/components/menu/ProfileSettingMenu.vue'
import { useBackButton } from '@/composables/useBackButton';
import { defineComponent, onBeforeMount, reactive, ref } from 'vue-demi';
import { useToastStore } from '@/store/useToastStore';
import { deleteAdminStream, getAdminStream } from '@/api/advertiserApi';
import { useRoute } from 'vue-router';
import { useStreamsStore } from '@/store/server/useStreamsStore';
import CustomConfirm from '@/components/CustomConfirm.vue'
import router from '@/router';
export default defineComponent({
    setup() {
        const { backButton } = useBackButton();
        const toastStore = useToastStore();
        const streamsStore = useStreamsStore();
        const route = useRoute();
        const openDeleteStreamConfirmDialog = ref(false)
        backButton()
        const streamForm = reactive({
            link: ""
        })
        const streamInfo = ref({})
        const copyToClipboard = (e, text) => {
            navigator.clipboard.writeText(text).then(() => {
                toastStore.$patch({
                    x: `${e.clientX}px`,
                    y: `${e.clientY}px`,
                    isShownToast: true,
                    message: "Nusxalandi",
                    type: "",
                    width: 70,
                    icon: true
                });
    
                setTimeout(() => {
                    toastStore.$patch({
                        isShownToast: false
                    });
                }, 800) 
            }) 
        }

        const openPost = () => {
            window.open('https://t.me/Indonesia_Javascript')
        }

        const onConfirm = (e) => {
            if(e) {
                deleteStream(route.params.id)
            }

            openDeleteStreamConfirmDialog.value = false;
        }
        
        const deleteStream = (stream_id) => {
            deleteAdminStream({ stream_id })
                .then(() => {
                    toastStore.showToastAsAlert({
                        message: "O'chirildi",
                        type: "success",
                        delayTime: 1000
                    })
                    router.back();
                }).catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 3000
                    })
                })
        }
        const getStream = () => {
            getAdminStream({ id: route.params.id })
                .then(response => {
                    streamsStore.$patch({
                        stream: response.data.data 
                    });
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
            streamInfo,
            openPost,
            deleteStream,
            openDeleteStreamConfirmDialog,
            onConfirm,
            streamsStore
        }
    },
    components: {
        CustomConfirm,
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


   .profile-setting-menu__lists--item {
        font-size: 1.5rem;
        color: $red;
        display: flex;
        align-items: center;
        gap: 2rem;
    }
</style>