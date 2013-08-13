
 
//--------------------------
// 基础定义
//--------------------------

/**
 * @description 全局图层DOM盒子Class值
 * @type String
 */
uinv.FCM.configMgr.model.layer.globalLayerManagementBoxClass = 'layer-global';

/**
 * @description 数据索引
 * @type String
 */
uinv.FCM.configMgr.model.layer.index = 'layer';

/**
 * @description 上传图层对象记录
 * @type String
 */
uinv.FCM.configMgr.model.layer.uploadLayerSelector = '';

/**
 * @description 副数据，将用于存储
 * @type Object
 */
uinv.FCM.configMgr.model.layer.obj = null;

/**
 * @description 图层上移按钮DOM节点class值定义
 * @type String
 */
uinv.FCM.configMgr.model.layer.upMoveBtnClass = 'upmove';

/**
 * @description 图层盒型DOM节点Class定义
 * @type String
 */
uinv.FCM.configMgr.model.layer.classStr = '';


//----------------------
// 操作区
//----------------------

/**
 * @description 根据key查找到图层对象
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 图层key值
 * @return {Object} 图层对象
 * @static
 */
uinv.FCM.configMgr.model.layer.keyFindObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i = 0,k=_obj.data.layer.length; i<k; i++){
		if( key == _obj.data.layer[i].key){
			return _obj.data.layer[i];
		}
	}
	return {};
};


/**
 * @description 根据key值删除图层对象（内存操作）
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 图层key值
 * @return {Boolean} true 删除成功 false 删除失败（可能key值不存在）
 */
uinv.FCM.configMgr.model.layer.keyDelObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i = 0, k = _obj.data.layer.length; i<k; i++){
		if( key == _obj.data.layer[i].key ){
			_obj.data.layer.splice(i,1);
			return true;
		}
	}
	
	return false;
};

/**
 * @description 创建物体方法<br />
 * 1) 实际调用选择器模块的公有方法选择对象节点作为创建
 * @memberOf uinv.FCM.configMgr.model.layer
 * @static
 */
uinv.FCM.configMgr.model.layer.createObject = function(){
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
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj 单击创建分割线的DOM节点
 * @param {String} key 创建分割线的图层key值
 * @return {Boolean} 如果key值为false将return false终止后面的操作
 * @static
 */
uinv.FCM.configMgr.model.layer.insertDividingLine = function(obj,key){
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
 * @description 删除物体操作<br />
 * 1) 执行内存删除操作<br />
 * 2) 执行页面DOM节点删除操作
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 物体key值
 * @static
 */
uinv.FCM.configMgr.model.layer.deleteObj = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_this.keyDelObj(key);
	
	// 删除节点
	_obj.form.box.find('.obj-' + key).remove();
};


/**
 * @description 删除图层项操作<br />
 * 1) 每一个物体下同名的图层都会一并删除<br />
 * 2) 只是内存操作，不提交服务器<br />
 * 3) 每一个物体下都删除同名的DOM节点
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj 触发删除事件的DOM节点
 * @return {Boolean} 将弹出确认会话框，如果取消删除操作则return false终止后面删除动作
 * @static
 */
uinv.FCM.configMgr.model.layer.deleteObjLayer = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var layerKey  = $(obj).parents('li').find('*[cate][name][value]').attr('value');
	
	if(layerKey == u.le.get('分割线')){
		
		$(obj).parents('li').remove();
		
	}else{
		com = _obj.note.confirm(_obj.msg.S8);
		
		if(!com){
			return false;
		}
		
		for(var i in _obj.data.layer){
			_this.keyDeleteObjLayerLi(_obj.data.layer[i].key, layerKey);
			_this.keyDeleteObjLayer(_obj.data.layer[i], layerKey);
		}
	}
};

/**
 * @description 根据图层key删除物体对象里的order与item的图层项
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 物体对象数据
 * @param {String} layerKey 图层key值
 * @static
 */
uinv.FCM.configMgr.model.layer.keyDeleteObjLayer = function(obj, layerKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var index = 0;
	
	if( _obj.model.array.inArray(layerKey, obj.order) ){
		index = _obj.model.array.strInArrayIndex( layerKey, obj.order );
		obj.order.splice(index,1);
	}
	
	if( _obj.model.array.inArray(layerKey, obj.item) ){
		index = _obj.model.array.strInArrayIndex( layerKey, obj.item );
		obj.item.splice(index,1);
	}
};

