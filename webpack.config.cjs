const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production', // Set mode explicitly to avoid the warning
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'module', // ES module output
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: {
    outputModule: true, // Enable ES module output
  },
  externals: {
    react: 'react', // Simplified external for ES modules
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};