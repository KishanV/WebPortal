var frame = require('../mode/frame.js')
exports.init = function(){
	var obj = frame.load();
	var homeBody = {
		'.holder':{
		'.item.myAccount':{
			$:{
				event:{
					click:function () {
						$.post('/get',{ demo:'get this string...!'},function(data){
							console.log(data);
						});
						window.location.href =  '/settings.html';
					}
				}
			},
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'My Account'
				}
			}
		},'.item.parentalControl':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'Parental Control'
				}
			}
		},'.item.cloudStorage':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'Cloud Storage'
				}
			}
		}
		,'.item.shopping':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'Shopping'
				}
			}
		}
		,'.item.statistics':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'Statistics'
				}
			}
		}
		,'.item.services':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'Services'
				}
			}
		}
		,'.item.advancedNetwork':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'Advanced Network'
				}
			}
		},'.item.wifiSetting':{
			'.box':{
				'.back':{},
				'.img':{}
			},
			'.lable':{
				$:{
					text:'WIfi'
				}
			}
		}
	}
	};
	var home = $(obj.body.home.body.$element).tags(homeBody);
}