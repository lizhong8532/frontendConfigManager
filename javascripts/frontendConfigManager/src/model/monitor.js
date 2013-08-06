/**
 * @description 监控模块
 */

//---------------------------------------------------------
// 基础定义
//---------------------------------------------------------

/**
 * @deprecated 所有使用条件下拉的条件列表
 * @type Array
 */
uinv.FCM.configMgr.model.monitor.conditionArr = ['<','>','='];

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
	{ 'name' : '指标名称', 'value' : 'attributeName', 'type' : 'string' },
	{ 'name' : '单位', 'value' : 'unit', 'type' : 'string' },
	{ 'name' : '指标取值', 'value' : 'propertyPath', 'type' : 'string'},
	{ 'name' : '最小值', 'value' : 'min', 'type' : 'number'},
	{ 'name' : '最大值', 'value' : 'max', 'type' : 'number'},
	{ 'name' : '进度条', 'value' : 'isProgressBar', 'type' : 'boolean' },
	{ 'name' : '颜色设置', 'value' : 'styleConfig', 'type' : 'styleConfig' }
];


//--------------------------------------------
// 函数区
//--------------------------------------------


/**
 * @description 获取position的select列表
 * @method getSelectOptionHtml
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
			html += '<option value="'+_this.position[position][i].value+'" selected>'+_this.position[position][i].name+'</option>';
		}else{
			html += '<option value="'+_this.position[position][i].value+'">'+_this.position[position][i].name+'</option>';
		}
	}
	
	return html;
};

/**
 * @description 打开监控配置
 * @method configShow
 * @param {String} key 物体key值
 * @return {Boolean} 如果物体没有选择面板则return false终止操作
 * @static
 */
uinv.FCM.configMgr.model.monitor.configShow = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var o = _this.keyFindObj(key);
	var panel = _this.nameFindPanel(o.panel);
	if(!panel){
		return false;
	}
	
	var imgSrc =  _obj.global.projectPath + _this.getPanelImagePath(panel) ;
	
	var html = '';
	html += '<div class="monitor">';
		html += '<div class="monitor_warp">';
			html += '<div class="monitor_name"><span><s>面板图片</s></span><img src="'+imgSrc+'" /></div>';
				html += '<div class="monitor_set">';
				
					var tmps = typeof o.config.pivotLayout  == 'undefined' ? panel.pivotLayout : o.config.pivotLayout ;
					html += '<div class="each"  key="pivotLayout" cate="array">';
						html += '<span class="monitor_setname"><s>二维位置</s></span>';
						for(var i=0,tmp=['x','y','z'];i<tmp.length;i++){ 
							if(i==tmp.length-1){
								html += '<span>';
									html += '<select name="pivotLayout" style="display:none;">'+_this.getSelectOptionHtml(tmp[i], tmps[i])+'</select>';
								html += '</span>';
							}else{
								html += '<span>';
									html += '<select name="pivotLayout">'+_this.getSelectOptionHtml(tmp[i], tmps[i])+'</select>';
								html += '</span>';
							}
						}
					html += '</div>';
					
					var tmps = typeof o.config.layout  == 'undefined' ? panel.layout : o.config.layout;
					html += '<div class="each" key="layout" cate="array">';
						html += '<span class="monitor_setname"><s>三维位置</s></span>';
						for(var i=0,tmp=['x','y','z'];i<tmp.length;i++){ 
							html += '<span>';
								html += '<select name="layout">'+_this.getSelectOptionHtml(tmp[i], tmps[i])+'</select>';
							html += '</span>';
						}
					html += '</div>';
					
					var tmps = typeof o.config.layoutOffset == 'undefined' ? panel.layoutOffset : o.config.layoutOffset ;
					html += '<div class="each" key="layoutOffset" cate="array">';
						html += '<span class="monitor_setname"><s>偏移设置</s></span>';
						html += '<span>';
							html += '<input type="text" name="layoutOffset" value="'+tmps[0]+'" /> m ';
						html += '</span>';
						html += '<span>';
							html += '<input type="text" name="layoutOffset" value="'+tmps[1]+'" /> m ';
						html += '</span>';
						html += '<span>';
							html += '<input type="text" name="layoutOffset" value="'+tmps[2]+'" /> m ';
						html += '</span>';
					html += '</div>';
					
					var tmps = typeof o.config.canvasScale == 'undefined' ? panel.canvasScale : o.config.canvasScale ;
					html += '<div class="each" key="canvasScale" cate="number">';
						html += '<span class="monitor_setname"><s>面板大小</s></span>';
						html += '<span class="monitor_zoom">';
							html += '<input type="text" name="canvasScale" value="'+tmps+'" />';
						html += '</span>';
					html += '</div>';
				html += '</div>';
			html += '</div>';
		html += '<div class="each" key="form" cate="form">';
			html += _this.panelConfigFormHtml(panel,o);
		html += '</div>';
		
		html += '<div class="config-submit-btn"><input class="btn_save" onclick="uinv.FCM.configMgr.model.monitor.configHide(\''+o.panel+'\',\''+key+'\');" /></div>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
	
	_obj.model.dialog.getObj().find('.color-config').find('input[name=config]').each(function(){
		_obj.model.colorpicke.show(this);
	});
};

