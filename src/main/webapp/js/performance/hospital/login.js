$(document).ready(function(){	
	
	function mylogin(){
		
		   var data=$("#loginForm").serialize();
		   loadingbar(true);
	        $.post(contextPath+"/logon.spr", data, function(res){
				//var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");
				if(res.result=='success')
				{
					window.location.href=contextPath+"/workbench.spr";
					loadingbar(false);
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
function loadingbar(state){
	if(window._progressCover==null){
	var p1 = document.createElement("DIV");
	p1.className = "dhtmlxLayoutPolyProgressGlobal_dhx_skyblue";
	document.body.appendChild(p1);
	var p2 = document.createElement("DIV");
	p2.className = "dhtmlxLayoutPolyProgressBGIMGGlobal_dhx_skyblue";
	document.body.appendChild(p2);
	window._progressCover=new Array(p1,p2);
	}
	window._progressCover[0].style.display = (state==true?"":"none");
	window._progressCover[1].style.display = this._progressCover[0].style.display;
}
		