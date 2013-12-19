

//----------------
// 选择器基础定义
//----------------

/**
 * @description 提交选择节点后的回调函数<br />
 * 1) 调用show方法时传入，如果为null则等于没有回调函数<br />
 * 2) 主要是返回选择的结果
 * @type Function
 */
uinv.FCM.configMgr.model.selector.publicSelectNodeSubmitCallback = null;

/**
 * @description 选择器主容器的class值<br />
 * 1) 模块初始的时候传入，大部分DOM操作将依赖此值
 * @type String
 */
uinv.FCM.configMgr.model.selector.classStr = '';

/**
 * @description 选择器副数据 初始时从服务器载入配置，有变更时会也作为数据提交到服务器保存
 * @type Object
 */
uinv.FCM.configMgr.model.selector.obj = null;

/**
 * @description 副数据索引 读写副数据时用到
 * @type String
 */
uinv.FCM.configMgr.model.selector.index = 'selector';

/**
 * @description 当前选中节点的key值
 * @type String
 */
uinv.FCM.configMgr.model.selector.selectKey = '';

/**
 * @description 创建节点计数器
 * @type Number
 */
uinv.FCM.configMgr.model.selector.nodeCount = 1;

/**
 * @description 展开类名
 * @type String
 */
uinv.FCM.configMgr.model.selector.openFoldClassName = "config-selector-fold-open";

/**
 * @description 关闭类名
 * @type String
 */
uinv.FCM.configMgr.model.selector.closeFoldClassName = "config-selector-fold-close";

/**
 * @description fold类名
 * @type String
 */
uinv.FCM.configMgr.model.selector.foldClassName = "config-selector-fold";

/**
 * @description 是否有操作记录
 * @type Boolean
 */
uinv.FCM.configMgr.model.selector.history = false;

//------------------------------
// 创建对象公有函数处理
//------------------------------

/**
 * @description 创建对象选择器公用方法 呈现<br />
 * 1) 通过dialog模块呈现<br />
 * 2) 回调函数 返回 obj { 'name' : '物体名称', 'where' : { 物体的条件 } }<br />
 * 3) 主要用于其它模块创建对象时使用
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.selector.show = function(fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 回调函数赋值给publicSelectNodeSubmitCallback
	// 当操作结束后会调用这个回调函数
	_this.publicSelectNodeSubmitCallback = fun;
	
	_obj.model.dialog.show(_obj.template.load("selector/publicMain.html",{
		tree : _this.publicShowHtml(_this.obj.tree)
	}));
	
	_obj.model.dialog.getObj().find(".treeNode").each(function(){
		if($(this).find(".childrenNode").find(".treeNode").length > 0){
			$(this).find(">.config-selector-fold").show();
		}
	});
};

/**
 * @description 创建对象选择器公用方法 关闭<br />
 * 1) 实际是调用dialog模块的close方法
 * @memberOf uinv.FCM.configMgr.model.selector
 * @static
 */
uinv.FCM.configMgr.model.selector.hide = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
};

/**
 * @description 创建对象选择器公用方法 提交处理函数<br />
 * 1) 主要判断是否选择了节点<br />
 * 2) 回调函数在这里触发，并将返回选择的结果
 * @memberOf uinv.FCM.configMgr.model.selector
 * @static
 */
uinv.FCM.configMgr.model.selector.publicSelectNodeSubmit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var selectNode = _obj.model.dialog.getObj().find('.tree').find('.ok');
	if(selectNode.length == 1){
		var key = selectNode.attr('key');
		if(key && key in _this.obj.lib ){
			if( typeof _this.publicSelectNodeSubmitCallback == 'function' ){
				var obj = { 'name' : _this.obj.lib[key].name , 'where': {} };
				obj.where[ _this.obj.lib[key].where ] = _this.obj.lib[key].formDataRemember[ _this.obj.lib[key].where ];
				_this.publicSelectNodeSubmitCallback(_obj.model.object.clone(obj));
			}
		}else{ 
			_obj.note.alert( _obj.msg.S19 );
		}
	}else{
		_obj.note.alert( _obj.msg.S20 );
	}
};

