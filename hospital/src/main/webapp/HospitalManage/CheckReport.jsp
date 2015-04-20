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
    <eRedG4:ext.codeStore
            fields="SEX,LOCKED,USERTYPE:3,CS001,CS002,COM001,COM002,OT001,RT001,RV001,RGT001,LitigantRole,CheckNorm,CheckType"/>
    <eRedG4:ext.codeRender
            fields="SEX,LOCKED,USERTYPE,CS001,CS002,COM001,COM002,OT001,LitigantRole,CheckNorm,CheckType"/>
    <eRedG4:script>
        var root_deptid = '<eRedG4:out key="rootDeptid" scope="request"/>';
        var root_deptname ="${rootDeptname}";
        var Hospitaltname = '<eRedG4:out key="Hospitaltname" scope="request"/>';
    </eRedG4:script>
    <eRedG4:import src="/common/expand/UserSelect.js"/>
    <eRedG4:import src="/HospitalManage/js/CheckReport.js"/>
    <eRedG4:body>
        <eRedG4:div key="deptTreeDiv"></eRedG4:div>
    </eRedG4:body>
</eRedG4:html>