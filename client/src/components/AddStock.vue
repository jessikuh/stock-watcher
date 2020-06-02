<template>
  <form @submit.prevent="add">
    <fieldset>
      <legend class="accessibly-hidden">Add stock to your ticker</legend>

      <div class="margin-vertical-4x" style="display: flex; flex-flow: row wrap; width: 100%;">
        <div style="width: 35rem;">
          <input
            id="stock-symbol"
            name="stock symbol"
            type="text"
            placeholder="Enter stock symbol"
            v-model="stock"
          >
          <label for="stock-symbol" class="accessibly-hidden">Stock Symbol</label>
        </div>

        <div>
          <input class="btn margin-left-1x" type="submit" value="Add Stock">
        </div>

        <div class="margin-top-2x" style="color: red; flex-basis: 100%; width: 100%;" v-if="error">
          <strong>{{ error }}</strong>
        </div>

      </div>
    </fieldset>
  </form>
</template>

<script>
import getStockData from '@/utils/api';

export default {
  data() {
    return {
      error: null,
      stock: null,
    };
  },
  methods: {
    async add() {
      this.error = null;
      const data = await getStockData(this.stock);

      const {
        type,
        message,
      } = data;

      if (type === 'error') {
        this.error = message;
      }

      console.log(data);

      this.stock = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .accessibly-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  input {
    &:not([type='submit']) {
      border-radius: .3rem;
      border: .2rem solid #e6e6e6;
      color: $type;
      display: block;
      font-size: 1.7rem;
      padding: 1.5rem;
      transition: .3s;
      width: 100%;

      &::placeholder {
        color: desaturate(lighten($type, 30%), 10%);
      }

      &:focus {
        border-color: darken(#e6e6e6, 10%);
        outline: 0;
      }
    }
  }
</style>
