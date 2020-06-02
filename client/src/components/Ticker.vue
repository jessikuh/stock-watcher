<template>
  <div class="ticker ticker--positive">
    <div class="indicator indicator">
      <div class="indicator__line"></div>
    </div>

    <div class="data">
      <h2 class="uppercase">
        {{ company }}
      </h2>

      <h3 class="uppercase">
        {{ symbol }}
      </h3>

      <div class="data__pricing">
        <div class="data__price">
          706.32
        </div>

        <div class="data__percentage">
          <Arrow /> {{ change }} (<span class="color-green">{{ changePercent }}</span>)
        </div>
      </div>

      <div class="data__summary">
        <div class="open">
          <b><span class="light">OPEN</span> {{ open }}</b>
        </div>
        <div class="high">
          <b><span class="light">HIGH</span> {{ high }}</b>
        </div>
        <div class="low">
          <b><span class="light">LOW</span> {{ low }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/icons/Arrow.vue';

export default {
  name: 'Stock',
  components: {
    Arrow,
  },
  props: {
    symbol: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      company: 'Alphabet Inc Class C',
      open: '1418.39',
      high: '1437.96',
      low: '1418',
      change: '2.90',
      changePercent: '0.2030%',
    };
  },
};
</script>

<style lang="scss" scoped>
  .ticker {
    background-color: $white;
    box-shadow: 0 0 .8rem .2rem rgba($black, .05);
    display: flex;
    flex-flow: row wrap;
    min-height: 10rem;

    h3 {
      margin-bottom: .8rem;
    }

    .data {
      flex: 1;
      padding: 1.5rem 2rem;

      &__pricing {
        align-items: flex-end;
        display: flex;
        flex-flow: row wrap;
      }

      &__price {
        color: $type;
        font-size: 2.7rem;
        line-height: 1;
      }

      &__percentage {
        font-weight: 600;
      }
    }

    .indicator {
      background-color: $green;
      max-width: 8rem;
      padding: .8rem;
      width: 100%;

      &__line {
        border-radius: 2rem;
        height: 100%;
        width: .25rem;
      }
    }

    &--positive {
      .indicator {
        @include linear-gradient(to bottom, $green-light 0%, $green 75%, $green-dark 100%);

        &__line {
          @include linear-gradient(to top, rgba($white, .05) 0%, $white 100%);
        }
      }

      .data__percentage {
        color: $green-dark;
      }
    }

    &--negative {
      .indicator {
        @include linear-gradient(to bottom, $red-light 0%, $red 50%, $red-dark 100%);

        &__line {
          @include linear-gradient(to bottom, rgba($white, .05) 0%, $white 100%);
        }
      }
    }
  }

  .data__summary {
    color: $type;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: .4rem;
    width: 100%;
  }

  .light {
    color: $title;
  }
</style>
