
/**
 * @description 过滤字符串前边的等号与变量，使其能
 * @memberOf uinv.FCM.configMgr.model.string
 * @param {String} str
 * @return {String} 处理后的字符串
 * @static
 */
uinv.FCM.configMgr.model.string.varFixSub = function(str){
	str = $.trim(str);			
	var firstChar = str.substr(0,1);
	if(firstChar !== "[" && firstChar !== "{"){
		var num = str.indexOf("=") + 1;	
		str = str.substr(num);
	}
	
	return str;
};