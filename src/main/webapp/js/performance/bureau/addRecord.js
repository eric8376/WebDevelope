var myForm, formData,operation;
dhtmlxEvent(window,"load", doOnLoad);
		function doOnLoad() {
			 operation=getParam('operation');
			//owner
			 	
			     var sql="select user_name as value ,user_name as text from bureau.t_per_record where user_name is  not null group by user_name ";
			     var list3=db.queryForList(sql)
				if(list3.size>0)
				list3.unshift({value:"",text:""});
				dhtmlx.skin = "dhx_skyblue";
				window.dhx_globalImgPath = parent.contextPath+"/js/dhtmlx/imgs/";
			
		        formData = [
				{
				    type: "settings",
				    position: "label-left",
				    labelWidth: 240,
				    inputWidth: 300
				},
                { type: "fieldset", name: "data", label: "项目信息", inputWidth: "auto", list:[
                {type:"hidden", name:"recordId"},
                {type:"combo", name: 'xm', label:'项目:',options:toComboData(parent.getXMList(),"dict_id","dict_text")},
                {type:"combo", name: 'hj', label:'关键环节:',options:null},
                {type: "newcolumn", offset:20},

                {type:"combo", name:"zb", label:"一级指标:",options:null},
				{type:"combo", name:"owner", label:"医疗机构:",options:list3,filtering:true,value:""},
				{type:"calendar", name:"checktime", label:"检查时间:",dateFormat: "%Y-%m-%d"},
				{type:"input", name:"hospid", label:"住院号:"},
				{type:"input", name:"results", label:"检查事项/结果:",rows:6},
				{type:"input", name:"kaohe", label:"扣分:"},
				{type:"input", name:"dianping", label:"备注:",rows: 6},	
				{type:"button", name:"save", value:"确认保存"}] 
			   }
                        ]
			myForm = new dhtmlXForm("form_container", formData);
		        
		   myForm.attachEvent("onSelectionChange", onChangeHandle );
		    myForm.attachEvent("onChange", onChangeHandle );
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
							}
					
				});
				}
	        
		});
	        myForm.getCombo("owner").setComboValue("");
	       // myForm.getCombo("xm").addOption({value:"",text:""});
	        myForm.getCombo("xm").setComboValue("");
	        loadSonByParent("xm","hj");
 	        loadSonByParent("hj","zb");
	        if(operation=="update"){
	        	
	        	doLoadData();
	        }
	        	
	    }
		function onChangeHandle(name){
			if(name=="xm"){
        		loadSonByParent("xm","hj");
        	}else if(name=='hj'){
        		loadSonByParent("hj","zb");
        		
        	}
		}
		function doLoadData(){
			
	        	 var recordId=getParam('recordId');
	        	
				    var sql="select * from bureau.t_per_record where record_id='"+recordId+"'";
				    var list=db.queryForList(sql);
					myForm.setItemValue("recordId",recordId);
					myForm.getCombo("owner").setComboValue(list[0].user_name);
					myForm.getCalendar("checktime").setFormatedDate("%Y-%m-%d",list[0].check_time);
					myForm.setItemValue("checktime", list[0].check_time);
					myForm.setItemValue("hospid", list[0].zyh);
					myForm.setItemValue("results", list[0].result);
					myForm.setItemValue("dianping", list[0].dianping);
					myForm.setItemValue("kaohe", list[0].kaohe);
					myForm.getCombo("xm").setComboValue(list[0].xm_id);
					myForm.getCombo("hj").setComboValue(list[0].hj_id);
					myForm.getCombo("zb").setComboValue(list[0].zb_id);
					user=list[0];
					
	         
		}
		function loadSonByParent(parentObj,sonObj){
			//myForm.getCombo(parentObj).selectOption(0);
			var sonCombo=myForm.getCombo(sonObj);
			var parentComboValue=myForm.getCombo(parentObj).getSelectedValue();
			sonCombo.clearAll();
			sonCombo.setComboValue("");
			sonCombo.addOption(parent.getDictListByParent(parentComboValue,sonObj));
			//sonCombo.selectOption(0);
		}
		