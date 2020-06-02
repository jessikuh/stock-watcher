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
            v-model="symbol"
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
import { getStockData } from '@/utils/api';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddStock',
  data() {
    return {
      error: null,
      symbol: null,
    };
  },
  computed: {
    ...mapState('stocks', [
      'stocks',
    ]),
  },
  methods: {
    ...mapActions('stocks', [
      'addStock',
    ]),
    async add() {
      this.error = null;

      if (this.stockExists(this.symbol)) {
        this.error = 'This stock has already been added.';

        setTimeout(() => {
          this.error = null;
          this.symbol = null;
        }, 1000);

        return;
      }

      const data = await getStockData(this.symbol);

      const {
        type,
        message,
      } = data;

      if (type === 'error') {
        this.error = message;

        return;
      }

      if (type === 'stock') {
        const stock = {
          symbol: data['01. symbol'],
          open: this.roundValue(data['02. open']),
          high: this.roundValue(data['03. high']),
          low: this.roundValue(data['04. low']),
          price: this.roundValue(data['05. price']),
          change: this.roundValue(data['09. change']),
          changePercent: data['10. change percent'],
        };

        this.addStock(stock);

        // Reset stock to null
        this.symbol = null;
      }
    },
    stockExists(symbol) {
      if (this.stocks.length > 0) {
        return this.stocks.some((stock) => stock.symbol === symbol);
      }

      return false;
    },
    roundValue(value) {
      return parseFloat(value).toFixed(2);
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
