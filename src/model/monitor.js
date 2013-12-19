
//---------------------------------------------------------
// 基础定义
//---------------------------------------------------------

/**
 * @deprecated 所有使用条件下拉的条件列表
 * @type Array
 */
uinv.FCM.configMgr.model.monitor.conditionArr = ['<'];

/**
 * @description 待删除文件列表
 * @type Array
 */
uinv.FCM.configMgr.model.monitor.deleteFileArr = [];

/**
 * @description 副数据定义
 * @type Object
 */
uinv.FCM.configMgr.model.monitor.obj = null;

/**
 * @description 物体盒型DOM class值
 * @type String
 */
uinv.FCM.configMgr.model.monitor.objBoxClassStr = '';

/**
 * @description 面板盒型DOM class值
 * @type String
 */
uinv.FCM.configMgr.model.monitor.styleBoxClassStr = '';

/**
 * @description 告警盒型DOM class值
 * @type String
 */
uinv.FCM.configMgr.model.monitor.alarmlevelBoxClassStr = '';

/**
 * @description 数据索引
 * @type String
 */
uinv.FCM.configMgr.model.monitor.index = 'monitor';

/**
 * @description 位置预制参数
 * @type Array
 */
uinv.FCM.configMgr.model.monitor.position = {
	'x' : [ {'name' : '左', 'value' : 'LEFT' },{ 'name' : '中' , 'value' : 'CENTER' },{ 'name' : '右', 'value' : 'RIGHT'} ],
	'y' : [ {'name' : '上', 'value' : 'TOP' },{ 'name' : '中', 'value' : 'CENTER' },{ 'name' : '下', 'value' : 'BOTTOM'} ],
	'z' : [ {'name' : '前', 'value' : 'FRONT' },{ 'name' : '中', 'value' : 'CENTER' },{ 'name' : '后', 'value' : 'BACK'} ]
};

/**
 * @description 面板编辑列名参数定义
 * @type Object
 */
uinv.FCM.configMgr.model.monitor.panelConfigAttributeField = [
	{ 'name' : '指标名称', 'value' : 'attributeName', 'type' : 'string', 'className' : 'monitor-name'},
	{ 'name' : '单位', 'value' : 'unit', 'type' : 'string' , 'className': 'monitor-unit' },
	{ 'name' : '指标取值', 'value' : 'propertyPath', 'type' : 'string', 'className': 'monitor-propertyPath'},
	{ 'name' : '最小值', 'value' : 'min', 'type' : 'number', 'className': 'monitor-min' },
	{ 'name' : '最大值', 'value' : 'max', 'type' : 'number', 'className': 'monitor-max' },
	{ 'name' : '进度条', 'value' : 'isProgressBar', 'type' : 'bool', 'className': 'monitor-isProgressBar' },
	{ 'name' : '颜色设置', 'value' : 'styleConfig', 'type' : 'styleConfig', 'className': 'monitor-styleConfig' }
];


//--------------------------------------------
// 函数区
//--------------------------------------------


/**
 * @description 获取position的select列表
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} position x y z 
 * @param {String} value 值
 * @return {String} HTML文本
 * @static
 */
uinv.FCM.configMgr.model.monitor.getSelectOptionHtml = function(position, value){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i=0,k=_this.position[position].length; i<k; i++){
		if( value == _this.position[position][i].value ){
			html += _obj.template.load("option_selected",{
				caption : _this.position[position][i].name,
				value	: _this.position[position][i].value
			});
		}else{
			html += _obj.template.load("option",{
				caption : _this.position[position][i].name,
				value	: _this.position[position][i].value
			});
		}
	}
	
	return html;
};

/**
 * @description 打开监控配置
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} key 物体key值
 * @return {Boolean} 如果物体没有选择面板则return false终止操作
 * @static
 */
