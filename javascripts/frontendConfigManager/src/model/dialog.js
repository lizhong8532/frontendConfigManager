/**
 * @description dialog
 */
 
/**
 * @description dialog DOM 节点ID值
 * 1) 实际上这里只是一个声明
 * 2) 每次创建一个dialog都会把最新的ID改写此定义
 * @type String
 */
uinv.FCM.configMgr.model.dialog.id = '';

/**
 * @description dialog 创建函数
 * 1) str 可以是一串字符 or HTML格式，宽高度自动计算并居中
 * 2) 你也可以外包一层div赋值width height决定dialog的宽高
 * @method show
 * @param {String} str 字符串或者HTML格式字符
 * @static
 */
uinv.FCM.configMgr.model.dialog.show = function(str){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.id = _obj.model.key.create(10);
	
	var html = '';
	html += '<div class="config-dialog-bg config-dialog-bg-'+_this.id+'"></div>';
	html += '<div class="config-dialog config-dialog-'+_this.id+'" style="display:none;">'+str+'</div>';
	
	$('body').css('position','relative').append(html);
	
	var $obj = $('.config-dialog-'+_this.id);

	$obj.css({
		'margin-left':'-'+parseInt($obj.outerWidth()/2,10)+'px',
		'margin-top':'-'+parseInt($obj.outerHeight()/2,10)+'px'
	}).show();
	
	_obj.translate();
};

/**
 * @description 关闭dialog操作
 * @method close
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.dialog.close = function(fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$('.config-dialog-'+_this.id).remove();
	$('.config-dialog-bg-'+_this.id).remove();
	$('.config-dialog').remove();
	$('.config-dialog-bg').remove();
	_this.id = '';
	
	if ( typeof fun == 'function' ) {
		fun.apply(_this);
	} else if( fun ) {
		eval( fun + '()' );
	}
};

/**
 * @description 获取dialog的DOM节点
 * 1) 如果节点不存在会返回null，比如在没有创建dialog的情况调用此方法就会返回null， 因为页面中就不存dialog的DOM节点
 * @method getObj
 * @return {DOM} dialog DOM节点
 * @static
 */
uinv.FCM.configMgr.model.dialog.getObj = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return $('.config-dialog-'+_this.id);
};