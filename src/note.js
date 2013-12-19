
/**
 * @description 弹出警告信息，将信息翻译后调用系统的alert函数
 * @memberOf uinv.FCM.configMgr.note
 * @param {String} str 警告信息
 * @static
 */
uinv.FCM.configMgr.note.alert = function(str){
	alert(u.le.get(str));
};

/**
 * @description 弹出确认回话信息，将信息翻译后调用系统的confirm函数
 * @memberOf uinv.FCM.configMgr.note
 * @param {String} str 确认信息
 * @return {Boolean}
 * @static
 */
uinv.FCM.configMgr.note.confirm = function(str){
	return confirm(u.le.get(str));
};

/**
 * @description 信息提示，将提示信息翻译后调用dialog函数弹层提示，大小随内容自适应
 * @memberOf uinv.FCM.configMgr.note
 * @param {String} str 提示信息
 * @static
 */
uinv.FCM.configMgr.note.dialog = function(str){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		html = "";
	
	html = _obj.template.load('note.html' , {
		msg : u.le.get(str)
	});
	
	uinv.FCM.configMgr.model.dialog.show(html);
};

/**
 * @description 提示错误信息
 * @memberOf uinv.FCM.configMgr.note
 * @param {String} msg 信息
 * @static
 */
uinv.FCM.configMgr.note.showError = function(msg){
	var span = document.createElement("span");
	span.style.cssText = "color:red;";
	span.innerHTML = msg;
	$(".config-page").find(".config-info").html(span);
};

/**
 * @description 错误信息清楚
 * @memberOf uinv.FCM.configMgr.note
 * @static
 */
uinv.FCM.configMgr.note.clearError = function(){
	$(".config-page").find(".config-info").html("");
};