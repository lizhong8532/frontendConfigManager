/**
 * @description object操作
 */

/**
 * @description 比较两个对象是否完全相等
 * @method o2o 
 * @param {Object} o1 对象1
 * @param {Object} o2 对象2
 * @return {Boolean} true 相等 false 不相等
 * @static
 */
uinv.FCM.configMgr.model.object.o2o = function(o1,o2){
	
	var _obj = uinv.FCM.configMgr;
	var _this = this;	

	if(typeof o1 != typeof o2){
		return false;	
	}

	if(typeof o1.length != typeof o2.length ){
		return false;	
	}

	var bool = true;

	for(var i in o1){
		if(i in o2){
			if(typeof o1[i] == 'object' ){
				bool = _this.o2o(o1[i],o2[i]);	
			}else if(o1[i] !== o2[i] ){
				bool = false;	
			}

		}else{
			bool = false;	
		}
	}	

	for(var i in o2){
		if(i in o1){
			if(typeof o2[i] == 'object' ){
				bool = _this.o2o(o2[i],o1[i]);	
			}else if(o2[i] !== o1[i] ){
				bool = false;	
			}
		}else{
			bool = false;	
		}			
	}
	
	return bool;
};

/**
 * @description 从一个对象覆盖另一个对象
 * @method coverObj
 * @param {Object} formobj 源对象
 * @param {Object} toobj 目标对象
 * @static
 */
uinv.FCM.configMgr.model.object.coverObj = function( formobj, toobj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i in formobj){
		if(typeof(toobj[i]) == 'undefined'){
			toobj[i] = formobj[i];
		}else{
			if( typeof formobj[i] == 'object' ){
				_this.coverObj( formobj[i], toobj[i] );
			}else{
				toobj[i] = formobj[i];
			}	
		}
	}
};

			
/**
 * @description 深度克隆对象
 * @method clone
 * @param {Object} obj 要克隆的对象
 * @return {Object} 克隆的对象
 * @static
 */
uinv.FCM.configMgr.model.object.clone = function(obj) {
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = _this.clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = _this.clone(obj[attr]);
        }
        return copy;
    }

    _obj.note.alert(_obj.msg.S12);
};

/**
 * @description 判断传入的参数是不是object 主要用于区别是数组还是对象
 * @method isObject
 * @param {Object} o 判断的参数
 * @return {Boolean} true 是对象 false 不是对象
 * @static
 */
uinv.FCM.configMgr.model.object.isObject = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return o instanceof Object;
};