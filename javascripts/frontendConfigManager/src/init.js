
/**
 * @description 初始化
 */

/**
 * @description 初始化
 * @constructor init()
 * @static
 */
uinv.FCM.configMgr.init = function(){
	var _this = this;
	
	// 请求服务器获取对象
	uinv.server.manager.frame.getFrameConfig(function(result){
		if( result.success && result.data ){
			var data = _this.model.transform.str2obj(result.data);
			_this.model.object.coverObj( data, uinv.FCM.configMgr.data );
		}
	});
	
	// 添加目录
	uinv.ui.manager.navBar.config['menu-config'] =  './views/config/index.html';
	
	// 加载选择器数据
	_this.model.selector.obj = _this.model.stringDB.get( _this.model.selector.index );
	
	// 项目路径
	var path = window.document.location.pathname.split('/');
	path.pop();
	_this.global.projectPath = path.join('/');
};
