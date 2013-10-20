var myForm, formData,operation;
dhtmlxEvent(window,"load", doOnLoad);
		function doOnLoad() {
			 operation=getParam('operation');
			 var serviceCall = new ServiceCall();
			    var obj=new Object();
			    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
			     obj.sql="select dict_id as 'value',dict_text as text from hospital.t_dict_table where group_code='ks'"+filterCondition;
			     serviceCall = new ServiceCall();
			     serviceCall.init("queryDataSvc");
				var rt2= serviceCall.execute(obj);
				//dhtmlx.skin = "dhx_skyblue";
				window.dhx_globalImgPath = parent.contextPath+"/js/dhtmlx/imgs/";
				
		        formData = [
				{
				    type: "settings",
				    position: "label-left",
				    labelWidth: 240,
				    inputWidth: 150
				},
                { type: "fieldset", name: "data", label: "项目信息", inputWidth: 900, list:[
                {type:"hidden", name:"recordId"},                                                                        
                {type:"combo", name:"ks", label:"当事科室:",options:rt2.list,readonly:1},
				{type:"combo", name: 'xm', label:'项目名称:',readonly:1,options:toComboData(parent.getXMList(),"dict_id","dict_text")},
				{type:"combo", name: 'hj', label:'关键环节:',readonly:1,options:null},
				{type:"combo", name: 'zb', label:'一级指标:',readonly:1,options:null},
				{type:"input", name:"owner", label:"当事人:",required: true},
				{type:"calendar", name:"checktime", label:"检查时间:",dateFormat: "%Y-%m-%d",  tooltip:"请输入检查时间",required: true,note: {
				     text: "请在这里输入时间，时间是必填项."
		             
			 }
},
				
				{type:"input", name:"results", label:"检查事项/结果:",rows:5,inputWidth :400},
				{type:"input", name:"dianping", label:"点评:",rows: 5,inputWidth :400},
				{type:"input", name:"beizhu", label:"备注:",rows: 5,inputWidth :400},
				{type:"input", name:"kaohe", label:"考核分:",inputWidth :50},
				{type:"button", name:"save", value:"确认保存"}] 
			   }
                        ]
			myForm = new dhtmlXForm("form_container", formData);
		    myForm.setFontSize("15px");
		    //赋值+联动
		        if(operation=="update"){
		        	 var recordId=getParam('recordId');
		        	 var serviceCall = new ServiceCall();
					    var obj=new Object();
					    obj.sql="select * from t_per_record where record_id='"+recordId+"'";
						serviceCall.init("queryDataSvc");
						var result= serviceCall.execute(obj);
						myForm.setItemValue("recordId",recordId);
						myForm.setItemValue("owner", result.list[0].user_name);
						myForm.getCalendar("checktime").setFormatedDate("%Y-%m-%d",result.list[0].check_time);
						myForm.setItemValue("checktime", result.list[0].check_time);
						myForm.setItemValue("results", result.list[0].result);
						myForm.setItemValue("dianping", result.list[0].dianping);
						myForm.setItemValue("beizhu", result.list[0].beizhu);
						myForm.setItemValue("kaohe", result.list[0].kaohe);
						myForm.getCombo("ks").setComboValue(result.list[0].ks_id);
						myForm.getCombo("xm").setComboValue(result.list[0].xm_id);
						 loadSonByParent("xm","hj");
						 myForm.getCombo("hj").setComboValue(result.list[0].hj_id);
					     loadSonByParent("hj","zb");
						myForm.getCombo("zb").setComboValue(result.list[0].zb_id);
						user=result.list[0];
						
		        }else{
		        	 loadSonByParent("xm","hj");
		        	 loadSonByParent("hj","zb");
		        }   
	        myForm.attachEvent("onButtonClick", function(name) {
				if(name =='save'&& operation=="update"){
					this.send("manageOperation.spr?action=updateRecord","post",function(respon){
						var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
						if(res.result=='success')
						{
							parent.loadPage('manage.spr?action=recordManage');
						}
					});
					}
				    else if(name =='save'&& operation=="add"){
						this.send("manageOperation.spr?action=addRecord","post",function(respon){
							var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
							if(res.result=='success')
							{
								parent.loadPage('manage.spr?action=recordManage');
							}else{
								alert("新增或修改失败.");
							}
					
				});
				}
	       
	     
		});
	      
	      
	        
	        //联动
	        myForm.attachEvent("onSelectionChange", onChangeHandle );
		    myForm.attachEvent("onChange", onChangeHandle );
	        }
		function onChangeHandle(name){
			if(name=="xm"){
        		loadSonByParent("xm","hj");
        	}else if(name=='hj'){
        		loadSonByParent("hj","zb");
        		
        	}
		}
		function loadSonByParent(parentObj,sonObj){
			var sonCombo=myForm.getCombo(sonObj);
			var parentComboValue=myForm.getCombo(parentObj).getSelectedValue();
			sonCombo.clearAll();
			sonCombo.setComboValue("");
			sonCombo.addOption(parent.getDictListByParent(parentComboValue,sonObj));
		}
 	