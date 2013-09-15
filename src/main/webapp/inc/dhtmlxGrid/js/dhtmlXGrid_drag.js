/*
Copyright Scand LLC http://www.scbr.com
This version of Software is free for using in non-commercial applications. 
For commercial use please contact info@scbr.com to obtain license

*/ 

 
 dhtmlXGridObject.prototype.enableDragAndDrop=function(mode){
 if(mode=="temporary_disabled"){
 this.dADTempOff=false;
 mode=true;}
 else
 this.dADTempOff=true;

 this.dragAndDropOff=convertStringToBoolean(mode);
};

 
dhtmlXGridObject.prototype.setDragBehavior=function(mode){
 this.dadmodec=this.dadmodefix=0;
 switch(mode){
 case "child": this.dadmode=0;this._sbmod=false;break;
 case "sibling": this.dadmode=1;this._sbmod=false;break;
 case "sibling-next": this.dadmode=1;this._sbmod=true;break;
 case "complex": this.dadmode=2;this._sbmod=false;break;
 case "complex-next": this.dadmode=2;this._sbmod=true;break;
}};


 
dhtmlXGridObject.prototype.enableDragOrder=function(mode){
 this._dndorder=convertStringToBoolean(mode);
};

 
dhtmlXGridObject.prototype._createDragNode=function(htmlObject,e){
 this.editStop();

 if(!this.dADTempOff)return null;
 htmlObject.parentObject=new Object();
 htmlObject.parentObject.treeNod=this;

 var z=new Array();

 z[this.selMultiRows?z.length:0]=htmlObject.parentNode.idd;

 var self=this;
 if(z.length && this._dndorder)
 z.sort(function(a,b){return(self.rowsAr[a].rowIndex>self.rowsAr[b].rowIndex?1:-1);});

 var el = this.getFirstParentOfType(_isIE?e.srcElement:e.target,"TD");
 if(el)this._dndExtra=el._cellIndex;
 this._dragged=new Array();
 for(var i=0;i<z.length;i++)
 if(this.rowsAr[z[i]]){
 this._dragged[this._dragged.length]=this.rowsAr[z[i]];
 this.rowsAr[z[i]].treeNod=this;
}

 htmlObject.parentObject.parentNode=htmlObject.parentNode;

 var dragSpan=document.createElement('div');
 dragSpan.innerHTML=this.rowToDragElement(htmlObject.parentNode.idd);
 dragSpan.style.position="absolute";
 dragSpan.className="dragSpanDiv";
 return dragSpan;
}



 
dhtmlXGridObject.prototype._createSdrgc=function(){
 this._sdrgc=document.createElement("DIV");
 this._sdrgc.innerHTML="&nbsp;";
 this._sdrgc.className="gridDragLine";
 this.objBox.appendChild(this._sdrgc);
}











 
function dragContext(a,b,c,d,e,f,j,h,k,l){
 this.source=a||"grid";
 this.target=b||"grid";
 this.mode=c||"move";
 this.dropmode=d||"child";
 this.sid=e||0;
 this.tid=f||window.unknown;
 this.sobj=j||null;
 this.tobj=h||null;
 this.sExtra=k||null;
 this.tExtra=l||null;
 return this;
}
 
dragContext.prototype.valid=function(){
 if(this.sobj!=this.tobj)return true;
 if(this.sid==this.tid)return false;
 if(this.target=="treeGrid"){
 var z=this.tid
 while(z = this.tobj.getParentId(z)){
 if(this.sid==z)return false;
}
}
 return true;
}
 
dragContext.prototype.close=function(){
 this.sobj=null;
 this.tobj=null;
}
 
dragContext.prototype.copy=function(){
 return new dragContext(this.source,this.target,this.mode,this.dropmode,this.sid,this.tid,this.sobj,this.tobj,this.sExtra,this.tExtra);
}
 
dragContext.prototype.set=function(a,b){
 this[a]=b;
 return this;
}
 
