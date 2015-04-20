<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>血糖仪管理系统</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/semantic/css/semantic.min.css">

<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>/BGM';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/angular.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/semantic/javascript/semantic.min.js"></script>

<script type="text/javascript">

		$(function(){
			$('.ui.form').form({
				  username: {
				    identifier : 'username',
				    rules: [
				      {
				        type   : 'empty',
				        prompt : '请输入用户名:'
				      }
				    ]
				  },
				  password: {
				    identifier : 'password',
				    rules: [
				      {
				        type   : 'empty',
				        prompt : '请输入密码:'
				      },
				      {
				        type   : 'length[3]',
				        prompt : '你的密码不能少于3位'
				      }
				    ]
				  }

				},{
				    inline : true,
				    on     : 'blur'
				  });
			
		});
		function loginCtrl($scope,$http) {
			$scope.submit=function(){  
				
				 var data=$("#loginForm").serialize();
				 $scope.form_state="loading";
				 $http.post(contextPath+"/logon.spr", {username:"admin",password:"111"}).success(function(res, status, headers, config){
						//var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");
			        	 if(res.success){
			        	 	$scope.form_state="";
			        	 }
					});
			}
		}
	</script>

</head>
<body ng-app ng-controller="loginCtrl">
<div style="margin:150px auto;width:500px;height:200;" >
<form id="loginForm">
    <div class="ui form segment {{form_state}}">
  <div class="field">
    <label>用户名</label>
    <div class="ui left labeled icon input">
      <input type="text" placeholder="请输入用户名。" name="username">
      <i class="user icon"></i>
      <div class="ui corner label">
        <i class="icon asterisk"></i>
      </div>
    </div>
  </div>
  <div class="field">
    <label>密码</label>
    <div class="ui left labeled icon input">
      <input type="password" placeholder="请输密码。" name="password">
      <i class="lock icon"></i>
      <div class="ui corner label">
        <i class="icon asterisk"></i>
      </div>
    </div>
  </div>
  <div class="ui error message">
    <div class="header">We noticed some issues</div>
  </div>
  <div class="ui blue submit button" ng-click="submit();">登录</div>
</div>
</form>
</div>
    <script>


 function submitForm(){
     //$('#login').form('submit');
     $(".ui.form").addClass('loading');
 }
 function clearForm(){
     $('#login').form('clear');
 }


    </script>
</body>
</html>