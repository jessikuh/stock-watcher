// SCSS variables available in Vue components/views
const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/scss/variables/_colors.scss";`
      },
    },
  }
};