/**
 * @description 隐藏监控配置窗口
 * @method configHide
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
 * @method synchronousFormData
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
 * @method panelConfigFormHtml
 * @param {Object} panel 面板数据
 * @param {Object} o 物体配置数据
 * @return {String} 创建HTML文本
 * @static
 */
uinv.FCM.configMgr.model.monitor.panelConfigFormHtml = function(panel,o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	html += '<table class="monitor_table">';
		html += '<tr>';
			for(var i=0,k=_this.panelConfigAttributeField.length;i<k;i++){
				html += '<th>'+ _this.panelConfigAttributeField[i].name +'</th>';
			}
		html += '</tr>';
		
		for(var n=0;n<panel.modifyCount;n++){
			html += '<tr class="row">';
				for(var i=0,k=_this.panelConfigAttributeField.length;i<k;i++){
					html += '<td>'+ _this.configTypeToHtml[_this.panelConfigAttributeField[i].type]( _this.panelConfigAttributeField[i], o.form[n] ) +'</td>';
				}							
			html += '</tr>';
		}
		
		
	html += '</table>';
	html += '<div class="color-config">';
		for(var n=0;n<panel.modifyCount;n++){
			var param = [];
			if(typeof o.form[n] == 'object' && typeof o.form[n].styleConfig == 'object'){
				param = o.form[n].styleConfig;
			}
			html += _this.styleConfigHtml( param );
		}
	html += '</div>';
	
	return html;
};