uinv.FCM.configMgr.model.monitor.configShow = function(key){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		i = null,
		tmp = null,
		imgSrc = "",
		html = "",
		layoutSelectHtml = "",
		pivotLayoutSelectHtml = "",
		form = "",
		tmps = null,
		o = _this.keyFindObj(key),
		layoutOffset = null,
		canvasScale = 0,
		panel = null;
		
	panel = _this.nameFindPanel(o.panel);
	
	if(!panel){
		return false;
	}
	
	imgSrc =  _obj.global.projectPath + _this.getPanelImagePath(panel) ;
	
	tmps = typeof o.config.pivotLayout  == 'undefined' ? panel.pivotLayout : o.config.pivotLayout ;
	
	for(i=0,tmp=['x','y','z'];i<tmp.length;i++){
		pivotLayoutSelectHtml += _obj.template.load("monitor/position.html",{
			position	: tmps[i],
			items		: _this.position[tmp[i]],
			name		: 'pivotLayout'
		});
	}
	
	tmps = typeof o.config.layout  == 'undefined' ? panel.layout : o.config.layout;
	
	for(i=0,tmp=['x','y','z'];i<tmp.length;i++){
		layoutSelectHtml += _obj.template.load("monitor/position.html",{
			position	: tmps[i],
			items		: _this.position[tmp[i]],
			name		: 'layout'
		});
		
	}
	
	layoutOffset	= typeof o.config.layoutOffset == 'undefined' ? panel.layoutOffset : o.config.layoutOffset;
	canvasScale		= typeof o.config.canvasScale == 'undefined' ? panel.canvasScale : o.config.canvasScale;
	form			= _this.panelConfigFormHtml(panel,o);
	
	html = _obj.template.load("monitor/configMain.html",{
		layoutOffset			: layoutOffset,
		layoutSelectHtml		: layoutSelectHtml,
		pivotLayoutSelectHtml	: pivotLayoutSelectHtml,
		canvasScale				: canvasScale,
		form					: form,
		key						: key,
		imgSrc					: imgSrc,
		panel					: o.panel
	});
	
	_obj.model.dialog.show(html);
	
	_obj.model.dialog.getObj().find('.monitor_set').find('select[name=pivotLayout]:last').hide();
	
	_obj.model.dialog.getObj().find('.color-config').find('input[name=config]').each(function(){
		_obj.model.colorpicke.show(this);
	});

};

/**
 * @description 隐藏监控配置窗口
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} name 面板name值
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.monitor.configHide = function(name,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.getObj().find('.each').each(function(){
		if( typeof  _this.configSetData[$(this).attr('cate')] == 'function'){
			_this.configSetData[$(this).attr('cate')](this, _this.keyFindObj(key));
		}	
	});
	_this.synchronousFormData(key);
	_obj.model.dialog.close();
	_obj.form.saveData();
};

/**
 * @description 同步监控信息配置数据
 * @param {String} key 物体key值
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @static
 */
uinv.FCM.configMgr.model.monitor.synchronousFormData = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var o = _this.keyFindObj(key);
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		for( var n in  _this.obj.panel[i].modify ){					
			for( var m in  _this.obj.panel[i].modify[n] ){
				
				if( typeof  o.form[ _this.obj.panel[i].modify[n][m].row  ] == 'undefined' ){
					continue;
				}	
				_this.obj.panel[i].showMapping[n][m] = o.form[ _this.obj.panel[i].modify[n][m].row  ][ _this.obj.panel[i].modify[n][m].attribute ];
			}
		}
	}
	
};

/**
 * @description 面板配置指标列表
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} panel 面板数据
 * @param {Object} o 物体配置数据
 * @return {String} 创建HTML文本
 * @static
 */
