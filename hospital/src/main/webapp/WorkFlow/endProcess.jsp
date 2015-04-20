<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="已结束的流程">
    <eRedG4:ext.myux uxType="swfupload"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksForm.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/traceView.js"/>
    <eRedG4:import src="/systembase/js/upload_grid.js"/>
    <eRedG4:import src="/common/commonjs/getContainerFields.js"/>
    <eRedG4:import src="/common/commonjs/CommonFunctions.js"/>
    <eRedG4:import src="/WorkFlow/js/extend/taskListeners.js"/>
    <eRedG4:import src="/systembase/js/commonJs.js"/>
    <eRedG4:import src="/WorkFlow/js/endProcess.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/StartFlow.js"/>
    <eRedG4:import src="/WorkFlow/js/Business/taskConsumeTime.js"/>
    <eRedG4:import src="/resource/commonjs/FusionCharts.js"/>
    <eRedG4:import src="/WorkFlow/js/tasksForm/tasksGetForm.js"/>
    <eRedG4:body>
        <div id="my2DpChart_div" class="x-hidden" align="center" style="${style}"></div>
    </eRedG4:body>
</eRedG4:html>