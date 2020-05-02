module.exports = {
	devServer: {
		host:"127.0.0.1",//要设置当前访问的ip 否则失效
    open: true, //浏览器自动打开页面
    disableHostCheck: true,
    port: 9099,
    // 设置代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true, // 是否允许跨越, 开发环境中使用
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/main.sass` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        //prependData: `@import "~@/main.sass"`
        //data: `@import "./src/styles/main.scss";`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        //prependData: `@import "~@/main.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        // globalVars: {
        //   primary: '#fff'
        // }
      }
    }
  }
}