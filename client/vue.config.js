// SCSS variables available in Vue components/views

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/variables/colors.scss";
        `
      }
    }
  }
};
