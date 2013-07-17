/**
 * 命名空间
 * @author lizhong
 */

var namespace = {

	/**
	 * @description 命名空间注册
	 * @param {String} s 命名空间
	 * @example namespace.reg("my.desk.note")
	 * @return {Object} 命名的对象
	 */
	reg : function(s){
		var arr = s.split('.');
		var namespace = window;
 
		for(var i=0,k=arr.length;i<k;i++){
			if(typeof namespace[arr[i]] == 'undefined'){
				namespace[arr[i]] = {}; 
		    	}
	 
		    	namespace = namespace[arr[i]];          
		}

		return namespace;
    	},

	/**
	 * @description 命名空间删除
	 * @param {String} s 命名空间
	 * @example namespace.del("my.desk.note")
	 */
	del : function(s){
		var arr = s.split('.');
        	var namespace = window;
 
        	for(var i=0,k=arr.length;i<k;i++){
			if(typeof namespace[arr[i]] == 'undefined'){
				return;
			}else if( k == i+1 ){
				delete  namespace[arr[i]];
				return;
			}else{
				namespace = namespace[arr[i]];      
			}       
        	}           
    	},

	/**
	 * @description 命名空间定义检测
	 * @param {String} s 命名空间
	 * @example namespace.isDefined("my.desk.note")
	 * @return {Boolean} true 已经定义 false 未定义
	 */
	isDefined : function(s){
		var arr = s.split('.');
        	var namespace = window;
 
        	for(var i=0,k=arr.length;i<k;i++){
			if(typeof namespace[arr[i]] == 'undefined'){
				return false;
			}

			namespace = namespace[arr[i]];	       
        	}		    

		return true;
	}
};
