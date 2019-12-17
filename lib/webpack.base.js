const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');

const projectRoot = process.cwd();

const dirReg = /\/src\/pages\/(.*)\/index.js$/;

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = glob.sync(path.join(projectRoot, './src/pages/*/index.js')).map((dir) => {
    const exec = dirReg.exec(dir);
    const fileName = exec && exec[1];
    entry[fileName] = dir;
    return new HtmlWebpackPlugin({
      template: dir.replace(/\.js$/, '.html'),
      filename: `${fileName}_[chunkhash:8].html`,
      chunks: [fileName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    });
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|otf|eot|woff|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        const { errors } = stats.compilation;
        if (errors && errors.length && !process.argv.includes('--watch')) {
          process.exit(1);
        }
      });
    },
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    ...htmlWebpackPlugins,
  ],
  stats: 'errors-only',
};
