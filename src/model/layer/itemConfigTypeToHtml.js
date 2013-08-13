

/**
 * @description 字符串类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.string = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("layer/typeInputText.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		cate		: "string"
	});
	
	return html;
};

/**
 * @description 数字类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.number = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;

	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("layer/typeInputText.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		cate		: "number"
	});
	
	return html;
};

/**
 * @description 布尔类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.bool = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;

	var value = typeof obj.defaultItem == 'undefined' ? false :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = "";
		
	html = _obj.template.load("layer/typeBool.html",{
		key					: key,
		isTrue				: value,
		caption				: caption,
		name				: obj.name,
		objectKey			: objectKey,
		itemsTrueCaption	: obj.items.TRUE,
		itemsFalseCaption	: obj.items.FALSE
	});
	
	return html;
};

/**
 * @description 颜色类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.color = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj.defaultItem == 'undefined' ? '#FFFFFF' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("layer/typeInputText.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		cate		: "color"
	});
	
	return html;
};

/**
 * @description 3D位置类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.position3d = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var value = typeof obj.defaultItem == 'undefined' ? [0,0,0] :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';

	html = _obj.template.load("layer/position3d.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		itemsCaption: obj.items
	});
	
	return html;
};

/**
 * @description 2D位置类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.position2d = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;

	var value = typeof obj.defaultItem == 'undefined' ? [0,0] :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';

	html = _obj.template.load("layer/position2d.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		itemsCaption: obj.items
	});
	
	return html;					
};

/**
 * @description 下拉类型
 * @param {Object} obj 图层数据
 * @param {Stirng} key 图层key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.layer.itemConfigTypeToHtml.select = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.layer;
	
	var caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem,
		items = [], tmpCpation = null;
		
	for(var i = 0, k = obj.items.length; i<k; i++){
		
		if(typeof obj.itemsCaption == "object" && typeof obj.itemsCaption[i] !== "undefined"){
			tmpCaption = obj.itemsCaption[i];
		}else{
			tmpCaption = obj.items[i];
		}

		items.push({
			caption : tmpCaption,
			value	: obj.items[i]
		});
	}
	
	html = _obj.template.load("layer/typeSelect.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		items		: items
	});	
	
	return html;
};