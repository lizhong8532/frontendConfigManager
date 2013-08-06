/**
 * @description key
 */
 
 
/**
 * @description 生成key的字符范围
 * @type Array
 */
uinv.FCM.configMgr.model.key.str = [
	'a','b','c','d','e','f','g','h','i','j','k','l','m',
	'o','p','q','r','s','t','x','u','v','y','z','w','n',
	'0','1','2','3','4','5','6','7','8','9'
];

/**
 * @description 生成范围间随机数
 * @method randint
 * @param {Number} n 最小值
 * @param {Number} m 最大值
 * @return {Number} 随机数
 * @static
 */
uinv.FCM.configMgr.model.key.randint = function(n,m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
};

/**
 * @description 生成随机字符
 * @method randStr
 * @return {String} 字符
 * @static
 */
uinv.FCM.configMgr.model.key.randStr = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var leng = _this.str.length - 1;
	var randkey = _this.randint(0, leng);
	return _this.str[randkey];
};

/**
 * @description 生成随机字符串
 * 1) 默认10个长度
 * @method create
 * @param {Number} len 长度
 * @return {String} 字符串
 * @static
 */
uinv.FCM.configMgr.model.key.create = function(len){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var l = len || 10;
	var str = '';
	
	for(var i = 0 ; i<l ; i++){
		str += _this.randStr();
	}

	return str;
};