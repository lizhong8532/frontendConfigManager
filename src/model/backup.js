
 
//----------------------------------------------
// 基础定义
//----------------------------------------------

/**
 * @description 所有可用备份模块定义
 * 1) 如果这里定义到模块表示可以备份
 * 2) 没有定义到的模块则不能备份
 * 3) DATA值的是数据索引声明，这和程序内部定义有关
 * @type Array
 */
uinv.FCM.configMgr.model.backup.model = {
	'视角' : { 'model' : 'viewpoint' , 'data' : 'viewpoint'  },
	'监控' : { 'model' : 'monitor' , 'data' : 'monitor'  },
	'图层' : { 'model' : 'layer' , 'data' : 'layer' },
	'面板' : { 'model' : 'panel' , 'data' : 'panel' },
	'资源' : { 'model' : 'resources' , 'data' : 'resources' },
	'统计' : { 'model' : 'statistics', 'data' : 'statistics' },
	'选择' : { 'model' : 'selector', 'data' : 'selector' },
	// '系统' : { 'data' : 'system' },
	// '布局' : { 'data' : 'layout' },
	'下载' : { 'data' : 'download' }
};

/**
 * @description 备份的模块
 * 1) 这个列表里有哪项就会备份哪一项
 * 2) 备份的时候也可以通过改写此列表项达到按需备份
 * 3) 也作为一个后续通过勾选功能块备份相应模块的一个拓展
 * 4) 目前暂时写死
 * @type Array
 */
uinv.FCM.configMgr.model.backup.backModel =  [
	'视角','图层','资源','下载','监控',
	// '系统','布局',
	'统计','选择','面板'
];

/**
 * @description 备份时需要额外备份的文件夹路径
 * 1) 备份程序会根据各个模块提供的路径统一记录在这个列表内
 * 2) 也作为默认
 * @type Array
 */
uinv.FCM.configMgr.model.backup.folders = [];

/**
 * @description 备份时需要额外备份的文件夹文件
 * 1) 备份程序会根据各个模块提供的路径统一记录在这个列表内
 * 2) 也作为默认
 * @type Array
 */
uinv.FCM.configMgr.model.backup.files = [];

/**
 * @description 需要备份的文本数据
 * 1) 将把所有配置信息转字符串改写此值
 * @type String
 */
uinv.FCM.configMgr.model.backup.text = '';


//----------------------------------------------
// 函数区
//----------------------------------------------

/**
 * @description 初始化数据备份基础数据
 * @memberOf uinv.FCM.configMgr.model.backup
 * @static
 */
uinv.FCM.configMgr.model.backup.initData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.folders = [];
	_this.files = [];
	_this.text = '';
};

/**
 * @description 更新文件备份记录列表
 * @memberOf uinv.FCM.configMgr.model.backup
 * @static
 */
uinv.FCM.configMgr.model.backup.updateFileArr = function(){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		n = 0,
		arr = [];
	
	_this.initData();
	
	// 添加全局路径
	_this.folders.push(_obj.global.path);
	
	for(var i=0,k=_this.backModel.length;i<k;i++){
		if( typeof _this.model[_this.backModel[i]].model != 'undefined' && typeof _obj.model[_this.model[_this.backModel[i]].model].backupFiles == 'function'  ){					
			arr =  _obj.model[_this.model[_this.backModel[i]].model].backupFiles();
			for(n=0,m=arr.length;n<m;n++){
				_this.files.push(arr[n]);
			}
		}
		
		if( typeof _this.model[_this.backModel[i]].model != 'undefined' && typeof _obj.model[_this.model[_this.backModel[i]].model].backupFolders == 'function'  ){					
			arr =  _obj.model[_this.model[_this.backModel[i]].model].backupFolders();
			for(n=0,m=arr.length;n<m;n++){
				_this.folders.push(arr[n]);
			}
		}
	}
};

/**
 * @description 更新备份文本数据值
 * @memberOf uinv.FCM.configMgr.model.backup
 * @static
 */
