
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
var ssjs;
function init() {
    ssjs = new testWebSocket();
    ssjs.setDefaultPath("./server.html");
}

function tableToDatasource(table) {
    if (!Array.isArray(table.rows))
        return table.rows;

    var rows = [];
    table.rows.forEach(function (arr) {
        if (!Array.isArray(arr))
            rows.push(arr);
        else { // need to convert array to object
            var obj = {};
            var hasOwnProp = Object.prototype.hasOwnProperty;
            for (var k in arr) {
                var propName = ''+table.cols[k][0];
                if (+k === (k & 0x7fffffff) && hasOwnProp.call(arr, k)) {
                    if(propName == "Date"){
                        var value = arr[k];
                        value = value.split('-');
                      //  obj[propName] = new Date(value[0], value[1], value[2], 0, 0, 0, 0);
                        obj[propName] = new Date();
                        //console.log();
                    }else{
                        obj[propName] = arr[k];
                    }

                }
            }
            rows.push(obj);
        }
    });

    function timeEditor(container, options) {
        $('<input onkeydown="javascript:return false;" readonly="true" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
            .appendTo(container)
            .kendoTimePicker({});
    }

    function dateEditor(container, options) {
        $('<input onkeydown="javascript:return false;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
            .appendTo(container)
            .kendoDatePicker({});
    }

    function dateTimeEditor(container, options) {
        $('<input onkeydown="javascript:return false;"   data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
            .appendTo(container)
            .kendoDateTimePicker({});
    }

    function checkBox(container, options) {
        var data = [
            { text: "Yes", value: "1" },
            { text: "No", value: "0" }
        ];
        $('<input   data-bind="value:' + options.field + '" />')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: {data:data} ,
            }).data('kendoDropDownList').open();
    }

    var cols = {data:[],obj:{}};
    var names = [];
    var schema =  {
        model: {
            id: "id",
            fields: { }
        }
    }

    table.cols.forEach(function (arr) {
        if (!Array.isArray(arr))
            cols.push(arr);
        else { // need to convert array to object
            var prop = arr[0];
            var type = arr[1];
            var obj = { field: arr[0], title: arr[0], width: "200px" };
            var schemaobj = { };

            if(prop == 'id'){
                obj['hidden'] = true;
                schemaobj =  { editable: false, nullable: true };
            } else if(prop == 'Hide'){
                schemaobj = { type:'string',defaultValue: '0',  validation: { required: true } };
                obj['hidden'] = false;
            } else if(prop == 'Date'){
                schemaobj = { editable: false,type:'date',defaultValue:new Date()  };
                obj['hidden'] = false;
            }else{
                schemaobj =  { validation: { required: true } };
            }

            if(type == "int"){
                obj['type'] = 'number';
                schemaobj['defaultValue'] = '0';
            }else if(type == "date"){
                obj['template'] =   "#= kendo.toString(kendo.parseDate(Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #";
                obj['editor'] =   dateEditor;
                obj['format'] =    "{0:yyyy-MM-dd}";
                schemaobj['defaultValue'] = new Date();
            }else if(type == "tinyint"){
                obj['template'] = "#= "+prop+" == 1 ? 'yes' : 'no' #";
                //obj['template'] = '<input type="checkbox" #= Hide == '1' ? "checked=checked" : "" # disabled="disabled" ></input>';
                obj['editor'] = checkBox;
                obj['type'] = 'string';
                schemaobj['defaultValue'] = '0';
            }else if(type == "datetime"){
                obj['template'] =  "#= kendo.toString(kendo.parseDate(Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #";
                obj['editor'] =   dateTimeEditor;
                obj['format'] =  "{0:yyyy-MM-dd HH:mm}";
                schemaobj['defaultValue'] = new Date();
            }else{
                obj['type'] = 'string';
                schemaobj['type'] = 'string';
            }

            schema.model.fields[prop+''] = schemaobj;
            names.push(arr[0]);
            cols.data.push(obj);
            cols.obj[prop+''] = obj;
        }
    });

    return {
        source:{
            data: rows,
            schema: schema,
            pageSize: 20
        },
        columns:cols,
        names:names
    };
}

function testWebSocket() {
    var ByteBuffer = dcodeIO.ByteBuffer;
    var wsUri = "ws://"+location.hostname+":8080/";

    var websocket = new WebSocket(wsUri);
    websocket.binaryType = "arraybuffer";
    websocket.onopen = function (evt) {
        console.log(wsUri);
        onOpen(evt)
    };
    websocket.onclose = function (evt) {
        onClose(evt)
    };
    websocket.onmessage = function (evt) {
        onMessage(evt,websocket)
    };
    websocket.onerror = function (evt) {
        onError(evt)
    };

    function onOpen(evt) {
        writeToScreen("CONNECTED");
        admin();
    }

    function onClose(evt) {
        writeToScreen("DISCONNECTED");
    }

    function onMessage(msg,websocket) {
        gotData(msg);
    }

    function onError(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend(message) {
        writeToScreen("SENT: " + message);
        websocket.send(message);
    }
    function writeToScreen(message) {
       // console.log (message);
    }

    var defaultPath = '';
    this.setDefaultPath = function(path){
        defaultPath = path;
    }

    var sentCount = 100000;
    var WaitCount = 0;


    function Call(opt){
        this.call = function(prm){
            this.ajax(prm);
        }
    }

    this.func = function(){ };
    this.addPath = function(name,opt){
        var fn = this.func[name];
        if(fn == undefined){
            this.func[name] = new Call(opt);
        }
    }


    this.sendError = function(opt){
        var bb = new ByteBuffer();
        bb.writeInt32(98);
        bb.writeUTF(opt.msg);
        bb.flip();
        websocket.send(bb.toArrayBuffer());
    }

    this.sendReport = function(opt){
        var bb = new ByteBuffer();
        bb.writeInt32(opt.no);
        if(opt.no == 96){
            if(opt.msg.msg == undefined){
                opt.msg.msg = 'undefined';
            }else if((opt.msg.msg+'').startsWith('[object HTML') == true){
                opt.msg.msg = opt.msg.msg+'';
            }else if(typeof opt.msg.msg == 'object'){
                var object = opt.msg.msg;
                opt.msg.msg = opt.msg.msg + '';
                var val = ['{'];
                var list = Object.keys(object);
                list.forEach(function(value,no){
                    var $val = object[value];
                    print
                    if(typeof $val == 'number'){
                        val.push('  '+value + ' : ' + $val+'' + (list.length-1 == 0 ? '' : ','));
                    }else if(Array.isArray($val)){
                        val.push('  '+value + ' : [ \n                  ' + $val.join(',\n                  ')+'\n             ]' + (list.length-1 == 0 ? '' : ','));
                    }else if(typeof $val == 'object'){
                        val.push('  '+value + ' : ' + $val+'' + (list.length-1 == 0 ? '' : ','));
                    }else{
                        val.push('  '+value + ' : \'' + $val+'\'' + (list.length-1 == 0 ? '' : ','));
                    }
                });
                val.push('}');
                opt.msg.msg = (val.join('\n'));
            }else{
                opt.msg.msg = JSON.stringify(opt.msg.msg);
            }
        }
        bb.writeUTF(JSON.stringify(opt.msg));
        bb.flip();
        websocket.send(bb.toArrayBuffer());
    }

    this.scocket = function(opt){
        var bb = new ByteBuffer();
        bb.writeInt32(sentCount);
        if(opt.tempPath != undefined) {
            bb.writeUTF(opt.tempPath);
        }else if(defaultPath == ''){
            bb.writeUTF(window.location.href.substr(window.location.href.IndexOf("/")+1));
        }else {
            bb.writeUTF(defaultPath);
        }
        bb.writeUTF(opt.type);
        bb.writeUTF(opt.name);
        bb.writeUTF(JSON.stringify(opt.data));
        websocket.send(bb.toArrayBuffer());
        //console.log(JSON.stringify(data));
        $(window).bind("WS"+sentCount,function(ev,data){
            if(opt.fn != undefined){
                if(opt.prm != undefined){
                    opt.fn(ev,data,opt.prm);
                }else{
                    opt.fn(ev,data);
                }
            }
            $(window).unbind("WS"+sentCount);
            WaitCount--;
            if(WaitCount <= 0){
                $('.blockPanel').attr('class','blockPanel');
            }
            //console.log("WaitCount IN: "+WaitCount);
        });
        sentCount++;
        WaitCount++;
        $('.blockPanel').attr('class','blockPanel sel');
    }

    //this.ajax = function(type,name,data,fn,outType,tempPath,prm,file){
    this.ajax = function(opt){
        var ByteBuffer = dcodeIO.ByteBuffer;
        var bb = new ByteBuffer();
        bb.writeInt32(1);
        bb.writeUTF(opt.name);
        //bb.writeUTF(JSON.stringify(opt.data));
        //console.log(JSON.stringify(opt.data));
        bb.flip();
        bb = bb.toArrayBuffer();
        // bb = "Kishan devani ....!";
        var formData = new FormData();
        var blob = new Blob([bb],{type: "application/octet-stream"});
        formData.append("data", blob);
        formData.append("path", opt.name);
        formData.append("json", JSON.stringify(opt.data));

        if(opt.file != undefined){
           $.each(opt.file, function(key, value){
               formData.append(value[0], value[1][0]);
           });
        }

        var nowPath = "";
        if(opt.tempPath != null) {
            nowPath = opt.tempPath;
        }else if(defaultPath == ''){
            nowPath = window.location.href.substr(window.location.href.IndexOf("/")+1);
        }else {
            nowPath = defaultPath;
        }

        $.ajax({
            url: nowPath,
            headers: { 'ssjsCall': opt.type},//,'content-type':'multipart/form-data'
            type: 'POST',
            data:formData,
            contentType: false,
            processData: false,
            success:function(str){
                //console.log('output : ' + str);
                if(opt.outType == "json"){
                    if(str == ''){
                        str = undefined;
                    }else{
                        str = JSON.parse(str);
                    }
                }

                if(opt.fn != undefined){
                    if(opt.prm != undefined){
                        opt.fn(str,opt.prm);
                    }else{
                        opt.fn(str);
                    }
                }
            }
        });
    }

    function gotData(msg){
        //console.log('msg.data',msg.data);
        var bb = ByteBuffer.wrap(msg.data,null ,false);
        bb.flip();
        var cmd = bb.readInt32();
        //console.log('cmd',cmd);
        var isJson = bb.readUTF();
        var data = bb.readUTF();


        if(isJson == "json"){
            //console.log('isJson',data);
            isJson = true;
            data = JSON.parse(data);
        }else{
            isJson = false;
        }

        if(cmd < 999){
            if(cmd == 100){
                console.log('[server] => ',data);
            }else{
                //console.log("FWS"+cmd,data);
                $(window).trigger("FWS"+cmd,[data]);
            }
        } else{
            $(window).trigger("WS"+cmd,[data,isJson]);
        }
    }
    return this;
}

function convertArrayToObjects(arrayOfArrays) {
    if (!Array.isArray(arrayOfArrays))
        return arrayOfArrays;

    var arrayOfObjects = [];
    arrayOfArrays.forEach(function (arr) {
        if (!Array.isArray(arr))
            arrayOfObjects.push(arr);
        else { // need to convert array to object
            var obj = {};
            var hasOwnProp = Object.prototype.hasOwnProperty;
            for (var k in arr) {
                if (+k === (k & 0x7fffffff) && hasOwnProp.call(arr, k)) {
                    obj['_'+k] = arr[k];
                }
            }

            arrayOfObjects.push(obj);
        }
    });

    return arrayOfObjects;
}
window.addEventListener("load", init, false);
