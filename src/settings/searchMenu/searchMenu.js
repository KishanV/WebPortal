exports.load = function (args) {
	$(args.elm).click(function(){
		$(document.body).tags({
			'.searchMenu':{
				$:{
					attr:{
						contenteditable:true
					},
					text:args.caption+'',
					each:function (elm) {
						setTimeout(function () {
							$(elm).addClass('on');
						},10);
						$(elm).downOut(function(){
							$(elm).remove();
						});
					},
					css:args.css
				}
			}
		});
	});
}