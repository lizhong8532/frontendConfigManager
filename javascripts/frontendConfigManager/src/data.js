
/**
 * @description 系统配置
 * @type Object
 */
uinv.FCM.configMgr.data.system = {};
/**
 * @description 数据定义
 */

/**
 * @description 布局配置
 * @type Object
 */
uinv.FCM.configMgr.data.layout = {};

/**
 * @description 图层配置
 * @type Array
 */
uinv.FCM.configMgr.data.layer = [];

/**
 * @description 面板配置
 * @type Array
 */
uinv.FCM.configMgr.data.panel = [];

/**
 * @description 统计配置
 * @type Object
 */
uinv.FCM.configMgr.data.statistics = {
	
	/**
	 * @description 功耗
	 * @type Array
	 */
	'power':[],	

	/**
	 * @description 空间
	 * @type Array
	 */
	'availableU':[],
	
	/**
	 * @description 承重
	 * @type Array
	 */	
	'load':[]
};

/**
 * @description 资源配置
 * @type Object
 */
uinv.FCM.configMgr.data.resources = {};

/**
 * @description 视点
 * @type Array
 */
uinv.FCM.configMgr.data.viewpoint = [];

/**
 * @description 监控
 * @type Object
 */
uinv.FCM.configMgr.data.monitor = {
	
	/**
	 * @description 物体
	 * @type Array
	 */
	'object' : [],
	
	/**
	 * @description 告警
	 * @type Object
	 */
	'alarm' : { 
	 	alarmTime : 0,
	 	alarmIconSize : 1,
	 	monitorTime : 1
	}	
};

/**
 * @description 系统刚下载
 * @type Array
 */
uinv.FCM.configMgr.data.download = [];