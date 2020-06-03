<template>
  <div class="ticker-wrapper">
    <remove-stock class="remove" :index="index" />
    <div
      class="ticker"
      :class="(isNegative) ? 'ticker--negative' : 'ticker--positive'"
    >
      <div class="indicator">
        <div class="indicator__marker" :style="`top: ${valuePercentage}px;`" />
        <div class="indicator__line" />
        <div class="indicator__summary">
          <div class="high">{{ stock.high }}</div>
          <div class="low">{{ stock.low }}</div>
        </div>
      </div>

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
              :class="{ 'down' : isNegative }"
            />

            {{ stock.change }}

            <div class="data__percentage">
              ({{ stock.changePercent }})
            </div>
          </div>
        </div>

        <div class="data__summary">
          <div class="open">
            <b><span class="caption">OPEN</span> {{ stock.open }}</b>
          </div>
          <div class="high">
            <b><span class="caption">HIGH</span> {{ stock.high }}</b>
          </div>
          <div class="low">
            <b><span class="caption">LOW</span> {{ stock.low }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/icons/Arrow.vue';
import RemoveStock from '@/components/RemoveStock.vue';

export default {
  name: 'Ticker',
  components: {
    Arrow,
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
          margin-right: .25rem;
        }
      }

      &__percentage {
        display: inline-block;
        margin-left: .7rem;
      }
    }

    .indicator {
      @media only screen and (max-width: 756px) {
        display: none;
      }
      background-color: $green;
      color: $white;
      display: flex;
      font-weight: 600;
      max-width: 10rem;
      padding: 1.4rem;
      width: 100%;

      &__marker {
        border-bottom: .6rem solid transparent;
        border-left: 1.2rem solid $white;
        border-top: .6rem solid transparent;
        height: 0;
        position: relative;
        width: 0;
      }

      &__line {
        border-radius: .4rem;
        height: 100%;
        width: .4rem;
      }

      &__summary {
        display: flex;
        flex-flow: column wrap;
        font-size: 1.4rem;
        font-weight: 800;
        height: 100%;
        justify-content: space-between;
        text-align: right;
        width: 100%;
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
    @media only screen and (max-width: 756px) {
      display: none;
    }
    color: $type;
    display: flex;
    flex-flow: row wrap;
    font-size: 1.4rem;
    justify-content: space-between;
    margin-top: 1.5rem;
    width: 100%;

    b {
      color: desaturate(lighten($type, 30%), 5%);
    }

    .caption {
      color: lighten($title, 10%);
    }
  }
</style>
