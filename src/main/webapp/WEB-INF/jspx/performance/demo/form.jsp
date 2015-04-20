<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=request.getContextPath()%>/js/easyui/easyloader.js"></script>
</head>
<body>
<form id="ff" method="post">
    <div>
        <label for="name">Name:</label>
        <input class="easyui-validatebox" type="text" name="name" data-options="required:true" />
    </div>
    <div>
        <label for="email">Email:</label>
        <input class="easyui-validatebox" type="text" name="email" data-options="validType:'email'" />
    </div>
    
</form>

<script type="text/javascript">

using('form', function(){
	$('#ff').form({
	    url:"",
	    onSubmit: function(){
	        // do some check
	        // return false to prevent submit;
	    },
	    success:function(data){
	        alert(data)
	    }
	});
	// submit the form
	//$('#ff').submit();
});

</script>
</body>
</html>