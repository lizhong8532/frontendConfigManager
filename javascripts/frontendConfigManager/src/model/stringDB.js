/**
 * @description 字符串数据存储模块
 */


/**
 * @description 读取文本数据
 * @method readString
 * @see uinv.server.manager.frame.getString()
 * @return {Object} 读取结果
 * @static
 */
uinv.FCM.configMgr.model.stringDB.readString = function(){
	return uinv.server.manager.frame.getString();
};

/**
 * @description 写入文本数据
 * @method writeString
 * @see uinv.server.manager.frame.saveString()
 * @param {String} str 文本数据
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.stringDB.writeString = function(str, fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;				
	uinv.server.manager.frame.saveString(str, false, function(result){
		if(result.success){
			if(typeof fun == 'function'){
				fun.apply(_this);
			}
		}else{
			_obj.note.alert(result.data);
		}
	});
};

/**
 * @description 索引文本数据并返回索引的Object
 * @method get
 * @param {String} index 索引
 * @return {Object} 索引的Object
 * @static
 */
uinv.FCM.configMgr.model.stringDB.get = function(index){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var result = _this.readString();
	if(result.success){
		try{
			var obj = _obj.model.transform.str2obj(result.data);
			if(typeof(obj[index]) == "undefined"){
				return {};
			}else{
				return  obj[index];
			}
		}catch(e){
			return {};
		}

	}else{
		_obj.note.alert('stringDB.get() : ' + result.data);
		return {};
	}
};

/**
 * @description 根据索引把Object信息转字符串写入文本数据存储
 * @method set
 * @param {String} index 索引
 * @param {Object} obj 要存储的数据
 * @param {Function} fun 回调函数
 * @return {Boolean} 如果object失效则return false终止后面的操作
 * @static
 */
uinv.FCM.configMgr.model.stringDB.set = function( index , obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if( typeof obj == 'undefined' ) { 
		return false;
	};

	var result = _this.readString();
	var db = {};
	if(result.success){
		if(result.data){
			db = _obj.model.transform.str2obj(result.data);
		}

		db[index] = obj;
		var str = _obj.model.transform.obj2str(db);
		_this.writeString( str, fun );
	}else{
		alert(result.data);
	}
};