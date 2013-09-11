window.$ = function(obj){return (document.getElementById)?document.getElementById(obj):(document.all)?document.all[obj]:obj} 
function isIE(){ //ie? 
    if (window.navigator.userAgent.toLowerCase().indexOf("msie")>=1) 
        return true; 
    else 
        return false; 
} 
window.isIE = isIE(); 
window.getMouseCoords=function(e){return {x:isIE?e.clientX+Math.max(document.body.scrollLeft, document.documentElement.scrollLeft):e.pageX, y:isIE?e.clientY+Math.max(document.body.scrollTop, document.documentElement.scrollTop):e.pageY};} 

String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g, "");}	

function DataGrid(divId,tablId,attr){
  var _div = document.getElementById(divId);
  var _table = document.getElementById(tablId);
  this._div = document.getElementById(divId);
  this._table = document.getElementById(tablId);
  this._div.className="tableDiv";
  _div.className="tableDiv";
  var _data=new Array(0);

  this.showCheck=false;
  this.cellIds= new Array(0);
  this.colSortInfo;

  var _thisDiv =this;
  var _selectedItem=null;
  var table_sliderState=0;
  
  this.headTdMouseDown = function (e1,obj){
  	 
  	if(!e1)e1=window.event; 
  	if(obj.style.cursor!="col-resize")return;
  	
  	var MCD=window.getMouseCoords(e1);
  	
    var x0=MCD.x;
    var y0=MCD.y;
    var doc=document;
    
  	if(obj.setCapture){ 
				obj.setCapture(); 
		}else if(window.captureEvents){ 
				window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
    }
    table_sliderState=1;
    var _oldWidth=obj.clientWidth;
    var line =document.getElementById(tablId+"_lineDiv");
    
    line.style.height=_thisDiv._div.clientHeight+"px";
    
    line.style.display="block";
    line.style.left=(MCD.x+_div.scrollLeft)+"px";
    
   
    doc.onmousemove =function(e0){ 
    	if(!e0)e0=window.event;
    	if(table_sliderState==1){
      
     var mus=getMouseCoords(e0);
     line.style.left=(mus.x-15+_div.scrollLeft)+"px";
     
    }
     }
     doc.onmouseup=function(e2){
     	if(table_sliderState==1){
     		if(!e2) e2=window.event;
     		var mus1=getMouseCoords(e2);
     		var diffw=mus1.x-x0;
     	_table.style.width=(parseInt(_table.clientWidth,10)+diffw)+"px";
        var headRows = _thisDiv._table.tHead.rows;
        for(i=0;i<headRows.length;i++){
        	for(var j=0;j<headRows[i].cells.length;j++){
        	  if(headRows[i].cells[j].style.hisIndex == obj.style.hisIndex){
        	  	var newW=parseInt(headRows[i].cells[j].clientWidth,10)+diffw;
        	  	if(newW<=0)newW=0;
        	  	
        	    headRows[i].cells[j].style.width = newW+"px";
        	  }
        	}
        }
     	} 
      table_sliderState=0;
      line.style.display="none";
		if(obj.releaseCapture){ 
				obj.releaseCapture(); 
		}else if(window.captureEvents){ 
				window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
		}
	  doc.onmousemove=null; 
	  doc.onmouseup=null; 
	} 
    
  };

this.onHeadMouseMove=function(e1,obj){

	var doc=document;
	if(!e1)e1=window.event; 
  var e2 = e1.srcElement || e1.target;
  var MCD=window.getMouseCoords(e1);
  var l=MCD.x-(e2.offsetLeft+obj.clientWidth-_div.scrollLeft);

if (Math.abs(l)<5){

obj.style.cursor="col-resize";
}
else{
obj.style.cursor="default";
}
}
  this.getAlailColumnIndx = function(row_index,startIndex,len){
  	var headRows = this._table.tHead.rows;
	  if(headRows[row_index]==null) return;
	  var cells =headRows[row_index].cells;
	if(cells==null||cells.length<=0) return;
	var subRowStartIndex=0;
	for(var j=startIndex;j<startIndex+len;j++){
		if(cells[j]==null) continue;
		if(cells[j].colSpan==1){
			
			 this.cellIds[this.cellIds.length]={"id":cells[j].id||cells[j].name||"","display":cells[j].style.display,"cellIndex":this.cellIds.length};
			 cells[j].className="lastTd";
			 cells[j].style.hisIndex = this.cellIds.length;
			 cells[j].ondblclick = function (){
			 	_thisDiv.sort(this.id||this.name||"",this.style.sort);
			 	}
			 
		}else{
			 this.getAlailColumnIndx(row_index+1,subRowStartIndex,parseInt(cells[j].colSpan));
			 subRowStartIndex+=parseInt(cells[j].colSpan);
			 cells[j].style.hisIndex = this.cellIds.length-1;
			}
	}
};
  this.init= function(){
  	var addCol=0;
     var lineDiv = document.createElement("DIV");
   lineDiv.className="lineDiv";
   lineDiv.id=tablId+"_lineDiv";
   _div.appendChild(lineDiv);
	
  if(typeof attr !="undefined" && typeof attr=="object"){
  	if(typeof attr.showCheck !="undefined" &&(attr.showCheck==true ||attr.showCheck.toString.toLowerCase()=="true")){
  	  this.showCheck=true;
  	  this.cellIds[0]={"id":"","display":true};
  	  addCol=1;
  	}
  }
  var headRows = this._table.tHead.rows;
  
  if(headRows.length<=0)return;
  var headTrCount =headRows.length;
  this.getAlailColumnIndx(0,0,headRows[0].cells.length);
 
  for(var h=0;h<headTrCount;h++){
  	headRows[h].className="fixedHeaderTr";
  	
  for(i=0;i<headRows[h].cells.length;i++){
  	var cell = headRows[h].cells[i];
  	cell.className="fixedHeadTd";
  	cell.onmousemove = function (m){
  		_thisDiv.onHeadMouseMove(m,this);
  	}
  	cell.onmousedown = function (m){_thisDiv.headTdMouseDown(m,this);}  

  }
  /*
  if(h==0){
  var tailCell =headRows[0].insertCell(_table.rows[0].cells.length);
  tailCell.className="tailTd";
 
  tailCell.rowSpan=headTrCount;

 }
*/
 }

  
  if(this.showCheck==true){
  	var r0=headRows[0];
  	var cell=r0.insertCell(0);
  	cell.className="fixedLeftTd";
  	cell.rowSpan=headTrCount;
  	var chk=document.createElement("input");
  	chk.type="checkBox";
  	chk.id=tablId+"_checkbox_";
  	cell.appendChild(chk);
  	chk.onclick=function(){
  		var chks=document.getElementsByName(divId+"_checkbox_All");
  		for(i=0;i<chks.length;i++){
  			chks[i].checked=document.getElementById(tablId+"_checkbox_").checked;
  		}
  		}
     }   
  

     
   //var tby = document.createElement("tbody");  
   //_table.appendChild(tby);
   //tby.id=tablId+"_tby";
   
   };
   this._div.onscroll=function(){
  		_thisDiv.headPositon();
   };
  this.loadData = function(dList){
 
   	this.clearn();
   	if(typeof dList!="undefined" && typeof dList =="object" && dList.constructor == Array){
   		//alert(dList.length);
   		//alert("dList[i]="+JSON.stringify(dList[0]));
   		for(i=0;i<dList.length;i++){
   			this.insertData(dList[i]);
   		}
   	}
   	
  }; 
  this.clearn = function(){
    var tbyRows = _table.tBodies[tablId+"_tby"].rows;
  	while(tbyRows!=null && tbyRows.length>0){
  		var r=tbyRows[0];
  	   r.parentNode.removeChild(r);
  	  }
  	  _data = new Array(0);
  	  _selectedItem=null;
  };  
  this.getSelectedItem = function(){
  	return _selectedItem;
  };
  this.getCheckedItems = function(){
  	var chkItems = new Array(0);
  	
  		var chks=document.getElementsByName(divId+"_checkbox_All");
  	 for(i=0;i<chks.length;i++){
  			if(chks[i].checked)
  			  chkItems.push(_data[i]);
  		}
  
   return chkItems;
  };
  this.getAllItems = function(){
  	return _data;
  };
  this.getItemCount = function (){
  	return _table.rows.length-1;
  }; 
  this.headPositon = function(){
  	var headrows=_table.tHead.rows;
  	for(h=0;h<headrows.length;h++){
  		//for(i=0;i<headrows[h].cells.length;i++)
  	   headrows[h].style.top=_div.scrollTop;  
    }
    
    if(this.showCheck){
    var r=_table.tBodies[tablId+"_tby"].rows;
    headrows[0].cells[0].style.left=_div.scrollLeft;
    for(var i=0;i<r.length;i++){
      var cell=r[i].cells[0];
      cell.style.left=_div.scrollLeft;
       cell.style.top=-1;
    }
  }
  
  
  }
  this.insertData = function (item,rowIndex){
  	    if(typeof item =="undefined" || typeof item !="object") return;
  	    _data.push(item);
  	    var rowNumber = _table.rows.length;
  	    if(typeof rowIndex !="undefined" && rowIndex!=null && parseInt(rowIndex,10)>=0)
  	     rowNumber = parseInt(rowIndex,10);
  	    if(rowNumber> _table.rows.length) rowNumber=_table.rows.length;
   			var newRow= document.createElement("tr");
   			_table.tBodies[tablId+"_tby"].appendChild(newRow);
   			newRow.className ="textTr";
   		
   		  newRow.remove = function (){
   		  	var rIndex=newRow.rowIndex-_table.tHead.rows.length;
   		  	_thisDiv.remove(rIndex);
   		   };
   			newRow.onmouseout=function(){
   				var cells=this.cells;
   				for(i=0;i<cells.length;i++){
   					 if(typeof cells[i].className=="undefined" || (cells[i].className.indexOf('activeTd')>=0))
   					   cells[i].className="blurTd";
   				}
   			};
   			 newRow.onmouseover=function(){
   				var cells=this.cells;
   				for(i=0;i<cells.length;i++){
   					 if(typeof cells[i].className=="undefined" || (cells[i].className.indexOf('fixedLeftTd')<0  && cells[i].className.indexOf('selectedTd')<0))
   					   cells[i].className="activeTd";
   				}
   			};
      
   			if(this.showCheck==true){
   				var cell=newRow.insertCell(0);
   				cell.className="fixedLeftTd";
   				cell.innerHTML="<input type='checkbox' name='"+divId+"_checkbox_All' id='"+tablId+"_checkbox_"+(_data.length-1)+"'>";
   			}
   			var start=this.showCheck==true?1:0;
   			
   			for(c=start;c<this.cellIds.length;c++){
   			
   				var celltext=newRow.insertCell(newRow.cells.length);
   				
   				var sp = document.createElement("SPAN");
   				celltext.appendChild(sp);
   				if(typeof item.color!="undefined")
   				  sp.style.color=item.color;
   				if(typeof item.bgColor !="undefined")
   				 sp.style.backgroundColor= item.bgColor;  
   				 
   				if(typeof item[this.cellIds[c].id] !="undefined" && item[this.cellIds[c].id]!=null)
   				  sp.innerHTML=item[this.cellIds[c].id];
   				else
   					sp.innerHTML= "";
   			   	
   				if(typeof attr !="undefined" && typeof attr=="object" && typeof attr.trDblClick!="undefined"){
   					
   					celltext.ondblclick=function(){
   			  	if(_selectedItem!=null){
   			  		var cs=_selectedItem.cells;
   			  		for(celli=0;celli<cs.length;celli++){
   					  if(typeof cs[celli].className=="undefined" || cs[celli].className.indexOf('fixedLeftTd')<0)
   					   cs[celli].className="blurTd";
   				    }
   			  	 }
   			    _selectedItem=this.parentNode;
   				 
   				  var cells=this.parentNode.cells;
   				  for(celli=0;celli<cells.length;celli++){
   					 if(typeof cells[celli].className=="undefined" || cells[celli].className.indexOf('fixedLeftTd')<0)
   					   cells[celli].className="selectedTd";
   				  }
   				
   				 if(typeof attr !="undefined" && typeof attr=="object" && typeof attr.trDblClick!="undefined"){
   					var tridex=this.parentNode.rowIndex-1;
   					attr.trDblClick(_data[tridex]);
   				 }   						
   				};
   				}
   				
   				//if(typeof attr !="undefined" && typeof attr=="object" && typeof attr.trClick!="undefined"){	
   			    celltext.onclick=function(){
   			  	 if(_selectedItem!=null){
    			  		var cs=_selectedItem.cells;
   			  		  for(celli=0;celli<cs.length;celli++){
   					      if(typeof cs[celli].className=="undefined" || cs[celli].className.indexOf('fixedLeftTd')<0)
   					      cs[celli].className="blurTd";
   				     }
   			  	 }
   			    _selectedItem=this.parentNode;
   			   
   				 var cells=this.parentNode.cells;
   				 for(celli=0;celli<cells.length;celli++){
   					  if(typeof cells[celli].className=="undefined" || cells[celli].className.indexOf('fixedLeftTd')<0)
   					    cells[celli].className="selectedTd";
   				 }
   				if(typeof attr !="undefined" && typeof attr=="object" && typeof attr.trClick!="undefined"){
   					var tridex=this.parentNode.rowIndex-1;
    					attr.trClick(_data[tridex]);
   				}
   			};
   		 //}
   		 
   	 }
   	 
   	 cellTail=newRow.insertCell(newRow.cells.length);
   	 cellTail.className="tailTd";
	 
  };
  this.remove = function(rIndex){
  	      if(typeof rIndex =="undefined" || rIndex == null || parseInt(rIndex)<0) return;
  	      var tbyRows = _table.tBodies[tablId+"_tby"].rows;
  	      if(rIndex>=tbyRows.length) return;
            if(_selectedItem==tbyRows[rIndex]) _selectedItem=null;
   		  		if(_data.length>0 && rIndex <_data.length){
   		  			
   		  			for(j=rIndex;j<_data.length-1;j++)
   		  			  _data[j]=_data[j+1];
   		  			
   		  			var _temp = new Array(0);
   		  			for(j=0;j<_data.length-1;j++)
   		  			  _temp.push(_data[j]);
   		  			
   		  			_data = null;
   		  			_data = new Array(0);
   		  			for(j=0;j<_temp.length;j++)
   		  			 _data.push(_temp[j]);  

   		  		}
   		  	tbyRows[rIndex].parentNode.removeChild(tbyRows[rIndex]);
   		  	_thisDiv.headPositon();  	
  };

  this.sort = function(colName,sDataType){
  	  if(typeof colName =="undefined" || colName==null || colName.length<=0)return;
  	  if(_data.length<=1)return;
  	 
  	  
  		var oTBody = _table.tBodies[tablId+"_tby"];
  		var colDataRows = oTBody.rows;
  		var aTRs = new Array();
  		for (var i=0; i < colDataRows.length; i++) {
       aTRs[i] = colDataRows[i];
     }
  	
  	if(typeof _thisDiv.colSortInfo!="undefined" && _thisDiv.colSortInfo==colName){
  		
  		var _tempData = _data.reverse();
  		_data=null;
  		_data=_tempData;
  		_tempData = null;
     aTRs.reverse();

  	}else
  	{
  	
  	var sortType ="string"
  	
  	if(typeof sDataType !="undefined"){
  		switch(sDataType.toLowerCase()){
  			case "string":sortType="string";break;
  			case "int":sortType="int";break;
  			case "float": sortType="float";break;
  			case "date":  sortType="date";break;
  			default :sortType="string";break;  
  		}
  	}
    var sortColIndex=-1;
    
    for(c=0;c<_thisDiv.cellIds.length;c++)
      if(this.cellIds[c].id==colName){
       sortColIndex = this.cellIds[c].cellIndex;
       break;
      }
      
  	  
  	aTRs.sort(this.generateCompareTRs(sortColIndex, sortType));
  	_data.sort(this.generateCompare(colName,sortType));  	
  	_thisDiv.colSortInfo=colName;
  }	
    var oFragment = document.createDocumentFragment();
     for (var i=0; i < aTRs.length; i++) {
       oFragment.appendChild(aTRs[i]);
     }
     oTBody.appendChild(oFragment);

  };


  this.generateCompare = function(colName, sDataType){
     //�հ�ȽϺ������������sort()��������
     return function compareTRs(obj1, obj2) {
       var vValue1, vValue2;
        
         vValue1 = convert(obj1[colName], sDataType);
         vValue2 = convert(obj2[colName], sDataType);
      
       //�Ƚϴ�С
       if(sDataType=="int" || sDataType=="float"){
       if(vValue1.toString()=="NaN" || vValue2.toString()=="NaN"){
       if(vValue1.toString()=="NaN"){
        return -1;
       }else if(vValue2.toString()=="NaN"){
        return 1;
       }
       }else{
       if (vValue1 < vValue2) {
         return -1;
       } else if (vValue1 > vValue2) {
         return 1;
       } else {
         return 0;
       }
       }
       }else{
       if (vValue1 < vValue2) {
         return -1;
       } else if (vValue1 > vValue2) {
         return 1;
       } else {
         return 0;
       }
      }
     };  	
  };
  
  this.generateCompareTRs = function(iCol, sDataType){
     //�հ�ȽϺ������������sort()��������
    
     return function compareTRs(oTR1, oTR2) {
       var vValue1, vValue2;
       if(oTR1.cells[iCol].firstChild != oTR1.cells[iCol].lastChild) {
       	
         //����Ƚ϶�������ֵ���ַ����ڵȻ�����ʱ�����ص�<div />��ʶ�ڵ�ͱȽϽڵ㲻���
         vValue1 = convert(oTR1.cells[iCol].firstChild.firstChild.nodeValue, sDataType);
         vValue2 = convert(oTR2.cells[iCol].firstChild.firstChild.nodeValue, sDataType);
       }
       else {
         //���߱Ƚϻ�����ʱ������<tr />ֻ��Ҫ�Ƚϵ�����һ��ڵ㣬�Լ������Լ�
         if(typeof oTR1.cells[iCol].firstChild.firstChild !="undefined" && oTR1.cells[iCol].firstChild.firstChild!=null){
         vValue1 = convert(oTR1.cells[iCol].firstChild.firstChild.nodeValue, sDataType);
         	//alet("1:"+vValue1);
         }else{
         	vValue1 = convert(null, sDataType);
         		//alet(vValue1);
        }
         
        if( typeof oTR2.cells[iCol].firstChild.firstChild !="undefined" && oTR2.cells[iCol].firstChild.firstChild!=null)
         vValue2 = convert(oTR2.cells[iCol].firstChild.firstChild.nodeValue, sDataType);
         else
         	vValue2 = convert(null, sDataType);
       }
       //�Ƚϴ�С
       
       if(sDataType=="int" || sDataType=="float"){
       if(vValue1.toString()=="NaN" || vValue2.toString()=="NaN"){
       if(vValue1.toString()=="NaN"){
        return -1;
       }else if(vValue2.toString()=="NaN"){
        return 1;
       }
       }else{
       if (vValue1 < vValue2) {
         return -1;
       } else if (vValue1 > vValue2) {
         return 1;
       } else {
         return 0;
       }
       }
       }else{
       if (vValue1 < vValue2) {
         return -1;
       } else if (vValue1 > vValue2) {
         return 1;
       } else {
         return 0;
       }
      }
      
     };  	
  };
 this.init();
}
  function convert (sValue0, sDataType) {
     //��Ҫ��������ת���ɶ�Ӧ��������ͣ���2�����Ĭ��û�м�ΪString���ͱȽ�
     
     var sValue="";
     if(typeof sValue0 =="undefined" || sValue0==null ||sValue0.length<=0)
       sValue="";
     else sValue=sValue0;  
     
     switch(sDataType) {
       case "int":
         return parseInt(sValue,10);
       case "float":
         return parseFloat(sValue);
       case "date":
         return new Date(Date.parse(sValue));
       default:
         return sValue.toString(); 
     }
}