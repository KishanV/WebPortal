import React from 'react';
import {render} from 'react-dom';

class Wifi extends React.Component {

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    render(){
        return (
            <div className='title'>
                <div className='text'>{this.data.title.text}</div>
                <div className='device'>{this.data.title.device}</div>
                <div className='Menu icon-menu-1'></div>
            </div>
        );
    }

}

class GroupItem extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.children;
    }

    render(){
        return (
            <div className='item'>
                <div className='delete icon-cancel-5'></div>
                <div className='title'>{this.data.name}</div>
                <div className='user'>{this.data.count} Device</div>
            </div>
        );
    }
}

function GroupList(props) {
    const numbers = props.numbers;
    var id = -1;
    const listItems = numbers.map((number) =>{
        id++;
        return (
            <GroupItem key={id.toString()}>
                {props.numbers[id]}
            </GroupItem>
        )
    });
    return (
        <div>{listItems}</div>
    );
}

exports.load = function (elm) {
    $(elm.body.$element).html('');
    $(elm.body.$element).attr('class','body wifiSettings');

    $(elm.body.$element).tags({
       '.left':{
           $:{
               each:function(elm){
                   var data = {
                       title:{
                           text:'2.4 GHZ',
                           device:'totel 200 devices conected...'
                       }
                   };
                   render(<Wifi data={data}/>,elm);
               }
           },'.body':{
               $:{
                   each:function(elm){
                       var scroll = SimpleScrollbar.initEl(elm);
                       const numbers = [{
                           name:'Nighthawak',
                           count:25
                       },{
                           name:'91Springboard',
                           count:500
                       },{
                           name:'Intel',
                           count:32
                       }];
                       render(
                           <GroupList numbers={numbers} />,
                           scroll.content.get(0)
                       );
                   }
               }
           }
       },
       '.right':{
           $:{
               each:function(elm){
                   var data = {
                       title:{
                           text:'5 GHZ',
                           device:'totel 110 devices conected...'
                       }
                   };
                   render(<Wifi data={data}/>,elm);
               }
           },'.body':{
               $:{
                   each:function(elm){
                       var scroll = SimpleScrollbar.initEl(elm);
                       const numbers = [{
                           name:'Nighthawak 5G',
                           count:25
                       },{
                           name:'91Springboard 2',
                           count:403
                       },{
                           name:'Dell',
                           count:32
                       },{
                           name:'Hp',
                           count:10
                       }];
                       render(
                           <GroupList numbers={numbers} />,
                           scroll.content.get(0)
                       );
                   }
               }
           }
       }
    });
}