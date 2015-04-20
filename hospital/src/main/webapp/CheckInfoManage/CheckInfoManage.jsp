<%--
*<pre></pre>
*<br>
*<pre>所属模块：</pre>
*@author 黄琦鸿
*创建于  2015/1/1 18:28.
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="检查记录管理">
    <eRedG4:ext.codeStore fields="SEX,LOCKED,USERTYPE:3,CS001,CS002,COM001,COM002,COM003,OT001,LitigantRole,CheckNorm"/>
    <eRedG4:ext.codeRender fields="SEX,LOCKED,USERTYPE,CS001,CS002,COM001,COM002,COM003,OT001,LitigantRole,CheckNorm"/>
    <eRedG4:script>
        var root_deptid = '<eRedG4:out key="rootDeptid" scope="request"/>';
        var root_deptname = '<eRedG4:out key="rootDeptname" scope="request"/>';
        var Hospitaltname = '<eRedG4:out key="Hospitaltname" scope="request"/>';
        var ismanager = '<eRedG4:out key="ismanager" scope="request"/>';
        var checker_name = '<eRedG4:out key="checker_name" scope="request"/>';
        var checker = '<eRedG4:out key="checker" scope="request"/>';
    </eRedG4:script>
    <eRedG4:import src="/common/expand/UserSelect.js"/>
    <eRedG4:import src="/common/commonjs/getContainerFields.js"/>
    <eRedG4:import src="/CheckInfoManage/js/CheckInfoManage.js"/>
    <eRedG4:body>
        <eRedG4:div key="deptTreeDiv"></eRedG4:div>
    </eRedG4:body>
</eRedG4:html>