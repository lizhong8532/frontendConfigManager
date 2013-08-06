/**
 * @description 类型
 */
 
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
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem;
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj.caption == 'undefined' ){
	 		html += '<span>'+obj.name+'</span>';	
	 	}else{
	 		html += '<span>'+obj.caption+'</span>';
	 	}
 	
 		html += '<input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="string" path="'+key+'" value="'+value+'" />';
 	
 	html += '</p>';
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
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem;
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj.caption == 'undefined' ){
	 		html += '<span>'+obj.name+'</span>';	
	 	}else{
	 		html += '<span>'+obj.caption+'</span>';
	 	}
	 	
 		html += '<input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="number" path="'+key+'" value="'+value+'" />';
 	
 	html += '</p>';
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
	
	var value = typeof obj.defaultItem == 'undefined' ? false :  obj.defaultItem;
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
 	if( typeof obj.caption == 'undefined' ){
 		html += '<span>'+obj.name+'</span>';	
 	}else{
 		html += '<span>'+obj.caption+'</span>';
 	}
	 	
 	if(value){
		html += obj.items[true]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj.name+'" cate="bool" path="'+key+'" value="1" checked /> ';
		html += obj.items[false]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj.name+'" cate="bool" path="'+key+'" value="0" /> ';
 	}else{
 		html += obj.items[true]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj.name+'" cate="bool" path="'+key+'" value="1" /> ';
		html += obj.items[false]+'<input type="radio" objectkey="'+objectKey+'" name="'+obj.name+'" cate="bool" path="'+key+'" value="0" checked /> ';
 	}
	 	
 	html += '</p>';
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
	
	var value = typeof obj.defaultItem == 'undefined' ? '#FFFFFF' :  obj.defaultItem;
	
 	var html = '';
 	html += '<p class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj.caption == 'undefined' ){
	 		html += '<span>'+obj.name+'</span>';	
	 	}else{
	 		html += '<span>'+obj.caption+'</span>';
	 	}
 	
 		html += '<input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="color" path="'+key+'" value="'+value+'"  />';
 	
 	html += '</p>';
 	return html;
};

/**
 * @description 3D位置类型
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml['3dposition'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
 	var html = '';
 	html += '<div class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj.caption == 'undefined' ){
	 		html += '<span>'+obj.name+'</span>';	
	 	}else{
	 		html += '<span>'+obj.caption+'</span>';
	 	}
	 	
 		html += '<ul>';
	 		html += '<li style="list-style:none;"><span><s>'+obj.items[0]+'</s></span><input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="3dposition" path="'+key+'"  /></li>';
	 		html += '<li style="list-style:none;"><span><s>'+obj.items[1]+'</s></span><input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="3dposition" path="'+key+'"  /></li>';
	 		html += '<li style="list-style:none;"><span><s>'+obj.items[2]+'</s></span><input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="3dposition" path="'+key+'"  /></li>';
 		html += '</ul>';
 	
 	html += '</div>';
 	return html;					
};

/**
 * @description 2D位置类型
 * @param {Object} obj 面板数据
 * @param {Stirng} key 面板key值
 * @param {String} objectKey 物体key值
 * @return {String} DOM节点
 */
uinv.FCM.configMgr.model.panel.itemConfigTypeToHtml['2dposition'] = function(obj,key,objectKey){
	var _obj = uinv.FCM.configMgr;
	var _this = uinv.FCM.configMgr.model.panel;
	
 	var html = '';
 	html += '<div class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj.caption == 'undefined' ){
	 		html += '<span><s>'+obj.name+'</s></span>';	
	 	}else{
	 		html += '<span><s>'+obj.caption+'</s></span>';
	 	}
	 	
 		html += '<ul>';
	 		html += '<li style="list-style:none;"><span><s>'+obj.items[0]+'</s></span><input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="2dposition" path="'+key+'"  /></li>';
	 		html += '<li style="list-style:none;"><span><s>'+obj.items[1]+'</s></span><input type="text" objectkey="'+objectKey+'" name="'+obj.name+'" cate="2dposition" path="'+key+'"  /></li>';
 		html += '</ul>';
 	
 	html += '</div>';
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
	
	var value = typeof obj.defaultItem == 'undefined' ? '' :  obj.defaultItem;
	
 	var html = '';
 	html += '<div class="row" style="margin:10px auto;">';
 		
	 	if( typeof obj.caption == 'undefined' ){
	 		html += '<span>'+obj.name+'</span>';	
	 	}else{
	 		html += '<span>'+obj.caption+'</span>';
	 	}
	 	
	 	html += '<select class="row_select" objectkey="'+objectKey+'" name="'+obj.name+'" cate="select" path="'+key+'">';
	 	for(var i = 0, k = obj.items.length; i<k; i++){
	 		if( obj.items[i]==value ){
	 			html += '<option value="'+obj.items[i]+'" selected>'+obj.items[i]+'</option>';
	 		}else{
	 			html += '<option value="'+obj.items[i]+'">'+obj.items[i]+'</option>';
	 		}
	 	}
	 	html += '</select>';
	 html += '</div>';
	 return html;
};