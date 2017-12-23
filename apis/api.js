var api = {
    lang:{
        current:'eng'
    },
    object:{
        addProp:function(obj,str,value,inArray){
            var string = str.split(".");
            var inputObj = obj;
            for(var i = 0;i < string.length;i++){
                var oldObj = obj;
                if(obj[string[i]] == undefined){
                    var newObj = {};
                    obj[string[i]] = newObj;
                    if(i == string.length - 1){
                        obj[string[i]] = undefined;
                    }else{
                        obj = newObj;
                    }

                }else{
                     obj = obj[string[i]];
                }

                if(i == string.length - 1){
                    //console.log(oldObj[string[i]]);
                    //oldObj[string[i]] = value;
                }
            }

            var mainObj;
            for(var i = 0;i < string.length;i++){
                var oldObj = inputObj;
                inputObj = inputObj[string[i]];
                if(i == string.length - 1){
                    //console.log(inputObj);
                    if(oldObj[string[i]] == undefined && inArray != true){
                        oldObj[string[i]] = value;
                    }else if(Array.isArray(oldObj[string[i]])){
                        oldObj[string[i]].push(value);
                    }else if(inArray == true){
                        oldObj[string[i]] = [value];
                    }else {
                        var val = oldObj[string[i]];
                        oldObj[string[i]] = [val,value];
                    }
                }
            }
            //console.log(str,value,inputObj);
        }
    },
    key:{
        isDown:{}
    },
    table:{
        organize:function(opt){
            var fn = function(opt){
                var table = opt.table;
                var groupBy = opt.groupBy;
                var group = {};
                if(groupBy != undefined){
                    table.group = {
                        data:group,
                        field:groupBy,
                        list:[]
                    };
                }
                table.index = {};
                table.fn = {};
                var rows = opt.table.rows;
                function getFn(index){
                    // console.log(opt);
                    return function(val){
                        return rows[val][index];
                    };
                }
                for(var i = 0;i < table.cols.length;i++){
                    table.index[table.cols[i][0]] = i;
                    table.fn[[table.cols[i][0]]] = new getFn(i);
                }
                table.ids = {};
                for(var i = 0;i < table.rows.length;i++){
                    if(groupBy != undefined){
                        if(group[table.rows[i][table.index[groupBy]]] == undefined){
                            group[table.rows[i][table.index[groupBy]]] = [];
                            table.group.list.push(table.rows[i][table.index[groupBy]]);
                        }
                        group[table.rows[i][table.index[groupBy]]].push({
                            name:table.rows[i][table.index.name],
                            value:table.rows[i]
                        });
                    }
                    table.ids[table.rows[i][table.index.id]] = table.rows[i][table.index.name];
                }
            };
            new fn(opt);
        },
        data:{}
    },
    form:{
        validation:{
            getCaretPositionDic:function(editableDiv) {
                var caretPos = 0,
                    sel, range;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        if (range.commonAncestorContainer.parentNode == editableDiv) {
                            caretPos = range.endOffset;
                        }
                    }
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    if (range.parentElement() == editableDiv) {
                        var tempEl = document.createElement("span");
                        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                        var tempRange = range.duplicate();
                        tempRange.moveToElementText(tempEl);
                        tempRange.setEndPoint("EndToEnd", range);
                        caretPos = tempRange.text.length;
                    }
                }
                return caretPos;
            },getCaretPosition:function(inputBox) {
                var ctl = inputBox;
                var startPos = ctl.selectionStart;
                var endPos = ctl.selectionEnd;
                return startPos;
            },getCaretPosition:function(inputBox) {
                var ctl = inputBox;
                var startPos = ctl.selectionStart;
                var endPos = ctl.selectionEnd;
                return startPos;
            },
            int:function(opt){
                var elm = opt.element;
                var defVal = opt.defaultValue;
                var fn = opt.fn;
                elm.val(defVal);
                elm.focusin(function(){
                    var val = elm.val();
                    if(val == defVal){
                        elm.val('');
                    }
                });
                elm.focusout(out);
                function out(){
                    elm.val(elm.val().replace(/[^0-9.]/g, ""));
                    if(elm.val() == ''){
                        elm.val(defVal);
                        elm.addClass('error');
                        elm.removeClass('done');
                        if(fn != undefined){
                            fn(false);
                        }
                    }else{
                        elm.removeClass('error');
                        elm.addClass('done');
                        if(fn != undefined){
                            fn(elm.val());
                        }
                    }
                }
                elm.keyup(check);
                function check(){
                    out();
                }
                return 'NUMBER';
            },
            varchar:function(opt){
                var elm = opt.elm;
                var defVal = opt.defaultValue;
                var fn = opt.fn;
                elm.val(defVal);
                elm.focusin(function(){
                    var val = elm.val();
                    if(val == defVal){
                        elm.val('');
                    }
                });
                elm.focusout(out);
                elm.keyup(out);
                function out(){
                    if(!elm.val().replace(/\s/g, '').length){
                        elm.val(defVal);
                        elm.addClass('error');
                        elm.removeClass('done');
                    }else{
                        elm.removeClass('error');
                        elm.addClass('done');
                    }
                    if(fn != undefined){
                        if(!elm.val().replace(/\s/g, '').length || elm.val() == defVal){
                            fn(false);
                        }else{
                            fn(elm.val());
                        }
                    }
                }
                return 'EG: ABC_124@$';
            },
            date:function(opt){

                var isDate = (function(){
                    var dtCh= "-";
                    var minYear=1900;
                    var maxYear=2100;
                    function isInteger(s){
                        var i;
                        for (i = 0; i < s.length; i++){
                            // Check that current character is number.
                            var c = s.charAt(i);
                            if (((c < "0") || (c > "9"))) return false;
                        }
                        // All characters are numbers.
                        return true;
                    }

                    function stripCharsInBag(s, bag){
                        var i;
                        var returnString = "";
                        // Search through string's characters one by one.
                        // If character is not in bag, append to returnString.
                        for (i = 0; i < s.length; i++){
                            var c = s.charAt(i);
                            if (bag.indexOf(c) == -1) returnString += c;
                        }
                        return returnString;
                    }

                    function daysInFebruary (year){
                        // February has 29 days in any year evenly divisible by four,
                        // EXCEPT for centurial years which are not also divisible by 400.
                        return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
                    }
                    function DaysArray(n) {
                        for (var i = 1; i <= n; i++) {
                            this[i] = 31
                            if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
                            if (i==2) {this[i] = 29}
                        }
                        return this
                    }

                    function isDate(dtStr){
                        var daysInMonth = DaysArray(12)
                        var pos1=dtStr.indexOf(dtCh)
                        var pos2=dtStr.indexOf(dtCh,pos1+1)
                        var strDay=dtStr.substring(0,pos1)
                        var strMonth=dtStr.substring(pos1+1,pos2)
                        var strYear=dtStr.substring(pos2+1)
                        strYr=strYear
                        if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
                        if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
                        for (var i = 1; i <= 3; i++) {
                            if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
                        }
                        month=parseInt(strMonth)
                        day=parseInt(strDay)
                        year=parseInt(strYr)
                        if (pos1==-1 || pos2==-1){
                            //alert("The date format should be : dd/mm/yyyy")
                            return false
                        }
                        if (strMonth.length<1 || month<1 || month>12){
                            //alert("Please enter a valid month")
                            return false
                        }
                        if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
                            //alert("Please enter a valid day")
                            return false
                        }
                        if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
                            //alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
                            return false
                        }
                        if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
                            //alert("Please enter a valid date")
                            return false
                        }
                        return true
                    }

                    return isDate;
                })();
                function today(){
                    var d = new Date();
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth() + 1;
                    var curr_year = d.getFullYear();
                    return (curr_date + "-" + curr_month + "-" + curr_year);
                }
                var elm = opt.elm;
                elm.val(today);
                elm.addClass('done');
                var defVal = today;
                var fn = opt.fn;
                elm.datepicker({
                    format:'dd-mm-yyyy',
                    setDate:new Date()
                }).on('show', function(ev){
                    console.log(ev,$(this));
                    var pos = $(this).offset();
                    pos.top += -4;
                    pos.left += $(this).outerWidth();
                    $(".datepicker.dropdown-menu").offset(pos);
                    $(".datepicker.dropdown-menu").offset(pos);
                    $(".datepicker.dropdown-menu").css('position','absolute');
                }) .on('changeDate', function(ev){
                    defVal = $(this).val();

                });

                elm.mousedown(function(){
                    setTimeout(function(){
                        $(elm).datepicker('show');
                    },10);
                });
                var focus = true;
                elm.focusin(function(){
                    focus = true;
                });
                elm.focusout(function(){
                    console.log('focusout');
                    if(isDate(elm.val()) == false){
                        elm.val(defVal);
                    }
                    focus = false;
                    // $(elm).datepicker('hide');
                });

                elm.bind('onchange',function(){
                    $(elm).datepicker('hide');
                });
                var oldVal;
                elm.keyup(function(){
                    console.log('keyup');
                    elm.val(defVal);
                    if(focus == false){
                        $(elm).datepicker('hide');
                    }
                });elm.keydown(function(e){
                    console.log('keydown');
                    if(e.keyCode == 9){
                        $(elm).datepicker('hide');
                    }
                });
                return 'EG: ABC_124@$';
            },
            dropdown:function(opt){
                //console.log(opt);

                var elm = opt.elm;
                var textbox = elm;

                var nowItem;
                var dropDown;

                var table = api.table.data[opt.data.table];
                var cols =  opt.data.cols;

                if(table.ids[opt.data.defaultValue] != undefined){
                    textbox.addClass('done');
                    textbox.val(table.ids[opt.data.defaultValue]);
                    textbox.data({
                        val:{
                            id:opt.data.defaultValue,
                            value:table.ids[opt.data.defaultValue]
                        }
                    });
                }else{
                    textbox.addClass('done');
                    textbox.val(table.rows[0][table.index[cols.value]]);
                    textbox.data({
                        val:{
                            id:table.rows[0][table.index[cols.id]],
                            value:table.rows[0][table.index[cols.value]]
                        }
                    });
                }

                if(opt.data.fn){
                    opt.data.fn({
                        elm:textbox,
                        val:textbox.data('val')
                    });
                }

                $(elm).keyup(function(ev){
                    if(ev.keyCode == 13) {
                    }else if(ev.keyCode == 40) {
                        var bool = true;
                        var item = nowItem;
                        while (bool) {
                            if (item.next().length != 0) {
                                item = item.next();
                                if (item.css('display') == 'none') {

                                } else {
                                    bool = false;
                                    nowItem.removeClass('sel');
                                    nowItem = item;
                                    nowItem.addClass('sel');
                                }
                            }else{
                                bool = false;
                            }
                        }
                    }else if(ev.keyCode == 38) {
                        var bool = true;
                        var item = nowItem;
                        while (bool) {
                            if (item.prev().length != 0) {
                                item = item.prev();
                                if (item.css('display') == 'none') {

                                } else {
                                    bool = false;
                                    nowItem.removeClass('sel');
                                    nowItem = item;
                                    nowItem.addClass('sel');
                                }
                            }else{
                                bool = false;
                            }
                        }
                    } else{
                        var str = textbox.val().toUpperCase();
                        var totel = 0;
                        var first;
                        var bestMatch = false;
                        for(var i = 0;i < arr.length;i++){
                            var item = arr[i];
                            var val = item.val.value.toUpperCase();
                            //console.log(item.val.value,item.val.value.toUpperCase().indexOf(str));

                            if(val.indexOf(str) != -1){
                                totel++;
                                item.elm.css('display','');
                                if(first == null){
                                    first = item.elm;
                                }
                                //console.log(item.val.value.toUpperCase().indexOf(str));
                            }else{
                                //console.log(item);
                                item.elm.css('display','none');
                            }

                            if(val == str){
                                bestMatch = true;
                                item.elm.click();
                                first = null;
                                i = arr.length+1;
                            }
                        }
                        if(first != null){
                            console.log('first != null');
                            if(str == ''){
                                textbox.addClass('error');
                                textbox.removeClass('done');
                            }else{
                                nowItem.removeClass('sel');
                                nowItem = first;
                                nowItem.addClass('sel');
                                textbox.addClass('error');
                            }
                        }else if(bestMatch == true){
                            dropDown.find('.item').css('display','');
                            textbox.removeClass('error');
                            textbox.addClass('done');
                            console.log('bestMatch');
                        }else{
                            dropDown.find('.item').css('display','');
                            textbox.addClass('error');
                            textbox.removeClass('done');
                        }

                    }
                });

                var focus = true;
                $(elm).focusin(function(){
                    focus = true;
                    if(dropDown == null){
                        show();
                    }
                });
                $(elm).focusout(function(){
                    focus = false;
                });
                $(elm).keydown(function(ev){
                    if(ev.keyCode == 13){
                        nowItem.click();
                        dropDown.remove();
                        dropDown = null;
                    }else if(ev.keyCode == 9){
                        dropDown.remove();
                        dropDown = null;
                    }
                });

                var arr = [];
                function show(){
                    nowItem = null;
                    arr = [];
                    var pos = elm.offset();
                    pos.left += elm.outerWidth()+5;
                    $('body').tags({
                        '.formDropDown':{
                            $each:function(elm){
                                dropDown = elm = $(elm);
                                dropDown.keydown(function(e){
                                    $(textbox).keydown(e);
                                });
                                dropDown.keyup(function(e){
                                    $(textbox).keyup(e);
                                });
                                dropDown.downOut(function(){
                                    setTimeout(function(){
                                        console.log('dropDown',dropDown,focus);
                                        if(focus == false){
                                            dropDown.remove();
                                            dropDown = null;
                                        }
                                    },10);
                                });
                                elm = elm.css(pos);
                                var pan = elm.scrollPan();

                                pan.div.tags({
                                    '.item':{
                                        $repeat:table.rows.length,
                                        $each:function(elm,index){
                                            var fn = true;
                                            if(opt.data.onItem != undefined){
                                                fn = opt.data.onItem(table.rows[index]);
                                            }
                                            if(fn != false){
                                                var val = {
                                                    id:table.rows[index][table.index[cols.id]],
                                                    value:table.rows[index][table.index[cols.value]]
                                                };
                                                arr.push({
                                                    elm:$(elm),
                                                    val:val
                                                });
                                                elm = $(elm);
                                                elm.text(table.rows[index][table.index[cols.id]] +' . '+ table.rows[index][table.index[cols.value]]);

                                                elm.data({
                                                    val:val
                                                });
                                                elm.click(function(){
                                                    if(nowItem != null){
                                                        nowItem.removeClass('sel');
                                                    }
                                                    nowItem = $(this);
                                                    nowItem.addClass('sel');
                                                    textbox.val(nowItem.data('val').value);
                                                    textbox.data({
                                                        val:nowItem.data('val')
                                                    });
                                                    textbox.removeClass('error');
                                                    textbox.addClass('done');
                                                    textbox.focus();
                                                    //console.log(opt.data.fn);
                                                    if(opt.data.fn){
                                                        opt.data.fn({
                                                            elm:textbox,
                                                            val:nowItem.data('val')
                                                        });
                                                    }
                                                });


                                                if(nowItem == null){
                                                    nowItem = elm;
                                                }

                                                if(textbox.val() ==  val.value){
                                                    nowItem = elm;
                                                }
                                            }else{
                                                $(elm).remove();
                                            }
                                        }
                                    }
                                });
                                if(nowItem != null){
                                    nowItem.click();
                                }
                            }
                        }
                    });
                }
            }
        },
        build:function(opt){
            var $this;
            if(opt.hides == undefined){
                opt.hides = {};
            }
            if(opt.combo == undefined){
                opt.combo = {};
            }

            function chekForm(){
                boxes.isClear = true;
                for(var item in boxes.fn) {
                    var isTrue = boxes.fn[item]();
                    boxes.isTrue[item] = isTrue;
                    //console.log(isTrue, item);
                    if (false == isTrue) {
                        boxes.isClear = false;
                    }
                }
            }
            var boxes = {
                val:{

                },input:{

                },isTrue:{

                },fn:{

                },isClear:false
            };
            if(opt.init){
                opt.init(boxes);
            }
            opt.div.tags({
                '.text':{
                    $text:'CREATE NEW CONTACTS . .'
                },'.body':{
                    $after:function(elm){
                        $this = $(elm);
                    },
                }
                ,'.btm':{
                    '.box':{
                        '.btn':{
                            $repeat:opt.btn.length,
                            $each:function(elm,index){
                                $(elm).text(opt.btn[index].name);
                                $(elm).bind('click',boxes,function(e){
                                    chekForm();
                                    opt.btn[index].fn(e,boxes);
                                });
                            }
                        },
                    }
                }
            });
            var  pan = $this.scrollPan();
            var table = opt.table;
            //console.log(table.cols);
            pan.div.tags({
                '.box':{
                    $repeat:table.cols.length,
                    $each:function(elm,index){
                        var name = table.cols[index][0];
                        var type = table.cols[index][1];
                        if(name == 'id' || opt.hides[name] == true){
                            return false;
                        }
                        var form = $(elm).tags({
                            'input.input':{
                                $each:function(elm,index,obj){
                                    $(elm).focusin(function(){
                                        chekForm();
                                    });
                                    boxes.input[name] = $(elm);
                                    if(opt.combo[name] == undefined && api.form.validation[type]){
                                        $(elm).keyup(function(ev){
                                            //console.log(ev.keyCode);
                                            if(ev.keyCode == 13 || ev.keyCode == 40) {
                                                $(this).parent().next().find('input').focus();
                                            } if(ev.keyCode == 38) {
                                                $(this).parent().prev().find('input').focus();
                                            }
                                        });
                                        var hint = api.form.validation[type]({
                                            elm:$(elm)
                                        });
                                        $(elm).attr({
                                            placeholder:hint
                                        });
                                        if(name == 'date'){
                                            boxes.fn[name] = function(){
                                                var val = $(elm).val();
                                                var str = val.split('-');
                                                val = str[2]+'-'+str[1]+'-'+str[0];
                                                boxes.val[name] = val;
                                                if(val != ''){
                                                    return true;
                                                }
                                                return false;
                                            }
                                        }else{
                                            boxes.fn[name] = function(){
                                                var val = $(elm).val();
                                                boxes.val[name] = val;
                                                if(val != ''){
                                                    return true;
                                                }
                                                return false;
                                            }
                                        }

                                    }else{
                                        $(elm).keyup(function(ev){
                                            //console.log(ev.keyCode);
                                            if(ev.keyCode == 13) {
                                                $(this).parent().next().find('input').focus();
                                            }
                                        });
                                        var hint = api.form.validation.dropdown({
                                            elm:$(elm),
                                            data:opt.combo[name]
                                        });
                                        $(elm).attr({
                                            placeholder:'Select..'
                                        });
                                        $(obj.$parent.$element).tags({
                                            '.arrow':{
                                                $text:'unfold_more',
                                                $attr:{
                                                    class:'arrow material-icons'
                                                }
                                            }
                                        });
                                        boxes.fn[name] = function(){
                                            var val = $(elm).val();
                                            var $val = $(elm).data('val');
                                            if(val != ''){
                                                if($val.value == val){
                                                    boxes.val[name] = $val.id+'';
                                                    return true;
                                                }
                                            }
                                            return false;
                                        }
                                    }
                                    boxes.val[name] = null;
                                }},
                            '.text':{
                                $text:(table.cols[index][0])
                            },
                        });


                    }
                }
            });
            return boxes;
        }
    },
    mysql:{
        decodeDate:function(inputDate){
            var str = inputDate.split('-');
            return str[2]+'-'+str[1]+'-'+str[0];
            return str;
        },
        encodeDate:function(inputDate){
            var str = inputDate.split('-');
            return str[2]+'/'+str[1]+'/'+str[0];
            return str;
        },dataObj:function(data,no){
            var obj = {};
            var fields = data.fields;
            for(var i = 0;i < fields.length;i++){
                obj[fields[i]] = data.data[fields[i]][no];
            }
            return obj;
        },setdataObj:function(data,no,form){
            var fields = data.fields;
            for(var i = 0;i < fields.length;i++){
                if(form[fields[i]] != undefined){
                    data.data[fields[i]][no] = form[fields[i]];
                    console.log(form[fields[i]]);
                }
            }
        }
    },
    div:{
        flipBoolData:function(elm,key){
            var boolVal = $(elm).data(key);
            if(boolVal == true){
                boolVal = false;
                $(elm).data(key,false);
            }else{
                boolVal = true;
                $(elm).data(key,true);
            }
            return boolVal;
        },
        toggleClass:function(elm,clasees){
            if($(elm).hasClass(clasees[0])){
                $(elm).addClass(clasees[1]);
                $(elm).removeClass(clasees[0]);
                return clasees[1];
            }else{
                $(elm).addClass(clasees[0]);
                $(elm).removeClass(clasees[1]);
                return clasees[0];
            }
        }
    }
};

