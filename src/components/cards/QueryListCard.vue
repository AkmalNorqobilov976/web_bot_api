<template>
  <article
    class="query-link"
  >
    <!-- v-touch:swipe.left="goTabLeft"
    v-touch:swipe.right="goTabRight" -->
    <!-- <header class="query-link__header">
      <i class="ri-link-m query-link__header--icon"></i>
      <div class="query-link__header--title">
        Ikkinchi havolam
        <p>
          <i class="ri-copper-coin-fill"></i>
          94.000 UZS
        </p>
      </div>
    </header> -->
    <main class="query-link__lists">
      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-file-list-line"></i>
          <div>
            #12456 / 79
           <p class="query-link__lists--i1--text--subtitle">1 hafta oldin</p>
          </div>
        </div>
        <div class="query-link__lists--i1--btn">
          <button>{{ btnText }}</button>
        </div>
      </section>
      <section class="query-link__lists--i1 border-.2">
        <div class="query-link__lists--i1--text">
          <i class="ri-message-line"></i>
          Raqam noto‘g’ri
        </div>
      </section>
      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-contacts-line"></i>
          Davron Abullayev +998(90)***-12-12
        </div>
      </section>
      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-pin-distance-line"></i>
          Toshkent sh, Uchtepa t, Foziltepa k
        </div>
      </section>

      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-survey-fill"></i>
          <div>
            Avtomabil uchun vertalyot suviner
            <div class="query-link__lists--i1--subtext">#59492</div>
          </div>
        </div>
      </section>

      <section class="query-link__lists--i1" @click="$router.push({ name: 'created-stream' })">
        <div class="query-link__lists--i1--text">
          <i class="ri-link-m"></i>
          1-oqim
        </div>
        <div class="query-link__lists--i1--btn">
            <i class="ri-arrow-right-s-line"></i>
        </div>
      </section>
      
    </main>
  </article>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        btnBgColor: {
            type: String,
            default: "#D60A0A"
        },
        btnText: {
            type: String,
            default: "Arxivlandi"
        }
    }
})
</script>

<style lang="scss" scoped>
.query-link {
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  &__header {
    @include card-mixin;
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    font-weight: 900;
    padding: 1rem 1.6rem;
    &--icon {
      font-size: 1.77rem;
      background: $blue;
      color: $white;
      border-radius: 50%;
      padding: 1.64rem;
      margin-right: 1.4rem;
    }

    &--title {
      font-size: 2rem;
      p {
        display: flex;
        color: $green;
        margin-top: 0.85rem;
        align-items: center;
        gap: 0.6rem;
      }
    }
  }

  &__lists {
    @include card-mixin;
    &--i1 {
      padding: 1.4rem 2.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include card-mixin;
      &--text {
        display: flex;
        align-items: center;
        gap: 2.5rem;
        font-weight: 500;
        i {
          font-size: 2rem;
          color: $gray;
        }

        &--subtitle {
            color: $gray;
            margin-top: .2rem;
        }
      }

      &--btn {
        button {
          @include btn-mixin;
          background: v-bind('btnBgColor');
          color: $white;
        }
      }

      &--subtext {
        color: $gray-variant;
      }
    }

    & &--i1:last-child {
        color: $blue;
        i {

            color: $blue;
        }
    }

    footer {
      color: $gray;
      @include card-mixin;
      text-align: center;
      padding: 1.1rem 0;
    }
  }
}
</style>