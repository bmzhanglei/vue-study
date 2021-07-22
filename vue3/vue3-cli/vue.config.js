

const path = require('path')

console.log(process.env.NODE_ENV)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : './', // 公共路径 默认为"/"，建议使用"./"相对路径
  devServer: {   // 本地服务器配置(npm run serve)
    port: 8081, // 端口
    host: "127.0.0.1", // 域名
    https: false, // 是否开启https
    open: false,	// 是否在开启服务器后自动打开浏览器访问该服务器
    proxy: {
      '/api': {
          /* 目标代理服务器地址 */
          // target: "https://api.github.com",
          target: "http://127.0.0.1:3000",
          /* WebSocket */
          // ws: true,
          /* 允许跨域 */
          // changeOrigin: true,
          /* 路径重写 */
          // pathRewrite: {
          //     '^/api' : ''
          // }
      }
     },
  },
  lintOnSave: false,  // 取消lint语法检测，此处可不配置
  outputDir:process.env.NODE_ENV === 'production' ? 'dist' : 'devdist', // build打包输出目录
  assetsDir:"assets", // 静态文件输出目录，基于dist
  indexPath: "index.html",  // 输出html文件名
  productionSourceMap: false, // 取消.map文件的打包，加快打包速度

  chainWebpack: config => {//去掉v-i18n浏览器告警部分    
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js').set('assets', "@/assets")  //引入文件添加别名 
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
       symbolId: "icon-[name]"
    })
    .end();
  },
  configureWebpack: (config) => {     
    // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
    if (process.env.NODE_ENV !== 'production') return;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
    config.resolve.extensions=['.js', '.json', '.vue'] // 自动添加文件名后缀

    return {  // 此处配置webpack.config.js的相关配置
      plugins: [],
      performance: {},
     
    };
  }
}