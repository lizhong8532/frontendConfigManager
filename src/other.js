

/**
 * @description 把条件名称转换为规范规范名称
 * @memberOf uinv.FCM.configMgr.other
 * @param {Object} o 数据
 * @return {Object} 返回转换后的数据
 * @static
 */
uinv.FCM.configMgr.other.conditionReplaceName = function(o){
			
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i in o){
		switch(i){
			case 'classid' :
				o.REGTYPE_CLASSID = o[i];
				delete o[i];
				break;
			case 'name' :
				o.REGTYPE_OBJECT = o[i];
				delete o[i];
				break;
			case 'attribute' :
				o.REGTYPE_ATTRIBUTE = {};
				for(var n=0,m=o[i].length;n<m;n++){
					o.REGTYPE_ATTRIBUTE[o[i][n].key] =  o[i][n].value;
				}
				delete o[i];
				break;	
			case 'fun' :
				o.REGTYPE_FUNCTION = o[i];
				delete o[i];
				break;
		}
	}
	
	return o;
};

/**
 * @description 限制只能输入数字
 * @memberOf uinv.FCM.configMgr.other
 * @static
 */
uinv.FCM.configMgr.other.inputNumber = function(event){
	var value = $.trim(this.value);
	var r = /^(-?\\d+)(\\.\\d+)?$/;
	if(!r.test(value)){
		return false;
	}else{
		return true;
	}
};