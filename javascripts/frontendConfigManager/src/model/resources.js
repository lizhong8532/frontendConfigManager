

//-----------------------------------
// 基础定义
//-----------------------------------

/**
 * @description 上传资源文件夹定义
 * @type String
 */
uinv.FCM.configMgr.model.resources.upResourcesDir = "/projects/resources";

/**
 * @description 待删除文件<br />
 * 1) 主要解决用户执行删除资源后提交保存时删除遗留的文件<br />
 * 2) 最后还会二次判断确保没有正在被使用的资源文件
 * @type Array
 */
uinv.FCM.configMgr.model.resources.delFileArr = [];

/**
 * @description 资源模块盒型DOM节点的Class值
 * @type String
 */
uinv.FCM.configMgr.model.resources.resourcesManagerClass = 'resourcesManager';


//-----------------------------------
// 函数区
//-----------------------------------

/**
 * @description 根据传入参数设置某个资源的数据
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} key 资源key值
 * @param {Object} param 要设置的数据
 * @static
 */
uinv.FCM.configMgr.model.resources.setData = function(key, param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.data.resources[key] = {
		'serverPath' : param.serverPath,
		'localPath' : param.localPath,
		'version' : param.version
	};				
};

/**
 * @description 上传资源包后回调函数
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {Object} result 上传资源包处理结果
 * @static
 */
uinv.FCM.configMgr.model.resources.uploadResourcesFileCallback = function(result){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(result.success){
		var param = _this.getResourcesManagerFormData();
		if(param.type == 'update'){
			var version = Number(param.version) + 1;
			_this.setResourcesManagerFormData('version', version);
		}
		
		_this.resourcesManagerHandleCallback();
	}else{
		_this.note.alert(result.data);
	}
};
	
/**
 * @description 检测资源管理表单数据是否合法
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {Object} param 检测表单的数据
 * @return {Object} { error 1 有错误 0 没有错误, msg 错误信息 }
 * @static
 */
uinv.FCM.configMgr.model.resources.checkForm = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	
	var result = {
		'error' : 0,
		'msg'   : []
	};
	
	if( typeof param.title == 'undefined' || param.title === "" ){
		result.error = 1;
		result.msg.push(_obj.msg.S13);
	}
	
	if( typeof param.serverPath == 'undefined' || param.serverPath === "" ){
		result.error = 1;
		result.msg.push(_obj.msg.S14);
	}
	
	if( typeof param.version == 'undefined' || param.version === "" ){
		result.error = 1;
		result.msg.push(_obj.msg.S15);
	}	

	if( typeof param.localPath == 'undefined' || param.localPath === "" ){
		result.error = 1;
		result.msg.push(_obj.msg.S16);
	}
	
	if( param.type == 'create' && ( typeof param.resourcesFile == 'undefined' || param.resourcesFile === "" ) ){
		result.error = 1;
		result.msg.push(_obj.msg.S17);
	}
	
	return result;
};

/**
 * @description 资源表单处理回调函数
 * @memberOf uinv.FCM.configMgr.model.resources
 * @static
 */
uinv.FCM.configMgr.model.resources.resourcesManagerHandleCallback = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var param = _this.getResourcesManagerFormData();

	if( typeof _obj.data.resources[param.originalTitle] != 'undefined' ){
			delete _obj.data.resources[param.originalTitle];
	}
	
	_this.setData(param.title, param);
	
	// 关闭窗口
	_this.resourcesManagerClose();
	
	_this.mkhtml();
};	

/**
 * @description 创建新资源处理函数
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {Object} obj 要创建资源的数据
 * @return {Boolean} 如果表单有错误将return false 终止后面操作
 * @static
 */
uinv.FCM.configMgr.model.resources.handleResourcesManager = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var param = _this.getResourcesManagerFormData();
	var res = _this.checkForm(param);
	
	if( res.error ){
		_obj.note.alert( res.msg.join("\r\n") );
		return false;
	}
	
	if( param.resourcesFile !== "" ){
		var pathinfo = _this.pathToFileNameAndFoder( param.serverPath  ); 
		
		if( ( param.type=='create' && _this.serverPathFindObj(param.serverPath) ) || 
				( param.type=='update' && _this.serverPathFindObj(param.serverPath) && 
				_obj.data.resources[param.originalTitle].serverPath != param.serverPath )  ){
			_obj.note.alert(_obj.msg.F3(pathinfo.filename));
			return false;
		}
		
		var bool = true;
	
		if(param.type=='create' && param.title in _obj.data.resources){
			bool = _obj.note.confirm( _obj.msg.F4(param.title) );
			if(bool){
				_this.delFileArr.push(_obj.data.resources[param.title].serverPath);
			}else{
				return false;	
			}
		}
		
		if( param.type=='create' || (param.type=='update' && param.serverPath != _obj.data.resources[param.originalTitle].serverPath ) ){
			var result = uinv.server.manager.frame.isFileExist(param.serverPath);	
			if(result.data){
				bool = _obj.note.confirm( _obj.msg.F5(pathinfo.filename) );
				if(!bool){
					return;
				}
			}		
		}
		
		if(param.type=='update' && _obj.data.resources[param.originalTitle].serverPath != param.serverPath ){
			_this.delFileArr.push(_obj.data.resources[param.originalTitle].serverPath);
		}
		
		uinv.server.manager.frame.upFile(
			param.resourcesObj,
			pathinfo.foder,
			pathinfo.filename,
			function(result){ _this.uploadResourcesFileCallback(result); }
		);				
	}else{
		_this.resourcesManagerHandleCallback();
	}
};

