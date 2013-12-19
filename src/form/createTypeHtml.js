

/**
 * @description 布尔类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.bool = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey],
		html = "";
	
	html = _obj.template.load("form/bool.html",{
		value		: value,
		classValue	: o.level,
		itemkey		: o.itemkey,
		group		: o.group,
		name		: o.name,
		caption		: o.caption
	});
	
	return html;	
};

/**
 * @description 颜色类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.color = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;		
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey],
		html = "";
	
	html = _obj.template.load("form/inputText.html",{
		value		: value,
		classValue	: o.level,
		itemkey		: o.itemkey,
		group		: o.group,
		name		: o.name,
		caption		: o.caption,
		cate		: "color"
	});
	
	return html;
};

/**
 * @description 图片类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.image = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey],
		html = "";
		
	html = _obj.template.load("form/image.html",{
		value		: value,
		classValue	: o.level + " " + o.name,
		itemkey		: o.itemkey,
		group		: o.group,
		name		: o.name,
		caption		: o.caption,
		dir			: o.dir
	});
	
	return html;				
};

/**
 * @description 数字类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.number = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;	
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey],
		html = "";
		
	html = _obj.template.load("form/inputText.html",{
		value		: value,
		classValue	: o.level,
		itemkey		: o.itemkey,
		group		: o.group,
		name		: o.name,
		caption		: o.caption,
		cate		: "number"
	});
	
	return html;
};

/**
 * @description 字符类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.string = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey],
		html = "";
		
	html = _obj.template.load("form/inputText.html",{
		value		: value,
		classValue	: o.level,
		itemkey		: o.itemkey,
		group		: o.group,
		name		: o.name,
		caption		: o.caption,
		cate		: "string"
	});
	
	return html;
};


/**
 * @description 多行字符类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.multi = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey],
		html = "";
		
	html = _obj.template.load("form/textarea.html",{
		value		: value,
		classValue	: o.level,
		itemkey		: o.itemkey,
		group		: o.group,
		name		: o.name,
		caption		: o.caption,
		cate		: "multi"
	});
	
	return html;
};


/**
 * @description 数组类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.array = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	
	var html = "",
		contents = "";

	for(var i=0,k=o.settings.length;i<k;i++){
		if( typeof _this.createTypeHtml[o.settings[i].type] == 'function' ){
			o.settings[i].name = o.name;
			o.settings[i].group = o.group;
			o.settings[i].cate = 'arrayitem';
			o.settings[i].level = 'children';
			o.settings[i].defaultValue = o.defaultValue[i];
			o.settings[i].itemkey = i;
			
			// Fixes #4 把=改成+=修复数组定义只显示最后一项控件的bug
			contents += _this.createTypeHtml[o.settings[i].type](o.settings[i]);
		}
	}

	html = _obj.template.load("form/array.html",{
		classValue	: o.level,
		caption		: o.caption,
		contents	: contents
	});
	
	return html;
};


/**
 * @description 分割线类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.line = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var html = "";

	html = _obj.template.load("form/line.html",{
		classValue	: o.style
	});
	
	return html;
};

/**
 * @description 提示类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.title = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var html = "";

	html = _obj.template.load("form/title.html",{
		classValue	: o.style,
		info		: o.caption
	});
	
	return html;
};