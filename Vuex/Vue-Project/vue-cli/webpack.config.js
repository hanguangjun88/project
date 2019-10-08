//配置文件，将来被nodejs运行
module.exports={
    mode:'development',//开发模块
    //mode:'production' //产品模式，会对代码压缩，打包过程会慢
    //1.入口文件：从哪个文件开始打包
    entry:'./src/main.js',
    //2.出口文件：打包后输出的文件
    output:{
    path:__dirname+'/dist',
    //目录:使用绝对路径
    filename:'bundle.js'
    }
    }