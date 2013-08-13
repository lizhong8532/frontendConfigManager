
/**
 * @description 可视化配置基础路径<br />
 * 1) 理论上所有通过可视化配置上传的所有文件都存放在基础路径下<br />
 * 2) 实际上会有单独的模块存放的文件在基础路径之外，比如资源模块上传的资源都存放在这个基础路径之外<br />
 * 3) 备份配置时会把这个路径下的所有文件及子目录一并备份
 * @type String
 */
uinv.FCM.configMgr.global.path = '/frontendConfigManager';

/**
 * @description 项目路径<br />
 * 1) 实际上当脚本初始化后会在init函数内自动获取项目路径重新赋值<br />
 * 2) 比如URL路径http://localhost:8080/uinv_frontend/admin.html则截取uinv_frontend
 * @type String
 */
uinv.FCM.configMgr.global.projectPath = '';

/**
 * @description 分割线1 
 * @style 1px高的虚线
 * @type String
 */
uinv.FCM.configMgr.global.line1 = '<i class="config-line1"></i>';

/**
 * @description 是否加载完
 * @type Boolean
 */
uinv.FCM.configMgr.global.onload = false;

/**
 * @description 模板文件配置路径
 * @type String
 */
uinv.FCM.configMgr.global.viewsPath = './javascripts/frontendConfigManager/views/';

uinv.FCM.configMgr.global.errorPage = './javascripts/frontendConfigManager/views/404.html';