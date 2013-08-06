/**
 * @description 视角模块
 */

//----------------------------------
// 基础定义
//----------------------------------

/**
 * @description 视点盒型DOM Class值
 * @type String
 */
uinv.FCM.configMgr.model.viewpoint.classStr = '';

//----------------------------------
// 函数区
//----------------------------------

/**
 * @description 创建物体
 * @method createObject
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.selector.show(function(obj){
		_obj.model.selector.cancelAddNodeWhere();
		var o = _this.addObjectToMemory(obj);
		_this.addHtmlRow(o);
	});
};

/**
 * @description 根据key查找物体
 * @method keyFindObj
 * @param {String} key 物体key值
 * @return {Boolean|Object} 查找到物体返回Object 查找不到返回false
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
		if( _obj.data.viewpoint[i].key == key ){
			return _obj.data.viewpoint[i];
		}
	}
	
	return false;
};

/**
 * @description 根据key查找到物体的索引值
 * @method keyFindIndex
 * @param {String} key 物体key值
 * @return {Number} -1 表示物体搜索不到
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.keyFindIndex = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
		if( _obj.data.viewpoint[i].key == key ){
			return i;
		}
	}
	return -1;
};

/**
 * @description 生成唯一key
 * 1) 实际调用key模块生成32位的key值
 * 2) 生成key以后会遍历目前所有物体使用的key，如果有重复的则重新生成直到生成的key没有被使用
 * @method createKey
 * @return {String} key值
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.createKey = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	do{
		var key = _obj.model.key.create(32);
	}while( _this.keyFindObj(key) );
	
	return key;
};

/**
 * @description 添加新创建物体数据到内存
 * @method addObjectToMemory
 * @param {Object} obj 选择器返回的物体
 * @return {Object} 初始化后的物体
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.addObjectToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var o = {
		'name' : obj.name,
		'where' : obj.where,
		'key' : _this.createKey(),
		'data' : {
			'x' : 0,
			'y' : 0,
			'z' : 0
		}
	};
	
	_obj.data.viewpoint.push(o);
	return o;
};

/**
 * @description 添加物体DOM节点
 * @method addHtmlRow
 * @param {Object} obj 物体数据
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.addHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	_obj.form.box.find(_this.classStr).append( _this.mkhtmlRow(obj) );
	_obj.translate();
};

/**
 * @description 根据物体数据生成HTML文本
 * @method mkhtmlRow
 * @param {Object} obj 物体数据
 * @return {String} HTML文本
 */
uinv.FCM.configMgr.model.viewpoint.mkhtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	var html = '';
	html += '<tr class="row" key="'+obj.key+'">';
		html += '<td>';
			html += '<h3><span onclick="uinv.FCM.configMgr.model.viewpoint.objectRename(this,\''+obj.key+'\');" class="name">'+obj.name+'</span></h3>';
		html += '</td>';
		for(var i in obj['data']){
			html += '<td><input class="w50" type="text" key="'+i+'" name="'+obj.key+'" cate="viewpoint" path="viewpoint" /></td>';
		}
		html += '<td><a onclick="uinv.FCM.configMgr.model.viewpoint.objectDelete(this,\''+obj.key+'\');" href="javascript:void(0);"><s>删除</s></a></td>';
	html += '</tr>';
	return html;
};

/**
 * @description 创建所有物体的DOM节点
 * @method mkhtml
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
		html += _this.mkhtmlRow(_obj.data.viewpoint[i]);	
	}
	
	_obj.form.box.find(_this.classStr).find('tr:gt(0)').remove();
	_obj.form.box.find(_this.classStr).append(html);
	_obj.translate();
};

/**
 * @description 物体重命名 (内存也会改写)
 * 1) 内存会改写
 * 2) 实际上把触发事件的文本修改成input输入框，焦点离开或回车后恢复
 * @method objectRename
 * @param {DOM} obj 触发事件的DOM节点
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.objectRename = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var dom = $(obj).parent();
	var html = dom.html();
	dom.html( '<input type="text" value="'+$(obj).html()+'" />' );
	dom.find('input').focus().blur(function(){
		_this.keyFindObj(key).name = $(this).val();
		dom.html(html);
		dom.find('span').html( $(this).val() );
	}).keydown(function(evt){
		var e = evt || window.event;
		if(e.keyCode == 13){
			_this.keyFindObj(key).name = $(this).val();
			dom.html(html);
			dom.find('span').html( $(this).val() );
		}
	});
};

/**
 * @description 删除物体
 * 1) 由触发这个事件的DOM节点往父节点找到row后删除
 * 2) 内存也会改写
 * @method objectDelete
 * @param {DOM} obj 触发事件的DOM节点
 * @param {String} key 物体key值
 */
uinv.FCM.configMgr.model.viewpoint.objectDelete = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = _obj.note.confirm( _obj.msg.S24 );
	
	if(bool){
		var index = _this.keyFindIndex(key);
		_obj.data.viewpoint.splice(index,1);
		$(obj).parents('*[key='+key+']').remove();	
	}
};

/**
 * @description 初始化
 * @constructor init
 * @param {} classStr
 * @static
 */
uinv.FCM.configMgr.model.viewpoint.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.classStr = classStr || '';
	_this.mkhtml();
};