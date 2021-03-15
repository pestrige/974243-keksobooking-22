const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '../css/leaflet.css',
  })],
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: '../img/leaflet',
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
};

// resolve: {
//   alias: {
//       "./images/layers.png$": path.resolve(
//           __dirname,
//           "./node_modules/leaflet/dist/images/layers.png"
//       ),
//       "./images/layers-2x.png$": path.resolve(
//           __dirname,
//           "./node_modules/leaflet/dist/images/layers-2x.png"
//       ),
//       "./images/marker-icon.png$": path.resolve(
//           __dirname,
//           "./node_modules/leaflet/dist/images/marker-icon.png"
//       ),
//       "./images/marker-icon-2x.png$": path.resolve(
//           __dirname,
//           "./node_modules/leaflet/dist/images/marker-icon-2x.png"
//       ),
//       "./images/marker-shadow.png$": path.resolve(
//           __dirname,
//           "./node_modules/leaflet/dist/images/marker-shadow.png"
//       )
//   }
// },

// module: {
//   rules: [
//       {
//           test: /\.(gif|svg|jpg|png)$/,
//           loader: "file-loader"
//       },
//       {
//           test: /\.css$/,
//           use: [
//               MiniCssExtractPlugin.loader, 'css-loader'
//           ]
//       },
//       {
//           test: /\.scss$/,
//           use: [
//               MiniCssExtractPlugin.loader,'css-loader','sass-loader'
//           ]
//       }
//   ]
// }
