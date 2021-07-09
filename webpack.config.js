const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const outputDir = path.join(__dirname, 'build/');

const devMode = process.env.NODE_ENV !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  context: path.resolve(__dirname),
  devServer: {
    contentBase: outputDir,
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
      filename: (devMode ? '[name].css' : '[name].css'),
      chunkFilename: (devMode ? '[id].css' : '[id].css'),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      hash: true,
    }),
    new CopyPlugin([
      { from: 'CNAME', to: outputDir },
      { from: 'robots.txt', to: outputDir },
      { from: '_redirects', to: outputDir },
      { from: 'src/404.html', to: outputDir },
      { from: 'static/**/*', to: outputDir },
    ]),
  ],
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
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].html",
              outputPath: 'assets',
            },
          },
          'extract-loader',
          'html-loader',
          'markdown-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
};
