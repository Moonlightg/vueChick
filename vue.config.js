module.exports = {
	devServer: {
		host:"127.0.0.1",//要设置当前访问的ip 否则失效
    open: true, //浏览器自动打开页面
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true, // 是否允许跨越, 开发环境中使用
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}