/**
 * @description 创建对象选择器公用模块 选择节点处理函数
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {DOM} obj DOM节点
 * @param {String} key 被操作节点的key值
 * @static
 */
uinv.FCM.configMgr.model.selector.publicSelectNode = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.tree').find('.ok').removeClass('ok');
	
	if(_this.objIsExistWhere(key)){
		$(obj).parents('.treeNode:eq(0)').addClass('ok');
	}else{
		_obj.note.alert( _obj.msg.S21 );
	}
};

/**
 * @description 创建对象选择器公用模块 创建DOM节点<br />
 * 1) 此方法为递归调用 如当前节点下还有子节点时再把子节点传入递归调用
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Object} obj 树的节点
 * @return {String} dom 节点
 * @static
 */
uinv.FCM.configMgr.model.selector.publicShowHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = "", i, k, hasChildrenNode = false, childrenNode = "";
	
	if(typeof obj == 'undefined'){ 
		return '';
	}
	
	for(i = 0, k = obj.length; i<k; i++){
		childrenNode = "";
		if( typeof obj[i].childrenNode == 'object' ){
			hasChildrenNode = true;
			childrenNode = _this.publicShowHtml(obj[i].childrenNode);
		}
		
		html += _obj.template.load("selector/publicTreeNode.html",{
			hasWhere		: _this.objIsExistWhere( obj[i].key ),
			name			: _this.obj.lib[obj[i].key].name,
			key				: obj[i].key,
			hasChildrenNode	: hasChildrenNode,
			childrenNode	: childrenNode
		});
	}
	
	return html;
};


//-------------------------
// 节点条件管理
//-------------------------

/**
 * @description 关闭为节点添加条件的Dialog
 * @param {Function} fun 回调方法
 * @memberOf uinv.FCM.configMgr.model.selector
 * @static
 */
uinv.FCM.configMgr.model.selector.cancelAddNodeWhere = function(fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
	if(typeof fun == 'function'){
		fun.apply(_this);
	}
};

/**
 * @description 获取所有整个系统定义的所有Class ID
 * @see uinv.factory.getAllClass()
 * @memberOf uinv.FCM.configMgr.model.selector
 * @return {Object} ClassID Object
 * @static
 */
uinv.FCM.configMgr.model.selector.getAllClassID = function(){
	return uinv.factory.getAllClass();		
};

/**
 * @description 获取某一个ClassID的信息
 * @param {Number} classid 
 * @memberOf uinv.FCM.configMgr.model.selector
 * @return {Object} classid 的属性
 * @static
 */
uinv.FCM.configMgr.model.selector.getOneClassID = function(classid){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var all = _this.getAllClassID();
	for(var i in all){
		if(all[i].classId == classid){
			return all[i];
		}
	}
};

/**
 * @description 节点重命名
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 要操作节点的key值
 * @static
 */
uinv.FCM.configMgr.model.selector.nodeRename = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '<input type="text" value="'+_this.obj.lib[key].name+'" />';
	_this.keyFindNodeHtmlObj(key).find('>span').html(html).find('input').focus().blur(function(){
		_this.obj.lib[key].name = $(this).val();
		$(this).parent().html( _this.obj.lib[key].name );
	}).keydown(function(evt){
		var e = evt || window.event;
		if(e.keyCode == 13){
			_this.obj.lib[key].name = $(this).val();
			$(this).parent().html( _this.obj.lib[key].name );
		}
	});
};

/**
 * @description 根据某一个几点的key值返回该节点的DOM对象<br />
 * 1) 如果key值有效，则返回此节点的DOM对象<br />
 * 2) 如果key值为空，则返回整个selector盒子DOM对象
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点的key值
 * @return {DOM} DOM对象
 * @static
 */
