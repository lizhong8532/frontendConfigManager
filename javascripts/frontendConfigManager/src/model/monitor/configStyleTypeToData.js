

/**
 * @description 数字类型
 * @param {String} value 值
 * @return {Number}
 */
uinv.FCM.configMgr.model.monitor.configStyleTypeToData.number = function(value){
	return Number(value);
};

/**
 * @description 字符串类型
 * @param {String} value 值
 * @return {String}
 */
uinv.FCM.configMgr.model.monitor.configStyleTypeToData.string = function(value){
	return value;
};

/**
 * @description 颜色类型
 * @param {String} value 值
 * @return {String}
 */
uinv.FCM.configMgr.model.monitor.configStyleTypeToData.color = function(value){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	return value;
};