/**
 * @description 接口数据
 */


/**
 * @description 获取监控面板数据
 * @method getMonitor
 * @return {Object} { monitorTime:监控时间, monitorPanelConfig:监控配置数据  }
 * @example var result = uinv.FCM.configMgr.api.getMonitor();
 * @static
 */
uinv.FCM.configMgr.api.getMonitor = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var obj = _obj.model.object.clone( _obj.data.monitor.object );
	
	_obj.model.monitor.obj = _obj.model.stringDB.get(_obj.model.monitor.index);
	
	for(var i=0,k=obj.length;i<k;i++){
		obj[i].condition = _obj.other.conditionReplaceName( obj[i].where );
		obj[i].data = _obj.model.object.clone( _obj.model.monitor.nameFindPanel(obj[i].panel) );
	
		for(var n=0,m=obj[i].form.length;n<m;n++){
			for(var g=0,h=obj[i].form[n].styleConfig.length;g<h;g++){
				obj[i].form[n].styleConfig[g].config = _obj.model.colorpicke.toRgb(obj[i].form[n].styleConfig[g].config);
			}
		}
		
		for(var j in obj[i].data.modify){
			for(var p in obj[i].data.modify[j]){
				if(typeof obj[i].form[ obj[i].data.modify[j][p].row ] != 'undefined'){
					obj[i].data.showMapping[j][p] = obj[i].form[ obj[i].data.modify[j][p].row ][ obj[i].data.modify[j][p].attribute ];
				}
			}
		}
		
		
		for(var o in obj[i].config){
			if( typeof obj[i].config[o] == 'object' ){
				obj[i].data[o] =  _obj.model.object.clone(obj[i].config[o]);
			}else{
				obj[i].data[o] =  obj[i].config[o];
			}
		}
		

		delete obj[i].data.des;
		delete obj[i].data.caption;
		delete obj[i].data.name;
		delete obj[i].data.resPath;
		delete obj[i].where;
		delete obj[i].form;
		delete obj[i].key;
		delete obj[i].panel;
		delete obj[i].config;
	}
	
	return {
		'monitorTime' : _obj.data.monitor.alarm.monitorTime,
		'monitorPanelConfig' : obj
	};
};

/**
 * @description 获取视角数据
 * @method getViewpoint
 * @return {Object} 视角数据
 * @example var result = uinv.FCM.configMgr.api.getViewpoint();
 * @static
 */
uinv.FCM.configMgr.api.getViewpoint = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.viewpoint );

	for(var i=0,k=obj.length;i<k;i++){
		obj[i].condition = _obj.other.conditionReplaceName( obj[i].where );
		delete obj[i].where;
	}
	
	return obj;
};

/**
 * @description 获取统计数据
 * @method getStatistics
 * @return {Object} 统计数据
 * @example var result = uinv.FCM.configMgr.api.getStatistics();
 * @static
 */
uinv.FCM.configMgr.api.getStatistics = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.statistics );
	
	for(var i in obj){
		for(var n=0,m=obj[i].length;n<m;n++){
			obj[i][n].condition = obj[i][n].where;
			delete obj[i][n].where;
			
			obj[i][n].config = _obj.model.colorpicke.toRgb(obj[i][n].color);
			obj[i][n].number = Number( obj[i][n].number );
			
			delete obj[i][n].color;
		}
	}
	
	return obj;
};

/**
 * @description 获取资源数据
 * @method getResources
 * @return {Object} 资源数据
 * @example var result = uinv.FCM.configMgr.api.getResources();
 * @static
 */
uinv.FCM.configMgr.api.getResources = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.resources );
	
	for(var i in obj){
		obj[i].local = obj[i].localPath;
		obj[i].url = obj[i].serverPath.substr(1);
		delete obj[i].localPath;
		delete obj[i].serverPath;
	}
	
	return obj;
};

/**
 * @description 获取图层数据
 * @method getLayer
 * @return {Object} 图层数据
 * @example var result = uinv.FCM.configMgr.api.getLayer();
 * @static
 */
uinv.FCM.configMgr.api.getLayer = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.layer );
	
	_obj.model.layer.obj = _obj.model.stringDB.get(_obj.model.layer.index);
	
	for(var i=0,k=obj.length;i<k;i++){
		obj[i].condition = _obj.other.conditionReplaceName( obj[i].obj );
		
		obj[i].tmp = [];
		for(var n=0,m=obj[i].item.length;n<m;n++){
			if( typeof obj[i].itemData == "undefined" ){
				obj[i].itemData = [];			
			}  
			
			obj[i].tmp.push({
				'itemName' : obj[i].item[n] == u.le.get('分割线') ? 'separator' : obj[i].item[n] ,
				'config' : typeof obj[i].itemData[obj[i].item[n]] == 'undefined' ? {} :  _obj.model.object.clone( obj[i].itemData[obj[i].item[n]] )
			});
		}
		
		obj[i].item = obj[i].tmp;
		delete obj[i].obj;
		delete obj[i].tmp;
		delete obj[i].order;
	}
	
	return {
		"objects" : obj,
		"lib" : _obj.model.object.clone( _obj.model.layer.obj )
	};
};

/**
 * @description 获取面板数据
 * @method getPanel
 * @return {Object} 面板数据
 * @example var result = uinv.FCM.configMgr.api.getPanel();
 * @static
 */
uinv.FCM.configMgr.api.getPanel = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;		
	
	return {
		"objects" : [],
		"lib" : {}
	};
};

/**
 * @description 获取表单数据
 * @method getForm
 * @param {String} group 过滤组数据，不传入则全部返回
 * @return {Object} 表单数据
 * @example var result = uinv.FCM.configMgr.api.getForm();
 * @static
 */
uinv.FCM.configMgr.api.getForm = function(group){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var o = _obj.model.object.clone(_obj.form.createFormData);
	
	for(var i=0,k=o.length;i<k;i++){
		o[i].value = _obj.data[o[i].group][o[i].name];
		if(o[i].type == 'color'){
			o[i].value = _obj.model.colorpicke.toRgb(o[i].value);
		}
	}
	
	if(group){
		var arr = [];
		for(var i=0,k=o.length;i<k;i++){
			if(o[i].group == group){
				arr.push(o[i]);
			}
		}
		o = arr;
	}
	
	return o;	
};

/**
 * @description 获取告警数据
 * @method getAlarm
 * @return {Object} 告警级别数据
 * @example var result = uinv.FCM.configMgr.api.getAlarm();
 * @static
 */
uinv.FCM.configMgr.api.getAlarm = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.monitor.alarm );
	
	if(typeof obj.alarmLevel == 'undefined'){
		obj.alarmLevel = [];
	}
	
	for(var i=0,k=obj.alarmLevel.length;i<k;i++){
		obj.alarmLevel[i].config = _obj.model.colorpicke.toRgb(obj.alarmLevel[i].color);
		delete obj.alarmLevel[i].color;
	}
	
	// 把moniterTime删除，放到moniter接口
	delete obj.monitorTime;
	
	return obj;
};

/**
 * @description 获取系统下载数据
 * @method getDownload
 * @return {Object} 下载数据
 * @example var result = uinv.FCM.configMgr.api.getDownload();
 * @static
 */
uinv.FCM.configMgr.api.getDownload = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.model.object.clone(_obj.data.download);
};