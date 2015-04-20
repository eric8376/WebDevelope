<!--
* 编程环境 IDEA.
* 编写者: 王少伟
* 主题:【发送内容模板管理】
* 时间: 2013-06-11 下午2:26
-->

<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="发送内容模板管理">
    <!--公共css包-->
    <eRedG4:import src="/systembase/css/commonCss.css"/>
    <!-- 公共集成包 -->
    <eRedG4:import src="/systembase/js/commonJs.js"/>
    <eRedG4:import src="/systembase/js/message_tpl_mgr.js"/>
    <eRedG4:body>
        <eRedG4:script>
            //-----------------------------------显示-----------------------------------------
            new Ext.Viewport({
            layout: 'fit',
            items: [MTM.getGridPanel()]
            });
        </eRedG4:script>
    </eRedG4:body>
</eRedG4:html>