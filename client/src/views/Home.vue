<template>
  <div class="padding-vertical-3x">
    <header>
      <h1>Stock Watcher</h1>

      <add-stock />
    </header>

    <ticker v-for="stock in stocks" :stock="stock" :key="stock['01. symbol']" />
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