/**
 * @description 根据对象key，图层key，删除DOM节点
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} objkey 对象key值
 * @param {String} layerkey 图层key值
 * @static
 */
uinv.FCM.configMgr.model.layer.keyDeleteObjLayerLi = function(objkey,layerkey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.form.box.find( _this.classStr ).find('.obj-' + objkey).find('li').each(function(){
		if( $(this).find('*[cate][name][value]').attr('value') == layerkey ){
			$(this).remove();
		}
	});
};

/**
 * @description 修改物体名称<br />
 * 1) DOM节点文本修改<br />
 * 2) 内存操作修改
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 物体key值
 * @param {DOM} obj 触发修改名称事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.modifyObjectName = function(key,obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var value = $(obj).html();
	var h3 = $(obj).parent();
	
	h3.html( _obj.template.load("input_text.html", {
		value	: value
	}));
	
	h3.find('input').focus().blur(function(){
		_this.keyFindObj(key).name = $(this).val();
		$(this).parent().html( '<span onclick="uinv.FCM.configMgr.model.layer.modifyObjectName(\''+key+'\',this);">' +  $(this).val() + '</span>');
	}).keydown(function(evt){
		var e = evt || windown.event;
		if(e.keyCode == 13){
			_this.keyFindObj(key).name = $(this).val();
			$(this).parent().html('<span onclick="uinv.FCM.configMgr.model.layer.modifyObjectName(\''+key+'\',this);">' +  $(this).val() + '</span>');
		}
	});
};

/**
 * @description 创建物体DOM节点函数
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 物体数据
 * @return {String} DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.mkhtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var html = "",
		layerLis = "";

	for(var i=0,k=obj.order.length; i<k; i++){
		if( obj.order[i] in _this.obj ){
			layerLis += _this.mkHtmlList( obj, _this.obj[obj.order[i]] );
		}else{
			layerLis += _this.mkHtmlList( obj, {'name':obj.order[i] });
		}
	}	
		
	html = _obj.template.load("layer/layerListMain.html",{
		layerLis	: layerLis,
		key			: obj.key,
		name		: obj.name
	});
	
	return html;
};

/**
 * @description 创建物体图层项的DOM节点
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 物体数据
 * @param {Object} layer 图层数据
 * @return {}
 * @static
 */
uinv.FCM.configMgr.model.layer.mkHtmlList = function(obj, layer){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = typeof layer.__key == 'string' ? layer.__key : layer.name,
		delbtnValue = layer.name == u.le.get('分割线') ? '撤销' : '删除',
		html = "";
	
	html = _obj.template.load("layer/layerListLi.html",{
		key				: key,
		objKey			: obj.key,
		delbtnValue		: delbtnValue,
		layerName		: layer.name,
		upMoveBtnClass	: _this.upMoveBtnClass,
		isViewsEditBtn	: typeof layer.itemConfig === 'object'
	});
	
	return html;
};


/**
 * @description 图层编辑配置DOM节点创建 并且初始化图层配置数据
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 图层key值
 * @param {String} objectKey 隶属物体key值
 * @static
 */
uinv.FCM.configMgr.model.layer.itemConfig = function(key, objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	
	if(typeof _this.obj[key].itemConfig == 'undefined'){
		_this.note.alert(_obj.msg.S9);
	}

	_layer = _this.keyFindObj(objectKey);
	_layer.itemData = typeof _layer.itemData == 'undefined' ? {} : _layer.itemData;
	_layer.itemData[key] = typeof _layer.itemData[key] == 'undefined' ? {} : _layer.itemData[key];

	var html = "",
		itemConfigRows = "";
		
	for(var i = 0 , k = _this.obj[key].itemConfig.length; i<k; i++){
		if( typeof _this.itemConfigTypeToHtml[_this.obj[key].itemConfig[i].type] == 'function' ){
			itemConfigRows += _this.itemConfigTypeToHtml[_this.obj[key].itemConfig[i].type](_this.obj[key].itemConfig[i],key, objectKey);
		}
	}

	html = _obj.template.load("layer/itemConfigMain.html", {
		itemConfigRows : itemConfigRows
	});
	
	_obj.model.dialog.show(html);
	_this.itemConfigFormInit(objectKey);
};

