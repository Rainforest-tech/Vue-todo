
module.exports = {
  // pluginOptions: {
  //   i18n: {
  //     locale: 'en',
  //     fallbackLocale: 'en',
  //     localeDir: 'locales',
  //     enableInSFC: false,
  //   },
  // },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? './' // prod
    : '/', // dev
  configureWebpack: {
    plugins: [
      // new MiniCssExtractPlugin({
      //   // Options similar to the same options in webpackOptions.output
      //   // all options are optional
      //   filename: '[name].css',
      //   chunkFilename: '[id].css',
      //   ignoreOrder: false, // Enable to remove warnings about conflicting order
      // }),
    ]
  },
  chainWebpack: (config) => {
    config.module
      .rule('eslint')
      .test(/\.(vue|(j|t)sx?)$/)
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(() => ({ fix: true }));
  },
};
