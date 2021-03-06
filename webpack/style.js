const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourceDir = path.join(__dirname, '../', 'src', 'stylesheets');
const targetDir = path.join(__dirname, '../', 'public', 'stylesheets');

// const MODE = 'development';
// ソースマップの利用有無(productionのときはソースマップを利用しない)
// const enabledSourceMap = (MODE === 'development');
// https://ics.media/entry/17376

module.exports = {
    entry: {
        css: path.join(sourceDir, 'application.scss'),
    },
    output: {
        path: targetDir,
        filename: 'bundle.css',
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader", options: {url: false} },
                        {loader: "sass-loader?outputStyle=expanded", options: {url: false}}
                    ]
                }
            ),
        }],
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
    ],
};
