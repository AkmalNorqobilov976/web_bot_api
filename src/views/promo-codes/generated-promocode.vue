<template>
    <div class="createdStream" v-if="promoCode">
        <p class="createdStream__title">Promo-kod yaratildi</p>
        <p class="createdStream__subtitle">Quyidagi Promo-kod orqali ilovadan ro‘yhatdan o‘tgan foydalanuvchilar chegirmalarga ega bo‘lishadi va sizga bonuslar tushishni boshlaydi</p>
        <div class="createdStream__card">
            {{ promoCode.code }}
        </div>

        <section class="stream-name">
            <form @submit.prevent="">
                <!-- error-input class -->
                <div class="stream-name__input">
                    <input 
                        class="" 
                        readonly 
                        :value="promoCode.url"
                        ref="generatePromoCodeRef"
                        placeholder="Misol uchun: 1-oqim linki" 
                    />
                </div>
            </form>
        </section>

        <p class="createdStream__address">
            Sizning yangi “Promo-kod” manzilingiz
        </p>
        <div class="createdStream__button" @click="copyToClipboard($event, promoCode.url, $refs.generatePromoCodeRef)">
            <copy-icon/>
            Manzilni nusxalash
        </div>
    </div>
</template>

<script>
import CopyIcon from '@/assets/svgs/copyIcon.vue'
import { getAdminPromocode } from '@/api/advertiserApi'
import { useRoute } from 'vue-router'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'
import { onBeforeMount, ref } from 'vue-demi'
import { useToastStore } from '@/store/useToastStore'
import { useBackButton } from '@/composables/useBackButton'
export default {
    setup() {
        const route = useRoute();
        const { copyToClipboard } = useCopyToClipboard();
        const promoCode = ref(null);
        const toastStore = useToastStore();
        const { backButton } = useBackButton();
        backButton('/promo-codes/main');
        const getPromocode = () => {
            getAdminPromocode(route.params.id)
                .then(response => {
                    promoCode.value = response.data.data;
                })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        delayTime: 3000,
                        type: 'error'
                    })
                })
        }


        onBeforeMount(() => {
            getPromocode();
        })

        return {
            promoCode,
            copyToClipboard
        }
  
    },
    components: {
        CopyIcon  
    }
}
</script>

<style lang="scss" scoped>
    .createdStream {
        text-align: center;
        padding: 3rem 1.6rem;
        &__title {
            font-size: 1.8rem;
        }
        &__subtitle {
            margin-top: 1.6rem;
            color: $gray-variant;
            font-size: 1.6rem;
            margin-bottom: 3rem;
        }
        &__card {
            color: $white;
            box-sizing: content-box;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('@/assets/images/promo-kod.png');
            background-size: 100% 100%;
            font-weight: 700;
            height: 8rem;
            padding: 5rem -0rem;
            margin: 0 -1rem;
            padding-right: 5.8rem;
            font-size: 2.8rem;
        }

        &__address {
            font-size: 1.3rem;
            color: $gray-variant;
            font-weight: 400;
            margin-bottom: 3rem;
        }

        &__button {
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.36rem;
            color: $white;
            text-align: center;
            padding: 1.6rem 0;
            background: $blue;
            border-radius: .7rem;
        }
    }

    .stream-name {
        margin-bottom: .8rem;
        font-weight: 400;
        font-size: 1.5rem;
        &__title {
            color: $blue;
            text-align: left;
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
                font-size: 1.5rem;
                font-weight: 900;
                color: black;
                border: none;
                outline: none;
            }

        }
    }

</style>