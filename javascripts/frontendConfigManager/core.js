/**
 * core.js -1.0- 可视化配置核心文件
 * @description 是产品可视化配置的核心JS文件，目前主要实现图层、面板、统计、资源、选择器、布局、系统等模块的可视化配置
 * @author lizhong
 * @version 1.0
 * @date 2013-07
 */

// 命名空间注册
namespace.reg('uinv.FCM.configMgr.global');				// 全局配置
namespace.reg('uinv.FCM.configMgr.note'); 				// 提示模块
namespace.reg('uinv.FCM.configMgr.model.transform'); 	// 对象与字符串 互相转换模块
namespace.reg('uinv.FCM.configMgr.model.array'); 		// 数组模块
namespace.reg('uinv.FCM.configMgr.model.selector'); 	// 选择器模块
namespace.reg('uinv.FCM.configMgr.model.stringDB');		// stringDB模块
namespace.reg('uinv.FCM.configMgr.model.key');			// key模块
namespace.reg('uinv.FCM.configMgr.model.layer');		// 图层模块
namespace.reg('uinv.FCM.configMgr.model.panel');		// 面板模块
namespace.reg('uinv.FCM.configMgr.model.object');		// object模块
namespace.reg('uinv.FCM.configMgr.model.colorpicke');	// 色盘模块
namespace.reg('uinv.FCM.configMgr.model.dialog');		// dialog模块
namespace.reg('uinv.FCM.configMgr.model.statistics');	// 统计模块
namespace.reg('uinv.FCM.configMgr.model.resources');	// 资源模块
namespace.reg('uinv.FCM.configMgr.model.viewpoint');	// 视点模块
namespace.reg('uinv.FCM.configMgr.model.backup');		// 备份模块
namespace.reg('uinv.FCM.configMgr.model.monitor');		// 监控模块
namespace.reg('uinv.FCM.configMgr.model.download');		// 下载模块
namespace.reg('uinv.FCM.configMgr.model.images');		// 图片模块
namespace.reg('uinv.FCM.configMgr.form');				// 表单操作
namespace.reg('uinv.FCM.configMgr.data');				// 数据层
namespace.reg('uinv.FCM.configMgr.other');				// 杂项
namespace.reg('uinv.FCM.configMgr.api');				// api接口
namespace.reg('uinv.FCM.configMgr.translate');			// 翻译

uinv.FCM.configMgr.translate = function(obj){
	var o = obj || $('body');
	
	o.find('s').each(function(){
		if($(this)!= undefined && $(this).html!=""){
			$(this).replaceWith(u.le.get($(this).html()));
		}
	});
	o.find("a,input").each(function(){
		if($(this)!= undefined && $(this).attr("value")!= ""){
			$(this).attr({"value": u.le.get($(this).attr("value"))});
		}
		if($(this)!= undefined && $(this).attr("title")!= ""){
			$(this).attr({"title":u.le.get($(this).attr("title"))});
		}
	});
	o.find("select").each(function(){
		if($(this)!= undefined && $(this).attr("data-placeholder")!=""){
			$(this).attr({"data-placeholder": u.le.get($(this).attr("data-placeholder"))});
		}
	});
	o.find("select option").each(function(){
		if($(this)!= undefined && $(this).html()!= ""){
			$(this).html(u.le.get($(this).html()));
		}
	});
};



// 可视化配置核心路径
uinv.FCM.configMgr.global.path = '/frontendConfigManager';

// 项目路径
// 实际上当脚本初始化后会在init函数内自动获取项目路径重新赋值
// 比如URL路径http://localhost:8080/uinv_frontend/admin.html则截取uinv_frontend
uinv.FCM.configMgr.global.projectPath = '';

// 提示模块

uinv.FCM.configMgr.note.alert = function(str){
	alert(u.le.get(str));
};

uinv.FCM.configMgr.note.confirm = function(str){
	return confirm(u.le.get(str));
};

uinv.FCM.configMgr.note.dialog = function(str){
	var html = '';
	html += '<div style="width:300px;min-height:100px;padding:10px;text-align:center;">';
		html += '<p><s>' + str + '</s></p>';
		html += '<p style="margin-top:50px;"><button onclick="uinv.FCM.configMgr.model.dialog.close();"><s>确定</s></button></p>';
	html += '</div>';
	
	uinv.FCM.configMgr.model.dialog.show(html);
};

// 是否在数组
uinv.FCM.configMgr.model.array.inArray = function(str, arr){
	for(var i = 0 ,k = arr.length; i<k ;i++){
		if(str == arr[i]){
			return true;
		}
	}
	return false;
};

// 根据字符串查找在数组中的索引
// -1表示不在数组内
uinv.FCM.configMgr.model.array.strInArrayIndex = function(str, arr){
	for(var i = 0 ,k = arr.length; i<k ;i++){
		if(str == arr[i]){
			return i;
		}
	}
	return -1;			
};

// 检测是否属于数组
uinv.FCM.configMgr.model.array.isArray = function(o){
	return o instanceof Array;
};


// 当选择好节点提交后执行的回调函数
// 由每个调用show方法时传入，如果为null则等于没有回调函数
// 主要是返回选择的结果
uinv.FCM.configMgr.model.selector.publicSelectNodeSubmitCallback = null;

// 选择器操作的DOM对象的class名称
// 初始的时候，会把这个选择器的数据在此dom节点上画出树形结构
uinv.FCM.configMgr.model.selector.classStr = '';

// 其它额外的辅助数据对象，每次初始时候会从服务器更新并且有变更时可以提交到服务器
uinv.FCM.configMgr.model.selector.obj = null;

// 数据存储中选择器的index数据索引，可以根据这个索引进行数据存储
// 实现的方法在stringDB模块
uinv.FCM.configMgr.model.selector.index = 'selector';

// 当前选中节点的key值
uinv.FCM.configMgr.model.selector.selectKey = '';

// 物体选择器的选择操作，供其它页面的模块中调用，如在图层模块中要创建对象时就会调用此方法。通过dialog模块把数据展现成树形弹层，用户可以在弹层上选择节点
// 回调函数 返回 obj { 'name' : '物体名称', 'where' : { 物体的条件 } }
uinv.FCM.configMgr.model.selector.show = function(fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.publicSelectNodeSubmitCallback = fun;
	var html = '';
	html += '<div class="selector" style="width:500px;height:300px;">';
		html += '<div class="tree" style="height:250px;width:100%;border:1px solid #EEE;overflow-y:auto;">';
			html += _this.publicShowHtml(_this.obj['tree']);
		html += '</div>';
		
		html += '<div class="action">';
			html += '<input class="btn_cancel" onclick="uinv.FCM.configMgr.model.dialog.close();" />';
			html += '<input class="btn_save" onclick="uinv.FCM.configMgr.model.selector.publicSelectNodeSubmit();" />';
		html += '</div>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
};

// 隐藏物体选择器的操作，实际是调用dialog模块的close方法
uinv.FCM.configMgr.model.selector.hide = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
};

// 提交
uinv.FCM.configMgr.model.selector.publicSelectNodeSubmit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var selectNode = _obj.model.dialog.getObj().find('.tree').find('.ok');
	if(selectNode.length == 1){
		var key = selectNode.attr('key');
		if(key && key in _this.obj['lib']){
			if( typeof _this.publicSelectNodeSubmitCallback == 'function' ){
				var obj = { 'name' : _this.obj['lib'][key]['name'] , 'where': {} };
				obj['where'][ _this.obj['lib'][key]['where'] ] = _this.obj['lib'][key]['formDataRemember'][ _this.obj['lib'][key]['where'] ];
				_this.publicSelectNodeSubmitCallback(_obj.model.object.clone(obj));
			}
		}else{ 
			_obj.note.alert('错误：系统异常!');
		}
	}else{
		_obj.note.alert('提示：请选择节点!');
	}
};

// 选择
uinv.FCM.configMgr.model.selector.publicSelectNode = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.tree').find('.ok').removeClass('ok');
	
	if(_this.objIsExistWhere(key)){
		$(obj).parents('.treeNode:eq(0)').addClass('ok');
	}else{
		_obj.note.alert('未添加条件的节点不能选择!');
	}
};

// 拼写html
uinv.FCM.configMgr.model.selector.publicShowHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof obj == 'undefined'){ 
		return '';
	}
	
	var html = '';
	for(var i = 0, k = obj.length; i<k; i++){
		if( _this.objIsExistWhere(obj[i]['key']) ){
			html += '<div class="treeNode where" key="'+obj[i]['key']+'">';
			html += '<span onclick="uinv.FCM.configMgr.model.selector.publicSelectNode(this,\''+obj[i]['key']+'\');">'+ _this.obj['lib'][obj[i]['key']]['name'] +'</span>';
		}else{
			html += '<div class="treeNode">';
			html += '<span>'+ _this.obj['lib'][obj[i]['key']]['name'] +'</span>';
		}
		
		if( typeof obj[i]['childrenNode'] == 'object' ){
			html += '<div class="childrenNode">';
				html += _this.publicShowHtml(obj[i]['childrenNode']);
			html += '</div>';
		}
		
		html += '</div>';
	}
	
	return html;
};

// 取消按钮操作
uinv.FCM.configMgr.model.selector.cancelAddNodeWhere = function(fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
	if(typeof fun == 'function'){
		fun.apply(_this);
	}
};

// 获取全部列表
uinv.FCM.configMgr.model.selector.getAllClassID = function(){
	return uinv.factory.getAllClass();		
};

// 获取单个class ID 数据
uinv.FCM.configMgr.model.selector.getOneClassID = function(classid){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var all = _this.getAllClassID();
	for(var i in all){
		if(all[i]['classId'] == classid){
			return all[i];
		}
	}
};

// 重命名
uinv.FCM.configMgr.model.selector.nodeRename = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '<input type="text" value="'+_this.obj['lib'][key]['name']+'" />';
	_this.keyFindNodeHtmlObj(key).find('>span').html(html).find('input').focus().blur(function(){
		_this.obj['lib'][key]['name'] = $(this).val();
		$(this).parent().html( _this.obj['lib'][key]['name'] );
	}).keydown(function(evt){
		var e = evt || window.event;
		if(e.keyCode == 13){
			_this.obj['lib'][key]['name'] = $(this).val();
			$(this).parent().html( _this.obj['lib'][key]['name'] );
		}
	});
};

// key 找到 html 节点
uinv.FCM.configMgr.model.selector.keyFindNodeHtmlObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(key == ''){
		return _obj.form.box.find(_this.classStr);
	}else{
		return _obj.form.box.find(_this.classStr).find('*[key='+key+']');
	}
};

// 删除节点
uinv.FCM.configMgr.model.selector.deleteNode = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var node = _this.keyFindTreeNodeObj( _this.obj['tree'], key);
	node['parent'].splice(node['index'],1);
	delete _this.obj['lib'][key];
	_this.keyFindNodeHtmlObj(key).remove();
};


// 创建节点
uinv.FCM.configMgr.model.selector.createNode = function(parentKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.selectKey = parentKey || '';
	
	if(typeof _this.obj['lib'] == 'undefined'){
		_this.obj['lib'] = {};
	}
	
	if(typeof _this.obj['tree'] == 'undefined'){
		_this.obj['tree'] = [];
	}
	
	do{
		var key = _obj.model.key.create();
	}while(key in _this.obj['lib']);
	
	var node = { 'name' : '新节点' , 'key': key };
	_this.insertNodeToTreeObj(node, parentKey);
	_this.insertNodeToTreeDom(node, parentKey);
};

// 插入对象到树节点
uinv.FCM.configMgr.model.selector.insertNodeToTreeObj = function(node,parentKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(parentKey){
		var obj = _this.keyFindTreeNodeObj(_this.obj['tree'], parentKey)['obj'];
		if(typeof obj['childrenNode'] == 'undefined'){
			obj['childrenNode'] = [];
		}
		var nodeObj = obj['childrenNode'];
	}else{
		var nodeObj = _this.obj['tree'];
	}
	
	nodeObj.push( {'key': node['key'] } );
	_this.obj['lib'][node['key']] = { 'name' : node['name'] };
};

// 插入到DOM树
uinv.FCM.configMgr.model.selector.insertNodeToTreeDom = function(node, parentKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	html += '<div  key="'+node['key']+'" class="treeNode" style="padding-left:20px;">';
		html += '<span onclick="uinv.FCM.configMgr.model.selector.selectNode(\''+node['key']+'\',event);"  oncontextmenu="uinv.FCM.configMgr.model.selector.contextMenu(event,this);">'+node['name']+'</span>';
		html += '<div class="childrenNode"></div>';
	html += '</div>';

	_this.keyFindNodeHtmlObj( _this.selectKey ).find('>.childrenNode').append(html);
};

// key 找到 obj
uinv.FCM.configMgr.model.selector.keyFindTreeNodeObj = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;				
	for(var i = 0, k=obj.length; i<k; i++){
		if(obj[i]['key'] == key){
			return {'obj':obj[i],'parent':obj,'index':i};
		}
		
		if(typeof obj[i]['childrenNode'] == 'object'){
			var result = _this.keyFindTreeNodeObj(obj[i]['childrenNode'], key);
			if(result){
				return result;
			}
		}
	}
	
	return false;
};

// 递归
uinv.FCM.configMgr.model.selector.recursionTreeHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i = 0, k=obj.length; i<k; i++){
		if( _this.objIsExistWhere( obj[i]['key'] ) ){
			html += '<div class="treeNode where" style="padding-left:20px;"  key="'+obj[i]['key']+'">';
		}else{
			html += '<div class="treeNode" style="padding-left:20px;"  key="'+obj[i]['key']+'">';
		}
			html += '<span onclick="uinv.FCM.configMgr.model.selector.selectNode(\''+obj[i]['key']+'\',event);" oncontextmenu="uinv.FCM.configMgr.model.selector.contextMenu(event,this);">'+_this.obj['lib'][obj[i]['key']]['name']+'</span>';
			
			html += '<div class="childrenNode">';
			if(typeof obj[i]['childrenNode'] == 'object'){
				html +=  _this.recursionTreeHtml(obj[i]['childrenNode']);
			}
			html += '</div>';
		html += '</div>';
	}
	return html;
};

// 画出树结果
uinv.FCM.configMgr.model.selector.treeHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	
	html += '<div class="childrenNode">';
	if(typeof _this.obj['tree'] == 'object'){
		html += _this.recursionTreeHtml(  _this.obj['tree'] );
	}
	
	html += '</div>';
	
	return html;
};

// 根据不同类型存值不同
uinv.FCM.configMgr.model.selector.whereTypeSetObj = {};

// classid
uinv.FCM.configMgr.model.selector.whereTypeSetObj['classid'] = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj['lib'][key]['formDataRemember']['classid'] = $(obj).parents('.row').find('select[name=classid]').val();
};

// name
uinv.FCM.configMgr.model.selector.whereTypeSetObj['name'] = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj['lib'][key]['formDataRemember']['name'] = $(obj).parents('.row').find('input[name=name]').val();
};

// attribute
uinv.FCM.configMgr.model.selector.whereTypeSetObj['attribute'] = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj['lib'][key]['formDataRemember']['attribute'] = [{
		'key' : $(obj).parents('.row').find('input[name=key]').val(),
		'value' : $(obj).parents('.row').find('input[name=value]').val()
	}];
};

// fun
uinv.FCM.configMgr.model.selector.whereTypeSetObj['fun'] = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.selector;
	_this.obj['lib'][key]['formDataRemember']['fun'] = $(obj).parents('.row').find('textarea[name=fun]').val();
	
};

// 条件页面的提交
uinv.FCM.configMgr.model.selector.addNodeWhereFormSubmit = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.obj['lib'][key]['where'] = _obj.model.dialog.getObj().find('input[type=radio][name=wheretype]:checked').val();
	
	_obj.model.dialog.getObj().find('input[type=radio][name=wheretype]').each(function(){
		if( typeof _this.whereTypeSetObj[$(this).val()] == 'function' ){
			_this.whereTypeSetObj[$(this).val()](this,key);
		}
	});
	
	_this.keyFindNodeHtmlObj(key ).addClass('where');
	_this.cancelAddNodeWhere();
};

// 判断对象是否存在条件
uinv.FCM.configMgr.model.selector.objIsExistWhere = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof _this.obj['lib'][key]['where'] == 'undefined' ){
		return false;
	}
	
	return true;
};
			
// 表单初始化
uinv.FCM.configMgr.model.selector.addNodeWhereFormInit = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( _this.objIsExistWhere(key) ){
		_obj.model.dialog.getObj().find('input[type=radio][name=wheretype][value='+_this.obj['lib'][key]['where']+']').attr('checked',true);
	}
};

