
/**
 * @description 获取监控面板数据
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} 监控配置数据
 * @example var result = uinv.FCM.configMgr.api.getMonitor();
 * @author lizhong
 * @since 2013-07
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
		monitorTime							: _obj.data.monitor.alarm.monitorTime,
		monitorManagerOvertime				: _obj.data.monitor.alarm.monitorManagerOvertime,
		monitorManagerInDeviceIntervalTime	: _obj.data.monitor.alarm.monitorManagerInDeviceIntervalTime,
		monitorManagerInDeviceOvertime		: _obj.data.monitor.alarm.monitorManagerInDeviceOvertime,
		alarmManagerOvertime				: _obj.data.monitor.alarm.alarmManagerOvertime,
		monitorManagerIconScale				: _obj.data.monitor.alarm.monitorManagerIconScale,
		monitorPanelConfig					: obj
	};
};

/**
 * @description 获取视角数据
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} { 物体名称:{ x:Number, y:Number, z:Number }, ... }
 * @example var result = uinv.FCM.configMgr.api.getViewpoint();
 * @author lizhong
 * @since 2013-07
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
 * @description 设置视角数据
 * @memberOf uinv.FCM.configMgr.api
 * @param {String} key 物体key值
 * @param {Object} o 视角数据 {x,y,z}的值
 * @return {Boolean} true 正常处理 false key值不存在
 * @example uinv.FCM.configMgr.api.getViewpoint();
 * @author lizhong
 * @since 2013-07
 * @static
 */
uinv.FCM.configMgr.api.setViewpoint = function(key, o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var obj,i,k;
	
	obj = _obj.data.viewpoint;

	for(i=0,k=obj.length;i<k;i++){
		if(obj[i].key == key){
			obj[i].data.x = typeof o.x == "undefined" ? obj[i].data.x : o.x;
			obj[i].data.y = typeof o.y == "undefined" ? obj[i].data.y : o.y;
			obj[i].data.z = typeof o.z == "undefined" ? obj[i].data.z : o.z;
			return true;
		}
	}
	
	return false;
	
};


/**
 * @description 获取统计数据
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} 统计数据
 * @example var result = uinv.FCM.configMgr.api.getStatistics();
 * @author lizhong
 * @since 2013-07
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
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} 资源数据
 * @example var result = uinv.FCM.configMgr.api.getResources();
 * @author lizhong
 * @since 2013-07
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
 * @method memberOf uinv.FCM.configMgr.api
 * @return {Object} 图层数据
 * @example var result = uinv.FCM.configMgr.api.getLayer();
 * @author lizhong
 * @since 2013-07
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
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} 面板数据
 * @example var result = uinv.FCM.configMgr.api.getPanel();
 * @author lizhong
 * @since 2013-07
 * @static
 */
uinv.FCM.configMgr.api.getPanel = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.panel );
	
	_obj.model.panel.obj = _obj.model.stringDB.get(_obj.model.panel.index);
	
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
		"lib" : _obj.model.object.clone( _obj.model.panel.obj )
	};
};

/**
 * @description 获取表单数据
 * @memberOf uinv.FCM.configMgr.api
 * @param {String} group 过滤组数据，不传入则全部返回
 * @return {Object} 表单数据
 * @example 
 * var result = uinv.FCM.configMgr.api.getForm(); // 全部返回<br />
 * var result = uinv.FCM.configMgr.api.getForm("system"); // 返回group=system的数据
 * @author lizhong
 * @since 2013-07
 * @static
 */
uinv.FCM.configMgr.api.getForm = function(group){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		i = 0,
		k = 0;
	
	var o = _obj.model.object.clone(_obj.form.createFormData);
	
	// Fixes #5 过滤掉分割线
	for(i=0,k=o.length;i<k;i++){
		if(_obj.form.inSpecialType(o[i].type)){
			o.splice(i,1);
			i--;
			k=o.length;
		}
	}
	
	for(i=0,k=o.length;i<k;i++){
		o[i].value = _obj.data[o[i].group][o[i].name];
		if(o[i].type == 'color'){
			o[i].value = _obj.model.colorpicke.toRgb(o[i].value);
		}
	}
	
	if(group){
		var arr = [];
		for(i=0,k=o.length;i<k;i++){
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
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} 告警级别数据
 * @example var result = uinv.FCM.configMgr.api.getAlarm();
 * @author lizhong
 * @since 2013-07
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
 * @memberOf uinv.FCM.configMgr.api
 * @return {Object} 下载数据
 * @example var result = uinv.FCM.configMgr.api.getDownload();
 * @author lizhong
 * @since 2013-07
 * @static
 */
uinv.FCM.configMgr.api.getDownload = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.model.object.clone(_obj.data.download);
};

/**
 * @description 根据name值找到dom节点
 * @memberOf uinv.FCM.configMgr.api
 * @param {String} name 值
 * @return {DOM} DOM对象
 * @example var result = uinv.FCM.configMgr.api.nameFindDom("name");
 * @author lizhong
 * @since 2013-08
 * @static
 */
uinv.FCM.configMgr.api.nameFindDom = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	return _obj.form.box.find('*[name='+name+'][cate][path]');
};
