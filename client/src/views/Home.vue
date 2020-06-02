<template>
  <div>
    <h1>Stock Watcher</h1>

    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
    <ticker symbol="GOOG" />
  </div>
</template>

<script>
import Ticker from '@/components/Ticker.vue';

export default {
  components: {
    ticker: Ticker,
  },
};
</script>