// 对象初始化
uinv.FCM.configMgr.model.selector.formDataRememberInit = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	_this.obj['lib'][key]['formDataRemember'] = {
		'classid':0,
		'name' : '',
		'attribute' : [{ 'key' : '', 'value' : '' }],
		'fun' : ''
	};				
};

// 删除条件
uinv.FCM.configMgr.model.selector.delNodeWhere = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	if(key || key in _this.obj['lib']){
		delete _this.obj['lib'][key]['where'];
		_this.keyFindNodeHtmlObj(key).removeClass('where');
	}
};

// 编辑条件
uinv.FCM.configMgr.model.selector.editNodeWhere = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var classid = _this.getAllClassID();

	if(!key || !(key in _this.obj['lib'])){
		return false;
	}
	
	if( key in _this.obj['lib'] && typeof _this.obj['lib'][key]['formDataRemember'] == 'undefined' ){
		_this.formDataRememberInit(key);
	}
	
	var html = '';
	html += '<div class="addnodewhere">';
		
		html += '<div class="row">';
			html += '<span>';
				html += '<input type="radio" name="wheretype" value="classid" checked /> ';
				html += '<s>classid</s>';
			html += '</span>';
			html += '<select class="classidselect" name="classid">';
			for(var i in classid){
				if( _this.obj['lib'][key]['formDataRemember']['classid'] == classid[i]['classId'] ) {
					html += '<option value="'+classid[i]['classId']+'" selected>'+ classid[i]['caption'] +'</option>';
				}else{
					html += '<option value="'+classid[i]['classId']+'">'+ classid[i]['caption'] +'</option>';
				}
			}
			html += '</select>';
		html += '</div>';
		
		html += '<div class="row">';
			html += '<span>';
				html += '<input type="radio" name="wheretype" value="name" /> ';
				html += '<s>物体名称</s>';
			html += '</span>';
			html += '<input type="text" name="name" value="'+_this.obj['lib'][key]['formDataRemember']['name']+'" />';
		html += '</div>';
		
		html += '<div class="row">';
			html += '<span>';
				html += '<input type="radio" name="wheretype" value="attribute" /> ';
				html += '<s>属性定义</s>';
			html += '</span>';
			
			html += '<div class="row" style="clear:both;">';
				html += '<span><s>属性名</s></span><input type="text" name="key" value="'+_this.obj['lib'][key]['formDataRemember']['attribute'][0]['key']+'" /> ';
			html += '</div>';
			html += '<div class="row">';
				html += '<span><s>属性值</s></span><input type="text" name="value" value="'+_this.obj['lib'][key]['formDataRemember']['attribute'][0]['value']+'" />';
			html += '</div>';
		html += '</div>';
		
		html += '<div class="row">';
			html += '<span>';
				html += '<input type="radio" name="wheretype" value="fun" /> ';
				html += '<s>函数</s>';
			html += '</span>';
			html += '<textarea name="fun">'+_this.obj['lib'][key]['formDataRemember']['fun']+'</textarea>';
		html += '</div>';
		
		html += '<div class="btn">';
			html += '<input class="btn_save" onclick="uinv.FCM.configMgr.model.selector.addNodeWhereFormSubmit(\''+key+'\');" />';
			html += '<input class="btn_cancel" onclick="uinv.FCM.configMgr.model.selector.cancelAddNodeWhere();"  />';
		html += '</div>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
	_this.addNodeWhereFormInit(key);
	
};

// 右键
uinv.FCM.configMgr.model.selector.contextMenu = function(evt,obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var _dom = obj;
	var e = evt || window.event;
	
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
	
	var key = '';
	if($(_dom).parent().attr('key')){
		key = $(_dom).parent().attr('key');
		_this.selectNode( key, e );
	}
	
	_this.contextMenuShow(e, key);
	
	return false;
};

// 展开
uinv.FCM.configMgr.model.selector.treeNodeShow = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyFindNodeHtmlObj(key).removeClass('childrenNodeHide').find('>.childrenNode').show();
};

// 收起
uinv.FCM.configMgr.model.selector.treeNodeHide = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyFindNodeHtmlObj(key).addClass('childrenNodeHide').find('>.childrenNode').hide();
};

// 动作路由
uinv.FCM.configMgr.model.selector.contextMenuRouting = function(fun, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.contextMenuHide();
	
	eval( '_this.' + fun + '(\''+key+'\');' );
};

// 获取右键内容
uinv.FCM.configMgr.model.selector.getContextMenuHtml = function(e, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var pos = {
		x : e.clientX - _obj.form.box.offset().left,
		y : e.clientY - _obj.form.box.offset().top
	};
	
	var html = '';
	html += '<div class="config-contextmenu" style="background:#E6E6FA;width:100px;position:absolute;z-index:9999;left:'+pos.x+'px;top:'+pos.y+'px;">';
		if( key && key in _this.obj['lib'] ){
			if(_this.keyFindNodeHtmlObj(key).find('>.childrenNode>.treeNode').length>=1){
				if( _this.keyFindNodeHtmlObj(key).find('>.childrenNode').is(':visible') ){
					html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'treeNodeHide\',\''+key+'\');"><s>收起</s></li>';
				}else{
					html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'treeNodeShow\',\''+key+'\');"><s>展开</s></li>';
				}
			}
			
			html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'createNode\',\''+key+'\');"><s>创建节点</s></li>';
			html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'deleteNode\',\''+key+'\');"><s>删除节点</s></li>';
			html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'nodeRename\',\''+key+'\');"><s>重新命名</s></li>';
			if( _this.objIsExistWhere(key) ){
				html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'editNodeWhere\',\''+key+'\');"><s>修改条件</s></li>';
				html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'delNodeWhere\',\''+key+'\');"><s>删除条件</s></li>';					
			}else{
				html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'editNodeWhere\',\''+key+'\');"><s>添加条件</s></li>';
			}

		}else{
			html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'createNode\',\''+key+'\');"><s>创建节点</s></li>';
		}
	html += '</div>';
	return html;
};

// 右键内容显示
uinv.FCM.configMgr.model.selector.contextMenuShow = function(e, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.contextMenuHide();
	var html = _this.getContextMenuHtml(e, key);
	_obj.form.box.append(html);	
	
	_obj.translate();
};

// 右键隐藏
uinv.FCM.configMgr.model.selector.contextMenuHide = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.config-contextmenu').remove();
};

// 选中
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

// 取消选中
uinv.FCM.configMgr.model.selector.cancelSelectNode = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.selectKey = '';
	_obj.form.box.find(_this.classStr).find('.ok').removeClass('ok');
};

// 初始化
uinv.FCM.configMgr.model.selector.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = function(){
		_obj.model.stringDB.set( _this.index, _this.obj, function(){} );
	};

	_this.obj = _obj.model.stringDB.get(_this.index);
	_this.classStr = classStr;
	
	_obj.form.box.find(_this.classStr).html( _this.treeHtml() );
	
	_obj.form.box.find(_this.classStr).click(function(){
		_this.cancelSelectNode();
		_this.contextMenuHide();
	});
};


// 读取string数据
uinv.FCM.configMgr.model.stringDB.readString = function(){
	return uinv.server.manager.frame.getString();
};

// 写入到服务器的操作
uinv.FCM.configMgr.model.stringDB.writeString = function(str, fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;				
	uinv.server.manager.frame.saveString(str, false, function(result){
		if(result.success){
			if(typeof fun == 'function'){
				fun.apply(_this);
			}
		}else{
			_obj.note.alert(result.data);
		}
	});
};

// 索引stringdb信息
uinv.FCM.configMgr.model.stringDB.get = function(index){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var result = _this.readString();
	if(result.success){
		try{
			var obj = _obj.model.transform.str2obj(result.data);
			if(typeof(obj[index]) == "undefined"){
				return {};
			}else{
				return  obj[index];
			}
		}catch(e){
			return {};
		}

	}else{
		_obj.note.alert('stringDB.get() : ' + result.data);
		return {};
	}
};

// 写入stringdb索引信息
uinv.FCM.configMgr.model.stringDB.set = function( index , obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if( typeof obj == 'undefined' ) { 
		return false;
	};

	var result = _this.readString();
	if(result.success){
		if(result.data){
			var db = _obj.model.transform.str2obj(result.data);
		}else{
			var db = {};
		}

		db[index] = obj;
		var str = _obj.model.transform.obj2str(db);
		_this.writeString( str, fun );
	}else{
		alert(result.data);
	}
};

// 对象转换到str
uinv.FCM.configMgr.model.transform.obj2str = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof o == 'undefined'){
		return '""';
	}
	
    var r = [];
    if( typeof o == "string" ){
        return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    }
    if( typeof o == "object" ){
        if(!o.sort){
            for(var i in o){
                r.push( "\"" + i + "\"" + ":" + _this.obj2str(o[i]) );
            }
            if( !!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString) ){
                r.push( "toString:" + o.toString.toString() );
            }
            r= "{"+r.join()+"}";
        }else{
            for( var i=0,k = o.length; i<k ; i++ ){
                r.push( _this.obj2str(o[i]) );
            }
            r= "[" + r.join() + "]";
        } 
        return r;
    } 
    return o.toString();
};

// 字符串到obj
uinv.FCM.configMgr.model.transform.str2obj = function(s){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof s == "string"){
		s = s.replaceAll("\r\n",'');
		s = s.replaceAll("\n",'');
		s = s.replaceAll("\t",'');
		try{
			return eval("(function(){ return  " + s + " })();");
		}catch(e){
			//_obj.note.alert('str2obj:'+e);
			return false;
		}
		
	}else{
		//_obj.note.alert('str2obj:参数必须是字符串！');
		return false;
	}
};

// 生成key的字符范围
uinv.FCM.configMgr.model.key.str = [
	'a','b','c','d','e','f','g','h','i','j','k','l','m',
	'o','p','q','r','s','t','x','u','v','y','z','w','n',
	'0','1','2','3','4','5','6','7','8','9'
];

// 生成随机数
uinv.FCM.configMgr.model.key.randint = function(n,m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
};

// 生成随机字符
uinv.FCM.configMgr.model.key.randStr = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var leng = _this.str.length - 1;
	var randkey = _this.randint(0, leng);
	return _this.str[randkey];
};

// 生成随机字符串
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


/************* 图层 ****************/

// 全局图层管理类名
uinv.FCM.configMgr.model.layer.globalLayerManagementBoxClass = 'layer-global';

// 数据索引
uinv.FCM.configMgr.model.layer.index = 'layer';

// 上传图层的对象
uinv.FCM.configMgr.model.layer.uploadLayerSelector = '';

// 对象合集
uinv.FCM.configMgr.model.layer.obj = null;

// 上移按钮类名称定义
uinv.FCM.configMgr.model.layer.upMoveBtnClass = 'upmove';

// 操作类的名称定义
uinv.FCM.configMgr.model.layer.classStr = '';

// 根据key查找到Obj
uinv.FCM.configMgr.model.layer.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i = 0,k=_obj.data.layer.length; i<k; i++){
		if( key == _obj.data.layer[i]['key']){
			return _obj.data.layer[i];
		}
	}
	return {};
};

// 根据key删除obj
uinv.FCM.configMgr.model.layer.keyDelObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i = 0, k = _obj.data.layer.length; i<k; i++){
		if( key == _obj.data.layer[i]['key'] ){
			_obj.data.layer.splice(i,1);
			return true;
		}
	}
	
	return false;
};

// 创建对象入口函数
uinv.FCM.configMgr.model.layer.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.selector.show(function( obj ){
		// 检查是否已存在对象
		var bool = _this.checkObjectExist( obj['where'] );
		if(bool) {
			_obj.note.alert('错误：条件[ '+_obj.model.transform.obj2str(obj['where'])+' ] 的对象已存在!' );
			return false;
		}
	
		// 关闭窗口
		_obj.model.selector.cancelAddNodeWhere();
		
		// 写入对象
		var comObj = _this.addObject( obj );
		
		// 画出html
		var html = _this.mkhtml( comObj );
		$(_this.classStr).append( html );
	});
};

// 插入分割线
uinv.FCM.configMgr.model.layer.insertDividingLine = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(!key){
		_obj.note.dialog('错误：请指定对象！');
		return false;
	}
	
	var html = _this.mkHtmlList({'key':key},{'name':u.le.get('分割线')});
	var box = $(obj).parents('.list').find('ul');
	box.append(html);
	var dom = box.find('li:last').find('*[name][cate][value]').get(0);
	dom.checked = true;
	_this.checkd(dom);
	dom.disabled = true;
};

// 删除物体
uinv.FCM.configMgr.model.layer.deleteObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyDelObj(key);
	
	// 删除节点
	_obj.form.box.find('.obj-' + key).remove();
};


// 删除对象图层
uinv.FCM.configMgr.model.layer.deleteObjLayer = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var layerKey  = $(obj).parents('li').find('*[cate][name][value]').attr('value');
	
	if(layerKey == u.le.get('分割线')){
		
		$(obj).parents('li').remove();
		
	}else{
		com = _obj.note.confirm('确定删除吗？');
		
		if(!com){
			return false;
		}
		
		for(var i in _obj.data.layer){
			_this.keyDeleteObjLayerLi(_obj.data.layer[i]['key'], layerKey);
			_this.keyDeleteObjLayer(_obj.data.layer[i], layerKey);
		}
	}
};

// 根据对象，删除图层key
uinv.FCM.configMgr.model.layer.keyDeleteObjLayer = function(obj, layerKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if( _obj.model.array.inArray(layerKey, obj['order']) ){
		var index = _obj.model.array.strInArrayIndex( layerKey, obj['order'] );
		obj['order'].splice(index,1);
	}
	
	if( _obj.model.array.inArray(layerKey, obj['item']) ){
		var index = _obj.model.array.strInArrayIndex( layerKey, obj['item'] );
		obj['item'].splice(index,1);
	}
};

// 根据对象key，图层项库key，删除li
uinv.FCM.configMgr.model.layer.keyDeleteObjLayerLi = function(objkey,layerkey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.box.find( _this.classStr ).find('.obj-' + objkey).find('li').each(function(){
		if( $(this).find('*[cate][name][value]').attr('value') == layerkey ){
			$(this).remove();
		}
	});
};

// 修改名称
uinv.FCM.configMgr.model.layer.modifyObjectName = function(key,obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var value = $(obj).html();
	var h3 = $(obj).parent();
	h3.html( '<input type="text" value="'+value+'" />' );
	h3.find('input').focus().blur(function(){
		_this.keyFindObj(key)['name'] = $(this).val();
		$(this).parent().html( '<span onclick="uinv.FCM.configMgr.model.layer.modifyObjectName(\''+key+'\',this);">' +  $(this).val() + '</span>');
	}).keydown(function(evt){
		var e = evt || windown.event;
		if(e.keyCode == 13){
			_this.keyFindObj(key)['name'] = $(this).val();
			$(this).parent().html('<span onclick="uinv.FCM.configMgr.model.layer.modifyObjectName(\''+key+'\',this);">' +  $(this).val() + '</span>');
		}
	});
};

// 创建对象的dom对象
uinv.FCM.configMgr.model.layer.mkhtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var html = '';
	html += '<div class="list obj-'+obj['key']+'">';
		html += '<div class="header" style="position:relative;">';
			html += '<h3><span onclick="uinv.FCM.configMgr.model.layer.modifyObjectName(\''+obj['key']+'\',this);">'+obj['name']+'</span></h3>';
			html += '<span class="action" style="position:absolute;right:10px;">';
				html += '<a onclick="uinv.FCM.configMgr.model.layer.deleteObj(\''+obj['key']+'\');" href="javascript:void(0);"><s>删除</s></a>';
				html += ' | ';
				html += '<a onclick="uinv.FCM.configMgr.model.layer.insertDividingLine(this,\''+obj['key']+'\');" href="javascript:void(0);"><s>分割线</s></a>';
			html += '</span>';
		html += '</div>';
		html += '<ul>';
		
		for(var i=0,k=obj['order'].length; i<k; i++){
			if( obj['order'][i] in _this.obj ){
				html += _this.mkHtmlList( obj, _this.obj[obj['order'][i]] );
			}else{
				html += _this.mkHtmlList( obj, {'name':obj['order'][i] });
			}
		}
		html += '</ul>';
	html += '</div>';
	
	return html;
};

