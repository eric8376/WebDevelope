	function Tabs(mainContainerID,tabTitles,activeTab,additionalTab,_prefDir,fcts)
	{

		 this.tabDivParent;
		 this.tabDiv;
		 this.tabDivCount = 0;
		 var _this = this;
		 this.init= function(){
	   this.tabDivParent =document.getElementById(mainContainerID);
	   this.tabDiv =document.createElement('DIV');
	   this.tabDiv.className="tabPane";
	   if(!this.tabDivParent.firstChild){
	   	this.tabDivParent.appendChild(this.tabDiv);
	   }else{
	   this.tabDivParent.insertBefore(this.tabDiv,this.tabDivParent.firstChild);
	   }
	   var spaceTab = document.createElement('div');
	  
	   spaceTab.className="spaceTab";
	   this.tabDiv.appendChild(spaceTab);
		 for(var no=0;no<tabTitles.length;no++){
			var contentDivId="";
			var clk=null;
			if((typeof additionalTab != "undefined") && (typeof additionalTab == "object") && (additionalTab!=null) && (additionalTab.constructor == Array)){
			 if(typeof additionalTab[no]!="undefined")
			    contentDivId=additionalTab[no];
			}
			if((typeof fcts != "undefined") && (typeof fcts == "object") && (fcts!=null) && (fcts.constructor == Array)){
			 if(typeof fcts[no]!= "undefined" && typeof fcts[no]=="function"){
			   clk=fcts[no];
			 }
			}
			this.addTab(tabTitles[no],contentDivId,clk);
		}	
		 if(typeof activeTab != "undefined" && activeTab!=null && parseInt(activeTab,10)>=0){
		 	this.setActiveTab(parseInt(activeTab,10));
		}
		 };

	  this.addTab = function(tabText,divId,clk){
			var aTab = document.createElement('DIV');
			aTab.id = 'tabTab' + mainContainerID + "_" +this.tabDivCount;
			aTab.className='tabInactive';
			
			var span = document.createElement('div');
			span.innerHTML = tabText;
			span.className = "tabText";
			aTab.appendChild(span);
			
			var spanRight = document.createElement('div');
			spanRight.style.position = 'relative';
			spanRight.className="rdiv";
			aTab.appendChild(spanRight);
			
			var rspaceTab = document.createElement('div');
	        rspaceTab.className="rspaceTab";
	 
	    
	    
			aTab.style.cursor = 'pointer';
			if(document.getElementById("tabTab" + mainContainerID + "_BUTTON")){
				
				this.tabDiv.insertBefore(rspaceTab,document.getElementById("tabTab" + mainContainerID + "_BUTTON"));
				this.tabDiv.insertBefore(aTab,document.getElementById("tabTab" + mainContainerID + "_BUTTON"));
			}else{
			 this.tabDiv.appendChild(rspaceTab);
			 this.tabDiv.appendChild(aTab);
		  }
			var contentDivElement;
			if(typeof divId !="undefined"  &&  document.getElementById(divId)!=null ){
			  contentDivElement=document.getElementById(divId);
			}else{
				contentDivElement = document.createElement("DIV");
				contentDivElement.id='tabTab' + mainContainerID + "_" +this.tabDivCount+"_cDiv";
				this.tabDivParent.appendChild(contentDivElement);
			}
			//contentDivElement.className="contentDiv";
            contentDivElement.style.display="none";
			aTab.style.contentDivId=contentDivElement.id;
			
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
            var tabs = this.parentNode.childNodes;	
           for(j=0;j<tabs.length;j++){
      	   if(tabs[j].tagName=="DIV"){
      	 	 if(tabs[j] != this &&  tabs[j].className.indexOf("tabActive")>=0){
      	 	  tabs[j].className="tabInactive";
      	 	  document.getElementById(tabs[j].style.contentDivId).style.display="none";
      	 	  
      	 	}
      	}
      }
      
      this.className="tabActive";
      document.getElementById(this.style.contentDivId).style.display="block";
     if((typeof clk != "undefined") &&  (clk!=null))
        clk();
			//if((typeof clk != "undefined") && (typeof clk == "object") && (clk!=null) && (typeof clk == "function")){
			
			//		clk();}
	};	 
			
	  	this.tabDivCount++;
	  	this.setActiveTab(this.tabDivCount-1);
	  	return aTab;
	  }; 

    this.deleteTab = function(tabIndex){
    	
    if(tabIndex<0 || this.tabDivCount<=0 || tabIndex >= this.tabDivCount)return;
    
     var tabs = this.tabDiv.childNodes;	
     var tabCount=-1;
      for(j=0;j<tabs.length;j++){
      	 if(tabs[j].tagName=="DIV"){
      	 	 if(tabs[j].className.indexOf("tabActive")>=0 || tabs[j].className.indexOf("tabInactive")>=0){
      	 	    tabCount++;
      	 	 if(tabCount==tabIndex ){
      	 	 	var isActiveTab=false;
      	 	 	if(tabs[j].className.indexOf("tabActive")>=0) isActiveTab=true;
      	 		this.tabDivParent.removeChild(document.getElementById(tabs[j].style.contentDivId));
      	 		this.tabDiv.removeChild(tabs[j]);
      	 		this.tabDivCount--;
      	 		
      	 		if(isActiveTab==true)	this.setActiveTab(0);
      	 	  break;
      	 	}}}}    
      };  
    this.deleteTabDiv = function(tabDiv){
      	 	 	if(typeof tabDiv.className && tabDiv.className.indexOf("tabActive")>=0) isActiveTab=true;
      	 		this.tabDivParent.removeChild(document.getElementById(tabDiv.style.contentDivId));
      	 		this.tabDiv.removeChild(tabDiv);
      	 		this.tabDivCount--;
      	 		if(isActiveTab==true)	this.setActiveTab(0);
      };  
      
		this.setActiveTab = function(tabIndex){
     if(tabIndex<0 || this.tabDivCount<=0 || tabIndex >= this.tabDivCount)return;
     var tabs = this.tabDiv.childNodes;	
     var tabCount=-1;
      for(j=0;j<tabs.length;j++){
      	 if(tabs[j].tagName=="DIV"){
      	 	 if(tabs[j].className.indexOf("tabInactive")>=0){
      	 	    tabCount++;
      	 	if(tabCount==tabIndex){
      	 		tabs[j].className="tabActive";
      	 		document.getElementById(tabs[j].style.contentDivId).style.display="block";
      	 	}
      	 	}else if(tabs[j].className.indexOf("tabActive")>=0){
      	 		tabCount++;
      	 		if(tabCount==tabIndex)break;
      	 		tabs[j].className="tabInactive";
      	 		document.getElementById(tabs[j].style.contentDivId).style.display="none";
      	 	}}}     	
      };
      		    
	  this.getActiveTab=function(){
     var tabs = this.tabDiv.childNodes;	
     var tabCount=-1;
      for(j=0;j<tabs.length;j++){
      	 if(tabs[j].tagName=="DIV"){
      	 	 if(tabs[j].className.indexOf("tabInactive")>=0 ){
      	 	    tabCount++;
      	 	}else if(tabs[j].className.indexOf("tabActive")>=0){
      	 		tabCount++;
      	 		return tabCount;
      	 		break;
      	 	}
      	 	}
      	}
      	return -1;
	    };
	    
		this.addButton = function(btName,btfunction){
			 var aTab;
			if(!document.getElementById("tabTab" + mainContainerID + "_BUTTON")){
		  aTab = document.createElement('DIV');
		  aTab.className="btnTab";
		  this.tabDiv.appendChild(aTab);
		  aTab.id="tabTab" + mainContainerID + "_BUTTON"
		  }else{
		  	aTab=document.getElementById("tabTab" + mainContainerID + "_BUTTON");
		  }
	    aTab.style.isButton = "true";
		  var btn=document.createElement("button");
		  //btn.className="buttonClass";
		  btn.className="button_blue";
		  btn.innerHTML=btName;
		  btn.onclick=function (){
		  btfunction();
		  }
		  aTab.appendChild(btn);
		};
   this.init();	  
	}
