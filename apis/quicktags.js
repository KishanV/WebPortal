//var tags = new (function(){
new (function(){
    var crtElm;
    var body;
    var container = [];

    jQuery.fn.setUiContainer = function(obj,prm){
        container.push($(this).get(0));
    }

    jQuery.fn.setUiComponent = function(obj,prm){
        focusClear({});
        crtElm = $(this).get(0);
        //console.log(crtElm);
        focusObj({});
    }

    var getContainer = function () {
        body = document.body;
        if(container.length != 0){
            body = container[container.length-1];
        }
        return body;
    };

    var bb = false;
    function getNext(elm){
        var body = getContainer();
        var elemnt = elm;
        bb = false;

        while(elemnt != null){
            if(crtElm != elemnt && elemnt.nodeType == 1 && (elemnt.getAttribute('ui-component') == true || elemnt.getAttribute('ui-component') == 'true')){
                return elemnt;
            }else{
                var firstElm = elemnt.firstChild;
                var nextElm = elemnt.nextSibling;
                var parentElm = elemnt.parentElement;
                if(firstElm != null){
                    elemnt = firstElm;
                }else if(nextElm != null){
                    elemnt = nextElm;
                }else if(parentElm != null && body != parentElm){
                    nextElm = parentElm.nextSibling;
                    while(nextElm == null && parentElm != null && body != nextElm && body != parentElm){
                        nextElm = parentElm.nextSibling;
                        if(nextElm == null){
                            parentElm = parentElm.parentElement;
                        }
                    }
                    if(nextElm == null && body != parentElm){
                        elemnt = parentElm;
                    }else if(body != nextElm && body != nextElm){
                        elemnt = nextElm;
                    }else{
                        elemnt = null;
                    }
                }else{
                    if(bb == false && elemnt != body){
                        bb = true;
                        elemnt = body;
                    }
                }
            }
        }
    }
    function getPrev(elm){
        var body = getContainer();
        var elemnt = elm;
        while(elemnt != null){
            if(crtElm != elemnt && elemnt.nodeType == 1 && (elemnt.getAttribute('ui-component') == true || elemnt.getAttribute('ui-component') == 'true')){
                return elemnt;
            }else{
                var firstElm = elemnt.lastChild;
                var nextElm = elemnt.previousSibling;
                var parentElm = elemnt.parentElement;
                if(firstElm != null){
                    elemnt = firstElm;
                }else if(nextElm != null){
                    elemnt = nextElm;
                }else  if(parentElm != null){
                    nextElm = parentElm.previousSibling;
                    while(nextElm == null && parentElm != null && body != nextElm && body != parentElm){
                        nextElm = parentElm.previousSibling;
                        if(nextElm == null){
                            parentElm = parentElm.parentElement;
                        }
                    }
                    if(nextElm == null){
                        elemnt = parentElm;
                    }else if(body != nextElm){
                        elemnt = nextElm;
                    }else{
                        elemnt = null;
                    }
                }
            }
        }
    }
    function focusClear(e){
        if (crtElm != null){
            $(crtElm).removeClass('ui_focused');
            if(crtElm.getAttribute('contenteditable') == 'true'){
                crtElm.blur();
            }
            var event = jQuery.Event("ui.component.focusout");
            event.event = e;
            $(crtElm).trigger(event,[crtElm]);
        }
        if(crtElm == null){
            crtElm = document.body;
        }
    }

    function fireEvent(e) {
        var event = jQuery.Event("ui.component.focusin");
        event.event = e;
        $(crtElm).trigger(event,[crtElm]);
    }

    function fireActionEvent(e) {
        var event = jQuery.Event("ui.component.action");
        event.event = e;
        $(crtElm).trigger(event,[crtElm]);
    }

    function focusObj(e,action) {
        if(crtElm != undefined){
            $(crtElm).addClass('ui_focused');
            if(crtElm.getAttribute('contenteditable') == 'true'){
                setTimeout(function() {
                    crtElm.focus();
                    fireEvent(e);
                }, 0);
            }else{
                if(action != true){
                    $(crtElm).find('*[contenteditable=true]').setCaret();
                    $(crtElm).find('*[contenteditable=true]').focus();
                }
                fireEvent(e);
            }
        }
    }
    function focusNext(e) {
        focusClear(e);
        crtElm = getNext(crtElm);
        focusObj(e);
    }
    function focusPrev(e) {
        focusClear(e);
        crtElm = getPrev(crtElm);
        focusObj(e);
    }
    $(window).keydown(function(e){
        if(e.keyCode == 9){
            if(e.shiftKey == true){
                focusPrev(e);
            }else{
                focusNext(e);
            }
        }
    });

    $(window).keyup(function(e){
        if(e.keyCode == 13){
            fireActionEvent(e);
        }
    });

    var $Qt2 = function($obj){
        var obj = $obj.objects;
        var parent = $obj.parent;
        var length = $obj.group;
        var each = $obj.each;
        if(length == undefined){
            length = 1;
        }else{
            length = length.length;
        }

        function $func(tag,goPrm,returnOBJ){
            //console.log(goPrm);
            var list = Object.keys(goPrm);
            for(var i = 0;i < list.length;i++){
                var prop = list[i];
                if(prop == 'component' && (goPrm[prop] == true || goPrm[prop] == 'true')){
                    $(tag).attr({
                        'ui-component':'true'
                    });
                    $(tag).mousedown(function(e){
                        if(crtElm != $(this)[0]){
                            focusClear();
                            crtElm = $(this)[0];
                            focusObj(e,true);
                        }
                    });
                    $(tag).click(function(e){
                        crtElm = $(this)[0];
                        fireActionEvent(e);
                    });
                }else if(prop == 'scroll' && (goPrm[prop] == true || goPrm[prop] == 'true')){
                    //console.log(goPrm);
                    var evObj = goPrm[prop];
                    $(tag).addClass('scrollUI');
                    var oAnim = undefined;
                    var rate = 1;

                    var lastDelta = 0;
                    var delta = 0;
                    var anim = undefined;
                    var scroll = $(tag).tags({
                        $:{
                            event:{
                                scroll:function(e){
                                    computeScroll();
                                },
                                mouseenter:function(){
                                    computeScroll();
                                },
                                mousewheel:function(e) {
                                    var factor = e.deltaFactor;
                                    if (Math.ceil(factor) == factor) {
                                        //console.log(e.deltaY,delta,lastDelta);
                                        if (lastDelta == e.deltaY) {
                                            delta -= e.deltaY;
                                        } else {
                                            delta = 0;
                                            delta -= e.deltaY;
                                        }
                                        $(tag).addClass('scrolling');
                                        if (anim != undefined) {
                                            anim.stop();
                                        }
                                        var onTween = function (value) {
                                            tag.scrollTop += (10 * (delta * 0.5));
                                        }

                                        if(e.shiftKey == true){
                                            onTween = function (value) {
                                                tag.scrollLeft += (10 * (delta * 0.5));
                                            }
                                        }
                                        anim = new Animation({
                                            to: 40,
                                            ontween:onTween,
                                            oncomplete: function (value) {
                                                delta = 0;
                                                $(tag).removeClass('scrolling');
                                            }
                                        });
                                        anim.start();
                                    } else {
                                        if (anim != undefined) {
                                            anim.stop();
                                        }
                                        tag.scrollTop +=  e.deltaY * (4 * factor);
                                        tag.scrollLeft +=  e.deltaX * (4 * factor);
                                    }
                                    lastDelta = e.deltaY;
                                }
                            }
                        },
                        '.scrollBODY':{
                            '.right':{
                                $:{
                                    each:function(elm){
                                        var body;
                                        var elmHeight;
                                        var elmWidth;
                                        var scrollHeight;
                                        var scrollWidth;
                                        var scrollTop;
                                        var barHeight;
                                        var barTop;
                                        var barWidth;

                                        $(elm).drag({
                                            fraction:10,
                                            down:function(e){
                                                body = scroll.scrollBODY.$element;
                                                elmHeight = $(tag).height();
                                                elmWidth = $(tag).width();
                                                scrollHeight = tag.scrollHeight;
                                                scrollWidth = tag.scrollWidth;
                                                scrollTop = tag.scrollTop;
                                                barHeight = Math.round((elmHeight) / (scrollHeight/elmHeight));
                                                barTop = Math.round((scrollTop) / (scrollHeight/elmHeight));
                                                barWidth = Math.round((elmWidth) / (scrollWidth/elmWidth));
                                                if(e.button == 2){
                                                    return false;
                                                }else{
                                                    $(tag).addClass('scrollHeightDrag');
                                                }
                                            },
                                            start:function(e,Dx,Dy){

                                            },
                                            move:function(e,Dx,Dy){
                                                tag.scrollTop = scrollTop + ((scrollHeight/elmHeight) * Dy);
                                                //console.log((scrollHeight/elmHeight) * Dy,Dy);
                                            },
                                            up:function(){
                                                $(tag).removeClass('scrollHeightDrag');
                                            }
                                        });
                                    }
                                }
                            },
                            '.bottom':{
                                $:{
                                    each:function(elm){
                                        var body;
                                        var elmHeight;
                                        var elmWidth;
                                        var scrollHeight;
                                        var scrollWidth;
                                        var scrollTop;
                                        var scrollLeft;
                                        var barHeight;
                                        var barTop;
                                        var barWidth;

                                        $(elm).drag({
                                            fraction:10,
                                            down:function(e){
                                                body = scroll.scrollBODY.$element;
                                                elmHeight = $(tag).height();
                                                elmWidth = $(tag).width();
                                                scrollHeight = tag.scrollHeight;
                                                scrollWidth = tag.scrollWidth;
                                                scrollTop = tag.scrollTop;
                                                scrollLeft = tag.scrollLeft;
                                                barHeight = Math.round((elmHeight) / (scrollHeight/elmHeight));
                                                barTop = Math.round((scrollTop) / (scrollHeight/elmHeight));
                                                barWidth = Math.round((elmWidth) / (scrollWidth/elmWidth));
                                                if(e.button == 2){
                                                    return false;
                                                }else{
                                                    $(tag).addClass('scrollWeightDrag');
                                                }
                                            },
                                            start:function(e,Dx,Dy){

                                            },
                                            move:function(e,Dx,Dy){
                                                tag.scrollLeft = scrollLeft + ((scrollWidth/elmWidth) * Dx);
                                                //console.log((scrollHeight/elmHeight) * Dy,Dy);
                                            },
                                            up:function(){
                                                $(tag).removeClass('scrollWeightDrag');
                                            }
                                        });
                                    }
                                }
                            },
                        }
                    });
                    function computeScroll(){
                        var body = scroll.scrollBODY.$element;
                        var elmHeight = $(tag).height() ;
                        var elmWidth = $(tag).width();
                        var scrollHeight = tag.scrollHeight;
                        var scrollWidth = tag.scrollWidth;

                        var scrollTop = tag.scrollTop;
                        var scrollLeft = tag.scrollLeft;

                        var barHeight = Math.round((elmHeight) / (scrollHeight/elmHeight));
                        var barTop = Math.round((scrollTop) / (scrollHeight/elmHeight));

                        var barWidth = Math.round((elmWidth) / (scrollWidth/elmWidth));
                        var barLeft =  Math.round((scrollLeft) / (scrollWidth/elmWidth));

                        if(elmWidth == scrollWidth){
                            barWidth = 0;
                            if(elmHeight != scrollHeight){
                                barHeight += 8;
                            }
                        }

                        if(elmHeight == scrollHeight){
                            barHeight = 0;
                            if(elmWidth != scrollWidth){
                                elmWidth += 8;
                            }
                        }

                        $(scroll.scrollBODY.right.$element).css({
                            top:barTop + 4,
                            height:barHeight - 16
                        });
                        $(scroll.scrollBODY.bottom.$element).css({
                            left:barLeft + 4,
                            width:barWidth - 16
                        });
                        $(scroll.scrollBODY.$element).css({
                            top:scrollTop,
                            left:scrollLeft
                        });
                    }
                    setTimeout(function(){
                        computeScroll();
                    },10);

                }else if(prop == 'event'){
                    var evObj = goPrm['event'];
                    var listJ = Object.keys(evObj);
                    for(var j = 0;j < listJ.length;j++) {
                        var evName = listJ[j];
                        $(tag).bind(evName,returnOBJ,evObj[evName]);
                    }
                }else if(prop == 'text'){
                    var evObj = goPrm['text'];
                    if(typeof evObj === 'string'){
                        $(tag).append(evObj);
                    }else{
                        var lang = api.lang.current;

                        if(evObj[lang] == undefined){
                            lang = 'eng';
                        }

                        var vartag = $('<lang class="'+ lang +'">'+evObj[lang]+'</lang>');
                        //console.log('eng tag',tag,evObj);
                        $(tag).append(vartag);
                        $(vartag).data(evObj);
                    }
                } else if(prop == 'val'){
                    var evObj = goPrm['val'];
                    $(tag).val(evObj);
                }else if(prop == 'css'){
                    var evObj = goPrm['css'];
                    //console.log(goPrm);
                    $(tag).css(evObj);
                }else if(prop == 'attr'){
                    var evObj = goPrm['attr'];
                    $(tag).attr(evObj);
                    if(evObj.keycode != undefined){
                        new(function(){
                            var keyCode = evObj.keycode+'';
                            $(tag).keydown(function(e){
                                if(keyCode.indexOf(e.keyCode+'') != -1){
                                    e.preventDefault();
                                }
                            });
                        });
                    }
                }else if(prop == 'data'){
                    var evObj = goPrm['data'];
                    $(tag)['data'](evObj);
                    if(evObj.$debug != undefined){
                        $(tag).mouseup(function(e){
                            if(e.target == tag && e.button == 2){
                                ssjs.sendReport({
                                    no:97,
                                    msg:$(tag)['data']('$debug')
                                });
                            }
                        });
                    }
                }
            }
        }
        var $after = [];
        function Go(prm,list,tag,returnOBJ){
            for(var i = 0;i < list.length;i++){
                var prop = list[i];
                var goTag;
                var goPrm = prm[prop];


                if(prop[0] != '$' ){
                    //console.log(goPrm,prop[0],prop);
                    var repeat = 1;
                    var eachFN = null;
                    var afterFN =  null;
                    if(goPrm != undefined){

                        if(goPrm.$repeat != undefined){
                            repeat = goPrm.$repeat;
                        }
                        if(goPrm.$each != undefined){
                            eachFN = goPrm.$each;
                        }
                        if(goPrm.$after != undefined){
                            afterFN = goPrm.$after;
                        }

                        if(goPrm.$ != undefined){
                            if(goPrm.$.repeat != undefined){
                                repeat = goPrm.$.repeat;
                            }
                            if(goPrm.$.each != undefined){
                                eachFN = goPrm.$.each;
                            }
                            if(goPrm.$.after != undefined){
                                afterFN = goPrm.$.after;
                            }
                        }
                    }

                    var dot = prop.indexOf('.');
                    var $returnOBJ = {};
                    $returnOBJ['$parent'] = returnOBJ;
                    for(var j = 0;j < repeat;j++){
                        if(dot == -1){
                            goTag = tag.appendChild(document.createElement(prop));
                            returnOBJ[prop] = $returnOBJ;
                            $returnOBJ['$element'] = goTag;
                        }else{
                            var name = prop.substr(0,dot);
                            if(name == ''){
                                name = 'div';
                            }
                            //alert(name);
                            var clases = prop.substr(dot+1,prop.length).split('.');
                            goTag = name = document.createElement(name);
                            tag.appendChild(name);
                            name.className  = clases.join(' ');
                            returnOBJ[clases.join('_')] = $returnOBJ;
                            $returnOBJ['$element'] = goTag;
                            //console.log(name,clases);
                        }


                        if($obj.prm != undefined){
                            if($obj.prm.each != undefined){
                                $obj.prm.each(goTag,j,$returnOBJ);
                            }
                        }
                        if(eachFN != null){
                            if(eachFN(goTag,j,$returnOBJ) != false){
                                if(goPrm != undefined){
                                    var goList = Object.keys(goPrm);
                                    if(goList.length != 0){
                                        Go(goPrm,goList,goTag,$returnOBJ);
                                    }
                                }
                            }else{
                                $(goTag).remove();
                            }
                        }else{
                            if(goPrm != undefined){
                                var goList = Object.keys(goPrm);
                                if(goList.length != 0){
                                    Go(goPrm,goList,goTag,$returnOBJ);
                                }
                            }
                        }

                        if(afterFN != null){
                            $after.push([afterFN,goTag,j,$returnOBJ]);
                        }
                    }
                }
                else{
                    //console.log(goPrm,prop[0],prop);
                    if((prop[0] == '$' || prop[0] == '$') && prop.length != 1){
                        var obj = {};
                        obj[prop.substr(1)] = goPrm;
                        $func(tag,obj,returnOBJ);
                    }else{
                        $func(tag,goPrm,returnOBJ);
                    }
                }
            }
        }

        var rOBJ = {
            $element:parent
        };
        for(var a = 0;a < length;a++){
            Go(obj,Object.keys(obj),parent,rOBJ);
        }

        for(var af = 0;af < $after.length;af++){
            var $af = $after[af];
            $af[0]($af[1],$af[2],$af[3],rOBJ);
        }
        return rOBJ;
    }

    jQuery.fn.tags = function(obj,prm){
        return $Qt2({
            objects:obj,
            parent:$(this).get(0),
            prm:prm
        });
    };
});
