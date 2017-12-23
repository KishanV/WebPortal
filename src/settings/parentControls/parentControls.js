var listMenu = require('../listMenu/listMenu.js');
var searchMenu = require('../searchMenu/searchMenu');
exports.load = function(elm){
	$(elm.body.$element).html('');
	$(elm.body.$element).attr('class','body myAccount');
	$(elm.body.$element).tags({
		'.device':{
			'.title':{
				$:{
					text:'Device List'
				},
				'.iconBtn.menu.icon-menu-1':{
					$:{
						each:function(elm,no,data){
							var pos = $(elm).offset();
							var width = $(elm).width();
							var height = $(elm).height();
							pos.top += 10;
							pos.left += width;
							pos.left += width;
							new listMenu.load({
								elm:elm,
								css:pos
							});
						}
					}
				},
				'.iconBtn.icon-search-3':{
					$:{
						each:function(elm){
							var pos = $(elm).offset();
							var width = $(elm).width();
							var height = $(elm).height();
							pos.top += -14;
							pos.left += width;
							new searchMenu.load({
								caption:'Search Device..',
								elm:elm,
								css:pos
							});
						}
					}
				}
			},
			'.body':{
				'.item.one':{
					'.title':{
						$:{
							text:'Sima - iPhone 6'
						}
					},
					'.content':{
						'.item.one':{
							$:{
								text:'IP : '
							},span:{
								$:{
									text:'172.16.30.254'
								}
							}
						},'.item.two':{
							$:{
								text:'MAC : '
							},span:{
								$:{
									text:'70:81:eb:b9:f7:1b'
								}
							}
						},'.item.three':{
							$:{
								text:'STATE : '
							},span:{
								$:{
									text:'Ideal'
								}
							}
						}
					}
				},
				'.item.two':{
					'.title':{
						$:{
							text:'Naveen - iPhone'
						}
					},
					'.content':{
						'.item.one':{
							$:{
								text:'IP : '
							},span:{
								$:{
									text:'172.16.56.200'
								}
							}
						},'.item.two':{
							$:{
								text:'MAC : '
							},span:{
								$:{
									text:'70:81:eb:b9:f7:1b'
								}
							}
						},'.item.three':{
							$:{
								text:'STATE : '
							},span:{
								$:{
									text:'Ideal'
								}
							}
						}
					}
				},
				'.item.three':{
					'.title':{
						$:{
							text:'Kishan - Note 3'
						}
					},
					'.content':{
						'.item.one':{
							$:{
								text:'IP : '
							},span:{
								$:{
									text:'172.16.56.200'
								}
							}
						},'.item.two':{
							$:{
								text:'MAC : '
							},span:{
								$:{
									text:'70:81:eb:b9:f7:1b'
								}
							}
						},'.item.three':{
							$:{
								text:'STATE : '
							},span:{
								$:{
									text:'Ideal'
								}
							}
						}
					}
				},
				'.item.four':{
					'.title':{
						$:{
							text:'Mohan - Galaxy S5'
						}
					},
					'.content':{
						'.item.one':{
							$:{
								text:'IP : '
							},span:{
								$:{
									text:'172.16.56.200'
								}
							}
						},'.item.two':{
							$:{
								text:'MAC : '
							},span:{
								$:{
									text:'70:81:eb:b9:f7:1b'
								}
							}
						},'.item.three':{
							$:{
								text:'STATE : '
							},span:{
								$:{
									text:'Ideal'
								}
							}
						}
					}
				},
			}
		}
		,'.group':{
			'.title':{
				$:{
					text:'Group List'
				},'.iconBtn.menu.icon-menu-1':{
					$:{
						each:function(elm){
							var pos = $(elm).offset();
							var width = $(elm).width();
							var height = $(elm).height();
							pos.top += 10;
							pos.left += width;
							new listMenu.load({
								elm:elm,
								css:pos
							});
						}
					}
				},
				'.iconBtn.icon-search-3':{
					$:{
						each:function(elm){
							var pos = $(elm).offset();
							var width = $(elm).width();
							var height = $(elm).height();
							pos.top += -14;
							pos.left += width;
							new searchMenu.load({
								caption:'Search Device..',
								elm:elm,
								css:pos
							});
						}
					}
				}
			},
			'.body':{
				'.item.one':{
					'.title':{
						$:{
							text:'Social'
						}
					},
					'.content.social':{
						'.item.one':{},
						'.item.two':{},
						'.item.three':{},
						'.item.four':{},
						'.item.five':{},
						'.item.six':{},
						'.item.seven':{},
					}
				},'.item.two':{
					'.title':{
						$:{
							text:'Cloud Storage '
						}
					},
					'.content.storage':{
						'.item.one':{},
						'.item.two':{},
						'.item.three':{},
						'.item.four':{}
					}
				}
			}
		}
		,'.setting':{
			'.title':{
				$:{
					text:'Settings'
				}
			},
			'.body':{
				'.item.one':{
					'.title':{
						$:{
							text:'Websites or Urls'
						}
					},
					'.content':{
						'.item.one':{
							'.icon.one':{},
							$:{
								text:'instagram.com'
							}
							,'.check':{}
						},'.item.two':{
							'.icon.two':{},
							$:{
								text:'facebook.com'
							}
							,'.check':{}
						},'.item.three':{
							'.icon.three':{},
							$:{
								text:'www.google-plus.com'
							}
							,'.check':{}
						},'.item.four':{
							'.icon.four':{},
							$:{
								text:'pinterest.com'
							}
							,'.check':{}
						},'.item.five':{
							'.icon.five':{},
							$:{
								text:'www.skype.com'
							}
							,'.check':{}
						},'.item.six':{
							'.icon.six':{},
							$: {
								text: 'www.google.com'
							}
							,'.check':{}
						},'.item.seven':{
							'.icon.seven':{},
							$:{
								text:'www.linkedin.com'
							}
							,'.check':{}
						}
					}
				},
				'.item.days.two':{
					'.title':{
						$:{
							text:'Effective Days'
						}
					},
					'.content':{
						'.item.one':{
							'.icon.one':{},
							$:{
								text:'Sunday'
							}
							,'.check':{}
						},'.item.two':{
							'.icon.two':{},
							$:{
								text:'Monday'
							}
							,'.check':{}
						},'.item.three':{
							'.icon.three':{},
							$:{
								text:'Tuesday'
							}
							,'.check':{}
						},'.item.four':{
							'.icon.four':{},
							$:{
								text:'Wednesday'
							}
							,'.check':{}
						},'.item.five':{
							'.icon.five':{},
							$:{
								text:'Thursday'
							}
							,'.check':{}
						},'.item.six':{
							'.icon.six':{},
							$: {
								text: 'Friday'
							}
							,'.check':{}
						},'.item.seven':{
							'.icon.seven':{},
							$:{
								text:'saturday'
							}
							,'.check':{}
						}
					}
				},
				'.item.days':{
					'.title':{
						$:{
							text:'Effective Hours'
						}
					},
					'.content':{
						'.item.one':{
							'.icon.one':{},
							$:{
								text:'instagram.com'
							}
							,'.check':{}
						},'.item.two':{
							'.icon.two':{},
							$:{
								text:'facebook.com'
							}
							,'.check':{}
						}
					}
				},
			}
		}
	})
}