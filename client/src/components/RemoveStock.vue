<template>
  <div @click="removeStock(index)">
    ❌
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions('stocks', [
      'removeStock',
    ]),
  },
};
</script>
