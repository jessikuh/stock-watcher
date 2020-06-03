<template>
  <div class="ticker-wrapper">
    <remove-stock class="remove" :index="index" />
    <div
      class="ticker"
      :class="(isNegative) ? 'ticker--negative' : 'ticker--positive'"
    >
      <indicator :price="stock.price" :high="stock.high" :low="stock.low" />
      <!-- <div class="indicator">
        <div class="indicator__marker" :style="`top: ${valuePercentage}px;`" />
        <div class="indicator__line" />
        <div class="indicator__summary">
          <div class="high">{{ stock.high }}</div>
          <div class="low">{{ stock.low }}</div>
        </div>
      </div> -->

      <div class="data">
        <div class="data__information">
          <h2 class="uppercase">
            {{ stock.company }}
          </h2>

          <h3 class="uppercase">
            {{ stock.symbol }}
          </h3>
        </div>

        <div class="data__pricing">
          <div class="data__price">
            {{ stock.price }}
          </div>

          <div class="data__change">
            <Arrow
              width="1.2rem"
              :class="{ 'down' : isNegative }"
            />

            {{ stock.change }}

            <div class="data__percentage">
              ({{ stock.changePercent }})
            </div>
          </div>
        </div>

        <data-summary
          :open="stock.open"
          :high="stock.high"
          :low="stock.low"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/icons/Arrow.vue';
import Indicator from '@/components/ticker/Indicator.vue';
import DataSummary from '@/components/ticker/Summary.vue';
import RemoveStock from '@/components/RemoveStock.vue';

export default {
  name: 'Ticker',
  components: {
    Arrow,
    indicator: Indicator,
    'data-summary': DataSummary,
    'remove-stock': RemoveStock,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    stock: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      company: null,
    };
  },
  computed: {
    isNegative() {
      if (this.stock) {
        const sign = Math.sign(this.stock.change);

        if (sign > -1) {
          return false;
        }

        return true;
      }

      return false;
    },
    valuePercentage() {
      if (this.stock) {
        const {
          price,
          low,
          high,
        } = this.stock;

        const percent = Math.round(((price - low) / (high - low)) * 100);

        return 100 - percent;
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .ticker-wrapper {
    @media only screen and (min-width: 756px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
    @media only screen and (min-width: 1200px) {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
    display: inline-flex;
    flex-flow: row wrap;
    flex: 1;
    position: relative;
    width: 100%;

    &:hover {
      .remove {
        opacity: 1;
      }
    }
  }

  .remove {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    right: 2rem;
    top: .5rem;
    transition: opacity .3s;
  }

  .ticker {
    @media only screen and (min-width: 756px) {
      width: 96%;
    }
    background-color: $white;
    box-shadow: 0 .2rem 1rem .2rem rgba($black, .03);
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 4%;
    width: 100%;

    h2 {
      @media only screen and (max-width: 756px) {
        margin: 0 0 .5rem;
      }
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    h3 {
      @media only screen and (min-width: 756px) {
        margin: 0 0 1.5rem;
      }
      @media only screen and (max-width: 756px) {
        align-self: flex-end;
        display: block;
        width: 100%;
      }
      margin-bottom: 0;
    }

    .data {
      @media only screen and (max-width: 756px) {
        display: flex;
      }
      flex: 1;
      min-width: 0;
      padding: 1.5rem 2rem;

      &__information {
        @media only screen and (max-width: 756px) {
          align-items: flex-start;
          display: inline-flex;
          flex-flow: row wrap;
        }
      }

      &__information,
      &__pricing {
        @media only screen and (max-width: 756px) {
          flex: 0 0 50%;
          max-width: 50%;
          width: 100%;
        }
      }

      &__pricing {
        @media only screen and (max-width: 756px) {
          display: inline-flex;
          flex-flow: column wrap;
          justify-content: space-between;
        }
        align-items: flex-end;
        display: flex;
        flex-flow: row wrap;
      }

      &__price {
        @media only screen and (max-width: 756px) {
          font-size: 2.5rem;
        }
        color: lighten($type, 10%);
        font-size: 3.5rem;
        line-height: 1;
      }

      &__change {
        @media only screen and (min-width: 756px) {
          margin-left: 1rem;
        }
        @media only screen and (max-width: 756px) {
          font-size: 1.4rem;
          text-align: right;
        }
        font-weight: 600;

        svg {
          margin-left: .5rem;
          margin-right: .25rem;
        }
      }

      &__percentage {
        display: inline-block;
        margin-left: .7rem;
      }
    }

    &--positive {
      .data__change {
        color: $green;
      }

      .data__percentage {
        color: darken($green-light, 15%);
      }
    }

    &--negative {
      .data__change {
        color: $red;
      }

      .data__percentage {
        color: $red-light;
      }
    }
  }
</style>
