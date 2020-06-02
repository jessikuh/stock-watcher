<template>
  <container id="app">
    <router-view/>
  </container>
</template>

<script>
import Container from '@/components/Container.vue';

export default {
  components: {
    container: Container,
  },
};
</script>
