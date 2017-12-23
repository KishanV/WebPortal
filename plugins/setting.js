$(document).ready(function(){
  //  alert();
     $(".main > .search > .barLeft > .item > .title").click(function(){
         var $this = $(this).parent();
         if($this.hasClass('hide')){
             $this.removeClass('hide');
         }else{
             $this.addClass('hide');
         }
         console.log();
     });

    $(".main > .search > .barLeft > .item > .body > .tree .item > .check").click(function(){
         var $this = $(this);
         if($this.text() == 'check_box_outline_blank'){
             $this.text('check_box');
             $this.css('color',"#02c39a");
         }else{
             $this.text('check_box_outline_blank');
             $this.css('color',"#ffc107");
         }
         console.log();
     });


    console.log(document.styleSheets[0].cssRules[0]);
    //alert(document.styleSheets[0].cssRules[0]);
});

/*var view = {
    kishan:{
        attr:{
            class:[]
        }
        demo:{
            type:'div',
            style:{
                Background:'#fff'
            },
            events:{
                onClick:
            }
        }
     }
};*/