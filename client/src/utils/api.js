import axios from 'axios';

const config = {
  baseURL: 'https://www.alphavantage.co',
};

const api = axios.create(config);

export function getStockCompany(symbol) {
  return api.get('/query', {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords: symbol,
      apikey: process.env.VUE_APP_API_KEY,
    },
  })
    .then((result) => {
      const { data } = result;

      const { bestMatches } = data;

      if (bestMatches.length > 0) {
        return bestMatches[0];
      }

      return null;
    })
    .catch((err) => {
      console.error(err);

      return {
        type: 'err',
        message: err,
      };
    });
}

export function getStockData(symbol) {
  return api.get('/query', {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol,
      interval: '30min',
      apikey: process.env.VUE_APP_API_KEY,
    },
  })
    .then((result) => {
      const { data } = result;

      if (data['Error Message']) {
        console.error({
          symbol,
          error: data['Error Message'],
        });

        return {
          type: 'error',
          message: 'Stock symbol could not be found.',
        };
      }

      return {
        type: 'stock',
        ...data['Global Quote'],
      };
    })
    .catch((err) => {
      console.error(err);

      return {
        type: 'err',
        message: err,
      };
    });
}
