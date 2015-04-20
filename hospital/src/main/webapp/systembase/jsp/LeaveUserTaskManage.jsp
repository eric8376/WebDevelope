<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="离职用户任务管理">

    <eRedG4:ext.codeRender fields="SEX,LOCKED,USERTYPE"/>
    <eRedG4:ext.codeStore fields="SEX,LOCKED,USERTYPE:3"/>
    <eRedG4:import src="/common/expand/UserSelect.js"/>
    <eRedG4:import src="/common/commonjs/CommonFunctions.js"/>
    <eRedG4:import src="/systembase/js/LeaveUserTaskManage.js"/>
    <eRedG4:body>
    </eRedG4:body>
</eRedG4:html>