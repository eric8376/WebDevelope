<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="${sysTitle}" showLoading="false" exportParams="true"
             isSubPage="false">
    <eRedG4:import src="/arm/js/login.js"/>
    <eRedG4:body>
        <div id="hello-win" class="x-hidden">
            <div id="hello-tabs"><img border="0" width="290" height="42"
                                      src="<%=request.getAttribute("bannerPath") == null ? request.getContextPath()
							+ "/resource/image/400.jpg" : request.getAttribute("bannerPath")%>"/>
            </div>
        </div>
        <div id="aboutDiv" class="x-hidden"
             style='color: black; padding-left: 10px; padding-top: 10px; font-size: 12px'>
            迈微·手卫生检查系统<br>
            <br>
            <br>
            <a href="" target="_blank">运维组邮件：</a><br>
            <a href="" target="_blank">运维：</a>
        </div>
        <div id="infoDiv" class="x-hidden"
             style='color: black; padding-left: 10px; padding-top: 10px; font-size: 12px'>
            欢迎使用迈微·手卫生检查系统


        </div>
    </eRedG4:body>
</eRedG4:html>