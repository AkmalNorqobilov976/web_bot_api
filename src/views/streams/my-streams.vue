<template>
    <main class="streams">
        <article 
            v-for="(item, i) in streamsStore.$state.streams" 
            :key="i" 
            class="streams-list" 
            @click="$router.push({name: 'stream-preview', params: {id: item.id}})"
        >
            <div class="streams-list__image">
                <img :src="item.product.image ? item.product.image : $noImage" alt="none">
            </div>
            <div class="streams-list__info">
                <div class="streams-list__info--header">
                    {{ item.name }} 
                    <span>
                        <i class="ri-eye-line"></i>
                        {{ item.visits }}
                    </span>
                </div>
                <div class="streams-list__info--text">
                    <div class="streams-list__info--text--context">
                        {{ item.product.title }}
                    </div>
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
        </article>
        <!-- <article class="streams-list">
            <div class="streams-list__image">
                <span class="streams-list__image--front-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1106_13902)">
                        <path d="M2.25 7.5H1.5V3.00225C1.5 2.58675 1.84125 2.25 2.244 2.25H15.756C15.8545 2.24979 15.952 2.26917 16.0429 2.307C16.1338 2.34484 16.2162 2.40037 16.2855 2.47038C16.3547 2.54038 16.4093 2.62345 16.4462 2.71477C16.483 2.80608 16.5013 2.9038 16.5 3.00225V7.5H15.75V15.0008C15.7503 15.0988 15.7313 15.196 15.694 15.2868C15.6567 15.3775 15.602 15.46 15.5328 15.5296C15.4636 15.5992 15.3815 15.6545 15.2909 15.6923C15.2004 15.7301 15.1033 15.7497 15.0052 15.75H2.99475C2.89665 15.7497 2.79957 15.7301 2.70906 15.6923C2.61854 15.6545 2.53636 15.5992 2.4672 15.5296C2.39804 15.46 2.34327 15.3775 2.306 15.2868C2.26873 15.196 2.2497 15.0988 2.25 15.0008V7.5ZM14.25 7.5H3.75V14.25H14.25V7.5ZM3 3.75V6H15V3.75H3ZM6.75 9H11.25V10.5H6.75V9Z" fill="white"/>
                        <line x1="17.5303" y1="1.53033" x2="1.53033" y2="17.5303" stroke="white" stroke-width="1.5"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1106_13902">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>


                </span>
                <img :src="require('@/assets/images/round.png')" alt="">
            </div>
            <div class="streams-list__info">
                <div class="streams-list__info--header">
                    Ikkinchi havolam 
                    <span>
                        <i class="ri-eye-line"></i>
                        34094
                    </span>
                </div>
                <div class="streams-list__info--text">
                    <div class="streams-list__info--text--context">
                        Vitek issiq va sovuq havo haydovchi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, repellendus.
                    </div>
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
        </article>
        <article class="streams-list">
            <div class="streams-list__image">
                 <span class="streams-list__image--front-icon">
                    <i class="ri-close-line"></i>
                </span>
                <img :src="require('@/assets/images/round.png')" alt="">
            </div>
            <div class="streams-list__info">
                <div class="streams-list__info--header">
                    Ikkinchi havolam 
                    <span>
                        <i class="ri-eye-line"></i>
                        34094
                    </span>
                </div>
                <div class="streams-list__info--text">
                    <div class="streams-list__info--text--context">
                        Vitek issiq va sovuq havo haydovchi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, repellendus.
                    </div>
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
        </article> -->
    </main>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
import { useStreamsStore } from '@/store/server/useStreamsStore'
import { useToastStore } from '@/store/useToastStore';
import { defineComponent, onBeforeMount } from 'vue-demi'
export default defineComponent({
    setup() {
        const { backButton } = useBackButton();
        const streamsStore = useStreamsStore();
        const toastStore = useToastStore();
        backButton();

        onBeforeMount(() => {
            streamsStore.getStreams()
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        })
    
        return {
            streamsStore
        }
    },
})
</script>
<style lang="scss" scoped>
    .streams {
        &-list {
            @include card-mixin;
            padding: 1.4rem 1.6rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            &__image {
                // display: none;
                object-fit: contain;
                overflow: hidden;
                // border: 1px solid #E9EBEA;
                background: transparent;
                position: relative;
                img {

                    height: 4.8rem;
                    width: 4.8rem;
                    object-fit: contain;

                }
                &--front-icon {
                    position: absolute;
                    height: 4.8rem;
                    width: 4.8rem;
                    padding: 1.6rem;
                    background: rgba($color: #EB1414, $alpha: .8);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    svg {
                        font-size: 1.5rem;
                    }
                    i {
                        color: $white;
                        font-size: 2.1rem;
                    }
                }
                border-radius: 50%;
                image {
                    width: 4.8rem;
                    height: 4.8rem;
                    object-fit: cover;
                }
            }

            &__info {
                flex: 1 1 auto;
                &--header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1.7rem;
                    font-weight: 500;
                    margin-bottom: 1.3rem;
                    span {
                        display: flex;
                        gap: .269rem;
                        align-items: center;
                        font-weight: 400;
                        font-size: 1.3rem;
                        color: $blue;
                    }
                }

                &--text {
                    display: flex;
                    align-items: center;
                    color: $gray;
                    gap: 1.4rem;
                    font-size: 1.5rem;
                    &--context {
                        flex: 1 1 auto;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }

        .strike-archive {
            position: relative;
            border-radius: 50%;
            &::after {
                position: absolute;
                // content: url('../../assets/');

            }
        }
    }
</style>