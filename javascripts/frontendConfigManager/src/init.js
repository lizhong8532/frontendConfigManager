

/**
 * @description 可视化配置系统初始化
 * @memberOf uinv.FCM.configMgr
 * @static
 */
uinv.FCM.configMgr.init = function(){
	
	var _this = this;
	
	// Fixes #1
	// 请求服务器获取对象
	var result = uinv.server.manager.frame.getFrameConfig();
	
	if( result.success && result.data ){
		var data = _this.model.transform.str2obj(result.data);
		_this.model.object.coverObj( data, uinv.FCM.configMgr.data );
	}
		
	// 检测表单生成数据
	uinv.FCM.configMgr.form.initFormDataToData();		
		
	// 添加目录
	uinv.ui.manager.navBar.config['menu-config'] =  './views/config/index.html';
	
	// 加载选择器数据
	_this.model.selector.obj = _this.model.stringDB.get( _this.model.selector.index );
	
	// 项目路径
	var path = window.document.location.pathname.split('/');
	path.pop();
	_this.global.projectPath = path.join('/');
	
};
