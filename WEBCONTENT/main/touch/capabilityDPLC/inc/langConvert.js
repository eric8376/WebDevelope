//��ȡת�������ʾ��Ϣ
function getModuleMsg(MsgID){
  return callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getDesignMsg",MsgID);
}

function getRimMsg(MsgID){
  return callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage",MsgID);
  }

function getPopedomMsg(MsgID){
  return callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getPopedomMsg",MsgID);
  }
