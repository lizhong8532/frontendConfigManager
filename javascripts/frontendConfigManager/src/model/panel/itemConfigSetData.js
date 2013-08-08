
 
 
/**
 * @description 字符串类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.string = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
};

/**
 * @description 数字类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.number = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = Number($(obj).val());
};


/**
 * @description 布尔类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.bool = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	if( obj.checked ){
		if(obj.value == '1'){
			_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = true;
		}else{
			_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = false;
		}
	}
};

/**
 * @description 颜色类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.color = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
};

/**
 * @description 3D位置类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.position3d = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	if( typeof _panel.itemData[$(obj).attr('path')][$(obj).attr('name')] == 'undefined' || _panel.itemData[$(obj).attr('path')][$(obj).attr('name')].length == 3  ){
		_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = [];
	}
	
	_panel.itemData[$(obj).attr('path')][$(obj).attr('name')].push( $(obj).val() );
};

/**
 * @description 2D位置类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.position2d = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	if( typeof _panel.itemData[$(obj).attr('path')][$(obj).attr('name')] == 'undefined' || _panel.itemData[$(obj).attr('path')][$(obj).attr('name')].length == 2  ){
		_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = [];
	}
	
	_panel.itemData[$(obj).attr('path')][$(obj).attr('name')].push( $(obj).val() );
};

/**
 * @description 下拉类型
 * @param {DOM} obj DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigSetData.select = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var _panel = _obj.model.panel.keyFindObj($(obj).attr('objectkey'));
	$(obj).find('option').each(function(){
		if(this.selected){
			_panel.itemData[$(obj).attr('path')][$(obj).attr('name')] = $(this).attr('value');
		}
	});
};