/**
 * @description 初始化图层配置项表单
 * @memberOf uinv.FCM.configMgr.model.layer
 * @static
 */
uinv.FCM.configMgr.model.layer.itemConfigFormInit = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
		if( typeof _this.itemConfigInitData[$(this).attr('cate')] == 'function' ){
			_this.itemConfigInitData[$(this).attr('cate')](this);
		}
	});
};

/**
 * @description 图层配置表单提交 将表单值写入内存中
 * @memberOf uinv.FCM.configMgr.model.layer
 * @static
 */
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

/**
 * @description 添加图层DOM节点到物体DOM树里
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 物体key值
 * @param {String} html 创建的DOM图层节点
 * @static
 */
uinv.FCM.configMgr.model.layer.addLayerOneToObj = function( key, html ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.obj-' + key).find('ul').append(html);
};

/**
 * @description 根据value删除物体DOM树下的图层项DOM节点
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key 物体key值
 * @param {String} value 图层DOM节点的value值
 * @static
 */
uinv.FCM.configMgr.model.layer.removeObjLayerIsValue = function( key, value ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.form.box.find('.obj-' + key).find('*[name="'+key+'"][value="'+value+'"]').parents('li').remove();
};

/**
 * @description 图层排序 把已勾选的图层排到前面，未勾选的图层排到后面
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.order = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var num = 0;
	var index = 0;
	_obj.form.box.find( '*[name='+$(obj).attr('name')+']' ).each(function(i){
		if( this.checked === true && this != obj){
			num++;
		}else if( this==obj ){
			index = i;
		}
	});
	
	// 排序
	if(index != num){
		if(obj.checked === true){
			_obj.form.box.find( '*[name='+$(obj).attr('name')+']:eq('+num+')' ).parents('li').before( $(obj).parents('li') );
		}else{
			_obj.form.box.find( '*[name='+$(obj).attr('name')+']:eq('+num+')' ).parents('li').after( $(obj).parents('li') );
		}
	}
};

/**
 * @description 显示图层上移按钮 因为图层未勾选的时候会隐藏
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj 触发事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.showUpMoveBtn = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).show();
};


/**
 * @description 隐藏上移按钮 因为图层取消选中状态时要隐藏下移按钮
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.hideUpMoveBtn = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).hide();
};

/**
 * @description 选中图层触发函数<br />
 * 1) 初始化图层checkbox为true的时候也触发
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj 选中图层的checkbox DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.checkd = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	// 排序
	_this.order(obj);
	
	if(obj.checked === true){
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
 * @description 选中图层后要把选中的图层排到前面，主要防止在它前面有未选中的图层
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} name 图层name值
 * @static
 */
uinv.FCM.configMgr.model.layer.checkedLayerOrder = function(name){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var layerObj = _this.keyFindObj( name );
	var layerForm = _obj.form.box.find('*[name=' + name + ']:checked');
	
	if( layerObj.item.length == layerForm.length ){
		for( var i = 0, k = layerObj.item.length; i<k; i++ ){
			var obj = _obj.form.box.find('*[name=' + name + '][value="' + layerObj.item[i] + '"]');
			var index = obj.parents('li').index();
			if(i != index){
				_obj.form.box.find( '*[name='+ name +']:eq('+ i +')' ).parents('li').before( obj.parents('li') );
			}
		}
	}
};

/**
 * @description 上移图层操作
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj 触发事件的DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.upMove = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var checkObj =  $(obj).parents('li').find('input[type=checkbox][name]');
	
	// 如果图层没有被选中状态，就return退出，不执行上移操作
	if( checkObj.get(0).checked === false ) {
		return;
	}
	
	var index = $(obj).parents('li').index();
	
	// 如果图层排在首位就return退出，不执行上移操作
	if(index === 0){
		return;
	}
	
	// 上移操作
	index--;
	var name = checkObj.attr('name');
	_obj.form.box.find( '*[name='+name+']:eq('+index+')' ).parents('li').before( $(obj).parents('li') );	
};

/**
 * @description 判断key是否已被使用，防止key重复
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} key值
 * @return {Boolean}
 * @static
 */
