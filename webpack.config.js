const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключили плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// подключите к проекту mini-css-extract-plugin

module.exports = {// module.exports — это синтаксис экспорта в Node.js
  entry: { main: "./src/index.js" },// указали первое место, куда заглянет webpack, — файл index.js в папке src
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",// указали в какой файл будет собираться весь js и дали ему имя
    publicPath: ""
  },
  mode: "development", // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    open: true, // сайт будет открываться сам при запуске npm run dev
    port: 8080 // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
  },
  module: {
    rules: [ // rules — это массив правил
      {// добавим в него объект правил для бабеля
        test: /\.js$/,// регулярное выражение, которое ищет все js файлы
        use: "babel-loader",// при обработке этих файлов нужно использовать babel-loader
        exclude: "/node_modules/"// исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {// добавили правило для обработки файлов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,// регулярное выражение, которое ищет все файлы с такими расширениями
        type: "asset/resource"
      },
      {
        test: /\.css$/,// применять это правило только к CSS-файлам
        // при обработке этих файлов нужно использовать
        use: [MiniCssExtractPlugin.loader, {// MiniCssExtractPlugin.loader и css-loader
          loader: "css-loader",
          options: {
            importLoaders: 1
          }// добавьте объект options
        },
          "postcss-loader"// Добавьте postcss-loader
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }), // путь к файлу index.html
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ] // добавьте массив
};
