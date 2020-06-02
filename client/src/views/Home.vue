<template>
  <div>
    <h1>Stock Watcher</h1>

    <stock />
  </div>
</template>

<script>
import Stock from '@/components/Stock.vue';

export default {
  components: {
    stock: Stock,
  },
};
</script>