// 创建单个li DOM
uinv.FCM.configMgr.model.layer.mkHtmlList = function(obj, layer){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = typeof layer['__key'] == 'string' ? layer['__key'] : layer['name'];
	var delbtnValue = layer['name'] == u.le.get('分割线') ? '撤销' : '删除';
	
	var html = '';
	html += '<li>';
		html +=  '<span class="layer_name">'+layer['name']+'</span>';
		html += '<span class="action layer_up">';
			html += '<a onclick="uinv.FCM.configMgr.model.layer.upMove(this);" class="'+_this.upMoveBtnClass+'" href="javascript:void(0);" style="display:none;"><s>上移</s></a>';
			html += '</span>';
			if( typeof layer['itemConfig'] == 'object' ){
				html += '<span class="layer_edit">';
				html += '<a onclick="uinv.FCM.configMgr.model.layer.itemConfig(\''+key+'\',\''+obj.key+'\');" href="javascript:void(0);"><s>编辑</s></a>';
				html += '</span>';				
			}else{
				html += '<span class="layer_edit">';
				html +='&nbsp;';
				html +='</span>';
			}
			html += '<span class="layer_del">';
			html += '<a onclick="uinv.FCM.configMgr.model.layer.deleteObjLayer(this);" href="javascript:void(0);"><s>'+delbtnValue+'</s></a>';
			html += '</span>';
			html += '<span class="layer_checkbox">';
			html += '<input onclick="uinv.FCM.configMgr.model.layer.checkd(this);"';
			html += ' name="'+ obj['key'] +'" value="'+ key +'"';
			html += ' cate="layer" path="layer" type="checkbox" />';
		html += '</span>';
	html += '</li>';
	
	return html;
};


// 编辑配置界面弹开
uinv.FCM.configMgr.model.layer.itemConfig = function(key, objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	
	if(typeof _this.obj[key]['itemConfig'] == 'undefined'){
		_this.note.alert('此项不可编辑，数据错误！');
	}

	_layer = _this.keyFindObj(objectKey);
	_layer['itemData'] = typeof _layer['itemData'] == 'undefined' ? {} : _layer['itemData'];
	_layer['itemData'][key] = typeof _layer['itemData'][key] == 'undefined' ? {} : _layer['itemData'][key];

	var html = '';
	html += '<div class="itemConfig" style="padding:10px;">';
	for(var i = 0 , k = _this.obj[key]['itemConfig'].length; i<k; i++){
		if( typeof _this.itemConfigTypeToHtml[_this.obj[key]['itemConfig'][i]['type']] == 'function' ){
			html += _this.itemConfigTypeToHtml[_this.obj[key]['itemConfig'][i]['type']](_this.obj[key]['itemConfig'][i],key, objectKey);
		}
	}
	html += '<p class="action">';
		html += '<input class="btn_cancel" onclick="uinv.FCM.configMgr.model.dialog.close();" />';
		html += '<input class="btn_save" onclick="uinv.FCM.configMgr.model.layer.itemConfigSubmit();" />';
	html += '</p>';
	
	html += '</div>';
	
	_obj.model.dialog.show(html);
	_this.itemConfigFormInit(objectKey);
};

// 根据类型不同，给出不同的表单
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml = {};

// 字符串类型
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['string'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj['defaultItem'] == 'undefined' ? '' :  obj['defaultItem'];
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span>'+obj['name']+'</span>';	
	 	}else{
	 		html += '<span>'+obj['caption']+'</span>';
	 	}
 	
	 	html += '<br />';
 		html += '<input type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="string" path="'+key+'" value="'+value+'" />';
 	
 	html += '</p>';
 	return html;
};

// 数字类型
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['number'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj['defaultItem'] == 'undefined' ? '' :  obj['defaultItem'];
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span>'+obj['name']+'</span>';	
	 	}else{
	 		html += '<span>'+obj['caption']+'</span>';
	 	}
 	
	 	html += '<br />';
 		html += '<input type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="number" path="'+key+'" value="'+value+'" />';
 	
 	html += '</p>';
 	return html;
};

// 布尔类型
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['bool'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj['defaultItem'] == 'undefined' ? false :  obj['defaultItem'];
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span>'+obj['name']+'</span>';	
	 	}else{
	 		html += '<span>'+obj['caption']+'</span>';
	 	}
 	
	 	html += '<br />';
	 	
	 	if(value){
 			html += obj['items'][true]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="bool" path="'+key+'" value="1" checked /> ';
 			html += obj['items'][false]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="bool" path="'+key+'" value="0" /> ';
	 	}else{
	 		html += obj['items'][true]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="bool" path="'+key+'" value="1" /> ';
 			html += obj['items'][false]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="bool" path="'+key+'" value="0" checked /> ';
	 	}
	 	
 	html += '</p>';
 	return html;
};

// 颜色
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['color'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj['defaultItem'] == 'undefined' ? '#FFFFFF' :  obj['defaultItem'];
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span>'+obj['name']+'</span>';	
	 	}else{
	 		html += '<span>'+obj['caption']+'</span>';
	 	}
 	
	 	html += '<br />';
 		html += '<input type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="color" path="'+key+'" value="'+value+'"  />';
 	
 	html += '</p>';
 	return html;
};

// 3dposition
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['3dposition'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
 	var html = '';
 	html += '<div class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span>'+obj['name']+'</span>';	
	 	}else{
	 		html += '<span>'+obj['caption']+'</span>';
	 	}
	 	
 		html += '<ul>';
	 		html += '<li style="list-style:none;"><s>'+obj['items'][0]+'</s><input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="3dposition" path="'+key+'"  /></li>';
	 		html += '<li style="list-style:none;"><s>'+obj['items'][1]+'</s><input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="3dposition" path="'+key+'"  /></li>';
	 		html += '<li style="list-style:none;"><s>'+obj['items'][2]+'</s><input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="3dposition" path="'+key+'"  /></li>';
 		html += '</ul>';
 	
 	html += '</div>';
 	return html;					
};

// 2dposition
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['2dposition'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
 	var html = '';
 	html += '<div class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span><s>'+obj['name']+'</s></span>';	
	 	}else{
	 		html += '<span><s>'+obj['caption']+'</s></span>';
	 	}
	 	
 		html += '<ul>';
	 		html += '<li style="list-style:none;"><s>'+obj['items'][0]+'</s><input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="2dposition" path="'+key+'"  /></li>';
	 		html += '<li style="list-style:none;"><s>'+obj['items'][1]+'</s><input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="2dposition" path="'+key+'"  /></li>';
 		html += '</ul>';
 	
 	html += '</div>';
 	return html;					
};

// 下拉
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml['select'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj['defaultItem'] == 'undefined' ? '' :  obj['defaultItem'];
	
 	var html = '';
 	html += '<div class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj['caption'] == 'undefined' ){
	 		html += '<span>'+obj['name']+'</span>';	
	 	}else{
	 		html += '<span>'+obj['caption']+'</span>';
	 	}
	 	
	 	html += '<br />';
	 	html += '<select class="row_select" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="select" path="'+key+'">';
	 	for(var i = 0, k = obj['items'].length; i<k; i++){
	 		if( obj['items'][i]==value ){
	 			html += '<option value="'+obj['items'][i]+'" selected>'+obj['items'][i]+'</option>';
	 		}else{
	 			html += '<option value="'+obj['items'][i]+'">'+obj['items'][i]+'</option>';
	 		}
	 	}
	 	html += '</select>';
	 html += '</div>';
	 return html;
};

// 根据类型不同，初始化不同的控件
uinv.FCM.configMgr.model.layer.itemConfigInitData = {};

// 字符串
uinv.FCM.configMgr.model.layer.itemConfigInitData['string'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'string'){
		$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')]  );
	}
};

// 数字
uinv.FCM.configMgr.model.layer.itemConfigInitData['number'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'number'){
		$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] );
	}
};

// 布尔值
uinv.FCM.configMgr.model.layer.itemConfigInitData['bool'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if( typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'boolean' ){
		if( obj.value == '1' && _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] ){
			obj.checked = true;
		}else if( obj.value == '0' && !_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] ){
			obj.checked = true;
		}
	}
};

// 颜色
uinv.FCM.configMgr.model.layer.itemConfigInitData['color'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(  typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')]  == 'string' ){
		$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] );
	}
	_obj.model.colorpicke.show(obj);
};

// 3dposition
uinv.FCM.configMgr.model.layer.itemConfigInitData['3dposition'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof  _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')]  == 'object'){
		var index = $(obj).parents('li').index();
		$(obj).val(  _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')][index] );
	}				
};

// 2dposition
uinv.FCM.configMgr.model.layer.itemConfigInitData['2dposition'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'object'){
		var index = $(obj).parents('li').index();
		$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')][index] );
	}				
};

// select
uinv.FCM.configMgr.model.layer.itemConfigInitData['select'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if(typeof  _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] != 'undefined'){
		var value =  _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')];
		$(obj).find('option').each(function(){
			if($(this).attr('value') == value){
				this.selected = true;
			}else if( this.selected ){
				this.selected = false;
			}
		});
	}
};

// 根据类型不同，存储数据
uinv.FCM.configMgr.model.layer.itemConfigSetData = {};

// 字符串
uinv.FCM.configMgr.model.layer.itemConfigSetData['string'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
};

// 数字
uinv.FCM.configMgr.model.layer.itemConfigSetData['number'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = Number($(obj).val());
};


// 布尔值
uinv.FCM.configMgr.model.layer.itemConfigSetData['bool'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if( obj.checked ){
		if(obj.value == '1'){
			_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = true;
		}else{
			_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = false;
		}
	}
};

// 颜色
uinv.FCM.configMgr.model.layer.itemConfigSetData['color'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
};

// 3dposition
uinv.FCM.configMgr.model.layer.itemConfigSetData['3dposition'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if( typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'undefined' || _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].length == 3  ){
		_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = [];
	}
	
	_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].push( $(obj).val() );
};

// 2dposition
uinv.FCM.configMgr.model.layer.itemConfigSetData['2dposition'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	if( typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'undefined' || _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].length == 2  ){
		_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = [];
	}
	
	_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].push( $(obj).val() );
};

// select
uinv.FCM.configMgr.model.layer.itemConfigSetData['select'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
	$(obj).find('option').each(function(){
		if(this.selected){
			_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = $(this).attr('value');
		}
	});
};

// 根据不同类型初始化表单
uinv.FCM.configMgr.model.layer.itemConfigFormInit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
		if( typeof _this.itemConfigInitData[$(this).attr('cate')] == 'function' ){
			_this.itemConfigInitData[$(this).attr('cate')](this);
		}
	});
};

			
// 编辑配置提交
uinv.FCM.configMgr.model.layer.itemConfigSubmit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
		if( typeof _this.itemConfigSetData[$(this).attr('cate')] == 'function' ){
			_this.itemConfigSetData[$(this).attr('cate')](this);
		}
	});
	
	_obj.model.dialog.close();
};
	
// 添加HTML到指定的obj下
uinv.FCM.configMgr.model.layer.addLayerOneToObj = function( key, html ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.obj-' + key).find('ul').append(html);
};

			
// 根据value移除指定dom节点
uinv.FCM.configMgr.model.layer.removeObjLayerIsValue = function( key, value ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.obj-' + key).find('*[name="'+key+'"][value="'+value+'"]').parents('li').remove();
};

// 勾选或取消图层后排序
uinv.FCM.configMgr.model.layer.order = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var num = 0;
	var index = 0;
	_obj.form.box.find( '*[name='+$(obj).attr('name')+']' ).each(function(i){
		if( this.checked == true && this != obj){
			num++;
		}else if( this==obj ){
			index = i;
		}
	});
	
	// 排序
	if(index != num){
		if(obj.checked == true){
			_obj.form.box.find( '*[name='+$(obj).attr('name')+']:eq('+num+')' ).parents('li').before( $(obj).parents('li') );
		}else{
			_obj.form.box.find( '*[name='+$(obj).attr('name')+']:eq('+num+')' ).parents('li').after( $(obj).parents('li') );
		}
	}
};

// 显示上移按钮
uinv.FCM.configMgr.model.layer.showUpMoveBtn = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).show();
};


// 隐藏下移按钮
uinv.FCM.configMgr.model.layer.hideUpMoveBtn = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).hide();
};

// 点击图层勾选框后触发函数
// 初始化图层checkbox为true的时候也触发
uinv.FCM.configMgr.model.layer.checkd = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	// 排序
	_this.order(obj);
	
	if(obj.checked == true){
		// 添加class
		$(obj).parents('li').addClass('checked');
		
		// 显示 上移按钮
		_this.showUpMoveBtn(obj);
	}else{
		// 添加class
		$(obj).parents('li').removeClass('checked');	
		
		// 隐藏 上移按钮
		_this.hideUpMoveBtn(obj);
	}
	
};

// 重新排序已选数组，主要是为了解决排序问题
uinv.FCM.configMgr.model.layer.checkedLayerOrder = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var layerObj = _this.keyFindObj( name );
	var layerForm = _obj.form.box.find('*[name=' + name + ']:checked');
	
	if( layerObj['item'].length == layerForm.length ){
		for( var i = 0, k = layerObj['item'].length; i<k; i++ ){
			var obj = _obj.form.box.find('*[name=' + name + '][value="' + layerObj['item'][i] + '"]');
			var index = obj.parents('li').index();
			if(i != index){
				_obj.form.box.find( '*[name='+ name +']:eq('+ i +')' ).parents('li').before( obj.parents('li') );
			}
		}
	}
};

// 上移图层
uinv.FCM.configMgr.model.layer.upMove = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var checkObj =  $(obj).parents('li').find('input[type=checkbox][name]');
	
	// 如果图层没有被选中状态，就return退出，不执行上移操作
	if( checkObj.get(0).checked == false ) {
		return;
	}
	
	var index = $(obj).parents('li').index();
	
	// 如果图层排在首位就return退出，不执行上移操作
	if(index == 0){
		return;
	}
	
	// 上移操作
	index--;
	var name = checkObj.attr('name');
	_obj.form.box.find( '*[name='+name+']:eq('+index+')' ).parents('li').before( $(obj).parents('li') );	
};

// 判断对象是否已经存在key，避免重复
uinv.FCM.configMgr.model.layer.checkHasKey = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i = 0 ,k = _obj.data.layer.length ; i<k ; i++){
		if( _obj.data.layer[i]['key'] == key ){
			return true;
		}
	}
	
	return false;
};

// 把对象添加到内存的操作
uinv.FCM.configMgr.model.layer.addObject = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	do{
		var key = _obj.model.key.create(32);
		var bool = _this.checkHasKey(key);
	}while(bool);
	
	var comObj = {
		'key' : key,
		'name' : obj['name'],
		'obj' : obj['where'],
		'itemConfig' : {},
		'order' : [],
		'item' : []
	};
	
	for(var i in _this.obj ){
		comObj['order'].push(i);
	}
	
	_obj.data.layer.push(comObj);
	return comObj;
};
		
// 检测两个对象是否相等
uinv.FCM.configMgr.model.layer.judgeObjectIsEq = function(o1,o2){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = false;
	
	// 检测 classid相等
	if( typeof o1['classid'] != 'undefined' && typeof o2['classid'] != 'undefined' && o1['classid'] == o2['classid']){
		bool = true;
	}
	
	// 检测 name相等
	if( typeof o1['name'] != 'undefined' && typeof o2['name'] != 'undefined' && o1['name'] == o2['name']){
		bool = true;
	}
	
	// 检测attribute
	if( typeof o1['attribute'] != 'undefined' && typeof o2['attribute'] != 'undefined' && 
		o1['attribute'][0]['key'] ==  o2['attribute'][0]['key'] && o1['attribute'][0]['value'] ==  o2['attribute'][0]['value'] ){
			
		bool = true;
	}				
	
	return bool;
};

// 判断对象是否已经存在
uinv.FCM.configMgr.model.layer.checkObjectExist = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.layer.length; i<k; i++){
		if( _this.judgeObjectIsEq(obj, _obj.data.layer[i]['obj'] ) ){
			return true;
		}
	}
	
	return false;
};
	
// 添加图层操作
uinv.FCM.configMgr.model.layer.add = function(obj, fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	// 判断是添加到全局还是对象
	if( typeof _this.uploadLayerSelector == 'undefined'  ){
		_this.addLayerToGlobalLib( obj, _this.addLayerToGlobalLibCallback );
	}else{
		_this.addLayerToObjLib( obj, _this.addLayerToObjLibCallback );
	}

};

// 添加图层到全局对象 （内存操作）
uinv.FCM.configMgr.model.layer.addLayerToGlobalLib = function( obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = typeof obj['__key'] == 'string' ? obj['__key'] : obj['name'];
	
	_this.obj[key] = {};
		
	for(var i in obj){
		_this.obj[key][i] = obj[i];
	}
	
	if( typeof fun == 'function' ){
		fun.apply( _this, [obj] );
	}
};

