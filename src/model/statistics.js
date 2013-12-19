
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
	
	if(_obj.note.confirm(_obj.msg.S29)){
		var _obj = uinv.FCM.configMgr;
		var _this = this;			
		$(obj).parents('tr').remove();	
	}
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
	var box = $(obj).parents('.list').find('table').find('tr:last')
	var dom = box.find('input[key=color]').get(0);
	_obj.model.colorpicke.show(dom);
	box.find('input.config-input-percentage').get(0).focus();
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
		range : _this.where,
		conditionnum : _this.where.length,
		condition : _this.where[0]
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
	
	window.setTimeout(function(){
		_obj.form.box.find(_this.classStr).find(">.list").each(function(){
			_this.order(this);
		});
	}, 200);
};

/**
 * @description 鼠标离开百分比input判断是否为空
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.statistics.percentageBlur = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if($.trim(obj.value)===""){
		_obj.note.alert(_obj.msg.F12("数值"));
		window.setTimeout(function(){
			obj.focus();
		}, 200);
	}
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


// Add 2013-12-19

/**
 * @description 获取焦点触发
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.statistics.focus = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	$(".config-top-submit").hide();
};

/**
 * @description 焦点离开触发
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.statistics.blur = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var value = $.trim(obj.value);
	var r = /^(\d+){1,3}$/;
	if(!r.test(value) || value > 100){
		_obj.note.alert(_obj.msg.S32);
		(function(obj){
			window.setTimeout(function(){ obj.focus(); }, 200);
		})(obj);
		
		$(".config-top-submit").hide();
	}else{
		$(".config-top-submit").show();
		_this.order($(obj).parents(".list").get(0));
	}
};

/**
 * @description 排序
 * @memberOf uinv.FCM.configMgr.model.statistics
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.statistics.order = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var sort = [], dom = {};
	$(obj).find("table").find("tr.item").each(function(){
		var percentage = parseFloat($.trim($(this).find("input.config-input-percentage").val()), 10);
		sort.push(percentage);
		dom[percentage] = this;
	});
	
	if(sort.length >= 2){
		sort.sort(function(a, b){
			if(a>b){
				return 1;
			}else{
				return -1
			}
		});
		
		var i;
		for(i=0; i<sort.length; i++){
			$(obj).find("table").append(dom[sort[i]]);
		}	
	}
};