/**
 * @description 样式配置节点创建
 * @method styleConfigHtmlRow
 * @param {Object} data 面板数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleConfigHtmlRow = function(data){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(typeof data == 'undefined'){
	
		var data = {
			'condition' : _this.conditionArr[0],
			'number' : 0,
			'config' : '#FFFFFF'						
		};	
	}
	
	var html = '';
	
	html += '<tr class="one" style="list-style:none;">';
		html += '<td>';
			html += '<select name="condition" cate="string">';
				for(var i=0,k=_this.conditionArr.length;i<k;i++){
					if(data.condition == _this.conditionArr[i]){
						html += '<option value="'+_this.conditionArr[i]+'" selected>'+_this.conditionArr[i]+'</option>';
					}else{
						html += '<option value="'+_this.conditionArr[i]+'">'+_this.conditionArr[i]+'</option>';
					}
				}		
			html += '</select>';
		html += '</td>';
		
		html += '<td>';
			html += '<input type="text" name="number" cate="number" value="'+data.number+'" />';
		html += '</td>';
		
		html += '<td>';
			html += '<input type="text" name="config" cate="color" value="'+data.config+'" />';
		html += '</td>';
		
		html += '<td>';
			html += '<a onclick="uinv.FCM.configMgr.model.monitor.deleteStyleConfigRow(this);" href="javascript:void(0);"><s>删除</s></a>';
		html += '</td>';
	html += '</tr>';
	return html;
};

/**
 * @description 删除样式配置
 * @method deleteStyleConfigRow
 * @param {DOM} o 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.monitor.deleteStyleConfigRow = function(o){
	$(o).parents('tr:eq(0)').remove();
};

/**
 * @description 添加一个样式配置节点
 * @method addStyleConfigHtmlRow
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
 * @method styleConfigHtml
 * @param {Object} data 样式配置数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleConfigHtml = function(data){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	
	html += '<div class="row" style="display:none;">';
		html += '<div class="monitor_twarp">';
			html += '<table class="monitor_table">';
				html += '<tr>';
					html += '<th><s>条件</s></th>';
					html += '<th><s>数值</s></th>';
					html += '<th><s>颜色</s></th>';
					html += '<th><s>操作</s></th>';
				html += '</tr>';
				for(var i=0,k=data.length;i<k;i++){
					html += _this.styleConfigHtmlRow(data[i]);
				}
			html += '</table>';
		html += '</div>';
		html += '<div class="action" style="margin-bottom:10px;">';
			html += '<input type="button" class="btn_add" onclick="uinv.FCM.configMgr.model.monitor.addStyleConfigHtmlRow(this);" />';
		html += '</div>';
	html += '</div>';

	return html;
};

/**
 * @description 设置颜色条件面板显示
 * @method settingStyleConfigDisplay
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
 * @method uploadPanel
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
			var o = _obj.model.transform.str2obj(result.data);
			if( _obj.model.array.isArray(o) ){
				for(var i=0,k=o.length;i<k;i++){
					_this.uploadPanelHandle(o[i], fileName);
				}
			}else{
				_this.uploadPanelHandle(o, fileName);
			}
		}else{
			_obj.note.alert(result.data);
		}
		
	});  
};

/**
 * @description 上传监控面板处理函数
 * @method uploadPanelHandle
 * @param {Object} o 监控数据
 * @param {String} fileName 文件名
 * @return {Boolean} false异常
 * @static
 */
uinv.FCM.configMgr.model.monitor.uploadPanelHandle = function(o, fileName){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	o.imagePath = o.previewImagePath;
	
	if(!_this.checkModifyBody(o)){
		return false;
	}
	
	var bool = true;
	
	var obj =  _this.nameFindPanel(o.name);
	
	if( obj ){
		bool = _obj.note.confirm('面板'+o.name+'应经存在，是否要覆盖？');
	}
	
	if( obj && obj.modifyCount > o.modifyCount && typeof obj.form != "undefined" && obj.form.length == obj.modifyCount ){
		var msg = "";
		msg = "您上传的新面板modifyCount比原面板modifyCount小\r\n";
		msg += "将要删除原面板配置信息的最后"+(obj.modifyCount-o.modifyCount)+"行配置\r\n";
		msg += "内容为：\r\n";
		
		var arr = [];
		for(var i=o.modifyCount;i<obj.modifyCount;i++){
			arr.push(obj.form[i]);
		}
		msg += _obj.model.transform.obj2str( arr );
		
		bool = _obj.note.confirm(msg);
		
		if(bool){
			obj.form.splice(o.modifyCount, obj.modifyCount - o.modifyCount);	
		}
	}
	
	if(bool){
		var o = _this.addPanelToMemory(o);
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
		for(var i=0;i<_this.deleteFileArr.length;i++){
			if(_this.deleteFileArr[i] == path){
				_this.deleteFileArr.splice(i,1);
				i=0;
			}
		}
	}
};

/**
 * @description 全路径转路径
 * @method pathToDir
 * @param {String} path 路径
 * @return {String} 路径
 * @example uinv.FCM.configMgr.model.monitor.pathToDir("/user/assf/asf.gif"); return  /user/assf
 * @static
 */