// 添加图层到全局对象 回调
uinv.FCM.configMgr.model.layer.addLayerToGlobalLibCallback = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 添加图层全局对象下
	_this.obj[obj['name']] = _obj.model.object.clone(obj);
	
	// 添加到各个图层
	for(var i = 0,k=_obj.data.layer.length; i<k; i++){
		var key = _obj.data.layer[i]['key'];
		
		//_obj.data.layer[i]['lib'][obj['name']] = _obj.model.object.clone(obj);
		//_obj.data.layer[i]['order'].push( obj['name'] );
		
		var html = _this.mkHtmlList( {'key':key}, obj);
		_this.removeObjLayerIsValue( key, obj['name'] );
		_this.addLayerOneToObj( key , html );	
		
	}
};

// 对象写到服务器后回调函数
uinv.FCM.configMgr.model.layer.setDBCallback = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
};

// 添加图层到指定对象的图层库内
uinv.FCM.configMgr.model.layer.addLayerToObjLib = function( obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = obj['name'];
	
	if(typeof obj['__key'] == 'string'){
		key = obj['__key'];
	}
	
	var layerObj = _this.keyFindObj( _this.uploadLayerSelector );
	
	layerObj['lib'][key] = {};
	layerObj['order'].push(key);
	
	for(var i in obj){
		layerObj['lib'][key][i] = obj[i];
	}
	
	if( typeof fun == 'function' ){
		fun( layerObj, obj );
	}
};

// 添加图层到指定对象回调函数
uinv.FCM.configMgr.model.layer.addLayerToObjLibCallback = function( obj, layer ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 是否添加全部
	var appendAll = true;

	// 添加单个
	var key = typeof layer['__key'] == 'string' ? layer['__key'] : layer['name'];
	var html = _this.mkHtmlList( obj, layer );
	_this.removeObjLayerIsValue( obj['key'], key );
	_this.addLayerOneToObj( obj['key'] , html );
};

// 获取所有图层列表
uinv.FCM.configMgr.model.layer.getLayerList = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return _obj.model.stringDB.get(_this.index);
};

// 上传图层
uinv.FCM.configMgr.model.layer.upload = function(obj, selector){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(selector){
		var layerObj = _this.keyFindObj( selector );
		if(typeof layerObj['lib'] == 'undefined'){
			_obj.note.alert('错误：物体不存在！');
			return;
		}
	}
	
	_this.uploadLayerSelector = selector;
	var pathinfo = $(obj).val().split("\\");
	var filename = pathinfo[ pathinfo.length-1 ];

	uinv.server.manager.frame.upAndUnZip(obj, filename, function(result){ _this.uploadCallback(result); } );
};

// 上传图层回调函数 主要接受回传的图层内容，以做下一步处理
uinv.FCM.configMgr.model.layer.uploadCallback = function(result){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( result.success ){
		
		var obj = _obj.model.transform.str2obj(result.data);
		
		var bool = _this.verificationLayerData(obj);

		if(bool){
			if(_obj.model.array.isArray(obj)){
				for(var i = 0,k=obj.length; i<k; i++){
					_this.add(obj[i] , _this.addCallback );
				}
			}else{
				_this.add(obj , _this.addCallback );
			}							
		}
	}else{
		_obj.note.alert(result.data);
	}
};

// 检测上传图层数据的合法性
uinv.FCM.configMgr.model.layer.verificationLayerData = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var msg = '数据格式错误';
	if(_obj.model.array.isArray(obj)){
	
		for(var i = 0, k=obj.length; i<k; i++){
			if( !_obj.model.object.isObject( obj[i] ) || typeof obj[i]['name'] == 'undefined' ){
				_obj.note.dialog( msg );
				return false;
			}
		}
		
		return true;
		
	}else if( _obj.model.object.isObject( obj ) ){
		if( typeof obj['name'] != 'undefined' ){
			return true;
		}else{
			_obj.note.dialog( msg );
			return false;
		}
	}else{
		_obj.note.dialog( msg );
		return false;
	}
};

// 根据传入参数获取全局图层的html
uinv.FCM.configMgr.model.layer.globalLayerListHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	html += '<li style="margin:10px; position:relative;" key="'+ obj['name'] +'">';
		html += obj['name'];
		html += '<span class="action" style="position:absolute;right:0; top:0;">';
			html += '<a onclick="uinv.FCM.configMgr.model.layer.deleteGlobalLayer(this, \''+ obj['name']+'\');" href="javascript:void(0);"><s>删除</s></a>';
		html += '</span>';
	html += '</li>';
	
	return html;
};

// 全局图层管理入口
uinv.FCM.configMgr.model.layer.globalLayerManager = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	html += '<div style="width:500px;" class="'+_this.globalLayerManagementBoxClass+'">';
		html += '<div>';
			html += '<s>上传新图层</s><input type="file" onchange="uinv.FCM.configMgr.model.layer.upload(this);" /><br />';
			html += '<input type="text" /><button><s>添加分类</s></button>';
		html += '</div>';
		
		html += '<br />';
		
		html += '<ul style="width:100%;">';
		for(var i in _this.obj){
			html += _this.globalLayerListHtml( _this.obj[i] );
		}
		html += '</ul>';
		
		html += '<div class="action" style="width:100%;text-align:center;">';
			html += '<input class="btn_save" onclick="uinv.FCM.configMgr.model.dialog.close(uinv.FCM.configMgr.model.layer.globalLayerManagerCallBack);" />';
		html += '</div>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
};

// 关闭全局图层管理窗口回调函数
uinv.FCM.configMgr.model.layer.globalLayerManagerCallBack = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.stringDB.set( _this.index, _this.obj );
};
	
// 删除全局图层操作，只操作内存
uinv.FCM.configMgr.model.layer.deleteGlobalLayer = function(obj, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof _this.obj[key] != 'undefined' ){
		delete _this.obj[key];
	}
	
	$(obj).parents('li').remove();
};

// 初始页面入口
uinv.FCM.configMgr.model.layer.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = function(){
		_obj.model.stringDB.set( _this.index, _this.obj, _this.setDBCallback );
	};
	
	_this.classStr = classStr || _this.classStr;
	
	_this.obj = _this.getLayerList();

	var html = '';
	for(var i=0,k=_obj.data.layer.length; i<k; i++){
		html += _this.mkhtml( _obj.data.layer[i] );
	}
	
	_obj.form.box.find(_this.classStr).html(html);
};


/************ 图层END *************/


// 两个对象比较
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


// 覆盖对象
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

			
// 深度克隆对象
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

    _obj.note.alert("不能复制对象");
};

// 判断是是否是object类型
uinv.FCM.configMgr.model.object.isObject = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return o instanceof Object;
};

// RGB 头 Hex 转换
uinv.FCM.configMgr.model.colorpicke.toHex = function(aColor){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var strHex = "#";
	for(var i=0; i<aColor.length; i++){
		var hex = Number(aColor[i]).toString(16);
		
		if(hex === "0"){
			hex += hex;	
		}
		strHex += hex.substr(2,2);
	}
	
	if(strHex.length !== 7){
		//strHex = that;	
	}
	return strHex;

};
 		
// HEX色值转换到 [0/225,2/225,3/225] 
uinv.FCM.configMgr.model.colorpicke.toRgb = function(str){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var sColor = str.toLowerCase();
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
		
		//处理六位的颜色值
		var sColorChange = [];
		
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
		}

		return sColorChange;
	}else{
		return sColor;	
	}
};

// 默认弹开色盘时，左右显示的色块列表
uinv.FCM.configMgr.model.colorpicke.palette =  [
    ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
    "rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
    ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
    "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
    ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
    "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
    "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
    "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
    "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
    "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
    "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
    "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
    /*"rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
    "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",*/
    "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
    "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
];

// 显示色盘操作
uinv.FCM.configMgr.model.colorpicke.show = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = true;
	var value = obj.value.length >= 3 ? obj.value : _obj.data[$(obj).attr('path')][$(obj).attr('name')];
	$(obj).spectrum({
		color: value ,
		showInitial: bool,
		showAlpha: bool,
		showPalette: bool,
		showSelectionPalette: bool,
		clickoutFiresChange: bool,
		chooseText : u.le.get('确定'),
		cancelText : u.le.get('取消'),
		palette : _this.palette,
		change:function(color){
			$(this).val(color.toHexString());
		} 
	}).val( obj.value );
};

// dialog 唯一id
uinv.FCM.configMgr.model.dialog.id = '';

// 显示dialog 函数
// str 可以是一串字符 or HTML格式，宽高度自动计算并居中
// 你也可以外包一层div赋值width height决定dialog的宽高
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
			
// 关闭dialog操作
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

// 获取dialog DOM对象
uinv.FCM.configMgr.model.dialog.getObj = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return $('.config-dialog-'+_this.id);
};

// 条件范围
uinv.FCM.configMgr.model.statistics.where = ['<','>','='];

// 名字映射
uinv.FCM.configMgr.model.statistics.nameDisplay = {
	'availableU' : u.le.get('空间'),
	'load' : u.le.get('承重'),
	'power' : u.le.get('功耗')
};

// 默认颜色
uinv.FCM.configMgr.model.statistics.defaultColor = '#FFFFFF';
		
// 删除单行
uinv.FCM.configMgr.model.statistics.delRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	$(obj).parents('tr').remove();
};

// 添加单行
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

// 创建单条li
uinv.FCM.configMgr.model.statistics.mkhtmlTr = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof obj != 'object'){
		var obj = {};
	}
	
	obj['where'] = typeof obj['where'] == 'undefined' ? _this.where[0] :  obj['where'];
	obj['color'] = typeof obj['color'] == 'undefined' ? _this.defaultColor : obj['color'];
	obj['number'] = typeof obj['number'] == 'undefined' ? '' : obj['number'];

	var html = '';
	html += '<tr style="height:50px;" class="item">';
		html += '<td>';
			html += '<select key="where">';
			for(var i = 0,k = _this.where.length; i<k; i++){
				if(obj['where'] == _this.where[i]){
					html += '<option value="'+_this.where[i]+'" selected>'+_this.where[i]+'</option>';
				}else{
					html += '<option value="'+_this.where[i]+'">'+_this.where[i]+'</option>';
				}
			}
			html += '</select>';
		html += '</td>';
		html += '<td>';
			html += '<input type="text" key="number" value="'+obj['number']+'" />';
		html += '</td>';
		html += '<td>';
			html += '<input type="text" key="color" value="'+obj['color']+'" />';
		html += '</td>';
		html += '<td>';
			html += '<button onclick="uinv.FCM.configMgr.model.statistics.delRow(this);"><s>删除</s></button>';
		html += '</td>';
	html += '</tr>';
	
	return html;
};

//画出HTML
uinv.FCM.configMgr.model.statistics.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	for(var i in _obj.data.statistics){
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
	}
	_obj.form.box.find(_this.classStr).html(html);
	_obj.translate();
};

// 初始化
uinv.FCM.configMgr.model.statistics.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.classStr = classStr;
	_this.mkhtml();
};
	
// 上传资源文件夹定义
uinv.FCM.configMgr.model.resources.upResourcesDir = "/projects/resources";

// 删除文件列表
// 主要解决用户删除面板后，先把要删除的面板文件路径加入这个数组，待用户最后点击提交到服务器时再从服务器删除相应的文件
uinv.FCM.configMgr.model.resources.delFileArr = [];

// 创建DOM资源管理器的class类
uinv.FCM.configMgr.model.resources.resourcesManagerClass = 'resourcesManager';

// 设置某个对象的值
uinv.FCM.configMgr.model.resources.setData = function(key, param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.data.resources[key] = {
		'serverPath' : param['serverPath'],
		'localPath' : param['localPath'],
		'version' : param['version']
	};				
};

// 上传资源包后回调函数
uinv.FCM.configMgr.model.resources.uploadResourcesFileCallback = function(result){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(result.success){
		var param = _this.getResourcesManagerFormData();
		if(param['type'] == 'update'){
			var version = Number(param['version']) + 1;
			_this.setResourcesManagerFormData('version', version);
		}
		
		_this.resourcesManagerHandleCallback();
	}else{
		_this.note.alert(result.data);
	}
};
	
// 检测表单项
uinv.FCM.configMgr.model.resources.checkForm = function(param){
	var result = {
		'error' : 0,
		'msg'   : ''
	};
	
	if( typeof param['title'] == 'undefined' || param['title'] == "" ){
		result['error'] = 1;
		result['msg'] += "资源名称不能为空\r\n";
	}
	
	if( typeof param['serverPath'] == 'undefined' || param['serverPath'] == "" ){
		result['error'] = 1;
		result['msg'] += "服务器路径不能为空 \r\n";
	}
	
	if( typeof param['version'] == 'undefined' || param['version'] == "" ){
		result['error'] = 1;
		result['msg'] += "版本号不能为空 \r\n";
	}	

	if( typeof param['localPath'] == 'undefined' || param['localPath'] == "" ){
		result['error'] = 1;
		result['msg'] += "本地路径不能为空 \r\n";
	}
	
	if( param['type'] == 'create' && ( typeof param['resourcesFile'] == 'undefined' || param['resourcesFile'] == "" ) ){
		result['error'] = 1;
		result['msg'] += "资源包不能为空 \r\n";
	}
	
	return result;
};

// 创建资源最终写入对象处理函数
uinv.FCM.configMgr.model.resources.resourcesManagerHandleCallback = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var param = _this.getResourcesManagerFormData();

	if( typeof _obj.data.resources[param['originalTitle']] != 'undefined' ){
			delete _obj.data.resources[param['originalTitle']];
	}
	
	_this.setData(param['title'], param);
	
	// 关闭窗口
	_this.resourcesManagerClose();
	
	_this.mkhtml();
};	

// 创建新资源处理函数
uinv.FCM.configMgr.model.resources.handleResourcesManager = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var param = _this.getResourcesManagerFormData();
	var res = _this.checkForm(param);
	
	if( res['error'] ){
		_obj.note.alert( res['msg'] );
		return false;
	}
	
	if( param['resourcesFile'] != "" ){
		var pathinfo = _this.pathToFileNameAndFoder( param['serverPath']  ); 
		uinv.server.manager.frame.upFile(
			param['resourcesObj'],
			pathinfo['foder'],
			pathinfo['filename'],
			function(result){ _this.uploadResourcesFileCallback(result); }
		);				
	}else{
		_this.resourcesManagerHandleCallback();
	}
};

// 根据路径 返回 foder filename
uinv.FCM.configMgr.model.resources.pathToFileNameAndFoder = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var result = {};
	if( typeof path == 'string' ){
		var pathinfo = path.split('/');
		result['filename'] = pathinfo[pathinfo.length-1];
		pathinfo.pop();
		if(pathinfo.length >= 1){
			result['foder'] = pathinfo.join('/') + '/';
		}else{
			result['foder'] = '';
		}
	}else{
		result['filename'] = '';
		result['foder'] = '';
	}
	
	return result;
};

// 关闭资源管理窗口
uinv.FCM.configMgr.model.resources.resourcesManagerClose = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
};

// 创建资源弹窗
// key 存在表示修改操作
// key 为空表示创建操作
uinv.FCM.configMgr.model.resources.resourcesManager = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(key && typeof _obj.data.resources[key] == 'undefined'){
		_this.note.alert('对象不存在');
		return false;
	}
	
	var title = key || '';
	var type = key ? 'update' : 'create' ;
	var data = _this.keyFindObj(key);
	
	var html = '';
	html += '<div class="'+_this.resourcesManagerClass+'" style="width:400px; height:200px; padding:10px;">';
		html += '<p style="margin:10px auto 0;"><span><s>资源名称</s></span><input type="text" original="'+title+'" name="title" value="'+title+'" /></p>';
		html += '<p style="margin:10px auto 0; display:none;"><span><s>服务器目录</s></span><input type="text" original="'+data['serverPath']+'" name="serverPath" value="'+data['serverPath']+'" /></p>';
		html += '<p style="margin:10px auto 0;"><span><s>本地目录</s></span><input type="text" name="localPath" value="'+data['localPath']+'" /></p>';
		html += '<p style="margin:10px auto 0;"><span><s>版本</s></span><input type="text" name="version" value="'+data['version']+'" readonly /></p>';
		html += '<p style="margin:10px auto 0;"><span><s>资源包</s></span><input type="file" name="resourcesFile" /></p>';
		html += '<input type="hidden" name="type" value="'+type+'" />';
		html += '<p class="action">';
			html += '<input type="button" class="btn_cancel" onclick="uinv.FCM.configMgr.model.dialog.close();" />';
			html += '<input type="button" class="btn_save" onclick="uinv.FCM.configMgr.model.resources.handleResourcesManager(this);" />';
		html += '</p>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
};

