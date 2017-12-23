const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const fs = require("fs");

const compiler = webpack(webpackConfig);
//app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var apis = require('./web/apis');
apis.init(app);

app.use(require('webpack-dev-middleware')(compiler, { noInfo: false ,callback: function () {
	reload();
	console.log('wepack reload');
}} ));
app.use(express.static(process.cwd()));

app.listen(6006, function (err){
    if(err){
        console.log(err);
        return;
    }
    console.log("server running 6006");
});

var ws = require("nodejs-websocket");

var wsList = {};
fs.watch('./src', { encoding: 'buffer' },function(eventType, filename){
	if (filename) {
		console.log(eventType,filename);

	}
});

function reload() {
	for (var connKey in wsList){
		var connWs = wsList[connKey];
		connWs.sendText("Reload");
	}
}

var wsServer = ws.createServer(function (conn) {
	console.log(conn.key);
	wsList[conn.key] = conn;
	conn.on("text", function (str) {
		//console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")

	})
	conn.on("close", function (code, reason) {
		//console.log("Connection closed")
		delete wsList[conn.key];
	})
	conn.on('error', function (err) {
		if (err.code !== 'ECONNRESET') {
			//throw err
		}
		delete wsList[conn.key];
	})
}).listen(9091);
