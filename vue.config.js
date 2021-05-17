module.exports = {
  devServer: {
    port: 8081
  },
  lintOnSave: false,
  pages: {
    index: {
      // точка входа для страницы
      entry: 'src/main.js',
      // исходный шаблон
      template: 'public/index.html',
      // в результате будет dist/index.html
      filename: 'index.html',
      // все фрагменты, добавляемые на этой странице, по умолчанию
      // это извлечённые общий фрагмент и вендорный фрагмент.
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });
  }
}
