/**
 * @description 表单模块
 */


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


//------------------------------------------
// 函数区
//------------------------------------------


/**
 * @description 根据组获取所有项
 * @method groupFindItem
 * @param {String} groupName 组名
 * @return {Array} 列表
 */
uinv.FCM.configMgr.form.groupFindItem = function(groupName){
	var _this = this;
	var arr = [];
	for( var i=0,k=_this.createFormData.length;i<k;i++ ){
		if( _this.createFormData[i].group == groupName ){
			arr.push( _this.createFormData[i] );
		}
	}
	
	return arr;
};

/**
 * @description 根据表单数据创建构建表单页面
 * @method createHtml
 * @param {Array} o 表单数据
 * @static 
 */
uinv.FCM.configMgr.form.createHtml = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	o.data = _this.groupFindItem(o.group);
	
	var html = "";
	for(var i=0,k=o.data.length;i<k;i++){
		
		if(typeof o.data[i].itemkey == "undefined"){
			 o.data[i].itemkey = "";
		}

		// 赋值
		if(typeof _obj.data[o.data[i].group] == "undefined"){
			_obj.data[o.data[i].group] = {};
		}	
		
		if( typeof _obj.data[o.data[i].group][o.data[i].name] == 'undefined' ){
			_obj.data[o.data[i].group][o.data[i].name] = o.data[i].defaultValue;
		}
		
		if( typeof _this.createTypeHtml[o.data[i].type] == 'function' ){
			html += _this.createTypeHtml[o.data[i].type]( o.data[i]  );
		}

	}
	
	o.dom.html(html);
};

/**
 * @description 装载页面
 * 1) 如果异常将显示404
 * @method load
 * @param {Object} param { page:页面名称, obj:页面DOM对象 }
 * @static
 */
uinv.FCM.configMgr.form.load = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.box  = param.obj || $('.config-load');
	_this.box.load(
	    param.page + '?' + Date.parse(new Date()),
	    function(response, status, xhr) {
	    	if ( status=="success" ){	
				_this.init();
				$('.config-submit-btn').show();
	    	}else{
				$(this).load('./views/config/404.html');
	    	}
	    	
	    	uinv.FCM.configMgr.translate();
	    }
	);
};

/**
 * @description 提交表单到服务器存储
 * @method submit
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
		
		if(result['success'] && typeof _this.submitCallback == 'function'){
			_this.submitCallback();
		}
	}); 
};

/**
 * @description 保存文本数据，包括副数据
 * @method saveData
 * @static
 */
uinv.FCM.configMgr.form.saveData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	uinv.server.manager.frame.saveFrameConfig( uinv.util.toJSON( _obj.data ) , function(result){
		if(result['success'] && typeof _this.submitCallback == 'function'){
			_this.submitCallback();
		}
	}); 
};

/**
 * @description 判断这个name是否是第一次轮询
 * @method isNameFirstEach
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
 * @constructor init
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