/**
 * @description 根据服务器路径查找资源
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} path 路径
 * @return {Object} 如果返回null表示找不到
 * @static
 */
uinv.FCM.configMgr.model.resources.serverPathFindObj = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i in _obj.data.resources){
		if(_obj.data.resources[i].serverPath == path){
			return _obj.data.resources[i];
		}
	}
	return null;
};

/**
 * @description 根据路径 返回 foder filename
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} path 路径
 * @return {Object} {filename:文件名 , foder: 路径名}
 * @example var pathinfo = uinv.FCM.configMgr.model.resources.pathToFileNameAndFoder("/public/foder/filename.js");
 * @static
 */
uinv.FCM.configMgr.model.resources.pathToFileNameAndFoder = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var result = {};
	
	if( typeof path == 'string' ){
		var pathinfo = path.split('/');
		result.filename = pathinfo[pathinfo.length-1];
		pathinfo.pop();
		if(pathinfo.length >= 1){
			result.foder = pathinfo.join('/') + '/';
		}else{
			result.foder = '';
		}
	}else{
		result.filename = '';
		result.foder = '';
	}
	
	return result;
};
	

/**
 * @description 资源管理器关闭
 * @memberOf uinv.FCM.configMgr.model.resources
 * @static
 */
uinv.FCM.configMgr.model.resources.resourcesManagerClose = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
	_obj.form.saveData();
};

/**
 * @description 创建资源管理表单DOM节点<br />
 * 1) key 存在表示修改操作<br />
 * 2) key 为空表示创建操作
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {Stirng} key 要操作的资源key值
 * @return {Boolean} 有异常则return false 终止操作
 * @static
 */
uinv.FCM.configMgr.model.resources.resourcesManager = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(key && typeof _obj.data.resources[key] == 'undefined'){
		_this.note.alert( _obj.msg.S10 );
		return false;
	}
	
	var title = key || '';
	var type = key ? 'update' : 'create' ;
	var data = _this.keyFindObj(key);
	
	var html = '';
	html += '<div class="'+_this.resourcesManagerClass+'" style="width:400px; height:200px; padding:10px;">';
		html += '<p style="margin:10px auto 0;"><span><s>资源名称</s></span><input type="text" original="'+title+'" name="title" value="'+title+'" /></p>';
		html += '<p style="margin:10px auto 0; display:none;"><span><s>服务器目录</s></span><input type="text" original="'+data.serverPath+'" name="serverPath" value="'+data.serverPath+'" /></p>';
		html += '<p style="margin:10px auto 0;"><span><s>本地目录</s></span><input type="text" name="localPath" value="'+data.localPath+'" /></p>';
		html += '<p style="margin:10px auto 0;"><span><s>版本</s></span><input type="text" name="version" value="'+data.version+'" readonly /></p>';
		html += '<p style="margin:10px auto 0;"><span><s>资源包</s></span><input type="file" name="resourcesFile" /></p>';
		html += '<input type="hidden" name="type" value="'+type+'" />';
		html += '<p class="action">';
			html += '<input type="button" class="btn_cancel" onclick="uinv.FCM.configMgr.model.dialog.close();" />';
			html += '<input type="button" class="btn_save" onclick="uinv.FCM.configMgr.model.resources.handleResourcesManager(this);" />';
		html += '</p>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
};

/**
 * @description 根据key找到对象，如果key不存在，则返回空对象
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} key 资源key值
 * @return {Object} 资源数据
 * @static
 */
uinv.FCM.configMgr.model.resources.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var obj = {};
	if( typeof key == 'undefined' || typeof _obj.data.resources[key] == 'undefined' ){
		obj = {
			'title' : '',
			'serverPath' : _this.upResourcesDir,
			'localPath' : '',
			'version' : 1
		};	
	}else{
		obj = _obj.data.resources[key];
	}
	
	return obj;
};