uinv.FCM.configMgr.model.backup.updateText = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// Fixes #6 解决数据时空的时候，返回undefined
	var con = _obj.model.transform.str2obj( uinv.server.manager.frame.getFrameConfig().data );
	var str = _obj.model.transform.str2obj( uinv.server.manager.frame.getString().data );
	
	var o = { 
		'config' : typeof con === "object" ? _obj.model.object.clone(con) : {} ,
		'string' : typeof con === "object" ? _obj.model.object.clone(str) : {}
	};
	
	var backObj = {
		'config' : {},
		'string' : {}
	};
	
	for(var i=0,k=_this.backModel.length;i<k;i++){ 
		if( typeof _this.model[_this.backModel[i]].data != 'undefined' && typeof o.config[_this.model[_this.backModel[i]].data] != 'undefined' ){
			backObj.config[_this.model[_this.backModel[i]].data] = o.config[_this.model[_this.backModel[i]].data];
		}
		
		if( typeof _this.model[_this.backModel[i]].data != 'undefined' && typeof o.string[_this.model[_this.backModel[i]].data] != 'undefined' ){
			backObj.string[_this.model[_this.backModel[i]].data] = o.string[_this.model[_this.backModel[i]].data];
		}					
	}
	
	_this.text = _obj.model.transform.obj2str( backObj );
};

/**
 * @description 配置数据与文件打包
 * @memberOf uinv.FCM.configMgr.model.backup
 * @see uinv.server.manager.frame.placeZip()
 * @param {DOM} obj 配置按钮DOM节点
 * @static
 */
uinv.FCM.configMgr.model.backup.configCompression = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	$(obj).css('left','8888888px').parent().find('span').html(_obj.msg.S2);
	
	_this.updateFileArr();
	_this.updateText();
	
	uinv.server.manager.frame.placeZip( _this.text, _this.folders, _this.files, function(result){
		if(result.success){
			document.location = _obj.global.projectPath + result.data;
			$(obj).css('left','0').parent().find('span').html(_obj.msg.S1);
		}else{
			_obj.note.alert(result.data);
		}
	});
};

/**
 * @description 上传备份压缩包
 * @memberOf uinv.FCM.configMgr.model.backup
 * @param {DOM} obj file DOM 节点
 * @return {Boolean} 返回false数据格式有误
 * @static
 */
uinv.FCM.configMgr.model.backup.configUpload = function(obj){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		o = null,
		path = obj.value.split('\\'),
		bool = false,
		arr = [],
		fileName = path.pop();
		
	arr = fileName.split(".");	
	if(arr[arr.length-1] != 'zip'){
		_obj.note.alert(_obj.msg.S3);
		return false;
	}
	
	bool = _obj.note.confirm(_obj.msg.F1(fileName));
	if(!bool){
		return false;
	}
	
	uinv.server.manager.frame.upAndUnZip(obj, fileName, function(result){
		
		if(result.success){
			try{
				o = _obj.model.transform.str2obj(result.data);
			}catch(e){
				_obj.note.alert(_obj.msg.S4);
				return false;
			}
			
			_this.setData(o);
		}else{
			_obj.note.alert(result.data);
		}
	});
	
};

/**
 * @description 把上传的数据写入库
 * @memberOf uinv.FCM.configMgr.model.backup
 * @param {Object} o 上传备份的数据
 * @static
 */
uinv.FCM.configMgr.model.backup.setData = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var i = 0;

	// Fixes #6 解决数据时空的时候，返回undefined
	var con = _obj.model.transform.str2obj( uinv.server.manager.frame.getFrameConfig().data );
	var str = _obj.model.transform.str2obj( uinv.server.manager.frame.getString().data );
	
	var obj = { 
		'config' : typeof con === "object" ? _obj.model.object.clone(con) : {} ,
		'string' : typeof con === "object" ? _obj.model.object.clone(str) : {}
	};
	
	if( typeof o.config == 'object' ){
		for(i in o.config){
			obj.config[i] = _obj.model.object.clone( o.config[i] );
		}
	}
	
	if( typeof o.string == 'object' ){
		for(i in o.string){
			obj.string[i] = _obj.model.object.clone( o.string[i] );
		}
	}				
	
	uinv.server.manager.frame.saveFrameConfig( _obj.model.transform.obj2str(obj.config) );
	uinv.server.manager.frame.saveString( _obj.model.transform.obj2str(obj.string), false);
	_this.updateConfig(obj);
};

/**
 * @description 更新备份数据
 * @memberOf uinv.FCM.configMgr.model.backup
 * @param {Object} o 上传备份的数据
 * @static
 */
uinv.FCM.configMgr.model.backup.updateConfig = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	
	_obj.data = _obj.model.object.clone(o.config);
	
	// Fixes #7 解决备份的数据与form初始数据不一致时出错bug
	_obj.form.initFormDataToData();
	
	_obj.form.init();
};