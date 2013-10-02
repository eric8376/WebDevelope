dhtmlxEvent(window,"load", doOnLoad);
function doOnLoad(){
	var formData = [
	            	{type: "file", name: "excel"},
	            	{type: "button", name: "upload", value: "点击上传"}
	            ];
	             
	            var myForm = new dhtmlXForm("dhxForm", formData);
	            myForm.attachEvent("onButtonClick", function(id){
	            	if (id == "upload") {
	            		document.getElementById("uploadForm").submit();
	            	}
	            });
	             
	            function myCallBack(state, fileName, fileSize) {
	            	// see below what is this needed for
	            }
}