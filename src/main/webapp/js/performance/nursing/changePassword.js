var myForm, formData;
dhtmlxEvent(window,"load", doOnLoad);
function doOnLoad() {
				dhtmlx.skin = "dhx_skyblue";
				window.dhx_globalImgPath = parent.contextPath+"/js/dhtmlx/imgs/";
			
		        formData = [
				{
				    type: "settings",
				    position: "label-left",
				    labelWidth: 240,
				    inputWidth: 300
				},
                { type: "fieldset", name: "data", label: "修改用户密码", inputWidth: "auto", list:[
				{type:"input", name: 'oldpass', label:'旧密码:'},
				{type:"input", name:"newpass", label:"新密码:"},
				{type:"input", name:"comfirmpass", label:"确认新密码:"},
				{type:"button", name:"save", value:"确定"}] 
			   }
                        ]
			myForm = new dhtmlXForm("form_container", formData);
}	