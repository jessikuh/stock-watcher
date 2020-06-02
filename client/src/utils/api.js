import axios from 'axios';

const config = {
  baseURL: 'https://www.alphavantage.co',
};

const api = axios.create(config);

function roundValue(value) {
  return parseFloat(value).toFixed(2);
}

function getStockCompany(symbol) {
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

export default function getStockData(symbol) {
  return api.get('/query', {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol,
      interval: '30min',
      apikey: process.env.VUE_APP_API_KEY,
    },
  })
    .then(async (result) => {
      const { data } = result;
      const { Note } = data;

      if (Note) {
        console.error(Note);

        return {
          type: 'error',
          message: Note,
        };
      }

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

      const returnedData = data['Global Quote'];
      const company = await getStockCompany(symbol);

      if (company) {
        return {
          type: 'stock',
          company: company['2. name'],
          symbol: returnedData['01. symbol'],
          open: roundValue(returnedData['02. open']),
          high: roundValue(returnedData['03. high']),
          low: roundValue(returnedData['04. low']),
          price: roundValue(returnedData['05. price']),
          change: roundValue(returnedData['09. change']),
          changePercent: returnedData['10. change percent'],
        };
      }

      return {
        type: 'error',
        message: "There was an error finding this stock's company.",
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
