const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {

    lintOnSave: false,//取消ES6语法校验
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: "dist", //打包目录
    indexPath: "index.html",


    // //生产环境配置


    // // 开发环境配置
    // devServer: {
    //     host: '0.0.0.0',
    //     port: 8080,
    //     https: false,
    //     proxy: {
    //         '/api': {
    //             target: 'http://47.107.149.13:3000',
    //             ws: true,
    //             changOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }

    //     }
    // }
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }

    },
}
