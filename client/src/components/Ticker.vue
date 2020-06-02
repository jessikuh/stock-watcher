<template>
  <div class="ticker ticker--positive">
    <div class="indicator indicator">
      <div class="indicator__line"></div>
    </div>

    <div class="data">
      <h2 class="uppercase">
        Stock Name
      </h2>

      <h3 class="uppercase">
        {{ symbol }}
      </h3>

      <div style="">
        <div class="price">
          706.32
        </div>

        <div class="percentage">
          15.32 (2.22%)
        </div>
      </div>

      <div class="time-series">
        <div class="open">
          <b><span class="light">OPEN</span> 1.37</b>
        </div>
        <div class="high">
          <b><span class="light">HIGH</span> 1.37</b>
        </div>
        <div class="low">
          <b><span class="light">LOW</span> 1.37</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stock',
  props: {
    symbol: {
      type: String,
      required: true,
    },
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

    .data {
      flex: 1;
      padding: 1.5rem 2rem;
    }

    h3 {
      margin-bottom: .5rem;
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

  .value {
    color: $type;
    font-size: 2.7rem;
    line-height: 1;
  }

  .time-series {
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