uinv.FCM.configMgr.model.selector.keyFindNodeHtmlObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(key === ''){
		return _obj.form.box.find(_this.classStr);
	}else{
		return _obj.form.box.find(_this.classStr).find('*[key='+key+']');
	}
};

/**
 * @description 删除节点<br />
 * 1) 页面上删除DOM节点<br />
 * 2) 内存里删除节点对象<br />
 * 3) 如果节点下面有子节点也会一并删除
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 要删除的key对象
 * @static
 */
uinv.FCM.configMgr.model.selector.deleteNode = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = _obj.note.confirm( _obj.msg.S23 );
	
	if(bool){
		var node = _this.keyFindTreeNodeObj( _this.obj.tree, key);
		node.parent.splice(node.index,1);
		var dom = _this.keyFindNodeHtmlObj(key);
		
		dom.find(".treeNode").each(function(){
			delete _this.obj.lib[$(this).attr("key")];
		});
		
		if(dom.parent().find(">.treeNode").length <= 1){
			dom.parent().parent().find(">.config-selector-fold").hide();
		}
		
		delete _this.obj.lib[key];
		
		dom.remove();
	}
};


/**
 * @description 创建节点<br />
 * 1) 如果传入父节点则在此父节点下创建子节点<br />
 * 2) 如果不传入父节点则在根下创建节点<br />
 * 3) 创建相应的DOM节点<br />
 * 4) 内存里写入节点信息
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} parentKey 创建节点的父节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.createNode = function(parentKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var key = "";
	_this.selectKey = parentKey || '';
	
	if(typeof _this.obj.lib == 'undefined'){
		_this.obj.lib = {};
	}
	
	if(typeof _this.obj.tree == 'undefined'){
		_this.obj.tree = [];
	}
	
	do{
		key = _obj.model.key.create();
	}while(key in _this.obj.lib);
	
	var name = "新节点-" + _this.nodeCount;
	
	var node = { name: name, key: key };
	_this.insertNodeToTreeObj(node, parentKey);
	_this.insertNodeToTreeDom(node, parentKey);
	
	_this.nodeCount++;
};

/**
 * @description 把一个节点插入内存中树中<br />
 * 1) 如果传入父节点的key，则在父节点的key下插入此节点<br />
 * 2) 如果不传入父节点则在根下插入此节点
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Object} node 要插入的节点
 * @param {String} parentKey 父节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.insertNodeToTreeObj = function(node,parentKey){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		nodeObj = {};
		
	if(parentKey){
		var obj = _this.keyFindTreeNodeObj(_this.obj.tree, parentKey).obj;
		if(typeof obj.childrenNode == 'undefined'){
			obj.childrenNode = [];
		}
		nodeObj = obj.childrenNode;
	}else{
		nodeObj = _this.obj.tree;
	}
	
	nodeObj.push( {'key': node.key } );
	_this.obj.lib[node.key] = { 'name' : node.name };
};

/**
 * @description 将节点插入到DOM树里<br />
 * 1) 如果传入父节点key，则在父节点的DOM树下插入子节点<br />
 * 2) 如果不传入父节点key，则在根树下插入子节点
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Object} node 要操作的节点
 * @param {String} parentKey 父节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.insertNodeToTreeDom = function(node, parentKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = _obj.template.load("selector/node.html",{
		key : node.key,
		name : node.name
	});
	
	if(_this.selectKey === ""){
		_obj.form.box.find(_this.classStr).append(html);
	}else{
		_this.keyFindNodeHtmlObj( _this.selectKey ).find('>.childrenNode').append(html);
		_this.keyFindNodeHtmlObj( _this.selectKey ).find('>.config-selector-fold').show();
	}
};

/**
 * @description 根据key值查找到节点对象<br />
 * 1) 此方法为递归查找<br />
 * 2) 如果搜索到匹配节点后将return，不再执行后面的遍历匹配
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Object} obj 要搜索的对象
 * @param {String} key 要匹配的key值
 * @return {Boolean|Object} 返回false表示没有匹配项 返回object表示匹配到的节点对象
 * @static
 */
