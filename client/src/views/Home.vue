<template>
  <div class="padding-vertical-3x">
    <header>
      <h1>Stock Watcher</h1>

      <add-stock />
    </header>

    <div class="ticker-row">
      <ticker v-for="stock in stocks" :stock="stock" :key="stock['01. symbol']" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AddStock from '@/components/AddStock.vue';
import Ticker from '@/components/Ticker.vue';

export default {
  name: 'Homepage',
  components: {
    'add-stock': AddStock,
    ticker: Ticker,
  },
  computed: {
    ...mapState('stocks', [
      'stocks',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .ticker-row {
    @media only screen and (min-width: 756px) {
      display: flex;
      flex-flow: row wrap;
    }
  }
</style>
