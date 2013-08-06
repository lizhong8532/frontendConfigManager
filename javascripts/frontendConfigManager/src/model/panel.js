/**
 * @description 面板
 */
 
//--------------------------
// 基础定义
//--------------------------

/**
 * @description 全局面板DOM盒子Class值
 * @type String
 */
uinv.FCM.configMgr.model.panel.globalPanelManagementBoxClass = 'panel-global';

/**
 * @description 数据索引
 * @type String
 */
uinv.FCM.configMgr.model.panel.index = 'panel';

/**
 * @description 上传面板对象记录
 * @type String
 */
uinv.FCM.configMgr.model.panel.uploadPanelSelector = '';

/**
 * @description 副数据，将用于存储
 * @type Object
 */
uinv.FCM.configMgr.model.panel.obj = null;

/**
 * @description 面板上移按钮DOM节点class值定义
 * @type String
 */
uinv.FCM.configMgr.model.panel.upMoveBtnClass = 'upmove';

/**
 * @description 面板盒型DOM节点Class定义
 * @type String
 */
uinv.FCM.configMgr.model.panel.classStr = '';


//----------------------
// 操作区
//----------------------

/**
 * @description 根据key查找到面板对象
 * @method keyFindObj
 * @param {String} key 面板key值
 * @return {Object} 面板对象
 * @static
 */
uinv.FCM.configMgr.model.panel.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i = 0,k=_obj.data.panel.length; i<k; i++){
		if( key == _obj.data.panel[i].key){
			return _obj.data.panel[i];
		}
	}
	return {};
};


/**
 * @description 根据key值删除面板对象（内存操作）
 * @method keyDelObj
 * @param {String} key 面板key值
 * @return {Boolean} true 删除成功 false 删除失败（可能key值不存在）
 */
uinv.FCM.configMgr.model.panel.keyDelObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i = 0, k = _obj.data.panel.length; i<k; i++){
		if( key == _obj.data.panel[i].key ){
			_obj.data.panel.splice(i,1);
			return true;
		}
	}
	
	return false;
};

/**
 * @description 创建物体方法
 * 1) 实际调用选择器模块的公有方法选择对象节点作为创建
 * @method createObject
 * @static
 */
