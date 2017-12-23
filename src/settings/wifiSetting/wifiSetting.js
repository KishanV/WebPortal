exports.load = function (elm) {
	$(elm.body.$element).html('');
	$(elm.body.$element).attr('class','body wifiSettings');
	$(elm.body.$element).tags({
		'.left':{
			'.title':{
				'.text':{
					$:{
						text:'2.4 GHZ'
					}
				},
				'.device':{
					$:{
						text:'totel 200 devices conected...'
					}
				},'.Menu.icon-menu-1':{}
			},
			'.body':{
				$:{
					each:function(elm){
						var scroll = SimpleScrollbar.initEl(elm);
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('Nighthawak');
										}
									}
								},
								'.user':{
									$:{
										text:'25 Device'
									}
								}
							}
						});
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('91Springboard');
										}
									}
								},
								'.user':{
									$:{
										text:'500 Device'
									}
								}
							}
						});
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('Intel');
										}
									}
								},
								'.user':{
									$:{
										text:'32 Device'
									}
								}
							}
						});
					}
				}
			}
		},
		'.right':{
			'.title':{
				'.text':{
					$:{
						text:'5 GHZ'
					}
				},
				'.device':{
					$:{
						text:'totel 200 devices conected...'
					}
				},'.Menu.icon-menu-1':{}
			},
			'.body':{
				$:{
					each:function(elm){
						var scroll = SimpleScrollbar.initEl(elm);
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('Nighthawak 5G');
										}
									}
								},
								'.user':{
									$:{
										text:'25 Device'
									}
								}
							}
						});
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('91Springboard 2');
										}
									}
								},
								'.user':{
									$:{
										text:'403 Device'
									}
								}
							}
						});
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('Dell');
										}
									}
								},
								'.user':{
									$:{
										text:'32 Device'
									}
								}
							}
						});
						$(scroll.content).tags({
							'.item':{
								'.delete.icon-cancel-5':{},
								'.title':{
									$:{
										each:function(elm){
											$(elm).text('Hp');
										}
									}
								},
								'.user':{
									$:{
										text:'10 Device'
									}
								}
							}
						});
					}
				}
			}
		}
	});
}