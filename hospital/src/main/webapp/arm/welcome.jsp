<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<style type="text/css">
    .x-grid-record-gray table {
        color: #000000;
    }

    .x-grid-record-red table {
        color: #000000;
        background-color: red !important
    }

    .x-grid-record-blue table {
        color: #000000;
        background-color: green !important
    }

    .x-grid-record-green table {
        color: #000000;
        background-color: #C0FF3E !important
    }

    .x-grid-record-orange table {
        color: #000000;
        background-color: #FF7F24 !important
    }
</style>
<eRedG4:html showLoading="true" urlSecurity2="false">
    <eRedG4:ext.myux uxType="tipwindow"/>
    <eRedG4:ext.myux uxType="datatimefield"/>
    <eRedG4:ext.myux uxType="monthpicker"/>
    <eRedG4:ext.codeRender fields="SEX,LOCKED,USERTYPE,CS001,CS002,COM001,COM002,COM003,LitigantRole,CheckNorm"/>
    <eRedG4:ext.codeStore fields="SEX,LOCKED,USERTYPE:3,CS001,CS002,COM001,COM002,COM003,LitigantRole,CheckNorm"/>

    <%--<eRedG4:ext.myux uxType="swfupload"/>--%>
    <eRedG4:import src="/common/commonjs/CommonFunctions.js"/>
    <%--<eRedG4:import src="/systembase/js/upload_grid.js"/>--%>

    <eRedG4:import src="/WorkFlow/js/tasksForm/taskFormMapping.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/StartFlow.js"/>

    <eRedG4:import src="/WorkFlow/js/Business/traceView.js"/>
    <eRedG4:import src="/Extjs4Classes/Com/GridPanel/CommonGridPanel.js"/>
    <eRedG4:import src="/common/commonjs/dept_user_choice.js"/>
    <eRedG4:import src="/common/commonjs/getContainerFields.js"/>

    <%--<eRedG4:import src="/WorkFlow/js/common/MoneyForm.js"/>--%>
    <eRedG4:import src="/WorkFlow/js/extend/taskListeners.js"/>
    <eRedG4:import src="/systembase/js/commonJs.js"/>

    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksForm3.js"/>
    <%--<eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm3.js"/>--%>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksForm.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm.js"/>
    <eRedG4:import src="/arm/js/welcome.js"/>
    <eRedG4:import src="/common/expand/UserSelect.js"/>
    <eRedG4:body cls="noYScrollBar">
    </eRedG4:body>
</eRedG4:html>