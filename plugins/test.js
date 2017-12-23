var a = {
    states:{
        counter:0,
        list:[
            {
                name:'state'+0
            }
        ],
        current:'0'
    },
    events:{
        mouseup: {},
        database: {}
    }
};

var b = {
    states:{
        counter:1,
        list:{
            name:'state'+0
        },
        current:null
    },
    events: {
        click: {},
        mousedown: {},
        database: ['html']
    }
};

function check(k,j){
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
//console.log(b);
//check(a,b);