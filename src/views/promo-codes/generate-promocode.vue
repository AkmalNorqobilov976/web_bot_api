<template>
    <div class="promocode-card">
        <under-line-input
            label="Promo-kod"
            v-model="promocodeForm.code"
            placeholder="Misol uchun: 100KUZ"
        />
    </div>
    <p class="promocode-info" @click="onPostPromoCode">
        Quyidagi link orqali ilovani yuklab olish mumkun. Ilovani yuklagan foydalanuvchilar quyidagi promo-kod orqali chegirmalarga ega bo‘lishadi.
    </p>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
import { defineComponent, ref, reactive, watchEffect, onBeforeUnmount } from '@vue/runtime-core'
import { useTelegram } from '@/composables/useTelegram'
import UnderLineInput from '@/components/Form/inputs/UnderLineInput.vue'
import { useRouter } from 'vue-router'
import { postPromoCode } from '@/api/advertiserApi'
import { useToastStore } from '@/store/useToastStore'
export default defineComponent({
    components: {
        UnderLineInput
    },
    setup() {
        const { backButton } = useBackButton()
        const router = useRouter();
        const { tg, tgMainButtonOffClick, hideMainButton } = useTelegram();
        const toastStore = useToastStore()
        backButton()

        const promocodeForm = reactive({
            code: ""
        });

        const onPostPromoCode = () => {
            postPromoCode({
                code: promocodeForm.code
            }).then(() => {
                toastStore.showToastAsAlert({
                    message: "Promo cod qo'shildi!!!",
                    type: 'success',
                    delayTime: 1000
                });
                tgMainButtonOffClick();
                router.push({name: 'promo-codes'})
            }).catch(error => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                    type: 'error',
                    delayTime: 1000
                })
                tgMainButtonOffClick();
            })
        }
        const watcher = watchEffect(() => {
            tg.MainButton.setParams({
                text: "Promo-kod yaratish",
                textColor: "#8C8C8C",
                color: "#E4E6E4"
            })
            tg.MainButton.show()

            tg.MainButton.onClick(() => {
                onPostPromoCode();
            })
        })

        onBeforeUnmount(() => {
            watcher();
            hideMainButton();
        })
        return {
            promocodeForm,
            onPostPromoCode
        }
    }
})
</script>
<style lang="scss" scoped>
    .promocode-card {
        @include card-mixin;
        padding: 1.9rem 2.1rem .9rem 2.1rem;
    }

    .promocode-info {
        color: $gray-variant;
        font-weight: 400;
        font-size: 1.2rem;
        padding: 1.2rem 1.6rem;
    }
</style>