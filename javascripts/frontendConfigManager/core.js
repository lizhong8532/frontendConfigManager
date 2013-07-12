/**
 * core.js -1.0- 可视化配置核心文件
 * @description 是产品可视化配置的核心JS文件，目前主要实现图层、面板、统计、资源、选择器、布局、系统等模块的可视化配置
 * @author lizhong
 * @version 1.0
 * @date 2013-07
 */

uinv.FCM = uinv.FCM || {};

uinv.FCM.configMgr = {
	
	/**
	 * 全局配置
	 * @type 
	 */
	global:{
		// 统一路径
		path:'/frontendConfigManager',
		
		// 项目路径
		// 实际上当脚本初始化后会在init函数内自动获取项目路径重新赋值
		// 比如URL路径http://localhost:8080/uinv_frontend/admin.html则截取uinv_frontend
		projectPath:''
	},
	
	/**
	 * 提示处理
	 * @type 
	 */
	note:{
		
		/**
		 * @description 系统alert提示
		 * @param {String} str 提示内容 
		 */
		alert:function(str){
			alert(str);
		},
		
		/**
		 * @description 确认提示
		 * @param {String} str 提示内容
		 * @return {boolean} 确定or取消
		 */
		confirm:function(str){
			return confirm(str);
		},
		
		/**
		 * @description dialog提示 dialog宽度100px, 默认最小高度100px, 已经内置一个close按钮，点击close按钮可以关闭dialog会话层
		 * @param {String} str 提示内容 如果str有html标记将会按照html格式显示 
		 */
		dialog:function(str){
			var html = '';
			html += '<div style="width:300px;min-height:100px;padding:10px;text-align:center;">';
				html += '<p>' + str + '</p>';
				html += '<p style="margin-top:50px;"><button onclick="uinv.FCM.configMgr.model.dialog.close();">Close</button></p>';
			html += '</div>';
			
			uinv.FCM.configMgr.model.dialog.show(html);
		}
	},
	
	/**
	 * 模块类型
	 * @type 
	 */
	model:{
		
		/**
		 * 数组操作模块
		 * @type 
		 */
		array : {
			
			/**
			 * @description 判断字符是否存在数组里
			 * @param {String} str 搜索的字符串
			 * @param {Array} arr 被搜索的数组
			 * @return {Boolean} true 存在 false 不存在
			 */
			inArray : function(str, arr){
				for(var i = 0 ,k = arr.length; i<k ;i++){
					if(str == arr[i]){
						return true;
					}
				}
				return false;
			},
			
			/**
			 * @description 查找字符串在数组中的索引位置 
			 * @param {String} str 搜索的字符串
			 * @param {Array} arr 被搜索的数组
			 * @return {Boolean} Num ( -1 表示str不存在数组中 )
			 */
			strInArrayIndex : function(str, arr){
				for(var i = 0 ,k = arr.length; i<k ;i++){
					if(str == arr[i]){
						return i;
					}
				}
				return -1;			
			},
			/**
			 * @description 判断对象是否是数组类型
			 * @param {Object} o 要检测的object
			 * @return {Boolean} true 是数组 false 不是数组
			 */
			isArray:function(o){
				return o instanceof Array;
			}
		},
		
		/**
		 * 选择器
		 * @type 
		 */
		selector : {
			
			// 当选择好节点提交后执行的回调函数
			// 由每个调用show方法时传入，如果为null则等于没有回调函数
			// 主要是返回选择的结果
			publicSelectNodeSubmitCallback:null,
			
			// 选择器操作的DOM对象的class名称
			// 初始的时候，会把这个选择器的数据在此dom节点上画出树形结构
			classStr:'',
			
			// 其它额外的辅助数据对象，每次初始时候会从服务器更新并且有变更时可以提交到服务器
			obj : null,
			
			// 数据存储中选择器的index数据索引，可以根据这个索引进行数据存储
			// 实现的方法在stringDB模块
			index:'selector',
			
			// 当前选中节点的key值
			selectKey:'',
			
			/**
			 * @description 物体选择器的选择操作，供其它页面的模块中调用，如在图层模块中要创建对象时就会调用此方法。通过dialog模块把数据展现成树形弹层，用户可以在弹层上选择节点
			 * @param {Function} fun 回调函数 返回 obj { 'name' : '物体名称', 'where' : { 物体的条件 } }
			 */
			show:function(fun){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.publicSelectNodeSubmitCallback = fun;
				var html = '';
				html += '<div class="selector" style="width:500px;height:300px;">';
					html += '<div class="tree" style="height:250px;width:100%;border:1px solid #EEE;overflow-y:auto;">';
						html += _this.publicShowHtml(_this.obj['tree']);
					html += '</div>';
					
					html += '<div class="action" style="text-align:center;">';
						html += '<button onclick="uinv.FCM.configMgr.model.dialog.close();">取消</button>';
						html += '<button onclick="uinv.FCM.configMgr.model.selector.publicSelectNodeSubmit();">确定</button>';
					html += '</div>';
				html += '</div>';
				
				_obj.model.dialog.show(html);
			},
			
			/**
			 * @description 隐藏物体选择器的操作，实际是调用dialog模块的close方法
			 */
			hide:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.dialog.close();
			},
			
			
			// 提交
			publicSelectNodeSubmit:function(){
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
			},
			// 选择
			publicSelectNode:function(obj,key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_obj.model.dialog.getObj().find('.tree').find('.ok').removeClass('ok');
				
				if(_this.objIsExistWhere(key)){
					$(obj).parents('.treeNode:eq(0)').addClass('ok');
				}else{
					_obj.note.alert('未添加条件的节点不能选择!');
				}
			},
			// 拼写html
			publicShowHtml:function(obj){
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
			},
			/**
			 * 取消按钮操作
			 * @param {} fun
			 */
			cancelAddNodeWhere:function(fun){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.dialog.close();
				if(typeof fun == 'function'){
					fun.apply(_this);
				}
			},
			/**
			 * 获取全部Class
			 * @return {}
			 */
			getAllClassID:function(){
				// 获取全部列表
				return uinv.factory.getAllClass();		
			},
			/**
			 * 获取单个Class
			 * @param {} classid
			 * @return {}
			 */
			getOneClassID:function(classid){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var all = _this.getAllClassID();
				for(var i in all){
					if(all[i]['classId'] == classid){
						return all[i];
					}
				}
			},
			// 重命名
			nodeRename:function(key){
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
			},
			// key 找到 html 节点
			keyFindNodeHtmlObj:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				if(key == ''){
					return _obj.form.box.find(_this.classStr);
				}else{
					return _obj.form.box.find(_this.classStr).find('*[key='+key+']');
				}
			},
			// 删除节点
			deleteNode:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var node = _this.keyFindTreeNodeObj( _this.obj['tree'], key);
				node['parent'].splice(node['index'],1);
				delete _this.obj['lib'][key];
				_this.keyFindNodeHtmlObj(key).remove();
			},
			/**
			 * 创建节点
			 * @return {}
			 */
			createNode:function(parentKey){
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
			},
			// 插入对象到树节点
			insertNodeToTreeObj:function(node,parentKey){
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
			},
			// 插入到DOM树
			insertNodeToTreeDom:function(node, parentKey){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				html += '<div  key="'+node['key']+'" class="treeNode" style="padding-left:20px;">';
					html += '<span onclick="uinv.FCM.configMgr.model.selector.selectNode(\''+node['key']+'\',event);"  oncontextmenu="uinv.FCM.configMgr.model.selector.contextMenu(event,this);">'+node['name']+'</span>';
					html += '<div class="childrenNode"></div>';
				html += '</div>';
			
				_this.keyFindNodeHtmlObj( _this.selectKey ).find('>.childrenNode').append(html);
			},
			// key 找到 obj
			keyFindTreeNodeObj:function(obj,key){
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
			},
			// 递归
			recursionTreeHtml:function(obj){
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
			},
			// 画出树结果
			treeHtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				
				html += '<div class="childrenNode">';
				if(typeof _this.obj['tree'] == 'object'){
					html += _this.recursionTreeHtml(  _this.obj['tree'] );
				}
				
				html += '</div>';
				
				return html;
			},
			// 根据不同类型存值不同
			whereTypeSetObj:{
				'classid':function(obj,key){
					var _obj = uinv.FCM.configMgr;
					var _this = _obj.model.selector;
					_this.obj['lib'][key]['formDataRemember']['classid'] = $(obj).parents('.row').find('select[name=classid]').val();
				},
				'name':function(obj,key){
					var _obj = uinv.FCM.configMgr;
					var _this = _obj.model.selector;
					_this.obj['lib'][key]['formDataRemember']['name'] = $(obj).parents('.row').find('input[name=name]').val();
				},
				'attribute':function(obj,key){
					var _obj = uinv.FCM.configMgr;
					var _this = _obj.model.selector;
					_this.obj['lib'][key]['formDataRemember']['attribute'] = [{
						'key' : $(obj).parents('.row').find('input[name=key]').val(),
						'value' : $(obj).parents('.row').find('input[name=value]').val()
					}];
				},
				'fun':function(obj,key){
					var _obj = uinv.FCM.configMgr;
					var _this = _obj.model.selector;
					_this.obj['lib'][key]['formDataRemember']['fun'] = $(obj).parents('.row').find('textarea[name=fun]').val();
				}
			},
			// 条件页面的提交
			addNodeWhereFormSubmit:function(key){
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
			},
			// 判断对象是否存在条件
			objIsExistWhere:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				if( typeof _this.obj['lib'][key]['where'] == 'undefined' ){
					return false;
				}
				
				return true;
			},
			// 表单初始化
			addNodeWhereFormInit:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				if( _this.objIsExistWhere(key) ){
					_obj.model.dialog.getObj().find('input[type=radio][name=wheretype][value='+_this.obj['lib'][key]['where']+']').attr('checked',true);
				}
			},
			// 对象初始化
			formDataRememberInit:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;			
				_this.obj['lib'][key]['formDataRemember'] = {
					'classid':0,
					'name' : '',
					'attribute' : [{ 'key' : '', 'value' : '' }],
					'fun' : ''
				};				
			},
			// 删除条件
			delNodeWhere:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
	
				if(key || key in _this.obj['lib']){
					delete _this.obj['lib'][key]['where'];
					_this.keyFindNodeHtmlObj(key).removeClass('where');
				}
			},
			// 编辑条件
			editNodeWhere:function(key){
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
							html += 'Classid ';
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
							html += '物体名称';
						html += '</span>';
						html += '<input type="text" name="name" value="'+_this.obj['lib'][key]['formDataRemember']['name']+'" />';
					html += '</div>';
					
					html += '<div class="row">';
						html += '<span>';
							html += '<input type="radio" name="wheretype" value="attribute" /> ';
							html += '属性定义';
						html += '</span>';
						html += ' 属性名 <input type="text" name="key" value="'+_this.obj['lib'][key]['formDataRemember']['attribute'][0]['key']+'" /> ';
						html += ' 属性值 <input type="text" name="value" value="'+_this.obj['lib'][key]['formDataRemember']['attribute'][0]['value']+'" />';
					html += '</div>';
					
					html += '<div class="row">';
						html += '<span>';
							html += '<input type="radio" name="wheretype" value="fun" /> ';
							html += '函数 ';
						html += '</span>';
						html += '<textarea name="fun">'+_this.obj['lib'][key]['formDataRemember']['fun']+'</textarea>';
					html += '</div>';
					
					html += '<div class="btn">';
						html += '<button onclick="uinv.FCM.configMgr.model.selector.cancelAddNodeWhere();">取消</button>';
						html += '<button onclick="uinv.FCM.configMgr.model.selector.addNodeWhereFormSubmit(\''+key+'\');">确定</button>';
					html += '</div>';
				html += '</div>';
				
				_obj.model.dialog.show(html);
				_this.addNodeWhereFormInit(key);
				
			},
			// 右键
			contextMenu:function(evt,obj){
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
			},
			// 展开
			treeNodeShow:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.keyFindNodeHtmlObj(key).find('>.childrenNode').show();
			},
			// 收起
			treeNodeHide:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.keyFindNodeHtmlObj(key).find('>.childrenNode').hide();
			},
			// 动作路由
			contextMenuRouting:function(fun, key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.contextMenuHide();
				
				eval( '_this.' + fun + '(\''+key+'\');' );
			},
			// 获取右键内容
			getContextMenuHtml:function(e, key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var pos = {
					x : e.pageX - _obj.form.box.offset().left,
					y : e.pageY - _obj.form.box.offset().top
				};
				
				var html = '';
				html += '<div class="config-contextmenu" style="background:#E6E6FA;width:100px;position:absolute;z-index:9999;left:'+pos.x+'px;top:'+pos.y+'px;">';
					if( key && key in _this.obj['lib'] ){
						if(_this.keyFindNodeHtmlObj(key).find('>.childrenNode>.treeNode').length>=1){
							if( _this.keyFindNodeHtmlObj(key).find('>.childrenNode').is(':visible') ){
								html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'treeNodeHide\',\''+key+'\');">收起</li>';
							}else{
								html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'treeNodeShow\',\''+key+'\');">展开</li>';
							}
						}
						
						html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'createNode\',\''+key+'\');">创建节点</li>';
						html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'deleteNode\',\''+key+'\');">删除节点</li>';
						html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'nodeRename\',\''+key+'\');">重新命名</li>';
						if( _this.objIsExistWhere(key) ){
							html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'editNodeWhere\',\''+key+'\');">修改条件</li>';
							html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'delNodeWhere\',\''+key+'\');">删除条件</li>';					
						}else{
							html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'editNodeWhere\',\''+key+'\');">添加条件</li>';
						}

					}else{
						html += '<li style="list-style:none;" onclick="uinv.FCM.configMgr.model.selector.contextMenuRouting(\'createNode\',\''+key+'\');">创建节点</li>';
					}
				html += '</div>';
				return html;
			},
			// 右键内容显示
			contextMenuShow:function(e, key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.contextMenuHide();
				var html = _this.getContextMenuHtml(e, key);
				_obj.form.box.append(html);			
			},
			// 右键隐藏
			contextMenuHide:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.form.box.find('.config-contextmenu').remove();
			},
			// 选中
			selectNode:function(key,evt){
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
			},
			// 取消选中
			cancelSelectNode:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.selectKey = '';
				_obj.form.box.find(_this.classStr).find('.ok').removeClass('ok');
			},
			// 初始化
			init:function(classStr){
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
			}
		},
		/**
		 * stringdb操作模块
		 * @type 
		 */
		stringDB : {
			/**
			 * 读取stringdb的函数
			 * @return {}
			 */
			readString:function(){
				return uinv.server.manager.frame.getString();
			},
			/**
			 * 写入到服务器的操作函数
			 * @param {} str 字符串
			 * @param {} fun 回调函数
			 */
			writeString:function(str, fun){
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
			},
			/**
			 * 获取stringdb指定对象
			 * @param {} index 获取对象的索引
			 * @return {} 返回指定对象
			 */
			get:function(index){
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
			},
			/**
			 * 把对象写入stringdb的函数
			 * @param {} index 要写入的索引
			 * @param {} obj   要写入的对象
			 * @param {} fun   回调函数
			 */
			set:function( index , obj, fun ){
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
			}
		},
		/**
		 * 对象与字符串 互相转换模块
		 * @type 
		 */
		transform:{
			/**
			 * 对象转换到str
			 * @param {} o
			 * @return {}
			 */
			obj2str:function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;

				if(typeof o == 'undefined'){
					return "";
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
			},
			/**
			 * 字符串转换obj
			 * @param {} s 字符串
			 * @return {}
			 */
			str2obj:function(s){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				if(typeof s == "string"){
					s = s.replaceAll("\r\n",'');
					s = s.replaceAll("\n",'');
					s = s.replaceAll("\t",'');
					try{
						return eval("(function(){ return  " + s + " })();");
					}catch(e){
						_obj.note.alert('str2obj:'+e);
						return false;
					}
					
				}else{
					_obj.note.alert('str2obj:参数必须是字符串！');
					return false;
				}
			}
		},
		/**
		 * 随机字符模块
		 * @type 
		 */
		key:{
			// 随机字符范围列表
			str:[
				'a','b','c','d','e','f','g','h','i','j','k','l','m',
				'o','p','q','r','s','t','x','u','v','y','z','w','n',
				'0','1','2','3','4','5','6','7','8','9'
			],
			/**
			 * 随机产生在n（包含n）和m（包含m）之间的一个整数
			 * @param {} n 最小
			 * @param {} m 最大
			 * @return {}
			 */
			randint:function(n,m){
			    var c = m-n+1;  
			    return Math.floor(Math.random() * c + n);
			},
			/**
			 * 随机从字符范围内取出一个字符并返回
			 * @return {}
			 */
			randStr:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var leng = _this.str.length - 1;
				var randkey = _this.randint(0, leng);
				return _this.str[randkey];
			},
			/**
			 * 随机生成key函数
			 * @param {} len 随机数长度，默认10个长度
			 * @return {} key 
			 */
			create:function(len){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var l = len || 10;
				var str = '';
				
				for(var i = 0 ; i<l ; i++){
					str += _this.randStr();
				}
	
				return str;
			}
		},
		/**
		 * 图层模块
		 * @type 
		 */
		layer : {
			// 全局图层管理类名
			globalLayerManagementBoxClass:'layer-global',
			// 数据索引
			index : 'layer',
			// 上传图层的对象
			uploadLayerSelector : '',
			// 对象合集
			obj:null,
			// 上移按钮类名称定义
			upMoveBtnClass:'upmove',
			// 操作类的名称定义
			classStr : '',
			/**
			 * 根据key查找到Obj
			 * 可以获取obj的内容
			 * @param {} key
			 * @return {}
			 */
			keyFindObj:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				for(var i = 0,k=_obj.data.layer.length; i<k; i++){
					if( key == _obj.data.layer[i]['key']){
						return _obj.data.layer[i];
					}
				}
				return {};
			},
			/**
			 * 根据key删除obj
			 * @param {} key
			 * @return {Boolean}
			 */
			keyDelObj:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i = 0, k = _obj.data.layer.length; i<k; i++){
					if( key == _obj.data.layer[i]['key'] ){
						_obj.data.layer.splice(i,1);
						return true;
					}
				}
				
				return false;
			},
			/**
			 * 创建对象入口函数
			 */
			createObject:function(){
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
			},
			/**
			 * 插入分割线
			 * @param {} key
			 */
			insertDividingLine:function(obj,key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				if(!key){
					_obj.note.dialog('错误：请指定对象！');
					return false;
				}
				
				var html = _this.mkHtmlList({'key':key},{'name':'分割线'});
				var box = $(obj).parents('.list').find('ul');
				box.append(html);
				var dom = box.find('li:last').find('*[name][cate][value]').get(0);
				dom.checked = true;
				_this.checkd(dom);
				dom.disabled = true;
			},
			/**
			 * 删除物体
			 * 存在key 表示只删除单个
			 * 不存在key 表示全部对象都删除
			 * @param {} obj
			 */
			deleteObj:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.keyDelObj(key);
				
				// 删除节点
				_obj.form.box.find('.obj-' + key).remove();
			},
			/**
			 * 删除对象图层
			 * @param {} obj
			 * @param {} layer
			 * @return {}
			 */
			deleteObjLayer:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var layerKey  = $(obj).parents('li').find('*[cate][name][value]').attr('value');
				
				if(layerKey == '分割线'){
					
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
			},
			/**
			 * 根据对象，删除图层key
			 * @param {} objkey
			 * @param {} layerkey
			 */
			keyDeleteObjLayer:function(obj, layerKey){
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
			},
			/**
			 * 根据对象key，图层项库key，删除li
			 * @param {} objkey
			 * @param {} layerkey
			 */
			keyDeleteObjLayerLi:function(objkey,layerkey){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_obj.form.box.find( _this.classStr ).find('.obj-' + objkey).find('li').each(function(){
					if( $(this).find('*[cate][name][value]').attr('value') == layerkey ){
						$(this).remove();
					}
				});
			},
			// 修改名称
			modifyObjectName:function(key,obj){
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
			},
			/**
			 * 画出对象的HTML
			 * @param {} obj
			 * @return {} HTML
			 */
			mkhtml:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;

				var html = '';
				html += '<div class="list obj-'+obj['key']+'">';
					html += '<div class="header" style="position:relative;">';
						html += '<h3><span onclick="uinv.FCM.configMgr.model.layer.modifyObjectName(\''+obj['key']+'\',this);">'+obj['name']+'</span></h3>';
						html += '<span class="action" style="position:absolute;right:10px;top:10px;">';
							html += '<a onclick="uinv.FCM.configMgr.model.layer.deleteObj(\''+obj['key']+'\');" href="javascript:void(0);">删除</a>';
							html += ' | ';
							html += '<a onclick="uinv.FCM.configMgr.model.layer.insertDividingLine(this,\''+obj['key']+'\');" href="javascript:void(0);">分割线</a>';
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
			},
			/**
			 * 创建单个li HTML
			 * @param {} obj
			 * @param {} layer
			 * @return {}
			 */
			mkHtmlList:function(obj, layer){
				var _obj = uinv.FCM.configMgr;
				var _this = this;		
				
				var key = typeof layer['__key'] == 'string' ? layer['__key'] : layer['name'];
				var delbtnValue = layer['name'] == '分割线' ? '撤销' : '删除';
				
				var html = '';
				html += '<li style="position:relative;">';
					html +=  layer['name'];
					html += '<span style="position:absolute;right:0;top:0;" class="action">';
						html += '<a onclick="uinv.FCM.configMgr.model.layer.upMove(this);" class="'+_this.upMoveBtnClass+'" href="javascript:void(0);" style="display:none;">上移</a>';
						html += ' | ';
						if( typeof layer['itemConfig'] == 'object' ){
							html += '<a onclick="uinv.FCM.configMgr.model.layer.itemConfig(\''+key+'\',\''+obj.key+'\');" href="javascript:void(0);">编辑</a>';
							html += ' | ';				
						}
						html += '<a onclick="uinv.FCM.configMgr.model.layer.deleteObjLayer(this);" href="javascript:void(0);">'+delbtnValue+'</a>';
						html += ' | ';
						html += '<input onclick="uinv.FCM.configMgr.model.layer.checkd(this);"';
						html += ' name="'+ obj['key'] +'" value="'+ key +'"';
						html += ' cate="layer" path="layer" type="checkbox" />';
					html += '</span>';
				html += '</li>';
				
				return html;
			},
			/**
			 * 编辑配置界面弹开
			 */
			itemConfig:function(key, objectKey){
				var _obj = uinv.FCM.configMgr;
				var _this = this;	
				
				if(typeof _this.obj[key]['itemConfig'] == 'undefined'){
					_this.note.alert('此项不可编辑，数据错误！');
				}

				_layer = _this.keyFindObj(objectKey);
				_layer['itemData'] = typeof _layer['itemData'] == 'undefined' ? {} : _layer['itemData'];
				_layer['itemData'][key] = typeof _layer['itemData'][key] == 'undefined' ? {} : _layer['itemData'][key];

				var html = '';
				html += '<div class="itemConfig" style="padding:10px; width:500px;">';
				for(var i = 0 , k = _this.obj[key]['itemConfig'].length; i<k; i++){
					if( typeof _this.itemConfigTypeToHtml[_this.obj[key]['itemConfig'][i]['type']] == 'function' ){
						html += _this.itemConfigTypeToHtml[_this.obj[key]['itemConfig'][i]['type']](_this.obj[key]['itemConfig'][i],key, objectKey);
					}
				}
				
				html += '<p style="text-align:center;margin:10px auto;">';
					html += '<button onclick="uinv.FCM.configMgr.model.dialog.close();">取消</button>';
					html += '<button onclick="uinv.FCM.configMgr.model.layer.itemConfigSubmit();">确定</button>';
				html += '</p>';
				
				html += '</div>';
				
				_obj.model.dialog.show(html);
				_this.itemConfigFormInit(objectKey);
			},
			/**
			 * 根据类型不同，给出不同的表单
			 * @param {} obj
			 */
			itemConfigTypeToHtml:{
				// 字符串类型
				'string':function(obj,key,objectKey){
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
				},
				// 数字类型
				'number':function(obj,key,objectKey){
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
				},
				// 布尔类型
				'bool':function(obj,key,objectKey){
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
				},
				// 颜色
				'color':function(obj,key,objectKey){
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
				},
				// 3dposition
				'3dposition':function(obj,key,objectKey){
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
					 		html += '<li style="list-style:none;">'+obj['items'][0]+'<input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="3dposition" path="'+key+'"  /></li>';
					 		html += '<li style="list-style:none;">'+obj['items'][1]+'<input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="3dposition" path="'+key+'"  /></li>';
					 		html += '<li style="list-style:none;">'+obj['items'][2]+'<input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="3dposition" path="'+key+'"  /></li>';
				 		html += '</ul>';
				 	
				 	html += '</div>';
				 	return html;					
				},
				// 2dposition
				'2dposition':function(obj,key,objectKey){
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
					 		html += '<li style="list-style:none;">'+obj['items'][0]+'<input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="2dposition" path="'+key+'"  /></li>';
					 		html += '<li style="list-style:none;">'+obj['items'][1]+'<input style="width:50px;" type="text" objectkey="'+objectKey+'" name="'+obj['name']+'" cate="2dposition" path="'+key+'"  /></li>';
				 		html += '</ul>';
				 	
				 	html += '</div>';
				 	return html;					
				},
				// 下拉
				'select':function(obj,key,objectKey){
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
					 	html += '<select objectkey="'+objectKey+'" name="'+obj['name']+'" cate="select" path="'+key+'">';
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
				}
			},
			/**
			 * 根据类型不同，初始化不同的控件
			 * @type 
			 */
			itemConfigInitData:{
				// 字符串
				'string':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if(typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'string'){
						$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')]  );
					}
				},
				// 数字
				'number':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if(typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'number'){
						$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] );
					}
				},
				// 布尔值
				'bool':function(obj){
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
				},
				// 颜色
				'color':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if(  typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')]  == 'string' ){
						$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] );
					}
					_obj.model.colorpicke.show(obj);
				},
				// 3dposition
				'3dposition':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if(typeof  _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')]  == 'object'){
						var index = $(obj).parents('li').index();
						$(obj).val(  _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')][index] );
					}				
				},
				// 2dposition
				'2dposition':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if(typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'object'){
						var index = $(obj).parents('li').index();
						$(obj).val( _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')][index] );
					}				
				},
				// select
				'select':function(obj){
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
				}
			},
			/**
			 * 根据类型不同，存储数据
			 * @type 
			 */
			itemConfigSetData:{
				// 字符串
				'string':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
				},
				// 数字
				'number':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = Number($(obj).val());
				},
				// 布尔值
				'bool':function(obj){
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
				},
				// 颜色
				'color':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
				},
				// 3dposition
				'3dposition':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if( typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'undefined' || _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].length == 3  ){
						_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = [];
					}
					
					_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].push( $(obj).val() );
				},
				// 2dposition
				'2dposition':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					if( typeof _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] == 'undefined' || _layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].length == 2  ){
						_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = [];
					}
					
					_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')].push( $(obj).val() );
				},
				// select
				'select':function(obj){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.layer;
					
					var _layer = _obj.model.layer.keyFindObj($(obj).attr('objectkey'));
					$(obj).find('option').each(function(){
						if(this.selected){
							_layer['itemData'][$(obj).attr('path')][$(obj).attr('name')] = $(this).attr('value');
						}
					});
				}
			},
			/**
			 * 根据不同类型初始化表单
			 * @type 
			 */
			itemConfigFormInit:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
					if( typeof _this.itemConfigInitData[$(this).attr('cate')] == 'function' ){
						_this.itemConfigInitData[$(this).attr('cate')](this);
					}
				});
			},
			/**
			 * 编辑配置提交
			 */
			itemConfigSubmit:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_obj.model.dialog.getObj().find('.itemConfig').find('*[name][cate][path]').each(function(){
					if( typeof _this.itemConfigSetData[$(this).attr('cate')] == 'function' ){
						_this.itemConfigSetData[$(this).attr('cate')](this);
					}
				});
				
				_obj.model.dialog.close();
			},
			/**
			 * 添加HTML到指定的obj下
			 */
			addLayerOneToObj:function( key, html ){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.form.box.find('.obj-' + key).find('ul').append(html);
			},
			/**
			 * 根据value移除指定dom节点
			 * @param {} obj
			 */
			removeObjLayerIsValue:function( key, value ){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.form.box.find('.obj-' + key).find('*[name="'+key+'"][value="'+value+'"]').parents('li').remove();
			},
			/**
			 * 勾选或取消图层后排序
			 * @param {} obj
			 */
			order:function(obj){
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
			},
			/**
			 * 显示上移按钮
			 * @param {} obj 以obj为checkbox定位父标签下的下移标签
			 */
			showUpMoveBtn:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).show();
			},
			/**
			 * 隐藏下移按钮
			 * @param {} obj 以obj为checkbox定位父标签下的下移标签
			 */
			hideUpMoveBtn:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				$(obj).parents('li').find( '.' + _this.upMoveBtnClass ).hide();
			},
			/**
			 * 点击图层勾选框后触发函数
			 * 初始化图层checkbox为true的时候也触发
			 * @param {} obj
			 */
			checkd:function(obj){
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
				
			},
			/**
			 * 重新排序已选数组，主要是为了解决排序问题
			 */ 
			checkedLayerOrder:function(name){
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
			},
			/**
			 * 上移图层
			 * @param {} obj 上移按钮this
			 */
			upMove:function(obj){
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
			},
			/**
			 * 初始页面入口
			 * @param {} classStr
			 */
			init:function(classStr){
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
			},
			/**
			 * 判断对象是否已经存在key，避免重复
			 * @param {} key
			 * @return {Boolean}
			 */
			checkHasKey:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i = 0 ,k = _obj.data.layer.length ; i<k ; i++){
					if( _obj.data.layer[i]['key'] == key ){
						return true;
					}
				}
				
				return false;
			},
			/**
			 * 把对象添加到内存的操作
			 * @param {} obj
			 * @return {}
			 */
			addObject:function( obj ){
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
			},
			/**
			 * 检测两个对象是否相等
			 * @param {} o1
			 * @param {} o2
			 * @return {Boolean}
			 */
			judgeObjectIsEq:function(o1,o2){
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
			},
			/**
			 * 判断对象是否已经存在
			 * @param {} obj
			 * @return {Boolean}
			 */
			checkObjectExist:function( obj ){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				for(var i=0,k=_obj.data.layer.length; i<k; i++){
					if( _this.judgeObjectIsEq(obj, _obj.data.layer[i]['obj'] ) ){
						return true;
					}
				}
				
				return false;
			},
			/**
			 * 添加图层操作
			 * @param {} obj
			 * @param {} fun
			 */
			add:function(obj, fun){
				var _obj = uinv.FCM.configMgr;
				var _this = this;

				// 判断是添加到全局还是对象
				if( typeof _this.uploadLayerSelector == 'undefined'  ){
					_this.addLayerToGlobalLib( obj, _this.addLayerToGlobalLibCallback );
				}else{
					_this.addLayerToObjLib( obj, _this.addLayerToObjLibCallback );
				}

			},
			/**
			 * 添加图层到全局对象 （内存操作）
			 * @param {} obj
			 * @param {} fun
			 */
			addLayerToGlobalLib:function( obj, fun ){
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
			},
			/**
			 * 添加图层到全局对象 回调
			 * @param {} obj
			 */
			addLayerToGlobalLibCallback:function( obj ){
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
			},
			/**
			 * 对象写到服务器后回调函数
			 */
			setDBCallback:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
			},
			/**
			 * 添加图层到指定对象的图层库内
			 * @return {}
			 */
			addLayerToObjLib:function( obj, fun ){
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
			},
			/**
			 * 添加图层到指定对象回调函数
			 * @return {}
			 */
			addLayerToObjLibCallback:function( obj, layer ){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				// 是否添加全部
				var appendAll = true;

				// 添加单个
				var key = typeof layer['__key'] == 'string' ? layer['__key'] : layer['name'];
				var html = _this.mkHtmlList( obj, layer );
				_this.removeObjLayerIsValue( obj['key'], key );
				_this.addLayerOneToObj( obj['key'] , html );
			},
			/**
			 * 获取所有图层列表
			 */
			getLayerList:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				return _obj.model.stringDB.get(_this.index);
			},
			/**
			 * 上传图层
			 * @param {} obj
			 */
			upload:function(obj, selector){
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
			},
			/**
			 * 上传图层回调函数 主要接受回传的图层内容，以做下一步处理
			 * @param {} result
			 */
			uploadCallback:function(result){
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
			},
			/**
			 * 检测上传图层数据的合法性
			 * @param {} obj
			 * @return {}
			 */
			verificationLayerData:function(obj){
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
			},
			/**
			 * 根据传入参数获取全局图层的html
			 */
			globalLayerListHtml:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				html += '<li style="margin:10px; position:relative;" key="'+ obj['name'] +'">';
					html += obj['name'];
					html += '<span class="action" style="position:absolute;right:0; top:0;">';
						html += '<a onclick="uinv.FCM.configMgr.model.layer.deleteGlobalLayer(this, \''+ obj['name']+'\');" href="javascript:void(0);">删除</a>';
					html += '</span>';
				html += '</li>';
				
				return html;
			},
			/**
			 * 全局图层管理入口
			 */
			globalLayerManager:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				html += '<div style="width:500px;" class="'+_this.globalLayerManagementBoxClass+'">';
					html += '<div>';
						html += '上传新图层<input type="file" onchange="uinv.FCM.configMgr.model.layer.upload(this);" /><br />';
						html += '<input type="text" /><button>添加分类</button>';
					html += '</div>';
					
					html += '<br />';
					
					html += '<ul style="width:100%;">';
					for(var i in _this.obj){
						html += _this.globalLayerListHtml( _this.obj[i] );
					}
					html += '</ul>';
					
					html += '<div class="action" style="width:100%;text-align:center;">';
						html += '<button onclick="uinv.FCM.configMgr.model.dialog.close(uinv.FCM.configMgr.model.layer.globalLayerManagerCallBack);">Close</button>';
					html += '</div>';
				html += '</div>';
				
				_obj.model.dialog.show(html);
			},
			/**
			 * 关闭全局图层管理窗口回调函数
			 */
			globalLayerManagerCallBack:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.stringDB.set( _this.index, _this.obj );
			},
			/**
			 * 删除全局图层操作，只操作内存
			 * @param {} obj
			 * @param {} key
			 */
			deleteGlobalLayer:function(obj, key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				if( typeof _this.obj[key] != 'undefined' ){
					delete _this.obj[key];
				}
				
				$(obj).parents('li').remove();
			}
		},
		object:{
			/**
			 * 覆盖对象
			 * @param {} formobj 源
			 * @param {} toobj   目标
			 */
			coverObj:function( formobj, toobj){
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
			},
			/**
			 * 深度克隆对象
			 * @param {} obj
			 * @return {}
			 */
			clone:function(obj) {
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
			    // Handle the 3 simple types, and null or undefined
			    if (null == obj || "object" != typeof obj) return obj;
			
			    // Handle Date
			    if (obj instanceof Date) {
			        var copy = new Date();
			        copy.setTime(obj.getTime());
			        return copy;
			    }
			
			    // Handle Array
			    if (obj instanceof Array) {
			        var copy = [];
			        for (var i = 0, len = obj.length; i < len; ++i) {
			            copy[i] = _this.clone(obj[i]);
			        }
			        return copy;
			    }
			
			    // Handle Object
			    if (obj instanceof Object) {
			        var copy = {};
			        for (var attr in obj) {
			            if (obj.hasOwnProperty(attr)) copy[attr] = _this.clone(obj[attr]);
			        }
			        return copy;
			    }
			
			    _obj.note.alert("不能复制对象");
			},
			isObject:function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				return o instanceof Object;
			}
		},
		/**
		 * 色盘模块
		 * @type 
		 */
		colorpicke : {
			/**
			 * RGB 头 Hex 转换
			 * @param {} aColor
			 * @return {}
			 */
			toHex:function(aColor){
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

			},
			/**
			 * 默认弹开色盘时，左右显示的色块列表
			 * @type 
			 */
			palette: [
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
    		],
    		/**
    		 * HEX色值转换到 [0/225,2/225,3/225] 格式
    		 * @param {} str
    		 * @return {}
    		 */
			toRgb:function(str){
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
						sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)) / 255);	
					}
	
					return sColorChange;
				}else{
					return sColor;	
				}
			},
			/**
			 * 显示色盘操作
			 * @param {} obj
			 */
			show:function(obj){
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
    				chooseText : '确定',
    				cancelText : '取消',
    				palette : _this.palette,
    				change:function(color){
    					$(this).val(color.toHexString());
    				} 
    			}).val( obj.value );
			}
		},
		/**
		 * 弹窗模块
		 * @type 
		 */
		dialog:{
			id:'',
			/**
			 * 显示dialog 函数
			 * str 可以是一串字符 or HTML格式，宽高度自动计算并居中
			 * 你也可以外包一层div赋值width height决定dialog的宽高
			 * @param {} str
			 */
			show:function(str){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_this.id = 'config-dialog-'+ _obj.model.key.create(10);
				
				var html = '';
				html += '<div class="config-dialog-bg config-dialog-bg-'+_this.id+'"></div>';
				html += '<div class="config-dialog config-dialog-'+_this.id+'" style="display:none;">'+str+'</div>';
				
				$('body').css('position','relative').append(html);
				
				var $obj = $('.config-dialog-'+_this.id);
			
				$obj.css({
					'margin-left':'-'+parseInt($obj.outerWidth()/2,10)+'px',
					'margin-top':'-'+parseInt($obj.outerHeight()/2,10)+'px'
				}).show();
			},
			/**
			 * 关闭dialog操作函数
			 * @param {} fun
			 */
			close:function(fun){
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
			},
			/**
			 * 获取dialog对象函数
			 * @return {}
			 */
			getObj:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				return $('.config-dialog-'+_this.id);
			}
		},
		/**
		 * 统计模块
		 * @type 
		 */
		statistics:{
			/**
			 * 条件
			 */
			where:['<','>','='],
			defaultColor:'#FFF',
			/**
			 * 删除单行
			 * @param {} obj
			 */
			delRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;			
				$(obj).parents('tr').remove();
			},
			/**
			 * 添加单行
			 * @param {} obj
			 * @return {}
			 */
			addRow:function(obj){
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
			},
			/**
			 * 创建单条li
			 */
			mkhtmlTr:function(obj){
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
						html += '<button onclick="uinv.FCM.configMgr.model.statistics.delRow(this);">删除</button>';
					html += '</td>';
				html += '</tr>';
				
				return html;
			},
			/**
			 * 画出HTML
			 */
			mkhtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				for(var i in _obj.data.statistics){
					html += '<div class="list">';
						html += '<div class="header">'+i+'</div>';
						html += '<table style="width:100%;text-align:center;" path="statistics" name="'+i+'" cate="statistics">';
							html += '<tr>';
								html += '<th>条件</th>';
								html += '<th>数值</th>';
								html += '<th>颜色</th>';
								html += '<th>删除</th>';
							html += '</tr>';
						html += '</table>';
						html += '<div class="action" style="text-align:right;">';
							html += '<button onclick="uinv.FCM.configMgr.model.statistics.addRow(this);">添加</button>';
						html += '</div>';
					html += '</div>';
				}
				_obj.form.box.find(_this.classStr).html(html);
			},
			/**
			 * 初始化
			 * @param {} classStr 类名
			 */
			init:function(classStr){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.classStr = classStr;
				_this.mkhtml();
			}
		},
		/**
		 * 资源模块
		 * @type 
		 */
		resources : {
			/**
			 * 上传文件夹
			 * @type 
			 */
			upResourcesDir : "/projects/resources",
			/**
			 * 删除列表
			 * @type String
			 */
			delFileArr:[],
			/**
			 * 创建HTML资源管理器的class类
			 * @type String
			 */
			resourcesManagerClass:'resourcesManager',
			/**
			 * 设置某个对象的值
			 * key 键
			 * param 参数
			 * @param {} key
			 * @param {} param
			 */
			setData:function(key, param){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.data.resources[key] = {
					'serverPath' : param['serverPath'],
					'localPath' : param['localPath'],
					'version' : param['version']
				};				
			},
			/**
			 * 上传资源包后回调函数
			 */
			uploadResourcesFileCallback:function(result){
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
			},
			/**
			 * 检测表单项
			 * @param {} param
			 * @return {}
			 */
			checkForm:function(param){
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
			},
			/**
			 * 创建资源最终写入对象处理函数
			 * @param {} result
			 */
			resourcesManagerHandleCallback:function(){
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
			},
			/**
			 * 创建新资源处理函数
			 * @param {} obj
			 * @return {Boolean}
			 */
			handleResourcesManager:function(obj){
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
			},
			/**
			 * 根据路径 返回 foder filename
			 * @param {} path
			 * @return {}
			 */
			pathToFileNameAndFoder:function(path){
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
			},
			/**
			 * 关闭资源管理窗口
			 */
			resourcesManagerClose:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.dialog.close();
			},
			/**
			 * 创建资源弹窗
			 * key 存在表示修改操作
			 * key 为空表示创建操作
			 */
			resourcesManager:function(key){
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
					html += '<p style="margin:10px auto 0;">资源名称 ： <input type="text" original="'+title+'" name="title" value="'+title+'" /></p>';
					html += '<p style="margin:10px auto 0; display:none;">服务器目录 ： <input type="text" original="'+data['serverPath']+'" name="serverPath" value="'+data['serverPath']+'" /></p>';
					html += '<p style="margin:10px auto 0;">本地目录： <input type="text" name="localPath" value="'+data['localPath']+'" /></p>';
					html += '<p style="margin:10px auto 0;">版本： <input type="text" name="version" value="'+data['version']+'" readonly /></p>';
					html += '<p style="margin:10px auto 0;">资源包： <input type="file" name="resourcesFile" /></p>';
					html += '<input type="hidden" name="type" value="'+type+'" />';
					html += '<p style="margin:10px auto 0;text-align:center;" class="action">';
						html += '<button onclick="uinv.FCM.configMgr.model.dialog.close();">取消</button>';
						html += '<button onclick="uinv.FCM.configMgr.model.resources.handleResourcesManager(this);">确定</button>';
					html += '</p>';
				html += '</div>';
				
				_obj.model.dialog.show(html);
			},
			/**
			 * 根据key找到对象，如果key不存在，则返回空对象
			 * @param {} key
			 */
			keyFindObj:function(key){
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
			},
			
			/**
			 * 获取表单数据
			 * @return {}
			 */
			getResourcesManagerFormData:function(){
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
			},
			
			/**
			 * 设置表单数据
			 * @return {}
			 */
			setResourcesManagerFormData:function(key,value){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var box = _obj.model.dialog.getObj().find( '.' + _this.resourcesManagerClass );
				box.find('input[name='+key+']').val(value);
			},
			
			/**
			 * 画出列表
			 */
			mkhtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var html = '';
				for(var i in _obj.data.resources){
					html += '<li style="list-style:none;margin:10px auto;padding:10px; border:1px solid #EEE;">';
						html += '<h3>' + i + '</h3>';
						html += '<p>服务器路径 ：' + _obj.data.resources[i]['serverPath'] + '</p>';
						html += '<p>本地路径 ：' + _obj.data.resources[i]['localPath'] + '</p>';
						html += '<p>版本 ：' + _obj.data.resources[i]['version'] + '</p>';
						html += '<p>';
							html += '<a onclick="uinv.FCM.configMgr.model.resources.delResource(\''+i+'\');" href="javascript:void(0);">删除</a>';
							html += ' | ';
							html += '<a onclick="uinv.FCM.configMgr.model.resources.resourcesManager(\''+i+'\');" href="javascript:void(0);">更新</a>';
						html += '</p>';
					html += '</li>';
				}
				
				_obj.form.box.find(_this.classStr).html( html );
			},
			/**
			 * 页面初始化
			 */
			init:function(classStr){
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
			},
			/**
			 * 删除
			 * @param {} key
			 */
			delResource:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				 
				if( typeof _obj.data.resources[key] != 'undefined'  ){
					_this.delFileArr.push(_obj.data.resources[key]['serverPath']);
					delete _obj.data.resources[key];
				}
			
				_this.mkhtml();
			},
			// 获取所有服务器路径文件
			backupFiles:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var files = [];
				for(var i in _obj.data.resources){
					files.push( _obj.data.resources[i]['serverPath'] );
				}
				
				return files;
			}
		},
		/**
		 * 视点配置
		 * @type 
		 */
		viewpoint:{
			// 类字符
			classStr:'',
			createObject:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.selector.show(function(obj){
					_obj.model.selector.cancelAddNodeWhere();
					var o = _this.addObjectToMemory(obj);
					_this.addHtmlRow(o);
				});
			},
			// key查找对象
			keyFindObj:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
					if( _obj.data.viewpoint[i]['key'] == key ){
						return _obj.data.viewpoint[i];
					}
				}
				
				return false;
			},
			// key查找index
			keyFindIndex:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
					if( _obj.data.viewpoint[i]['key'] == key ){
						return i;
					}
				}				
			},
			// 生成唯一key
			createKey:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				do{
					var key = _obj.model.key.create(32);
				}while( _this.keyFindObj(key) );
				
				return key;
			},
			// 添加数据到内存
			addObjectToMemory:function(obj){
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
			},
			// dom添加单行
			addHtmlRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;	
				_obj.form.box.find(_this.classStr).append( _this.mkhtmlRow(obj) );
			},
			// 动态创建每行html
			mkhtmlRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;			
				var html = '';
				html += '<div class="row" key="'+obj['key']+'">';
					html += '<h3><span onclick="uinv.FCM.configMgr.model.viewpoint.objectRename(this,\''+obj['key']+'\');" class="name">'+obj['name']+'</span></h3>';
					html += '<a onclick="uinv.FCM.configMgr.model.viewpoint.objectDelete(this,\''+obj['key']+'\');" href="javascript:void(0);">删除</a>';
					html += '<div class="form">';
						for(var i in obj['data']){
							html += '<span>'+i+' : <input type="text" key="'+i+'" name="'+obj['key']+'" cate="viewpoint" path="viewpoint" /></span>';
						}
					html += '</div>';
				html += '</div>';
				return html;
			},
			// 画出html
			mkhtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var html = '';
				for(var i=0,k=_obj.data.viewpoint.length; i<k; i++){
					html += _this.mkhtmlRow(_obj.data.viewpoint[i]);	
				}
				_obj.form.box.find(_this.classStr).html(html);
			},
			// 重命名
			objectRename:function(obj,key){
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
			},
			// 删除对象
			objectDelete:function(obj,key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var index = _this.keyFindIndex(key);
				_obj.data.viewpoint.splice(index,1);
				$(obj).parents('*[key='+key+']').remove();
			},
			// 初始化
			init:function(classStr){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.classStr = classStr || '';
				_this.mkhtml();
			}
		},
		/**
		 * 备份模块
		 * @type 
		 */
		backup:{
			// 模块列表
			model : {
				'视角' : { 'model' : 'viewpoint' , 'data' : 'viewpoint'  },
				'图层' : { 'model' : 'layer' , 'data' : 'layer' },
				'面板' : { 'model' : 'panel' , 'data' : 'panel' },
				'资源' : { 'model' : 'resources' , 'data' : 'resources' },
				'统计' : { 'model' : 'statistics', 'data' : 'statistics' },
				'选择' : { 'model' : 'selector', 'data' : 'selector' },
				'系统' : { 'data' : 'sys' },
				'布局' : { 'data' : 'layout' }
			},
			// 备份模块
			backModel : [
//				'视角','图层','资源',
//				'统计','选择','系统','布局'
				'统计'
			],
			// 备份文件夹
			folders : [],
			// 备份文件
			files : [],
			// 备份数据
			text : '',
			// 初始化
			initData:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_this.folders = [];
				_this.files = [];
				_this.text = '';
			},
			// 更新 文件夹 文件数组
			updateFileArr:function(){
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
			},
			// 更新备份文本
			updateText:function(){
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
			},
			// 配置压缩
			configCompression:function(){
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
			},
			// 上传备份
			configUpload:function(obj){
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
				
			},
			// 写入数据
			setData:function(o){
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
			},
			// 更新备份
			updateConfig:function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;			
				
				_obj.data = _obj.model.object.clone(o['config']);
				_obj.form.init();
			}
		},
		/**
		 * 图片模块
		 * @type 
		 */
		images:{
			// 主相册路径
			path:'/Images',
			// 操作项目目录 ， 在弹开相册的时候传入
			dir:'',
			// 相册列表图片的默认高度
			imgHeight:50,
			// 相册列表图片的默认宽度
			imgWidth:100,
			// 相册列表文件名过滤列表
			limit:[
				'.svn'
			],
			/**
			 * 图片上传
			 * @param {} obj file对象
			 * @param {} dir 上传目录
			 */
			imUpload:function(obj, dir){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_this.dir = dir || _this.dir;
				var pathinfo = obj.value.split('\\');
				var filename = encodeURIComponent(pathinfo[pathinfo.length-1]).replaceAll('%','_');
				uinv.server.manager.frame.upImage(obj, _obj.global.path + _this.path + _this.dir , filename, function(result){_this.uploadImagesCallback(result);}); 
			},
			/**
			 * 删除相片函数
			 * @param {} path
			 */
			delImages:function(path){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				uinv.server.manager.frame.delImage(path, function(result){ _this.deleteImagesCallback(result); });	
			},
			/**
			 * 关闭相册操作
			 */
			close:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.dialog.close();
			},
			/**
			 * 上传图片回调函数
			 * @param {} result
			 */
			uploadImagesCallback:function(result){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				if(result.success){
					// 重新构建列表
					_this.updateList();
					_obj.model.dialog.getObj().find('.img .right .views').html('');
				}else{
					_obj.note.alert(result.data);
				}
			},
			/**
			 * 删除图片回调函数
			 * @param {} result
			 */
			deleteImagesCallback:function(result){
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
			},
			/**
			 * 选择图片操作
			 * @param {} obj
			 */
			selectImg:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.dialog.getObj().find('.img .imglist li.ok').each(function(){
					$(this).removeClass('ok');
				});
				
				$('*[name=' + _this.name + ']').attr('src', $(obj).find('img').attr('src') );
				
				$(obj).addClass('ok');
			},
			/**
			 * 获取相册数据
			 * @return {}
			 */
			getData:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var path = _obj.global.path + _this.path + _this.dir;
				var result = uinv.server.manager.frame.getImages(path);
				
				if(result.success){
					return result.data;
				}else{
					return [];
				}
			},
			/**
			 * 相册面板右侧显示大图，传入img对象，即可显示，并自动居中
			 * @param {} obj
			 */
			viewsImg:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var img = '<img src="'+$(obj).attr('src')+'" />';
				_obj.model.dialog.getObj().find('.img .right .views').html(img);
				var $obj = _obj.model.dialog.getObj().find('.img .right .views img');
				$obj.css({
					'margin-left':'-'+parseInt($obj.outerWidth()/2,10)+'px',
					'margin-top':'-'+parseInt($obj.outerHeight()/2,10)+'px'
				});
				
			},
			/**
			 * urldecode
			 * @param {} str
			 * @return {}
			 */
			decode:function(str){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				// 把 _ 替换 % 因为之前为了方便urldecode编码命名
				return decodeURIComponent(str.replaceAll('_','%'));
			},
			/**
			 * 更新图片HTML列表函数
			 */
			updateList:function(){
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
			},
			/**
			 * 鼠标移除左侧图片列表框后操作函数
			 */
			out:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var obj = _obj.form.box.find('*[name='+_this.name+']').get(0);
				_this.viewsImg(obj);
			},
			/**
			 * 相册显示主函数入口
			 * @param {} param
			 */
			show:function(param){
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
							html += '<h3>图片选择器</h3>';
							html += '<div class="action">';
								html += '<span class="uploadbtn">';
									html += '<a href="javascript:void(0);">上传图片';
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
						html += '<button onclick="uinv.FCM.configMgr.model.images.close();">Close</button>';
					html += '</div>';
				html+= '</div>';
				
				_obj.model.dialog.show(html);
				_this.updateList();
			}	
		},
		/**
		 * 监控
		 * @type 
		 */
		monitor:{
			conditionArr : ['<','>','='],
			obj : null,
			
			// string DB index
			index : 'monitor',
			position : {
				'x' : [ {'name' : '左', 'value' : 'LEFT' },{ 'name' : '中' , 'value' : 'CENTER' },{ 'name' : '右', 'value' : 'RIGHT'} ],
				'y' : [ {'name' : '上', 'value' : 'TOP' },{ 'name' : '中', 'value' : 'CENTER' },{ 'name' : '下', 'value' : 'BOTTOM'} ],
				'z' : [ {'name' : '前', 'value' : 'FRONT' },{ 'name' : '中', 'value' : 'CENTER' },{ 'name' : '后', 'value' : 'BACK'} ]
			},
			panelConfigAttributeField : [
				{ 'name' : '指标名称', 'value' : 'attributeName', 'type' : 'string' },
				{ 'name' : '单位', 'value' : 'unit', 'type' : 'string' },
				{ 'name' : '指标取值', 'value' : 'propertyPath', 'type' : 'string'},
				{ 'name' : '最小值', 'value' : 'min', 'type' : 'number'},
				{ 'name' : '最大值', 'value' : 'max', 'type' : 'number'},
				{ 'name' : '进度条', 'value' : 'isProgressBar', 'type' : 'boolen' },
				{ 'name' : '颜色设置', 'value' : 'styleConfig', 'type' : 'styleConfig' }
			],
			objBoxClassStr : '',
			styleBoxClassStr : '',
			alarmlevelBoxClassStr : '',
			// 获取position的select列表
			getSelectOptionHtml:function(position, value){
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
			},
			// open config
			configShow:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var o = _this.keyFindObj(key);
				var panel = _this.nameFindPanel(o.panel);
				
				var imgSrc =  _obj.global.projectPath + _this.getPanelImagePath(panel) ;
				
				var html = '';
				html += '<div class="monitor">';
					html += '<div><span>面板图片</span><img src="'+imgSrc+'" /></div>';
					
					html += '<div class="each"  key="pivotLayout" cate="array">';
						html += '<span>二维位置</span>';
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
						html += '<span>三维位置</span>';
						html += '<span>';
							for(var i=0,tmp=['x','y','z'];i<tmp.length;i++){ 
								html += '<select name="layout">'+_this.getSelectOptionHtml(tmp[i], panel.layout[i])+'</select>';
							}
						html += '</span>';
					html += '</div>';
					
					html += '<div class="each" key="layoutOffset" cate="array">';
						html += '<span>偏移设置</span>';
						html += '<span>';
							html += '<input type="text" name="layoutOffset" value="'+panel.layoutOffset[0]+'" /> m ';
							html += '<input type="text" name="layoutOffset" value="'+panel.layoutOffset[1]+'" /> m ';
							html += '<input type="text" name="layoutOffset" value="'+panel.layoutOffset[2]+'" /> m ';
						html += '</span>';
					html += '</div>';
					
					html += '<div class="each" key="canvasScale" cate="number">';
						html += '<span>面板大小</span>';
						html += '<span>';
							html += '<input type="text" name="canvasScale" value="'+panel.canvasScale+'" />';
						html += '</span>';
					html += '</div>';
					
					html += '<div class="each" key="form" cate="form">';
						html += _this.panelConfigFormHtml(panel);
					html += '</div>';
					
					html += '<div class="action"><button onclick="uinv.FCM.configMgr.model.monitor.configHide(\''+o.panel+'\');">确定</button></div>';
				html += '</div>';
				
				_obj.model.dialog.show(html);
				
				_obj.model.dialog.getObj().find('.color-config').find('input[name=config]').each(function(){
					_obj.model.colorpicke.show(this);
				});
			},
			// hidden config
			configHide:function(name){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				_obj.model.dialog.getObj().find('.each').each(function(){
					if( typeof  _this.configSetData[$(this).attr('cate')] == 'function'){
						_this.configSetData[$(this).attr('cate')](this, _this.nameFindPanel(name));
					}	
				});
				_this.synchronousFormData();
				_obj.model.dialog.close();
			},
			// 同步数据
			synchronousFormData:function(){
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
				
				console.log( _this.obj.panel  );
			},
			// 设置数据
			configSetData:{
				'array':function(obj, panel){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.monitor;
					var key = $(obj).attr('key');
					panel[key] = [];
					$(obj).find('*[name='+key+']').each(function(){
						panel[key].push($(this).val());
					});
				},
				'number':function(obj, panel){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.monitor;
					var key = $(obj).attr('key');
					panel[key] = Number($(obj).find('*[name='+key+']').val());
				},
				'form':function(obj, panel){
					var _obj = uinv.FCM.configMgr;
					var _this = uinv.FCM.configMgr.model.monitor;
					panel.form = [];
					$(obj).find('tr.row').each(function(i){
						panel.form[i] = {};
						$(this).find('*[name][cate]').each(function(){
							_this.configTypeToData[$(this).attr('cate')](this, panel.form[i]);
						});
					});
					
				}
			},
			// 面板配置指标列表
			panelConfigFormHtml:function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				console.log(o.form);
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
			},
			// 根据不同类型给出不同的控件
			configTypeToHtml:{
				'string' : function(o,form){
					if(typeof form == 'undefined'){
						var form = {};
						form[o.value] = '';
					}
					return '<input type="text" name="'+o.value+'" value="'+form[o.value]+'" cate="string" />';
				},
				'number' : function(o,form){
					if(typeof form == 'undefined'){
						var form = {};
						form[o.value] = 0;
					}
					return '<input type="text" name="'+o.value+'" value="'+form[o.value]+'" cate="number" />';
				},
				'boolen' : function(o,form){
					if(typeof form == 'undefined'){
						var form = {};
						form[o.value] = false;
					}
					var html = '';
					
					html += '<select name="'+o.value+'" cate="boolen">';
						if( form[o.value] ){
							html += '<option value="1" selected>是</option>';
							html += '<option value="0">否</option>';
						}else{
							html += '<option value="1">是</option>';
							html += '<option value="0"  selected>否</option>';							
						}
					html += '</select>';
				
					return html;
				},
				'styleConfig' : function(o,form){
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
				}
			},
			configTypeToData:{
				'string' : function(o,data){
					data[$(o).attr('name')] = $(o).val();
				},
				'number' : function(o,data){
					data[$(o).attr('name')] = Number($(o).val());
				},
				'boolen' : function(o,data){
					if( $(o).val() == "1" ){
						data[$(o).attr('name')] = true;
					}else{
						data[$(o).attr('name')] = false;
					}
				},
				'styleConfig' : function(o,data){
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
					
					console.log(data);
				}			
			},
			// 根据类型返回相应类型的值
			configStyleTypeToData:{
				 'number' : function(value){
				 	return Number(value);
				 },
				 'string' : function(value){
				 	return value;
				 },
				 'color' : function(value){
				 	var _obj = uinv.FCM.configMgr;
				 	var _this = _obj.model.monitor;
				 	return _obj.model.colorpicke.toRgb(value);
				 } 
			},
			styleConfigHtmlRow:function(data){
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
						html += '<input type="text" name="config" cate="color" value="'+_obj.model.colorpicke.toHex(data.config)+'" />';
					html += '</td>';
					
					html += '<td>';
						html += '<a onclick="uinv.FCM.configMgr.model.monitor.deleteStyleConfigRow(this);" href="javascript:void(0);">删除</a>';
					html += '</td>';
				html += '</tr>';
				return html;
			},
			// 删除行
			deleteStyleConfigRow:function(o){
				$(o).parents('tr:eq(0)').remove();
			},
			// 添加行
			addStyleConfigHtmlRow:function(o){
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
			},
			// style config 初始
			styleConfigHtml:function(data){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				
				html += '<div class="row" style="display:none;">';
					html += '<table>';
						html += '<tr>';
							html += '<th>条件</th>';
							html += '<th>数值</th>';
							html += '<th>颜色</th>';
							html += '<th>操作</th>';
						html += '</tr>';
					for(var i=0,k=data.length;i<k;i++){
						html += _this.styleConfigHtmlRow(data[i]);
					}
					html += '</table>';
					html += '<div class="action">';
						html += '<button onclick="uinv.FCM.configMgr.model.monitor.addStyleConfigHtmlRow(this);">添加</button>';
					html += '</div>';
				html += '</div>';

				return html;
			},
			// 设置颜色条件面板显示
			settingStyleConfigDisplay:function(obj){
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
			},
			// upload panel
			uploadPanel:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var path = obj.value.split("\\");
				var fileName = path.pop();

				uinv.server.manager.frame.upAndUnZip(obj, fileName, function(result){
					if(result.success){
						var o = _obj.model.transform.str2obj(result.data);
						if( _obj.model.array.isArray(o) ){
							for(var i=0,k=o.length;i<k;i++){
								_this.uploadPanelHandle(o[i]);
							}
						}else{
							_this.uploadPanelHandle(o);
						}
					}else{
						_obj.note.alert(result.data);
					}
					
				});  
			},
			// upload panel handle
			uploadPanelHandle:function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var bool = true;
				if( _this.nameFindPanel(o.name) ){
					bool = _obj.note.confirm('面板'+o.name+'应经存在，是否要覆盖？');
				}
				
				if(bool){
					var o = _this.addPanelToMemory(o);
					uinv.server.manager.frame.cutGeneralFile( o.imagePath , _this.getPanelImagePath(o) );
					_this.objHtml();
					_this.styleHtml();
				}
			},
			// get panel path
			getPanelImagePath:function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				return _obj.global.path + '/Monitor/' + o.name + '/' + o.imagePath;
			},
			// add Panel to Memory
			addPanelToMemory:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				if(typeof obj.form == 'undefined'){
					obj.form = [];
				}
				
				if(_this.nameFindPanel(obj.name)){
					var index = _this.nameFindPanelIndex(obj.name);
					_this.obj.panel.splice(index, 1 , obj);
				}else{
					_this.obj.panel.push(obj);
				}
				return obj;
			},
			// 检测面板是否被使用
			isUsePanel:function(name){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
					if(  _obj.data.monitor.object[i]['panel'] == name ){
						return true;
					}
				}
				return false;	
			},
			// delete object
			deletePanel:function(name){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var bool = _this.isUsePanel(name);
				if( bool ){
					_obj.note.alert('删除面板错误：这个面板正在使用，请先解除使用后再删除。');
					return false;
				}
				
				var index = _this.nameFindPanelIndex(name);
				if( index >= 0 ){
					_this.obj.panel.splice(index, 1);
					_this.objHtml();
					_this.styleHtml();
				}
			},
			// delete object
			deleteObject:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var index = _this.keyFindObjIndex(key);
				_obj.data.monitor.object.splice(index, 1);
				_this.objHtml();
			},
			// create object
			createObject:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_obj.model.selector.show(function(obj){
					_obj.model.selector.hide();
					
					var o = _this.addObjectToMemory(obj);
					_this.addHtmlRow(o);
				});
			},
			// add object to Memory
			addObjectToMemory:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				do{
					var key = _obj.model.key.create(10);
				}while(_this.keyFindObj(key));
				
				obj['key'] = key;
				_obj.data.monitor.object.push(obj);
				return obj;
			},
			// key find object index
			keyFindObjIndex:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
					if(  _obj.data.monitor.object[i]['key'] == key ){
						return i;
					}
				}
				return -1;				
			},
			// key find obj
			keyFindObj:function(key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
					if(  _obj.data.monitor.object[i]['key'] == key ){
						return  _obj.data.monitor.object[i];
					}
				}
				return false;
			},
			// name find panel index
			nameFindPanelIndex:function(name){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_this.obj.panel.length;i<k;i++){
					if(  _this.obj.panel[i]['name'] == name ){
						return i;
					}
				}
				return -1;				
			},
			// name find panel
			nameFindPanel:function(name){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				for(var i=0,k=_this.obj.panel.length;i<k;i++){
					if(  _this.obj.panel[i]['name'] == name ){
						return _this.obj.panel[i];
					}
				}
				return false;				
			},
			// obj select panel handle
			objSelectPanel:function(obj,key){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_this.keyFindObj(key)['panel'] = obj.value;
			},
			// 添加dom
			addHtmlRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var html = _this.objHtmlRow(obj);
				_obj.form.box.find(_this.objBoxClassStr).append(html);
			},
			// 单行ROW
			objHtmlRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				
				html += '<li key="'+obj.key+'" style="list-style:none;maring:10px auto;">';
					html += '<span class="name">';
						html += '<a onclick="uinv.FCM.configMgr.model.monitor.objectRename(this,\''+obj.key+'\');" href="javascript:void(0);">'+obj.name+'</a>';
					html += '</span>';
					html += ' | ';
					html += '<span>';
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
					html += '</span>';
					html += ' | ';
					html += '<span><a onclick="uinv.FCM.configMgr.model.monitor.configShow(\''+obj.key+'\');" href="javascript:void(0);">编辑</a></span>';
					html += ' | ';
					html += '<span><a onclick="uinv.FCM.configMgr.model.monitor.deleteObject(\''+obj.key+'\');" href="javascript:void(0);">删除</a></span>';
				html += '</li>';
				return html;
			},
			// 对象列表HTML
			objHtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				for(var i=0,k=_obj.data.monitor.object.length;i<k;i++){
					html += _this.objHtmlRow( _obj.data.monitor.object[i] );
				}
				
				_obj.form.box.find(_this.objBoxClassStr).html(html);
			},
			// object rename
			objectRename:function(obj,key){
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
			},
			// style ROW html
			styleHtmlRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
			
				var html = '';
				html += '<li key="'+obj.name+'" style="list-style:none;maring:10px auto;">';
					html += '<span class="name">'+obj.caption+'</span>';
					html += ' | ';
					html += '<span>' +obj.des+ '</span>';
					html += ' | ';
					html += '<span><a onclick="uinv.FCM.configMgr.model.monitor.deletePanel(\''+obj.name+'\');" href="javascript:void(0);">删除</a></span>';
				html += '</li>';
				return html;
			},
			// style html
			styleHtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				var html = '';
				for(var i=0,k=_this.obj.panel.length;i<k;i++){
					html += _this.styleHtmlRow( _this.obj.panel[i] );
				}
				
				_obj.form.box.find(_this.styleBoxClassStr).html(html);				
			},
			// alarmlevel html
			alarmLevelHtml:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				if( typeof  _obj.data.monitor.alarm.alarmLevel == 'object' ){
					var html = '';
					for(var i=0,k=_obj.data.monitor.alarm.alarmLevel.length;i<k;i++){
						html += _this.alarmLevelHtmlRow( _obj.data.monitor.alarm.alarmLevel[i] );
					}
				}
				_obj.form.box.find(_this.alarmlevelBoxClassStr).html(html);
			},
			// 创建告警每一行的html
			alarmLevelHtmlRow:function(o){
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
						html += '<a onclick="uinv.FCM.configMgr.model.monitor.deleteAlarmLevelRow(this);" href="javascript:void(0);">删除</a>';
					html += '</span>';
				html += '</li>';
				return html;
			},
			// 删除alarmLevelRow
			deleteAlarmLevelRow:function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				$(obj).parents('.row:eq(0)').remove();
			},
			// addAlarmLevelDom
			addAlarmLevel:function(){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				var o = { 'name' : '', 'color' : '#FFF' };
				var html = _this.alarmLevelHtmlRow(o);
				_obj.form.box.find(_this.alarmlevelBoxClassStr).append(html);
				var dom = _obj.form.box.find(_this.alarmlevelBoxClassStr).find('.row:last').find('input[name=color]').get(0);
				_obj.model.colorpicke.show(dom);
			},
			// 初始化
			init:function(param){
				var _obj = uinv.FCM.configMgr;
				var _this = this;
				
				_obj.form.submitCallback = 	function(){
					_obj.model.stringDB.set( _this.index, _this.obj );
				};
				
				_this.objBoxClassStr = param['objBox'] || '';
				_this.styleBoxClassStr = param['styleBox'] || '';
				_this.alarmlevelBoxClassStr = param['alarmlevelBox'] || '';
				_this.obj = _obj.model.stringDB.get( _this.index );
				_this.obj.panel = typeof _this.obj.panel == 'undefined' ? [] : _this.obj.panel;

				_this.objHtml();
				_this.styleHtml();
				_this.alarmLevelHtml();
			}
		}
	},
	/**
	 * 表单操作对象
	 * @type 
	 */
	form:{
		// 判断name否是首次执行
		nameInit: [],
		// 数据源对象 实际只想 data对象，设置接口是想让它更灵活。可以接入其它同类对象初始化表单
		obj : null,
		// 当前加载网页
		box : null,
		createHtml:function(o){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
			
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
		},
		createTypeHtml:{
			"boolean" : function(o){
				var html = "";
				
				html += '<div class="row">';
					html += '<span class="comments">'+o.caption+'</span>';
					html += '<span class="form">';
						html += '<input path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" value="1" /> 是';
						html += '<input path="'+o.group+'" type="radio" cate="boolean" name="'+o.name+'" value="0" /> 否';
					html += '</span>';
				html += '</div>';
				
				return html;	
			},
			"color" : function(o){
				var html = "";
				
				html += '<div class="row">';
					html += '<span class="comments">'+o.caption+'</span>';
					html += '<span class="form">';
						html += '<input path="'+o.group+'" type="radio" cate="color" name="'+o.name+'" value="'+o.defaultValue+'" />';
					html += '</span>';
				html += '</div>';
				
				return html;
			},
			"image" : function(o){
				var _obj = uinv.FCM.configMgr;
				var _this = this;				
				var html = "";
				html += '<div class="row '+o.dir+'">';
					html += '<span class="comments">'+o.caption+'</span>';
					html += '<span class="form">';
						html += '<img path="'+o.group+'" src="'+_obj.data[o.group][o.name]+'" cate="image" name="'+o.name+'" />';
						html += '<button onclick="uinv.FCM.configMgr.model.images.show({dir:\''+o.dir+'\',name:\''+o.name+'\'});">更换图片</button>';
					html += '</span>';
				html += '</div>';
				
				return html;				
			}
		},
		/**
		 * 加载网页
		 * @param {} param.page 加载页面 param.obj 操作盒型
		 */
		load : function(param){
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
			    }
			);
		},
		/**
		 * 根据不同类型，设置表单各种类型的初始值
		 * @type 
		 */
		type : {
			'radio' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				if( _obj.data[$(obj).attr('path')][$(obj).attr('name')] == $(obj).attr('value') ){
					$(obj).attr('checked', true);
				}
			},
			'boolean' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;			
				
				if( obj.value == "1" && _obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
					$(obj).attr('checked', true);
				}
				
				if( obj.value == "0" && !_obj.data[$(obj).attr('path')][$(obj).attr('name')] ){
					$(obj).attr('checked', true);
				}
			},
			'text' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );
			},
			'image' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				$(obj).attr('src' ,  _obj.data[$(obj).attr('path')][$(obj).attr('name')] );	
			},
			'color' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				$(obj).val( _obj.data[$(obj).attr('path')][$(obj).attr('name')] );	
				_obj.model.colorpicke.show(obj);
			},
			'layer' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				var layerObj = _obj.model.layer.keyFindObj( $(obj).attr('name') );
				
				if( $(obj).attr('value') == '分割线'  ){
					$(obj).attr('disabled', true);
				}
				
				if(typeof layerObj['item'] == 'object'){
					if( _obj.model.array.inArray( $(obj).attr('value') , layerObj['item'] ) ){
						$(obj).attr('checked', true);
						_obj.model.layer.checkd(obj);
					}	
				}
				
				// _obj.model.layer.checkedLayerOrder( $(obj).attr('name') );
			},
			'panel' : function(obj){
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
			},
			'statistics' : function(obj){
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
			},
			'viewpoint' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				$(obj).val( _obj.model.viewpoint.keyFindObj( $(obj).attr('name') )['data'][$(obj).attr('key')] );
			},
			'alarm' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				if( typeof  _obj.data.monitor.alarm[$(obj).attr('name')] != 'undefined'){
					$(obj).val( _obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')] );
				}
			},
			'alarmlevel' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				$(obj).find('*.row').each(function(){
					var dom = $(this).find('input[name=color]').get(0);
					_obj.model.colorpicke.show(dom);
				});
			}
		},
		/**
		 * 获取表单对存到内存中
		 * @type 
		 */
		setValue : {
			'radio' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				if( obj.checked == true ){
					_obj.data[$(obj).attr('path')][$(obj).attr('name')] = _this.box.find('*[name=' + $(obj).attr('name') + ']:checked').attr('value');
				}
			},
			'boolean':function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;

				if( obj.checked == true ){
					if(obj.value == "1"){
						_obj.data[$(obj).attr('path')][$(obj).attr('name')] = true;
					}else{
						_obj.data[$(obj).attr('path')][$(obj).attr('name')] = false;
					}
				}
			},
			'text' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
			},
			'image' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).attr('src');
			},
			'color' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
    			_obj.data[$(obj).attr('path')][$(obj).attr('name')] = $(obj).val();
			},
			'layer' : function(obj){
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
			},
			'panel' : function(obj){
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
			},
			'statistics' : function(obj){
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
			},
			'viewpoint' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				_obj.model.viewpoint.keyFindObj( $(obj).attr('name') )['data'][$(obj).attr('key')] = Number($(obj).val());
			},
			'alarm' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')]  = $(obj).val();
			},
			'alarmlevel' : function(obj){
				var _obj = uinv.FCM.configMgr;
				var _this = uinv.FCM.configMgr.form;
				
				_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')] = [];
				
				$(obj).find('*.row').each(function(){
					var o = {};
					o.name = $(this).find('input[name=name]').val();
					o.color = $(this).find('input[name=color]').val();
					_obj.data[$(obj).attr('path')].alarm[$(obj).attr('name')].push(o);
				});
			}
		},
		/**
		 * 提交表单到服务器存储
		 */
		submit : function(){
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
		},
		/**
		 * 判断这个name是否是第一次遍历
		 */
		isNameFirstEach:function(name){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
			if( _obj.model.array.inArray(name, _this.nameInit) ){
				return false;
			}
			
			return true;
		},
		/**
		 * 初始表单数据
		 */
		init : function(){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
			
			_this.box.find('*[name]').each(function(){
				if( typeof _this.type[$(this).attr('cate')] == 'function' ){
					_this.type[$(this).attr('cate')](this);
				}
			});
		}
	},
	/**
	 * 数据主要存储对象
	 * @type 
	 */
	data:{
		// 系统配置
		system:{},
		// 搜索配置
		layout:{},
		// 图层配置
		layer:[],
		// 面板配置
		panel:[],
		// 统计配置
		statistics:{
			'功耗':[],
			'空间':[]
		},
		// 资源配置
		resources:{},
		// 视点
		viewpoint:[],
		// 监控
		monitor:{
			'object' : [],
			'alarm' : {}
		}
	},
	
	// 杂项
	other : {

		conditionReplaceName : function(o){
			
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
		}
	},
	
	// api接口
	api:{
		
		// 获取监控面板数据
		getMonitor:function(){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
	
			var obj = _obj.model.object.clone( _obj.data.monitor.object );
			
			_obj.model.monitor.obj = _obj.model.stringDB.get(_obj.model.monitor.index);
			
			for(var i=0,k=obj.length;i<k;i++){
				obj[i].condition = _obj.other.conditionReplaceName( obj[i].where );
				obj[i].data = _obj.model.object.clone( _obj.model.monitor.nameFindPanel(obj[i].panel) );
			}
			
			return obj;
		},
		
		// 获取视角数据
		getViewpoint:function(){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
			
			var obj = _obj.model.object.clone( _obj.data.viewpoint );

			for(var i=0,k=obj.length;i<k;i++){
				obj[i].condition = _obj.other.conditionReplaceName( obj[i].where );
			}
			
			return obj;
		},
		
		// 获取统计数据
		getStatistics:function(){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
			
			var obj = _obj.model.object.clone( _obj.data.statistics );
			
			for(var i in obj){
				for(var n=0,m=obj[i].length;n<m;n++){
					obj[i][n].condition = obj[i][n].where;
				}
			}
			
			return obj;
		},
		
		// 获取资源数据
		getResources:function(){
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
		},
		
		// 获取图层数据
		getLayer:function(){
			var _obj = uinv.FCM.configMgr;
			var _this = this;
			
			var obj = _obj.model.object.clone( _obj.data.layer );
			
			_obj.model.layer.obj = _obj.model.stringDB.get(_obj.model.layer.index);
			
			for(var i=0,k=obj.length;i<k;i++){
				obj[i].condition = _obj.other.conditionReplaceName( obj[i].obj );
				
				obj[i].tmp = [];
				for(var n=0,m=obj[i].item.length;n<m;n++){
					obj[i].tmp.push({
						'itemName' : obj[i].item[n],
						'config' : typeof obj[i].itemData[obj[i].item[n]] == 'undefined' ? {} :  _obj.model.object.clone( obj[i].itemData[obj[i].item[n]] )
					});
				}
				
				obj[i].item = obj[i].tmp;
			}
			
			return {
				"objects" : obj,
				"lib" : _obj.model.object.clone( _obj.model.layer.obj )
			};
		},
		
		// 获取面板数据
		getPanel:function(){
			var _obj = uinv.FCM.configMgr;
			var _this = this;		
			
			return {
				"objects" : [],
				"lib" : {}
			};
		}
	},
	init:function(){
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
	}
};

uinv.FCM.configMgr.init();