uinv.FCM.configMgr.model.selector.keyFindTreeNodeObj = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;				
	for(var i = 0, k=obj.length; i<k; i++){
		if(obj[i].key == key){
			return {'obj':obj[i],'parent':obj,'index':i};
		}
		
		if(typeof obj[i].childrenNode == 'object'){
			var result = _this.keyFindTreeNodeObj(obj[i].childrenNode, key);
			if(result){
				return result;
			}
		}
	}
	
	return false;
};

/**
 * @description 递归创建树的DOM节点
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Object} obj 节点对象
 * @return {String} DOM节点
 * @static
 */
uinv.FCM.configMgr.model.selector.recursionTreeHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = "", i, k, hasChildrenNode = false, childrenNode = "";
	
	for(i=0, k=obj.length; i<k; i++){
		childrenNode = "";
		if(typeof obj[i].childrenNode == 'object'){
			hasChildrenNode = true;
			childrenNode = _this.recursionTreeHtml(obj[i].childrenNode);
		}
		
		html += _obj.template.load("selector/tree.html",{
			hasWhere		: _this.objIsExistWhere( obj[i].key ),
			key				: obj[i].key,
			name			: _this.obj.lib[obj[i].key].name,
			hasChildrenNode	: hasChildrenNode,
			childrenNode	: childrenNode
		});
		
	}
	
	return html;
};

/**
 * @description 创建树的DOM节点方法
 * @memberOf uinv.FCM.configMgr.model.selector
 * @return {String} DOM节点
 * @static
 */
uinv.FCM.configMgr.model.selector.treeHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	
	if(typeof _this.obj.tree == 'object'){
		html += _this.recursionTreeHtml(  _this.obj.tree );
	}

	_obj.template.load("selector/main.html", {
		tree : html
	});
	
	return html;
};

/**
 * @description 添加条件的提交操作
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.addNodeWhereFormSubmit = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.obj.lib[key].where = _obj.model.dialog.getObj().find('input[type=radio][name=wheretype]:checked').val();
	
	_obj.model.dialog.getObj().find('input[type=radio][name=wheretype]').each(function(){
		if( typeof _this.whereTypeSetObj[$(this).val()] == 'function' ){
			_this.whereTypeSetObj[$(this).val()](this,key);
		}
	});
	
	_this.keyFindNodeHtmlObj(key ).addClass('where');
	_this.cancelAddNodeWhere();
};

/**
 * @description 判断节点是否存在条件
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @return {Boolean} true 有条件 false 无条件
 * @static
 */
uinv.FCM.configMgr.model.selector.objIsExistWhere = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if( key==="" || typeof _this.obj.lib[key].where == 'undefined' ){
		return false;
	}
	
	return true;
};
			
/**
 * @description 添加条件表单初始化
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.addNodeWhereFormInit = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( _this.objIsExistWhere(key) ){
		_obj.model.dialog.getObj().find('input[type=radio][name=wheretype][value='+_this.obj.lib[key].where+']').attr('checked',true).click();
	}
};

/**
 * @description 节点form数据记忆的初始化 （内存操作）
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.formDataRememberInit = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	_this.obj.lib[key].formDataRemember = {
		'classid':0,
		'name' : '',
		'attribute' : [{ 'key' : '', 'value' : '' }],
		'fun' : ''
	};				
};

/**
 * @description 删除节点的条件<br />
 * 1) 从内存中删除条件<br />
 * 2) DOM节点删除有条件的Class值，使他恢复没有条件时的样式
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.delNodeWhere = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	if(key || key in _this.obj.lib){
		delete _this.obj.lib[key].where;
		_this.keyFindNodeHtmlObj(key).removeClass('where');
	}
};

/**
 * @description 编辑节点条件方法
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @return {Boolean} 如果key值无效或者key值不存在树里就return flase 终止下面的操作
 * @static
 */
