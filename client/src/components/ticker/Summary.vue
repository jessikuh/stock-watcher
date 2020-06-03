<template>
  <div class="data__summary">
    <div class="open">
      <b><span class="caption">OPEN</span> {{ open }}</b>
    </div>
    <div class="high">
      <b><span class="caption">HIGH</span> {{ high }}</b>
    </div>
    <div class="low">
      <b><span class="caption">LOW</span> {{ low }}</b>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
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
};
</script>

<style lang="scss" scoped>
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
