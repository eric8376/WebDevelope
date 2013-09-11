dhtmlxEvent(window,"load", doOnLoad);
var myForm, formData;
		function doOnLoad() {
			if(top!=this){
				top.location.href="/performance/";
			}
		        formData = [
				{
				    type: "settings",
				    position: "label-left",
				    labelWidth: 200,
				    inputWidth: 240
				},             
                { type: "fieldset", name: "data", inputWidth: "auto", list:[
				{type:"input", name: 'username'},
				{type:"password", name:"password"},
				{type:"input", name:"hospital"},
				{type:"button", name:"login", value:"登陆",className:"submit"}] 
			   }
                        ]
			myForm = new dhtmlXForm("form_container", formData);
		        myForm.attachEvent("onButtonClick", function(name) {
					if(name =='login'){
						
						login();
						
					}
				});
		        myForm.attachEvent("onEnter", login);
		}	
		function login(){
			myForm.send(contextPath+"logon.spr","post",function(respon){
				var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");
				if(res.result=='success')
				{
					window.location.href=contextPath+"/workbench.spr";
				}else{
					alert("登陆失败,该医院不存在当前用户名或密码，请检查账户名和密码.");
				}
			});
		}