<template>
  <div class="ticker-wrapper">
    <div
      class="ticker"
      :class="(isNegative) ? 'ticker--negative' : 'ticker--positive'"
    >
      <div class="indicator">
        <div class="indicator__marker" :style="`top: ${valuePercentage}px;`" />
        <div class="indicator__line" />
        <div class="indicator__summary">
          <div class="high">{{ high }}</div>
          <div class="low">{{ low }}</div>
        </div>
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
            {{ price }}
          </div>

          <div class="data__change">
            <Arrow
              :class="{ 'down' : isNegative }"
            />

            {{ change }} (<span class="data__percentage">{{ changePercent }}</span>)
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
  </div>
</template>

<script>
import Arrow from '@/components/icons/Arrow.vue';

export default {
  name: 'Ticker',
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
      open: '21.60',
      high: '21.60',
      low: '17.72',
      price: '18.28',
      change: '2.90',
      changePercent: '15.99%',
    };
  },
  computed: {
    isNegative() {
      const sign = Math.sign(this.change);

      if (sign > -1) {
        return false;
      }

      return true;
    },
    valuePercentage() {
      const percent = Math.round(((this.price - this.low) / (this.high - this.low)) * 100);

      return 100 - percent;
    },
  },
};
</script>

<style lang="scss" scoped>
  .ticker-wrapper {
    display: inline-flex;
    flex-flow: row wrap;
    flex: 0 0 33.333%;
    max-width: 33.333%;
    min-height: 10rem;
    width: 100%;
  }

  .ticker {
    background-color: $white;
    box-shadow: 0 .2rem 1rem .2rem rgba($black, .03);
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 2rem;

    &:not(:last-of-type) {
      margin-right: 2rem;
    }

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

      &__change {
        font-weight: 600;
      }
    }

    .indicator {
      background-color: $green;
      color: $white;
      display: flex;
      font-weight: 600;
      max-width: 8rem;
      padding: .8rem;
      width: 100%;

      &__marker {
        border-bottom: .5rem solid transparent;
        border-left: 1rem solid $white;
        border-top: .5rem solid transparent;
        height: 0;
        position: relative;
        width: 0;
      }

      &__line {
        border-radius: 2rem;
        height: 100%;
        width: .25rem;
      }

      &__summary {
        height: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        padding-left: .8rem;
      }
    }

    &--positive {
      .indicator {
        @include linear-gradient(to bottom, $green-light 0%, $green 75%, $green-dark 100%);

        &__line {
          @include linear-gradient(to top, rgba($white, .05) 0%, $white 100%);
        }
      }

      .data__change {
        color: $green-dark;
      }

      .data__percentage {
        color: $green;
      }
    }

    &--negative {
      .indicator {
        @include linear-gradient(to bottom, $red-light 0%, $red 50%, $red-dark 100%);

        &__line {
          @include linear-gradient(to bottom, rgba($white, .05) 0%, $white 100%);
        }
      }

      .data__change {
        color: $red-dark;
      }

      .data__percentage {
        color: $red;
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
