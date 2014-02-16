$(document).ready(function(){	
	function mylogin(){
		   var data=$("#loginForm").serialize();
	        $.post(contextPath+"/logon.spr", data, function(res){
				//var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");
	        	if(res.result.success==true)
				{
					window.location.href=contextPath+"/workbench.spr";
				}else{
					alert("登陆失败,该医院不存在当前用户名或密码，请检查账户名和密码.");
				}
			});
	}
	

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
		