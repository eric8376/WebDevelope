function DataGrid(divId,tablId,attr){
	
  var _div = document.getElementById(divId);
  var _table = document.getElementById(tablId);
  _div.className="tableDiv";
  var _data=new Array(0);
  this.contentTrClick = null;
  this.contentTrdbClick = null;
  this.showCheck=false;
  this.cellIds= new Array(0);
  var _thisDiv =this;
  var _selectedItem=null;
  if(typeof attr !="undefined" && typeof attr=="object"){
  	if(typeof attr.showCheck !="undefined" &&(attr.showCheck==true ||attr.showCheck.toString.toLowerCase()=="true")){
  	  this.showCheck=true;
  	}
  }
  if(_table.rows.length<=0)return;
  
  for(i=0;i<_table.rows[0].cells.length;i++){
  	this.cellIds[i]=_table.rows[0].cells[i].id ||_table.rows[0].cells[i].name||"";
  }
 
  _table.rows[0].className="fixedHeaderTr";
 // _table.rows[0].style.zIndex=_table.style.zIndex+1;
  //_div.style.zIndex=_table.style.zIndex+2;
  
  //var tailCell = _table.rows[0].insertCell(_table.rows[0].cells.length);
  //tailCell.className="tailTd";
  
  if(this.showCheck==true){
  	var r0=_table.rows[0];
  	var cell=r0.insertCell(0);
  	cell.className="fixedLeftTd";
  	var chk=document.createElement("input");
  	chk.type="checkBox";
  	chk.id=tablId+"_checkbox_";
  	cell.appendChild(chk);
  	chk.onclick=function(){
  		for(i=0;i<_table.rows.length-1;i++){
  			document.getElementById(tablId+"_checkbox_"+i).checked=document.getElementById(tablId+"_checkbox_").checked;
  		}
  		}
  }
   _div.onscroll=function(){
  		var r=_table.rows;
  		   r[0].style.top=_div.scrollTop;  
           for(var i=0;i<r.length;i++){
            var cell=r[i].cells[0];
            cell.style.left=_div.scrollLeft;
            cell.style.top=-1;
           }
          }
   
      
   this.loadData = function(dList){
   	
   	this.clearn();
  
   	if(typeof dList!="undefined" && typeof dList =="object" && dList.constructor == Array){
   		
   		_data=dList;
   		for(i=0;i<dList.length;i++){
   			
   			var newRow= _table.insertRow(_table.rows.length);
   			newRow.id=tablId+"_row_"+i;
   			
   		
   			newRow.onmouseout=function(){
   				var cells=this.cells;
   				for(i=0;i<cells.length;i++){
   					 if(typeof cells[i].className=="undefined" || (cells[i].className.indexOf('activeTd')>=0))
   					   cells[i].className="blurTd";
   				}
   			}
   			 newRow.onmouseover=function(){
   				var cells=this.cells;
   				for(i=0;i<cells.length;i++){
   					 if(typeof cells[i].className=="undefined" || (cells[i].className.indexOf('fixedLeftTd')<0  && cells[i].className.indexOf('selectedTd')<0))
   					   cells[i].className="activeTd";
   				}
   			}
      
   			if(this.showCheck==true){
   				var cell=newRow.insertCell(0);
   				cell.className="fixedLeftTd";
   				cell.innerHTML="<input type='checkbox' name='"+divId+"' id='"+tablId+"_checkbox_"+i+"'>";
   			}
   			for(c=0;c<this.cellIds.length;c++){
   				var celltext=newRow.insertCell(newRow.cells.length);
   				var sp=document.createElement('span');
   				celltext.appendChild(sp);
   				if(typeof dList[i][this.cellIds[c]] !="undefined" && dList[i][this.cellIds[c]]!=null)
   				  sp.innerHTML=dList[i][this.cellIds[c]];
   				else
   					sp.innerHTML="&nbsp;";  
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
   					var trids=this.parentNode.id.split("_");
           
   					attr.trDblClick(_data[parseInt(trids[trids.length-1],10)]);
   				}   						
   						
   					}
   				}
   				if(typeof attr !="undefined" && typeof attr=="object" && typeof attr.trClick!="undefined"){	
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
   					var trids=this.parentNode.id.split("_");
           
   					attr.trClick(_data[parseInt(trids[trids.length-1],10)]);
   				}
   			}
   		}
		
   			}
   		}
   	}
   	
  } 
  this.clearn = function(){
 
  	while(_table.rows.length>1){
  		var r=_table.rows[1];
  	   r.parentNode.removeChild(r);
  	  }
  }  
  this.getSelectedItem = function(){
  	return _selectedItem;
  }
  this.getCheckedItems = function(){
  	var chkItems = new Array(0);
  	 for(i=0;i<_table.rows.length-1;i++){
  			if(document.getElementById(tablId+"_checkbox_"+i).checked)
  			  chkItems.push(_data[i]);
  		}
   return chkItems;
  }
  this.getAllItems = function(){
  	return _data;
  }   
}