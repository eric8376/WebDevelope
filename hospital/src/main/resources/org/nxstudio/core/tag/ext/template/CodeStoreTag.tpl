var     ${field}Store =Ext.create('Ext.data.Store', {
model:'SimpleStoreModel',
     data :[
  #set($size = $codeList.size())
  #foreach($code in $codeList)
    {value:'${code.code}', text:'#if(${showCode}=="true")${code.code} #end${code.codedesc}'}
    #if($velocityCount != $size)
      ,
    #end
  #end
  ]
});