uinv.FCM.configMgr.model.layer.checkHasKey = function(key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	for(var i = 0 ,k = _obj.data.layer.length ; i<k ; i++){
		if( _obj.data.layer[i].key == key ){
			return true;
		}
	}
	
	return false;
};

/**
 * @description 创建物体 （内存操作）
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 物体数据
 * @return {Object} 组合过的物体数据
 * @static
 */
uinv.FCM.configMgr.model.layer.addObject = function( obj ){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		key = "",
		i = null,
		bool = false;
	
	do{
		key = _obj.model.key.create(32);
		bool = _this.checkHasKey(key);
	}while(bool);
	
	var comObj = {
		'key' : key,
		'name' : obj.name,
		'obj' : obj.where,
		'itemConfig' : {},
		'order' : [],
		'item' : []
	};
	
	for(i in _this.obj ){
		comObj.order.push(i);
	}
	
	_obj.data.layer.push(comObj);
	return comObj;
};
		
/**
 * @description 检测两个物体是否相等<br />
 * 1) 实际上只是检测物体的condition<br />
 * 2) 当前检测的condition只有name attribute classid
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} o1 物体1
 * @param {Object} o2 物体2
 * @return {Boolean} true 相等 false 不相等
 * @static
 */
uinv.FCM.configMgr.model.layer.judgeObjectIsEq = function(o1,o2){
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
 * @description 判断物体是否已经存在<br />
 * 1) 实际上是遍历已创建的物体挨个比较是否有condition一样的物体 fun除外
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 要检测的物体
 * @return {Boolean} true 存在 false 不存在
 * @static
 */
uinv.FCM.configMgr.model.layer.checkObjectExist = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	for(var i=0,k=_obj.data.layer.length; i<k; i++){
		if( _this.judgeObjectIsEq(obj, _obj.data.layer[i].obj ) ){
			return true;
		}
	}
	
	return false;
};
	
/**
 * @description 添加图层逻辑业务处理
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 图层数据
 * @param {Function} fun 回调函数
 * @static
 */
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

/**
 * @description 添加图层到全局对象 （内存操作）
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 图层数据
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.layer.addLayerToGlobalLib = function( obj, fun ){
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
 * @description 添加图层到全局对象 回调
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 图层数据
 * @static
 */
uinv.FCM.configMgr.model.layer.addLayerToGlobalLibCallback = function( obj ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 添加图层全局对象下
	_this.obj[obj.name] = _obj.model.object.clone(obj);
	
	// 添加到各个图层
	for(var i = 0,k=_obj.data.layer.length; i<k; i++){
		var key = _obj.data.layer[i].key;
		
		//_obj.data.layer[i].lib[obj.name] = _obj.model.object.clone(obj);
		//_obj.data.layer[i].order.push( obj.name );
		
		var html = _this.mkHtmlList( {'key':key}, obj);
		_this.removeObjLayerIsValue( key, obj.name );
		_this.addLayerOneToObj( key , html );	
		
	}
};

/**
 * @description 对象写到文本数据后回调函数
 * @memberOf uinv.FCM.configMgr.model.layer
 * @static
 */
uinv.FCM.configMgr.model.layer.setDBCallback = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
};

/**
 * @description 添加图层到指定物体的图层库内
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 图层
 * @param {Function} fun 回调函数
 * @static
 */
uinv.FCM.configMgr.model.layer.addLayerToObjLib = function( obj, fun ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var key = obj.name;
	
	if(typeof obj.__key == 'string'){
		key = obj.__key;
	}
	
	var layerObj = _this.keyFindObj( _this.uploadLayerSelector );
	
	layerObj.lib[key] = {};
	layerObj.order.push(key);
	
	for(var i in obj){
		layerObj.lib[key][i] = obj[i];
	}
	
	if( typeof fun == 'function' ){
		fun( layerObj, obj );
	}
};

/**
 * @description 添加图层到指定对象回调函数
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 物体数据
 * @param {Object} layer 图层数据
 * @static
 */