uinv.FCM.configMgr.model.monitor.panelConfigFormHtml = function(panel,o){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		n = 0,
		i = 0,
		panelConfigFormRow = "",
		panelConfigFormTypeDom = "",
		colorConfigContents	= "",
		html = '';
		
	for(n=0;n<panel.modifyCount;n++){
		
		panelConfigFormTypeDom = "";
		
		for(i=0,k=_this.panelConfigAttributeField.length;i<k;i++){
			panelConfigFormTypeDom += _obj.template.load("monitor/td.html",{
				contents :  _this.configTypeToHtml[_this.panelConfigAttributeField[i].type]( _this.panelConfigAttributeField[i], o.form[n] ),
				className :  _this.panelConfigAttributeField[i].className
			});
		}	
		
		panelConfigFormRow += _obj.template.load("monitor/panelConfigFormTr.html",{
			panelConfigFormTypeDom : panelConfigFormTypeDom
		});
	}
	
	for(n=0;n<panel.modifyCount;n++){
		var param = [];
		if(typeof o.form[n] == 'object' && typeof o.form[n].styleConfig == 'object'){
			param = o.form[n].styleConfig;
		}
		colorConfigContents += _this.styleConfigHtml( param );
	}
	
	html += _obj.template.load("monitor/panelConfigForm.html",{
		field				: _this.panelConfigAttributeField,
		panelConfigFormRow	: panelConfigFormRow,
		colorConfigContents	: colorConfigContents
	});
	
	return html;
};

/**
 * @description 样式配置节点创建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} data 面板数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleConfigHtmlRow = function(data){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = "";
	
	if(typeof data == 'undefined'){
		data = {
			'condition' : _this.conditionArr[0],
			'number' : 0,
			'config' : '#FFFFFF'						
		};	
	}
	
	html = _obj.template.load("monitor/styleConfigRows.html",{
		conditionArr	: _this.conditionArr,
		condition		: data.condition,
		number			: data.number,
		config			: data.config
	});
	
	return html;
};

/**
 * @description 删除样式配置
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} o 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.monitor.deleteStyleConfigRow = function(o){
	$(o).parents('tr:eq(0)').remove();
};

/**
 * @description 添加一个样式配置节点
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} o 触发事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.monitor.addStyleConfigHtmlRow = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = _this.styleConfigHtmlRow({
		'condition' : _this.conditionArr[0],
		'number' : 0,
		'config' : '#FFFFFF'
	});
	
	var ul = $(o).parents('.row').find('table');
	ul.append(html);
	
	var dom = ul.find('.one:last').find('input[name=config]').get(0);
	_obj.model.colorpicke.show(dom);
};

/**
 * @description 样式配置页面构建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} data 样式配置数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleConfigHtml = function(data){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '',
		styleConfigRows = "";
	
	for(var i=0,k=data.length;i<k;i++){
		styleConfigRows += _this.styleConfigHtmlRow(data[i]);
	}
	
	html = _obj.template.load("monitor/styleConfigMain.html",{
		styleConfigRows : styleConfigRows
	});
	
	return html;
};

/**
 * @description 设置颜色条件面板显示
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.monitor.settingStyleConfigDisplay = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = $(obj).parents('tr.row').index() - 1;
	_obj.model.dialog.getObj().find('.color-config').find('.row').each(function(i){
		if( i == index ){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
};

/**
 * @description 上传监控面板
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj file 控件
 * @static
 */
uinv.FCM.configMgr.model.monitor.uploadPanel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var path = obj.value.split("\\");
	var fileName = path.pop();

	uinv.server.manager.frame.upAndUnZip(obj, fileName, function(result){
		if(result.success){
			result.data = _obj.model.string.varFixSub(result.data);
			
			var o = _obj.model.transform.str2obj(result.data);
			if( _obj.model.array.isArray(o) ){
				for(var i=0,k=o.length;i<k;i++){
					if(_this.checkModifyBody(o[i]) && typeof o[i].name === "string"){
						_this.uploadPanelHandle(o[i], fileName);
					}else{
						_obj.note.alert(_obj.msg.S37);
						break;
					}
				}
			}else{
				if(_this.checkModifyBody(o) && typeof o.name === "string"){
					_this.uploadPanelHandle(o, fileName);
				}else{
					_obj.note.alert(_obj.msg.S37);
				}
			}
		}else{
			_obj.note.alert(result.data);
		}
		
	});  
};

/**
 * @description 上传监控面板处理函数
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 监控数据
 * @param {String} fileName 文件名
 * @return {Boolean} false异常
 * @static
 */
