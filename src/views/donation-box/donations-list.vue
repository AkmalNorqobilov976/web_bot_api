<template>
    <div class="d-grid-max-content">
        <div class="donation">
            <p class="donation__amount">{{$lodashGet(donationsStore, 'balance', 12)}} so'm</p>
            <div class="donation__lists">
                <div class="donation__lists--list" v-for="(item, i) in $lodashGet(donationsStore, 'donations', [])" :key="i">
                    <div class="donation__lists--list--i1">
                        {{ $lodashGet(item, 'charity')}}
                        <span>sum</span>
                    </div>
                    <div class="donation__lists--list--i2">
                        <div>
                            <p>
                                 {{ $lodashGet(item, 'id')}}-oqim
                            </p>
                            <p>
                                id: {{ $lodashGet(item, 'user_id')}}
                            </p>
                        </div>
                        <p>
                            {{$lodashGet(item, 'visits', 0)}} tashrif
                        </p>
                    </div>
                </div>
                 <div ref="intersectionTrigger" style="height: 10px; background: transparent;"> 
                    <loading v-if="donationsStore.page !=1 && donationsStore.loading"/>
                </div>
            </div>
        </div>
        
        <message-not-found v-if="!$lodashGet(donationsStore, 'donations', '').length"/>
    </div>
</template>

<script>
import MessageNotFound from "@/components/MessageNotFound.vue";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useDonationsStore } from '@/store/server/useDonationsStore'
import { useToastStore } from "@/store/useToastStore";
import Loading from "@/components/Loading.vue";
import { makeUseInfiniteScroll } from "vue-use-infinite-scroll";
export default defineComponent({
  components: { MessageNotFound, Loading },
    setup() {
        const donationsStore = useDonationsStore();
        const toastStore = useToastStore();
         const intersectionTrigger = ref(null)
        const useInfiniteScroll = makeUseInfiniteScroll({});
        const pageRef = useInfiniteScroll(intersectionTrigger);

        const getCharities = () => {
            donationsStore.getDonations()
            .catch(error => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message || error.message || "Tarmoqda nosozlik",
                    delayTime: 3000,
                    type: 'error'
                })
            })
        }
        onMounted(() => {
            getCharities();
        })


        watch(pageRef, () => {
            getCharities();
        })
        return {
            donationsStore
        }
    },
})
</script>

<style lang="scss" scoped>
    .donation {
        @include card-mixin;
        padding-bottom: 2rem;
        &__amount {
            color: $black;
            font-size: 4rem;
            text-align: center;
            padding: 5rem;
        }

        &__lists {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            font-size: 1.5rem;
            color: $gray;
            padding: 0 1.5rem;
           &--list {
             display: grid;
             grid-gap: 1rem;
            grid-template-columns: max-content 1fr;
            padding: .6rem 0;

            &--i1 {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: .1rem solid $green;
                background: rgba($color: $green, $alpha: .1);
                color: $green;
                aspect-ratio: 1/1;
                padding: .7rem;
                border-radius: 50%;
            }

            &--i2 {
                & div:first-child {
                    display: flex;
                    justify-content: space-between;
                    color: $black;
                    & p:first-child {
                        font-size: 1.8rem;
                        margin-bottom: .5rem;
                    }
                }

                & div:last-child {
                    color: #83868B;
                }

            }
            border-bottom: .1rem solid #E9EBEA;
            // grid-template-rows: max-content 1fr;
           }
        }
    }
</style>