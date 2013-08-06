/**
 * @description 信息提示
 */

//----------------------------------------
// 普通提示区
//----------------------------------------

uinv.FCM.configMgr.msg.S1 = "下载配置";
uinv.FCM.configMgr.msg.S2 = "正在打包...";

uinv.FCM.configMgr.msg.S3 = "错误(S3)：您上传的备份文件有错误，请重新上传正确备份的zip压缩包文件！";
uinv.FCM.configMgr.msg.S4 = "错误(S4)：您上传的备份配置信息数据格式错误，不能执行恢复操作！";
uinv.FCM.configMgr.msg.S5 = "警告(S5)：删除后不可以恢复，确认删除此图片？";
uinv.FCM.configMgr.msg.S6 = "错误(S6)：同样条件的物体已存在，不能重复创建重复条件的物体！";
uinv.FCM.configMgr.msg.S7 = "错误(S7)：请指定要操作的物体！";
uinv.FCM.configMgr.msg.S8 = "警告(S8)：此操作将会把所有物体下同名项一并删除，继续删除吗？";
uinv.FCM.configMgr.msg.S9 = "错误(S9)：此项不可编辑配置！";
uinv.FCM.configMgr.msg.S10 = "错误(S10)：物体不存在！";
uinv.FCM.configMgr.msg.S11 = "错误(S11)：数据格式验证不通过！";
uinv.FCM.configMgr.msg.S12 = "错误(S12)：不能克隆对象！";

uinv.FCM.configMgr.msg.S13 = "错误(S13)：资源名称不能为空！";
uinv.FCM.configMgr.msg.S14 = "错误(S14)：服务器路径不能为空！";
uinv.FCM.configMgr.msg.S15 = "错误(S15)：版本号不能为空！";
uinv.FCM.configMgr.msg.S16 = "错误(S16)：本地路径不能为空 ！";
uinv.FCM.configMgr.msg.S17 = "错误(S17)：资源包不能为空！";

uinv.FCM.configMgr.msg.S18 = "警告(S18)：删除资源包不可恢复，确认删除吗？";
uinv.FCM.configMgr.msg.S19 = "错误(S19)：系统异常！";

uinv.FCM.configMgr.msg.S20 = "错误(S20)：请选择节点！";
uinv.FCM.configMgr.msg.S21 = "错误(S21)：未添加条件的节点不能选择！";
uinv.FCM.configMgr.msg.S22 = "节点字体加粗表示已添加条件";
uinv.FCM.configMgr.msg.S23 = "警告(S23)：此操作将会将节点及它的子节点彻底删除，确认删除吗？";

uinv.FCM.configMgr.msg.S24 = "警告(S24)：此操作将会将会删除此物体及物体的视角配置信息，确认删除吗？";



//---------------------------------------
// 函数提示区
//---------------------------------------

uinv.FCM.configMgr.msg.F1 = function(fileName){
	return "警告(F1)：恢复操作将会把上传的配置信息覆盖当前系统的配置信息不可恢复\r\n确认继续"+fileName+"配置恢复操作？";	
};

uinv.FCM.configMgr.msg.F2 = function(fileName){
	return "警告(F2)：" + fileName + "图片已存在，是否要覆盖旧的图片？";
};

uinv.FCM.configMgr.msg.F3 = function(fileName){
	return "错误(F3)：" + fileName + "资源已存在！";
};

uinv.FCM.configMgr.msg.F4 = function(title){
	return "警告(F4)：" + title + "资源已存在，要覆盖旧的资源项吗？";
};

uinv.FCM.configMgr.msg.F5 = function(fileName){
	return "警告(F5)：同名资源包 "+fileName+" 已存在服务器，要覆盖旧的资源包吗？";
};


