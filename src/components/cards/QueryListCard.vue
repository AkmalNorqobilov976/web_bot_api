<template>
  <article
    class="query-link"
  >
    <main class="query-link__lists">
      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-file-list-line"></i>
          <div>
            #{{ $lodashGet(listData, 'operator_id', 0) }} / {{ $lodashGet(listData, 'id', 0) }}
           <p class="query-link__lists--i1--text--subtitle">{{ $lodashGet(listData, 'created_at_label', 0)}}</p>
          </div>
        </div>
        <div class="query-link__lists--i1--btn">
          <button :class="`${listData.status}-btn`">{{ statusTypes[listData.status] }}</button>
        </div>
      </section>
      <section class="query-link__lists--i1 border-.2">
        <div class="query-link__lists--i1--text">
          <i class="ri-message-line"></i>
          {{ $lodashGet(listData, 'note') ? $lodashGet(listData, 'note') : "Izoh mavjud emas!!!" }}
        </div>
      </section>
      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-contacts-line"></i>
          {{$lodashGet(listData, 'client_full_name') || 'Ism mavjud emas!'}} {{ $lodashGet(listData, 'customer_phone') || 'Nomer mavjud emas!' }}
        </div>
      </section>
      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-pin-distance-line"></i>
          {{ $lodashGet(listData, 'full_address') || 'Manzil kiritilmagan!' }}
        </div>
      </section>

      <section class="query-link__lists--i1">
        <div class="query-link__lists--i1--text">
          <i class="ri-survey-fill"></i>
          <div>
            {{ $lodashGet(listData, 'product_title') || 'Mahsulot mavjud emas'}}
            <!-- <div class="query-link__lists--i1--subtext">#59492</div> -->
          </div>
        </div>
      </section>

      <section class="query-link__lists--i1" @click="$lodashGet(listData, 'stream_name') && $router.push({ name: 'created-stream', params: {id: listData.stream_id} })">
        <div class="query-link__lists--i1--text">
          <i class="ri-link-m"></i>
          {{$lodashGet(listData, 'stream_name') || "Oqim mavjud emas!"}} 
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
        },
        listData: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        statusTypes: {
            new: "Yangi",
            accepted: "Yetkazishga tayyor",
            sent: "Yetkazilmoqda",
            delivered: "Yetkazib berildi",
            canceled: "Qaytib keldi",
            hold: "Keyin oladi",
            archived: "Arxiv",
            spam: "Spam"
        }
    })
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

    .new-btn, .pending-btn, .hold-btn  {
        background: #F1A30C;
    }
    .accepted-btn, .sent-btn, .delivered-btn {
        background: $green;
    }

   
  .cancelled-btn,
  .archived-btn,
  .spam-btn {
    background: $red;
  }
}
</style>