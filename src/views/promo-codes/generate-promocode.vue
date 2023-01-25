<template>
    <div class="promocode-card">
        <under-line-input
            label="Promo-kod"
            v-model="promocodeForm.code"
            placeholder="Misol uchun: 100KUZ"
        />
    </div>
    <p class="promocode-info">
        Quyidagi link orqali ilovani yuklab olish mumkun. Ilovani yuklagan foydalanuvchilar quyidagi promo-kod orqali chegirmalarga ega bo‘lishadi.
    </p>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
import { defineComponent, reactive, watchEffect, watch, onUnmounted, onMounted } from '@vue/runtime-core'
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
        const { tg, tgMainButtonOffClick, hideMainButton, showMainButton, tgSetParamsToMainButton } = useTelegram();
        const toastStore = useToastStore()
        backButton('/promo-codes/main')

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
                router.push({name: 'promo-codes'})
                return tgMainButtonOffClick();
            }).catch(error => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                    type: 'error',
                    delayTime: 1000
                })
                return tgMainButtonOffClick();
            })
        }

        const promocodeFormWatcher = watch(promocodeForm, (newValue) => {
            console.log("zo'r");
            if(newValue.code) {
                console.log(newValue.code);
                tgSetParamsToMainButton({
                    text: "Promo-kod yaratish",
                    textColor: "#ffffff",
                    color: "#55BE61"
                })
            }else {
                tgSetParamsToMainButton({
                    text: "Promo-kod yaratish",
                    textColor: "#8C8C8C",
                    color: "#E4E6E4"
                });
            }
            showMainButton()
        }, {
            immediate: true
        })
        const watcher = watchEffect(() => {
            tg.MainButton.onClick(() => {
                onPostPromoCode();

                tgMainButtonOffClick()
            })
        })
        onMounted(() => {
            showMainButton();
        })
        onUnmounted(() => {
            watcher();
            hideMainButton();
            promocodeFormWatcher()
        })
        return {
            promocodeForm,
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