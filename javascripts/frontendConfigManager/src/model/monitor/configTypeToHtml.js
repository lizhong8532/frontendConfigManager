/**
 * @description 类型
 */
 

/**
 * @description 字符串类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.string = function(o,form){
	if(typeof form == 'undefined'){
		var form = {};
		form[o.value] = '';
	}
	return '<input type="text" name="'+o.value+'" value="'+form[o.value]+'" cate="string" />';
};

/**
 * @description 数字类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.number =  function(o,form){
	if(typeof form == 'undefined'){
		var form = {};
		form[o.value] = 0;
	}
	return '<input type="text" name="'+o.value+'" value="'+form[o.value]+'" cate="number" />';
};

/**
 * @description 布尔类型
 * @param {Object} o 面板数据
 * @param {Object} form 物体配置表单数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.monitor.configTypeToHtml.boolean = function(o,form){
	if(typeof form == 'undefined'){
		var form = {};
		form[o.value] = false;
	}
	var html = '';
	
	html += '<select name="'+o.value+'" cate="boolean">';
		if( form[o.value] ){
			html += '<option value="1" selected>是</option>';
			html += '<option value="0">否</option>';
		}else{
			html += '<option value="1">是</option>';
			html += '<option value="0"  selected>否</option>';							
		}
	html += '</select>';

	return html;
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
		var form = {};
	}

	if(typeof form[o.value] == 'undefined'){
		form[o.value] = [];
	}
		
	_this.styleConfigHtml(form[o.value]);
	
	return '<input type="button" class="btn_set" name="'+o.value+'" cate="styleConfig" onclick="uinv.FCM.configMgr.model.monitor.settingStyleConfigDisplay(this);" />';
};