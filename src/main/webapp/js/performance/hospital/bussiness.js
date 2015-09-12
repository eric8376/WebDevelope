/**/
function getEjzb(isAll,isColumn)
{
	var ejzb=[
				{value: "0", text: "检验师"},
   				{value: "1", text: "药学人员"},
   				{value: "2", text: "放射师"},
   				{value: "3", text: "实习护士"},
   				{value: "4", text: "实习医生"},
   				{value: "5", text: "医生"},
   				{value: "6", text: "护士"},
   				{value: "7", text: "进修医生"},
   				{value: "8", text: "规培医生"},
				{value: "9", text: "工勤人员"},
				{value: "10", text: "患者"},
				{value: "11", text: "患者家属"},
				{value: "12", text: "就医者"},
				{value: "13", text: "其他人员"}
		];
if(isAll){
	ejzb.unshift({value:'ALL',text:"全部"})
}
if(isColumn){
for(var i=0;i<ejzb.length;i++){
	ejzb[i].key=ejzb[i].value;
	ejzb[i].value=ejzb[i].text;
}
}
return ejzb;
}
function filter(data,type){
	
	if(type=="post"){
		var map=listObjectToMap(getEjzb(false),"value","text");
		for(var i=0;i<data.length;i++){
			data[i].keyindex=(map[data[i].keyindex]==undefined)?"其他":map[data[i].keyindex];
		}
	}else{
		for(var i=0;i<data.length;i++){
			data[i].keyindex=(data[i].keyindex==null)?"其他":data[i].keyindex;
		}
	}
	return data;
}
function getLineSeriesContainsPlanValue(data){
	var outdata=new Array();
	
	for(var i=0;i<data.length;i++){
		var obj=new Object();
		obj.name=data[i].keyindex;
		obj.y=data[i].number;
		if(data[i].isplan=='1'){
			obj.color='red';
		}
		outdata.push(obj);
	}
	
	return outdata;
}