uinv.FCM.configMgr.model.monitor.pathToDir = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var dir = "";
	
	if(path.indexOf("/")>=0){
		var pathinfo = path.split("/");
		pathinfo.pop();
		dir = pathinfo.join("/");
	}
	
	if(path.indexOf("\\")>=0){
		var pathinfo = path.split("\\");
		pathinfo.pop();
		dir = pathinfo.join("\\");				
	}
	
	return dir;
};

/**
 * @description 根据面板配置信息获取监控面板主操作路径
 * @method getPanelPath
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
 * @method getPanelImagePath
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
 * @method getPanelZipPath
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
 * @method addPanelToMemory
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
 * @method isUsePanel
 * @param {String} name 面板名称
 * @return {Boolean} true 使用 false 没使用
 * @static
 */
uinv.FCM.configMgr.model.monitor.isUsePanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i]['panel'] == name ){
			return true;
		}
	}
	return false;	
};

/**
 * @description 加测面板数据modify配置项是否合法
 * @method checkModifyBody
 * @param {Object} o 面板数据
 * @return {Boolean} true 合法 false 不合法
 * @static
 */
uinv.FCM.configMgr.model.monitor.checkModifyBody = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof o == 'undefined'){
		return false;
	}
	
	var msg = "上传失败\r\n";
	var error = false;
	
	for(var i in o.modify){
		for(var j in o.modify[i]){
			var bool = false;
			
			for(var k in _this.panelConfigAttributeField){	
				if( _this.panelConfigAttributeField[k].value == o.modify[i][j].attribute ){
					bool = true;
				}
			}
			
			if(!bool){
				error = true;
				msg +=  i +" -> " + j + " -> attribute " + o.modify[i][j].attribute + " 字段不存在 \r\n";
			}
			
			if( o.modify[i][j].row >=  o.modifyCount ){
				msg += i +" -> " + j + " -> row : " + o.modify[i][j].row + " 超出modifyCount的值 \r\n";
			}
		}
	}
	
	if(error){
		_obj.note.alert(msg);
		return false;
	}else{
		return true;
	}
};

/**
 * @description 删除监控面板
 * 1) 内存删除
 * 2) DOM删除
 * @method deletePanel
 * @param {String} name 要删除面板的name值
 * @return {Boolean} false异常
 * @static
 */
uinv.FCM.configMgr.model.monitor.deletePanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = _this.isUsePanel(name);
	if( bool ){
		_obj.note.alert('删除面板错误：这个面板正在使用，请先解除使用后再删除。');
		return false;
	}
	
	var obj = _this.nameFindPanel(name);
	_obj.model.download.del( _this.getPanelZipPath(obj) );
	_this.deleteFileArr.push( _this.getPanelPath(obj) );
	
	var index = _this.nameFindPanelIndex(name);
	if( index >= 0 ){
		_this.obj.panel.splice(index, 1);
		_this.objHtml();
		_this.styleHtml();
	}
};

/**
 * @description 删除物体
 * 1) 内存删除
 * 2) DOM删除
 * @method deleteObject
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.monitor.deleteObject = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.keyFindObjIndex(key);
	_obj.data.monitor.object.splice(index, 1);
	_this.objHtml();
};

/**
 * @description 创建物体
 * @method createObject
 * @static
 */
uinv.FCM.configMgr.model.monitor.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.selector.show(function(obj){
		_obj.model.selector.hide();
		
		var o = _this.addObjectToMemory(obj);
		_this.addHtmlRow(o);
	});
};

/**
 * @description 添加物体数据到内存
 * @method addObjectToMemory
 * @param {Object} obj 物体数据
 * @return {Object} 初始化后的物体数据
 * @static
 */
uinv.FCM.configMgr.model.monitor.addObjectToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	do{
		var key = _obj.model.key.create(10);
	}while(_this.keyFindObj(key));
	
	obj.key = key;
	obj.form = [];
	obj.config = {};
	_obj.data.monitor.object.push(obj);
	return obj;
};

