

/**
 * @description 字符串类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.string = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] == 'string'){
		$(obj).val( _layer.itemData[$(obj).attr('path')][$(obj).attr('name')]  );
	}
};

/**
 * @description 数字串类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.number = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] == 'number'){
		$(obj).val( _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] );
	}
};

/**
 * @description 布尔类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.bool = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if( typeof _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] == 'boolean' ){
		if( obj.value == '1' && _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] ){
			obj.checked = true;
		}else if( obj.value == '0' && !_layer.itemData[$(obj).attr('path')][$(obj).attr('name')] ){
			obj.checked = true;
		}
	}
};

/**
 * @description 颜色类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.color = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(  typeof _layer.itemData[$(obj).attr('path')][$(obj).attr('name')]  == 'string' ){
		$(obj).val( _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] );
	}
	_obj.model.colorpicke.show(obj);
};

/**
 * @description 3D位置类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.position3d = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof  _layer.itemData[$(obj).attr('path')][$(obj).attr('name')]  == 'object'){
		var index = $(obj).parents('li').index();
		$(obj).val(  _layer.itemData[$(obj).attr('path')][$(obj).attr('name')][index] );
	}				
};

/**
 * @description 2D位置类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.position2d = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] == 'object'){
		var index = $(obj).parents('li').index();
		$(obj).val( _layer.itemData[$(obj).attr('path')][$(obj).attr('name')][index] );
	}				
};

/**
 * @description 下拉类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigInitData.select = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof  _layer.itemData[$(obj).attr('path')][$(obj).attr('name')] != 'undefined'){
		var value =  _layer.itemData[$(obj).attr('path')][$(obj).attr('name')];
		$(obj).find('option').each(function(){
			if($(this).attr('value') == value){
				this.selected = true;
			}else if( this.selected ){
				this.selected = false;
			}
		});
	}
};