uinv.FCM.configMgr.model.panel.createObject = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.selector.show(function( obj ){
		// 检查是否已存在对象
		var bool = _this.checkObjectExist( obj.where );
		if(bool) {
			_obj.note.alert(_obj.msg.S6);
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

/**
 * @description 插入分割线
 * @method insertDividingLine
 * @param {DOM} obj 单击创建分割线的DOM节点
 * @param {String} key 创建分割线的面板key值
 * @return {Boolean} 如果key值为false将return false终止后面的操作
 * @static
 */
uinv.FCM.configMgr.model.panel.insertDividingLine = function(obj,key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(!key){
		_obj.note.dialog(_obj.msg.S7);
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

/**
 * @description 删除物体操作
 * 1) 执行内存删除操作
 * 2) 执行页面DOM节点删除操作
 * @method deleteObj
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.panel.deleteObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyDelObj(key);
	
	// 删除节点
	_obj.form.box.find('.obj-' + key).remove();
};


/**
 * @description 删除面板项操作
 * @method deleteObjPanel
 * 1) 每一个物体下同名的面板都会一并删除
 * 2) 只是内存操作，不提交服务器
 * 3) 每一个物体下都删除同名的DOM节点
 * @param {DOM} obj 触发删除事件的DOM节点
 * @return {Boolean} 将弹出确认会话框，如果取消删除操作则return false终止后面删除动作
 * @static
 */
uinv.FCM.configMgr.model.panel.deleteObjPanel = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var panelKey  = $(obj).parents('li').find('*[cate][name][value]').attr('value');
	
	if(panelKey == u.le.get('分割线')){
		
		$(obj).parents('li').remove();
		
	}else{
		com = _obj.note.confirm(_obj.msg.S8);
		
		if(!com){
			return false;
		}
		
		for(var i in _obj.data.panel){
			_this.keyDeleteObjPanelLi(_obj.data.panel[i].key, panelKey);
			_this.keyDeleteObjPanel(_obj.data.panel[i], panelKey);
		}
	}
};

/**
 * @description 根据面板key删除物体对象里的order与item的面板项
 * @method keyDeleteObjPanel
 * @param {Object} obj 物体对象数据
 * @param {String} panelKey 面板key值
 * @static
 */
uinv.FCM.configMgr.model.panel.keyDeleteObjPanel = function(obj, panelKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if( _obj.model.array.inArray(panelKey, obj.order) ){
		var index = _obj.model.array.strInArrayIndex( panelKey, obj.order );
		obj.order.splice(index,1);
	}
	
	if( _obj.model.array.inArray(panelKey, obj.item) ){
		var index = _obj.model.array.strInArrayIndex( panelKey, obj.item );
		obj.item.splice(index,1);
	}
};

/**
 * @description 根据对象key，面板key，删除DOM节点
 * @method keyDeleteObjPanelLi
 * @param {String} objkey 对象key值
 * @param {String} panelkey 面板key值
 * @static
 */
uinv.FCM.configMgr.model.panel.keyDeleteObjPanelLi = function(objkey,panelkey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.box.find( _this.classStr ).find('.obj-' + objkey).find('li').each(function(){
		if( $(this).find('*[cate][name][value]').attr('value') == panelkey ){
			$(this).remove();
		}
	});
};

/**
 * @description 修改物体名称
 * 1) DOM节点文本修改
 * 2) 内存操作修改
 * @method modifyObjectName
 * @param {String} key 物体key值
 * @param {DOM} obj 触发修改名称事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.modifyObjectName = function(key,obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var value = $(obj).html();
	var h3 = $(obj).parent();
	h3.html( '<input type="text" value="'+value+'" />' );
	h3.find('input').focus().blur(function(){
		_this.keyFindObj(key).name = $(this).val();
		$(this).parent().html( '<span onclick="uinv.FCM.configMgr.model.panel.modifyObjectName(\''+key+'\',this);">' +  $(this).val() + '</span>');
	}).keydown(function(evt){
		var e = evt || windown.event;
		if(e.keyCode == 13){
			_this.keyFindObj(key).name = $(this).val();
			$(this).parent().html('<span onclick="uinv.FCM.configMgr.model.panel.modifyObjectName(\''+key+'\',this);">' +  $(this).val() + '</span>');
		}
	});
};

/**
 * @description 创建物体DOM节点函数
 * @method mkhtml
 * @param {Object} obj 物体数据
 * @return {String} DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.mkhtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var html = '';
	html += '<div class="list obj-'+obj.key+'">';
		html += '<div class="header" style="position:relative;">';
			html += '<h3><span onclick="uinv.FCM.configMgr.model.panel.modifyObjectName(\''+obj.key+'\',this);">'+obj.name+'</span></h3>';
			html += '<span class="action" style="position:absolute;right:10px;">';
				//html += '<a onclick="uinv.FCM.configMgr.model.panel.insertDividingLine(this,\''+obj.key+'\');" href="javascript:void(0);"><s>分割线</s></a>';
				//html += ' | ';
				html += '<a onclick="uinv.FCM.configMgr.model.panel.deleteObj(\''+obj.key+'\');" href="javascript:void(0);"><s>删除</s></a>';
			html += '</span>';
		html += '</div>';
		html += '<ul>';
		
		for(var i=0,k=obj.order.length; i<k; i++){
			if( obj.order[i] in _this.obj ){
				html += _this.mkHtmlList( obj, _this.obj[obj.order[i]] );
			}else{
				html += _this.mkHtmlList( obj, {'name':obj.order[i] });
			}
		}
		html += '</ul>';
	html += '</div>';
	
	return html;
};

/**
 * @description 创建物体面板项的DOM节点
 * @method mkHtmlList
 * @param {Object} obj 物体数据
 * @param {Object} panel 面板数据
 * @return {}
 * @static
 */
uinv.FCM.configMgr.model.panel.mkHtmlList = function(obj, panel){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = typeof panel.__key == 'string' ? panel.__key : panel.name;
	var delbtnValue = panel.name == u.le.get('分割线') ? '撤销' : '删除';
	
	var html = '';
	html += '<li>';
		html +=  '<span class="panel_name">'+panel.name+'</span>';
		html += '<span class="action panel_up">';
			html += '<a onclick="uinv.FCM.configMgr.model.panel.upMove(this);" class="'+_this.upMoveBtnClass+'" href="javascript:void(0);" style="display:none;"><s>上移</s></a>';
			html += '</span>';
			if( typeof panel['itemConfig'] == 'object' ){
				html += '<span class="panel_edit">';
				html += '<a onclick="uinv.FCM.configMgr.model.panel.itemConfig(\''+key+'\',\''+obj.key+'\');" href="javascript:void(0);"><s>编辑</s></a>';
				html += '</span>';				
			}else{
				html += '<span class="panel_edit">';
				html +='&nbsp;';
				html +='</span>';
			}
			html += '<span class="panel_del">';
			html += '<a onclick="uinv.FCM.configMgr.model.panel.deleteObjPanel(this);" href="javascript:void(0);"><s>'+delbtnValue+'</s></a>';
			html += '</span>';
			html += '<span class="panel_checkbox">';
			html += '<input onclick="uinv.FCM.configMgr.model.panel.checkd(this);"';
			html += ' name="'+ obj.key +'" value="'+ key +'"';
			html += ' cate="panel" path="panel" type="checkbox" />';
		html += '</span>';
	html += '</li>';
	
	return html;
};


/**
 * @description 面板编辑配置DOM节点创建 并且初始化面板配置数据
 * @method itemConfig
 * @param {String} key 面板key值
 * @param {String} objectKey 隶属物体key值
 * @static
 */
uinv.FCM.configMgr.model.panel.itemConfig = function(key, objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	
	if(typeof _this.obj[key]['itemConfig'] == 'undefined'){
		_this.note.alert(_obj.msg.S9);
	}

	_panel = _this.keyFindObj(objectKey);
	_panel['itemData'] = typeof _panel['itemData'] == 'undefined' ? {} : _panel['itemData'];
	_panel['itemData'][key] = typeof _panel['itemData'][key] == 'undefined' ? {} : _panel['itemData'][key];

	var html = '';
	html += '<div class="itemConfig" style="padding:10px;">';
	for(var i = 0 , k = _this.obj[key]['itemConfig'].length; i<k; i++){
		if( typeof _this.itemConfigTypeToHtml[_this.obj[key]['itemConfig'][i]['type']] == 'function' ){
			html += _this.itemConfigTypeToHtml[_this.obj[key]['itemConfig'][i]['type']](_this.obj[key]['itemConfig'][i],key, objectKey);
		}
	}
	html += '<p class="action">';
		html += '<input class="btn_cancel" onclick="uinv.FCM.configMgr.model.dialog.close();" />';
		html += '<input class="btn_save" onclick="uinv.FCM.configMgr.model.panel.itemConfigSubmit();" />';
	html += '</p>';
	
	html += '</div>';
	
	_obj.model.dialog.show(html);
	_this.itemConfigFormInit(objectKey);
};

/**
 * @description 初始化面板配置项表单
 * @method itemConfigFormInit
 * @static
 */
uinv.FCM.configMgr.model.panel.itemConfigFormInit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
		if( typeof _this.itemConfigInitData[$(this).attr('cate')] == 'function' ){
			_this.itemConfigInitData[$(this).attr('cate')](this);
		}
	});
};

/**
 * @description 面板配置表单提交 将表单值写入内存中
 * @method itemConfigSubmit
 * @static
 */
uinv.FCM.configMgr.model.panel.itemConfigSubmit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
		if( typeof _this.itemConfigSetData[$(this).attr('cate')] == 'function' ){
			_this.itemConfigSetData[$(this).attr('cate')](this);
		}
	});
	
	_obj.model.dialog.close();
};

