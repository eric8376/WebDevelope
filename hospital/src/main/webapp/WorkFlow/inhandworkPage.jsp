<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="待办工作">
    <eRedG4:ext.myux uxType="datatimefield"/>
    <eRedG4:ext.myux uxType="monthpicker"/>
    <eRedG4:ext.codeRender fields="SEX,LOCKED,USERTYPE,CRM001"/>
    <eRedG4:ext.codeStore fields="SEX,LOCKED,USERTYPE:3,COM003,CRM001"/>
    <eRedG4:ext.myux uxType="swfupload"/>
    <eRedG4:import src="/Extjs4Classes/CRM/Panel/CompanyInfoPanel.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/taskFormMapping.js"/>
    <eRedG4:import src="/productionmanage/js/commonjs/design2Cmp.js"/>
    <eRedG4:import src="/productionmanage/js/commonjs/showPartsDetail.js"/>
    <eRedG4:import src="/common/commonjs/CommonFunctions.js"/>
    <eRedG4:import src="/systembase/js/upload_grid.js"/>
    <eRedG4:import src="/productionmanage/js/commonjs/ImportExcelData.js"/>
    <eRedG4:import src="/productionmanage/js/commonjs/PartsInfo.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksShowWindows.js"/>
    <eRedG4:import src="/common/commonjs/dept_user_choice.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksForm.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/traceView.js"/>
    <eRedG4:import src="/common/commonjs/getContainerFields.js"/>
    <eRedG4:import src="/WorkFlow/js/extend/taskListeners.js"/>
    <eRedG4:import src="/systembase/js/commonJs.js"/>
    <eRedG4:import src="/WorkFlow/js/common/MoneyForm.js"/>
    <eRedG4:import src="/WorkFlow/js/common/inhandworkPanel.js"/>
    <eRedG4:import src="/WorkFlow/js/inhandworkPage.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/StartFlow.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/taskConsumeTime.js"/>
    <eRedG4:import src="/resource/commonjs/FusionCharts.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksSetItems3.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksForm3.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm3.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksShowWindows.js"/>
    <eRedG4:body>
    </eRedG4:body>
</eRedG4:html>