var isHuiZhou = false;//huizhou
var isTJWT = false;//tianjin
var isShangHai = false;//shanghai
var isBeiFen = false;//beifen
var isCNCGrp = false;//cncgrp
var isBJTT = false;//tietong
var isCNCJs = false;//jiangsu
var isCNC = false;//xiaowangtong
var isXJDX = false;//xinjiangdianxin
var isFJWT = false;//fujianwangtong
var isHBWT = false;//hubei wangtong
var CUTTING_97;//97cut data
function f_getVerFunction(){
  var m_function = callRemoteFunctionNoTrans("com.zte.resmaster.rim.resAssign.other.ProjectConfs","getProject_current");
  CUTTING_97 = callRemoteFunctionNoTrans("com.zte.resmaster.rim.resAssign.other.ProjectConfs","getCutting97Data");
  if (m_function == '0'){
  	isCNC = true;
  }  
  if (m_function == '1'){
  	isHuiZhou = true;
  }
  if (m_function == '2'){
  	isBeiFen = true;
  }
  if (m_function == '3'){
  	isCNCGrp = true;
  }
  if (m_function == '4'){
  	isShangHai = true;
  }
  if (m_function == '5'){
  	isBJTT = true;
  }
  if (m_function == '6'){
  	isCNCJs = true;
  }
  if (m_function == '7'){
  	isXJDX = true;
  }
  if (m_function == '8'){
  	isFJWT = true;
  }
  if (m_function == '9'){
  	isHBWT = true;
  }
  if (m_function == 'A'){
  	isTJWT = true;
  }
  return;
}
//get archive list
function f_getDispatchAchieveInfo(iResType,busiIds,busiNos,resIds,actionTypes,archiveTypes){
  return callRemoteFunctionNoTrans("com.ztesoft.resmaster.DispatchDesign.DispatchDesign","getDispatchAchieveInfo",iResType,busiIds,busiNos,resIds,actionTypes,archiveTypes);
}

function f_DispatchArchive(vo){
	return callRemoteFunctionNoTrans("com.ztesoft.resmaster.DispatchDesign.DispatchDesign","DispatchArchive",vo);
}