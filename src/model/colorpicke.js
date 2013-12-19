
/**
 * @description 颜色范围
 * @type Array
 */
uinv.FCM.configMgr.model.colorpicke.palette =  [
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
];

/**
 * @description RGB转HEX
 * @memberOf uinv.FCM.configMgr.model.colorpicke
 * @param {Array} aColor RGB色值
 * @return {String} HEX 色值
 * @static
 */
uinv.FCM.configMgr.model.colorpicke.toHex = function(aColor){
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

};

/**
 * @description HEX转RGB
 * @memberOf uinv.FCM.configMgr.model.colorpicke
 * @param {String} str HEX色值
 * @return {Array} RGB颜色
 * @static
 */
uinv.FCM.configMgr.model.colorpicke.toRgb = function(str){
	var _obj = uinv.FCM.configMgr,
		_this = this,
		i = 0,
		sColorChange = [],
		sColorNew = "",
		sColor = str.toLowerCase(),
		reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			sColorNew = "#";
			for(i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
		
		//处理六位的颜色值
		sColorChange = [];
		
		for(i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2), 16));	
		}

		return sColorChange;
	}else{
		return sColor;	
	}
};

/**
 * @description 显示色盘操作
 * @memberOf uinv.FCM.configMgr.model.colorpicke
 * @see spectrum插件
 * @param {DOM} obj 显示色盘的DOM节点的依据
 * @static
 */
uinv.FCM.configMgr.model.colorpicke.show = function(obj){
	var _obj = uinv.FCM.configMgr;
	var _this = this;
	
	var bool = true;
	var value = obj.value.length >= 3 ? obj.value : _obj.data[$(obj).attr('path')][$(obj).attr('name')];
	$(obj).spectrum({
		showInput: true,
		color: value ,
		showInitial: bool,
		showAlpha: bool,
		showPalette: bool,
		showSelectionPalette: bool,
		clickoutFiresChange: bool,
		chooseText : u.le.get('确定'),
		cancelText : u.le.get('取消'),
		palette : _this.palette,
		change:function(color){
			$(this).val(color.toHexString());
		} 
	}).val( obj.value );
};