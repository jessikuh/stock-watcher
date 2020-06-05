<template>
  <div class="indicator">
    <div class="indicator__marker" :style="`top: ${valuePercentage}px;`" />
    <div class="indicator__line" />
    <div class="indicator__summary">
      <div class="high">{{ high }}</div>
      <div class="low">{{ low }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      required: true,
    },
    high: {
      type: String,
      required: true,
    },
    low: {
      type: String,
      required: true,
    },
  },
  computed: {
    valuePercentage() {
      const percent = Math.round(((this.price - this.low) / (this.high - this.low)) * 100);

      return 100 - percent;
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .ticker--positive {
    .indicator {
      @include linear-gradient(to bottom, $green-light 0%, $green 75%, $green-dark 100%);

      &__line {
        @include linear-gradient(to top, rgba($white, .05) 0%, $white 100%);
      }
    }
  }

  .ticker--negative {
    .indicator {
      @include linear-gradient(to bottom, $red-light 0%, $red 50%, $red-dark 100%);

      &__line {
        @include linear-gradient(to bottom, rgba($white, .05) 0%, $white 100%);
      }
    }
  }
</style>
