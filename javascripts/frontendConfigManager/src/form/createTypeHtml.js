/**
 * @description 类型
 */
 

/**
 * @description 布尔类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.boolean = function(o){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.form;
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey];
	
	var html = "";
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			if(value){
				html += '<label><input itemkey="'+o.itemkey+'" path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" checked value="1" /><s>是</s></label>';
				html += '<label><input itemkey="'+o.itemkey+'" path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" value="0" /><s>否</s></label>';					
			}else{
				html += '<label><input itemkey="'+o.itemkey+'" path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" value="1" /><s>是</s></label>';
				html += '<label><input itemkey="'+o.itemkey+'" path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" checked value="0" /><s>否</s></label>';			
			}
		html += '</span>';
	html += '</div>';
	
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
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey];
	
	var html = "";
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<input itemkey="'+o.itemkey+'" path="'+o.group+'" type="text" cate="color" name="'+o.name+'" value="'+value+'" />';
		html += '</span>';
	html += '</div>';
	
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
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey];
	
	var html = "";
	html += '<div class="row '+o.dir+' '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<img itemkey="'+o.itemkey+'" path="'+o.group+'" src="'+value+'" cate="image" name="'+o.name+'" />';
			html += '<button onclick="uinv.FCM.configMgr.model.images.show({dir:\''+o.dir+'\',name:\''+o.name+'\'});"><s>更换图片</s></button>';
		html += '</span>';
	html += '</div>';
	
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
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey];
	
	var html = "";
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<input itemkey="'+o.itemkey+'" path="'+o.group+'" type="text" cate="number" name="'+o.name+'" value="'+value+'" />';
		html += '</span>';
	html += '</div>';
	
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
	var value = o.itemkey === "" ? _obj.data[o.group][o.name] : _obj.data[o.group][o.name][o.itemkey];
	
	var html = "";
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			html += '<input itemkey="'+o.itemkey+'" path="'+o.group+'" type="text" cate="string" name="'+o.name+'" value="'+value+'" />';
		html += '</span>';
	html += '</div>';
	
	return html;
};

/**
 * @description 数组类型
 * @param {Object} o 表单数据
 * @return {String} HTML
 */
uinv.FCM.configMgr.form.createTypeHtml.array = function(o){
	var _this = uinv.FCM.configMgr.form;
	
	var html = "";
	html += '<div class="row '+o.level+'">';
		html += '<span class="comments"><s>'+o.caption+'</s></span>';
		html += '<span class="form">';
			for(var i=0,k=o.settings.length;i<k;i++){
				if( typeof _this.createTypeHtml[o.settings[i].type] == 'function' ){
					o.settings[i].name = o.name;
					o.settings[i].group = o.group;
					o.settings[i].cate = 'arrayitem';
					o.settings[i].level = 'children';
					o.settings[i].defaultValue = o.defaultValue[i];
					o.settings[i].itemkey = i;
					html += _this.createTypeHtml[o.settings[i].type](o.settings[i]);
				}
			}
		html += '</span>';
	html += '</div>';
	
	return html;
};
