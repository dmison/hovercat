var path = require('path');

module.exports = {
  target: 'electron',
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'app.js',
    publicPath: '/'
  },

  externals: {
    'electron': 'require("electron")',
    'net': 'require("net")',
    'remote': 'require("remote")',
    'shell': 'require("shell")',
    'app': 'require("app")',
    'ipc': 'require("ipc")',
    'fs': 'require("fs")',
    'buffer': 'require("buffer")',
    'system': '{}',
    'file': '{}'
  },

  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    },
    {
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