uinv.FCM.configMgr.model.layer.addLayerToObjLibCallback = function( obj, layer ){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	// 是否添加全部
	var appendAll = true;

	// 添加单个
	var key = typeof layer.__key == 'string' ? layer.__key : layer.name;
	var html = _this.mkHtmlList( obj, layer );
	_this.removeObjLayerIsValue( obj.key, key );
	_this.addLayerOneToObj( obj.key , html );
};

/**
 * @description 索引图层副数据
 * @memberOf uinv.FCM.configMgr.model.layer
 * @return {Object} 图层副数据
 */
uinv.FCM.configMgr.model.layer.getLayerList = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	return _obj.model.stringDB.get(_this.index);
};

/**
 * @description 图层上传
 * @memberOf uinv.FCM.configMgr.model.layer
 * @see uinv.server.manager.frame.upAndUnZip()
 * @param {DOM} obj 上传空间DOM对象
 * @param {} selector
 * @static
 */
uinv.FCM.configMgr.model.layer.upload = function(obj, selector){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if(selector){
		var layerObj = _this.keyFindObj( selector );
		if(typeof layerObj.lib == 'undefined'){
			_obj.note.alert(_obj.msg.s10);
			return;
		}
	}
	
	_this.uploadLayerSelector = selector;
	var pathinfo = $(obj).val().split("\\");
	var filename = pathinfo[ pathinfo.length-1 ];

	uinv.server.manager.frame.upAndUnZip(obj, filename, function(result){ _this.uploadCallback(result); } );
};

/**
 * @description 上传图层回调函数 主要接受回传的图层内容，以做下一步处理
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} result 执行上传操作后服务器返回的结果
 * @static
 */
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
		
		_obj.form.submit();
	}else{
		_obj.note.alert(result.data);
	}
};

/**
 * @description 检测上传图层数据的合法性
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 上传的图层数据
 * @return {Boolean} true 合法 false 不合法
 * @static
 */
uinv.FCM.configMgr.model.layer.verificationLayerData = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	if(_obj.model.array.isArray(obj)){
	
		for(var i = 0, k=obj.length; i<k; i++){
			if( !_obj.model.object.isObject( obj[i] ) || typeof obj[i].name == 'undefined' ){
				_obj.note.dialog( _obj.msg.S11 );
				return false;
			}
		}
		
		return true;
		
	}else if( _obj.model.object.isObject( obj ) ){
		if( typeof obj.name != 'undefined' ){
			return true;
		}else{
			_obj.note.dialog(_obj.msg.S11  );
			return false;
		}
	}else{
		_obj.note.dialog( _obj.msg.S11  );
		return false;
	}
};

/**
 * @description 根据传入参数创建全局图层的DOM节点
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {Object} obj 图层数据
 * @return {String} DOM节点
 * @static
 */
uinv.FCM.configMgr.model.layer.globalLayerListHtml = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;	
	var html = '';

	html = _obj.template.load("layer/globalLayerList.html",obj);
	
	return html;
};

/**
 * @description 全局图层管理页面入口
 * @memberOf uinv.FCM.configMgr.model.layer
 * @static
 */
uinv.FCM.configMgr.model.layer.globalLayerManager = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;

	var html = "",
		list = "";
	
	for(var i in _this.obj){
		list += _this.globalPanelListHtml( _this.obj[i] );
	}

	html = _obj.template.load("layer/globalLayerManager.html",{
		globalLayerManagementBoxClass	: _this.globalLayerManagementBoxClass,
		list							: list
	});
	
	_obj.model.dialog.show(html);
};

/**
 * @description 关闭全局图层管理窗口回调函数
 * @memberOf uinv.FCM.configMgr.model.layer
 * @static
 */
uinv.FCM.configMgr.model.layer.globalLayerManagerCallBack = function(){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	_obj.model.stringDB.set( _this.index, _this.obj );
};

/**
 * @description 删除全局图层操作，只操作内存
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {DOM} obj 触发事件的DOM节点
 * @param {String} key 图层key值
 * @static
 */
uinv.FCM.configMgr.model.layer.deleteGlobalLayer = function(obj, key){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	if( typeof _this.obj[key] != 'undefined' ){
		delete _this.obj[key];
	}
	
	$(obj).parents('li').remove();
};

/**
 * @description 初始化
 * @memberOf uinv.FCM.configMgr.model.layer
 * @param {String} classStr 图层盒子DOM Class 值
 * @static
 */
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
