exports.init = function(){
    $(document.body).html('');


    var str = 'Login';
    var siv = "<div class=''>"+str+"</div>";
    $(document.body).tags({
        $:{
            attr:{
                class:'login'
            }
        },
        '.box':{
            '.logo':{},
            '.button':{
                $:{
                    event:{
						click:function(){
							window.location.href =  '/home.html';
						}
					},
                    text:str
                },
                '.arrow.material-icons':{
                    $:{
                        text:'arrow_forward'
                    }
                }
            },
            '.holder':{
                '.lable.user':{
                    $:{
                        text:'Username'
                    }
                },
                'input.textbox.user':{},
                '.lable.password':{
                    $:{
                        text:'Password'
                    }
                },
                'input.textbox.password':{}
            }
        }
    });
}