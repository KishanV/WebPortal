var ok = function(){


    var output;
    function init() {

        var top = getCookie('scrollY');
        var left = getCookie('scrollX');
        if(top == ""){
            top = 0;
        }else{
            top =  parseInt(top);
        }
        if(left == ""){
            left = parseInt(0);
        }else{
            left = parseInt(left);
        }
        window.scrollTo(left,top);
        output = document.getElementById("output");
        testWebSocket();
        window.addEventListener("scroll", function(){
            //console.log('ok');
            setCookie("scrollY",window.scrollY,7);
            setCookie("scrollX",window.scrollX,7);
        }, false);
    }
    var websocket;
    function testWebSocket() {
        var wsUri = "ws://"+location.hostname+":9091/";
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) {
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
    }
    function onOpen(evt) {
        writeToScreen("CONNECTED");
        doSend("WebSocket rocks");
    }
    function onClose(evt) {
        writeToScreen("DISCONNECTED");
    }


    function onMessage(evt,websocket) {
        if(evt.data == "Reload"){
                location.reload();
        }
    }

    function onError(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }
    function doSend(message) {
        writeToScreen("SENT: " + message);
        websocket.send(message);
    }
    function writeToScreen(message) {
        //console.log (message);
    }

    function setCookie(cname, cvalue, exdays) {
        //console.log(cvalue);
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    window.addEventListener("load", init, false);
};

ok();