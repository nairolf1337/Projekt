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
    devtool: 'inline-source-map',
    
    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new HtmlWebpackPlugin({ 
            title: "LTurtle"
        })
    ],

    //output management
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        clean: true
    }
}