dragContext.prototype.uid=function(a,b){
 this.nid=this.sid;
 while(this.tobj.rowsAr[this.nid])
 this.nid=this.nid+((new Date()).valueOf());

 return this;
}
 
dragContext.prototype.data=function(){
 if(this.sobj==this.tobj)
 return this.sobj._getRowArray(this.sobj.rowsAr[this.sid]);
 if(this.source=="tree")
 return this.tobj.treeToGridElement(this.sobj,this.sid,this.tid);
 else
 return this.tobj.gridToGrid(this.sid,this.sobj,this.tobj);
}
 
dragContext.prototype.pid=function(){
 if(this.tid==window.unknown)return window.unknown;
 if(this.target=="treeGrid")
 if(this.dropmode=="child")
 return this.tid;
 else{
 var z=this.tobj.rowsAr[this.tid];
 if((this.alfa)&&(this.tobj._sbmod)&&(z.nextSibling)){
 if(z.nextSibling.parent_id==this.tid)
 return this.tid;
 if(z.nextSibling.parent_id!=z.parent_id)
 return z.nextSibling.parent_id;
}
 return z.parent_id;
}
}
 
dragContext.prototype.ind=function(){
 if(this.tid==window.unknown)return 0;
 if(this.target=="treeGrid"){
 if(this.dropmode=="child")
 this.tobj.openItem(this.tid);
 else
 this.tobj.openItem(this.tobj.getParentId(this.tid));
}
 var ind=this.tobj.rowsCol._dhx_find(this.tobj.rowsAr[this.tid]);
 if((this.alfa)&&(this.tobj._sbmod)&&(this.dropmode=="sibling")){
 var z=this.tobj.rowsAr[this.tid];
 if((z.nextSibling)&&(z.nextSibling.parent_id==this.tid))
 return ind+1;
}

 return(ind+((this.target=="treeGrid")?this.tobj._countBranchLength(ind):1));
}
 