//  copyright lexilogos.com

function transGUJ(elm) {
    var car;
    car = $(elm).val();

    car = car.replace(/a/g, "અ");
    car = car.replace(/[Aā]/g, "આ");
    car = car.replace(/i/g, "ઇ");
    car = car.replace(/[Iī]/g, "ઈ");
    car = car.replace(/u/g, "ઉ");
    car = car.replace(/[Uū]/g, "ઊ");
    car = car.replace(/અઅ/g, "આ");
    car = car.replace(/ઇઇ/g, "ઈ");
    car = car.replace(/ઉઉ/g, "ઊ");
    car = car.replace(/e/g, "એ");
    car = car.replace(/[Eē]/g, "ઍ");
    car = car.replace(/એએ/g, "ઍ");
    car = car.replace(/o/g, "ઓ");
    car = car.replace(/[Oō]/g, "ઑ");
    car = car.replace(/ઓઓ/g, "ઑ");
    car = car.replace(/અઇ/g, "ઐ");
    car = car.replace(/અઉ/g, "ઔ");


// suppression du virama
    car = car.replace(/્અ/g, "\u200b");
    car = car.replace(/\u200bઅ/g, "ા");
    car = car.replace(/\u200bઇ/g, "ૈ");
    car = car.replace(/\u200bઉ/g, "ૌ");
    car = car.replace(/્આ/g, "ા");
    car = car.replace(/્ઇ/g, "િ");
    car = car.replace(/્ઈ/g, "ી");
    car = car.replace(/્ઉ/g, "ુ");
    car = car.replace(/્ઊ/g, "ૂ");
    car = car.replace(/્ઍ/g, "ૅ");
    car = car.replace(/્ઑ/g, "ૉ");
    car = car.replace(/્ઋ/g, "ૃ");
    car = car.replace(/્ૠ/g, "ૄ");
    car = car.replace(/્ઌ/g, "ૢ");
    car = car.replace(/્ૡ/g, "ૣ ");
    car = car.replace(/્એ/g, "ે");
    car = car.replace(/્ઓ/g, "ો");
    car = car.replace(/ેએ/g, "ૅ");
    car = car.replace(/ોઓ/g, "ૉ");
    car = car.replace(/િઈ/g, "ી");
    car = car.replace(/ુઉ/g, "ૂ");
    car = car.replace(/િઇ/g, "ી");
    car = car.replace(/્ /g, " ");

//cons
    car = car.replace(/k/g, "ક્");
    car = car.replace(/g/g, "ગ્");
    car = car.replace(/c/g, "ચ્");
    car = car.replace(/j/g, "જ્");
    car = car.replace(/z/g, "ઝ્");
    car = car.replace(/[TṬṭ]/g, "ટ્");
    car = car.replace(/[DḌḍ]/g, "ડ્");
    car = car.replace(/[NṆṇ]/g, "ણ્");
    car = car.replace(/t/g, "ત્");
    car = car.replace(/d/g, "દ્");
    car = car.replace(/n/g, "ન્");
    car = car.replace(/p/g, "પ્");
    car = car.replace(/f/g, "ફ્");
    car = car.replace(/b/g, "બ્");
    car = car.replace(/m/g, "મ્");
    car = car.replace(/y/g, "ય્");
    car = car.replace(/r/g, "ર્");
    car = car.replace(/l/g, "લ્");
    car = car.replace(/[LḶḷ]/g, "ળ્");
    car = car.replace(/v/g, "વ્");
    car = car.replace(/w/g, "વ્");
    car = car.replace(/s/g, "સ્");
    car = car.replace(/h/g, "હ્");
    car = car.replace(/[SṢṣ]/g, "ષ્");

// cas particuliers
    car = car.replace(/[Gṅ]/g, "ઙ્");
    car = car.replace(/[Jñ]/g, "ઞ્");
    car = car.replace(/ન્ગ્/g, "ઙ્");
    car = car.replace(/ન્જ્/g, "ઞ્");

// aspirées
    car = car.replace(/ક્હ્/g, "ખ્");
    car = car.replace(/ગ્હ્/g, "ઘ્");
    car = car.replace(/ચ્હ્/g, "છ્");
    car = car.replace(/જ્હ્/g, "ઝ્");
    car = car.replace(/ટ્હ્/g, "ઠ્");
    car = car.replace(/ડ્હ્/g, "ઢ્");
    car = car.replace(/ત્હ્/g, "થ્");
    car = car.replace(/દ્હ્/g, "ધ્");
    car = car.replace(/પ્હ્/g, "ફ્");
    car = car.replace(/બ્હ્/g, "ભ્");

// cas du s barre
    car = car.replace(/સ્હ્/g, "શ્");
    car = car.replace(/[çś]/g, "શ્");

// cas du ri li
    car = car.replace(/્-ર્/g, "ૃ");
    car = car.replace(/-ર્/g, "ઋ");
    car = car.replace(/ઋઇ/g, "ૠ");
    car = car.replace(/ૃઇ/g, "ૄ");

    car = car.replace(/્-લ્/g, "ૢ");
    car = car.replace(/-લ્/g, "ઌ");
    car = car.replace(/ઌઇ/g, "ૡ");
    car = car.replace(/ૢઇ/g, "ૣ");

//suppression du zero
    car = car.replace(/\u200bક/g, "ક");
    car = car.replace(/\u200bખ/g, "ખ");
    car = car.replace(/\u200bગ/g, "ગ");
    car = car.replace(/\u200bઘ/g, "ઘ");
    car = car.replace(/\u200bઙ/g, "ઙ");
    car = car.replace(/\u200bચ/g, "ચ");
    car = car.replace(/\u200bછ/g, "છ");
    car = car.replace(/\u200bજ/g, "જ");
    car = car.replace(/\u200bઝ/g, "ઝ");
    car = car.replace(/\u200bઞ/g, "ઞ");
    car = car.replace(/\u200bટ/g, "ટ");
    car = car.replace(/\u200bઠ/g, "ઠ");
    car = car.replace(/\u200bડ/g, "ડ");
    car = car.replace(/\u200bઢ/g, "ઢ");
    car = car.replace(/\u200bણ/g, "ણ");
    car = car.replace(/\u200bત/g, "ત");
    car = car.replace(/\u200bથ/g, "થ");
    car = car.replace(/\u200bદ/g, "દ");
    car = car.replace(/\u200bધ/g, "ધ");
    car = car.replace(/\u200bન/g, "ન");
    car = car.replace(/\u200bપ/g, "પ");
    car = car.replace(/\u200bફ/g, "ફ");
    car = car.replace(/\u200bબ/g, "બ");
    car = car.replace(/\u200bભ/g, "ભ");
    car = car.replace(/\u200bમ/g, "મ");
    car = car.replace(/\u200bય/g, "ય");
    car = car.replace(/\u200bર/g, "ર");
    car = car.replace(/\u200bલ/g, "લ");
    car = car.replace(/\u200bળ/g, "ળ");
    car = car.replace(/\u200bહ/g, "હ");
    car = car.replace(/\u200bશ/g, "શ");
    car = car.replace(/\u200bષ/g, "ષ");
    car = car.replace(/\u200bસ/g, "સ");
    car = car.replace(/\u200b /g, " ");
    car = car.replace(/\u200b\ં/g, "ં");
    car = car.replace(/\u200b\ઃ/g, "ઃ");

// virama permanent
    car = car.replace(/=/g, "\u200c");
// car = car.replace(/્્\u200c/g, "્\u200c");

// anusvara
    car = car.replace(/[Mṁ]/g, "ં");
    car = car.replace(/્ં/g, "ં");
// candrabindu
    car = car.replace(/ંં/g, "ઁ");

// visarga
    car = car.replace(/[HḤḥ]/g, "ઃ");
    car = car.replace(/્ઃ/g, "ઃ");

// avagraha
    car = car.replace(/\'/g, "ઽ");
    car = car.replace(/’/g, "ઽ");

//OM
    car = car.replace(/W/g, "ૐ");

// ponctuation
    car = car.replace(/\|/g, "।");
    car = car.replace(/\//g, "।");
    car = car.replace(/।।/g, "॥");

    car = car.replace(/0/g, "૦");
    car = car.replace(/1/g, "૧");
    car = car.replace(/2/g, "૨");
    car = car.replace(/3/g, "૩");
    car = car.replace(/4/g, "૪");
    car = car.replace(/5/g, "૫");
    car = car.replace(/6/g, "૬");
    car = car.replace(/7/g, "૭");
    car = car.replace(/8/g, "૮");
    car = car.replace(/9/g, "૯");
    $(elm).val(car);
}
function transHID(elm) {
    var car;
    car = $(elm).val();
    car = car.replace(/&/g, "्");
    car = car.replace(/््/g, "");

    car = car.replace(/a/g, "अ");
    car = car.replace(/[Aā]/g, "आ");
    car = car.replace(/i/g, "इ");
    car = car.replace(/[Iī]/g, "ई");
    car = car.replace(/u/g, "उ");
    car = car.replace(/[Uū]/g, "ऊ");
    car = car.replace(/अअ/g, "आ");
    car = car.replace(/इइ/g, "ई");
    car = car.replace(/उउ/g, "ऊ");
    car = car.replace(/e/g, "ए");
    car = car.replace(/o/g, "ओ");
    car = car.replace(/अइ/g, "ऐ");
    car = car.replace(/अउ/g, "औ");


// suppression du virama
    car = car.replace(/िइ/g, "ी");
    car = car.replace(/ुउ/g, "ू");
    car = car.replace(/्अ/g, "\u200b");
    car = car.replace(/\u200bअ/g, "ा");
    car = car.replace(/\u200bइ/g, "ै");
    car = car.replace(/\u200bउ/g, "ौ");
    car = car.replace(/्आ/g, "ा");
    car = car.replace(/्इ/g, "ि");
    car = car.replace(/्ई/g, "ी");
    car = car.replace(/्उ/g, "ु");
    car = car.replace(/्ऊ/g, "ू");
    car = car.replace(/्ऋ/g, "ृ");
    car = car.replace(/्ॠ/g, "ॄ");
    car = car.replace(/्ऌ/g, "ॢ");
    car = car.replace(/्ॡ/g, "ॣ");
    car = car.replace(/्ए/g, "े");
    car = car.replace(/्ओ/g, "ो");
    car = car.replace(/् /g, " ");

//cons
    car = car.replace(/n/g, "न्");
    car = car.replace(/k/g, "क्");
    car = car.replace(/g/g, "ग्");
    car = car.replace(/c/g, "च्");
    car = car.replace(/j/g, "ज्");
    car = car.replace(/[TṭṬ]/g, "ट्");
    car = car.replace(/[DḍḌ]/g, "ड्");
    car = car.replace(/[NṇṆ]/g, "ण्");
    car = car.replace(/t/g, "त्");
    car = car.replace(/d/g, "द्");
    car = car.replace(/p/g, "प्");
    car = car.replace(/b/g, "ब्");
    car = car.replace(/m/g, "म्");
    car = car.replace(/q/g, "क़्");
    car = car.replace(/Q/g, "क़्");
    car = car.replace(/क़्/g, "क़्");
    car = car.replace(/[xX]/g, "ख़्");
    car = car.replace(/ख़्/g, "ख़्");
    car = car.replace(/Y/g, "ग़्");
    car = car.replace(/ग़्/g, "ग़्");
    car = car.replace(/[zZ]/g, "ज़्");
    car = car.replace(/ज़्/g, "ज़्");
    car = car.replace(/[fF]/g, "फ़्");
    car = car.replace(/फ़्/g, "फ़्");
    car = car.replace(/R/g, "ड़्");
    car = car.replace(/ड़्/g, "ड़्");
    car = car.replace(/y/g, "य्");
    car = car.replace(/r/g, "र्");
    car = car.replace(/ऱ्/g, "ऱ्");
    car = car.replace(/l/g, "ल्");
    car = car.replace(/L/g, "ळ्");
    car = car.replace(/ऴ्/g, "ऴ्");
    car = car.replace(/v/g, "व्");
    car = car.replace(/w/g, "व्");
    car = car.replace(/h/g, "ह्");
    car = car.replace(/[SṣṢ]/g, "ष्");
    car = car.replace(/s/g, "स्");
// cas particuliers
    car = car.replace(/G/g, "ङ्");
    car = car.replace(/J/g, "ञ्");
    car = car.replace(/ñ/g, "ञ्");
    car = car.replace(/न्ग्/g, "ङ्");
    car = car.replace(/न्ज्/g, "ञ्");

// aspirées
    car = car.replace(/क्ह्/g, "ख्");
    car = car.replace(/ग्ह्/g, "घ्");
    car = car.replace(/च्ह्/g, "छ्");
    car = car.replace(/ज्ह्/g, "झ्");
    car = car.replace(/ट्ह्/g, "ठ्");
    car = car.replace(/ड्ह्/g, "ढ्");
    car = car.replace(/त्ह्/g, "थ्");
    car = car.replace(/द्ह्/g, "ध्");
    car = car.replace(/त्ह्/g, "थ्");
    car = car.replace(/द्ह्/g, "ध्");
    car = car.replace(/प्ह्/g, "फ्");
    car = car.replace(/ब्ह्/g, "भ्");
    car = car.replace(/ड़्ह्/g, "ढ़्");

    car = car.replace(/ढ़्/g, "ढ़्");

// cas du s barre
    car = car.replace(/स्ह्/g, "श्");
    car = car.replace(/[çśŚ]/g, "श्");

// cas du ri li
    car = car.replace(/्-र्/g, "ृ");
    car = car.replace(/-र्/g, "ऋ");
    car = car.replace(/ऋइ/g, "ॠ");
    car = car.replace(/ृइ/g, "ॄ");

    car = car.replace(/्-ल्/g, "ॢ");
    car = car.replace(/-ल्/g, "ऌ");
    car = car.replace(/ऌइ/g, "ॡ");
    car = car.replace(/ॢइ/g, "ॣ");

//suppression du zero
    car = car.replace(/\u200bक/g, "क");
    car = car.replace(/\u200bख/g, "ख");
    car = car.replace(/\u200bग/g, "ग");
    car = car.replace(/\u200bघ/g, "घ");
    car = car.replace(/\u200bङ/g, "ङ");
    car = car.replace(/\u200bच/g, "च");
    car = car.replace(/\u200bछ/g, "छ");
    car = car.replace(/\u200bज/g, "ज");
    car = car.replace(/\u200bझ/g, "झ");
    car = car.replace(/\u200bञ/g, "ञ");
    car = car.replace(/\u200bट/g, "ट");
    car = car.replace(/\u200bठ/g, "ठ");
    car = car.replace(/\u200bड/g, "ड");
    car = car.replace(/\u200bढ/g, "ढ");
    car = car.replace(/\u200bण/g, "ण");
    car = car.replace(/\u200bत/g, "त");
    car = car.replace(/\u200bथ/g, "थ");
    car = car.replace(/\u200bद/g, "द");
    car = car.replace(/\u200bध/g, "ध");
    car = car.replace(/\u200bन/g, "न");
    car = car.replace(/\u200bप/g, "प");
    car = car.replace(/\u200bफ/g, "फ");
    car = car.replace(/\u200bब/g, "ब");
    car = car.replace(/\u200bभ/g, "भ");
    car = car.replace(/\u200bम/g, "म");
    car = car.replace(/\u200bक़/g, "क़");
    car = car.replace(/\u200bख़/g, "ख़");
    car = car.replace(/\u200bग़/g, "ग़");
    car = car.replace(/\u200bज़/g, "ज़");
    car = car.replace(/\u200bड़/g, "ड़");
    car = car.replace(/\u200bढ़/g, "ढ़");
    car = car.replace(/\u200bफ़/g, "फ़");
    car = car.replace(/\u200bय/g, "य");
    car = car.replace(/\u200bर/g, "र");
    car = car.replace(/\u200bल/g, "ल");
    car = car.replace(/\u200bळ/g, "ळ");
    car = car.replace(/\u200bव/g, "व");
    car = car.replace(/\u200bह/g, "ह");
    car = car.replace(/\u200bश/g, "श");
    car = car.replace(/\u200bष/g, "ष");
    car = car.replace(/\u200bस/g, "स");
    car = car.replace(/\u200b /g, " ");
    car = car.replace(/\u200b\ं/g, "ं");
    car = car.replace(/\u200b\ः/g, "ः");

// anusvara
    car = car.replace(/M/g, "ं");
    car = car.replace(/्ं/g, "ं");
// candrabindu
    car = car.replace(/ंं/g, "ँ");
//OM
    car = car.replace(/O/g, "ॐ");
    car = car.replace(/ॐं/g, "ॐ");
// visarga
    car = car.replace(/H/g, "ः");
    car = car.replace(/्ः/g, "ः");

// nukta
    car = car.replace(/=/g, "़");


// alternative : car = car.replace(/:/g, "ः");
// avagraha
    car = car.replace(/\'/g, "ऽ");
    car = car.replace(/’/g, "ऽ");


// ponctuation

    car = car.replace(/\|/g, "।");
    car = car.replace(/\//g, "।");
    car = car.replace(/।।/g, "॥");

    car = car.replace(/0/g, "०");
    car = car.replace(/1/g, "१");
    car = car.replace(/2/g, "२");
    car = car.replace(/3/g, "३");
    car = car.replace(/4/g, "४");
    car = car.replace(/5/g, "५");
    car = car.replace(/6/g, "६");
    car = car.replace(/7/g, "७");
    car = car.replace(/8/g, "८");
    car = car.replace(/9/g, "९");
    $(elm).val(car);
}

(function(){
    var isDown = api.key.isDown;
    $(window).keyup(function(e){
        switch (e.keyCode){
            case 16:
                $(window).trigger('backspace',[e]);
                isDown.shiftKey = false;
                break;
        }
    });

    $(window).keydown(function(e){
        e.shiftKey = isDown.shiftKey;
        //console.log(e);
        if(e.ctrlKey == true){
                if(e.keyCode == 83){
                    console.log('ctrl+s');
                    $(window).trigger('ctrl+s',[e]);
                    return false;
                }else if(e.keyCode == 90){
                    console.log('ctrl+z');
                    $(window).trigger('ctrl+z',[e]);
                    return false;
                }else if(e.keyCode == 89){
                    console.log('ctrl+y');
                    $(window).trigger('ctrl+y',[e]);
                    return false;
                }
            }
        switch (e.keyCode){
            case 40:
                $(window).trigger('arrowDown',[e]);
                break;
            case 38:
                $(window).trigger('arrowUp',[e]);
                break;
            case 37:
                $(window).trigger('arrowLeft',[e]);
                break;
            case 39:
                $(window).trigger('arrowRight',[e]);
                break;
            case 13:
                $(window).trigger('enter',[e]);
                break;
            case 9:
                $(window).trigger('tab',[e]);
                break;
            case 8:
                $(window).trigger('backspace',[e]);
                //return false;
                break;
            case 16:
                isDown.shiftKey = true;
                $(window).trigger('backspace',[e]);
                break;
        }
        //return false;
    });

    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    jQuery.fn.cssNumber = function(prop){
        var v = parseInt(this.css(prop),10);
        return isNaN(v) ? 0 : v;
    };



    var timeOut = null;
    var doneFn = function(){
        clearTimeout(timeOut);
        $(window).trigger('doneResize');
        timeOut = null;
        clearTimeout(timeOut);
    };
    $(window).resize(function(){
        if(timeOut != null){

        }else{
            timeOut = setTimeout(doneFn,30);
        }
    });

    //console.log('jQuery.fn.bound',jQuery.fn.bound);
    jQuery.fn.bound = function(fn){
        var offset = $(this).offset();
        offset.right = offset.left + $(this).outerWidth();
        offset.bottom = offset.top + $(this).outerHeight();
        return offset;
    }

    jQuery.fn.sliptSlider = function(fn){
        var DownX = 0;
        var DownY = 0;

        var first = fn.first;
        var whfirst = $(first).width();
        var second = fn.second;
        var whsecond = $(second).width();

        var move = function(e){

            var dist = DownX - e.clientX;
            $(first).css({
                width:whfirst - dist
            });
            $(second).css({
                width:whsecond + dist
            });
            //console.log(DownY - e.clientY);

        }

        $(this).mousedown(function(e){
            whfirst = $(first).width();
            whsecond = $(second).width();
            DownX = e.clientX;
            DownY = e.clientY;
            $(window).mousemove(move);
        });
        $(window).mouseup(function(){
            $(window).unbind('mousemove',move);
        });
        console.log('sliptSlider',fn);
    }

    jQuery.fn.setCaret = function(){
        var el = $(this).get(0);
        var range = document.createRange();
        var sel = window.getSelection();
        sel.removeAllRanges();
        if(el != undefined){
            range.selectNodeContents(el);
            if(el.childNodes[0] != undefined){
                range.setEnd(el.childNodes[0],$(el).text().length);
            }
            sel.addRange(range);
        }
    }

    jQuery.fn.setCaretAtEnd = function(){
        var el = $(this).get(0);
        var range = document.createRange();
        var sel = window.getSelection();
        sel.removeAllRanges();
        if(el != undefined){
            range.selectNodeContents(el);
            if(el.childNodes[0] != undefined){
                range.setStart(el.childNodes[0],$(el).text().length);
                range.setEnd(el.childNodes[0],$(el).text().length);
            }
            sel.addRange(range);
        }
    }

    jQuery.fn.csscolorInput = function($input){
        var $this = $(this);
        var $combo = function(elm){
            $(elm).optionCombo({
                ref:{
                    list:{
                        'transparent':'',
                        '#999':'',
                        'rgba(150,150,150,1)':'',
                        'rgb(150,150,150)':''
                    }
                },
                $:{
                    element:elm
                },
                change:function(val){
                    $($this).text(val);
                    $input.fn($this.text());
                    refreash();
                }
            });
        };



        function refreash(){
            var text = $this.text();
            $this.text('');
            if(text.startsWith('rgb')){
                var from = 4;
                var strtStr = 'rgb(';
                if(text.startsWith('rgba')){
                    from = 5;
                    strtStr = 'rgba(';
                }
                var str = text.substr(from,text.length-from-1).split(',');
                console.log(str);
                $this.tags({
                    'span.start':{
                        $:{
                            text:strtStr
                        }
                    },
                    'span.num':{
                        $:{
                            repeat:str.length,
                            each:function(elm,no){
                                $(elm).text(str[no]);
                                if(no != 0){
                                    $(elm).before('<span>,</span>');
                                }
                                $(elm).textInput({
                                    $:{
                                        isNumber:true,
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },'span.end':{
                        $:{
                            text:')'
                        }
                    },'span.combo.icon-arrow-combo':{
                        $:{
                            each:$combo
                        }
                    }
                });
            }else{
                $this.tags({
                    'span.num':{
                        $:{
                            text:text,
                            each:function(elm){
                                $(elm).textInput({
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        if(val == ''){
                                            val = 'transparent';
                                        }
                                        $($this).text(val);
                                        $input.fn($this.text());
                                        refreash();
                                    }
                                });
                            }
                        }
                    },'span.combo.icon-arrow-combo':{
                        $:{
                            each:$combo
                        }
                    }
                });
            }
        }
        refreash();
    }

    jQuery.fn.cssInput = function($input){
        var $this = $(this);
        function refreash(){
            var text = $this.text();
            $this.text('');
            if(text.startsWith('#')){
                $this.tags({
                    'span.num':{
                        $:{
                            text:text,
                            each:function(elm){
                                $(elm).textInput({
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    }
                });
            }else if(text.startsWith('calc')){
                var strs = text.substr(5,text.length-6).split(' ');
                var lval = parseInt(strs[0])+'';
                var rval = parseInt(strs[2])+'';
                $this.tags({
                    'span.start':{
                        $:{
                            text:'calc('
                        }
                    },'span.left':{
                        $:{
                            text:lval,
                            each:function(elm){
                                $(elm).textInput({
                                    $:{
                                        isNumber:true,
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },'span.left.type':{
                        $:{
                            text:strs[0].substr(lval.length),
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:{
                                            'px':'',
                                            '%':'',
                                            'ms':'',
                                            's':''
                                        }
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },
                    'span.oprator':{
                        $:{
                            text:' '+strs[1]+' '
                        }
                    },
                    'span.right':{
                        $:{
                            text:rval,
                            each:function(elm){
                                $(elm).textInput({
                                    $:{
                                        isNumber:true,
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },
                    'span.right.type':{
                        $:{
                            text:strs[2].substr(rval.length),
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:{
                                            'px':'',
                                            '%':'',
                                            'ms':'',
                                            's':''
                                        }
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },
                    'span.end':{
                        $:{
                            text:')'
                        }
                    },
                    'span.combo.icon-arrow-combo':{
                        $:{
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:$input.list
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $this.text(val);
                                        $input.fn($this.text());
                                        refreash();
                                    }
                                });
                            }
                        }
                    }
                });
            }
            else if(isNaN(parseInt(text)+'') == false){
                var num = parseInt(text)+'';
                $this.tags({
                    'span.num':{
                        $:{
                            text:num,
                            each:function(elm){
                                $(elm).textInput({
                                    $:{
                                        isNumber:true,
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },'span.type':{
                        $:{
                            text:text.substr(num.length),
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:{
                                            'px':'',
                                            '%':'',
                                            'ms':'',
                                            's':''
                                        }
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },'span.combo.icon-arrow-combo':{
                        $:{
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:$input.list
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $this.text(val);
                                        $input.fn($this.text());
                                        refreash();
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                $this.tags({
                    'span.type':{
                        $:{
                            text:text,
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:$input.list
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $this.text(val);
                                        $input.fn($this.text());
                                        refreash();
                                    }
                                });
                            }
                        }
                    },'span.combo.icon-arrow-combo':{
                        $:{
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:$input.list
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){

                                        $this.text(val);
                                        $input.fn($this.text());
                                        refreash();
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
        refreash();
    }

    jQuery.fn.cssborderInput = function($input){
        var $this = $(this);
        function refreash(){
            var text = $this.text();
            $this.text('');
            var str = text.split(' ');
            var num = parseInt(str[0])+'';
            var $elm = $this.tags({
                'span.num':{
                        $:{
                            text:num,
                            each:function(elm){
                                $(elm).textInput({
                                    $:{
                                        isNumber:true,
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },
                'span.type':{
                        $:{
                            text:str[0].substr(num.length),
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:{
                                            'px':'',
                                            '%':'',
                                            'ms':'',
                                            's':''
                                        }
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },
                'span.one':{
                        $:{
                            text:' '
                        }
                    },
                'span.border.type':{
                        $:{
                            text:str[1],
                            each:function(elm){
                                $(elm).optionCombo({
                                    ref:{
                                        list:{
                                            'none':'',
                                            'hidden':'',
                                            'dotted':'',
                                            'dashed':'',
                                            'solid':'',
                                            'double':'',
                                            'groove':'',
                                            'ridge':'',
                                            'inset':'',
                                            'outset':'',
                                            'initial':'',
                                            'inherit':''
                                        }
                                    },
                                    $:{
                                        element:elm
                                    },
                                    change:function(val){
                                        $(elm).text(val);
                                        $input.fn($this.text());
                                    }
                                });
                            }
                        }
                    },
                'span.two':{
                        $:{
                            text:' '
                        }
                    },
                'span.color':{
                    $:{
                        text:str[2] || '#fff',
                        each:function(elm){
                            $(elm).textInput({
                                $:{
                                    element:elm
                                },
                                change:function(val){
                                    $(elm).text(val);
                                    $input.fn($this.text());
                                }
                            });
                        }
                    }
               },'span.combo.icon-arrow-combo':{
                    $:{
                        each:function(elm){
                            $(elm).optionCombo({
                                ref:{
                                    list:{
                                        'transparent':'',
                                        '#fff':'',
                                        '#000':'',
                                        '#ccc':'',
                                        '#999':'',
                                        '#666':'',
                                        '#333':''
                                    }
                                },
                                $:{
                                    element:elm
                                },
                                change:function(val){
                                    console.log($elm);
                                    $($elm.color.$element).text(val);
                                    //$input.fn($this.text());
                                    refreash();
                                }
                            });
                        }
                    }
                }
            });
        }
        refreash();
    }

    var textInputElement;
    jQuery.fn.textInput = function(obj){
        var $this = $(this);
        var moved  = false;
        var $$ = obj.$;
        var val = '';
        var orgval = $(obj.$.element).text();
        var popupInput;
        var div;
        var keyBoard = false;

        this.open = popupInput = function(){
            done();
            var text = $(obj.$.element).text();
            div = $(document.body).tags({
                '.textInput':{
                    $:{
                        attr:{
                            contenteditable:'true'
                        },
                        text:text,
                        css:{
                            //background:$this.css('color')
                        },
                        event:{
                            keydown:function(e){
                              if(e.keyCode == 13){
                                  setText($(textInputElement).text());
                                  done();
                                  return false;
                              }
                            }
                        },
                        each:function(elm){
                            textInputElement = elm;
                            $(elm).downOut(function(){
                                if(keyBoard == false){
                                    $(elm).remove();
                                }
                            });
                            $(elm).mouseup(function(e){
                               if(e.button == 2){
                                    keyBoard = true;
                                    $(this).setCaretAtEnd();
                                    setTimeout(function(){
                                        new package.page.keyAbc(false).main(elm,function(){ keyBoard = false; console.log(keyBoard); return []},function(){ setText($(textInputElement).text()); done(); return []});
                                    },10);
                               }
                            });
                            setTimeout(function(){
                                syncPos();
                                $(elm).addClass('Active');
                                $(elm).focus();
                                $(elm).setCaret();
                            },1);
                        }
                    }
                }
            });
        }
        $this.tags({
            $:{
                event:{
                    mousedown:function(e){
                        done();
                        moved = false;
                        $(window).one({
                            'mouseup':function(){
                                if(moved == false){
                                    new popupInput();
                                }
                            }
                        });
                        if($$ != undefined){
                            if($$.isNumber == true){
                                return false;
                            }
                        }
                    }
                }
            }
        });

        $(this).drag({
            fraction:10,
            start:function(e,Dx,Dy){
                moved = true;
                if($$ != undefined){
                    val = $(obj.$.element).text();
                    if($$.isNumber == true){
                        val = parseInt(val);
                        if(isNaN(val) ||  val+'' == ''){
                            val = 0;
                        }
                    }
                }
            },move:function(e,Dx,Dy){
                moved = true;
                if($$.isNumber == true){
                    var nVal = val+(parseInt(Dx * 0.1));
                    if(isNaN(nVal) || nVal+'' == ''){
                        nVal = '0';
                    }
                    setText(nVal,'--');
                }
            }
        });

        function syncPos(){
            var pos = $(obj.$.element).offset();
            var width = $(obj.$.element).width();
            var height = $(obj.$.element).height();
            $(div.textInput.$element).tags({
                $:{
                    css:{
                        top:pos.top + (height / 2),
                        left:pos.left + + (width / 2),
                    }
                }
            })
        }

       function setText(nVal,data){
           if(nVal != 0 && nVal == ''){
               nVal = orgval;
           }
           $(obj.$.element).text(nVal+'');
           if(obj.change != undefined){
               obj.change(nVal);
           }
       }

       function done(nVal){
           if(textInputElement != undefined){
               $(textInputElement).remove();
               textInputElement = null;
           }
       }

    }
    jQuery.fn.editText = function(obj){
        var $this = $(this);
        var moved  = false;
        var $$ = obj.$;
        var val = '';
        var orgVal = $(obj.$.element).text();
        var popupInput;
        var div;

        this.open = popupInput = function(){
            done();
            div = $(document.body).tags({
                '.textInput':{
                    $:{
                        attr:{
                            contenteditable:'true'
                        },
                        text:orgVal,
                        css:{
                            //background:$this.css('color')
                        },
                        event:{
                            keyup:function(e){
                              if(e.keyCode == 13){
                                  setText($(textInputElement).text());
                                  done();
                              }
                            }
                        },
                        each:function(elm){
                            textInputElement = elm;
                            $(elm).downOut(function(){
                                $(elm).remove();
                            });
                            setTimeout(function(){
                                syncPos();
                                $(elm).addClass('Active');
                                $(elm).focus();
                                $(elm).setCaret();
                            },1);
                        }
                    }
                }
            });
        }
        done();
        moved = false;
        if(moved == false){
            new popupInput();
        }

        $(this).drag({
            fraction:10,
            start:function(e,Dx,Dy){
                moved = true;
                if($$ != undefined){
                    val = $(obj.$.element).text();
                    //console.log(val);
                    if($$.isNumber == true){
                        val = parseInt(val);
                    }
                }
            },move:function(e,Dx,Dy){
                moved = true;
                if($$.isNumber == true){
                    var nVal = val+parseInt(Dx * 0.1);
                    setText(nVal);
                }
            }
        });

        function syncPos(){
            var pos = $($this).offset();
            var width = $($this).width();
            var height = $($this).height();
            $(div.textInput.$element).tags({
                $:{
                    css:{
                        top:pos.top + (height / 2),
                        left:pos.left + + (width / 2),
                    }
                }
            })
        }

       function setText(nVal){
           if(obj.change != undefined){
               obj.change(nVal);
           }
           $(obj.$.element).text(nVal);
       }

       function done(nVal){
           if(textInputElement != undefined){
               $(textInputElement).remove();
               textInputElement = null;
           }
       }

    }

    jQuery.fn.optionCombo = function(obj){
        var $this = $(this);
        var moved  = false;
        var $$ = obj.$;
        var val = '';
        var popupInput;
        var div;

        //console.log('obj',obj);

        this.open = popupInput = function(){
            done();
            div = $(document.body).tags({
                '.comboInput':{
                    $:{
                        scroll:true,
                        event:{
                            keyup:function(e){
                                if(e.keyCode == 13){
                                    //setText($(textInputElement).text());
                                    //done();
                                }
                            }
                        },
                        each:function(elm){
                            textInputElement = elm;
                            console.log(obj.ref);
                            var list = Object.keys(obj.ref.list);
                            $(elm).tags({
                                '.Item':{
                                    $:{
                                        repeat:list.length,
                                        each:function(elm,no){
                                            $(elm).text(list[no]);
                                        },
                                        event:{
                                            click:function(){
                                                setText($(this).text());
                                                done();
                                            }
                                        }
                                    }
                                }
                            });

                            $(elm).downOut(function(){
                                $(elm).remove();
                            });
                            setTimeout(function(){
                                syncPos();
                                $(elm).addClass('Active');
                            },1);
                        }
                    }
                }
            });
        }

        $this.tags({
            $:{
                event:{
                    mousedown:function(e){
                        done();
                        moved = false;
                        $(window).one({
                            'mouseup':function(){
                                if(moved == false){
                                    new popupInput();
                                }
                            }
                        });
                        if($$ != undefined){
                            if($$.isNumber == true){
                                return false;
                            }
                        }
                    }
                }
            }
        });

        $(this).drag({
            fraction:10,
            start:function(e,Dx,Dy){
                moved = true;
                if($$ != undefined){
                    val = $(obj.$.element).text();
                    //console.log(val);
                    if($$.isNumber == true){
                        val = parseInt(val);
                    }
                }
            },move:function(e,Dx,Dy){
                moved = true;
                if($$.isNumber == true){
                    var nVal = val+parseInt(Dx * 0.1);
                    setText(nVal);
                }
            }
        });


        function syncPos(){
            var pos = $(obj.$.element).offset();
            var width = $(obj.$.element).width();
            var height = $(obj.$.element).height();
            $(div.comboInput.$element).tags({
                $:{
                    css:{
                        top:pos.top + (height / 2),
                        left:pos.left + + (width / 2),
                    }
                }
            })
        }

        function setText(nVal){
            if(obj.change != undefined){
                obj.change(nVal);
            }
            $(obj.$.element).text(nVal);
        }

        function done(nVal){
            if(textInputElement != undefined){
                $(textInputElement).remove();
                textInputElement = null;
            }
        }

    }

    jQuery.fn.downOut = function(fn){
        var $elm = $(this);
        $elm.each(function(elm){
            var $this = $($elm[elm]);
            var hitThis = false;
            var Bind = function(){
                this.unbind = function(){
                    $(window).unbind('mousedown',winDown);
                    $this.unbind('mousedown',divDown);
                }
            };
            Bind = new Bind();
            function winDown(e){
                //console.log('target',e.target);
                if(!hitThis){
                    if($this.parent().length == 0){
                        Bind.unbind();
                        return;
                    }
                    if(fn != undefined){
                        if(fn(e.target,$this) == true){
                            Bind.unbind();
                        }
                    }
                }
                hitThis = false;
            }
            function divDown(){
                hitThis = true;
            }
            $(window).mousedown(winDown);
            $this.mousedown(divDown);
        });
    };

    jQuery.fn.SwitchBtn = function(num,arr,fn){
        var $this = $(this);
        var count = num;
        var setup = false;
        $this.click(function(){
            if(arr.length != 0){
                var remove;
                if(count == 0){
                    remove = arr.length-1;
                    $this.removeClass(arr[arr.length-1]);
                }else{
                    remove = count-1;
                    $this.removeClass(arr[count-1]);
                }
                $this.addClass(arr[count]);
                if(fn != null && !setup){
                    fn(arr,count,remove);
                }
                count++;
                if(count == arr.length){
                    count = 0;
                }
            }
            setup = false;
        });
    };

    jQuery.fn.DropForDrag = function(opt){
        var data;
        function can(){
            data = $(document.body).data('DragForDrop');
            //console.log(data);
            if(data != undefined && data.opt != undefined && data.opt.name == opt.name){
                return true;
            }
        }

        $(this).bind({
            mouseover:function(){
                if(can()){
                    if(data.opt.mouseover){
                        data.opt.mouseover(data.opt);
                    }
                    if(opt.mouseover){
                        opt.mouseover(data.opt);
                    }
                    if(opt.can != false && opt.isCan == undefined){
                        $(data.opt.div.Dragbody.$element).addClass('Yes');
                    }else if(opt.isCan(data.opt) != false){
                        $(data.opt.div.Dragbody.$element).addClass('Yes');
                    }
                }
            },mouseout:function(){
                if(can()){
                    if(data.opt.mouseout){
                        data.opt.mouseout(data.opt);
                    }
                    if(opt.mouseout){
                        opt.mouseout(data.opt);
                    }
                    $(data.opt.div.Dragbody.$element).removeClass('Yes');
                }
            },
            mousedown:function(){
                if(can()){
                   // data.opt.mouseover(data.opt);
                }
            },
            mouseup:function(e){
                if(can()){
                    if(data.opt.mouseup  != undefined){
                        data.opt.mouseup(data.opt);
                    }
                    if(data.opt.drop != undefined){
                        data.opt.drop(data.opt,e);
                    }
                    if(opt.mouseup  != undefined){
                        opt.mouseup(data.opt);
                    }
                    if(opt.drop != undefined){
                        opt.drop(data.opt,e);
                    }
                }
            },
            mousemove:function(){
                if(can()){
                    if(data.opt.mousemove){
                        data.opt.mousemove(data.opt);
                    }
                    if(opt.mousemove){
                        opt.mousemove(data.opt);
                    }
                }
            }
        });
    }

    jQuery.fn.scrollTopFrom = function(elm){

        var $pan;
        var $this = $(this);
        if(elm == null){
            $pan = $(this).parent();
        }
        $pan.scrollTop(0);
        var top = ($this.offset().top  - $pan.offset().top) - parseInt($(this).css('margin-top'));
        $pan.scrollTop(top);
    }

    jQuery.fn.DragForDrop = function(opt){
        var WinDiv;
        var dx = 0;
        var dy = 0;
        $(this).drag({
            fraction:10,
            start:function(e,Dx,Dy){
                //console.log(e,Dx,Dy);
                $(document.body).data('DragForDrop',{
                    opt:opt
                });
                dx = Dx;
                dy = Dy;
                WinDiv = opt.start(opt);
                setTimeout(function(){
                    $(WinDiv.Dragbody.$element).css({
                        opacity:1
                    });
                    opt.div = WinDiv;
                },10);
            },
            move:function(e){
                if(WinDiv != null){
                    $(WinDiv.Dragbody.$element).css({
                        top: e.pageY + 10,
                        left: e.pageX + 10
                    });
                }
            },
            end:function(e){
                $(WinDiv.Dragbody.$element).remove();
                $(document.body).data('DragForDrop',null);
            }
        });
    }

    var objectDraging = {};
    jQuery.fn.drop = function(opt){
        var has = false;
        var $this = $(this);
        var $leftclass = '';
        var $topclass = '';
        var obj;
        $(this).mouseup(function(e){
            if(has){
                has = false;
                $this.removeClass($leftclass);
                $this.removeClass($topclass);
                $this.removeClass('drop_in');
                var rval;
                if(opt.drop != undefined) {rval = opt.drop(e,$this[0])};
                if(obj.drop != undefined) {obj.drop(e,$this[0],rval)};
            }
        });

        $(this).mouseover(function(e){
            //console.log(e,objectDraging);
            if(opt.key != undefined){
                if(objectDraging[opt.key] != undefined){
                    obj = objectDraging[opt.key];
                    has = true;
                    $this.addClass('drop_in');
                    if(obj.hover != undefined) {obj.hover(e,$this[0])};
                    if(opt.hover != undefined) {opt.hover(e,$this[0])};
                }
            }
        });

        $(this).mouseout(function(e){
            if(has){
                has = false;
                $this.removeClass($leftclass);
                $this.removeClass($topclass);
                $this.removeClass('drop_in');
                if(obj.out != undefined) {obj.out(e)};
                if(opt.out != undefined) {opt.out(e)};
            }
        });

        var t = true;
        var l = true;
        $(this).mousemove(function(e){
            if(has){
                var wh = $this.outerWidth();
                var ht = $this.outerHeight();
                var x = e.pageX;
                var y = e.pageY;
                var pos = $this.offset();
                pos.left = x - pos.left;
                pos.top = y - pos.top;
                var topclass = '';
                var leftclass = '';

                if($leftclass == '' && $topclass == ''){
                    t = pos.left < wh/2;
                    l = pos.top < ht/2;
                }else{
                    ht = ht/3;
                    if(l == true && pos.top > ht*2){
                        l = false;
                    }else if(l == false && pos.top < ht){
                        l = true;
                    }

                    wh = wh/3;
                    if(t == true && pos.left > wh*2){
                        t = false;
                    }else if(t == false && pos.left < wh){
                        t = true;
                    }
                }


                if(l){
                    topclass = 'drop_top';
                }else{
                    topclass = 'drop_bottom';
                }
                if(t){
                    leftclass = 'drop_left';
                }else{
                    leftclass = 'drop_right';
                }


                if(obj.move != undefined) {obj.move(e,l,t,x,y)};
                if(opt.move != undefined) {opt.move(e,l,t,x,y)};
            }
        });
    }
    jQuery.fn.drag = function(opt){
        var $this = $(this);
        var fraction = 0;
        if(opt.fraction != undefined){
            fraction = opt.fraction;
        }
        $this.mousedown(function(e){
            var dwnX = e.pageX;
            var dwnY = e.pageY;
            if(opt.target != undefined){
                objectDraging[opt.target.key] = opt.target;
            }
            if(opt.down != null){
                //console.log(opt);
                var pos = $this.offset();
                if(opt.down(e,dwnX - pos.left,dwnY - pos.top) == false){
                    return;
                }
            }

            var start = false;
            var moveFn = function(e){
                if(!(dwnX+fraction > e.pageX && dwnX-fraction < e.pageX) || !(dwnY+fraction > e.pageY && dwnY-fraction < e.pageY)){
                    //dwnX = e.pageX;
                    //dwnY = e.pageY;
                    $(window).unbind('mousemove',moveFn);
                    var val;
                    if(opt.start != null){
                        start = true;
                        var pos = $this.offset();
                        val = opt.start(e,dwnX - pos.left,dwnY - pos.top,$this);
                        if(val == false){
                            stop();
                        }
                    }
                    if(opt.move != null && val != false){
                        //opt.move(e);
                        $(window).mousemove(moveOpt);
                    }
                }
                //opt.move(e);
            }
            $(window).mousemove(moveFn);

            var  moveOpt = function(e){
                if(opt.move(e,e.pageX - dwnX,e.pageY - dwnY) == false){
                    $(window).unbind('mousemove',moveOpt);
                    $(window).unbind('mousemove',moveFn);
                }
            }
            var end = function(e){
                if(opt.end != null){
                    opt.end(e);
                }
                if(opt.up != null){
                    opt.up(e);
                }
                //$this.unbind('mousedown',opt.down);
                stop();
                if(opt.target != undefined){
                    delete objectDraging[opt.target.key];
                }
            }

            var stop = function(){
                $(window).unbind('mousemove',moveOpt);
                $(window).unbind('mousemove',moveFn);
            }
            $(window).one('mouseup',end);
        });
    };


    jQuery.fn.isHitobject = function(elms,obj){
        var ar = obj.list;
        var reg = obj.reg;
        var $elm = {};
        $elm = $(this).offset();
        $elm.bottom = $elm.top + $(this).height();
        $elm.right = $elm.left + $(this).width();

        function hit(by,top,left){
            if(top > by.top && top < by.bottom){
                if(left > by.left && left < by.right){
                    return true;
                }
            }
            return false;
        }
        function hit(rect1,rect2){
            if (rect1.left < rect2.right &&
                rect1.right > rect2.left &&
                rect1.top < rect2.bottom &&
                rect1.bottom > rect2.top) {
                return true;
            }
            return false;
        }
        var selected = [];
        var list = Object.values(elms);
        list.forEach(function(val,no){
            var objElm = val.$.element;
            var elm = {};
            elm = $(objElm).offset();
            elm.bottom = elm.top + $(objElm).height();
            elm.right = elm.left + $(objElm).width();
            if(hit(elm,$elm)){
                var name = $(objElm).data('Box').$.name;
                $(objElm).addClass('Selected');
                $(objElm).data('$pos',{
                    top:parseInt($(objElm).css('top')),
                    left:parseInt($(objElm).css('left'))
                });
                if(reg[name] == undefined){
                    reg[name] = $(objElm).data('Box');
                    ar.push(objElm);
                }
            }
        });
        if(selected.length != 0){
            return selected;
        }
    }

    jQuery.fn.isHitInside = function(elms){
        var $elm = {};
        $elm = $(this).offset();
        $elm.bottom = $elm.top + $(this).height();
        $elm.right = $elm.left + $(this).width();
        var selFrame = undefined;
        elms.each(function(no,elm){
            var $this =  $(elm).offset();
            $this.bottom = $this.top + $(elm).height();
            $this.right = $this.left + $(elm).width();
            if($this.top < $elm.top && $this.bottom > $elm.bottom && $this.right > $elm.right && $this.left < $elm.left){
                selFrame = (elm);
            }
        });
        return selFrame;
    };



    (function( $ ) {

        if ( !$.cssHooks ) {
            throw( new Error( "jQuery 1.4.3+ is needed for this plugin to work" ) );
        }

        function styleSupport( prop ) {
            var vendorProp, supportedProp,
                capProp = prop.charAt( 0 ).toUpperCase() + prop.slice( 1 ),
                prefixes = [ "Moz", "Webkit", "O", "ms" ,'' ],
                div = document.createElement( "div" );

            if ( prop in div.style ) {
                supportedProp = prop;
            } else {
                for ( var i = 0; i < prefixes.length; i++ ) {
                    vendorProp = prefixes[ i ] + capProp;
                    if ( vendorProp in div.style ) {
                        supportedProp = vendorProp;
                        break;
                    }
                }
            }

            div = null;
            $.support[ prop ] = supportedProp;
            return supportedProp;
        }

        var borderRadius = styleSupport( "borderRadius" );

// Set cssHooks only for browsers that support a vendor-prefixed border radius
        if ( borderRadius && borderRadius !== "borderRadius" ) {
            $.cssHooks.borderRadius = {
                get: function( elem, computed, extra ) {
                    return $.css( elem, borderRadius );
                },
                set: function( elem, value) {
                    elem.style[ borderRadius ] = value;
                }
            };
        }else{
            $.cssHooks.borderRadius = {
                get: function( elem, computed, extra ) {
                    return elem.style.borderRadius;
                },
                set: function( elem, value) {
                    elem.style[ borderRadius ] = value;
                }
            };
        }

    })( jQuery );
})();

function deepExtend(k,j){
    for(i in k){
        if(typeof k[i] == 'object'){
            if(j[i] == undefined){
                j[i] = {};
            }
            if(!(Array.isArray(k[i])) && (Array.isArray(j[i]))){
                j[i] = {};
            }else if((Array.isArray(k[i])) && !(Array.isArray(j[i]))){
                j[i] = [];
            }
            check(k[i],j[i]);
        }else{
            if(j[i] == undefined){
                j[i] = k[i];
            }
        }
    }
}

function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]).replace(';','');
            //console.log((l[1]));
        }
    }

    return s;
}

function css(a) {
    var sheets = document.styleSheets, o = {};
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function setCaretPosition(editableDiv,pos) {
    //console.log('Pos',pos);
    var el = editableDiv;
    if(el.childNodes[0] != undefined){
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}

function getSelectionCoords(win) {
    win = win || window;
    var doc = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;

        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                if(rect == undefined){
                    rect = {};
                }
                x = rect.left;
                y = rect.top;
               // console.log('range.left',rect);
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( doc.createTextNode("\u200b") );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                   // console.log('range.left',span.getClientRects);
                }
            }
        }
    }
    if(x == undefined || y == undefined){
        x = 0; y = 0 ;
    };
    return { x: x, y: y };
}

String.prototype.startsWith = function(str) {
    return ( str === this.substr( 0, str.length ) );
}

var styleFile = function(file){
    var styleSheet=file.get(0).sheet;
    var getCSSRule = this.getCSSRule = function(ruleName, deleteFlag) {               // Return requested style obejct
        ruleName=ruleName.toLowerCase();
                var ii=0;                                        // Initialize subCounter.
                var cssRule=false;                               // Initialize cssRule.
                do {                                             // For each rule in stylesheet
                    if (styleSheet.cssRules) {                    // Browser uses cssRules?
                        cssRule = styleSheet.cssRules[ii];         // Yes --Mozilla Style
                    } else {                                      // Browser usses rules?
                        cssRule = styleSheet.rules[ii];            // Yes IE style.
                    }                                             // End IE check.
                    if (cssRule)  {                               // If we found a rule...
                        if (cssRule.selectorText.toLowerCase()==ruleName) { //  match ruleName?
                            if (deleteFlag=='delete') {             // Yes.  Are we deleteing?
                                if (styleSheet.cssRules) {           // Yes, deleting...
                                    styleSheet.deleteRule(ii);        // Delete rule, Moz Style
                                } else {                             // Still deleting.
                                    styleSheet.removeRule(ii);        // Delete rule IE style.
                                }                                    // End IE check.
                                return true;                         // return true, class deleted.
                            } else {                                // found and not deleting.
                                return cssRule;                      // return the style object.
                            }                                       // End delete Check
                        }                                          // End found rule name
                    }                                             // end found cssRule
                    ii++;                                         // Increment sub-counter
                } while (cssRule)                                // end While loop
                                                             // end For loop
                                                           // end styleSheet ability check
        return false;                                          // we found NOTHING!
    }                                                         // end getCSSRule

    var killCSSRule = this.killCSSRule = function killCSSRule(ruleName) {                          // Delete a CSS rule
        return getCSSRule(ruleName,'delete');                  // just call getCSSRule w/delete flag.
    }                                                         // end killCSSRule

    var addCSSRule = this.addCSSRule = function(ruleName) {
        var rule = getCSSRule(ruleName);
        if(rule == false){
            if (styleSheet.addRule) {           // Browser is IE?
                styleSheet.addRule(ruleName, null,0);      // Yes, add IE style
            } else {                                         // Browser is IE?
                styleSheet.insertRule(ruleName+' { }', 0);
            }
        }                                                    // End browser ability check.
        return getCSSRule(ruleName);                           // return rule we just created.
    }

    var getFile = this.getFile = function() {
        var style = [];
        var rules = styleSheet.cssRules;
        if (styleSheet.cssRules) {                    // Browser uses cssRules?
            rules = styleSheet.cssRules;         // Yes --Mozilla Style
        } else {                                      // Browser usses rules?
            rules = styleSheet.rules;            // Yes IE style.
        }
        for(var i = 0,max = rules.length;i < max;i++){
            style.push(rules[i].cssText);
        }
        var styleText = style.join('\n');
        return styleText;
    }

}
//styleFile = new styleFile();

function getCssFile(json,viewName,file){
    var $css = [];
    var $cssdata = [];
    var $class = [];
    console.log(file);
    function cssProps(objCss,name){
        var $classCss = [];
        $classCss.push($class.join('')  + ' \n');
        var list = Object.keys(objCss);
        $classCss.push('{\n');

        var rule = file.addCSSRule($class.join('')).style;
        for(var i = 0,max = list.length;i < max;i++){
            var prop = list[i];
            var val = prop.match(/[A-Z]*[^A-Z]+/g);
            rule[prop] = objCss[prop];
            if(val == null || val.length == 1){
                $classCss.push('     '+prop + ':' + objCss[prop] + ';\n');
            }else{
                $classCss.push('     '+val.join('-') + ':' + objCss[prop] + ';\n');
            }
            //code.push('\n');
        }
        //code.push('}\n');
        $classCss.push('}\n');

        //write($classCss.join(''));
        $css.push($classCss.join(''));
    }

    function genrateCSS(json,name){
        $class.push(name);
        var aList = Object.keys(json);
        for(var a = 0,aMax = aList.length;a < aMax;a++) {
            var aVal = aList[a];
            $class.push((aVal == 'normal' ? '' : '.' + aVal));
            var aObj = json[aVal];
            var iList = Object.keys(aObj);
            for(var i = 0,iMax = iList.length;i < iMax;i++){
                var iVal = iList[i];
                //write(iVal+' > ');
                $class.push((iVal == 'normal' ? '' : '.STATE_'+iVal));
                var iObj = aObj[iVal];
                if(iObj != null){
                    var jList = Object.keys(iObj);
                    for(var j = 0,jMax = jList.length;j < jMax;j++){
                        var jVal = jList[j];
                        //write(jVal+' > ');
                        $class.push((jVal == 'normal' ? '' : '.ACTION_'+jVal));
                        var jObj = iObj[jVal];
                        //write($class.join('')+' \n');
                        if(jObj != null){
                            var kList = Object.keys(jObj);
                            for(var k = 0,kMax = kList.length;k < kMax;k++){
                                var kVal = kList[k];
                                //write($class.join(' > ') + kVal + ' \n');
                                var kObj = jObj[kVal];
                                if(kVal != 'css'){
                                    if(kObj != null){
                                        //$class.push('.'+kVal);
                                        genrateCSS(kObj,' > .DOMELEMENT_'+kVal);
                                        $class.length -= 1;
                                    }
                                }else{
                                    cssProps(kObj,kVal);
                                    //write(JSON.stringify(kObj));
                                }
                            }
                        }
                        $class.length -= 1;
                    }
                }
                $class.length -= 1;
            }
            $class.length -= 1;
        }
    }
    genrateCSS(json.normal.root,'.'+viewName+'.DOMELEMENT_root');
    $css.reverse();
    return $css.join('');
}

(function(){
    var keys = {};
    window.addEventListener("keydown",
        function(e){
            keys[e.keyCode] = true;
            switch(e.keyCode){
                case 37: case 39: case 38:  case 40: // Arrow keys
                //case 32: e.preventDefault(); break; // Space
                default: break; // do not block other keys
            }
        },
        false);
    window.addEventListener('keyup',
        function(e){
            keys[e.keyCode] = false;
        },
        false);
})();


Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

Object.pairs = function(o){
    return new (function () {
        var key = this.key = Object.keys(o);
        var values = this.values = Object.values(o);
        this.each = function(fn){
            for(var i = 0;i < key.length;i++){
                new fn(key[i],values[i],i);
            }
        }
        return this;
    });
}

Object.createObj = function(obj, keyPath, value){
    lastKeyIndex = keyPath.length-1;
    for (var i = 0; i < lastKeyIndex; ++ i) {
        key = keyPath[i];
        if (!(key in obj))
            obj[key] = {}
        obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
    Object.byString()
}

Object.addAt = function(o,at,key,value) {
    var keys = Object.keys(o);
    var values = Object.values(o);
    var $key = key.toLowerCase();
    var $lastnum = -1;

    if(at == -1){
        at = keys.length;
    }

    for(var i = 0;i < keys.length;i++){
        var $keys = keys[i].toLowerCase();
        var num = ($keys.replace($key,'0'));
        if(!isNaN(num)){
            num = parseInt(num);
            if(num > $lastnum){
                $lastnum = num;
            }
        }
        delete o[keys[i]];
    }

    if($lastnum != -1){
        key += ($lastnum + 1) + '';
    }

    for(var i = 0;i < at;i++){
        o[keys[i]] = values[i];
        //console.log('i',i,keys[i]);
    }
    o[key] = value;
    //console.log(key);
    for(var i = at;i < keys.length;i++){
        o[keys[i]] = values[i];
        //console.log('i',i,keys[i]);
    }
    return key;
}

Object.rename = function(o,key,newKey) {
    var keys = Object.keys(o);
    var values = Object.values(o);

    for(var i = 0;i < keys.length;i++){
        delete o[keys[i]];
        if(keys[i] == key){
            keys[i] = newKey;
        }
    }

    for(var i = 0;i < keys.length;i++){
        o[keys[i]] = values[i];
    }
}

new (function(){

        var lastClass = '';
        function resize(){
            var $css = lastClass;
            var wh = $(window).width();
            if(1200 < wh){
                lastClass = '';
            }else if(991 < wh){
                lastClass = '';
            }else if(767 < wh){
                lastClass = 'tablets';
            }else if(575 < wh){
                lastClass = 'tablets lanscape_phone';
            }else{
                lastClass = 'tablets lanscape_phone portrait_phone';
            }
            if(lastClass != $css){
                $(document.body).removeClass($css);
                $(document.body).addClass(lastClass);
            }
        }
        $(document).ready(function(){
            if(window.noRcss != true){
                resize();
                $(window).resize(resize);
            }
        });
})();

 var errorTrack = new (function(){
    var pending = this.pending = [];
    var $this = this;
    this.check = function(){
        if($this.pending.length != 0){
            $this.pending.forEach(function(val){
                ssjs.sendError({
                    msg:JSON.stringify(val)
                });
            });
            $this.pending = [];
        }
    }

    window.onerror = function(msg, url, linenumber,more,stack) {
       // console.log(stack.stack);
        var ssjs;
        var obj = {
            msg:msg,
            url:url,
            linenumber:linenumber,
            linechar:more,
            error:JSON.stringify(stack.stack)
        };
        if(ssjs == undefined){
            pending.push(obj);
        }else{
            ssjs.sendError({
                msg:JSON.stringify(obj)
            });
        }
        return false;
    }

})();

