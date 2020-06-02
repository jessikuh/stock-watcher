<template>
  <div class="padding-vertical-3x">
    <header>
      <h1>Stock Watcher</h1>

      <form>
        <fieldset>
          <legend class="accessibly-hidden">Add stock to your ticker</legend>

          <div class="margin-vertical-4x" style="display: flex; flex-flow: row wrap; width: 100%;">
            <div style="width: 35rem;">
              <input
                id="stock-symbol"
                name="stock symbol"
                type="text"
                placeholder="Enter stock symbol"
              >
              <label for="stock-symbol" class="accessibly-hidden">Stock Symbol</label>
            </div>

            <div>
              <input class="btn margin-left-1x" type="button" value="Add Stock">
            </div>

          </div>
        </fieldset>
      </form>
    </header>

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
    &:not([type='button']) {
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
