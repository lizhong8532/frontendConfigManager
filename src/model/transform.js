
 
/**
 * @description 对象转字符串
 * @memberOf uinv.FCM.configMgr.model.transform
 * @param {Object} o 对象
 * @return {String}
 * @static
 */
uinv.FCM.configMgr.model.transform.obj2str = function(o){
	
	//return $.toJson(o);
	
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	var i,k;
	
	if(typeof o == 'undefined'){
		return '""';
	}
	
    var r = [];
    if( typeof o == "string" ){
        return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    }
    if( typeof o == "object" ){
        if(!o.sort){
            for( i in o ){
                r.push( "\"" + i + "\"" + ":" + _this.obj2str(o[i]) );
            }
            if( !!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString) ){
                r.push( "toString:" + o.toString.toString() );
            }
            r= "{"+r.join()+"}";
        }else{
			// Fixes #3 k定义局部变量 解决递归调用k混用的问题
            for( i=0, k=o.length; i<k; i++ ){
                r.push( _this.obj2str(o[i]) );
            }
            r= "[" + r.join() + "]";
        } 
        return r;
    } 
    return o.toString();
};

/**
 * @description 字符串转对象
 * @memberOf uinv.FCM.configMgr.model.transform
 * @param {String} s 字符串
 * @return {Object|Boolean} 返回object表示转换成功 返回 false 表示转换失败
 * @static
 */
uinv.FCM.configMgr.model.transform.str2obj = function(s){
	//return $.jsonTo(s);
	
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