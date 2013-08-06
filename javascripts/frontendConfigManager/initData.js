

uinv.FCM.configMgr.form.createFormData = [

/** system组 **/
{ group : "system", level : "top", name:"isConsoleEnabled", caption:"系统调试窗口", type:"boolean", defaultValue:false },
{ group : "system", level : "top", name:"isDirectOpenWhenSearchSingleCabinet", caption:"搜索到一个机柜时是否直接打开", type:"boolean", defaultValue:false },
{ group : "system", level : "top", name:"isFromSceneRootWhenSearchKey", caption:"总是从园区级别开始搜索", type:"boolean", defaultValue:true },
{ group : "system", level : "top", name:"isTouchscreenOpen", caption:"触摸屏开启", type:"boolean", defaultValue:false },
{ group : "system", level : "top", name:"test", caption:"数组设置哦", type:"array", settings:[
	{
		caption : "宽",
		type : 'number'
	},
	{
		caption : "高",
		type : 'number'
	}
], defaultValue:[80,50] },



/** layout组 **/
{ group : "layout", level : "top", name:"isHeaderDefaultShow", caption:"工具栏默认显示", type:"boolean", defaultValue:false },

// 快捷键
{ group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPPTShow", caption:"快捷键（PPT演示）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsPlayAnimation", caption:"快捷键（播放动画）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsCapacityAnalysis", caption:"快捷键（容量分析）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsAlarmDisplay", caption:"快捷键（告警显示）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsDeviceUpShelf", caption:"快捷键（设备上架）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isHeaderDefaultShow", level : "children", name:"isOpenToolsBehindInterface", caption:"快捷键（后面界面）", type:"boolean", defaultValue:false },

{ group : "layout", level : "top", name:"isOpenSearch", caption:"是否开启搜索", type:"boolean", defaultValue:false },
{ group : "layout", level : "top", name:"isOpenLever", caption:"是否显示控制杆", type:"boolean", defaultValue:false },
{ group : "layout", level : "top", name:"isLeftDefaultShow", caption:"菜单栏默认显示", type:"boolean", defaultValue:false },

// 菜单栏
{ group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuAdvancedSearch", caption:"功能点（高级搜索）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuDeviceIndex", caption:"功能点（设备索引）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuSpatialSearch", caption:"功能点（空间搜索）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuTaskManagement", caption:"功能点（任务管理）", type:"boolean", defaultValue:false },
{ group : "layout", parent: "isLeftDefaultShow", level : "children", name:"isOpenMenuPresentationManager", caption:"功能点（演示管理）", type:"boolean", defaultValue:false },


{ group : "layout", level : "top", name:"strScenesBackgroundColor", caption:"场景背景颜色", type:"color", defaultValue:"#FFFFFF" },
{ group : "layout", level : "top", name:"strLogo", caption:"LOGO", type:"image", defaultValue:"" , dir:"logo" }


];