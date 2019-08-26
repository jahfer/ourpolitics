const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputDir = path.join(__dirname, 'build/');

const devMode = process.env.NODE_ENV !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  context: path.resolve(__dirname),
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    historyApiFallback: true,
    index: './build/index.html'
  },
  entry: [
    './src/Root.bs.js',
    './src/App.scss',
  ],
  mode: devMode ? 'development' : 'production',
  output: {
    path: outputDir,
    filename: 'Index.js',
    publicPath: ASSET_PATH,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (devMode ? '[name].css' : '[name].[hash].css'),
      chunkFilename: (devMode ? '[id].css' : '[id].[hash].css'),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      hash: true,
    })
  ],
  // devServer: {
  //   compress: true,
  //   contentBase: outputDir,
  //   port: process.env.PORT || 8000,
  //   historyApiFallback: true
  // },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
          },
          'file-loader',
        ],
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      }
    ]
  }
};