/**
 * @description 获取资源管理器表单数据
 * @memberOf uinv.FCM.configMgr.model.resources
 * @return {Object} 表单数据
 * @static
 */
uinv.FCM.configMgr.model.resources.getResourcesManagerFormData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var box = _obj.model.dialog.getObj().find( '.' + _this.resourcesManagerClass );
	
	// 固定目录
	if( box.find('input[name=resourcesFile]').val() !== "" ){
		var pathinfo = box.find('input[name=resourcesFile]').val().split("\\");
		box.find('input[name=serverPath]').val( _this.upResourcesDir + "/" + pathinfo[pathinfo.length-1] );		
	}
	// END		
	
	return {
		'title' : $.trim(box.find('input[name=title]').val()),
		'originalTitle' : box.find('input[name=title]').attr('original'),
		'serverPath' : $.trim(box.find('input[name=serverPath]').val()),
		'originalServerPath' : box.find('input[name=serverPath]').attr('original'),
		'localPath' : $.trim(box.find('input[name=localPath]').val()),
		'resourcesFile' : $.trim(box.find('input[name=resourcesFile]').val()),
		'resourcesObj' : box.find('input[name=resourcesFile]').get(0),
		'version' : $.trim(box.find('input[name=version]').val()),
		'type' : box.find('input[name=type]').val()	
	};
};

/**
 * @description 根据name值设置表单数据
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} key 表单name值
 * @param {String} value 表单值
 * @static
 */
uinv.FCM.configMgr.model.resources.setResourcesManagerFormData = function(key,value){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var box = _obj.model.dialog.getObj().find( '.' + _this.resourcesManagerClass );
	box.find('input[name='+key+']').val(value);
};

/**
 * @description 创建资源标签页DOM节点
 * @memberOf uinv.FCM.configMgr.model.resources
 * @static
 */
uinv.FCM.configMgr.model.resources.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i in _obj.data.resources){
		html += '<tr>';
			html += '<td>' + i + '</td>';
			html += '<td><a href="'+ _obj.global.projectPath +_obj.data.resources[i].serverPath+'" target="_blank" title="'+u.le.get("点击下载")+'">' + _obj.data.resources[i].serverPath + '</a></td>';
			html += '<td>' + _obj.data.resources[i].localPath + '</td>';
			html += '<td>' + _obj.data.resources[i].version + '</td>';
			html += '<td>';
				html += '<a onclick="uinv.FCM.configMgr.model.resources.delResource(\''+i+'\');" href="javascript:void(0);"><s>删除</s></a>';
			html += '</td>';
			html += '<td>';
				html += '<a onclick="uinv.FCM.configMgr.model.resources.resourcesManager(\''+i+'\');" href="javascript:void(0);"><s>更新</s></a>';
			html += '</td>';
		html += '</td>';
	}
	_obj.form.box.find(_this.classStr).find('tr:gt(0)').remove();
	_obj.form.box.find(_this.classStr).append( html );
	_obj.translate();
};
		
/**
 * @description 删除资源
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} key 要删除的资源key值
 * @return {Boolean} 如果取消操作则return false 终止后面的操作
 * @static
 */
uinv.FCM.configMgr.model.resources.delResource = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = _obj.note.confirm( _obj.msg.S18 );
	if(!bool){
		return false;
	}
	 
	if( typeof _obj.data.resources[key] != 'undefined'  ){
		//_this.delFileArr.push(_obj.data.resources[key].serverPath);
		uinv.server.manager.frame.delFile( _obj.data.resources[key].serverPath );
		delete _obj.data.resources[key];
	}

	_this.mkhtml();
	_obj.form.saveData();
};

/**
 * @description 备份接口<br />
 * 1) 这个接口名为规范定义<br />
 * 2) 当用户备份数据时将从这个接口获取额外需要打包备份的文件<br />
 * 3) 此函数遍历所有资源获取所有资源路径后返回作为额外备份文件
 * @memberOf uinv.FCM.configMgr.model.resources
 * @return {Array} 路径列表
 * @static
 */
uinv.FCM.configMgr.model.resources.backupFiles = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var files = [];
	for(var i in _obj.data.resources){
		files.push( _obj.data.resources[i].serverPath );
	}
	
	return files;
};

/**
 * @description 初始化
 * @memberOf uinv.FCM.configMgr.model.resources
 * @param {String} classStr 资源盒型DOM的Class值
 * @static
 */
uinv.FCM.configMgr.model.resources.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	_obj.form.submitCallback = function(){
		while( _this.delFileArr.length >= 1 ){
			var path = _this.delFileArr.pop(); 
			uinv.server.manager.frame.delFile(path);
		}
	};
	
	_this.classStr = classStr || '.resources-list';
	_this.mkhtml();
};