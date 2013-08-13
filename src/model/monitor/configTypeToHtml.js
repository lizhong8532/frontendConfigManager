

/**
 * @description 字符串类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.string = function(o,form){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	if(typeof form == 'undefined'){
		form = {};
		form[o.value] = '';
	}
	
	return _obj.template.load("monitor/configTypeInputText.html",{
		name	: o.value,
		value	: form[o.value],
		cate	: "string"
	});
};

/**
 * @description 数字类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.number =  function(o,form){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	if(typeof form == 'undefined'){
		form = {};
		form[o.value] = 0;
	}

	return _obj.template.load("monitor/configTypeInputText.html",{
		name	: o.value,
		value	: form[o.value],
		cate	: "number"
	});
};

/**
 * @description 布尔类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.bool = function(o,form){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	if(typeof form == 'undefined'){
		form = {};
		form[o.value] = false;
	}
	
	return _obj.template.load("monitor/configTypeBool.html",{
		name	: o.value,
		value	: form[o.value],
		cate	: "bool"
	});

};

/**
 * @description 样式配置类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.styleConfig = function(o,form){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	if(typeof form == 'undefined'){
		form = {};
	}

	if(typeof form[o.value] == 'undefined'){
		form[o.value] = [];
	}
		
	_this.styleConfigHtml(form[o.value]);
	
	return _obj.template.load("monitor/configTypeStyleConfig.html",{
		name	: o.value,
		cate	: "styleConfig"
	});
};