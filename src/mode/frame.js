exports.load = function(){
	$(document.body).css({
		overflow:'auto'
	});
	var userDetail;
	$(document.body).html('');
	var body  = $(document.body).tags({
		'.home':{
			'.top':{
				'.logo':{
				},
				'.right':{
					'.item.help':{
					}
					,'.item.ball':{
						'.number':{
							$:{
								text:'2'
							}
						}
					}
					,'.item.user.demo':{
						$:{
							each:function(elm,no,$this) {
								setTimeout(function(){
									$(userDetail).downOut(function(target){
										if(elm != target && $this.arrow.$element != target){
											$(userDetail).removeClass('on');
										}
									});
								},100);
							},
							event:{
								click:function(){
									if($(userDetail).hasClass('on') == false){
										$(userDetail).addClass('on');
									}else{
										$(userDetail).removeClass('on');
									}
								}
							}
						},
						'.arrow':{}
					}
					,'.item.name':{
						$:{
							text:'Peter Smith P'
						}
					}
					,'.item.info':{
						'.box':{
							$:{
								text:'203 GB / 300 GB'
							}
						},'.icon':{

						}
					}
				}
			},
			'.body':{

			},
			'.bottom':{
				'.body':{
					'.part.one':{
						'.title':{
							$:{
								text:'SERVICE'
							}
						},'.item.one':{
							$:{
								text:'Contact Us'
							}
						},'.item.two':{
							$:{
								text:'Change Language'
							}
						},'.item.three':{
							$:{
								text:'FAQ’s'
							}
						}
					},
					'.part.two':{
						'.title':{
							$:{
								text:'QUICK LINKS'
							}
						},'.item.one':{
							$:{
								text:'My Account'
							}
						},'.item.two':{
							$:{
								text:'My Wifi'
							}
						},'.item.three':{
							$:{
								text:'Services'
							}
						},'.item.four':{
							$:{
								text:'Parental Control'
							}
						},'.item.five':{
							$:{
								text:'Shopping'
							}
						}
					},
					'.part.three':{
						'.title':{
							$:{
								text:'PRIVACY POLICY'
							}
						},'.item.one':{
							$:{
								text:'Terms of Use'
							}
						},'.item.two':{
							$:{
								text:'Privacy Policy'
							}
						}
					},
					'.part.four':{
						'.title':{
							$:{
								text:'ABOUT'
							}
						},'.item.one':{
							$:{
								text:'Company Information'
							}
						},'.item.two':{
							$:{
								text:'Copyrighte'
							}
						}
					},
					'.part.five':{
						'.title':{
							$:{
								text:'CONTACT US'
							}
						},'.item.textinput':{
							$:{
								text:'Enter Email'
							},
							'.btn':{

							}
						},'.text.two':{
							$:{
								text:'Get the most recent updates from \n' +
								'our site and be updated your self..'
							}
						}
					}
				},
				'.copyRight':{
					$:{
						text:'Copyright © 2017 Aticara. All rights reserved.'
					}
				}
			}
		}
	});
	var homeBody = {
		'.holder':{
			'.item.myAccount':{
				$:{
					event:{
						click:function () {
							$.post('/get',{ demo:'get this string...!'},function(data){
								console.log(data);
							});
						}
					}
				},
				'.box':{
					'.back':{},
					'.img':{}
				},
				'.lable':{
					$:{
						text:'My ccount'
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
	$(document.body).tags({
		'.userDetail':{
			$:{
				each:function(elm){
					userDetail = elm;
				}
			},
			'.userImg':{},
			'.userName':{
				$:{
					text:'Peter Smith P'
				}
			},'.userEmail':{
				$:{
					text:'ziggo@support.com'
				}
			},'.userAmount':{
				$:{
					text:'Due Amount : $ 0'
				}
			},
			'.btn.password':{
				'.icon':{},
				'.text':{
					$:{
						text:'Password'
					}
				}
			},'.btn.logOut':{
				'.icon':{},
				'.text':{
					$:{
						text:'Logout'
					}
				}
			}
		}
	});
	return {
		body:body
	}
}