<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="调用Tuxedo服务后跳转的页面">
    <eRedG4:body>
        <br>
        <%=request.getAttribute("value") %>
    </eRedG4:body>
</eRedG4:html>