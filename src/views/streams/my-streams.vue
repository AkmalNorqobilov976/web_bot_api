<template>
    <main class="streams">
        <div ref="scrollComponent">
            <article 
                v-for="(item, i) in streamsStore.$state.streams" 
                :key="i" 
                class="streams-list" 
                @click="$router.push({name: 'stream-preview', params: {id: item.id}})"
            >
                <div class="streams-list__image">
                    <img 
                        v-if="item.product.image" 
                        :src="item.product.image || item.product.image" 
                        alt="none"
                    >
                    <i v-else class="ri-link-m"></i>
                </div>
                <div class="streams-list__info">
                    <div class="streams-list__info--header">
                        <div>
                            {{ item.name }}
                        </div>
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
        </div>
        <message-not-found v-if="!streamsStore.$state.streams.length"/>
    </main>
</template>

<script>
import MessageNotFound from '@/components/MessageNotFound.vue';
import { useBackButton } from '@/composables/useBackButton'
import { useLastRoute } from '@/composables/useLastRoute';
import { useStreamsStore } from '@/store/server/useStreamsStore'
import { useToastStore } from '@/store/useToastStore';
import { defineComponent, ref, onMounted, onUnmounted } from 'vue-demi'
export default defineComponent({
  components: { MessageNotFound },
    setup() {
        const { backButton } = useBackButton();
        const streamsStore = useStreamsStore();
        const scrollComponent = ref(null);
        const toastStore = useToastStore();
        const { setLastRoute } = useLastRoute();
        setLastRoute();
        backButton();
        useLastRoute().setLastRoute();

        onMounted(() => {
            streamsStore.$patch({
                page: 1
            })
            getStreams();
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })
        const oldScrollY = ref(window.scrollY);
        const handleScroll = (e) => {
            let element = scrollComponent.value;
            if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 2 && oldScrollY.value < window.scrollY) {
                getStreams();
            }
            oldScrollY.value = window.scrollY;
        }
        const getStreams = () => {
            streamsStore.getStreams()
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }
        
    
        return {
            streamsStore,
            scrollComponent
        }
    },
})
</script>
<style lang="scss" scoped>
    .streams {
        height: 100vh;
        display: grid;
        grid-template-rows: max-content 1fr;
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
                border: .1rem solid #E9EBEA;
                height: 4.8rem;
                width: 4.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                img {

                    height: 4.8rem;
                    width: 4.8rem;
                    height: 4.8rem;
                    width: 4.8rem;
                    object-fit: contain;

                }
                i {
                    
                    color: $blue;
                    font-size: 3.2rem;
                    font-weight: 400;
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
                    div {
                        line-height: 1.6rem;
                        display: inline-block;
                        width: 180px;
                        white-space: nowrap;
                        overflow: hidden !important;
                        text-overflow: ellipsis;
                    }
                    span {
                        display: flex;
                        gap: .269rem;
                        align-items: center;
                        font-weight: 400;
                        font-size: 1.8rem;
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
                        width: 15rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
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