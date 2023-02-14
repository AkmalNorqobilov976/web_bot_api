<template>
    <div v-if="cardData" class="payment-list">
        <div class="payment-list__icon" :class="`payment-${cardData.status}`">
            <i 
                :class="[
                    {'ri-checkbox-circle-fill': cardData.status == 'paid'}, 
                    {'ri-spam-3-fill': cardData.status == 'cancelled'},
                    {'ri-time-fill': cardData.status == 'new'}]"
                ></i>
        </div>
        <div class="payment-list__body">
            <p class="payment-list__body--debit-card">
                {{ $filter.debitCardFormat(cardData.account) }}
            </p>
            <div class="payment-list__body--income">
                <p>{{ $filter.numberFormat(cardData.amount) }} so‘m</p>
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
        debitCard: {
            default: "9860 1234 5678 9012"
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
            i {
                font-size: 2rem;
            }
        }

        &__body {
            flex: 1 1 auto;
            &--debit-card {
                color: $black;
                font-size: 1.7rem;
                font-weight: 500;
                
            }
            &--income {
                font-size: 1.5rem;
                display: flex;
                color: $gray;
                justify-content: space-between;
                align-items: center;
                margin-top: 1rem;
                p {
                    flex: 1 1 auto;
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

    .payment-paid {
        background: rgba($color: #23B60B, $alpha: .2) !important;
        border: .1rem solid rgba($color: #23B60B, $alpha: 1.0) !important;
        i {
            color: rgba($color: #23B60B, $alpha: 1.0) !important;
        }
    }

    .payment-cancelled {
        background: rgba($color: #ED5974, $alpha: .2) !important;
        border: .1rem solid rgba($color: #ED5974, $alpha: 1.0) !important;
        i {
            color: rgba($color: #ED5974, $alpha: 1.0) !important;
        }
    }

    .payment-new {
        background: rgba($color: #F1A30C, $alpha: .2) !important;
        border: .1rem solid rgba($color: #F1A30C, $alpha: 1.0) !important;
        i {
            color: rgba($color: #F1A30C, $alpha: 1.0) !important;
        }
    }

</style>