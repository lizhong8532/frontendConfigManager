
//-----------------------------------------------
// 公共定义
//-----------------------------------------------


/**
 * @description 模板缓存
 * @type Object
 */
uinv.FCM.configMgr.template.cache = {};

/**
 * @description 缓存开启
 * @type Boolean
 */
uinv.FCM.configMgr.template.cacheEnable = true;

/**
 * @description 模板公用路径
 * @type String
 */
uinv.FCM.configMgr.template.publicPath = "./javascripts/frontendConfigManager/templates";


//----------------------------------------------
// 函数区
//----------------------------------------------

/**
 * @description 获取装载
 * @memberOf uinv.FCM.configMgr.template
 * @param {String} tpl 模板路径
 * @return {String} 模板内容
 */
uinv.FCM.configMgr.template.get = function(tpl){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		path = "",
		result;
	
	if( tpl.substring(0,1) != "/" ){
		tpl = "/" + tpl;
	}
	
	path = _this.publicPath + tpl;
	
	if(_this.cacheEnable && (path in _this.cache) ){
		result = _this.cache[path];
	}else{
		result = $.ajax({ url: path, async: false });
		if( result.readyState === 4 &&  result.status === 200  ){
			
			if(_this.cacheEnable){
				_this.cache[path] = $.trim(result.responseText);
			}
			
			result = $.trim(result.responseText);
			
		}else{
			_obj.note.alert(result.statusText);
			throw new Error(result.statusText);
		}
	}
	
	return result;
};

/**
 * @description 模板处理主函数
 * @param {String} tpl 模板路径
 * @param {Object} data 模板数据
 * @return {String} 替换后的模板内容
 */
uinv.FCM.configMgr.template.load = function(tpl, data){
	var _obj = uinv.FCM.configMgr,
		_this = this;

	return Handlebars.compile(_this.get(tpl))(data);
};

