function callQuery(obj,width,height){
  if(obj){
    var vReturnValue=window.showModalDialog("/DispatchDesign/common/dynamicquery/query.jsp",obj,"dialogWidth:"+width+"px;dialogHeight:"+height+"px;help:no");
    return vReturnValue;
  }
}

//null -> ''
function nvl(inPara,replPara){
	return inPara == null?replPara:inPara;
	}