/**
 * @description 添加面板DOM节点到物体DOM树里
 * @method addPanelOneToObj
 * @param {String} key 物体key值
 * @param {String} html 创建的DOM面板节点
 * @static
 */
uinv.FCM.configMgr.model.panel.addPanelOneToObj = function( key, html ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.obj-' + key).find('ul').append(html);
};

/**
 * @description 根据value删除物体DOM树下的面板项DOM节点
 * @method removeObjPanelIsValue
 * @param {String} key 物体key值
 * @param {String} value 面板DOM节点的value值
 * @static
 */
uinv.FCM.configMgr.model.panel.removeObjPanelIsValue = function( key, value ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.obj-' + key).find('*[name="'+key+'"][value="'+value+'"]').parents('li').remove();
};

/**
 * @description 面板排序 把已勾选的面板排到前面，未勾选的面板排到后面
 * @method order
 * @param {DOM} obj DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.order = function(obj){
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

/**
 * @description 显示面板上移按钮 因为面板未勾选的时候会隐藏
 * @method showUpMoveBtn
 * @param {DOM} obj 触发事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.showUpMoveBtn = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).show();
};


/**
 * @description 隐藏上移按钮 因为面板取消选中状态时要隐藏下移按钮
 * @method hideUpMoveBtn 
 * @param {DOM} obj DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.hideUpMoveBtn = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).hide();
};

/**
 * @description 选中面板触发函数
 * 1) 初始化面板checkbox为true的时候也触发
 * @param {DOM} obj 选中面板的checkbox DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.checkd = function(obj){
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

/**
 * @description 选中面板后要把选中的面板排到前面，主要防止在它前面有未选中的面板
 * @method checkedPanelOrder
 * @param {String} name 面板name值
 * @static
 */
