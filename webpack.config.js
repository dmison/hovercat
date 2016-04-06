var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/app.jsx'),
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'app.js',
    publicPath: '/'
  },


  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }

};
