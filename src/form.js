
//----------------------------------------------------
// 基础定义
//----------------------------------------------------

/**
 * @description 生成表单数据 后面可以初始改写
 * @type Array
 */
uinv.FCM.configMgr.form.createFormData = [];

/**
 * @description name轮询记录
 * @type Array
 */
uinv.FCM.configMgr.form.nameInit =  [];

/**
 * @description 数据源对象
 * @type Object
 */
uinv.FCM.configMgr.form.obj = null;

/**
 * @description 当前加载模块的jQuery对象
 * @type Object
 */
uinv.FCM.configMgr.form.box = null;

/**
 * 
 * @description 系统保留data关键字
 * @type Array
 */
uinv.FCM.configMgr.form.keywords = ["download","layer","monitor","panel","resources","statistics","viewpoint"];

/**
 * @description 特殊样式类型
 * @type Array
 */
uinv.FCM.configMgr.form.specialType = ["line","title"];

//------------------------------------------
// 函数区
//------------------------------------------

/**
 * @description 判断类型是不是属于特殊类型
 * @param {String} type 类型
 * @return {Boolean} true 特殊 false 非特殊
 */
uinv.FCM.configMgr.form.inSpecialType = function(type){
	var _this = this;
	var i,k;
	for(i=0,k=_this.specialType.length; i<k; i++){
		if(_this.specialType[i] == type){
			return true;
		}
	}
	
	return false;
};

/**
 * @description 根据组获取所有项
 * @memberOf uinv.FCM.configMgr.form
 * @param {String} groupName 组名
 * @return {Array} 列表
 */
uinv.FCM.configMgr.form.tabFindItem = function(tabName){
	var _this = this;
	var arr = [];
	for( var i=0,k=_this.createFormData.length;i<k;i++ ){
		if( _this.createFormData[i].tab == tabName ){
			arr.push( _this.createFormData[i] );
		}
	}
	
	return arr;
};

/**
 * @description 检测表单数据是否占用系统保留关键字
 * @memberOf uinv.FCM.configMgr.form
 * @return {Boolean} true 占用 false 不占用
 * @static
 */
uinv.FCM.configMgr.form.checkFormKeyword = function(){
	var _obj = uinv.FCM.configMgr;	
	var _this = this;
	
	for( var n=0,m=_this.createFormData.length;n<m;n++ ){
		for(var i=0,k=_this.keywords.length; i<k; i++){
			if( _this.createFormData[n].group === _this.keywords[i] ){
				return true;
			}
		}
	}
	
	return false;
};

/**
 * @description 根据表单数据创建构建表单页面
 * @memberOf uinv.FCM.configMgr.form
 * @param {Array} o {dom:生成网页后加载的盒子，tab:标签页数据} 表单数据
 * @return {Boolean} return false 占用关键字
 * @static 
 */
uinv.FCM.configMgr.form.createHtml = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	o.data = _this.tabFindItem(o.tab);

	var html = "";
	for(var i=0,k=o.data.length;i<k;i++){
		if( typeof _this.createTypeHtml[o.data[i].type] == 'function' ){
			html += _this.createTypeHtml[o.data[i].type]( o.data[i]  );
		}
	}
	
	o.dom.html(html);
};

/**
 * @description 根据表单数据初始化DATA
 * @memberOf uinv.FCM.configMgr.form
 * @return {Boolean} return false 占用关键字
 * @static 
 */
uinv.FCM.configMgr.form.initFormDataToData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var o = _this.createFormData;
	
	if( _this.checkFormKeyword() ){
		_obj.note.alert( _obj.msg.S25 );
		return false;
	}
	
	for(var i=0,k=o.length;i<k;i++){
		
		// 特殊类型过滤掉
		if(_this.inSpecialType(o[i].type)){
			continue;
		}
		
		if(typeof o[i].itemkey == "undefined"){
			o[i].itemkey = "";
		}

		// 赋值
		if(typeof _obj.data[o[i].group] == "undefined"){
			_obj.data[o[i].group] = {};
		}	
		
		if( typeof _obj.data[o[i].group][o[i].name] == 'undefined' ){
			_obj.data[o[i].group][o[i].name] = o[i].defaultValue;
		}
	}
};

/**
 * @description 装载页面<br />
 * 1) 如果异常将显示404
 * @memberOf uinv.FCM.configMgr.form
 * @param {Object} param { page:页面名称, obj:页面DOM对象 }
 * @static
 */
uinv.FCM.configMgr.form.load = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.box  = param.obj || $('.config-load');
	_this.box.load(
		_obj.global.viewsPath + param.page + '?' + Date.parse(new Date()),
		function(response, status, xhr) {
			if ( status == "success" ){	
				_this.init();
				$('.config-submit-btn').show();
			}else{
				$(this).load(_obj.global.errorPage);
			}

			uinv.FCM.configMgr.translate();
		}
	);
};

/**
 * @description 提交表单到服务器存储
 * @memberOf uinv.FCM.configMgr.form
 * @static
 */
uinv.FCM.configMgr.form.submit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.nameInit = [];
	
	_this.box.find('*[name][cate][path]').each(function(){
		if( typeof _this.setValue[$(this).attr('cate')] == 'function' ){
			_this.setValue[$(this).attr('cate')](this);
		}
	});
	
	// submit save to service
	uinv.server.manager.frame.saveFrameConfig( uinv.util.toJSON( _obj.data ) , function(result){
		_obj.note.dialog(result.data);
		
		if(result.success && typeof _this.submitCallback == 'function'){
			_this.submitCallback();
		}
	});
	
	// 调用回调函数
	for(i=0, k=_this.createFormData.length; i<k; i++){
		if(typeof _this.createFormData[i].callback === 'function'){
			_this.createFormData[i].callback(_this.createFormData[i]);
		}
	}	
};

/**
 * @description 保存文本数据，包括副数据
 * @memberOf uinv.FCM.configMgr.form
 * @static
 */
uinv.FCM.configMgr.form.saveData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	uinv.server.manager.frame.saveFrameConfig( uinv.util.toJSON( _obj.data ) , function(result){
		if(result.success && typeof _this.submitCallback == 'function'){
			_this.submitCallback();
		}
	}); 
};

/**
 * @description 判断这个name是否是第一次轮询
 * @memberOf uinv.FCM.configMgr.form
 * @param {String} name 控件name值
 * @return {Boolean} true 第一次轮询 false 不是第一次轮询
 * @static
 */
uinv.FCM.configMgr.form.isNameFirstEach = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( _obj.model.array.inArray(name, _this.nameInit) ){
		return false;
	}
	
	return true;
};

/**
 * @description 初始化
 * @memberOf uinv.FCM.configMgr.form
 * @static
 */
uinv.FCM.configMgr.form.init = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	
	_this.box.find('*[name][cate]').each(function(){
		if( typeof _this.type[$(this).attr('cate')] == 'function' ){
			_this.type[$(this).attr('cate')](this);
		}
	});
	
	
	_obj.translate();
};
