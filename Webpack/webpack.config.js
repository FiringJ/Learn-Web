// __dirname是node.js中的一个全局变量，它指向当前执行模块所在的目录

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            }
          }
        ]
      }
    ]
  }
}
