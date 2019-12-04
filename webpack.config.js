'use strict'; // eslint-disable-line

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        index: './src/scripts/index.js',
        about: './src/scripts/about.js',
        contact: './src/scripts/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        port: 3000
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'vendor/[name].[ext]',
                    outputPath: '/',
                    publicPath: '../'
                }
            },
            {
                test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
                include: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'vendor/[name].[ext]',
                    outputPath: '/',
                    publicPath: '../'
                },
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        mimetype: 'application/font-woff',
                        outputPath: '/', // where the fonts will go
                        publicPath: '../' // override the default path
                    }
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            chunks: ['index','about'],
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            inject: true,
            chunks: ['index','contact'],
            filename: 'contact.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
            from: 'src/images',
            to: 'images',
            force: true
        }])
    ]
};