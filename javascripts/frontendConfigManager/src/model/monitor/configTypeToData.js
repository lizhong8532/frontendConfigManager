/**
 * @description 类型
 */
 

/**
 * @description 字符串类型
 * @param {DOM} o From表单控件节点
 * @param {Object} data 数据
 */
uinv.FCM.configMgr.model.monitor.configTypeToData.string = function(o,data){
	data[$(o).attr('name')] = $(o).val();
};

/**
 * @description 数字类型
 * @param {DOM} o From表单控件节点
 * @param {Object} data 数据
 */
uinv.FCM.configMgr.model.monitor.configTypeToData.number = function(o,data){
	data[$(o).attr('name')] = Number($(o).val());
};

/**
 * @description 布尔类型
 * @param {DOM} o From表单控件节点
 * @param {Object} data 数据
 */
uinv.FCM.configMgr.model.monitor.configTypeToData.boolean = function(o,data){
	if( $(o).val() == "1" ){
		data[$(o).attr('name')] = true;
	}else{
		data[$(o).attr('name')] = false;
	}
};

/**
 * @description 样式配置类型
 * @param {DOM} o From表单控件节点
 * @param {Object} data 数据
 */
uinv.FCM.configMgr.model.monitor.configTypeToData.styleConfig = function(o,data){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	var key = $(o).attr('name');
	data[key] = [];
	
	var index = $(o).parents('tr.row').index() - 1;
	
	_obj.model.dialog.getObj().find('.color-config').find('.row:eq('+index+')').find('table').find('tr.one').each(function(){
		var o = {};
		$(this).find('*[name]').each(function(){
			o[$(this).attr('name')] = _this.configStyleTypeToData[$(this).attr('cate')](this.value);
		});
		data[key].push(o);
	});
	
};