/**
 * @description 根据key查找到物体索引值
 * @method keyFindObjIndex
 * @param {String} key 物体key值
 * @return {Number} -1 找不到
 * @static
 */
uinv.FCM.configMgr.model.monitor.keyFindObjIndex = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i]['key'] == key ){
			return i;
		}
	}
	return -1;				
};

/**
 * @description 根据key查找到物体数据
 * @method keyFindObj
 * @param {String} key 物体key值
 * @return {Boolean} false 表示找不到数据
 * @static
 */
uinv.FCM.configMgr.model.monitor.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i]['key'] == key ){
			return  _obj.data.monitor.object[i];
		}
	}
	return false;
};

/**
 * @description 根据name值找到面板索引
 * @method nameFindPanelIndex
 * @param {String} name 面板name值
 * @return {Number} -1 表示找不到
 * @static
 */
uinv.FCM.configMgr.model.monitor.nameFindPanelIndex = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		if(  _this.obj.panel[i]['name'] == name ){
			return i;
		}
	}
	return -1;				
};

/**
 * @description 根据name值找到面板数据
 * @method nameFindPanel
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
		if(  _this.obj.panel[i]['name'] == name ){
			return _this.obj.panel[i];
		}
	}
	return false;				
};

/**
 * @description 物体面板选择下拉控件处理<br />
 * 1) 如果新选择的面板modifyCount跟上一个modifyCount不一致，将会删除物体config数据
 * @method objSelectPanel
 * @param {DOM} obj 下拉控件节点
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.monitor.objSelectPanel = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = true;
	if( _this.nameFindPanel( _this.keyFindObj(key)['panel'] ).modifyCount != _this.nameFindPanel( obj.value ).modifyCount ){
		bool = _obj.note.confirm("此操作将会删除原"+_this.keyFindObj(key)['panel']+"的配置信息，是否要继续操作？");
		if(bool){
			_this.keyFindObj(key).form = {};
		}
	}
	
	if(bool){
		_this.keyFindObj(key)['panel'] = obj.value;
	}else{
		var panel = _this.keyFindObj(key)['panel'];
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
 * @method addHtmlRow
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
 * @method objHtmlRow
 * @param {Object} obj 物体数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.objHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	html += '<tr key="'+obj.key+'">';
		html += '<td class="name">';
			html += '<a onclick="uinv.FCM.configMgr.model.monitor.objectRename(this,\''+obj.key+'\');" href="javascript:void(0);">'+obj.name+'</a>';
		html += '</td>';
		
		html += '<td>';
			html += '<select onchange="uinv.FCM.configMgr.model.monitor.objSelectPanel(this,\''+obj.key+'\');">';
				html += '<option value="">'+u.le.get('请选择面板')+'</option>';
				for(var i=0,k=_this.obj.panel.length;i<k;i++){
					if( typeof obj.panel != 'undefined' && obj.panel == _this.obj.panel[i]['name'] ){
						html += '<option value="'+_this.obj.panel[i]['name']+'" selected>'+_this.obj.panel[i]['caption']+'</option>';
					}else{
						html += '<option value="'+_this.obj.panel[i]['name']+'">'+_this.obj.panel[i]['caption']+'</option>';
					}
				}
			html += '</select>';
		html += '</td>';
		html += '<td><a onclick="uinv.FCM.configMgr.model.monitor.configShow(\''+obj.key+'\');" href="javascript:void(0);"><s>编辑</s></a></td>';
		html += '<td><a onclick="uinv.FCM.configMgr.model.monitor.deleteObject(\''+obj.key+'\');" href="javascript:void(0);"><s>删除</s></a></td>';
	html += '</tr>';
	return html;
	
};

/**
 * @description 物体页面构建
 * @method objHtml
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
 * @description 物体重命名
 * 1) 同时写内存
 * @param {DOM} obj 触发事件DOM节点
 * @param {String} key 物体key值
 */
