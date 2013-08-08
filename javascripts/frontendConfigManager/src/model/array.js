

/**
 * @description 判断字符串是否在数组里<br />
 * 1) 这里判断使用普通相等，并非全等
 * @memberOf uinv.FCM.configMgr.model.array
 * @param {String} str 查找字符串
 * @param {Array} arr 被查找数组
 * @return {Boolean}
 * @static
 */
uinv.FCM.configMgr.model.array.inArray = function(str, arr){
	for(var i = 0 ,k = arr.length; i<k ;i++){
		
		// 这里使用 相等 而非 全等
		if(str == arr[i]){
			return true;
		}
	}
	return false;
};

/**
 * @description 判断字符串在数组中的索引<br />
 * 1) 从第一个元素开始匹配<br />
 * 2) 匹配到字符串后将返回当前index，不在查找后面的数组项<br />
 * 3) 使用普通相等判断，并非全等<br />
 * 4) 如果遍历数组到最后一项仍没有查找到结果将返回 -1
 * @memberOf uinv.FCM.configMgr.model.array
 * @param {String} str 
 * @param {Array} arr
 * @return {Number} 索引 -1 表示字符串不在数组中
 * @static
 */
uinv.FCM.configMgr.model.array.strInArrayIndex = function(str, arr){
	for(var i = 0 ,k = arr.length; i<k ;i++){
		
		// 这里使用 相等 而非 全等
		if(str == arr[i]){
			return i;
		}
	}
	return -1;			
};

/**
 * @description 判断object是否是数组类型
 * @memberOf uinv.FCM.configMgr.model.array
 * @param {Object} o 要判断的Object
 * @return {Boolean} true 数组	false 非数组
 * @static
 */
uinv.FCM.configMgr.model.array.isArray = function(o){
	return o instanceof Array;
};