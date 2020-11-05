const path = require("path");
const resolve = require("path").resolve;
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const poststylus = require("poststylus");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const publicPathRoot = devMode ? '' : '/app/'

module.exports = {
  entry: [
      'core-js',
      // "regenerator-runtime/runtime",
      __dirname + "/src/index.js"
    ],
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    modules: [
      __dirname,
      resolve(__dirname,'node_modules')
      // resolve(__dirname,'node_modules/babel-runtime')
    ],
    alias: {
      app: path.resolve(__dirname, 'src/'),
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js"),
      'react-dom': '@hot-loader/react-dom'
    }
  },

  output: {
    publicPath: publicPathRoot,
    filename: "assets/js/[name]"+(devMode ? '' : '.[hash]')+".js",
    chunkFilename: "assets/js/[name]"+(devMode ? '' : '.[hash]')+".chunk.js",
    crossOriginLoading: "anonymous",
    path: path.resolve(__dirname,'public/')
  },

  module: {
    rules: [
      { test: /\.hbs$/,   loader: "handlebars-loader" },
      // json-loader should not be activated, json import work by default
      // { test: /\.json$/,  loader: "json-loader" },
      { test: /[\.js|\.jsx]$/,
        // exclude: /node_modules/,
        include: [
          resolve('src'),
          resolve('node_modules/react-frappe-charts')
        ],
        use: {
          loader: "babel-loader"
        },
      },      
      {
        test: /\.css$/,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader},
          { loader: 'css-loader', /*options: { publicPath: 'public/assets/dist' }*/ },
          {
            loader: "postcss-loader",
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  flexbox: 'no-2009',
                }),
              ],
              sourceMap: devMode,
            }
          }
        ],
      },
      {
        test: /\.less/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "postcss-loader",
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                flexbox: 'no-2009',
              } ),
            ],
            sourceMap: devMode,
          }
        },{
          loader: "less-loader", // compiles Less to CSS
          options: { publicPath: 'public/assets/css', javascriptEnabled: true }
        }]
      },
      {
        test: /\.scss/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "postcss-loader",
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                flexbox: 'no-2009',
              } ),
            ],
            sourceMap: devMode,
          }
        },{
          loader: "sass-loader", // compiles Less to CSS
          // options: { publicPath: 'public/assets/css', javascriptEnabled: true }
        }]
      },
      {
        test: /\.styl$/,
        use:[
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader // creates style nodes from JS strings
          }, {
            loader: "css-loader", // translates CSS into CommonJS
            // options: { publicPath: 'public/assets/dist' }
          },{
            loader: "postcss-loader",
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  flexbox: 'no-2009',
                } ),
              ],
              sourceMap: devMode,
            }
          },
          {
            loader: 'stylus-loader',
            options: { publicPath: 'public/assets/css' }
          }
        ]
      },
      // {
      //   test: /\.svg$/,
      //   use: {
      //     loader: "svg-inline-loader?classPrefix"
      //   }
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       name: '[path][name].[ext]?[contenthash]'
      //     }
      //   }
      // },
      {
        test: /\.(eot|woff|ttf|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]?[contenthash]',
            outputPath: 'assets/fonts/',    // where the fonts will go
            publicPath: publicPathRoot+'assets/fonts/'       // override the default path
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]?[contenthash]',
            outputPath: 'assets/img/',    // where the fonts will go
            publicPath: publicPathRoot+'assets/img/'       // override the default path
          }
        }
      }      
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: devMode
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [poststylus(["postcss-cssnext"])]
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]' + (devMode ? '' : ".[hash]") + ".css",
      chunkFilename: 'assets/css/[name]' + (devMode ? '' : '.[hash]') + ".chunk.css"
    }),
    new CopyWebpackPlugin(
      [
        {from: path.resolve(__dirname,'src/public'), to: path.resolve(__dirname,'public')}
      ],
      { debug: 'info' }
    ),
    new HtmlWebpackPlugin({
      title: 'AIoT Insider Lab',
      appMountId: ['app'],
      favicon: path.resolve(__dirname, 'src/public/assets/img/favicon.ico'),
      // hash: true,
      inject: false,
      filename: 'index.html',
      template: 'src/index.html'
    }),
    
    new webpack.DefinePlugin({      
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV
      ),
      "process.env.APP_ENV": JSON.stringify(
        process.env.APP_ENV
      ),  
      "process.env.APP_CODE": JSON.stringify(
        process.env.APP_CODE
      ),       
      "process.env.REACT_APP_BASE_URL": JSON.stringify(
        process.env.REACT_APP_BASE_URL
      ),  
      "process.env.APP_API_BASE_URL": JSON.stringify(
        process.env.APP_API_BASE_URL
      ),  
      "process.env.APP_AAD_APPLICATION_ID": JSON.stringify(
        process.env.APP_AAD_APPLICATION_ID
      ),  
      "process.env.APP_AAD_REDIRECT_URL": JSON.stringify(
        process.env.APP_AAD_REDIRECT_URL
      ),  
      "process.env.APP_APPLICATION_INSIGHTS_KEY": JSON.stringify(
        process.env.APP_APPLICATION_INSIGHTS_KEY
      ),  
    })
  ],

  optimization: {
    splitChunks: {
      // name: (module)=>{
      //   return 'vendor';
      // },
      chunks: 'all'
      // cacheGroups: {
      //   commons: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendors',
      //     chunks: 'all'
      //   }
      // }
    }
  }
};