dragContext.prototype.img=function(){
 if(this.target!="grid")
 return this.sobj.getItemImage(this.sid);
 else return null;
}

 
dragContext.prototype.slist=function(){
 var res=new Array();
 for(var i=0;i<this.sid.length;i++)
 res[res.length]=this.sid[i][(this.source=="tree")?"id":"idd"];

 return res.join(",");
}


 
dhtmlXGridObject.prototype._drag=function(sourceHtmlObject,dhtmlObject,targetHtmlObject,lastLanding){

 var z=(this.lastLanding)
 
 if(this._autoOpenTimer)window.clearTimeout(this._autoOpenTimer);

 
 var r1=targetHtmlObject.parentNode;
 var r2=sourceHtmlObject.parentObject;
 
 if(!r1.grid){r1.grid=this;this.dadmodefix=0;}

 var c=new dragContext(0,0,0,(r1.grid.dadmodec?"sibling":"child"));


 if(r2 && r2.childNodes)
 c.set("source","tree").set("sobj",r2.treeNod).set("sid",c.sobj._dragged);
 else{
 if(r2.treeNod.isTreeGrid())c.set("source","treeGrid");
 c.set("sobj",r2.treeNod).set("sid",c.sobj._dragged);
}


 if(r1.grid.isTreeGrid())
 c.set("target","treeGrid");
 else
 c.set("dropmode","sibling");
 c.set("tobj",r1.grid).set("tid",r1.idd);



 var el = this.getFirstParentOfType(lastLanding,"TD")
 if(el)c.set("tExtra",el._cellIndex);
 if(el)c.set("sExtra",c.sobj._dndExtra);

 if(c.sobj.dpcpy)c.set("mode","copy");
 c.tobj._clearMove();

 c.tobj.dragContext=c;
 if((c.tobj.dragFunc)&&(!c.tobj.dragFunc(c.slist(),c.tid,c.sobj,c.tobj,c.sExtra,c.tExtra)))return;

 
 var result=new Array();
 if(typeof(c.sid)=="object"){
 var nc=c.copy();
 for(var i=0;i<c.sid.length;i++){
 if(!nc.set("alfa",(!i)).set("sid",c.sid[i][(c.source=="tree"?"id":"idd")]).valid())continue;
 nc.tobj._dragRoutine(nc);
 result[result.length]=nc.nid;
 nc.set("dropmode","sibling").set("tid",nc.nid);
}
 nc.close();
}
 else
 c.tobj._dragRoutine(c);

 
 if(c.tobj.dropFunc)
 c.tobj.dropFunc(c.slist(),c.tid,result.join(","),c.sobj,c.tobj,c.sExtra,c.tExtra);

 c.tobj.dragContext=null;
 c.close();
}


 
dhtmlXGridObject.prototype._dragRoutine=function(c){
 if((c.sobj==c.tobj)&&(c.source=="grid")&&(c.mode=="move")){
 
 var fr=c.sobj.rowsAr[c.sid];
 c.sobj.rowsCol._dhx_removeAt(c.sobj.rowsCol._dhx_find(fr));
 c.sobj._insertRowAt(fr,c.ind());
 c.nid=c.sid;
 return;
}

 c.uid().tobj.addRow(c.nid,c.data(),c.ind(),c.pid(),c.img());

 if(c.source=="tree"){
 var sn=c.sobj._globalIdStorageFind(c.sid);
 if(sn.childsCount){
 var nc=c.copy().set("tid",c.nid).set("dropmode",c.target=="grid"?"sibling":"child");
 for(var j=0;j<sn.childsCount;j++){
 c.tobj._dragRoutine(nc.set("sid",sn.childNodes[j].id));
 if(c.mode=="move")j--;
}
 nc.close();
}
}
 else{
 c.tobj._copyUserData(c);
 if((c.source=="treeGrid")){
 var snc=c.sobj.loadedKidsHash.get(c.sid);
 if((snc)&&(snc.length)){
 var nc=c.copy().set("tid",c.nid);
 if(c.target=="grid")
 nc.set("dropmode","sibling");
 else{
 nc.tobj.openItem(c.tid);
 nc.set("dropmode","child");
}
 for(var j=0;j<snc.length;j++){
 c.tobj._dragRoutine(nc.set("sid",snc[j].idd));
 if(c.mode=="move")j--;
}
 nc.close();
}
}
}

 if(c.mode=="move"){
 c.sobj[(c.source=="tree")?"deleteItem":"deleteRow"](c.sid);
 if((c.sobj==c.tobj)&&(!c.tobj.rowsAr[c.sid])){
 c.tobj.changeRowId(c.nid,c.sid);
 c.nid=c.sid;
}
}
}


 
dhtmlXGridObject.prototype.gridToGrid = function(rowId,sgrid,tgrid){
 var z=new Array();
 for(var i=0;i<sgrid.hdr.rows[0].cells.length;i++)
 z[i]=sgrid.cells(rowId,i).getValue();
 return z;
}

 
dhtmlXGridObject.prototype.checkParentLine=function(node,id){
 if((!id)||(!node))return false;
 if(node.idd==id)return true;
 else return this.checkParentLine(this.getRowById(node.parent_id),id);
}

 
dhtmlXGridObject.prototype._dragIn=function(htmlObject,shtmlObject,x,y){
 if(!this.dADTempOff)return 0;
 var tree=this.isTreeGrid();

 if(htmlObject.parentNode==shtmlObject.parentNode)
 return 0;

 
 if((tree)&&((this.checkParentLine(htmlObject.parentNode,shtmlObject.parentNode.idd))))
 return 0;
 var obj=shtmlObject.parentNode.idd?shtmlObject.parentNode:shtmlObject.parentObject;
 if((this.dragInFunc)&&(!this.dragInFunc(obj.idd||obj.id,htmlObject.parentNode.idd,obj.grid||obj.treeNod,htmlObject.parentNode.grid)))
 return 0;

 this._setMove(htmlObject,x,y);

 if((tree)&&(htmlObject.parentNode.expand!="")){
 this._autoOpenTimer=window.setTimeout(new callerFunction(this._autoOpenItem,this),1000);
 this._autoOpenId=htmlObject.parentNode.idd;
}
 else
 if(this._autoOpenTimer)window.clearTimeout(this._autoOpenTimer);

 return htmlObject;
}
 
