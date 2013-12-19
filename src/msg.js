
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
uinv.FCM.configMgr.msg.S16 = "错误(S16)：本地目录不能为空 ！";
uinv.FCM.configMgr.msg.S17 = "错误(S17)：资源包不能为空！";

uinv.FCM.configMgr.msg.S18 = "警告(S18)：删除资源包不可恢复，确认删除吗？";
uinv.FCM.configMgr.msg.S19 = "错误(S19)：系统异常！";

uinv.FCM.configMgr.msg.S20 = "错误(S20)：请选择节点！";
uinv.FCM.configMgr.msg.S21 = "错误(S21)：未添加条件的节点不能选择！";
uinv.FCM.configMgr.msg.S22 = "节点字体加粗表示已添加条件";
uinv.FCM.configMgr.msg.S23 = "警告(S23)：此操作将会将节点及它的子节点彻底删除，确认删除吗？";

uinv.FCM.configMgr.msg.S24 = "警告(S24)：此操作将会将会删除此物体及物体的视角配置信息，确认删除吗？";
uinv.FCM.configMgr.msg.S25 = "错误(S25)：Form数据定义占用系统关键字！";

uinv.FCM.configMgr.msg.S26 = "错误(S26)：副数据转换string异常！";

uinv.FCM.configMgr.msg.S27 = "错误(S27)：删除面板错误：这个面板正在使用，请先解除使用后再删除！";

uinv.FCM.configMgr.msg.S28 = "错误(S28)：上传失败！";

uinv.FCM.configMgr.msg.S29 = "错误(S29)：确认删除？";
uinv.FCM.configMgr.msg.S30 = "错误(S30)：告警级别不能重复！";
uinv.FCM.configMgr.msg.S31 = "错误(S31)：告警级别不能为空！";
uinv.FCM.configMgr.msg.S32 = "错误(S32)：您输入的值有误，请输入数字类型并且小于等于100的数值！";
uinv.FCM.configMgr.msg.S33 = "错误(S33)：不能有重复的节点！";
uinv.FCM.configMgr.msg.S34 = "错误(S34)：图片名称不能包含中文，请把图片名称的中文去除后再上传！";
uinv.FCM.configMgr.msg.S35 = "错误(S35)：没有可用数据下载，请先上传后再尝试下载！";
uinv.FCM.configMgr.msg.S36 = "错误(S36)：您输入的值类型有误，请重新输入！";
uinv.FCM.configMgr.msg.S37 = "错误(S37)：面板数据格式有错误，请重新上传面板！";


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

uinv.FCM.configMgr.msg.F6 = function(panel){
	return "警告(F6): 此操作将会删除原"+panel+"的配置信息，是否要继续操作？";
};

uinv.FCM.configMgr.msg.F7 = function(name){
	return "警告(F7): "+name+"已经存在，是否要覆盖？";
};

uinv.FCM.configMgr.msg.F8 = function(i,j,attr){
	return "错误(F8):" + i +" -> " + j + " -> attribute " + attr + " 字段不存在 !";
};

uinv.FCM.configMgr.msg.F9 = function(i,j,row){
	return "错误(F9):" + i +" -> " + j + " -> row " + row + " 超出modifyCount的值 !";
};

uinv.FCM.configMgr.msg.F10 = function(n){
	return "警告(F10):您上传的新面板modifyCount比原面板modifyCount小，将要删除原面板配置信息的最后"+n+"行配置？";
};

uinv.FCM.configMgr.msg.F11 = function(msg){
	return "错误(F11):对象（"+msg+"）已存在！";
};

uinv.FCM.configMgr.msg.F12 = function(msg){
	return "错误(F12):"+msg+"不能为空！";
};

uinv.FCM.configMgr.msg.F13 = function(name){
	return "错误(F13):节点【"+name+"】有重复！";
};
