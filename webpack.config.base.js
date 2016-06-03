import path from 'path';

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    // put your node libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
    // 'styliner': 'require("styliner")',
    // 'nodemailer': 'require("nodemailer")',
    // 'nodemailer-smtp-transport': 'require("nodemailer-smtp-transport")',
    // 'electron': 'require("electron")',
    // 'net': 'require("net")',
    // 'remote': 'require("remote")',
    // 'shell': 'require("shell")',
    // 'app': 'require("app")',
    // 'ipc': 'require("ipc")',
    // 'fs': 'require("fs")',
    // 'buffer': 'require("buffer")',
    // 'system': '{}',
    // 'file': '{}'
  ]
};
