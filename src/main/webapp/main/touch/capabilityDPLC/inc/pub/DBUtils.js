//showMessage表示是否显示执行成功后的提示信息
function executeQuery(sqlStr,showMessage)
{
  var result=callRemoteFunctionNoTrans("com.zte.resmaster.util.dbutils.DBUtils","executeQuery",sqlStr);
  if(result.exInfo.flag==1)
  {
  	alert(result.exInfo.detail);
  	return null;
  }else if(result.records.length<2&&showMessage)
  {
  	alert("返回数据为空！");
  	return null;
  }
  return result.records;
}

function executeSingleUpdate(sqlStr,showMessage)
{
  var result=callRemoteFunctionNoTrans("com.zte.resmaster.util.dbutils.DBUtils","executeSingleUpdate",sqlStr);
  if(result.exInfo.flag==1)
  {
  	alert(result.exInfo.detail);
  }else if(showMessage)
  {
  	alert("成功更新数据表！");
  }
}

function executeMultiUpadte(sqlStrs,showMessage)
{
  var result=callRemoteFunctionNoTrans("com.zte.resmaster.logic.dispatch.idc.DBUtils","executeMultiUpdate",sqlStrs);
  if(result.exInfo.flag==1)
  {
  	alert(result.exInfo.detail);
  }else if(showMessage)
  {
  	alert("成功更新数据表！");
  }
}
