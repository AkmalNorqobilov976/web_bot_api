<template>
    <div class="payment-list">
        <div class="payment-list__icon">
            <i :class="icon"></i>
        </div>
        <div class="payment-list__body">
            <p class="payment-list__body--debit-card">
                {{ debitCard }}
            </p>
            <div class="payment-list__body--income">
                <p>{{ price }}</p>
                <span class="payment-list__body--income-time">{{ sentTime }}</span>
            </div>
        </div>
    </div>
    <div class="cancel-btn-slot">
        <slot name="cancel-btn"></slot>
    </div>
</template>

<script>
export default {
    props: {
        debitCard: {
            default: "#478725 raqamli jo'natma uchun tizim komissiyasi yechib olindi."
        },
        price: {
            default: "500.000 so‘m"
        },
        sentTime: {
            default: "2 daq oldin"
        },
        icon: {
            type: String,
            default: "ri-time-fill"
        },
        iconColor: {
            default: "#F1A30C"
        },
       
    },
    data: () => ({
         iconBgColor: ""
    }),
    mounted() {
        this.iconBgColor = `${this.iconColor}20`
    }
}
</script>
<style lang="scss" scoped>
    .payment-list {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.4rem 1.6rem;
        font-size: 1.5rem;
        border-top: 1px solid #EDEDED;
        background: $white;

        &__icon {
            padding: 1.4rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: v-bind('iconBgColor');
            border: .1rem solid v-bind('iconColor');
            i {
                font-size: 2rem;
                color: v-bind('iconColor');
            }
        }

        &__body {
            flex: 1 1 auto;
            display: flex;
            gap: 1rem;
            flex-direction: column-reverse;
            &--debit-card {
                color: $gray;
                font-size: 1.5rem;
                font-weight: 400;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                
            }
            &--income {
                font-size: 1.5rem;
                display: flex;
                color: $gray;
                justify-content: space-between;
                align-items: center;
                p {
                    flex: 1 1 auto;
                    font-size: 1.7rem;
                    color: $black;
                }

                &-time {
                    font-size: 1.1rem;
                }
            }

        }
    }
    .cancel-btn-slot {
        background: $white;
    }
</style>