uinv.FCM.configMgr.model.panel.checkedPanelOrder = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var panelObj = _this.keyFindObj( name );
	var panelForm = _obj.form.box.find('*[name=' + name + ']:checked');
	
	if( panelObj.item.length == panelForm.length ){
		for( var i = 0, k = panelObj.item.length; i<k; i++ ){
			var obj = _obj.form.box.find('*[name=' + name + '][value="' + panelObj.item[i] + '"]');
			var index = obj.parents('li').index();
			if(i != index){
				_obj.form.box.find( '*[name='+ name +']:eq('+ i +')' ).parents('li').before( obj.parents('li') );
			}
		}
	}
};

/**
 * @description 上移面板操作
 * @method upMove
 * @param {DOM} obj 触发事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.upMove = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var checkObj =  $(obj).parents('li').find('input[type=checkbox][name]');
	
	// 如果面板没有被选中状态，就return退出，不执行上移操作
	if( checkObj.get(0).checked == false ) {
		return;
	}
	
	var index = $(obj).parents('li').index();
	
	// 如果面板排在首位就return退出，不执行上移操作
	if(index == 0){
		return;
	}
	
	// 上移操作
	index--;
	var name = checkObj.attr('name');
	_obj.form.box.find( '*[name='+name+']:eq('+index+')' ).parents('li').before( $(obj).parents('li') );	
};

/**
 * @description 判断key是否已被使用，防止key重复
 * @method checkHasKey
 * @param {String} key值
 * @return {Boolean}
 * @static
 */
