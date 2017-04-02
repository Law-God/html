
var webpack = require("webpack");
//处理路径问题
var path = require("path");
/*
*	可以将html打包到dist目录下，
*	并且html页面中加载指定的js，
*	压缩html代码
*/
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
	entry : "./src/html/index.js",
	output : {
		//path : "/" 绝对路径，在window中表示当前盘符，如D://; wepack命令后会自动增加目录dist
		//这样使用path的时候HtmlWebpackPlugin中index.html加载bundle.js路径有问题，解决办法使用path.resolve(__dirname,"./dist")
		path : path.resolve(__dirname,"./dist"),
		filename : "bundle.js"
	},
	module : {
		loaders : [
			{
				test: /\.(css|less)$/, 
				loader: 'style-loader!css-loader!less-loader'
			},
			/*图片加载*/
			{
			  test: /\.(?:jpg|jpeg|gif|png|svg|ico)$/,
			  //图片大小小于8k，使用base64形式直接显示图片
			  loader: "url-loader?limit=8192&name=images/[hash].[ext]" 	
			},
			/*处理html页面中图片*/
			{
				test : /\.html$/,
				loader : "html-withimg-loader"
			},

		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			filename : "index.html",
			chunk : ["bundle"],
			template : "./src/html/index.html",
			minify : {
	    		collapseWhitespace: false,
		      	collapseInlineTagWhitespace: false,
		      	removeRedundantAttributes: false,
		      	removeEmptyAttributes: false,
		      	removeScriptTypeAttributes: false,
		      	removeStyleLinkTypeAttributes: false,
		      	removeComments: false
	    	}
		}),
	]
}