// 根据key找到对象，如果key不存在，则返回空对象
uinv.FCM.configMgr.model.resources.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof key == 'undefined' || typeof _obj.data.resources[key] == 'undefined' ){
		var obj = {
			'title' : '',
			'serverPath' : _this.upResourcesDir,
			'localPath' : '',
			'version' : 1
		};	
	}else{
		var obj = _obj.data.resources[key];
	}
	
	return obj;
};

// 获取表单数据
uinv.FCM.configMgr.model.resources.getResourcesManagerFormData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var box = _obj.model.dialog.getObj().find( '.' + _this.resourcesManagerClass );
	
	// 固定目录
	if( box.find('input[name=resourcesFile]').val() != "" ){
		var pathinfo = box.find('input[name=resourcesFile]').val().split("\\");
		box.find('input[name=serverPath]').val( _this.upResourcesDir + "/" + pathinfo[pathinfo.length-1] );		
	}
	// END		
	
	return {
		'title' : $.trim(box.find('input[name=title]').val()),
		'originalTitle' : box.find('input[name=title]').attr('original'),
		'serverPath' : $.trim(box.find('input[name=serverPath]').val()),
		'originalServerPath' : box.find('input[name=serverPath]').attr('original'),
		'localPath' : $.trim(box.find('input[name=localPath]').val()),
		'resourcesFile' : $.trim(box.find('input[name=resourcesFile]').val()),
		'resourcesObj' : box.find('input[name=resourcesFile]').get(0),
		'version' : $.trim(box.find('input[name=version]').val()),
		'type' : box.find('input[name=type]').val()	
	};
};

// 设置表单数据
uinv.FCM.configMgr.model.resources.setResourcesManagerFormData = function(key,value){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var box = _obj.model.dialog.getObj().find( '.' + _this.resourcesManagerClass );
	box.find('input[name='+key+']').val(value);
};

			
// 创建dom列表
uinv.FCM.configMgr.model.resources.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i in _obj.data.resources){
		html += '<li style="list-style:none;">';
			html += '<h3>' + i + '</h3>';
			html += '<p>' + _obj.data.resources[i]['serverPath'] + '</p>';
			html += '<p>' + _obj.data.resources[i]['localPath'] + '</p>';
			html += '<p class="res_10">' + _obj.data.resources[i]['version'] + '</p>';
			html += '<p class="res_10">';
				html += '<a onclick="uinv.FCM.configMgr.model.resources.delResource(\''+i+'\');" href="javascript:void(0);"><s>删除</s></a>';
			html += '</p>';
			html += '<p class="res_10">';
				html += '<a onclick="uinv.FCM.configMgr.model.resources.resourcesManager(\''+i+'\');" href="javascript:void(0);"><s>更新</s></a>';
			html += '</p>';
		html += '</li>';
	}
	
	_obj.form.box.find(_this.classStr).html( html );
	_obj.translate();
};
		
// 删除资源
uinv.FCM.configMgr.model.resources.delResource = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	 
	if( typeof _obj.data.resources[key] != 'undefined'  ){
		_this.delFileArr.push(_obj.data.resources[key]['serverPath']);
		delete _obj.data.resources[key];
	}

	_this.mkhtml();
};

// 备份接口
// 获取所有服务器路径文件
uinv.FCM.configMgr.model.resources.backupFiles = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var files = [];
	for(var i in _obj.data.resources){
		files.push( _obj.data.resources[i]['serverPath'] );
	}
	
	return files;
};

// 资源初始化
uinv.FCM.configMgr.model.resources.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = 	function(){
		while( _this.delFileArr.length >= 1 ){
			var path = _this.delFileArr.pop(); 
			uinv.server.manager.frame.delFile(path);
		}
	};
	
	_this.classStr = classStr || '.resources-list';
	_this.mkhtml();
};

// DOM 类名
uinv.FCM.configMgr.model.viewpoint.classStr = '';

// 创建对象
uinv.FCM.configMgr.model.viewpoint.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.selector.show(function(obj){
		_obj.model.selector.cancelAddNodeWhere();
		var o = _this.addObjectToMemory(obj);
		_this.addHtmlRow(o);
	});
};

// key查找对象
uinv.FCM.configMgr.model.viewpoint.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
		if( _obj.data.viewpoint[i]['key'] == key ){
			return _obj.data.viewpoint[i];
		}
	}
	
	return false;
};

// key查找obj的index
uinv.FCM.configMgr.model.viewpoint.keyFindIndex = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
		if( _obj.data.viewpoint[i]['key'] == key ){
			return i;
		}
	}				
};

// 生成唯一key
uinv.FCM.configMgr.model.viewpoint.createKey = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	do{
		var key = _obj.model.key.create(32);
	}while( _this.keyFindObj(key) );
	
	return key;
};

// 添加数据到内存
uinv.FCM.configMgr.model.viewpoint.addObjectToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var o = {
		'name' : obj['name'],
		'where' : obj['where'],
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

// dom添加单行
uinv.FCM.configMgr.model.viewpoint.addHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	_obj.form.box.find(_this.classStr).append( _this.mkhtmlRow(obj) );
	_obj.translate();
};

// 动态创建每行dom节点
uinv.FCM.configMgr.model.viewpoint.mkhtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	var html = '';
	html += '<div class="row" key="'+obj['key']+'">';
		html += '<h3><span onclick="uinv.FCM.configMgr.model.viewpoint.objectRename(this,\''+obj['key']+'\');" class="name">'+obj['name']+'</span></h3>';
		html += '<a onclick="uinv.FCM.configMgr.model.viewpoint.objectDelete(this,\''+obj['key']+'\');" href="javascript:void(0);"><s>删除</s></a>';
		html += '<div class="form">';
			for(var i in obj['data']){
				html += '<span>'+i+' : <input type="text" key="'+i+'" name="'+obj['key']+'" cate="viewpoint" path="viewpoint" /></span>';
			}
		html += '</div>';
	html += '</div>';
	return html;
};

// 创建dom节点
uinv.FCM.configMgr.model.viewpoint.mkhtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
		html += _this.mkhtmlRow(_obj.data.viewpoint[i]);	
	}
	
	_obj.form.box.find(_this.classStr).html(html);
	_obj.translate();
};

// 重命名
uinv.FCM.configMgr.model.viewpoint.objectRename = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var dom = $(obj).parent();
	var html = dom.html();
	dom.html( '<input type="text" value="'+$(obj).html()+'" />' );
	dom.find('input').focus().blur(function(){
		_this.keyFindObj(key)['name'] = $(this).val();
		dom.html(html);
		dom.find('span').html( $(this).val() );
	}).keydown(function(evt){
		var e = evt || window.event;
		if(e.keyCode == 13){
			_this.keyFindObj(key)['name'] = $(this).val();
			dom.html(html);
			dom.find('span').html( $(this).val() );
		}
	});
};

// 删除对象
uinv.FCM.configMgr.model.viewpoint.objectDelete = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.keyFindIndex(key);
	_obj.data.viewpoint.splice(index,1);
	$(obj).parents('*[key='+key+']').remove();
};

// 初始化
uinv.FCM.configMgr.model.viewpoint.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.classStr = classStr || '';
	_this.mkhtml();
};

// 模块列表
uinv.FCM.configMgr.model.backup.model = {
	'视角' : { 'model' : 'viewpoint' , 'data' : 'viewpoint'  },
	'监控' : { 'model' : 'monitor' , 'data' : 'monitor'  },
	'图层' : { 'model' : 'layer' , 'data' : 'layer' },
	'面板' : { 'model' : 'panel' , 'data' : 'panel' },
	'资源' : { 'model' : 'resources' , 'data' : 'resources' },
	'统计' : { 'model' : 'statistics', 'data' : 'statistics' },
	'选择' : { 'model' : 'selector', 'data' : 'selector' },
	'系统' : { 'data' : 'system' },
	'布局' : { 'data' : 'layout' },
	'下载' : { 'data' : 'download' }
};

// 备份的模块
uinv.FCM.configMgr.model.backup.backModel =  [
	'视角','图层','资源','下载','监控',
	'统计','选择','系统','布局'
];

// 备份文件夹列表
uinv.FCM.configMgr.model.backup.folders = [];

// 备份文件列表
uinv.FCM.configMgr.model.backup.files = [];

// 备份数据
uinv.FCM.configMgr.model.backup.text = '';

// 初始化数据
uinv.FCM.configMgr.model.backup.initData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.folders = [];
	_this.files = [];
	_this.text = '';
};

// 更新 文件夹 文件数组
uinv.FCM.configMgr.model.backup.updateFileArr = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.initData();
	
	// 添加全局路径
	_this.folders.push(_obj.global.path);
	
	for(var i=0,k=_this.backModel.length;i<k;i++){
		if( typeof _this.model[_this.backModel[i]]['model'] != 'undefined' && typeof _obj.model[_this.model[_this.backModel[i]]['model']]['backupFiles'] == 'function'  ){					
			var arr =  _obj.model[_this.model[_this.backModel[i]]['model']]['backupFiles']();
			for(var n=0,m=arr.length;n<m;n++){
				_this.files.push(arr[n]);
			}
		}
		
		if( typeof _this.model[_this.backModel[i]]['model'] != 'undefined' && typeof _obj.model[_this.model[_this.backModel[i]]['model']]['backupFolders'] == 'function'  ){					
			var arr =  _obj.model[_this.model[_this.backModel[i]]['model']]['backupFolders']();
			for(var n=0,m=arr.length;n<m;n++){
				_this.folders.push(arr[n]);
			}
		}
	}
};

// 更新备份文本
uinv.FCM.configMgr.model.backup.updateText = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var o = { 
		'config' : _obj.model.transform.str2obj( uinv.server.manager.frame.getFrameConfig()['data'] ),
		'string' : _obj.model.transform.str2obj( uinv.server.manager.frame.getString()['data'] )
	};
	
	var backObj = {
		'config' : {},
		'string' : {}
	};
	
	for(var i=0,k=_this.backModel.length;i<k;i++){ 
		if( typeof _this.model[_this.backModel[i]]['data'] != 'undefined' && typeof o['config'][_this.model[_this.backModel[i]]['data']] != 'undefined' ){
			backObj['config'][_this.model[_this.backModel[i]]['data']] = o['config'][_this.model[_this.backModel[i]]['data']];
		}
		
		if( typeof _this.model[_this.backModel[i]]['data'] != 'undefined' && typeof o['string'][_this.model[_this.backModel[i]]['data']] != 'undefined' ){
			backObj['string'][_this.model[_this.backModel[i]]['data']] = o['string'][_this.model[_this.backModel[i]]['data']];
		}					
	}
	
	_this.text = _obj.model.transform.obj2str( backObj );
};

// 配置压缩
uinv.FCM.configMgr.model.backup.configCompression = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.updateFileArr();
	_this.updateText();
	
	uinv.server.manager.frame.placeZip( _this.text, _this.folders, _this.files, function(result){
		if(result.success){
			document.location = _obj.global.projectPath + result.data;
		}else{
			_obj.note.alert(result.data);
		}
	});
};

// 上传备份
uinv.FCM.configMgr.model.backup.configUpload = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var path = obj.value.split('\\');
	fileName = path.pop();
	uinv.server.manager.frame.upAndUnZip(obj, fileName, function(result){
		if(result.success){
			try{
				var o = _obj.model.transform.str2obj(result.data);
			}catch(e){
				_obj.note.alert('数据格式错误！');
				return false;
			}
			
			_this.setData(o);
		}else{
			_obj.note.alert(result.data);
		}
	});
	
};

// 写入数据
uinv.FCM.configMgr.model.backup.setData = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = { 
		'config' : _obj.model.transform.str2obj( uinv.server.manager.frame.getFrameConfig()['data'] ),
		'string' : _obj.model.transform.str2obj( uinv.server.manager.frame.getString()['data'] )
	};
	
	if( typeof o['config'] == 'object' ){
		for(var i in o['config']){
			obj['config'][i] = _obj.model.object.clone( o['config'][i] );
		}
	}
	
	if( typeof o['string'] == 'object' ){
		for(var i in o['string']){
			obj['string'][i] = _obj.model.object.clone( o['string'][i] );
		}
	}				
	
	uinv.server.manager.frame.saveFrameConfig( _obj.model.transform.obj2str(obj['config']) );
	uinv.server.manager.frame.saveString( _obj.model.transform.obj2str(obj['string']), false);
	_this.updateConfig(obj);
};

// 更新备份
uinv.FCM.configMgr.model.backup.updateConfig = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;			
	
	_obj.data = _obj.model.object.clone(o['config']);
	_obj.form.init();
};

// 相册路径
uinv.FCM.configMgr.model.images.path = '/Images';

// 操作项目目录 ， 在弹开相册的时候传入
uinv.FCM.configMgr.model.images.dir = '';

// 相册列表图片的默认高度
uinv.FCM.configMgr.model.images.imgHeight = 50;

// 相册列表图片的默认宽度
uinv.FCM.configMgr.model.images.imgWidth = 100;

// 相册列表文件名过滤列表
uinv.FCM.configMgr.model.images.limit = [
	'.svn'
];

// 图片上传
// obj file对象
// dir 上传目录
uinv.FCM.configMgr.model.images.imUpload = function(obj, dir){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.dir = dir || _this.dir;
	var pathinfo = obj.value.split('\\');
	var filename = encodeURIComponent(pathinfo[pathinfo.length-1]).replaceAll('%','_');
	uinv.server.manager.frame.upImage(obj, _obj.global.path + _this.path + _this.dir , filename, function(result){_this.uploadImagesCallback(result);}); 
};

// 删除相片函数
uinv.FCM.configMgr.model.images.delImages = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	uinv.server.manager.frame.delImage(path, function(result){ _this.deleteImagesCallback(result); });	
};

// 关闭相册操作
uinv.FCM.configMgr.model.images.close = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.close();
};

// 上传图片回调函数
uinv.FCM.configMgr.model.images.uploadImagesCallback = function(result){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(result.success){
		// 重新构建列表
		_this.updateList();
		_obj.model.dialog.getObj().find('.img .right .views').html('');
	}else{
		_obj.note.alert(result.data);
	}
};

// 删除图片回调函数
uinv.FCM.configMgr.model.images.deleteImagesCallback = function(result){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(result.success){
		// 重新构建列表
		_this.updateList();
		// 右侧大图取消
		_obj.model.dialog.getObj().find('.img .right .views').html('');
		
		var okobj = _obj.model.dialog.getObj().find('.img .left .imglist li.ok img');
		var obj = _obj.form.box.find('*[name='+_this.name+']');
		if( obj.attr('src') != okobj.attr('src') ){
			obj.attr('src','');
		}
	}
};

// 选择图片操作
uinv.FCM.configMgr.model.images.selectImg = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.getObj().find('.img .imglist li.ok').each(function(){
		$(this).removeClass('ok');
	});
	
	$('*[name=' + _this.name + ']').attr('src', $(obj).find('img').attr('src') );
	
	$(obj).addClass('ok');
};

			
// 获取相册数据
uinv.FCM.configMgr.model.images.getData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var path = _obj.global.path + _this.path + _this.dir;
	var result = uinv.server.manager.frame.getImages(path);
	
	if(result.success){
		return result.data;
	}else{
		return [];
	}
};

// 相册面板右侧显示大图，传入img对象，即可显示，并自动居中
uinv.FCM.configMgr.model.images.viewsImg = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var img = '<img src="'+$(obj).attr('src')+'" />';
	_obj.model.dialog.getObj().find('.img .right .views').html(img);
	var $obj = _obj.model.dialog.getObj().find('.img .right .views img');
	$obj.css({
		'margin-left':'-'+parseInt($obj.outerWidth()/2,10)+'px',
		'margin-top':'-'+parseInt($obj.outerHeight()/2,10)+'px'
	});
	
};

// urldecode
uinv.FCM.configMgr.model.images.decode = function(str){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	// 把 _ 替换 % 因为之前为了方便urldecode编码命名
	return decodeURIComponent(str.replaceAll('_','%'));
};

