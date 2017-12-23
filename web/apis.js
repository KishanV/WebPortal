const fs = require('fs');
const path = require('path');
exports.init = function (app) {

	app.post("/get", function (req, res) {
		console.log(req.body);
		res.send(req.body.demo);
	});

    app.post("/get.project.files", function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var list = [];
        var path = './project/src';
        fs.readdir(path, function(err, items) {
            for (var i=0; i<items.length; i++) {
                var stats = fs.lstatSync(path+ '/' + items[i]);
                //console.log(items[i]);
                list.push({
                    type:stats.isDirectory(),
                    name:items[i]
                });
            }
            res.send(list);
        });
    });

    app.post("/get.project.filebyte", function (req, res) {
        //console.log(req.body.path);
        res.setHeader('Content-Type', 'application/json');
        var list = [];
        var src = './project/src/';
        res.sendFile(path.resolve(src + req.body.path));
    });

    app.post("/save.project.filebyte", function (req, res){
        //console.log(req.body);
        res.setHeader('Content-Type', 'application/json');
        var src = './project/src/';
        src = path.resolve(src + req.body.path);
        fs.truncate(src, 0, function() {
            fs.writeFile(src, req.body.json, function (err) {
                if(err){
                    return console.log("Error writing file: " + err);
                }
            });
        });
        res.send({ data : 'JSON'});
    });
};
