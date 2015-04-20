<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="MyTest">
    <eRedG4:import src="/WorkFlow/js/Business/traceView.js"/>
    <eRedG4:script>
        Ext.onReady(function () {
        var pid = '<%=request.getAttribute("pid")%>';
        }
    </eRedG4:script>
    <eRedG4:body>
    </eRedG4:body>
</eRedG4:html>