var conn = {
	ip:'192.168.0.12',
	port:'6001'
};
var list = {
	'user':{
		$:{
			method:'post',
			type:'formdata/json',
			case:{
				'first':{
					'id':'121'
				},
				'abc':{
					'id':'120'
				},
				'second':{
					'id':'and'
				}
			}
		},
		'name':{
			$:{
				method:'post',
				type:'formdata/json',
				case:{
					'one':{}
				}
			}
		},
		'surname':{
			$:{
				method:'post',
				type:'formdata/json',
				case:{
					'one':{

					}
				}
			}
		},
		'roll_no':{
			$:{
				method:'post',
				type:'formdata/json',
				case:{
					'one':{

					}
				}
			}
		}
	}
};


function Go(list,path){
	console.log(`http://${conn.ip}:${conn.port}`+path);
	for(var name in list){
		if(name != '$'){
			Go(list[name],path+'/'+name);
		}else{

		}
	}
}
Go(list,'');