uinv.FCM.configMgr.model.selector.editNodeWhere = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = "";

	if(!key || !(key in _this.obj.lib)){
		return false;
	}
	
	if( key in _this.obj.lib && typeof _this.obj.lib[key].formDataRemember == 'undefined' ){
		_this.formDataRememberInit(key);
	}
	
	html = _obj.template.load("selector/editWhere.html",{
		fun			: _this.obj.lib[key].formDataRemember.fun,
		name		: _this.obj.lib[key].formDataRemember.name,
		attrKey		: _this.obj.lib[key].formDataRemember.attribute[0].key,
		attrValue	: _this.obj.lib[key].formDataRemember.attribute[0].value,
		classids	: _this.getAllClassID(),
		classid		: _this.obj.lib[key].formDataRemember.classid,
		key			: key
	});
	
	_obj.model.dialog.show(html);
	_this.addNodeWhereFormInit(key);
	
};

/**
 * 
 * @description 选择条件类型触发函数
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.selector.selectNodeWhere = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents(".addnodewhere").find(".row").each(function(){
		$(this).find("input[type=text], select, textarea").attr("disabled", "true");
	});
	
	$(obj).parents(".row").find("input[type=text], select, textarea").removeAttr("disabled");
};

/**
 * @description 右键弹出主处理函数
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Event} evt
 * @param {DOM} obj 触发右键的DOM节点
 * @return {Boolean}
 * @static
 */
uinv.FCM.configMgr.model.selector.contextMenu = function(evt,obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var _dom = obj;
	var e = evt || window.event;
	var key = "";
	
	if(e.preventDefault){
		e.preventDefault();
	}
	
	if (e.stopPropagation){
		e.stopPropagation();
	}else{
		e.returnValue = false; // 解决IE8右键弹出
		e.cancelBubble = true;
	}
	
	_obj.form.box.find(_this.classStr).find('.ok').removeClass('ok');
	
	if($(_dom).parent().attr('key')){
		key = $(_dom).parent().attr('key');
		_this.selectNode( key, e );
	}
	
	_this.contextMenuShow(e, key);
	
	return false;
};

/**
 * @description 子节点展开
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.treeNodeShow = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyFindNodeHtmlObj(key).removeClass('childrenNodeHide').find('>.childrenNode').show();
};

/**
 * @description 子节点收起
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.treeNodeHide = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyFindNodeHtmlObj(key).addClass('childrenNodeHide').find('>.childrenNode').hide();
};

/**
 * @description 右键菜单操作触发动作路由
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Function} fun 触发的方法
 * @param {String} key 操作的方法
 * @static
 */
uinv.FCM.configMgr.model.selector.contextMenuRouting = function(fun, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.contextMenuHide();
	
	eval( '_this.' + fun + '(\''+key+'\');' );
};

/**
 * @description 获取创建右键DOM节点
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Event} e
 * @param {String} key 节点key值
 * @return {String} 创建右键菜单DOM节点
 * @static
 */
uinv.FCM.configMgr.model.selector.getContextMenuHtml = function(e, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = "";

	html = _obj.template.load("selector/contextmenu.html",{
		x					: e.clientX - _obj.form.box.offset().left,
		y					: e.clientY - _obj.form.box.offset().top + $(window).scrollTop(),
		selectNode			: key && key in _this.obj.lib,
		hasChildrenNode		: _this.keyFindNodeHtmlObj(key).find('>.childrenNode>.treeNode').length >= 1,
		childrenNodeVisible : _this.keyFindNodeHtmlObj(key).find('>.childrenNode').is(':visible'),
		key					: key,
		hasWhere			: _this.objIsExistWhere(key)
	});
	
	return html;
};

/**
 * @description 右键DOM节点添加到DOM树种并显示
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {Event} e 
 * @param {String} key 节点key值
 * @static
 */
uinv.FCM.configMgr.model.selector.contextMenuShow = function(e, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	uinv.FCM.configMgr.model.selector.history = true;
	_this.contextMenuHide();
	var html = _this.getContextMenuHtml(e, key);
	_obj.form.box.append(html);	

	_obj.translate();
};

