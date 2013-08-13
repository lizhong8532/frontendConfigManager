/**
 * @description form表单数据初始定义
 * 1) tab 标签页 目前只有 system  layout 可选
 * 2) group 组定义
 * 	  建议除了system或layout以外的请加下划线 如： _map
 *    不能占用系统保留group关键字 
 *    系统保留关键字 ["download","layer","monitor","panel","resources","statistics","viewpoint"]
 * 3) level 是否缩进 top children 可选
 */

uinv.FCM.configMgr.form.createFormData = [

/** system组 **/

{tab:"system",   group : "_system", level : "top", name:"curProjectName", uinvInterface:"curProjectName",caption:"项目名", type:"string", defaultValue:"" , callback:function(o){
	console.log(o);
	console.log( uinv.FCM.configMgr.api.nameFindDom(o.name) );
} },
{tab:"system",   group : "_system", level : "top", name:"curSceneResName", uinvInterface:"curSceneResName",caption:"场景文件名", type:"string", defaultValue:"uinv_cosmos" },
{tab:"system",   group : "_system", level : "top", name:"consoleEnabled", uinvInterface:"consoleEnabled",caption:"系统调试窗口", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"isShowAlert", uinvInterface:"isShowAlert",caption:"是否弹提示框", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"supportMeshLoadFromBin", uinvInterface:"supportMeshLoadFromBin",caption:"支持BIN格式产品库", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"directOpenWhenSearchSingleCabinet",uinvInterface:"directOpenWhenSearchSingleCabinet", caption:"搜索到一个机柜时是否直接打开", type:"bool", defaultValue:true },

{tab:"system",   type : "title", style:"title2", caption:"哈哈" },

{tab:"system",   group : "_system", level : "top", name:"fromSceneRootWhenSearchKey", uinvInterface:"fromSceneRootWhenSearchKey",caption:"总是从园区级别开始搜索", type:"bool", defaultValue:true },

//添加
{tab:"system",   group : "_system", level : "top", name:"ignoreDBRootEmpty",uinvInterface:"ignoreDBRootEmpty", caption:"是否检查场景", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "bufferLoadPlacements", name:"bufferLoadPlacements", uinvInterface:"bufferLoadPlacements",caption:"缓释加载", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "bufferLoadPlacements", name:"preloadTopFloorInBuilding", uinvInterface:"preloadTopFloorInBuilding",caption:"缓释加载时加载楼层首层", type:"bool", defaultValue:false },
{tab:"system",   group : "_system", level : "bufferLoadPlacements", name:"respondSearchKeyWhenFloor",uinvInterface:"respondSearchKeyWhenFloor", caption:"仅在楼层级别响应搜索结果", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "bufferLoadPlacements", name:"fromSceneRootWhenSearchAvailableU", uinvInterface:"fromSceneRootWhenSearchAvailableU",caption:"从场景根节点搜索可用U", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "bufferLoadPlacements", name:"respondSearchAvailableUWhenFloor", uinvInterface:"respondSearchAvailableUWhenFloor",caption:"仅在楼层级别展示可用U", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"useControlUI",uinvInterface:"useControlUI", caption:"是否显示操作杆", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"showGoBbackToParentButton",uinvInterface:"showGoBbackToParentButton", caption:"显示模仿右键的按钮(用于触摸屏)", type:"bool", defaultValue:false },
{tab:"system",   group : "_system", level : "top", name:"KEYBOARD",uinvInterface:"KEYBOARD", caption:"输入方式-键盘", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"MOUSE",uinvInterface:"MOUSE", caption:"输入方式-鼠标", type:"bool", defaultValue:true },
{tab:"system",   group : "_system", level : "top", name:"GESTURE",uinvInterface:"GESTURE", caption:"输入方式-手势", type:"bool", defaultValue:false },
{tab:"system",   group : "_system", level : "top", name:"inputRelSensitivityScaleConfig", uinvInterface:"inputRelSensitivityScaleConfig", caption:"手势操作灵敏度", type:"array", settings:[
	{
		caption : "X",
		type : 'number'
	},
	{
		caption : "Y",
		type : 'number'
	},
	{
		caption : "Z",
		type : 'number'
	}
], defaultValue:[0.2,0.2,5] },

{tab:"system",   group : "_animationMakerConfig", level : "top", name:"snapshotSize", uinvInterface:"sceneInitCamPosition", caption:"初始化后摄影机位置", type:"array", settings:[
	{
		caption : "1",
		type : 'number'
	},
	{
		caption : "2",
		type : 'number'
	}
], defaultValue:[64.34754180908203,94.77084350585937] },

{tab:"system",   group : "_system", level : "top", name:"sceneInitCamPosition", uinvInterface:"sceneInitCamPosition", caption:"初始化后摄影机位置", type:"array", settings:[
	{
		caption : "X",
		type : 'number'
	},
	{
		caption : "Y",
		type : 'number'
	},
	{
		caption : "Z",
		type : 'number'
	}
], defaultValue:[64.34754180908203,94.77084350585937,-186.82916259765625] },
{tab:"system",   group : "_system", level : "top", name:"sceneInitCamTarget", uinvInterface:"sceneInitCamTarget", caption:"初始化后摄影机视点", type:"array", settings:[
	{
		caption : "X",
		type : 'number'
	},
	{
		caption : "Y",
		type : 'number'
	},
	{
		caption : "Z",
		type : 'number'
	}
], defaultValue:[64.07914733886719,15.607935905456543,-58.678794860839844] },

{tab:"system",   group : "_system", level : "top", name:"monitorManager_intervalTime",uinvInterface:"monitorManager_intervalTime", caption:"监控刷新时间", type:"number", defaultValue:0.2 },
{tab:"system",   group : "_system", level : "top", name:"monitorManager_overtime",uinvInterface:"monitorManager_overtime", caption:"监控超时时间", type:"number", defaultValue:10 },
{tab:"system",   group : "_system", level : "top", name:"monitorManagerInDevice_intervalTime",uinvInterface:"monitorManagerInDevice_intervalTime", caption:"设备内监控刷新时间", type:"number", defaultValue:10 },
{tab:"system",   group : "_system", level : "top", name:"monitorManagerInDevice_overtime",uinvInterface:"monitorManagerInDevice_overtime", caption:"设备内监控超时时间", type:"number", defaultValue:20 },
{tab:"system",   group : "_system", level : "top", name:"alarmManager_intervalTime",uinvInterface:"alarmManager_intervalTime", caption:"报警刷新时间", type:"number", defaultValue:5 },
{tab:"system",   group : "_system", level : "top", name:"alarmManager_overtime",uinvInterface:"alarmManager_overtime", caption:"报警超时时间", type:"number", defaultValue:10 },

{tab:"system",   group : "_system", level : "top", name:"layerIconScale",uinvInterface:"layerIconScale", caption:"图层图标大小", type:"number", defaultValue:1 },
{tab:"system",   group : "_system", level : "top", name:"alarmIconScale",uinvInterface:"alarmIconScale", caption:"报警图标大小", type:"number", defaultValue:1 },
{tab:"system",   group : "_system", level : "top", name:"monitorManager_iconScale",uinvInterface:"monitorManager_iconScale", caption:"监控图标大小", type:"number", defaultValue:1.5 },
{tab:"system",   group : "_system", level : "top", name:"alarmIconSize", uinvInterface:"alarmIconSize", caption:"自定义报警图标宽高", type:"array", settings:[
	{
		caption : "宽",
		type : 'number'
	},
	{
		caption : "高",
		type : 'number'
	}
], defaultValue:[1,1] },

{tab:"system",   group : "_system", level : "top", name:"sceneDefaultOrbitPitchOffset", uinvInterface:"sceneDefaultOrbitPitchOffset",caption:"全局控制场景视角左右", type:"number", defaultValue:-180 },
{tab:"system",   group : "_system", level : "top", name:"sceneDefaultOrbitYawOffset", uinvInterface:"sceneDefaultOrbitYawOffset",caption:"全局控制场景视角上下", type:"number", defaultValue:0 },

/** layout组 **/
// 顶部快捷图标栏
{tab:"layout",   group : "_layout", level : "top", name:"isHeaderDefaultShow",uinvInterface:"isHeaderDefaultShow", caption:"显示顶部快捷图标栏", type:"bool", defaultValue:true },
// 顶部高级搜索
{tab:"layout",   group : "_layout", level : "top", name:"isTopSearch",uinvInterface:"isTopSearch", caption:"显示高级搜索栏", type:"bool", defaultValue:true },
// 顶部快捷图标
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPPTShow",uinvInterface:"isOpenToolsPPTShow", caption:"PPT演示", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPlayAnimation", uinvInterface:"isOpenToolsPlayAnimation",caption:"动画", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsSpatialStatistics",uinvInterface:"isOpenToolsSpatialStatistics", caption:"空间", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPowerWasteStatistics",uinvInterface:"isOpenToolsPowerWasteStatistics", caption:"功耗", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsAlarmDisplay", uinvInterface:"isOpenToolsAlarmDisplay",caption:"告警", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsDeviceUpShelf", uinvInterface:"isOpenToolsDeviceUpShelf",caption:"任务", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsBehindInterface",uinvInterface:"isOpenToolsBehindInterface", caption:"后台设置页面", type:"bool", defaultValue:true },
// 菜单栏
{tab:"layout",   group : "_layout", level : "top", name:"isLeftDefaultShow",uinvInterface:"isLeftDefaultShow", caption:"显示左侧菜单栏", type:"bool", defaultValue:true },
// 菜单栏项目
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuAdvancedSearch", uinvInterface:"isOpenMenuAdvancedSearch",caption:"高级搜索", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuDeviceIndex", uinvInterface:"isOpenMenuDeviceIndex",caption:"设备索引", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuVMIndex", uinvInterface:"isOpenMenuVMIndex",caption:"虚机索引", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuapplicationManagement ", uinvInterface:"isOpenMenuapplicationManagement",caption:"应用管理", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuSpatialSearch", uinvInterface:"isOpenMenuSpatialSearch",caption:"空间搜索", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuStockManagement",uinvInterface:"isOpenMenuStockManagement", caption:"库存管理", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuTaskManagement",uinvInterface:"isOpenMenuTaskManagement", caption:"任务管理", type:"bool", defaultValue:true },
{tab:"layout",   group : "_layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuPresentationManager", uinvInterface:"isOpenMenuPresentationManager",caption:"演示管理", type:"bool", defaultValue:true },

//添加
{tab:"layout",   group : "_layout", level : "top", name:"showVolumeSliceInFloor",uinvInterface:"showVolumeSliceInFloor", caption:"云图是否显示在地板上", type:"bool", defaultValue:false },
{tab:"layout",   group : "_layout", level : "top", name:"setMaxInCabinetMicroEnv",uinvInterface:"setMaxInCabinetMicroEnv", caption:"微环境云图是否取最大值", type:"bool", defaultValue:false },
{tab:"layout",   group : "_layout", level : "top", name:"showInnerInfoInObjectPanel",uinvInterface:"showInnerInfoInObjectPanel", caption:"在信息面板上显示内部节点信息", type:"bool", defaultValue:false },
{tab:"layout",   group : "_layout", level : "top", name:"util_sortObjectByPos_dir",uinvInterface:"util_sortObjectByPos_dir", caption:"统计时从哪个轴向开始刷", type:"3dposition", defaultValue:"x" },
{tab:"layout",   group : "_layout", level : "cabinetFullFreeBy1U", name:"cabinetFullFreeBy1U",uinvInterface:"cabinetFullFreeBy1U", caption:"没有设备的U位显示1U挡板", type:"bool", defaultValue:false },
{tab:"layout",   group : "_layout", level : "top", name:"setLeftupCornerButtonSize",uinvInterface:"setLeftupCornerButtonSize", caption:"左上角图标的大小", type:"number", defaultValue:1 },
{tab:"layout",   group : "_layout", level : "top", name:"cameraUIControllerMoveSpeed",uinvInterface:"cameraUIControllerMoveSpeed", caption:"ui控制摄影机移动的速度", type:"number", defaultValue:100 },
{tab:"layout",   group : "_layout", level : "top", name:"cameraUIControllerRotSpeed",uinvInterface:"cameraUIControllerRotSpeed", caption:"ui控制摄影机旋转的速度", type:"number", defaultValue:30 },
{tab:"layout",   group : "_layout", level : "cabinetFullFreeBy1U", name:"cabinetFullFreeBy1U_resourcePath", uinvInterface:"cabinetFullFreeBy1U_resourcePath",caption:"1U挡板路径", type:"string", defaultValue:"uinv_cosmos_1U_Blank" },

//{ group : "_layout", level : "top", name:"strScenesBackgroundColor",uinvInterface:"", caption:"场景背景颜色", type:"color", defaultValue:"#FFFFFF" },
{tab:"layout",   group : "_layout", level : "top", name:"strLogo",uinvInterface:"isStrLogo", caption:"LOGO", type:"image", defaultValue:"" , dir:"resource/images/logo.png" },

{tab:"system",   group : "_system", level : "top", name:"cameraInitLimitY", uinvInterface:"cameraInitLimitY", caption:"摄影机上下浮动角度范围", type:"array", settings:[
	{
		caption : "下",
		type : 'number'
	},
	{
		caption : "上",
		type : 'number'
	}
], defaultValue:[5,65] },
{tab:"system",   group : "_system", level : "top", name:"cameraInitLimitZ", uinvInterface:"cameraInitLimitZ", caption:"相对物体半径摄影机推拉范围", type:"array", settings:[
	{
		caption : "近",
		type : 'number'
	},
	{
		caption : "远",
		type : 'number'
	}
], defaultValue:[0.1,1] },
{tab:"system",   group : "_system", level : "top", name:"onlyShowLoft_transparency", uinvInterface:"onlyShowLoft_transparency",caption:"突出管路时其它物体透明度", type:"number", defaultValue:0.8 }
];