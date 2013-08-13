

/**
 * @description 单选类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.radio = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if( obj.checked === true ){
		if($(obj).attr('itemkey') !== ""){
			_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = _this.box.find('*[name=' + $(obj).attr('name') + ']:checked').attr('value');
		}else{
			_obj.data[$(obj).attr('path')][$(obj).attr('name')] = _this.box.find('*[name=' + $(obj).attr('name') + ']:checked').attr('value');
		}
	}
};

/**
 * @description 布尔类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.bool = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;

	if( obj.checked === true ){
		
		if($(obj).attr('itemkey') !== ""){
			if(obj.value == "1"){
				_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = true;
			}else{
				_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = false;
			}			
			
		}else{
			if(obj.value == "1"){
				_obj.data[$(obj).attr('path')][$(obj).attr('name')] = true;
			}else{
				_obj.data[$(obj).attr('path')][$(obj).attr('name')] = false;
			}	
		}
	}
};

/**
 * @description 文本类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.text = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = $(obj).val();
	}else{
		_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
	}
};

/**
 * @description 字符串类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.string = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = $(obj).val();
	}else{
		_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
	}
};

/**
 * @description 数字类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.number = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if($(obj).attr('itemkey') !== ""){
		_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = Number($(obj).val());
	}else{
		_obj.data[$(obj).attr('path')][$(obj).attr('name')] = Number($(obj).val());
	}
};

/**
 * @description 图片类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.image = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	if($(obj).attr('itemkey') !== ""){
		_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = $(obj).attr('src');
	}else{
		_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).attr('src');
	}
};
	
/**
 * @description 颜色类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.color = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	if($(obj).attr('itemkey') !== ""){
		_obj.data[$(obj).attr('path')][$(obj).attr('name')][$(obj).attr('itemkey')] = $(obj).val();
	}else{
		_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
	}
};
		
/**
 * @description 图层类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.layer = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var name = $(obj).attr('name');
	
	var layerObj = _obj.model.layer.keyFindObj( name );
	
	if(_this.isNameFirstEach(name) ){
		layerObj.item = [];
		layerObj.order = [];
		_this.nameInit.push( name );
	}
	
	layerObj.order.push( $(obj).attr('value') );
	
	if( obj.checked === true ){
		layerObj.item.push( $(obj).attr('value') );
	}
};

/**
 * @description 面板类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.panel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var name = $(obj).attr('name');
	
	var panelObj = _obj.model.panel.keyFindObj( name );
	
	if(_this.isNameFirstEach(name) ){
		panelObj.item = [];
		panelObj.order = [];
		_this.nameInit.push( name );
	}
	
	panelObj.order.push( $(obj).attr('value') );
	
	if( obj.checked === true ){
		panelObj.item.push( $(obj).attr('value') );
	}
};

/**
 * @description 统计类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.statistics = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var name = $(obj).attr('name');
	
	if(_this.isNameFirstEach(name) ){
		_obj.data[$(obj).attr('path')][name] = [];
		_this.nameInit.push( name );
	}
	
	$(obj).find('.item').each(function(){
		var item = {};
		$(this).find('*[key]').each(function(){
			item[ $(this).attr('key') ] = $(this).val();
		});
		
		_obj.data[$(obj).attr('path')][name].push(item);
		
	});
};

/**
 * @description 视角类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.viewpoint = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	_obj.model.viewpoint.keyFindObj( $(obj).attr('name') ).data[$(obj).attr('key')] = Number($(obj).val());
};

/**
 * @description 告警类型
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.alarm = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')]  = Number($(obj).val());
};

/**
 * @description 告警层级
 * @memberOf uinv.FCM.configMgr.form.setValue
 * @param {DOM} obj 控件节点
 */
uinv.FCM.configMgr.form.setValue.alarmlevel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')] = [];
	
	$(obj).find('*.row').each(function(){
		var o = {};
		o.name = $(this).find('input[name=name]').val();
		o.color = $(this).find('input[name=color]').val();
		_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')].push(o);
	});
};