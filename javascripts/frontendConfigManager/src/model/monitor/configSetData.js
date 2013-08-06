/**
 * @description 数据设置类型
 */


/**
 * @description 数组类型
 * @param {DOM} obj from表单空间dom节点
 * @param {Object} o 物体数据
 */
uinv.FCM.configMgr.model.monitor.configSetData.array = function(obj, o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.monitor;
	var key = $(obj).attr('key');
	o.config[key] = [];
	$(obj).find('*[name='+key+']').each(function(){
		o.config[key].push($(this).val());
	});
};

/**
 * @description 数字类型
 * @param {DOM} obj from表单空间dom节点
 * @param {Object} o 物体数据
 */
uinv.FCM.configMgr.model.monitor.configSetData.number = function(obj, o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.monitor;
	var key = $(obj).attr('key');
	o.config[key] = Number($(obj).find('*[name='+key+']').val());
};

/**
 * @description 表单类型
 * @param {DOM} obj from表单空间dom节点
 * @param {Object} o 物体数据
 */
uinv.FCM.configMgr.model.monitor.configSetData.form = function(obj, o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.monitor;
	o.form = [];
	$(obj).find('tr.row').each(function(i){
		o.form[i] = {};
		$(this).find('*[name][cate]').each(function(){
			_this.configTypeToData[$(this).attr('cate')](this, o.form[i]);
		});
	});
	
};