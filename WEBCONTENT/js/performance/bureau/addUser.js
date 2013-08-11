var myForm, updateFormData,addFormData,operation;
var user;
dhtmlxEvent(window,"load", doOnLoad);
		function doOnLoad() {
			 operation=getParam('operation');
				dhtmlx.skin = "dhx_skyblue";
				window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
				updateFormData = [
							{
							    type: "settings",
							    position: "label-left",
							    labelWidth: 240,
							    inputWidth: 300
							},
			                { type: "fieldset", name: "data", label: "修改用户", inputWidth: "auto", list:[
			                {type:"hidden", name:"userId"},
							{type:"input", name:"userName", label:"用户名:"},
							{type:"input", name:"realName", label:"真实姓名:"},
							{type:"combo", name:"rank", label:"成员属性:",options:getUserType()},
							{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消"}] 
						   }];
		        addFormData = [
				{
				    type: "settings",
				    position: "label-left",
				    labelWidth: 240,
				    inputWidth: 300
				},
                { type: "fieldset", name: "data", label: "新增用户", inputWidth: "auto", list:[
				{type:"input", name:"userName", label:"用户名:"},
				{type:"password", name:"pass", label:"密码:"},
				{type:"password", name:"repass", label:"密码确认:"},
				{type:"input", name:"realName", label:"真实姓名:"},
				{type:"combo", name:"rank", label:"成员属性:",options:getUserType()},
				{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消"}] 
			   }];
				myForm = new dhtmlXForm("form_container", operation=="update"?updateFormData:addFormData);
		        myForm.attachEvent("onButtonClick", function(name) {
					if(name =='save'){
						 
						
						 if(operation=="add"){
 						this.send("manageOperation.spr?action=addUser","post",function(respon){
 							var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
							if(res.result=='success')
							{
								parent.loadPage('manage.spr?action=userManage');
							}
						});
						 }else if(operation=="update"){
							 this.send("manageOperation.spr?action=updateUser","post",function(respon){
		 							var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
									if(res.result=='success')
									{
										parent.loadPage('manage.spr?action=userManage');
									}
								});
						 }
						}else if(name =='cancel'){
							parent.loadPage('manage.spr?action=userManage');
						}});
		        
		        if(operation=="update"){
		        	 var userId=getParam('userId');
		        	
					    var sql="select * from bureau.t_per_user where user_id='"+userId+"'";
					    var list=db.queryForList(sql);
						//alert(Object.toJSON(result));
						myForm.setItemValue("userId",userId);
						myForm.getInput("userName").setValue(list[0].userName);
						myForm.getInput("realName").setValue(list[0].realName);
						//myForm.getCombo("bm").setComboValue(list[0].bm);
						//myForm.getCombo("ks").setComboValue(list[0].ks);
						myForm.getCombo("rank").setComboValue(list[0].jb);
						user=list[0];
						
		        }

		}
		function getUserType(){
			var useTypeList=new Array();
			if(parent.loginedUserInfo.jb=='0'){
				useTypeList.push({value: "0", text: "管理员"});
				useTypeList.push({value: "1", text: "质控中心领导"});
				useTypeList.push({value: "3", text: "医疗机构"});
			}
		
			useTypeList.push({value: "2", text: "质控中心职员"});
			return useTypeList;
			
		}
	