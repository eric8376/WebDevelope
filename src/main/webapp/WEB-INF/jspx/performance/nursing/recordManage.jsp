<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<jsp:include page="../include/include.jsp" />
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/nursing/recordManage.js"></script>

<style type="text/css">
 html, body {
                      width: 100%;
                      height: 100%;
                      margin: 0px;
                      overflow: hidden;
              }

</style>
</head>
<body>
<table>
<tr>
    <td>
        科室名称：<div id="ksmc" style="width:200px; height:30px;"></div>
    </td>
    <td>
        执行人：<div id="executor" style="width:200px; height:30px;"></div>
    </td>
    <td>
         开始时间<div id="kssj" style="width:200px; height:30px;"></div>
    </td>
     <td>
        结束时间<div id="jssj" style="width:200px; height:30px;"></div>
    </td>
   
</tr>
</table>
<div id="gridbox" style="position: relative;"></div>


</body>
</html>