<%--
  编程环境 IDEA.
  User: 王少伟
  Date: 13-6-26
  Time: 上午9:32
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>${webTitle}</title>

    <link rel="stylesheet" href="${webContext}/resource/extjs4.2/resources/css/ext-all.css"/>
    <script type="text/javascript" src="${webContext}/resource/extjs4.2/ext-all-debug.js"></script>
    <script type="text/javascript" src="${webContext}/resource/extjs4.2/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="${webContext}/resource/extjs4.2/My97DatePicker/WdatePicker.js"></script>
    <link rel="stylesheet" href="${webContext}/resource/css/ext_icon.css"/>
    <link rel="stylesheet" href="${webContext}/sunShine/css/commonCss.css"/>
    <script type="text/javascript" src="${webContext}/sunShine/js/commonJs.js"></script>
    <script type="text/javascript" src="${webContext}/resource/extjs4.2/ux/DateTimeField4.js"></script>
    <script type="text/javascript">
        var jsClassPath = "${jsClassPath}";
        var webContext = '${webContext}';
        var animateTarget = "animate_target_div";
        var ajaxErrCode = '999';
        Ext.BLANK_IMAGE_URL = webContext + '/resource/image/ext/s.gif';

        /**
         * 跳回到登录页面
         */
        function toLogin(msg) {
            alert(msg);
            parent.window.location.href = webContext + '/login.ered?reqCode=init';
        }

        /**
         * ajax异常处理
         */
        Ext.Ajax.on('requestexception', function (conn, response, options) {

            if (response.status == ajaxErrCode) {
                toLogin("由于长时间未操作,空闲会话已超时;您将被强制重定向到登录页面!");
            } else if (response.status == '998') {
                toLogin("您的会话连接由于在其它窗口上被注销而失效,系统将把您强制重定向到登录界面.");
            } else if (response.status == -1) {
                alert("请求失败,超时或服务器无响应.");
            } else {
                parent.showException(response.responseText);
            }
        });

        /**
         *登录判断当前用户
         */
        window.onload = function () {
            if (parent.userid != '${loginUserId}') {
                toLogin("这是一个非法请求或者您的会话连接由于在其它窗口上被注销而失效,系统将把您强制重定向到登录界面.");
            }
        };

        /**
         *请求时加上当前登录用户
         */
        Ext.Ajax.on('beforerequest', function (conn, opts) {
            Ext.Ajax.extraParams = {loginuserid: parent.userid};
        });
    </script>

</head>
<body>
<div style='left:20;top:0' id='animate_target_div'/>
<!--显示驱动页面-->
<script>
    var loadingTop = (document.body.clientHeight - 60) / 2;
    var notice = '<DIV id="loadingpage" style="width:400px;height:60px;position:absolute;z-index:999999;top:' + loadingTop + '">' +
            '<img style="MARGIN-RIGHT: 5px" src=\"${webContext}/resource/image/ajax.gif\">引擎组件正在驱动页面,请稍等...</DIV>';
    document.write(notice);
</script>

<script type="text/javascript">
    //设定动画目标
    animateTarget = document.getElementById(animateTarget);
    animateTarget.style.left = (document.body.clientWidth - 258) / 2;

    //设置js根路径
    Ext.Loader.setPath({
        sunShine: 'sunShine/jsRoot',
        "Ext.ux": 'resource/extjs4.2/ux'
    });

    //开始执行
    Ext.QuickTips.init();
    Ext.onReady(function () {
        var window_new;
        //创建js类
        try {
            window_new = Ext.create(jsClassPath);
            window_new.show();
            document.getElementById("loadingpage").parentNode.removeChild(document.getElementById("loadingpage"));
        } catch (exception) {
            console.log(exception);
            var haveThisClass = new RegExp("object is not a function");
            if (haveThisClass.exec(exception) != null) {
                Ext.Msg.alert('异常提示', '您所请求的js类不存在，请注意检查!!!<br/>js类全名为:【<span style="color:red;font-size:16px;">' + jsClassPath + '</span>】<br/>' +
                '寻找该类时抛出异常原文:【<span style="color:red;font-size:16px;">' + exception + "</span>】");
            } else {
                Ext.Msg.alert('异常提示', '目标类运行错误<br/>js类全名为:【<span style="color:red;font-size:16px;">' + jsClassPath + '</span>】<br/>' +
                '寻找该类时抛出异常原文:【<span style="color:red;font-size:16px;">' + exception + "</span>】");
            }
        }
    });
</script>
</body>
</html>