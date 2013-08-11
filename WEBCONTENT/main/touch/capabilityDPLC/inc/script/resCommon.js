function res_add(resTypeId){
    var res=new Object();
    res.resTypeId=resTypeId;
    res.resObjectId="";
    res.parentResTypeId="";
    res.parentResObjectId="";
    res.isNew=true;
    window.showModalDialog("common/openProperties.jsp",res,"dialogWidth:350px;dialogHeight:500px;help=no");
}
function res_edit(resTypeId,resObjectId){
    var res=new Object();
    res.resTypeId=resTypeId;
    res.resObjectId=resObjectId;
    res.isNew=false;
    window.showModalDialog("common/openProperties.jsp",res,"dialogWidth:350px;dialogHeight:500px;help=no");
}
function res_del(res){
  if(res){
    var delXML="";
    for(var i=0;i<res.length;i++){

    }
  }

}
