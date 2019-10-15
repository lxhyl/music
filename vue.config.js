module.exports = {
   lintOnSave:false,//取消语法校验
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/", 
    outputDir: "dist", //打包目录
    indexPath: "index.html",


    // //生产环境配置

//    devServer: {
      
//         host: '127.0.0.1',
//         port: 8080, 
//         https: false,  
//     }


    // 开发环境配置
    devServer: {
      
        host: '0.0.0.0',
        port: 8080,
        https: false,
       
        proxy: {
            '/api': {
                target: 'http://120.27.243.36:3000',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
            
        }
    }
}
