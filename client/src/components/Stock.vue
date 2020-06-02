<template>
  <div class="stock">
    <div class="indicator indicator--positive">
      <div class="indicator__line"></div>
    </div>

    <div class="data">
      <h2 class="uppercase">
        Stock Name
      </h2>

      <h3 class="uppercase">
        Stock symbol
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stock',
};
</script>

<style lang="scss" scoped>
  .stock {
    background-color: $white;
    box-shadow: 0 0 .8rem .2rem rgba($black, .05);
    display: flex;
    flex-flow: row wrap;
    min-height: 10rem;

    .data {
      padding: 1.5rem 2rem;
    }
  }

  .indicator {
    $self: &;
    background-color: $green;
    max-width: 8rem;
    padding: .8rem;
    width: 100%;

    &__line {
      border-radius: 2rem;
      height: 100%;
      width: .25rem;
    }

    &--positive {
      @include linear-gradient(to bottom, $green-light 0%, $green 75%, $green-dark 100%);

      #{$self}__line {
        @include linear-gradient(to top, rgba($white, .05) 0%, $white 100%);
      }
    }

    &--negative {
      @include linear-gradient(to bottom, $red-light 0%, $red 50%, $red-dark 100%);

      #{$self}__line {
        @include linear-gradient(to bottom, rgba($white, .05) 0%, $white 100%);
      }
    }
  }
</style>