dhtmlXGridObject.prototype._autoOpenItem=function(e,gridObject){
 gridObject.openItem(gridObject._autoOpenId);
}

 
dhtmlXGridObject.prototype._dragOut=function(htmlObject){
 this._clearMove();
 if(this._autoOpenTimer)window.clearTimeout(this._autoOpenTimer);
}
 
dhtmlXGridObject.prototype._setMove=function(htmlObject,x,y){
 var a1=getAbsoluteTop(htmlObject);
 var a2=getAbsoluteTop(this.objBox);

 if(this.dadmode==2)
{

 var z=y-a1+this.objBox.scrollTop+(document.body.scrollTop||document.documentElement.scrollTop)-2-htmlObject.offsetHeight/2;
 if((Math.abs(z)-htmlObject.offsetHeight/6)>0)
{
 this.dadmodec=1;
 
 if(z<0)this.dadmodefix=-1;else this.dadmodefix=1;
}
 else this.dadmodec=0;
}
 else
 this.dadmodec=this.dadmode;


 
 if((a1-a2-parseInt(this.objBox.scrollTop))>(parseInt(this.objBox.offsetHeight)-50))
 this.objBox.scrollTop=parseInt(this.objBox.scrollTop)+20;
 
 if((a1-a2)<(parseInt(this.objBox.scrollTop)+30))
 this.objBox.scrollTop=parseInt(this.objBox.scrollTop)-20;

 if(this.dadmodec){
 if(!this._sdrgc)this._createSdrgc();
 this._sdrgc.style.display="block";
 this._sdrgc.style.top=a1-a2+((this.dadmodefix>=0)?htmlObject.offsetHeight:0)+"px";
}
 else{
 this._llSelD=htmlObject;
 if(htmlObject.parentNode.tagName=="TR")
 for(var i=0;i<htmlObject.parentNode.childNodes.length;i++)
{
 var z= htmlObject.parentNode.childNodes[i];
 z._bgCol=z.style.backgroundColor;
 z.style.backgroundColor="#FFCCCC";
}
}
}
 
dhtmlXGridObject.prototype._clearMove=function(){
 if(this._sdrgc)this._sdrgc.style.display="none";
 if((this._llSelD)&&(this._llSelD.parentNode.tagName=="TR"))
 for(var i=0;i<this._llSelD.parentNode.childNodes.length;i++)
 this._llSelD.parentNode.childNodes[i].style.backgroundColor=this._llSelD._bgCol;

 this._llSelD=null;
}


 
dhtmlXGridObject.prototype.rowToDragElement=function(gridRowId){
 var out=this.cells(gridRowId,0).getValue();
 return out;
}








 
dhtmlXGridObject.prototype._copyUserData = function(c){
 var z1 = c.sobj.UserData[c.sid];
 var z2 = new Hashtable();
 if(z1){
 z2.keys = z2.keys.concat(z1.keys);
 z2.values = z2.values.concat(z1.values);
}

 c.tobj.UserData[c.tid]=z2;
}



 
dhtmlXGridObject.prototype.moveRow=function(rowId,mode,targetId,targetGrid){
 switch(mode){
 case "row_sibling":
 this.moveRowTo(rowId,targetId,"move","sibling",this,targetGrid);
 break;
 case "up":
 this.moveRowUp(rowId);
 break;
 case "down":
 this.moveRowDown(rowId);
 break;
}
}



 
dhtmlXGridObject.prototype.setDragHandler=function(func){if(typeof(func)=="function")this.dragFunc=func;else this.dragFunc=eval(func);}





