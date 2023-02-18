<template>
    <main class="my-profile">
        {{ userInfo.avatar }}
        <!-- <button @click="updateProfile">Send</button> -->
        <header class="my-profile__header">
            <div class="my-profile__header--photo" @click="this.$refs.profileImage.click()">
                <input 
                    type="file" 
                    ref="profileImage" 
                    @change="onPhotoChange($event)"
                    accept="image/*" 
                    style="display: none;"
                />
                <img v-if="profilePicture" class=""   :src="profilePicture" alt="">
                <img v-else-if="userInfo.avatar" class=""   :src="userInfo.avatar" alt="">
                <i v-else class="ri-user-6-fill"></i>
                <!-- <i class="ri-camera-fill my-profile__header--photo--image-uploader"></i> -->
            </div>
            <p class="my-profile__header--name">{{ userInfo.name }} {{userInfo.surname}}</p>
        </header>

         <div class="my-profile__btn-grp">
            <div class="my-profile__btn-grp--btn">
                <div class="my-profile__btn-grp--btn--1">
                    <span>
                        <i class="ri-link-m"></i>
                    </span>
                    {{ authStore.userInfo.coins }}
                </div>
            </div>
            <div class="my-profile__btn-grp--btn">
                <div class="my-profile__btn-grp--btn--2">
                    <i class="ri-file-list-fill"></i>
                    {{ authStore.userInfo.id }}
                </div>
            </div>
        </div>
        <button @click="updateProfile">Send</button>
        <info-card> 
            <template #body>
                <form @submit.prevent>
                   
                    <div class="my-profile__form--field">
                            <under-line-input 
                                label="Ismingiz" 
                                placeholder="Kiritilmagan"
                                v-model="userInfo.name"
                            />
                    </div>
                    <div class="my-profile__form--field">
                            <under-line-input 
                                label="Familiyangiz" 
                                placeholder="Kiritilmagan"
                                v-model="userInfo.surname"
                            />
                    </div>
                    <div class="my-profile__form--field">
                            <under-line-phone-input
                                placeholder="Kiritilmagan"
                                label="Telefon raqam" 
                                v-model="userInfo.username"
                            />
                    </div>
                    <div class="my-profile__form--field">
                        <under-line-select 
                            label="Viloyat/shahar" 
                             :options="computedRegions"
                            :text="'name'"
                            :value="'id'"
                            placeholder="Kiritilmagan"
                            v-model="userInfo.region_id"
                        />
                    </div>
                    <div class="my-profile__form--field">
                            <under-line-select 
                                label="Tuman" 
                                :options="computedDistricts"
                                :text="'name'"
                                :value="'id'"
                                placeholder="Kiritilmagan"
                                v-model="userInfo.district_id"
                            />
                    </div>
                    <div class="my-profile__form--field">
                        <under-line-input 
                            label="Manzil" 
                            placeholder="Kiritilmagan"
                            v-model="userInfo.address"
                        />
                    </div>
                </form>
            </template>
        </info-card>
        <div class="profile-setting-menu__lists">
            <div @click="logout" class="profile-setting-menu__lists--item">
                <i class="ri-logout-box-r-line"></i>
                <p>Hisobdan chiqish</p>
            </div>
        </div>
    </main>
</template>