uinv.FCM.configMgr.model.panel.checkHasKey = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i = 0 ,k = _obj.data.panel.length ; i<k ; i++){
		if( _obj.data.panel[i].key == key ){
			return true;
		}
	}
	
	return false;
};

/**
 * @description 创建物体 （内存操作）
 * @method addObject
 * @param {Object} obj 物体数据
 * @return {Object} 组合过的物体数据
 * @static
 */
uinv.FCM.configMgr.model.panel.addObject = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	do{
		var key = _obj.model.key.create(32);
		var bool = _this.checkHasKey(key);
	}while(bool);
	
	var comObj = {
		'key' : key,
		'name' : obj.name,
		'obj' : obj.where,
		'itemConfig' : {},
		'order' : [],
		'item' : []
	};
	
	for(var i in _this.obj ){
		comObj.order.push(i);
	}
	
	_obj.data.panel.push(comObj);
	return comObj;
};
		
/**
 * @description 检测两个物体是否相等
 * 1) 实际上只是检测物体的condition
 * 2) 当前检测的condition只有name attribute classid
 * @method judgeObjectIsEq
 * @param {Object} o1 物体1
 * @param {Object} o2 物体2
 * @return {Boolean} true 相等 false 不相等
 * @static
 */
uinv.FCM.configMgr.model.panel.judgeObjectIsEq = function(o1,o2){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = false;
	
	// 检测 classid相等
	if( typeof o1.classid != 'undefined' && typeof o2.classid != 'undefined' && o1.classid == o2.classid){
		bool = true;
	}
	
	// 检测 name相等
	if( typeof o1.name != 'undefined' && typeof o2.name != 'undefined' && o1.name == o2.name){
		bool = true;
	}
	
	// 检测attribute
	if( typeof o1.attribute != 'undefined' && typeof o2.attribute != 'undefined' && 
		o1.attribute[0].key ==  o2.attribute[0].key && o1.attribute[0].value ==  o2.attribute[0].value ){
			
		bool = true;
	}				
	
	return bool;
};

/**
 * @description 判断物体是否已经存在
 * 1) 实际上是遍历已创建的物体挨个比较是否有condition一样的物体 fun除外
 * @method checkObjectExist
 * @param {Object} obj 要检测的物体
 * @return {Boolean} true 存在 false 不存在
 * @static
 */
uinv.FCM.configMgr.model.panel.checkObjectExist = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.panel.length; i<k; i++){
		if( _this.judgeObjectIsEq(obj, _obj.data.panel[i].obj ) ){
			return true;
		}
	}
	
	return false;
};
	
/**
 * @description 添加面板逻辑业务处理
 * @method add
 * @param {Object} obj 面板数据
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.panel.add = function(obj, fun){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	// 判断是添加到全局还是对象
	if( typeof _this.uploadPanelSelector == 'undefined'  ){
		_this.addPanelToGlobalLib( obj, _this.addPanelToGlobalLibCallback );
	}else{
		_this.addPanelToObjLib( obj, _this.addPanelToObjLibCallback );
	}
};

/**
 * @description 添加面板到全局对象 （内存操作）
 * @method addPanelToGlobalLib
 * @param {Object} obj 面板数据
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.panel.addPanelToGlobalLib = function( obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = typeof obj.__key == 'string' ? obj.__key : obj.name;
	
	_this.obj[key] = {};
		
	for(var i in obj){
		_this.obj[key][i] = obj[i];
	}
	
	if( typeof fun == 'function' ){
		fun.apply( _this, [obj] );
	}
};

/**
 * @description 添加面板到全局对象 回调
 * @method addPanelToGlobalLibCallback
 * @param {Object} obj 面板数据
 * @static
 */