uinv.FCM.configMgr.model.monitor.uploadPanelHandle = function(o, fileName){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var i = 0;
	
	o.imagePath = o.previewImagePath;
	
	var bool = true;
	
	var obj =  _this.nameFindPanel(o.name);
	
	if( obj ){
		bool = _obj.note.confirm(_obj.msg.F7(o.name));
	}
	
	if( obj && obj.modifyCount > o.modifyCount && typeof obj.form != "undefined" && obj.form.length == obj.modifyCount ){
		bool = _obj.note.confirm( _obj.msg.F10(obj.modifyCount-o.modifyCount) );
		if(bool){
			obj.form.splice(o.modifyCount, obj.modifyCount - o.modifyCount);	
		}
	}
	
	if(bool){
		o = _this.addPanelToMemory(o);
		uinv.server.manager.frame.cutGeneralFile( o.downloadFile , _this.getPanelZipPath(o) );
		uinv.server.manager.frame.cutGeneralFile( o.imagePath , _this.getPanelImagePath(o) );
		
		// 写入系统下载
		_obj.model.download.set({
			'url' : _this.getPanelZipPath(o),
			'local' : _this.pathToDir(o.image)
		});					
		
		_this.objHtml();
		_this.styleHtml();
		
		// 保存数据
		_obj.form.saveData();
		
		// 如果要删除的文件与新上传的面板同名，取消删除
		var path = _this.getPanelPath(o);
		for(i=0;i<_this.deleteFileArr.length;i++){
			if(_this.deleteFileArr[i] == path){
				_this.deleteFileArr.splice(i,1);
				i=0;
			}
		}
	}
};

/**
 * @description 全路径转路径
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} path 路径
 * @return {String} 路径
 * @example uinv.FCM.configMgr.model.monitor.pathToDir("/user/assf/asf.gif"); return  /user/assf
 * @static
 */
uinv.FCM.configMgr.model.monitor.pathToDir = function(path){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		dir = "",
		pathinfo = [];
	
	if(path.indexOf("/")>=0){
		pathinfo = path.split("/");
		pathinfo.pop();
		dir = pathinfo.join("/");
	}
	
	if(path.indexOf("\\")>=0){
		pathinfo = path.split("\\");
		pathinfo.pop();
		dir = pathinfo.join("\\");				
	}
	
	return dir;
};

/**
 * @description 根据面板配置信息获取监控面板主操作路径
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 面板数据
 * @return {String} 路径
 * @static
 */
uinv.FCM.configMgr.model.monitor.getPanelPath = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.global.path + '/Monitor/' + o.name ;			
};

/**
 * @description 根据面板数据获取面板图片路径
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 面板数据
 * @return {String} 路径
 * @static
 */
uinv.FCM.configMgr.model.monitor.getPanelImagePath = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.global.path + '/Monitor/' + o.name + '/' + o.imagePath;
};

/**
 * @description 根据面板数据获取zip路径
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 面板数据
 * @return {String} 路径
 * @static
 */
uinv.FCM.configMgr.model.monitor.getPanelZipPath = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.global.path + '/Monitor/' + o.name + '/download.zip';			
};

/**
 * @description 添加面板数据到内存
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} obj 面板数据
 * @return {Object} 初始设置后的面板数据
 * @static
 */
uinv.FCM.configMgr.model.monitor.addPanelToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(_this.nameFindPanel(obj.name)){
		
		var o = _this.nameFindPanel(obj.name);
		var index = _this.nameFindPanelIndex(obj.name);

		_this.obj.panel.splice( index, 1 ,obj );
	}else{
		_this.obj.panel.push(obj);
	}
	return obj;
};

/**
 * @description 检测面板是否被使用
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} name 面板名称
 * @return {Boolean} true 使用 false 没使用
 * @static
 */
uinv.FCM.configMgr.model.monitor.isUsePanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i].panel == name ){
			return true;
		}
	}
	return false;	
};

/**
 * @description 面板数据基本检测
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 面板数据
 * @return {Boolean} true 通过 false 不通过
 */
