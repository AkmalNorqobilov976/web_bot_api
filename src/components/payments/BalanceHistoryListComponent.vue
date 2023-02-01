<template>
    <div class="payment-list" v-if="cardData">
        <div class="payment-list__icon" :class="cardData.type == 'minus' ? 'balance-minus' : 'balance-plus'">
            <i :class="cardData.type =='minus' ? 'ri-arrow-left-down-line' : 'ri-arrow-right-up-line'"></i>
        </div>
        <div class="payment-list__body">
            <p class="payment-list__body--debit-card">
                #{{ cardData.target_id }} {{ cardData.comment }}
            </p>
            <div class="payment-list__body--income">
                <p>{{ cardData.amount }} so‘m</p>
                <span class="payment-list__body--income-time">{{ cardData.created_at_label }}</span>
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
        cardData: {

        },
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

    .balance-minus {
        background: rgba($color:  #F1A30C, $alpha: .2) !important;
        color: #F1A30C !important;
        border: #F1A30C solid .1rem !important;
    }
    // transaction.type ? 
    .balance-plus {
        background: rgba($color: #23B60B, $alpha: .2) !important;
        color: #23B60B !important;
        border: #23B60B solid .1rem !important;
    }
</style>