uinv.FCM.configMgr.model.monitor.objectRename = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var value = $(obj).html();
	var box = $(obj).parent();
	var html = box.html();
	
	box.html( '<input type="text" value="'+value+'" />' );
	box.find('input').focus().blur(function(){
		var value = $(this).val();
		box.html(html).find('a').html(value);
		_this.keyFindObj(key)['name'] = value;
	}).keydown(function(evt){
		var e  = evt || window.event;
		if(e.keyCode==13){
			var value = $(this).val();
			box.html(html).find('a').html(value);
			_this.keyFindObj(key)['name'] = value;
		}
	});
};

/**
 * @description 面板DOM创建
 * @method styleHtmlRow
 * @param {Object} obj 面板数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.styleHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var html = '';
	html += '<tr key="'+obj.name+'">';
		html += '<td class="name">'+obj.caption+'</td>';
		html += '<td>' +obj.des+ '</td>';
		//html += '<td><a href="javascript:void(0);"><s>上传</s></a></td>';
		html += '<td><a onclick="uinv.FCM.configMgr.model.monitor.deletePanel(\''+obj.name+'\');" href="javascript:void(0);"><s>删除</s></a></td>';
	html += '</tr>';
	return html;
};

/**
 * @description 面板页面构建
 * @method styleHtml
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
 * @method alarmLevelHtml
 * @static
 */
uinv.FCM.configMgr.model.monitor.alarmLevelHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof  _obj.data.monitor.alarm.alarmLevel == 'object' ){
		var html = '';
		for(var i=0,k=_obj.data.monitor.alarm.alarmLevel.length;i<k;i++){
			html += _this.alarmLevelHtmlRow( _obj.data.monitor.alarm.alarmLevel[i] );
		}
	}
	_obj.form.box.find(_this.alarmlevelBoxClassStr).find('tr:gt(0)').remove();
	_obj.form.box.find(_this.alarmlevelBoxClassStr).append(html);
};

/**
 * @description 告警数据HTML创建
 * @method alarmLevelHtmlRow
 * @param {Object} o 告警数据
 * @return {String} HTML
 * @static
 */
uinv.FCM.configMgr.model.monitor.alarmLevelHtmlRow = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	html += '<tr class="row">';
		html += '<td>';
			html += '<input type="text" name="name" value="'+o.name+'" />';
		html += '</td>';
		html += '<td>';
			html += '<input type="text" name="color" value="'+o.color+'" />';
		html += '</td>';
		html += '<td>';
			html += '<a onclick="uinv.FCM.configMgr.model.monitor.deleteAlarmLevelRow(this);" href="javascript:void(0);"><s>删除</s></a>';
		html += '</td>';
	html += '</tr>';
	return html;
};

/**
 * @description 删除告警级别
 * @method deleteAlarmLevelRow
 * @param {DOM} obj 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.monitor.deleteAlarmLevelRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('.row:eq(0)').remove();
};

/**
 * @description 添加告警级别
 * @method addAlarmLevel
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
 * @description 初始化
 * @constructor init()
 * @param {Object} param 初始化参数
 * @static
 */
uinv.FCM.configMgr.model.monitor.init = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = 	function(){
		_obj.model.stringDB.set( _this.index, _this.obj );
		for(var i=0,k=_this.deleteFileArr.length;i<k;i++){
			uinv.server.manager.frame.delFile(_this.deleteFileArr[i]);
		}
	};
	
	_this.objBoxClassStr = param['objBox'] || '';
	_this.styleBoxClassStr = param['styleBox'] || '';
	_this.alarmlevelBoxClassStr = param['alarmlevelBox'] || '';
	_this.obj = _obj.model.stringDB.get( _this.index );
	_this.obj.panel = typeof _this.obj.panel == 'undefined' ? [] : _this.obj.panel;

	_this.objHtml();
	_this.styleHtml();
	_this.alarmLevelHtml();
};