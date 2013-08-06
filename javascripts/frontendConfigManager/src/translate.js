/**
 * @description 翻译模块
 */


/**
 * @description 翻译功能 默认遍历页面所有s标签的文本使用u.le.get函数翻译替换
 * @method translate
 * @since 2013-07-31
 * @static
 */
uinv.FCM.configMgr.translate = function(){
	
	$('s').each(function(){
		if($(this)!= undefined && $(this).html!==""){
			$(this).replaceWith(u.le.get($(this).html()));
		}
	});
	
	/*
	$("a,input").each(function(){
		if($(this)!= undefined && $(this).attr("value")!= ""){
			$(this).attr({"value": u.le.get($(this).attr("value"))});
		}
		if($(this)!= undefined && $(this).attr("title")!= ""){
			$(this).attr({"title":u.le.get($(this).attr("title"))});
		}
	});


	$("select").each(function(){
		if($(this)!= undefined && $(this).attr("data-placeholder")!=""){
			$(this).attr({"data-placeholder": u.le.get($(this).attr("data-placeholder"))});
		}
	});

	
	$("select option").each(function(){
		if($(this)!= undefined && $(this).html()!= ""){
			$(this).html(u.le.get($(this).html()));
		}
	});
	*/
};