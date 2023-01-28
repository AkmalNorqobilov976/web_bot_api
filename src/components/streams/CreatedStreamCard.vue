<template>
    <div class="created-stream-card">
        <header class="created-stream-card__header">
            <p class="created-stream-card__header--title">
                {{ title }}
            </p>
        </header>
        <main>
            <div 
                class="created-stream-card__item" 
                v-for="(item, i) in items" 
                :key="i"
                :class="{'d-none': (items.length == 2 && i > 1)}"
                :style="(i == 2 && isTwoItem) ? 'display: none': 'display: unset;'"
            >
                <p  :class="{'created-stream-card__item--title': items.length !== 2}">{{ item.title }}</p>
                <p :class="{'created-stream-card__item--value': items.length !== 2}">{{ item.value }}</p>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Title"
        },
        isTwoItem: {
            default: false
        },
        items: {
            default: [
                {
                    title: "yangi",
                    value: 30
                },
                {
                    title: "Qayta qo‘ng’iroq",
                    value: 69
                },
                {
                    title: "Qayta qo‘ng’iroq",
                    value: 69
                }
            ]
        },
        bgCircleColor: {
            type: String,
            default: "#F1A30C"
        }
    }
}
</script>

<style lang="scss" scoped>
    .created-stream-card {
        @include card-mixin;
        padding: 1rem 2.1rem;
        margin-top: .8rem;
        &__header {
            &--title {
                margin: .9rem 0;
                font-size: 1.5rem;
                color: $blue;
                font-weight: 500;
            }
        }

        main {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            padding: 1.2rem 1.25rem;
        }

        &__item {
            align-self: center;
            text-align: center;
            padding: 0 2rem;
            border-left: 1px solid #E9EBEA;
            align-self: center;
            justify-self: center;
            &--title {
                flex: 1 1 auto;
                position: relative;
                font-size: 1.2rem;
                font-weight: 400;
                color: #838C95;
                text-align: center;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                &::before {
                    position: absolute;
                    content: '';
                    z-index: 3;
                    background: v-bind('bgCircleColor');
                    border: 1px solid #E9EBEA;
                    left: -1.5rem;
                    width: .6rem;
                    height: .6rem;
                    clip-path: circle(.3rem at 50% 50%);
                }
            }

            &--value {
                font-size: 2rem;
                font-weight: 600;
            }
        }

        & &__item:first-child {

            border-left: none;
        }


    }

    .d-none {
        display: none;
    }
</style>