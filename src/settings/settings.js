var frame = require('../mode/frame.js');
var parentControls = require('./parentControls/parentControls.js');
var cloudStorage = require('./cloudStorage/cloudStorage.js');
var wifiSetting = require('./wifiSetting/wifiSetting.js');

exports.init = function(){
	var frameObj = frame.load();
	function clearBody(elm) {
		$(elm.body.$element).html('');
	}
	function select(elm) {
		elm.parent().find('> .item').removeClass('sel');
		elm.addClass('sel');
	}
	var homeBody = {
		'.leftBar':{
			'.item.myAccount.sel':{
				$:{
					each:function(elm){

					},
					event:{
						click:function(){
							clearBody(homeBody);
							select($(this));
						}
					}
				},
				'.lable':{
					$:{
						text:'My Account'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.parentalControl':{
				$:{
					each:function(elm){
						select($(elm));
						setTimeout(function(){
							clearBody(homeBody);
							parentControls.load(homeBody);
						},100);
					},
					event:{
						click:function(){
							clearBody(homeBody);
							parentControls.load(homeBody);
							select($(this));
						}
					}
				},
				'.lable':{
					$: {
						text: 'Parent Controls'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.cloudStorage':{
				$:{
					each:function(elm){
						select($(elm));
						setTimeout(function(){
							cloudStorage.load(homeBody);
						},100);
					},
					event:{
						click:function(){
							cloudStorage.load(homeBody);
							select($(this));
						}
					}
				},'.lable':{
					$:{
						text:'Cloud Storage'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.shopping':{
				$:{
					each:function(elm){

					},
					event:{
						click:function(){
							clearBody(homeBody);
							select($(this));
						}
					}
				},'.lable':{
					$:{
						text:'Shopping'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.statistics':{
				$:{
					each:function(elm){

					},
					event:{
						click:function(){
							clearBody(homeBody);
							select($(this));
						}
					}
				},'.lable':{
					$:{
						text:'Statistics'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.services':{
				$:{
					each:function(elm){

					},
					event:{
						click:function(){
							clearBody(homeBody);
							select($(this));
						}
					}
				},'.lable':{
					$:{
						text:'Services'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.advancedNetwork':{
				$:{
					each:function(elm){

					},
					event:{
						click:function(){
							clearBody(homeBody);
							select($(this));
						}
					}
				},'.lable':{
					$:{
						text:'Advanced Network'
					}
				},
				'.box':{
					'.img':{}
				}
			},
			'.item.wifiSetting':{
				$:{
					each:function(elm){
						select($(elm));
						setTimeout(function(){
							wifiSetting.load(homeBody);
						},100);
					},
					event:{
						click:function(){
							wifiSetting.load(homeBody);
							select($(this));
						}
					}
				},'.lable':{
					$:{
						text:'Wifi Setting'
					}
				},
				'.box':{
					'.img':{}
				}
			}
		},'.body':{

		}
	};
	var body = $(frameObj.body.home.body.$element);
	homeBody = body.tags(homeBody);
}