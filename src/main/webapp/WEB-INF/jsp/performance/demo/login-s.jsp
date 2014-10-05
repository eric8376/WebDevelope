<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=request.getContextPath()%>/js/semantic/javascript/semantic.min.js"></script>

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css"
	type="text/css" media="screen">
<link rel="stylesheet" type="text/css" class="ui" href="<%=request.getContextPath()%>/js/semantic/css/semantic.min.css">
</head>
<body>
<form action="/login.spr" method="post" id="loginForm">
<div class="ui form segment">
      <div class="field">
        <label>用户名</label>
        <div class="ui left labeled icon input">
          <input type="text" placeholder="Username">
          <i class="user icon"></i>
          <div class="ui corner label">
            <i class="icon asterisk"></i>
          </div>
        </div>
      </div>
      <div class="field">
        <label>密码</label>
        <div class="ui left labeled icon input">
          <input type="password">
          <i class="lock icon"></i>
          <div class="ui corner label">
            <i class="icon asterisk"></i>
          </div>
        </div>
      </div>
      <div class="ui error message">
        <div class="header">We noticed some issues</div>
      </div>
      <input type="submit" class="ui blue submit button" value="登录"/>
    </div>
  </div>
  </form>
  <script type="text/javascript">
  $(document).ready(function() {
  	
  });
  </script>
</body>
</html>