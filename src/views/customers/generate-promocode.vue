<template>
    <div class="promocode-card">
        <p>Promo-kod</p>
        <input type="text" placeholder="Misol uchun: 100KUZ">
    </div>
    <p class="promocode-info">
        Quyidagi link orqali ilovani yuklab olish mumkun. Ilovani yuklagan foydalanuvchilar quyidagi promo-kod orqali chegirmalarga ega bo‘lishadi.
    </p>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
export default {
    setup() {
        const { backButton } = useBackButton()
        backButton()

        watchEffect(() => {
            tg.MainButton.setParams({
                text: "Promo-kod yaratish",
                textColor: "#8C8C8C",
                color: "#E4E6E4"
            })
            tg.MainButton.show()

            tg.MainButton.onClick(() => {
                router.push({name: 'generate-promocode'})
            })
        })
    },
}
</script>
<style lang="scss" scoped>
    .promocode-card {
        @include card-mixin;
        p {
            color: $blue;
            font-weight: 500;
            font-size: 1.5rem;
            padding: 1.9rem 2.1rem .9rem 2.1rem;
        }

        input {
            padding: 1rem 2rem;
            display: block;
            outline: none;
            color: rgba(0, 0, 0, 0.45);
            font-weight: 400;
            font-size: 1.5rem;
            border: none;
            &::placeholder {
                color: rgba(0, 0, 0, 0.45);

            }
        }
    }

    .promocode-info {
        color: $gray-variant;
        font-weight: 400;
        font-size: 1.2rem;
        padding: 1.2rem 1.6rem;
    }
</style>