<script>
import { defineComponent, ref, watchEffect, onUnmounted, watch, onMounted, computed, onBeforeMount } from 'vue'
import UnderLineInput from '@/components/Form/inputs/UnderLineInput.vue'
import InfoCard from '@/components/cards/InfoCard.vue'
import { useTelegram } from '@/composables/useTelegram'
import { useBackButton } from '@/composables/useBackButton'
import { usePhoneNumberPatternMatch } from '@/composables/usePhoneNumberPatternMatch'
import { useHelperStore } from '@/store/server/useHelperStore'
import { useToastStore } from '@/store/useToastStore'
import { useAuthStore } from '@/store/authStore'
import UnderLineSelect from '@/components/Form/inputs/UnderLineSelect.vue'
import { adminProfile } from '@/api/advertiserApi'
import { logoutUser, updateMyProfile } from '@/api/authApi'
import { useRouter } from 'vue-router'
import { get } from 'lodash'
import UnderLinePhoneInput from '@/components/Form/inputs/UnderLinePhoneInput.vue'
export default defineComponent({
    components: { 
        UnderLineInput, 
        InfoCard, 
        UnderLineSelect ,
        UnderLinePhoneInput
    },
    setup() {
        const isImage = ref(false)
        const profileImage = ref(null)
        const router = useRouter();
        const helperStore = useHelperStore();
        const toastStore = useToastStore();
        const authStore = useAuthStore();
        const profilePicture =ref("");
        const userInfo = ref(authStore.userInfo)

        const logout = () => {
            logoutUser()
                .then(() => {
                    localStorage.removeItem('token')
                    useToastStore().showToastAsAlert({
                        message: "Hisobdan chiqdingiz!!!",
                        delayTime: 3000,
                        type: 'success'
                    })
                    router.push('/login')
                }).catch(() => {
                    localStorage.removeItem('token')
                    router.push('/login')
                })
        }
        
        const computedRegions = computed({
            get() {
                return helperStore.$state.regions
            },
            set(val) {
            
            }
        })
        const computedDistricts = computed({
            get() {
                let districts = helperStore.regions.find(
                (region) => region.id == userInfo.value.region_id
                );
                return districts?.districts;
            }
        })
        const onPhotoChange = (e) => {
            if(e.target.files[0]) {
                userInfo.value.avatar = e.target.files[0]
                profilePicture.value = URL.createObjectURL(e.target.files[0])
            }
        }

        const updateProfile = () => {
            updateMyProfile({ ...userInfo.value })
                .then(() => {
                    toastStore.showToastAsAlert({
                        message: "Profilingiz yangilandi!",
                        type: "success",
                        delayTime: 3000
                    })
                }).catch(error => {
                    toastStore.showToastAsAlert({
                        message: get(error, 'response.data.message', "Xatolik yuz berdi"),
                        type: 'error',
                        delayTime: 3000
                    })
                    throw error;
                });
        }

        const { tg, tgSetParamsToMainButton } = useTelegram()
        const { backButton } = useBackButton()
        backButton();
        onBeforeMount(() => {
            adminProfile()
                .then(response => {
                    userInfo.value = response.data.data;
                })
        })
        onMounted(() => {
            tg.onEvent('mainButtonClicked', updateProfile);

        })

        onUnmounted(() => {
            tg.offEvent('mainButtonClicked', updateProfile);
        })
        watch(userInfo, (currentValue, oldValue) => {
            tgSetParamsToMainButton({
                text: "O‘zgarishlarni saqlash",
                disabled: false
            })
        })
        const watchEffective = watchEffect(() => {
            tgSetParamsToMainButton({
                text: "O‘zgarishlarni saqlash",
                disabled: false
            })

            tg.MainButton.show()
        })

        onUnmounted(() => {
            tg.MainButton.hide();
            watchEffective()
        })

        defineComponent({
            components: {
                UnderLineInput
            }
        })

        const getDistricts = (regionId) => {
            let districts = helperStore.regions.find(
                (region) => region.id == regionId
            );
            return districts?.districts;
        }

        const onPhoneInput = ($event) => {
            $event.target.value = usePhoneNumberPatternMatch($event.target.value);
        }
        return {
            isImage,
            userInfo,
            onPhotoChange,
            onPhoneInput,
            helperStore,
            authStore,
            getDistricts,
            updateProfile,
            computedRegions,
            profilePicture,
            logout,
            computedDistricts
        }
    },
})
</script>
<style lang="scss" scoped>
    .my-profile {
        &__header {
            padding: 1.2rem 0;
            text-align: center;
            position: relative;
            @include card-mixin;

            &--setting {
                position: absolute;
                z-index: 6;
                top: 1.2rem;
                left: 1.8rem;
                display: inline;
            }
            &--photo {
                overflow: hidden;
                cursor: pointer;
                margin: auto;
                width: 6.7rem;
                height: 6.7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border: .1rem solid $blue;
                border-radius: 50%;
                background: rgba($color: $blue, $alpha: .2);
                font-size: 3.3rem;
                color: $blue;
                position: relative;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
                &--image-uploader {
                    position: absolute;
                    background: rgba($color: $gray, $alpha: .2);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    padding: .3rem 0;
                    font-size: 1.3rem;
                }
                i {
                    font-size: 3.3rem;
                }
            }

            &--name {
                margin-top: .8rem;
                color: $black;
                font-size: 2rem;
                font-weight: 550;
            }
        }
        &__btn-grp {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            @include card-mixin;
            padding: .6rem 1.6rem;
            margin-top: .8rem;

            &--btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .817rem;

                div {
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    justify-content: center;
                    gap: .6rem;
                    border: 1px solid #E9EBEA;
                    background: inherit;
                    padding: 1.217rem;
                    outline: none;
                    border-radius: .8rem;
                    font-size: 1.6rem;
                }

                &--1 {
                    color: $black;
                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: .54rem;
                        border-radius: 50%;
                        background: $black;
                        i {
                            color: $white;
                            font-size: 1.5rem !important;
                        }
                    }
                }

                &--2 {
                    color: $blue;
                    i {
                        font-size: 2.5rem;
                    }
                }
            }

        }

        &__form {
            @include card-mixin;
            margin-top: .8rem;
            padding: 1.2rem 1.6rem;
            &--title {
                padding: .9rem .5rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                
            }

            &--field {
                margin-bottom: 1.3rem;
            }
        }
    }

    .profile-setting-menu__lists {
            @include card-mixin;
            margin-top: .8rem;
            top: v-bind('top');
            left: v-bind('left');
            padding: 1.5rem 2rem;
            &--item {
                font-size: 1.5rem;
                color: $red;
                display: flex;
                align-items: center;
                gap: 2rem;
            }
        }
</style>