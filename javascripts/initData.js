

uinv.FCM.configMgr.form.createFormData = [

/** system组 **/
{ group : "system", name:"isConsoleEnabled", caption:"系统调试窗口", type:"boolean", defaultValue:false },
{ group : "system", name:"isDirectOpenWhenSearchSingleCabinet", caption:"搜索到一个机柜时是否直接打开", type:"boolean", defaultValue:false },
{ group : "system", name:"isFromSceneRootWhenSearchKey", caption:"总是从园区级别开始搜索", type:"boolean", defaultValue:true },
{ group : "system", name:"isTouchscreenOpen", caption:"触摸屏开启", type:"boolean", defaultValue:false },



/** layout组 **/
{ group : "layout", name:"isHeaderDefaultShow", caption:"工具栏默认显示", type:"boolean", defaultValue:false },

// 快捷键
{ group : "layout", name:"isOpenToolsPPTShow", caption:"快捷键（PPT演示）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenToolsPlayAnimation", caption:"快捷键（播放动画）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenToolsCapacityAnalysis", caption:"快捷键（容量分析）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenToolsAlarmDisplay", caption:"快捷键（告警显示）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenToolsDeviceUpShelf", caption:"快捷键（设备上架）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenToolsBehindInterface", caption:"快捷键（后面界面）", type:"boolean", defaultValue:false },

{ group : "layout", name:"isOpenSearch", caption:"是否开启搜索", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenLever", caption:"是否显示控制杆", type:"boolean", defaultValue:false },
{ group : "layout", name:"isLeftDefaultShow", caption:"菜单栏默认显示", type:"boolean", defaultValue:false },

// 菜单栏
{ group : "layout", name:"isOpenMenuAdvancedSearch", caption:"功能点（高级搜索）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenMenuDeviceIndex", caption:"功能点（设备索引）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenMenuSpatialSearch", caption:"功能点（空间搜索）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenMenuTaskManagement", caption:"功能点（任务管理）", type:"boolean", defaultValue:false },
{ group : "layout", name:"isOpenMenuPresentationManager", caption:"功能点（演示管理）", type:"boolean", defaultValue:false },


{ group : "layout", name:"strScenesBackgroundColor", caption:"场景背景颜色", type:"color", defaultValue:"#FFFFFF" },
{ group : "layout", name:"strLogo", caption:"LOGO", type:"image", defaultValue:"" , dir:"logo" }


];