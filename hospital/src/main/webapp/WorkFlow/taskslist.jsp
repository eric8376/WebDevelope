<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="任务列表(动态)">
    <eRedG4:ext.myux uxType="datatimefield"/>
    <eRedG4:ext.myux uxType="monthpicker"/>
    <eRedG4:ext.codeRender fields="SEX,LOCKED,USERTYPE"/>
    <eRedG4:ext.codeStore fields="SEX,LOCKED,USERTYPE:3"/>
    <eRedG4:ext.myux uxType="swfupload"/>
    <eRedG4:import src="/systembase/js/upload_grid.js"/>
    <eRedG4:import src="/common/commonjs/dept_user_choice.js"/>
    <eRedG4:import src="/common/commonjs/getContainerFields.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/StartFlow.js"/>
    <eRedG4:import src="/common/commonjs/CommonFunctions.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksForm.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksShowWindows.js"/>
    <eRedG4:script>
        show_gcxd_window('');
    </eRedG4:script>
    <eRedG4:body>
    </eRedG4:body>
</eRedG4:html>