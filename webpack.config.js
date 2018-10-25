/* global __dirname, require, module */

// const webpack = require('webpack');
const path = require('path');
const { env } = require('yargs').argv; // use --env with webpack 2
const pkg = require('./package.json');

const libraryName = pkg.name;

let outputFile;
let mode;

if (env === 'build') {
	mode = 'production';
	outputFile = `${libraryName}.min.js`;
} else {
	mode = 'development';
	outputFile = `${libraryName}.js`;
}

const config = {
	mode,
	entry: `${__dirname}/index.js`,
	devtool: 'source-map',
	output: {
		path: `${__dirname}/build`,
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: [{
					loader: require.resolve('babel-loader'),
					options: {
						plugins: ['transform-object-rest-spread', '@babel/plugin-transform-runtime'],
					},
				}],
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		modules: [path.resolve('./node_modules'), path.resolve('./src')],
		extensions: ['.json', '.js'],
	},
};

module.exports = config;
