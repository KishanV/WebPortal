import React from 'react';
import {render} from 'react-dom';

exports.init = function(){

    var api_names = [
        { api_name : 'api1' },
        { api_name : 'api2' },
        { api_name : 'api3' },
        { api_name : 'api4' },
        { api_name : 'api5' },
        { api_name : 'api6' },
        { api_name : 'api7' },
        { api_name : 'api8' },
        { api_name : 'api9' }
    ];

    function fetchNextSetofApis(api_names,nextPageSize){
        var state = 0;
        if(state+nextPageSize > api_names.length){
            nextPageSize = (nextPageSize - (state+nextPageSize - api_names.length));
        }
        var next_names = [];
        for (var i = 0;i < nextPageSize;i++){
            next_names.push(api_names[state+i]);
        }
        state += nextPageSize;
        if(next_names.length == 0){
            return;
        }
        return next_names;
    }

    /*
    $(document.body).tags({
       'div.some.A':{
           $:{
               text:'next : 2',
               event:{
                   click:function(){
                      console.log(fetchNextSetofApis(api_names,2));
                   }
               }
           }
       },'div.some.B':{
           $:{
               text:'next : 3',
               event:{
                   click:function(){
                       console.log(fetchNextSetofApis(api_names,3));
                   }
               }
           }
       },'div.some.C':{
           $:{
               text:'next : 5',
               event:{
                   click:function(){
                       console.log(fetchNextSetofApis(api_names,5));
                   }
               }
           }
       },'div.some.D':{
           $:{
               text:'next : 12',
               event:{
                   click:function(){
                       console.log(fetchNextSetofApis(api_names,12));
                   }
               }
           }
       }
    });
    `*/

    class Btn extends React.Component {

        constructor(props) {
            super();
            this.state = {
                count:0
            };
            this.onClick = this.onClick.bind(this, props.data,2);
        }

        onClick(data,nextPageSize) {

            var api_names = data.list;
            var state = data.pointer;
            if(state+nextPageSize > api_names.length){
                nextPageSize = (nextPageSize - (state+nextPageSize - api_names.length));
            }

            var next_names = [];
            for (var i = 0;i < nextPageSize;i++){
                next_names.push(api_names[state+i]);
            }
            data.pointer += nextPageSize;

            if(next_names.length == 0){
                console.log('No More Elements...');
                return;
            }
            console.log(next_names);
        }

        render(){
            return (
                <div className='some' onClick={this.onClick}>Test</div>
            );
        }

    }

    class Box extends React.Component {

        constructor(props) {
            super();
        }

        render(){
            return (
                <div className='Parent'>
                    <Btn data={this.props.data}></Btn>
                </div>
            );
        }

    }

    var data = {
        pointer:0,
        list:[
            { api_name : 'api1' },
            { api_name : 'api2' },
            { api_name : 'api3' },
            { api_name : 'api4' },
            { api_name : 'api5' },
            { api_name : 'api6' },
            { api_name : 'api7' },
            { api_name : 'api8' },
            { api_name : 'api9' }
        ]
    }

    $(document.body).tags({
        'div.dummy':{
            $:{
                each:function(elm){
                    render(<Box data={data}/>,elm);
                }
            }
        }
    });
}