// 更新图片HTML列表函数
uinv.FCM.configMgr.model.images.updateList = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var data = _this.getData();
	var path = _obj.global.path + _this.path + _this.dir + '/';
	
	var arr = [];
	for(var i=0,k=data.length; i<k; i++){
		
		if( _obj.model.array.inArray(data[i], _this.limit)){
			continue;
		}
		
		var value = _obj.form.box.find('*[name='+ _this.name +']').attr('src');
		
		if( value ){
			var pathinfo = value.split('/');
			var filename = pathinfo[ pathinfo.length-1 ];
		}else{
			var filename = '';
		}
		
		if(filename == data[i]){
			var cla = 'ok';
		}else{
			var cla = '';
		}
		
		var img = '';
		img += '<li class="' + cla + '" onmouseover="uinv.FCM.configMgr.model.images.viewsImg( $(this).find(\'img\').get(0) );" onclick="uinv.FCM.configMgr.model.images.selectImg(this);" >';
			img += '<img onerror="$(this).parent().remove();" src="'+ _obj.global.projectPath + path+data[i]+'" style="max-width:'+_this.imgWidth+'px;max-height:'+_this.imgHeight+'px;" title="'+_this.decode(data[i])+'" />';
			img += '<a onclick="uinv.FCM.configMgr.model.images.delImages(\''+path+data[i]+'\');" class="deletebtn" href="javascript:void(0);">DEL</a>';
		img += '</li>';
		
		arr.push(img);
		
	}
	
	_obj.model.dialog.getObj().find('.img .left .imglist').html(arr.join(''));
};

// 鼠标移除左侧图片列表框后操作函数
uinv.FCM.configMgr.model.images.out = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var obj = _obj.form.box.find('*[name='+_this.name+']').get(0);
	_this.viewsImg(obj);
};

// 相册显示主函数入口
uinv.FCM.configMgr.model.images.show = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.dir = param.dir || 'global';
	_this.name = param.name || 'global';
	
	if(_this.dir.substr(0,1) != "/" ){
		_this.dir = "/" + _this.dir;
	}
	
	var html = '';
	html += '<div class="img">';
		html += '<div class="left">';
			html += '<div class="header">';
				html += '<h3><s>图片选择器</s></h3>';
				html += '<div class="action">';
					html += '<span class="uploadbtn">';
						html += '<a href="javascript:void(0);"><s>上传图片</s>';
							html += '<input onchange="uinv.FCM.configMgr.model.images.imUpload(this);" type="file"  />';
						html += '</a>';
					html += '</span>';
				html += '</div>';
			html += '</div>';
			html += '<div class="imglist" onmouseout="uinv.FCM.configMgr.model.images.out();">Loading...</div>';
		html += '</div>';
		html += '<div class="right">';
			html += '<div class="views"></div>';
		html += '</div>';
		html += '<div class="close">';
			html += '<button onclick="uinv.FCM.configMgr.model.images.close();"><s>Close</s></button>';
		html += '</div>';
	html+= '</div>';
	
	_obj.model.dialog.show(html);
	_this.updateList();
};


uinv.FCM.configMgr.model.monitor.conditionArr = ['<','>','='];
uinv.FCM.configMgr.model.monitor.deleteFileArr = [];
uinv.FCM.configMgr.model.monitor.obj = null;
uinv.FCM.configMgr.model.monitor.objBoxClassStr = '';
uinv.FCM.configMgr.model.monitor.styleBoxClassStr = '';
uinv.FCM.configMgr.model.monitor.alarmlevelBoxClassStr = '';

uinv.FCM.configMgr.model.monitor.index = 'monitor';

uinv.FCM.configMgr.model.monitor.position = {
	'x' : [ {'name' : '左', 'value' : 'LEFT' },{ 'name' : '中' , 'value' : 'CENTER' },{ 'name' : '右', 'value' : 'RIGHT'} ],
	'y' : [ {'name' : '上', 'value' : 'TOP' },{ 'name' : '中', 'value' : 'CENTER' },{ 'name' : '下', 'value' : 'BOTTOM'} ],
	'z' : [ {'name' : '前', 'value' : 'FRONT' },{ 'name' : '中', 'value' : 'CENTER' },{ 'name' : '后', 'value' : 'BACK'} ]
};

uinv.FCM.configMgr.model.monitor.panelConfigAttributeField = [
	{ 'name' : '指标名称', 'value' : 'attributeName', 'type' : 'string' },
	{ 'name' : '单位', 'value' : 'unit', 'type' : 'string' },
	{ 'name' : '指标取值', 'value' : 'propertyPath', 'type' : 'string'},
	{ 'name' : '最小值', 'value' : 'min', 'type' : 'number'},
	{ 'name' : '最大值', 'value' : 'max', 'type' : 'number'},
	{ 'name' : '进度条', 'value' : 'isProgressBar', 'type' : 'boolean' },
	{ 'name' : '颜色设置', 'value' : 'styleConfig', 'type' : 'styleConfig' }
];

// 获取position的select列表
uinv.FCM.configMgr.model.monitor.getSelectOptionHtml = function(position, value){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	for(var i=0,k=_this.position[position].length; i<k; i++){
		if( value == _this.position[position][i].value ){
			html += '<option value="'+_this.position[position][i].value+'" selected>'+_this.position[position][i].name+'</option>';
		}else{
			html += '<option value="'+_this.position[position][i].value+'">'+_this.position[position][i].name+'</option>';
		}
	}
	
	return html;
};

// open config
uinv.FCM.configMgr.model.monitor.configShow = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var o = _this.keyFindObj(key);
	var panel = _this.nameFindPanel(o.panel);
	if(!panel){
		return false;
	}
	
	var imgSrc =  _obj.global.projectPath + _this.getPanelImagePath(panel) ;
	
	var html = '';
	html += '<div class="monitor">';
		html += '<div><span><s>面板图片</s></span><img src="'+imgSrc+'" /></div>';
		
		html += '<div class="each"  key="pivotLayout" cate="array">';
			html += '<span><s>二维位置</s></span>';
			html += '<span>';
				for(var i=0,tmp=['x','y','z'];i<tmp.length;i++){ 
					if(i==tmp.length-1){
						html += '<select name="pivotLayout" style="display:none;">'+_this.getSelectOptionHtml(tmp[i], panel.pivotLayout[i])+'</select>';
					}else{
						html += '<select name="pivotLayout">'+_this.getSelectOptionHtml(tmp[i], panel.pivotLayout[i])+'</select>';
					}
				}
			html += '</span>';
		html += '</div>';
		
		html += '<div class="each" key="layout" cate="array">';
			html += '<span><s>三维位置</s></span>';
			html += '<span>';
				for(var i=0,tmp=['x','y','z'];i<tmp.length;i++){ 
					html += '<select name="layout">'+_this.getSelectOptionHtml(tmp[i], panel.layout[i])+'</select>';
				}
			html += '</span>';
		html += '</div>';
		
		html += '<div class="each" key="layoutOffset" cate="array">';
			html += '<span><s>偏移设置</s></span>';
			html += '<span>';
				html += '<input type="text" name="layoutOffset" value="'+panel.layoutOffset[0]+'" /> m ';
				html += '<input type="text" name="layoutOffset" value="'+panel.layoutOffset[1]+'" /> m ';
				html += '<input type="text" name="layoutOffset" value="'+panel.layoutOffset[2]+'" /> m ';
			html += '</span>';
		html += '</div>';
		
		html += '<div class="each" key="canvasScale" cate="number">';
			html += '<span><s>面板大小</s></span>';
			html += '<span>';
				html += '<input type="text" name="canvasScale" value="'+panel.canvasScale+'" />';
			html += '</span>';
		html += '</div>';
		
		html += '<div class="each" key="form" cate="form">';
			html += _this.panelConfigFormHtml(panel);
		html += '</div>';
		
		html += '<div class="action"><input class="btn_save" onclick="uinv.FCM.configMgr.model.monitor.configHide(\''+o.panel+'\');" /></div>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
	
	_obj.model.dialog.getObj().find('.color-config').find('input[name=config]').each(function(){
		_obj.model.colorpicke.show(this);
	});
};

// hidden config
uinv.FCM.configMgr.model.monitor.configHide = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.dialog.getObj().find('.each').each(function(){
		if( typeof  _this.configSetData[$(this).attr('cate')] == 'function'){
			_this.configSetData[$(this).attr('cate')](this, _this.nameFindPanel(name));
		}	
	});
	_this.synchronousFormData();
	_obj.model.dialog.close();
};

// 同步数据
uinv.FCM.configMgr.model.monitor.synchronousFormData = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		if( typeof  _this.obj.panel[i].form == 'undefined' ){
			continue;
		}
		for( var n in  _this.obj.panel[i].modify ){					
			for( var m in  _this.obj.panel[i].modify[n] ){
				if( typeof  _this.obj.panel[i].form[ _this.obj.panel[i].modify[n][m].row  ] == 'undefined' ){
					continue;
				}	
				_this.obj.panel[i].showMapping[n][m] = _this.obj.panel[i].form[ _this.obj.panel[i].modify[n][m].row  ][ _this.obj.panel[i].modify[n][m].attribute ];
			}
		}
	}
	
};

// 设置数据类型
uinv.FCM.configMgr.model.monitor.configSetData = {};

// array
uinv.FCM.configMgr.model.monitor.configSetData['array'] = function(obj, panel){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.monitor;
	var key = $(obj).attr('key');
	panel[key] = [];
	$(obj).find('*[name='+key+']').each(function(){
		panel[key].push($(this).val());
	});
};

// number
uinv.FCM.configMgr.model.monitor.configSetData['number'] = function(obj, panel){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.monitor;
	var key = $(obj).attr('key');
	panel[key] = Number($(obj).find('*[name='+key+']').val());
};

// form
uinv.FCM.configMgr.model.monitor.configSetData['form'] = function(obj, panel){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.monitor;
	panel.form = [];
	$(obj).find('tr.row').each(function(i){
		panel.form[i] = {};
		$(this).find('*[name][cate]').each(function(){
			_this.configTypeToData[$(this).attr('cate')](this, panel.form[i]);
		});
	});
	
};

// 面板配置指标列表
uinv.FCM.configMgr.model.monitor.panelConfigFormHtml = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	html += '<table>';
		html += '<tr>';
			for(var i=0,k=_this.panelConfigAttributeField.length;i<k;i++){
				html += '<th>'+ _this.panelConfigAttributeField[i].name +'</th>';
			}
		html += '</tr>';
		
		for(var n=0;n<o.modifyCount;n++){
			html += '<tr class="row">';
				for(var i=0,k=_this.panelConfigAttributeField.length;i<k;i++){
					html += '<td>'+ _this.configTypeToHtml[_this.panelConfigAttributeField[i].type]( _this.panelConfigAttributeField[i], o.form[n] ) +'</td>';
				}							
			html += '</tr>';
		}
		
		
	html += '</table>';
	html += '<div class="color-config">';
		for(var n=0;n<o.modifyCount;n++){
			var param = [];
			if(typeof o.form[n] == 'object' && typeof o.form[n].styleConfig == 'object'){
				param = o.form[n].styleConfig;
			}
			html += _this.styleConfigHtml( param );
		}
	html += '</div>';
	
	return html;
};

// 根据不同类型给出不同的控件
uinv.FCM.configMgr.model.monitor.configTypeToHtml = {};

// string
uinv.FCM.configMgr.model.monitor.configTypeToHtml['string'] = function(o,form){
	if(typeof form == 'undefined'){
		var form = {};
		form[o.value] = '';
	}
	return '<input type="text" name="'+o.value+'" value="'+form[o.value]+'" cate="string" />';
};

// number
uinv.FCM.configMgr.model.monitor.configTypeToHtml['number'] =  function(o,form){
	if(typeof form == 'undefined'){
		var form = {};
		form[o.value] = 0;
	}
	return '<input type="text" name="'+o.value+'" value="'+form[o.value]+'" cate="number" />';
};

// boolean
uinv.FCM.configMgr.model.monitor.configTypeToHtml['boolean'] = function(o,form){
	if(typeof form == 'undefined'){
		var form = {};
		form[o.value] = false;
	}
	var html = '';
	
	html += '<select name="'+o.value+'" cate="boolean">';
		if( form[o.value] ){
			html += '<option value="1" selected>是</option>';
			html += '<option value="0">否</option>';
		}else{
			html += '<option value="1">是</option>';
			html += '<option value="0"  selected>否</option>';							
		}
	html += '</select>';

	return html;
};

// styleConfig
uinv.FCM.configMgr.model.monitor.configTypeToHtml['styleConfig'] = function(o,form){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	if(typeof form == 'undefined'){
		var form = {};
	}

	if(typeof form[o.value] == 'undefined'){
		form[o.value] = [];
	}
		
	_this.styleConfigHtml(form[o.value]);
	
	return '<input type="button" name="'+o.value+'" cate="styleConfig" onclick="uinv.FCM.configMgr.model.monitor.settingStyleConfigDisplay(this);" value="设置" />';
};

// 根据类型保存数据
uinv.FCM.configMgr.model.monitor.configTypeToData = {};

// string
uinv.FCM.configMgr.model.monitor.configTypeToData['string'] = function(o,data){
	data[$(o).attr('name')] = $(o).val();
};

// number
uinv.FCM.configMgr.model.monitor.configTypeToData['number'] = function(o,data){
	data[$(o).attr('name')] = Number($(o).val());
};

// boolean
uinv.FCM.configMgr.model.monitor.configTypeToData['boolean'] = function(o,data){
	if( $(o).val() == "1" ){
		data[$(o).attr('name')] = true;
	}else{
		data[$(o).attr('name')] = false;
	}
};

// styleConfig
uinv.FCM.configMgr.model.monitor.configTypeToData['styleConfig'] = function(o,data){
	var _obj = uinv.FCM.configMgr;
	var _this = _obj.model.monitor;
	
	var key = $(o).attr('name');
	data[key] = [];
	
	var index = $(o).parents('tr.row').index() - 1;
	
	_obj.model.dialog.getObj().find('.color-config').find('.row:eq('+index+')').find('table').find('tr.one').each(function(){
		var o = {};
		$(this).find('*[name]').each(function(){
			o[$(this).attr('name')] = _this.configStyleTypeToData[$(this).attr('cate')](this.value);
		});
		data[key].push(o);
	});
	
};

// 根据类型返回相应类型的值
uinv.FCM.configMgr.model.monitor.configStyleTypeToData = {};

// number
uinv.FCM.configMgr.model.monitor.configStyleTypeToData['number'] = function(value){
	return Number(value);
};

// string
uinv.FCM.configMgr.model.monitor.configStyleTypeToData['string'] = function(value){
 	return value;
};

// color
uinv.FCM.configMgr.model.monitor.configStyleTypeToData['color'] = function(value){
 	var _obj = uinv.FCM.configMgr;
 	var _this = _obj.model.monitor;
 	return value;
};

uinv.FCM.configMgr.model.monitor.styleConfigHtmlRow = function(data){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(typeof data == 'undefined'){
	
		var data = {
			'condition' : _this.conditionArr[0],
			'number' : 0,
			'config' : '#FFFFFF'						
		};	
	}
	
	var html = '';
	
	html += '<tr class="one" style="list-style:none;">';
		html += '<td>';
			html += '<select name="condition" cate="string">';
				for(var i=0,k=_this.conditionArr.length;i<k;i++){
					if(data.condition == _this.conditionArr[i]){
						html += '<option value="'+_this.conditionArr[i]+'" selected>'+_this.conditionArr[i]+'</option>';
					}else{
						html += '<option value="'+_this.conditionArr[i]+'">'+_this.conditionArr[i]+'</option>';
					}
				}		
			html += '</select>';
		html += '</td>';
		
		html += '<td>';
			html += '<input type="text" name="number" cate="number" value="'+data.number+'" />';
		html += '</td>';
		
		html += '<td>';
			html += '<input type="text" name="config" cate="color" value="'+data.config+'" />';
		html += '</td>';
		
		html += '<td>';
			html += '<a onclick="uinv.FCM.configMgr.model.monitor.deleteStyleConfigRow(this);" href="javascript:void(0);"><s>删除</s></a>';
		html += '</td>';
	html += '</tr>';
	return html;
};

// 删除行
uinv.FCM.configMgr.model.monitor.deleteStyleConfigRow = function(o){
	$(o).parents('tr:eq(0)').remove();
};

// 添加行
uinv.FCM.configMgr.model.monitor.addStyleConfigHtmlRow = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = _this.styleConfigHtmlRow({
		'condition' : _this.conditionArr[0],
		'number' : 0,
		'config' : '#FFFFFF'
	});
	
	var ul = $(o).parents('.row').find('table');
	ul.append(html);
	
	var dom = ul.find('.one:last').find('input[name=config]').get(0);
	_obj.model.colorpicke.show(dom);
};

