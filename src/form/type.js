
 
 
/**
 * @description 单选类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.radio = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		if( _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] == $(obj).attr('value') ){
			$(obj).attr('checked', true);
		}	
	}else{
		if( _obj.data[$(obj).attr('path')][$(obj).attr('name')] == $(obj).attr('value') ){
			$(obj).attr('checked', true);
		}		
	}
};

/**
 * @description 布尔类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.bool = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;			

	if($(obj).attr('itemkey') !== ""){
		if( obj.value == "1" && _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] ){
			$(obj).attr('checked', true);
		}
		
		if( obj.value == "0" && !_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] ){
			$(obj).attr('checked', true);
		}	
	}else{
		if( obj.value == "1" && _obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
			$(obj).attr('checked', true);
		}
		
		if( obj.value == "0" && !_obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
			$(obj).attr('checked', true);
		}	
	}
};

/**
 * @description 文本类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.text = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] );
	}else{
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
	}
};

/**
 * @description 字符串类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.string = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] );
	}else{
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
	}
};

/**
 * @description 多行字符串类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.multi = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] );
	}else{
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
	}
};


/**
 * @description 数字类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.number = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] );
	}else{
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
	}
};

/**
 * @description 图片类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.image = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;

	if($(obj).attr('itemkey') !== ""){
		$(obj).attr('src' ,  _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] );		
	}else{
		$(obj).attr('src' ,  _obj.data[$(obj).attr('path')][$(obj).attr('name')] );		
	}
};

/**
 * @description 颜色类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.color = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;

	if($(obj).attr('itemkey') !== ""){
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] );
	}else{
		$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
	}
	_obj.model.colorpicke.show(obj);
};

/**
 * @description 图层类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.layer = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var layerObj = _obj.model.layer.keyFindObj( $(obj).attr('name') );
	
	if( $(obj).attr('value') == u.le.get('分割线')  ){
		$(obj).attr('disabled', true);
	}
	
	if(typeof layerObj.item == 'object'){
		if( _obj.model.array.inArray( $(obj).attr('value') , layerObj.item ) ){
			$(obj).attr('checked', true);
			_obj.model.layer.checkd(obj);
		}	
	}
	
	// _obj.model.layer.checkedLayerOrder( $(obj).attr('name') );
};

/**
 * @description 面板类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.panel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var panelObj = _obj.model.panel.keyFindObj( $(obj).attr('name') );
	
	if(typeof panelObj.item == 'object'){
		if( _obj.model.array.inArray( $(obj).attr('value') , panelObj.item ) ){
			$(obj).attr('checked', true);
			_obj.model.panel.checkd(obj);
		}	
	}
	
	// _obj.model.panel.checkedPanelOrder( $(obj).attr('name') );
};

/**
 * @description 统计类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.statistics = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var html = '';
	for( var i in _obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
		html += _obj.model.statistics.mkhtmlTr( _obj.data[$(obj).attr('path')][$(obj).attr('name')][i] );
	}
	
	$(obj).append(html);
	
	_this.box.find(_obj.model.statistics.classStr).find('input[key=color]').each(function(){
		_obj.model.colorpicke.show(this);
	});
};

/**
 * @description 视角类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.viewpoint = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	$(obj).val( _obj.model.viewpoint.keyFindObj( $(obj).attr('name') ).data[$(obj).attr('key')] );
};

/**
 * @description 告警类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.alarm = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	if( typeof  _obj.data.monitor.alarm[$(obj).attr('name')] != 'undefined'){
		$(obj).val( _obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')] );
	}
};

/**
 * @description 告警级别类型
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.type.alarmlevel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	$(obj).find('*.row').each(function(){
		var dom = $(this).find('input[name=color]').get(0);
		_obj.model.colorpicke.show(dom);
	});
};