const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
       index: './src/index.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    
    //ggf. bundle Analyzer
    devtool: 'inline-source-map', //Error messages refer to the original files, rather than our bundle
    
    devServer: { //devServer can be started using 'npm run startDevServer'
        contentBase: './dist'
    },

    plugins: [
        new HtmlWebpackPlugin({ //auto generate html page
            title: "LTurtle"
        })
    ],

    //output management
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        clean: true //dist folder will only contain files from the current build
    }
}