var listMenu = require('../listMenu/listMenu.js');
var searchMenu = require('../searchMenu/searchMenu');
exports.load = function(elm){
	$(elm.body.$element).html('');
	$(elm.body.$element).attr('class','body cloudStorage');
	$(elm.body.$element).tags({
		'.device':{
			'.title':{
				$:{
					text:'Plans'
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
				$:{each:function(elm){
					var scroll = SimpleScrollbar.initEl(elm);
					$(scroll.content).tags({
						'.item.one':{
							'.title':{
								$:{
									text:'2Tb for 6 Months'
								}
							},
							'.content':{
								'.item.one':{
									$:{
										text:'Product Id : '
									},span:{
										$:{
											text:'IdPPC0014'
										}
									}
								},'.item.two':{
									$:{
										text:'Validity : '
									},span:{
										$:{
											text:'180 days'
										}
									}
								},'.item.three':{
									$:{
										text:'Storage : '
									},span:{
										$:{
											text:'2000 GB'
										}
									}
								},'.item.Price ':{
									$:{
										text:'Price : '
									},span:{
										$:{
											text:'€ 200'
										}
									}
								},'.item.three':{
									'div.left':{
										$:{
											text:'Description : '
										}
									},div:{
										$:{
											text:'Cloud Storage providing universal access to your files via the web.'
										}
									}
								}
							},
							'.btm':{
								'.help':{
									'.icon.icon-help-3':{}

								},'.add':{
									'.icon.icon-list-add':{},
									'.text':{
										$:{
											text:'Buy'
										}
									}

								}
							}
						},
						'.item.a1':{
							'.title':{
								$:{
									text:'1Tb for 1year'
								}
							},
							'.content':{
								'.item.one':{
									$:{
										text:'Product Id : '
									},span:{
										$:{
											text:'IdPPC0014'
										}
									}
								},'.item.two':{
									$:{
										text:'Validity : '
									},span:{
										$:{
											text:'1 year'
										}
									}
								},'.item.three':{
									$:{
										text:'Storage : '
									},span:{
										$:{
											text:'1000 GB'
										}
									}
								},'.item.Price ':{
									$:{
										text:'Price : '
									},span:{
										$:{
											text:'€ 170'
										}
									}
								},'.item.three':{
									'div.left':{
										$:{
											text:'Description : '
										}
									},div:{
										$:{
											text:'Cloud Storage providing universal access to your files via the web.'
										}
									}
								}
							},
							'.btm':{
								'.help':{
									'.icon.icon-help-3':{}

								},'.add':{
									'.icon.icon-list-add':{},
									'.text':{
										$:{
											text:'Buy'
										}
									}

								}
							}
						},
						'.item.two':{
							'.title':{
								$:{
									text:'5Gb for 1year'
								}
							},
							'.content':{
								'.item.one':{
									$:{
										text:'Product Id : '
									},span:{
										$:{
											text:'IdPPC0052'
										}
									}
								},'.item.two':{
									$:{
										text:'Validity : '
									},span:{
										$:{
											text:'1 year'
										}
									}
								},'.item.three':{
									$:{
										text:'Storage : '
									},span:{
										$:{
											text:'1000 GB'
										}
									}
								},'.item.Price ':{
									$:{
										text:'Price : '
									},span:{
										$:{
											text:'€ 50'
										}
									}
								},'.item.three':{
									'div.left':{
										$:{
											text:'Description : '
										}
									},div:{
										$:{
											text:'Cloud Storage providing universal access to your files via the web.'
										}
									}
								}
							},
							'.btm':{
								'.help':{
									'.icon.icon-help-3':{}

								},'.add':{
									'.icon.icon-list-add':{},
									'.text':{
										$:{
											text:'Buy'
										}
									}

								}
							}
						},
						'.item.three':{
							'.title':{
								$:{
									text:'100Gb for 1year'
								}
							},
							'.content':{
								'.item.one':{
									$:{
										text:'Product Id : '
									},span:{
										$:{
											text:'IdPPC0052'
										}
									}
								},'.item.two':{
									$:{
										text:'Validity : '
									},span:{
										$:{
											text:'1 year'
										}
									}
								},'.item.three':{
									$:{
										text:'Storage : '
									},span:{
										$:{
											text:'1000 GB'
										}
									}
								},'.item.Price ':{
									$:{
										text:'Price : '
									},span:{
										$:{
											text:'€ 70'
										}
									}
								},'.item.three':{
									'div.left':{
										$:{
											text:'Description : '
										}
									},div:{
										$:{
											text:'Cloud Storage providing universal access to your files via the web.'
										}
									}
								}
							},'.btm':{
								'.help':{
									'.icon.icon-help-3':{}

								},'.add':{
									'.icon.icon-list-add':{},
									'.text':{
										$:{
											text:'Buy'
										}
									}

								}
							}
						}
					});
				}}
			}
		}
		,'.group':{
			'.title':{
				$:{
					text:'My Plans'
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
				$:{each:function(elm){
					var scroll = SimpleScrollbar.initEl(elm);
				 	$(scroll.content).tags({
						'.item.one':{
							'.title':{
								$:{
									text:'1Tb for 1year'
								}
							},
							'.content':{
								'.item.one':{
									$:{
										text:'Product Id : '
									},span:{
										$:{
											text:'IdPPC0014'
										}
									}
								},'.item.two':{
									$:{
										text:'Validity : '
									},span:{
										$:{
											text:'1 year'
										}
									}
								},'.item.three':{
									$:{
										text:'Storage : '
									},span:{
										$:{
											text:'1000 GB'
										}
									}
								},'.item.Price ':{
									$:{
										text:'Price : '
									},span:{
										$:{
											text:'€ 170'
										}
									}
								},'.item.three':{
									'div.left':{
										$:{
											text:'Description : '
										}
									},div:{
										$:{
											text:'Cloud Storage providing universal access to your files via the web.'
										}
									}
								}
							},
							'.btm':{
								'.help':{
									'.icon.icon-help-3':{}

								},'.add':{
									'.icon.icon-list-add':{},
									'.text':{
										$:{
											text:'Buy'
										}
									}

								}
							}
						},
						'.item.two':{
							'.title':{
								$:{
									text:'5Gb for 1year'
								}
							},
							'.content':{
								'.item.one':{
									$:{
										text:'Product Id : '
									},span:{
										$:{
											text:'IdPPC0052'
										}
									}
								},'.item.two':{
									$:{
										text:'Validity : '
									},span:{
										$:{
											text:'1 year'
										}
									}
								},'.item.three':{
									$:{
										text:'Storage : '
									},span:{
										$:{
											text:'1000 GB'
										}
									}
								},'.item.Price ':{
									$:{
										text:'Price : '
									},span:{
										$:{
											text:'€ 50'
										}
									}
								},'.item.three':{
									'div.left':{
										$:{
											text:'Description : '
										}
									},div:{
										$:{
											text:'Cloud Storage providing universal access to your files via the web.'
										}
									}
								}
							},
							'.btm':{
								'.help':{
									'.icon.icon-help-3':{}

								},'.add':{
									'.icon.icon-list-add':{},
									'.text':{
										$:{
											text:'Buy'
										}
									}

								}
							}
						}
					});
				}}
			}
		}
		,'.setting':{
			'.title':{
				$:{
					text:'Settings'
				}
			},
			'.body':{
				'.item.accessDetail':{
					'.title':{
						$:{
							text:'Access Details'
						}
					},
					'.content':{
						'.item.two':{
							'.icon.one':{},
							$:{
								text:'Portal URL : '
							},'span.url':{
								$:{
									text:'https://www.aticara.com/userID=AB12562'
								}
							}
						},
						'.item.one':{
							'.icon.one':{},
							$:{
								text:'User Id : '
							},'span':{
								$:{
									text:'AB12562'
								}
							}
						},'.item.three':{
							'.icon.one':{},
							$:{
								text:'Password : '
							},'span':{
								$:{
									text:'XMl@125@html'
								}
							}
						}
					}
				}
			}
		}
	})
}