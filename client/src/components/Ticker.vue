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
          <div class="high">{{ stock.high }}</div>
          <div class="low">{{ stock.low }}</div>
        </div>
      </div>

      <div class="data">
        <h2 class="uppercase">
          {{ company }}
        </h2>

        <h3 class="uppercase">
          {{ stock.symbol }}
        </h3>

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
import { getStockCompany } from '@/utils/api';

export default {
  name: 'Ticker',
  components: {
    Arrow,
  },
  props: {
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
  methods: {
    async getCompany() {
      if (this.stock) {
        const company = await getStockCompany(this.stock.symbol);

        return company;
      }

      return null;
    },
  },
  async created() {
    const getCompany = await this.getCompany();

    if (getCompany) {
      this.company = getCompany['2. name'];
    }
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
    min-height: 10rem;
    width: 100%;
  }

  .ticker {
    background-color: $white;
    box-shadow: 0 .2rem 1rem .2rem rgba($black, .03);
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 4%;
    width: 96%;

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    h3 {
      margin: 0 0 1.5rem;
    }

    .data {
      flex: 1;
      min-width: 0;
      padding: 1.5rem 2rem;

      &__pricing {
        align-items: flex-end;
        display: flex;
        flex-flow: row wrap;
      }

      &__price {
        color: lighten($type, 10%);
        font-size: 3.5rem;
        line-height: 1;
      }

      &__change {
        font-weight: 600;
        margin-left: 1rem;

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
        // padding-left: .4rem;
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