/**
 * @description 右键DOM节点隐藏 实际上右键的DOM节点会被remove删除操作
 * @memberOf uinv.FCM.configMgr.model.selector
 * @static
 */
uinv.FCM.configMgr.model.selector.contextMenuHide = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.config-contextmenu').remove();
};

/**
 * @description 当前节点选择操作<br />
 * 1) 样式中添加选中节点的样式<br />
 * 2) 内存记录当前选中的节点key值
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} key 节点key值
 * @param {Event} evt
 * @static
 */
uinv.FCM.configMgr.model.selector.selectNode = function(key,evt){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var e = evt || window.event;
	
	if(e.preventDefault){
		e.preventDefault();
	}
	
	if (e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
	
	_this.contextMenuHide();
	_this.cancelSelectNode();
	_this.selectKey = key;
	_this.keyFindNodeHtmlObj(key).addClass('ok');
};

/**
 * @description 撤销选中的节点<br />
 * 1) DOM节点上移除选中样式<br />
 * 2) 内存里删除选中记录
 * @memberOf uinv.FCM.configMgr.model.selector
 * @static
 */
uinv.FCM.configMgr.model.selector.cancelSelectNode = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.selectKey = '';
	_obj.form.box.find(_this.classStr).find('.ok').removeClass('ok');
};

/**
 * @description fold 切换
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {DOM} obj
 * @static
 */
uinv.FCM.configMgr.model.selector.foldToggle = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var childrenNode = $(obj).parent().find(".childrenNode");
	
	if(childrenNode.is(":visible")){
		$(obj).removeClass(_this.closeFoldClassName).addClass(_this.openFoldClassName);
		childrenNode.hide();
	}else{
		$(obj).removeClass(_this.openFoldClassName).addClass(_this.closeFoldClassName);
		childrenNode.show();
	}	
};

/**
 * @description 选择器模块初始化
 * @memberOf uinv.FCM.configMgr.model.selector
 * @param {String} classStr 选择器盒子DOM Class 值
 * @static
 */
uinv.FCM.configMgr.model.selector.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = function(){
		_obj.model.stringDB.set( _this.index, _this.obj, function(){} );
		uinv.FCM.configMgr.model.selector.history = false;
	};

	_this.obj = _obj.model.stringDB.get(_this.index);
	_this.classStr = classStr;
	
	_obj.form.box.find(_this.classStr).html( _this.treeHtml() );
	
	_obj.form.box.find(_this.classStr).click(function(){
		_this.cancelSelectNode();
		_this.contextMenuHide();
	});
	
	_obj.form.box.find(_this.classStr).find(".treeNode").each(function(){
		if($(this).find(".childrenNode").find(".treeNode").length > 0){
			$(this).find(">.config-selector-fold").show();
		}
	});
	
	$('.config-info').html( _obj.msg.S22 );
	
	_obj.form.submitBefore = function(){
		var repeatName = _this.isRepeatNode();
		if(repeatName){
			_obj.form.hasError = _obj.msg.F13(repeatName);
		}else{
			_obj.form.hasError = false;
		}
	};
	
	_this.nodeCount = 1;
};


// Add 2013-12-19

/**
 * @description 检测是否有重复的值
 * @memberOf uinv.FCM.configMgr.model.selector
 * @return {Boolean/String} 是否重复/重复名称
 * @static
 */
uinv.FCM.configMgr.model.selector.isRepeatNode = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var arr = [], i, repeat = [];
	
	for(i in _this.obj.lib){
		if(_obj.model.array.inArray(_this.obj.lib[i].name, arr)){
			repeat.push(_this.obj.lib[i].name);
		}else{
			arr.push(_this.obj.lib[i].name);
		}
	}
	
	if(repeat.length>=1){
		return repeat.join(", ");
	}else{
		return false;
	}
};