uinv.FCM.configMgr.model.panel.addPanelToGlobalLibCallback = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 添加面板全局对象下
	_this.obj[obj.name] = _obj.model.object.clone(obj);
	
	// 添加到各个面板
	for(var i = 0,k=_obj.data.panel.length; i<k; i++){
		var key = _obj.data.panel[i].key;
		
		//_obj.data.panel[i].lib[obj.name] = _obj.model.object.clone(obj);
		//_obj.data.panel[i].order.push( obj.name );
		
		var html = _this.mkHtmlList( {'key':key}, obj);
		_this.removeObjPanelIsValue( key, obj.name );
		_this.addPanelOneToObj( key , html );	
		
	}
};

/**
 * @description 对象写到文本数据后回调函数
 * @method setDBCallback
 * @static
 */
uinv.FCM.configMgr.model.panel.setDBCallback = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
};

/**
 * @description 添加面板到指定物体的面板库内
 * @method addPanelToObjLib
 * @param {Object} obj 面板
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.panel.addPanelToObjLib = function( obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = obj.name;
	
	if(typeof obj.__key == 'string'){
		key = obj.__key;
	}
	
	var panelObj = _this.keyFindObj( _this.uploadPanelSelector );
	
	panelObj.lib[key] = {};
	panelObj.order.push(key);
	
	for(var i in obj){
		panelObj.lib[key][i] = obj[i];
	}
	
	if( typeof fun == 'function' ){
		fun( panelObj, obj );
	}
};

/**
 * @description 添加面板到指定对象回调函数
 * @method addPanelToObjLibCallback
 * @param {Object} obj 物体数据
 * @param {Object} panel 面板数据
 * @static
 */
uinv.FCM.configMgr.model.panel.addPanelToObjLibCallback = function( obj, panel ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 是否添加全部
	var appendAll = true;

	// 添加单个
	var key = typeof panel.__key == 'string' ? panel.__key : panel.name;
	var html = _this.mkHtmlList( obj, panel );
	_this.removeObjPanelIsValue( obj.key, key );
	_this.addPanelOneToObj( obj.key , html );
};

/**
 * @description 索引面板副数据
 * @method getPanelList
 * @return {Object} 面板副数据
 */
uinv.FCM.configMgr.model.panel.getPanelList = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return _obj.model.stringDB.get(_this.index);
};

/**
 * @description 面板上传
 * @method uinv.FCM.configMgr.model.panel.upload
 * @see uinv.server.manager.frame.upAndUnZip()
 * @param {DOM} obj 上传空间DOM对象
 * @param {} selector
 * @static
 */
uinv.FCM.configMgr.model.panel.upload = function(obj, selector){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(selector){
		var panelObj = _this.keyFindObj( selector );
		if(typeof panelObj.lib == 'undefined'){
			_obj.note.alert(_obj.msg.s10);
			return;
		}
	}
	
	_this.uploadPanelSelector = selector;
	var pathinfo = $(obj).val().split("\\");
	var filename = pathinfo[ pathinfo.length-1 ];

	uinv.server.manager.frame.upAndUnZip(obj, filename, function(result){ _this.uploadCallback(result); } );
};

/**
 * @description 上传面板回调函数 主要接受回传的面板内容，以做下一步处理
 * @method uinv.FCM.configMgr.model.panel.uploadCallback
 * @param {Object} result 执行上传操作后服务器返回的结果
 * @static
 */
uinv.FCM.configMgr.model.panel.uploadCallback = function(result){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( result.success ){
		
		var obj = _obj.model.transform.str2obj(result.data);
		
		var bool = _this.verificationPanelData(obj);

		if(bool){
			if(_obj.model.array.isArray(obj)){
				for(var i = 0,k=obj.length; i<k; i++){
					_this.add(obj[i] , _this.addCallback );
				}
			}else{
				_this.add(obj , _this.addCallback );
			}							
		}
		
		_obj.form.submit();
	}else{
		_obj.note.alert(result.data);
	}
};

/**
 * @description 检测上传面板数据的合法性
 * @method verificationPanelData
 * @param {Object} obj 上传的面板数据
 * @return {Boolean} true 合法 false 不合法
 * @static
 */