// style config 初始
uinv.FCM.configMgr.model.monitor.styleConfigHtml = function(data){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	
	html += '<div class="row" style="display:none;">';
		html += '<table>';
			html += '<tr>';
				html += '<th><s>条件</s></th>';
				html += '<th><s>数值</s></th>';
				html += '<th><s>颜色</s></th>';
				html += '<th><s>操作</s></th>';
			html += '</tr>';
			for(var i=0,k=data.length;i<k;i++){
				html += _this.styleConfigHtmlRow(data[i]);
			}
		html += '</table>';
		html += '<div class="action">';
			html += '<button onclick="uinv.FCM.configMgr.model.monitor.addStyleConfigHtmlRow(this);"><s>添加</s></button>';
		html += '</div>';
	html += '</div>';

	return html;
};

// 设置颜色条件面板显示
uinv.FCM.configMgr.model.monitor.settingStyleConfigDisplay = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = $(obj).parents('tr.row').index() - 1;
	_obj.model.dialog.getObj().find('.color-config').find('.row').each(function(i){
		if( i == index ){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
};

// upload panel
uinv.FCM.configMgr.model.monitor.uploadPanel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var path = obj.value.split("\\");
	var fileName = path.pop();

	uinv.server.manager.frame.upAndUnZip(obj, fileName, function(result){
		if(result.success){
			var o = _obj.model.transform.str2obj(result.data);
			if( _obj.model.array.isArray(o) ){
				for(var i=0,k=o.length;i<k;i++){
					_this.uploadPanelHandle(o[i], fileName);
				}
			}else{
				_this.uploadPanelHandle(o, fileName);
			}
		}else{
			_obj.note.alert(result.data);
		}
		
	});  
};

// upload panel handle
uinv.FCM.configMgr.model.monitor.uploadPanelHandle = function(o, fileName){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	o.imagePath = o.previewImagePath;
	
	if(!_this.checkModifyBody(o)){
		return false;
	}
	
	var bool = true;
	
	var obj =  _this.nameFindPanel(o.name);
	
	if( obj ){
		bool = _obj.note.confirm('面板'+o.name+'应经存在，是否要覆盖？');
	}
	
	if( obj && obj.modifyCount > o.modifyCount && typeof obj.form != "undefined" && obj.form.length == obj.modifyCount ){
		var msg = "";
		msg = "您上传的新面板modifyCount比原面板modifyCount小\r\n";
		msg += "将要删除原面板配置信息的最后"+(obj.modifyCount-o.modifyCount)+"行配置\r\n";
		msg += "内容为：\r\n";
		
		var arr = [];
		for(var i=o.modifyCount;i<obj.modifyCount;i++){
			arr.push(obj.form[i]);
		}
		msg += _obj.model.transform.obj2str( arr );
		
		bool = _obj.note.confirm(msg);
		
		if(bool){
			obj.form.splice(o.modifyCount, obj.modifyCount - o.modifyCount);	
		}
	}
	
	if(bool){
		var o = _this.addPanelToMemory(o);
		uinv.server.manager.frame.cutGeneralFile( o.downloadFile , _this.getPanelZipPath(o) );
		uinv.server.manager.frame.cutGeneralFile( o.imagePath , _this.getPanelImagePath(o) );
		
		// 写入系统下载
		_obj.model.download.set({
			'url' : _this.getPanelZipPath(o),
			'local' : _this.pathToDir(o.image)
		});					
		
		_this.objHtml();
		_this.styleHtml();
	}
};

// 全路径 到 文件夹 /user/assf/asf.gif to /user/assf
uinv.FCM.configMgr.model.monitor.pathToDir = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var dir = "";
	
	if(path.indexOf("/")>=0){
		var pathinfo = path.split("/");
		pathinfo.pop();
		dir = pathinfo.join("/");
	}
	
	if(path.indexOf("\\")>=0){
		var pathinfo = path.split("\\");
		pathinfo.pop();
		dir = pathinfo.join("\\");				
	}
	
	return dir;
};

// get panel path
uinv.FCM.configMgr.model.monitor.getPanelPath = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.global.path + '/Monitor/' + o.name ;			
};

// get panel image path
uinv.FCM.configMgr.model.monitor.getPanelImagePath = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.global.path + '/Monitor/' + o.name + '/' + o.imagePath;
};

// get panel zip path
uinv.FCM.configMgr.model.monitor.getPanelZipPath = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.global.path + '/Monitor/' + o.name + '/download.zip';			
};

// add Panel to Memory
uinv.FCM.configMgr.model.monitor.addPanelToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof obj.form == 'undefined'){
		obj.form = [];
	}
	
	if(_this.nameFindPanel(obj.name)){
		
		var o = _this.nameFindPanel(obj.name);
		var index = _this.nameFindPanelIndex(obj.name);
		
		//if(o.modifyCount == obj.modifyCount && _obj.model.object.o2o(obj.modify,o.modify)){
			//obj.form = _obj.model.object.clone( o.form );
		//}
		
		obj.form =  _obj.model.object.clone( o.form );
		_this.obj.panel.splice( index, 1 ,obj );
	}else{
		_this.obj.panel.push(obj);
	}
	return obj;
};

// 检测面板是否被使用
uinv.FCM.configMgr.model.monitor.isUsePanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i]['panel'] == name ){
			return true;
		}
	}
	return false;	
};

// 检测modify内容是否合法
uinv.FCM.configMgr.model.monitor.checkModifyBody = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof o == 'undefined'){
		return false;
	}
	
	var msg = "上传失败\r\n";
	var error = false;
	
	for(var i in o.modify){
		for(var j in o.modify[i]){
			var bool = false;
			
			for(var k in _this.panelConfigAttributeField){	
				if( _this.panelConfigAttributeField[k].value == o.modify[i][j].attribute ){
					bool = true;
				}
			}
			
			if(!bool){
				error = true;
				msg +=  i +" -> " + j + " -> attribute " + o.modify[i][j].attribute + " 字段不存在 \r\n";
			}
			
			if( o.modify[i][j].row >=  o.modifyCount ){
				msg += i +" -> " + j + " -> row : " + o.modify[i][j].row + " 超出modifyCount的值 \r\n";
			}
		}
	}
	
	if(error){
		_obj.note.alert(msg);
		return false;
	}else{
		return true;
	}
};

// delete object
uinv.FCM.configMgr.model.monitor.deletePanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = _this.isUsePanel(name);
	if( bool ){
		_obj.note.alert('删除面板错误：这个面板正在使用，请先解除使用后再删除。');
		return false;
	}
	
	var obj = _this.nameFindPanel(name);
	_obj.model.download.del( _this.getPanelZipPath(obj) );
	_this.deleteFileArr.push( _this.getPanelPath(obj) );
	
	var index = _this.nameFindPanelIndex(name);
	if( index >= 0 ){
		_this.obj.panel.splice(index, 1);
		_this.objHtml();
		_this.styleHtml();
	}
};

// delete object
uinv.FCM.configMgr.model.monitor.deleteObject = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.keyFindObjIndex(key);
	_obj.data.monitor.object.splice(index, 1);
	_this.objHtml();
};

// create object
uinv.FCM.configMgr.model.monitor.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.selector.show(function(obj){
		_obj.model.selector.hide();
		
		var o = _this.addObjectToMemory(obj);
		_this.addHtmlRow(o);
	});
};

// add object to Memory
uinv.FCM.configMgr.model.monitor.addObjectToMemory = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	do{
		var key = _obj.model.key.create(10);
	}while(_this.keyFindObj(key));
	
	obj['key'] = key;
	_obj.data.monitor.object.push(obj);
	return obj;
};

// key find object index
uinv.FCM.configMgr.model.monitor.keyFindObjIndex = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i]['key'] == key ){
			return i;
		}
	}
	return -1;				
};

// key find obj
uinv.FCM.configMgr.model.monitor.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		if(  _obj.data.monitor.object[i]['key'] == key ){
			return  _obj.data.monitor.object[i];
		}
	}
	return false;
};

// name find panel index
uinv.FCM.configMgr.model.monitor.nameFindPanelIndex = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		if(  _this.obj.panel[i]['name'] == name ){
			return i;
		}
	}
	return -1;				
};

// name find panel
uinv.FCM.configMgr.model.monitor.nameFindPanel = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(typeof _this.obj.panel == "undefined"){
		_this.obj.panel = [];
	}
	
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		if(  _this.obj.panel[i]['name'] == name ){
			return _this.obj.panel[i];
		}
	}
	return false;				
};

// obj select panel handle
uinv.FCM.configMgr.model.monitor.objSelectPanel = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.keyFindObj(key)['panel'] = obj.value;
};

// 添加dom
uinv.FCM.configMgr.model.monitor.addHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = _this.objHtmlRow(obj);
	_obj.form.box.find(_this.objBoxClassStr).append(html);
	_obj.translate();
};

// 单行ROW
uinv.FCM.configMgr.model.monitor.objHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	
	html += '<li key="'+obj.key+'" style="list-style:none;maring:10px auto;">';
		html += '<div class="name">';
			html += '<a onclick="uinv.FCM.configMgr.model.monitor.objectRename(this,\''+obj.key+'\');" href="javascript:void(0);">'+obj.name+'</a>';
		html += '</div>';
		html += '<div class="list_300">';
			html += '<select onchange="uinv.FCM.configMgr.model.monitor.objSelectPanel(this,\''+obj.key+'\');">';
				html += '<option value="">请选择面板</option>';
				for(var i=0,k=_this.obj.panel.length;i<k;i++){
					if( typeof obj.panel != 'undefined' && obj.panel == _this.obj.panel[i]['name'] ){
						html += '<option value="'+_this.obj.panel[i]['name']+'" selected>'+_this.obj.panel[i]['caption']+'</option>';
					}else{
						html += '<option value="'+_this.obj.panel[i]['name']+'">'+_this.obj.panel[i]['caption']+'</option>';
					}
				}

			html += '</select>';
		html += '</div>';
		html += '<div class="list_60"><a onclick="uinv.FCM.configMgr.model.monitor.configShow(\''+obj.key+'\');" href="javascript:void(0);">编辑</a></div>';
		html += '<div class="list_60"><a onclick="uinv.FCM.configMgr.model.monitor.deleteObject(\''+obj.key+'\');" href="javascript:void(0);">删除</a></div>';
	html += '</li>';
	return html;
	
};

// 对象列表HTML
uinv.FCM.configMgr.model.monitor.objHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
		html += _this.objHtmlRow( _obj.data.monitor.object[i] );
	}
	
	_obj.form.box.find(_this.objBoxClassStr).html(html);
	_obj.translate();
};

// object rename
uinv.FCM.configMgr.model.monitor.objectRename = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var value = $(obj).html();
	var box = $(obj).parent();
	var html = box.html();
	
	box.html( '<input type="text" value="'+value+'" />' );
	box.find('input').focus().blur(function(){
		var value = $(this).val();
		box.html(html).find('a').html(value);
		_this.keyFindObj(key)['name'] = value;
	}).keydown(function(evt){
		var e  = evt || window.event;
		if(e.keyCode==13){
			var value = $(this).val();
			box.html(html).find('a').html(value);
			_this.keyFindObj(key)['name'] = value;
		}
	});
};

// style ROW html
uinv.FCM.configMgr.model.monitor.styleHtmlRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var html = '';
	html += '<li key="'+obj.name+'" style="list-style:none;maring:10px auto;">';
		html += '<div class="name">'+obj.caption+'</div>';
		html += '<div class="list_300">' +obj.des+ '</div>';
		html += '<div class="list_60"><a href="javascript:void(0);"><s>上传</s></a></div>';
		html += '<div class="list_60"><a onclick="uinv.FCM.configMgr.model.monitor.deletePanel(\''+obj.name+'\');" href="javascript:void(0);"><s>删除</s></a></div>';
	html += '</li>';
	return html;
};

// style html
uinv.FCM.configMgr.model.monitor.styleHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	for(var i=0,k=_this.obj.panel.length;i<k;i++){
		html += _this.styleHtmlRow( _this.obj.panel[i] );
	}
	
	_obj.form.box.find(_this.styleBoxClassStr).html(html);				
};

// alarmlevel html
uinv.FCM.configMgr.model.monitor.alarmLevelHtml = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof  _obj.data.monitor.alarm.alarmLevel == 'object' ){
		var html = '';
		for(var i=0,k=_obj.data.monitor.alarm.alarmLevel.length;i<k;i++){
			html += _this.alarmLevelHtmlRow( _obj.data.monitor.alarm.alarmLevel[i] );
		}
	}
	_obj.form.box.find(_this.alarmlevelBoxClassStr).html(html);
};

// 创建告警每一行的html
uinv.FCM.configMgr.model.monitor.alarmLevelHtmlRow = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var html = '';
	html += '<li class="row" style="list-style:none;">';
		html += '<span>';
			html += '<input type="text" name="name" value="'+o.name+'" />';
		html += '</span>';
		html += ' | ';
		html += '<span>';
			html += '<input type="text" name="color" value="'+o.color+'" />';
		html += '</span>';
		html += ' | ';
		html += '<span>';
			html += '<a onclick="uinv.FCM.configMgr.model.monitor.deleteAlarmLevelRow(this);" href="javascript:void(0);"><s>删除</s></a>';
		html += '</span>';
	html += '</li>';
	return html;
};

// 删除alarmLevelRow
uinv.FCM.configMgr.model.monitor.deleteAlarmLevelRow = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('.row:eq(0)').remove();
};

// addAlarmLevelDom
uinv.FCM.configMgr.model.monitor.addAlarmLevel = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var o = { 'name' : '', 'color' : '#FFF' };
	var html = _this.alarmLevelHtmlRow(o);
	_obj.form.box.find(_this.alarmlevelBoxClassStr).append(html);
	var dom = _obj.form.box.find(_this.alarmlevelBoxClassStr).find('.row:last').find('input[name=color]').get(0);
	_obj.model.colorpicke.show(dom);
};

// 初始化
uinv.FCM.configMgr.model.monitor.init = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = 	function(){
		_obj.model.stringDB.set( _this.index, _this.obj );
		for(var i=0,k=_this.deleteFileArr.length;i<k;i++){
			uinv.server.manager.frame.delFile(_this.deleteFileArr[i]);
		}
	};
	
	_this.objBoxClassStr = param['objBox'] || '';
	_this.styleBoxClassStr = param['styleBox'] || '';
	_this.alarmlevelBoxClassStr = param['alarmlevelBox'] || '';
	_this.obj = _obj.model.stringDB.get( _this.index );
	_this.obj.panel = typeof _this.obj.panel == 'undefined' ? [] : _this.obj.panel;

	_this.objHtml();
	_this.styleHtml();
	_this.alarmLevelHtml();
};


uinv.FCM.configMgr.model.download.pathFindObj = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.download.length;i<k;i++){
		if( _obj.data.download[i].url == path ){
			return _obj.data.download[i];
		}
	}
	
	return null;
};

uinv.FCM.configMgr.model.download.pathFindIndex = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.download.length;i<k;i++){
		if( _obj.data.download[i].url == path ){
			return i;
		}
	}
	
	return -1;				
};

// 更新download数据 (修改or添加)
uinv.FCM.configMgr.model.download.set = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.pathFindIndex(o.url);
	if(index>=0){
		var obj = _this.pathFindObj(o.url);
		o.version = obj.version + 1;
		_obj.data.download.splice(index,1,o);
	}else{
		o.version = 1;
		_obj.data.download.push(o);
	}
};

// 删除
uinv.FCM.configMgr.model.download.del = function(path){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var index = _this.pathFindIndex(path);
	_obj.data.download.splice(index,1);
};


/**** 表单操作 ****/

// 生成表单数据
uinv.FCM.configMgr.form.createFormData = [];

// name轮询记录
uinv.FCM.configMgr.form.nameInit =  [];

// 数据源对象 实际只想 data对象，设置接口是想让它更灵活。可以接入其它同类对象初始化表单
uinv.FCM.configMgr.form.obj = null;

// 当前加载网页
uinv.FCM.configMgr.form.box = null;

// 根据组获取所有项
uinv.FCM.configMgr.form.groupFindItem = function(groupName){
	var _this = this;
	var arr = [];
	for( var i=0,k=_this.createFormData.length;i<k;i++ ){
		if( _this.createFormData[i].group == groupName ){
			arr.push( _this.createFormData[i] );
		}
	}
	
	return arr;
};

uinv.FCM.configMgr.form.createHtml = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	o.data = _this.groupFindItem(o.group);
	
	var html = "";
	for(var i=0,k=o.data.length;i<k;i++){
		
		if( typeof _this.createTypeHtml[o.data[i].type] == 'function' ){
			html += _this.createTypeHtml[o.data[i].type]( o.data[i]  );
		}
		
		// 赋值
		if(typeof _obj.data[o.data[i].group] == "undefined"){
			_obj.data[o.data[i].group] = {};
		}	
		
		if( typeof _obj.data[o.data[i].group][o.data[i].name] == 'undefined' ){
			_obj.data[o.data[i].group][o.data[i].name] = o.data[i].defaultValue;
		}
	}
	
	o.dom.html(html);
};

