
 
/**
 * @description 字符串类型
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.string = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("panel/typeInputText.html",{
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
 * @description 多行字符串类型
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.multi = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("panel/typeTextarea.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		cate		: "multi"
	});
	
	return html;
};

/**
 * @description 数字类型
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.number = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("panel/typeInputText.html",{
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
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.bool = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;

	var value = typeof obj.defaultItem == 'undefined' ? false :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = "";

	html = _obj.template.load("panel/typeBool.html",{
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
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.color = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;

	var value = typeof obj.defaultItem == 'undefined' ? '#FFFFFF' :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';
		
	html = _obj.template.load("panel/typeInputText.html",{
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
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.position3d = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;

	var value = typeof obj.defaultItem == 'undefined' ? [0,0,0] :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';

	html = _obj.template.load("panel/position3d.html",{
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
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.position2d = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
	var value = typeof obj.defaultItem == 'undefined' ? [0,0] :  obj.defaultItem,
		caption	= typeof obj.caption == 'undefined' ? obj.name : obj.caption,
		html = '';

	html = _obj.template.load("panel/position2d.html",{
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
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml.select = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
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
	
	html = _obj.template.load("panel/typeSelect.html",{
		key			: key,
		value		: value,
		caption		: caption,
		name		: obj.name,
		objectKey	: objectKey,
		items		: items
	});	
	
	return html;
};