uinv.FCM.configMgr.model.monitor.checkBase = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	
};

/**
 * @description 检测面板数据modify配置项是否合法
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 面板数据
 * @return {Boolean} true 合法 false 不合法
 * @static
 */
uinv.FCM.configMgr.model.monitor.checkModifyBody = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var msg = [],
		error = false,
		i,j,k,
		bool = false;
	
	if(typeof o == 'undefined'){
		return false;
	}
	
	msg.push(_obj.msg.S28);
	
	for(i in o.modify){
		for(j in o.modify[i]){
			bool = false;
			
			for(k in _this.panelConfigAttributeField){	
				if( _this.panelConfigAttributeField[k].value == o.modify[i][j].attribute ){
					bool = true;
				}
			}
			
			if(!bool){
				error = true;
				msg.push(_obj.msg.F8(i, j, o.modify[i][j].attribute));
			}
			
			if( o.modify[i][j].row >=  o.modifyCount ){
				msg.push(_obj.msg.F9(i, j, o.modify[i][j].row ));
			}
		}
	}
	
	if(error){
		_obj.note.alert(msg.join("\n\r"));
		return false;
	}else{
		return true;
	}
};

/**
 * @description 删除监控面板<br />
 * 1) 内存删除<br />
 * 2) DOM删除
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} name 要删除面板的name值
 * @return {Boolean} false异常
 * @static
 */
uinv.FCM.configMgr.model.monitor.deletePanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = _this.isUsePanel(name);
	if( bool ){
		_obj.note.alert(_obj.msg.S27);
		return false;
	}
	
	if(_obj.note.confirm(_obj.msg.S29)){
		var obj = _this.nameFindPanel(name);
		_obj.model.download.del( _this.getPanelZipPath(obj) );
		_this.deleteFileArr.push( _this.getPanelPath(obj) );
		
		var index = _this.nameFindPanelIndex(name);
		if( index >= 0 ){
			_this.obj.panel.splice(index, 1);
			_this.objHtml();
			_this.styleHtml();
		}
	}
};

/**
 * @description 删除物体<br />
 * 1) 内存删除<br />
 * 2) DOM删除
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.monitor.deleteObject = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(_obj.note.confirm(_obj.msg.S29)){
		var index = _this.keyFindObjIndex(key);
		_obj.data.monitor.object.splice(index, 1);
		_this.objHtml();
	}
};

/**
 * @description 创建物体
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @static
 */
uinv.FCM.configMgr.model.monitor.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.selector.show(function(obj){
		
		var i, isExist = false;
		for(i=0; i<_obj.data.monitor.object.length; i++){
			if(obj.name === _obj.data.monitor.object[i].name){
				isExist = true;
			}
		}
		
		if(isExist){
			_obj.note.alert(_obj.msg.F11(obj.name));
		}else{
			_obj.model.selector.hide();
			
			var o = _this.addObjectToMemory(obj);
			_this.addHtmlRow(o);		
		}
	});
};

/**
 * @description 添加物体数据到内存
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} obj 物体数据
 * @return {Object} 初始化后的物体数据
 * @static
 */
uinv.FCM.configMgr.model.monitor.addObjectToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var key = "";
	
	do{
		key = _obj.model.key.create(10);
	}while(_this.keyFindObj(key));
	
	obj.key = key;
	obj.form = [];
	obj.config = {};
	_obj.data.monitor.object.push(obj);
	return obj;
};

/**
 * @description 根据key查找到物体索引值
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} key 物体key值
 * @return {Number} -1 找不到
 * @static
 */
uinv.FCM.configMgr.model.monitor.keyFindObjIndex = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i].key == key ){
			return i;
		}
	}
	return -1;				
};

/**
 * @description 根据key查找到物体数据
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} key 物体key值
 * @return {Boolean} false 表示找不到数据
 * @static
 */
uinv.FCM.configMgr.model.monitor.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i].key == key ){
			return  _obj.data.monitor.object[i];
		}
	}
	return false;
};

