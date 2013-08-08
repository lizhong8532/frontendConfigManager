
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

	var html = '';
	html += '<tr style="height:50px;" class="item">';
		html += '<td>';
			html += '<select key="where">';
			for(var i = 0,k = _this.where.length; i<k; i++){
				if(obj.where == _this.where[i]){
					html += '<option value="'+_this.where[i]+'" selected>'+_this.where[i]+'</option>';
				}else{
					html += '<option value="'+_this.where[i]+'">'+_this.where[i]+'</option>';
				}
			}
			html += '</select>';
		html += '</td>';
		html += '<td>';
			html += '<input class="config-input-text config-input-percentage" type="text" key="number" value="'+obj.number+'" /><span class="config-unit">%</span>';
		html += '</td>';
		html += '<td>';
			html += '<input type="text" key="color" value="'+obj.color+'" />';
		html += '</td>';
		html += '<td>';
			html += '<button onclick="uinv.FCM.configMgr.model.statistics.delRow(this);"><s>删除</s></button>';
		html += '</td>';
	html += '</tr>';
	
	return html;
};

/**
 * @description 创建统计对象的DOM节点
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @static
 */
uinv.FCM.configMgr.model.statistics.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var arr = [];
	
	for(var i in _obj.data.statistics){
		var html = '';
		html += '<div class="list">';
			html += '<div class="header">'+_this.nameDisplay[i]+'</div>';
			html += '<table style="width:100%;text-align:center;" path="statistics" name="'+i+'" cate="statistics">';
				html += '<tr>';
					html += '<th><s>条件</s></th>';
					html += '<th><s>数值</s></th>';
					html += '<th><s>颜色</s></th>';
					html += '<th><s>删除</s></th>';
				html += '</tr>';
			html += '</table>';
			html += '<div class="action" style="text-align:right;">';
				html += '<input type="button" class="btn_add" onclick="uinv.FCM.configMgr.model.statistics.addRow(this);" />';
			html += '</div>';
		html += '</div>';
		arr.push(html);
	}
	
	_obj.form.box.find(_this.classStr).html(arr.join(_obj.global.line1));
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