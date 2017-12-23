const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({ filename: "dist/app.dist.css" });
var fs = require('fs');

var srcJS = [
    './env/env.js',
    './plugins/ByteBuffer.js',
    './plugins/Long.js',
    './plugins/animator.js',
    './plugins/anime.js',
    './plugins/jquery-2.1.4.js',
    './plugins/jquery.mousewheel.min.js',
    './plugins/jquery.smoothwheel.js',
    './plugins/jquery.inputmask.bundle.js',
    './plugins/jquery.svg.js',
    './apis/api.js',
    './apis/quicktags.js',
	'./plugins/watcher.js',
	'./plugins/simple-scrollbar.js'
];
var srcSCSS = [
  './plugins/simple-scrollbar.scss'
];

var fs = require('fs');
var path = require('path');

function getTree(filepath) {
    var stats = fs.lstatSync(filepath);
    var info = {
        path: filepath,
        name: path.basename(filepath)
    };

    if (stats.isDirectory()) {
        info.type = "directory";
        info.children = fs.readdirSync(filepath).map(function(child) {
            return getTree(path.join(filepath, child));
        });
    } else {
        info.type = "file";
        var js = filepath.match(/.*\.js$/);
        var scss = filepath.match(/.*\.scss$/);
        if(js != null){
            srcJS.push('.\\'+js);
        }
        if(scss != null){
            srcSCSS.push('.\\'+scss);
        }
    }
    return info;
}


getTree('./src');
console.log(srcJS);
console.log(srcSCSS);

srcJS.push('./env/init.js');
module.exports = [
    {
        entry: {
            app: srcJS
        },
        devtool: 'source-map',
        output: {
            filename: "dist/app.dist.js"
        },
        module: {},
        plugins: []
    },
    {
        entry: srcSCSS,
        output: {
            filename: "dist/app.dist.css"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    //include: path.join(__dirname, 'app/MindMap/Web'),
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                }
            ]
        },
        plugins: [
            extractSass
        ]
    }
];