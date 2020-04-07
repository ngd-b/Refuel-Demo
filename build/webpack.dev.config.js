const merge = require('webpack-merge');
const webpack = require('webpack');

// 自定义资源
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig,{
    devtool:'inline-source-map',
    mode:"development",
    devServer:{
        port:"8080",
        proxy:[
            {
                context:['/test'],
                target:"http://localhost:8080",
                pathRewrite:{
                    "^/test":""
                }
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:JSON.stringify("development")
            }
        })
    ]
});