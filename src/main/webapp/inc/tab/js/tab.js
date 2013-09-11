
	function initTabs(mainContainerID,tabTitles,activeTab,additionalTab,_prefDir,fcts)
	{
	   this.tabDiv =document.getElementById(mainContainerID);
	   this.tabDiv.className="dhtmlgoodies_tabPane";
		for(var no=0;no<tabTitles.length;no++){
			var aTab = document.createElement('DIV');
			aTab.id = 'tabTab' + mainContainerID + "_" +  no;
			aTab.onmouseover = function(){
		     if(this.className.indexOf('tabInactive')>=0){
			 this.className='inactiveTabOver';
		    }
			};
			aTab.onmouseout = function(){
		    if(this.className ==  'inactiveTabOver'){
			 this.className='tabInactive';
		   }
			
			};
			
			aTab.onclick = function(){
			var idArray = this.id.split('_');
			var tabIndex= idArray[idArray.length-1].replace(/[^0-9]/gi,'');
			 for(t=0;t<tabTitles.length;t++){
			  document.getElementById('tabTab' + mainContainerID + "_" +t).className="tabInactive";
			  if((typeof additionalTab != "undefined") && (typeof additionalTab == "object") && (additionalTab!=null)&&(additionalTab.constructor == Array)){
			     if(additionalTab[t]!=null)
			       document.getElementById(additionalTab[t]).style.display="none";
			  }
			 }
		     document.getElementById('tabTab' + mainContainerID + "_" +tabIndex).className="tabActive";
			  if((typeof additionalTab != "undefined") && (typeof additionalTab == "object") && (additionalTab!=null) && (additionalTab.constructor == Array)){
			     if(additionalTab[tabIndex]!=null)
			       document.getElementById(additionalTab[tabIndex]).style.display="block";
			  }
		     
		    
			if((typeof fcts != "undefined") && (typeof fcts == "object") && (fcts!=null) && (fcts.constructor == Array)){
			 if(typeof fcts[tabIndex]!= "undefined" && typeof fcts[tabIndex]=="function"){
			  fcts[tabIndex]();
			 }
			}
			};
			
			if(no==activeTab){
			aTab.className='tabActive';
			}else{
			aTab.className='tabInactive';
			}
			
			var span = document.createElement('SPAN');
			span.innerHTML = tabTitles[no];
			span.style.position = 'relative';
			aTab.appendChild(span);
            span.className="";

			var spanRight = document.createElement('span');
			spanRight.style.position = 'relative';
			spanRight.className="span";
			aTab.appendChild(spanRight);
			aTab.style.cursor = 'pointer';
			this.tabDiv.appendChild(aTab);
		}	
		if((typeof additionalTab != "undefined") && (typeof additionalTab == "object") && (additionalTab!=null) && (additionalTab.constructor == Array)){
			 for(i=0;i<additionalTab.length;i++)
			 {
			  document.getElementById(additionalTab[i]).className="TabDivBroder";
			  document.getElementById(additionalTab[i]).style.display="none";
			  }
			  
			 if( additionalTab[activeTab]!=null)
			   document.getElementById(additionalTab[activeTab]).style.display="block";
	    }
	    
	    this.getActiveTab=function(){
	     for(var no=0;no<tabTitles.length;no++){
	       if(document.getElementById('tabTab' + mainContainerID + "_" +no).className.indexOf('tabActive')>=0){
	         return  document.getElementById('tabTab' + mainContainerID + "_" +no);
	         break;
	       }
	     }
	    }
		this.addButton = function(btName,btfunction){
		  var aTab = document.createElement('DIV');
		  this.tabDiv.appendChild(aTab);
		  var btn=document.createElement("button");
		  btn.className="buttonClass";
		  btn.innerHTML=btName;
		  btn.onclick=function (){
		  btfunction();
		  }
		  aTab.appendChild(btn);
		};
		  
	}
