<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script language="javascript" src="<%=request.getContextPath()%>/js/framework.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/component/quickGrid.js"></script>

</head>
<body>

<div id="test"></div>
<script type="text/javascript">

var metaData=["aa,bb","100,100"];
var grid=new quickGrid("test","select dict_text,dict_id from t_dict_table",metaData);

</script>
</body>
</html>