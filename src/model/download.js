
 
/**
 * @description 根据路径查找的数据
 * @memberOf uinv.FCM.configMgr.model.download
 * @param {String} path 路径
 * @return {Object} 返回null表示查找不到
 * @static
 */
uinv.FCM.configMgr.model.download.pathFindObj = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.download.length;i<k;i++){
		if( _obj.data.download[i].url == path ){
			return _obj.data.download[i];
		}
	}
	
	return null;
};

/**
 * @description 根据路径查找到数据的索引值
 * @memberOf uinv.FCM.configMgr.model.download
 * @param {String} path 路径
 * @return {Number} 返回-1表示查找不到
 * @static
 */
uinv.FCM.configMgr.model.download.pathFindIndex = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.download.length;i<k;i++){
		if( _obj.data.download[i].url == path ){
			return i;
		}
	}
	
	return -1;				
};

/**
 * @description 更新download数据 (修改or添加)
 * @memberOf uinv.FCM.configMgr.model.download
 * @param {Object} o 要跟新或添加的数据
 * @static
 */
uinv.FCM.configMgr.model.download.set = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.pathFindIndex(o.url);
	if(index>=0){
		var obj = _this.pathFindObj(o.url);
		o.version = obj.version + 1;
		_obj.data.download.splice(index,1,o);
	}else{
		o.version = 1;
		_obj.data.download.push(o);
	}
};

/**
 * @description 删除下载信息
 * @memberOf uinv.FCM.configMgr.model.download
 * @param {String} path 要删除的路径
 * @static
 */
uinv.FCM.configMgr.model.download.del = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.pathFindIndex(path);
	_obj.data.download.splice(index,1);
};
