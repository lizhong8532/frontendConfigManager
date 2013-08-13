

/**
 * @description classid类型
 * @param {DOM} obj DOM节点
 * @param {String} key值
 * @static
 */
uinv.FCM.configMgr.model.selector.whereTypeSetObj.classid = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj.lib[key].formDataRemember.classid = Number($(obj).parents('.row').find('select[name=classid]').val());
};

/**
 * @description name类型
 * @param {DOM} obj DOM节点
 * @param {String} key值
 * @static
 */
uinv.FCM.configMgr.model.selector.whereTypeSetObj.name = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj.lib[key].formDataRemember.name = $(obj).parents('.row').find('input[name=name]').val();
};

/**
 * @description attribute类型
 * @param {DOM} obj DOM节点
 * @param {String} key值
 * @static
 */
uinv.FCM.configMgr.model.selector.whereTypeSetObj.attribute = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj.lib[key].formDataRemember.attribute = [{
		'key' : $(obj).parents('.row').find('input[name=key]').val(),
		'value' : $(obj).parents('.row').find('input[name=value]').val()
	}];
};

/**
 * @description Function类型
 * @param {DOM} obj DOM节点
 * @param {String} key值
 * @static
 */
uinv.FCM.configMgr.model.selector.whereTypeSetObj.fun = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj.lib[key].formDataRemember.fun = $(obj).parents('.row').find('textarea[name=fun]').val();
	
};