const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
module.exports = {
	entry: {
		main: './src/main.js',
		goods: './src/goods.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'eval-source-map',
	plugins: [
		new BrowserSyncPlugin({
			// browse to http://localhost:3000/ during development,
			// ./public directory is being served
			host: 'localhost',
			port: 3000,
			server: { baseDir: __dirname },
		}),
	],
}

/*
	resolve: {
		extensions: ['', '.js', '.jsx', '.ts'],
	},
	optimization: {
		runtimeChunk: 'single',
	},
*/
