const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 自定义资源
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig,{
    mode:"production",
    stats:"errors-only",
    plugins:[
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename:"[name]_[contenthash:8].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano")
        }),
        new FriendlyErrorsWebpackPlugin(),
    ]
});