/**
 * @description 根据name值找到面板索引
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} name 面板name值
 * @return {Number} -1 表示找不到
 * @static
 */
uinv.FCM.configMgr.model.monitor.nameFindPanelIndex = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		if(  _this.obj.panel[i].name == name ){
			return i;
		}
	}
	return -1;				
};

/**
 * @description 根据name值找到面板数据
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {String} name 面板name值
 * @return {Boolean} false表示找不到
 * @static
 */
uinv.FCM.configMgr.model.monitor.nameFindPanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof _this.obj.panel == "undefined"){
		_this.obj.panel = [];
	}
	
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		if(  _this.obj.panel[i].name == name ){
			return _this.obj.panel[i];
		}
	}
	return false;				
};

/**
 * @description 物体面板选择下拉控件处理<br />
 * 1) 如果新选择的面板modifyCount跟上一个modifyCount不一致，将会删除物体config数据
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj 下拉控件节点
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.monitor.objSelectPanel = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var bool = true,
		panel = _this.keyFindObj(key).panel;

	if( panel && _this.nameFindPanel( _this.keyFindObj(key).panel ).modifyCount != _this.nameFindPanel( obj.value ).modifyCount ){
		bool = _obj.note.confirm(_obj.msg.F6(panel));
		if(bool){
			_this.keyFindObj(key).form = {};
		}
	}
	
	if(bool){
		_this.keyFindObj(key).panel = obj.value;
	}else{
		panel = _this.keyFindObj(key).panel;
		$(obj).find("option").each(function(){
			if($(this).val() == panel){
				this.selected = true;
			}else{
				this.selected = false;
			}
		});
	}
};

/**
 * @description 物体DOM创建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} obj 物体数据
 * @static
 */
uinv.FCM.configMgr.model.monitor.addHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = _this.objHtmlRow(obj);
	_obj.form.box.find(_this.objBoxClassStr).append(html);
	_obj.translate();
};

/**
 * @description 创建物体HTML文本
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} obj 物体数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.objHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	
	html = _obj.template.load("monitor/objMain.html",{
		panelArr	: _this.obj.panel,
		name		: obj.name,
		panel		: obj.panel,
		key			: obj.key
	});
	
	return html;
	
};

/**
 * @description 物体页面构建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @static
 */
uinv.FCM.configMgr.model.monitor.objHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		html += _this.objHtmlRow( _obj.data.monitor.object[i] );
	}
	
	_obj.form.box.find(_this.objBoxClassStr).find('tr:gt(0)').remove();
	_obj.form.box.find(_this.objBoxClassStr).append(html);
	_obj.translate();
};

/**
 * @description 物体重命名<br />
 * 1) 同时写内存
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj 触发事件DOM节点
 * @param {String} key 物体key值
 */
uinv.FCM.configMgr.model.monitor.objectRename = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var value = $(obj).html(),
		box = $(obj).parent(),
		html = box.html();
	
	box.html( _obj.template.load("input_text.html",{
		value	: value
	}) );
	
	box.find('input').focus().blur(function(){
		var value = $(this).val();
		box.html(html).find('a').html(value);
		_this.keyFindObj(key).name = value;
	}).keydown(function(evt){
		var e  = evt || window.event;
		if(e.keyCode==13){
			var value = $(this).val();
			box.html(html).find('a').html(value);
			_this.keyFindObj(key).name = value;
		}
	});
};

/**
 * @description 面板DOM创建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} obj 面板数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	
	html = _obj.template.load("monitor/panelTr.html", obj);
	
	return html;
};

/**
 * @description 面板页面构建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		html += _this.styleHtmlRow( _this.obj.panel[i] );
	}
	
	_obj.form.box.find(_this.styleBoxClassStr).find('tr:gt(0)').remove();
	_obj.form.box.find(_this.styleBoxClassStr).append(html);
	_obj.translate();
};

/**
 * @description 告警级别页面构建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @static
 */
