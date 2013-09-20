<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>厦门市卫生局医疗机构医疗服务关键环节质量监督管理系统</title>
<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/performance/bureau/login.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen">
<style type="text/css">
body
        {
            padding: 0;
            margin: 0;
            background: #ebebeb;
        }
        #hosp
        {
            float: left;
            margin-right: 10px;
        }
        #user
        {
            float: left;
            margin-right: 10px;
        }
        #pass
        {
            float: left;
            margin-right: 10px;
        }
        #button
        {
            float: left;
            width: 100px;
            height: 28px;
            cursor: pointer;
            margin-top: 26px;
            background: url(../images/performance/bureau/hospitalimg/login1.jpg) 50% 50% no-repeat;
        }
        #button:hover
        {
            float: left;
            width: 100px;
            height: 28px;
            cursor: pointer;
            background: url(../images/performance/bureau/hospitalimg/login2.jpg) 50% 50% no-repeat;
        }
        input
        {
            width: 120px;
            height: 20px;
        }
</style>
<script>
//add by zxt,套用赋值原来的登陆界面
var contextPath='<%=request.getContextPath()%>/bureau';

 
$(document).ready(function(){	
	function mylogin(){
		var users=$('#userInput').val();
		var pss=$('#passwordInput').val();
		var hospital=$('#hospSelect').val();
		var oldname=$("input[name='username']");
		var oldpss=$("input[name='password']");
		var oldhosp=$("input[name='hospital']");
		oldname.val(users);
		oldpss.val(pss);
		oldhosp.val(hospital);
		
	    login();//login.js里面的方法		
	}
	var serviceCall = new ServiceCall();
	var obj = new Object();
	obj.sql = "select hosp_id as 'key',hosp_name as 'value' from bureau.t_per_hosp";
	serviceCall.init("queryDataSvc");
	var rt = serviceCall.execute(obj);
	$.each(rt.list, function (index, value) {
	    $('#hospital').append($('<option>', { 
	        value: rt.list[index].key,
	        text : rt.list[index].value 
	    }));
	});

    $('#button').bind("click",function(){        	
    	mylogin();   	  
    	});
    
    $('#userInput').bind('keyup', function(event){
    	   if (event.keyCode=="13"){
    		   mylogin();   	
    		   }
    });
    
    $('#passwordInput').bind('keyup', function(event){
 	   if (event.keyCode=="13"){
		   mylogin();   	
		   }
     });
    
    
});

</script>
</head>
<body>
<div style="height: 580px; background: #bdd4e2;">
        <div style="background: url(../images/performance/bureau/hospitalimg/bgt.jpg) 50% 50% no-repeat; height: 381px;
            margin: 0 auto;">
        </div>
        <div style="background: url(../images/performance/bureau/hospitalimg/barm1.jpg)  repeat-x; height: 33px;">
        </div>
        <div style="background: url(../images/performance/bureau/hospitalimg/bgb.jpg)  repeat-x; height: 166px;">
            <div style="height: 80px; line-height: 80px; float: right;padding-right:30px;">
                <form action="login.spr" method="post" id="loginForm">
                <div>
                	<div id="hosp">
                  		 质控中心:<select  name="hospital" id="hospital"></select>
               		</div>      
                    <div id="user">
           				用户:<input type="text" name="username" id="userInput"/>
           			</div>
                    <div id="pass">
                        	密码:<input type="password" name="password" id="passwordInput"/>
                     </div>       
                    <div id="button">
                    </div>
                </div>
                      <div id="form_container" style="display:none;position:absolute;left:550px;top:290px;" ></div>
                </form>
            </div>
            <div style="clear: both;">
            </div>
            <div style="background: url(../images/performance/bureau/hospitalimg/bgb2.jpg) 50% 50% no-repeat; height: 50px;
                padding-top: 25px;">
            </div>
        </div>
    </div>
</body>
</html>