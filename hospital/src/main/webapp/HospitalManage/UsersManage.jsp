<%--
*<pre></pre>
*<br>
*<pre>所属模块：</pre>
*@author 黄琦鸿
*创建于  2015/1/1 18:28.
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="医院管理">
    <eRedG4:import src="/HospitalManage/js/UsersManage.js"/>
    <eRedG4:ext.codeRender fields="SEX,LOCKED,USERTYPE"/>
    <eRedG4:ext.codeStore fields="SEX,LOCKED,USERTYPE:3"/>
    <eRedG4:body>
        <eRedG4:div key="deptTreeDiv"></eRedG4:div>
        <eRedG4:div key="roleTreeDiv"></eRedG4:div>
    </eRedG4:body>
    <eRedG4:script>
        var root_deptid = '<eRedG4:out key="rootDeptid" scope="request"/>';
        var root_deptname = '<eRedG4:out key="rootDeptname" scope="request"/>';
        var login_account = '<eRedG4:out key="login_account" scope="request"/>';
        var Hospitaltname = '<eRedG4:out key="Hospitaltname" scope="request"/>';
    </eRedG4:script>
</eRedG4:html>