// 根据类型创建DOM对象
uinv.FCM.configMgr.form.createTypeHtml = {};

// boolean
uinv.FCM.configMgr.form.createTypeHtml["boolean"] = function(o){
	var html = "";
	
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<input path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" value="1" /><s>是</s>';
			html += '<input path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" value="0" /><s>否</s>';
		html += '</span>';
	html += '</div>';
	
	return html;	
};

// color
uinv.FCM.configMgr.form.createTypeHtml["color"] = function(o){
	var html = "";
	
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<input path="'+o.group+'" type="radio" cate="color" name="'+o.name+'" value="'+o.defaultValue+'" />';
		html += '</span>';
	html += '</div>';
	
	return html;
};

// image
uinv.FCM.configMgr.form.createTypeHtml["image"] = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = this;				
	var html = "";
	html += '<div class="row '+o.dir+' '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<img path="'+o.group+'" src="'+_obj.data[o.group][o.name]+'" cate="image" name="'+o.name+'" />';
			html += '<button onclick="uinv.FCM.configMgr.model.images.show({dir:\''+o.dir+'\',name:\''+o.name+'\'});"><s>更换图片</s></button>';
		html += '</span>';
	html += '</div>';
	
	return html;				
};

// 装载网页
uinv.FCM.configMgr.form.load = function(param){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.box  = param.obj || $('.config-load');
	_this.box.load(
	    param.page + '?' + Date.parse(new Date()),
	    function(response, status, xhr) {
	    	if ( status=="success" ){	
				_this.init();
				$('.config-submit-btn').show();
	    	}else{
				$(this).load('./views/config/404.html');
	    	}
	    	
	    	uinv.FCM.configMgr.translate();
	    }
	);
};

// 根据不同类型，设置表单各种类型的初始值
uinv.FCM.configMgr.form.type = {};

// radio
uinv.FCM.configMgr.form.type['radio'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if( _obj.data[$(obj).attr('path')][$(obj).attr('name')] == $(obj).attr('value') ){
		$(obj).attr('checked', true);
	}
};

// boolean
uinv.FCM.configMgr.form.type['boolean'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;			
	
	if( obj.value == "1" && _obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
		$(obj).attr('checked', true);
	}
	
	if( obj.value == "0" && !_obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
		$(obj).attr('checked', true);
	}
};

// text
uinv.FCM.configMgr.form.type['text'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
};

// image
uinv.FCM.configMgr.form.type['image'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	$(obj).attr('src' ,  _obj.data[$(obj).attr('path')][$(obj).attr('name')] );	
};

// color
uinv.FCM.configMgr.form.type['color'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );	
	_obj.model.colorpicke.show(obj);
};

// layer
uinv.FCM.configMgr.form.type['layer'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var layerObj = _obj.model.layer.keyFindObj( $(obj).attr('name') );
	
	if( $(obj).attr('value') == u.le.get('分割线')  ){
		$(obj).attr('disabled', true);
	}
	
	if(typeof layerObj['item'] == 'object'){
		if( _obj.model.array.inArray( $(obj).attr('value') , layerObj['item'] ) ){
			$(obj).attr('checked', true);
			_obj.model.layer.checkd(obj);
		}	
	}
	
	// _obj.model.layer.checkedLayerOrder( $(obj).attr('name') );
};

// panel
uinv.FCM.configMgr.form.type['panel'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var panelObj = _obj.model.panel.keyFindObj( $(obj).attr('name') );
	
	if(typeof panelObj['item'] == 'object'){
		if( _obj.model.array.inArray( $(obj).attr('value') , panelObj['item'] ) ){
			$(obj).attr('checked', true);
			_obj.model.panel.checkd(obj);
		}	
	}
	
	// _obj.model.panel.checkedPanelOrder( $(obj).attr('name') );
};

// statistics
uinv.FCM.configMgr.form.type['statistics'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var html = '';
	for( var i in _obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
		html += _obj.model.statistics.mkhtmlTr( _obj.data[$(obj).attr('path')][$(obj).attr('name')][i] );
	}
	
	$(obj).append(html);
	
	_this.box.find(_obj.model.statistics.classStr).find('input[key=color]').each(function(){
		_obj.model.colorpicke.show(this);
	});
};

// viewpoint
uinv.FCM.configMgr.form.type['viewpoint'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	$(obj).val( _obj.model.viewpoint.keyFindObj( $(obj).attr('name') )['data'][$(obj).attr('key')] );
};

// alarm
uinv.FCM.configMgr.form.type['alarm'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	if( typeof  _obj.data.monitor.alarm[$(obj).attr('name')] != 'undefined'){
		$(obj).val( _obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')] );
	}
};

// 告警层级
uinv.FCM.configMgr.form.type['alarmlevel'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	$(obj).find('*.row').each(function(){
		var dom = $(this).find('input[name=color]').get(0);
		_obj.model.colorpicke.show(dom);
	});
};


// 根据不同的dom类型获取值到内存
uinv.FCM.configMgr.form.setValue = {};

// radio
uinv.FCM.configMgr.form.setValue['radio'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	if( obj.checked == true ){
		_obj.data[$(obj).attr('path')][$(obj).attr('name')] = _this.box.find('*[name=' + $(obj).attr('name') + ']:checked').attr('value');
	}
};

// boolean
uinv.FCM.configMgr.form.setValue['boolean'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;

	if( obj.checked == true ){
		if(obj.value == "1"){
			_obj.data[$(obj).attr('path')][$(obj).attr('name')] = true;
		}else{
			_obj.data[$(obj).attr('path')][$(obj).attr('name')] = false;
		}
	}
};

// text
uinv.FCM.configMgr.form.setValue['text'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
};

// image
uinv.FCM.configMgr.form.setValue['image'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).attr('src');
};
	
// color
uinv.FCM.configMgr.form.setValue['color'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
};
		
// layer
uinv.FCM.configMgr.form.setValue['layer'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var name = $(obj).attr('name');
	
	var layerObj = _obj.model.layer.keyFindObj( name );
	
	if(_this.isNameFirstEach(name) ){
		layerObj['item'] = [];
		layerObj['order'] = [];
		_this.nameInit.push( name );
	}
	
	layerObj['order'].push( $(obj).attr('value') );
	
	if( obj.checked == true ){
		layerObj['item'].push( $(obj).attr('value') );
	}
};

// panel
uinv.FCM.configMgr.form.setValue['panel'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var name = $(obj).attr('name');
	
	var panelObj = _obj.model.panel.keyFindObj( name );
	
	if(_this.isNameFirstEach(name) ){
		panelObj['item'] = [];
		panelObj['order'] = [];
		_this.nameInit.push( name );
	}
	
	panelObj['order'].push( $(obj).attr('value') );
	
	if( obj.checked == true ){
		panelObj['item'].push( $(obj).attr('value') );
	}
};

// 统计
uinv.FCM.configMgr.form.setValue['statistics'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var name = $(obj).attr('name');
	
	if(_this.isNameFirstEach(name) ){
		_obj.data[$(obj).attr('path')][name] = [];
		_this.nameInit.push( name );
	}
	
	$(obj).find('.item').each(function(){
		var item = {};
		$(this).find('*[key]').each(function(){
			item[ $(this).attr('key') ] = $(this).val();
		});
		
		_obj.data[$(obj).attr('path')][name].push(item);
		
	});
};

// 视点
uinv.FCM.configMgr.form.setValue['viewpoint'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	_obj.model.viewpoint.keyFindObj( $(obj).attr('name') )['data'][$(obj).attr('key')] = Number($(obj).val());
};

// 告警
uinv.FCM.configMgr.form.setValue['alarm'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')]  = Number($(obj).val());
};

//  告警层级
uinv.FCM.configMgr.form.setValue['alarmlevel'] = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')] = [];
	
	$(obj).find('*.row').each(function(){
		var o = {};
		o.name = $(this).find('input[name=name]').val();
		o.color = $(this).find('input[name=color]').val();
		_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')].push(o);
	});
};

// 提交表单到服务器存储
uinv.FCM.configMgr.form.submit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.nameInit = [];
	
	_this.box.find('*[name]').each(function(){
		if( typeof _this.setValue[$(this).attr('cate')] == 'function' ){
			_this.setValue[$(this).attr('cate')](this);
		}
	});
	
	// submit save to service
	uinv.server.manager.frame.saveFrameConfig( uinv.util.toJSON( _obj.data ) , function(result){
		//_obj.note.alert(result.data);
		
		if(result['success'] && typeof _this.submitCallback == 'function'){
			_this.submitCallback();
		}
	}); 
};

// 判断这个name是否是第一次轮询
uinv.FCM.configMgr.form.isNameFirstEach = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( _obj.model.array.inArray(name, _this.nameInit) ){
		return false;
	}
	
	return true;
};

// 初始表单数据
uinv.FCM.configMgr.form.init = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_this.box.find('*[name]').each(function(){
		if( typeof _this.type[$(this).attr('cate')] == 'function' ){
			_this.type[$(this).attr('cate')](this);
		}
	});
	
	_obj.translate();
};


/**** 表单操作END ****/

/**** 数据楼 ****/

// 系统配置
uinv.FCM.configMgr.data.system = {};

// 布局配置
uinv.FCM.configMgr.data.layout = {};

// 图层配置
uinv.FCM.configMgr.data.layer = [];

// 面板配置
uinv.FCM.configMgr.data.panel = [];

// 统计配置
uinv.FCM.configMgr.data.statistics = {
	'power':[],			// 功耗
	'availableU':[],	// 空间
	'load':[]			// 承重
};

// 资源配置
uinv.FCM.configMgr.data.resources = {};

// 视点
uinv.FCM.configMgr.data.viewpoint = [];

// 监控
uinv.FCM.configMgr.data.monitor = {
	'object' : [],	// 对象
	
	// 告警
	'alarm' : { 
	 	alarmTime : 0,
	 	alarmIconSize : 1,
	 	monitorTime : 1
	}	
};

// 系统下载
uinv.FCM.configMgr.data.download = [];

/**** 数据楼END ****/


// 把条件名称转换为规范规范名称
// 在api接口调用输出数据之前转换
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

/*** api 接口 ****/

// 获取监控面板数据
uinv.FCM.configMgr.api.getMonitor = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var obj = _obj.model.object.clone( _obj.data.monitor.object );
	
	_obj.model.monitor.obj = _obj.model.stringDB.get(_obj.model.monitor.index);
	
	for(var i=0,k=obj.length;i<k;i++){
		obj[i].condition = _obj.other.conditionReplaceName( obj[i].where );
		obj[i].data = _obj.model.object.clone( _obj.model.monitor.nameFindPanel(obj[i].panel) );
	
		for(var n=0,m=obj[i].data.form.length;n<m;n++){
			for(var g=0,h=obj[i].data.form[n].styleConfig.length;g<h;g++){
				obj[i].data.form[n].styleConfig[g].config = _obj.model.colorpicke.toRgb(obj[i].data.form[n].styleConfig[g].config);
			}
		}
		
		for(var j in obj[i].data.modify){
			for(var p in obj[i].data.modify[j]){
				if(typeof obj[i].data.form[ obj[i].data.modify[j][p].row ] != 'undefined'){
					obj[i].data.showMapping[j][p] = obj[i].data.form[ obj[i].data.modify[j][p].row ][ obj[i].data.modify[j][p].attribute ];
				}
			}
		}
		
		delete obj[i].data.des;
		delete obj[i].data.caption;
		delete obj[i].data.name;
		delete obj[i].data.resPath;
		delete obj[i].where;
		delete obj[i].data.form;
		delete obj[i].key;
		delete obj[i].panel;
		delete obj[i].data.previewImagePath;
		
	}
	
	return {
		'monitorTime' : _obj.data.monitor.alarm.monitorTime,
		'monitorPanelConfig' : obj
	};
};

// 获取视角数据
uinv.FCM.configMgr.api.getViewpoint = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.viewpoint );

	for(var i=0,k=obj.length;i<k;i++){
		obj[i].condition = _obj.other.conditionReplaceName( obj[i].where );
		delete obj[i].where;
	}
	
	return obj;
};

// 获取统计数据
uinv.FCM.configMgr.api.getStatistics = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.statistics );
	
	for(var i in obj){
		for(var n=0,m=obj[i].length;n<m;n++){
			obj[i][n].condition = obj[i][n].where;
			delete obj[i][n].where;
			
			obj[i][n].config = _obj.model.colorpicke.toRgb(obj[i][n].color);
			obj[i][n].number = Number( obj[i][n].number );
			
			delete obj[i][n].color;
		}
	}
	
	return obj;
};

// 获取资源数据
uinv.FCM.configMgr.api.getResources = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.resources );
	
	for(var i in obj){
		obj[i].local = obj[i].localPath;
		obj[i].url = obj[i].serverPath.substr(1);
		delete obj[i].localPath;
		delete obj[i].serverPath;
	}
	
	return obj;
};

// 获取图层数据
uinv.FCM.configMgr.api.getLayer = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.layer );
	
	_obj.model.layer.obj = _obj.model.stringDB.get(_obj.model.layer.index);
	
	for(var i=0,k=obj.length;i<k;i++){
		obj[i].condition = _obj.other.conditionReplaceName( obj[i].obj );
		
		obj[i].tmp = [];
		for(var n=0,m=obj[i].item.length;n<m;n++){
			if( typeof obj[i].itemData == "undefined" ){
				obj[i].itemData = [];			
			}  
			
			obj[i].tmp.push({
				'itemName' : obj[i].item[n] == u.le.get('分割线') ? 'separator' : obj[i].item[n] ,
				'config' : typeof obj[i].itemData[obj[i].item[n]] == 'undefined' ? {} :  _obj.model.object.clone( obj[i].itemData[obj[i].item[n]] )
			});
		}
		
		obj[i].item = obj[i].tmp;
		delete obj[i].obj;
		delete obj[i].tmp;
		delete obj[i].order;
	}
	
	return {
		"objects" : obj,
		"lib" : _obj.model.object.clone( _obj.model.layer.obj )
	};
};

// 获取面板数据
uinv.FCM.configMgr.api.getPanel = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;		
	
	return {
		"objects" : [],
		"lib" : {}
	};
};

// 获取表单数据
uinv.FCM.configMgr.api.getForm = function(group){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var o = _obj.model.object.clone(_obj.form.createFormData);
	
	for(var i=0,k=o.length;i<k;i++){
		o[i].value = _obj.data[o[i].group][o[i].name];
		if(o[i].type == 'color'){
			o[i].value = _obj.model.colorpicke.toRgb(o[i].value);
		}
	}
	
	if(group){
		var arr = [];
		for(var i=0,k=o.length;i<k;i++){
			if(o[i].group == group){
				arr.push(o[i]);
			}
		}
		o = arr;
	}
	
	return o;	
};

// 获取告警信息
uinv.FCM.configMgr.api.getAlarm = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var obj = _obj.model.object.clone( _obj.data.monitor.alarm );
	
	if(typeof obj.alarmLevel == 'undefined'){
		obj.alarmLevel = [];
	}
	
	for(var i=0,k=obj.alarmLevel.length;i<k;i++){
		obj.alarmLevel[i].config = _obj.model.colorpicke.toRgb(obj.alarmLevel[i].color);
		delete obj.alarmLevel[i].color;
	}
	
	// 把moniterTime删除，放到moniter接口
	delete obj.monitorTime;
	
	return obj;
};

// 获取下载信息
uinv.FCM.configMgr.api.getDownload = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	return _obj.model.object.clone(_obj.data.download);
};

/*** api 接口 END  ***/


// 配置初始化
uinv.FCM.configMgr.init = function(){
	var _this = this;
	
	// 请求服务器获取对象
	uinv.server.manager.frame.getFrameConfig(function(result){
		if( result.success && result.data ){
			var data = _this.model.transform.str2obj(result.data);
			_this.model.object.coverObj( data, uinv.FCM.configMgr.data );
		}
	});
	
	// 添加目录
	uinv.ui.manager.navBar.config['menu-config'] =  './views/config/index.html';
	
	// 加载选择器数据
	_this.model.selector.obj = _this.model.stringDB.get( _this.model.selector.index );
	
	// 项目路径
	var path = window.document.location.pathname.split('/');
	path.pop();
	_this.global.projectPath = path.join('/');
};

uinv.FCM.configMgr.init();
