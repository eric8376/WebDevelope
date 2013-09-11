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
							{type:"combo", name: 'bm', label:'部门类型:',options:[
								                                   				{value: "bm", text: "职能部门"},
								                                				{value: "ks", text: "临床部门"}
								                                		]},
							{type:"combo", name:"ks", label:"所属科室:"},
							{type:"combo", name:"rank", label:"成员属性:",options:[
							                                   				{value: "0", text: "管理员"},
							                                				{value: "1", text: "普通科员"},
							                                				{value: "2", text: "科室领导"}
							                                		]},
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
				{type:"combo", name: 'bm', label:'部门类型:',options:[
					                                   				{value: "bm", text: "职能部门"},
					                                				{value: "ks", text: "临床部门"}
					                                		]},
				{type:"combo", name:"ks", label:"所属科室:"},
				{type:"combo", name:"rank", label:"成员属性:",options:[
				                                   				{value: "0", text: "管理员"},
				                                				{value: "1", text: "普通科员"},
				                                				{value: "2", text: "科室领导"}
				                                		]},
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
		        	 var serviceCall = new ServiceCall();
					    var obj=new Object();
					    obj.sql="select * from t_per_user where user_id='"+userId+"'";
						serviceCall.init("queryDataSvc");
						var result= serviceCall.execute(obj);
						//alert(Object.toJSON(result));
						myForm.setItemValue("userId",userId);
						myForm.getInput("userName").setValue(result.list[0].userName);
						myForm.getInput("realName").setValue(result.list[0].realName);
						myForm.getCombo("bm").setComboValue(result.list[0].bm);
						myForm.getCombo("ks").setComboValue(result.list[0].ks);
						myForm.getCombo("rank").setComboValue(result.list[0].jb);
						user=result.list[0];
						
		        }
		        myForm.attachEvent("onChange", function(name) {
		        	if(name =='bm'){
		        	
		        		loadKSByType(false);
		        		
		        	}
		            });
		        loadKSByType(true);
		}
		 function loadKSByType(isInit){
				var dhxCombo=myForm.getCombo('ks');
        		dhxCombo.clearAll();
        		dhxCombo.setComboValue("");
			 	var serviceCall = new ServiceCall();
			    serviceCall.init("queryDataSvc");
			    var obj=new Object();
			    var ks_type=myForm.getCombo('bm').getSelectedValue();
			    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
			    obj.sql="select DICT_ID as value,DICT_TEXT as text from hospital.t_dict_table  where group_code='"+ks_type+"'"+filterCondition;
				var rt= serviceCall.execute(obj);
				dhxCombo.addOption(rt.list);
				if(isInit){
				myForm.getCombo("ks").setComboValue(user.ks);
				}
    		
	      }  	