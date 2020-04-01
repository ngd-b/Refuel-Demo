const HtmlWebpackPlugin = require("html-webpack-plugin");

const {resolve} = require("./utils");

module.exports = {
    entry:resolve("src/index.js"),
    output:{
        path:resolve('public'),
        filename:"index.js"
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                include:resolve('src'),
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test:/.(png|jpg|svg|gif)$/,
                use:'url-loader'
            }
        ]
    },
    // 地址别名路径设置
    resolve:{
        alias:{
            '@':resolve('src'),
            '@component':resolve('src/components')
        },
        extensions:['.js','.jsx']
    },
    // 第三方依赖，不打包
    externals:[],
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:resolve('static/index.html')
        })
    ]

}