<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="测试2" urlSecurity2="false">
    <eRedG4:ext.myux uxType="tipwindow"/>
    <eRedG4:import src="/demo/test/js/test2.js"/>
    <eRedG4:body>
        <APPLET
                CODE="com.yinhai.hissicp3.applet.Catalog.class"
                CODEBASE="<%=request.getContextPath()%>/demo/test"
                ARCHIVE="Hissicp3Applet.jar"
                WIDTH="100%" HEIGHT="100%"></APPLET>
    </eRedG4:body>
    <script type="text/javascript">

    </script>
</eRedG4:html>