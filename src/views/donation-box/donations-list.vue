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
                <div class="donation__info">
                     <div>
                        Assalomu aleykum, hurmatli jamoamiz adminlari.
                        Ushbu sahifada siz yani 100k.uz sayti
                        adminlari yordamida hayriya ishlari
                        uchun toplangan mablaglarni kuzatishingiz mumkin.
                    </div>
                    <div>
                        Sahifada hozircha umumiy toplangan mablagni
                        va hayriya funksiyasi yoqilgan oqimlar
                        royhatini korishingiz mumkin.
                    </div>
                    <div>
                        Yigilgan mablag bolalar yoki qariyalar uylari
                        hisob raqamiga yoki ogir kasalga uchragan
                        lekin davolanishga sharoiti yoq vatandoshlarimiz
                        karta raqamlariga yonaltiriladi.
                    </div>
                    <div>
                        Mablagni topshirish vaqtida 100k.uz saytida
                        ishlovchi istalgan admin ishtirok etishi mumkin.

                        Ushbu sahifa keyinchalik yangiliklar ko'rinishida
                        barcha hayriyalar haqida malumotlar chop etiladi.
                    </div>
                    <div>
                        Eslatma: Hayriya qutisiga mablag ajratish
                        uchun Market bolimiga tashrif buyuring va oqim yaratish
                        oynasida hayriya summasini kiriting va tizim aynan osha
                        oqim har bir sotilgan buyurtmasidan kiritilgan
                        hayriya summasi ushlab qoladi.
                    </div>
                    <div>
                    Hayriya dasturida ishtirok etmagan bo'lsangiz
                    albatta siz ham ishtirok etib hissangizni qoshing,
                    hattoki 500 so'm ham kopchilik yordami kimnidir
                    hayotini saqlab qolishi yoki yahshilikka ozgartirishi mumkin.

                    Birgalikda biz katta kuchmiz!
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
import { useBackButton } from "@/composables/useBackButton";
export default defineComponent({
  components: { MessageNotFound, Loading },
    setup() {
        const { backButton } = useBackButton();
        const donationsStore = useDonationsStore();
        const toastStore = useToastStore();
         const intersectionTrigger = ref(null)
        const useInfiniteScroll = makeUseInfiniteScroll({});
        const pageRef = useInfiniteScroll(intersectionTrigger);
        backButton();
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

    .donation__info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
    }
</style>