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
{ tab:"system", group : "system", level : "top", name:"isConsoleEnabled", caption:"系统调试窗口", type:"bool", defaultValue:false },
{ tab:"system", group : "system", level : "top", name:"isDirectOpenWhenSearchSingleCabinet", caption:"搜索到一个机柜时是否直接打开", type:"bool", defaultValue:false },
{ tab:"system", group : "system", level : "top", name:"isFromSceneRootWhenSearchKey", caption:"总是从园区级别开始搜索", type:"bool", defaultValue:true },
{ tab:"system", group : "system", level : "top", name:"isTouchscreenOpen", caption:"触摸屏开启", type:"bool", defaultValue:false },
{ tab:"system", group : "system", level : "top", name:"test1", caption:"数组设置哦", type:"array", settings:[
	{
		caption : "宽",
		type : 'number'
	},
	{
		caption : "高",
		type : 'number'
	}
], defaultValue:[80,50] },


{ tab:"system", group : "_自定义", level : "top", name:"test6", caption:"信息", type:"array", settings:[
	{
		caption : "宽",
		type : 'number'
	},
	{
		caption : "高",
		type : 'number'
	}
], defaultValue:[90,60] },


/** layout组 **/
{ tab:"layout", group : "layout", level : "top", name:"isHeaderDefaultShow", caption:"工具栏默认显示", type:"bool", defaultValue:false },

// 快捷键
{ tab:"layout", group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPPTShow", caption:"快捷键（PPT演示）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPlayAnimation", caption:"快捷键（播放动画）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsCapacityAnalysis", caption:"快捷键（容量分析）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsAlarmDisplay", caption:"快捷键（告警显示）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsDeviceUpShelf", caption:"快捷键（设备上架）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsBehindInterface", caption:"快捷键（后面界面）", type:"bool", defaultValue:false },

{ tab:"layout", group : "layout", level : "top", name:"isOpenSearch", caption:"是否开启搜索", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", level : "top", name:"isOpenLever", caption:"是否显示控制杆", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", level : "top", name:"isLeftDefaultShow", caption:"菜单栏默认显示", type:"bool", defaultValue:false },

// 菜单栏
{ tab:"layout", group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuAdvancedSearch", caption:"功能点（高级搜索）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuDeviceIndex", caption:"功能点（设备索引）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuSpatialSearch", caption:"功能点（空间搜索）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuTaskManagement", caption:"功能点（任务管理）", type:"bool", defaultValue:false },
{ tab:"layout", group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuPresentationManager", caption:"功能点（演示管理）", type:"bool", defaultValue:false },


{ tab:"layout", group : "layout", level : "top", name:"strScenesBackgroundColor", caption:"场景背景颜色", type:"color", defaultValue:"#FFFFFF" },
{ tab:"layout", group : "layout", level : "top", name:"strLogo", caption:"LOGO", type:"image", defaultValue:"" , dir:"logo" }


];