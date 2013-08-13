
//---------------------------------
// 基础定义
//---------------------------------

/**
 * @description 统计盒型DOM节点Class值 这里只是定义 初始化时由传入实际的值改写
 * @type String
 */
uinv.FCM.configMgr.model.statistics.classStr = '';

/**
 * @description 统计条件范围
 * @type Array
 */
uinv.FCM.configMgr.model.statistics.where = ['<'];

/**
 * @description 统计对象名称映射
 * @type Object
 */
uinv.FCM.configMgr.model.statistics.nameDisplay = {
	'availableU' : u.le.get('空间'),
	'load' : u.le.get('承重'),
	'power' : u.le.get('功耗')
};

/**
 * @description 新增统计条件项默认颜色
 * @type String
 */
uinv.FCM.configMgr.model.statistics.defaultColor = '#FFFFFF';
		
//---------------------------
// 统计处理函数
//---------------------------

/**
 * @description 删除统计条件项
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {DOM} obj 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.statistics.delRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	$(obj).parents('tr').remove();
};

/**
 * @description 添加统计条件项<br />
 * 1) DOM操作 不写内存
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {DOM} obj 触发事件DOM节点
 * @static
 */
uinv.FCM.configMgr.model.statistics.addRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	var data = {
		'number' : "",
		'color' : "#FFF",
		'where' :  _this.where[0]
	};
	
	var html = _this.mkhtmlTr(data);
	$(obj).parents('.list').find('table').append(html);
	var dom = $(obj).parents('.list').find('table').find('tr:last').find('input[key=color]').get(0);
	_obj.model.colorpicke.show(dom);
};

/**
 * @description 创建统计项的DOM节点
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {Object} obj 统计数据
 * @return {String} 可以创建DOM节点的HTML文本
 * @static
 */
uinv.FCM.configMgr.model.statistics.mkhtmlTr = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof obj != 'object'){
		obj = {};
	}
	
	obj.where = typeof obj.where == 'undefined' ? _this.where[0] :  obj.where;
	obj.color = typeof obj.color == 'undefined' ? _this.defaultColor : obj.color;
	obj.number = typeof obj.number == 'undefined' ? '' : obj.number;

	return _obj.template.load("statistics/tr.html",{
		where : obj.where,
		color : obj.color,
		number : obj.number,
		range : _this.where
	});
};

/**
 * @description 创建统计对象的DOM节点
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @static
 */
uinv.FCM.configMgr.model.statistics.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var i,html,
		arr = [];
	
	for(i in _obj.data.statistics){
		html = _obj.template.load("statistics/list.html",{
			name : _this.nameDisplay[i],
			key : i
		});
		
		arr.push(html);
	}
	
	_obj.form.box.find(_this.classStr).html(arr.join(_obj.template.load("line1.html")));
	_obj.translate();
};

/**
 * @description 初始化
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {String} classStr 统计盒型DOM节点Class值
 * @static
 */
uinv.FCM.configMgr.model.statistics.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.classStr = classStr;
	_this.mkhtml();
};