uinv.FCM.configMgr.model.panel.verificationPanelData = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(_obj.model.array.isArray(obj)){
	
		for(var i = 0, k=obj.length; i<k; i++){
			if( !_obj.model.object.isObject( obj[i] ) || typeof obj[i].name == 'undefined' ){
				_obj.note.dialog( _obj.msg.S11  );
				return false;
			}
		}
		
		return true;
		
	}else if( _obj.model.object.isObject( obj ) ){
		if( typeof obj.name != 'undefined' ){
			return true;
		}else{
			_obj.note.dialog( _obj.msg.S11  );
			return false;
		}
	}else{
		_obj.note.dialog( _obj.msg.S11  );
		return false;
	}
};

/**
 * @description 根据传入参数创建全局面板的DOM节点
 * @method globalPanelListHtml
 * @param {Object} obj 面板数据
 * @return {String} DOM节点
 * @static
 */
uinv.FCM.configMgr.model.panel.globalPanelListHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	html += '<li style="margin:10px; position:relative;" key="'+ obj.name +'">';
		html += obj.name;
		html += '<span class="action" style="position:absolute;right:0; top:0;">';
			html += '<a onclick="uinv.FCM.configMgr.model.panel.deleteGlobalPanel(this, \''+ obj.name+'\');" href="javascript:void(0);"><s>删除</s></a>';
		html += '</span>';
	html += '</li>';
	
	return html;
};

/**
 * @description 全局面板管理页面入口
 * @method globalPanelManager
 * @static
 */
uinv.FCM.configMgr.model.panel.globalPanelManager = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var html = '';
	html += '<div style="width:500px;" class="'+_this.globalPanelManagementBoxClass+'">';
		html += '<div>';
			html += '<s>上传新面板</s><input type="file" onchange="uinv.FCM.configMgr.model.panel.upload(this);" /><br />';
			html += '<input type="text" /><button><s>添加分类</s></button>';
		html += '</div>';
		
		html += '<br />';
		
		html += '<ul style="width:100%;">';
		for(var i in _this.obj){
			html += _this.globalPanelListHtml( _this.obj[i] );
		}
		html += '</ul>';
		
		html += '<div class="action" style="width:100%;text-align:center;">';
			html += '<input class="btn_save" onclick="uinv.FCM.configMgr.model.dialog.close(uinv.FCM.configMgr.model.panel.globalPanelManagerCallBack);" />';
		html += '</div>';
	html += '</div>';
	
	_obj.model.dialog.show(html);
};

/**
 * @description 关闭全局面板管理窗口回调函数
 * @method globalPanelManagerCallBack
 * @static
 */
uinv.FCM.configMgr.model.panel.globalPanelManagerCallBack = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.stringDB.set( _this.index, _this.obj );
};

/**
 * @description 删除全局面板操作，只操作内存
 * @method deleteGlobalPanel
 * @param {DOM} obj 触发事件的DOM节点
 * @param {String} key 面板key值
 * @static
 */
uinv.FCM.configMgr.model.panel.deleteGlobalPanel = function(obj, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof _this.obj[key] != 'undefined' ){
		delete _this.obj[key];
	}
	
	$(obj).parents('li').remove();
};

/**
 * @description 初始化
 * @constructor init
 * @param {String} classStr 面板盒子DOM Class 值
 * @static
 */
uinv.FCM.configMgr.model.panel.init = function(classStr){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.submitCallback = function(){
		_obj.model.stringDB.set( _this.index, _this.obj, _this.setDBCallback );
	};
	
	_this.classStr = classStr || _this.classStr;
	
	_this.obj = _this.getPanelList();

	var html = '';
	for(var i=0,k=_obj.data.panel.length; i<k; i++){
		html += _this.mkhtml( _obj.data.panel[i] );
	}
	
	_obj.form.box.find(_this.classStr).html(html);
};