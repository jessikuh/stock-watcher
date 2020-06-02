<template>
  <div class="padding-vertical-3x">
    <header>
      <h1>Stock Watcher</h1>

      <add-stock />
    </header>

    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
  </div>
</template>

<script>
import AddStock from '@/components/AddStock.vue';
import Ticker from '@/components/Ticker.vue';

export default {
  components: {
    'add-stock': AddStock,
    ticker: Ticker,
  },
};
</script>