uinv.FCM.configMgr.model.monitor.alarmLevelHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = "";
	
	if( typeof  _obj.data.monitor.alarm.alarmLevel == 'object' ){
		for(var i=0,k=_obj.data.monitor.alarm.alarmLevel.length;i<k;i++){
			html += _this.alarmLevelHtmlRow( _obj.data.monitor.alarm.alarmLevel[i] );
		}
	}
	_obj.form.box.find(_this.alarmlevelBoxClassStr).find('tr:gt(0)').remove();
	_obj.form.box.find(_this.alarmlevelBoxClassStr).append(html);
};

/**
 * @description 告警数据HTML创建
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} o 告警数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.alarmLevelHtmlRow = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	
	html = _obj.template.load("monitor/alarmLevelTr.html", o);
	
	return html;
};

/**
 * @description 删除告警级别
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.monitor.deleteAlarmLevelRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(_obj.note.confirm(_obj.msg.S29)){
		$(obj).parents('.row:eq(0)').remove();
	}
};

/**
 * @description 添加告警级别
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @static
 */
uinv.FCM.configMgr.model.monitor.addAlarmLevel = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var o = { 'name' : '', 'color' : '#FFF' };
	var html = _this.alarmLevelHtmlRow(o);
	_obj.form.box.find(_this.alarmlevelBoxClassStr).append(html);
	var dom = _obj.form.box.find(_this.alarmlevelBoxClassStr).find('.row:last').find('input[name=color]').get(0);
	_obj.model.colorpicke.show(dom);
};


/**
 * @description 检测是否有重复的告警等级
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.monitor.checkRepeatAlarmLevel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	$(".config-page").find(".config-top-submit").show();
	_obj.note.clearError();
	
	if($.trim(obj.value) === ""){
		_obj.note.showError(_obj.msg.S31);
		window.setTimeout(function(){
			obj.value = "";
			obj.focus();
		}, 200);
		$(".config-page").find(".config-top-submit").hide();
		return;
	}
	
	var arr = [], isExist = false;
	_obj.form.box.find(_this.alarmlevelBoxClassStr).find(".row").each(function(){
		var value = $.trim($(this).find("input[name=name]").val());
		if(_obj.model.array.inArray(value, arr)){
			isExist = true;
		}else{
			arr.push(value);
		}
	});

	if(isExist){
		_obj.note.showError(_obj.msg.S30);
		
		window.setTimeout(function(){
			obj.value = "";
			obj.focus();
		}, 200);
		
		$(".config-page").find(".config-top-submit").hide();
	}
};

/**
 * @description 初始化
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {Object} param 初始化参数
 * @static
 */
uinv.FCM.configMgr.model.monitor.init = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	_obj.form.submitCallback = function(){
		_obj.model.stringDB.set( _this.index, _this.obj );
		for(var i=0,k=_this.deleteFileArr.length;i<k;i++){
			uinv.server.manager.frame.delFile(_this.deleteFileArr[i]);
		}
	};
	
	_this.objBoxClassStr = param.objBox || '';
	_this.styleBoxClassStr = param.styleBox || '';
	_this.alarmlevelBoxClassStr = param.alarmlevelBox || '';
	_this.obj = _obj.model.stringDB.get( _this.index );
	_this.obj.panel = typeof _this.obj.panel == 'undefined' ? [] : _this.obj.panel;

	_this.objHtml();
	_this.styleHtml();
	_this.alarmLevelHtml();
};


// Add 2013-12-19

/**
 * @description 获取焦点触发
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.monitor.otherFocus = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	$(".config-top-submit").hide();
};

/**
 * @description 焦点离开触发
 * @memberOf uinv.FCM.configMgr.model.monitor
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.monitor.otherBlur = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var value = $.trim(obj.value);
	var r = /^(\d+)(\.\d+)?$/;
	if(!r.test(value)){
		_obj.note.alert(_obj.msg.S36);
		(function(obj){
			window.setTimeout(function(){ obj.focus(); }, 200);
		})(obj);
		
		$(".config-top-submit").hide();
	}else{
		$(".config-top-submit").show();
	}
};