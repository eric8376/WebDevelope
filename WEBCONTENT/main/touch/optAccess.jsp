<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
    <HEAD>
        <TITLE>接入点上联光缆拓扑图</TITLE>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       <script language="javascript" src="<%=request.getContextPath()%>/inc/json/json.js"></script>
       <link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/ext-touch.css" type="text/css" media="screen">
      <link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchGridPanel.css" type="text/css" media="screen">
      <script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/ext-touch.js"></script>
      <script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchGridPanel.js"></script>
    </HEAD>
    <style>
		<!--
			html, body{
				width: 100%;
        		height: 100%;
        		margin: 0px;
        		overflow: hidden;				
			}
		-->
		.edit_table_td	     
			{  
			    //border: 1px #ffffff solid ; 
			    //font-size: 13px;  
			    //color: #660066;
			    //font-weight: bold
			    padding-right: 4px;
				padding-top: 4px;
				padding-bottom: 4px;
				background-color: #e4efff;
				text-align: right;
				font-size: 9pt;
				//word-break: keep-all;
			    			    
			}
			
			.btn{
			BORDER-RIGHT: #7b9ebd 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #7b9ebd 1px solid; PADDING-LEFT: 2px; FONT-SIZE: 12px; FILTER: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#ffffff, EndColorStr=#cecfde); BORDER-LEFT: #7b9ebd 1px solid; CURSOR: hand; COLOR: black; PADDING-TOP: 2px; BORDER-BOTTOM: #7b9ebd 1px solid
			;vertical-align:middle;}
			.btn1{
			BORDER-RIGHT: #7b9ebd 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #7b9ebd 1px solid; PADDING-LEFT: 2px; FONT-SIZE: 12px; FILTER: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#3366FF, EndColorStr=#cecfde); BORDER-LEFT: #7b9ebd 1px solid; CURSOR: hand; COLOR: black; PADDING-TOP: 2px; BORDER-BOTTOM: #7b9ebd 1px solid
			;vertical-align:middle;}
			.btn1_mouseout{
			BORDER-RIGHT: #7EBF4F 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #7EBF4F 1px solid; PADDING-LEFT: 2px; FONT-SIZE: 12px; FILTER: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#ffffff, EndColorStr=#B3D997); BORDER-LEFT: #7EBF4F 1px solid; CURSOR: hand; COLOR: black; PADDING-TOP: 2px; BORDER-BOTTOM: #7EBF4F 1px solid
			}
			.btn1_mouseover{
			BORDER-RIGHT: #7EBF4F 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #7EBF4F 1px solid; PADDING-LEFT: 2px; FONT-SIZE: 12px; FILTER: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#ffffff, EndColorStr=#CAE4B6); BORDER-LEFT: #7EBF4F 1px solid; CURSOR: hand; COLOR: black; PADDING-TOP: 2px; BORDER-BOTTOM: #7EBF4F 1px solid
			}
	</style>
     <BODY onload="initMap();">
     	<div id="coverdiv"  style="display:none; z-index:1000;filter:alpha(opacity=30);Opacity:0.3; background-color:#F8F4E2; position:absolute; left:0px; top:0px;width:100%;height:98%"></div>
		<div id="coverdiv-loading" style="display:none; z-index:1001; position:absolute; left:20px; top:200px;"><img src="./images/loading.gif"/>拓扑图加载...</div>
		<div  width="100%" height="8%">
			<table class="edit_table_td" border="2" width="100%" style="width: 100%;" cellspacing="0" cellpadding="0" border="1" bordercolordark="#f8f8f8" bordercolorlight="#A2C4DD">
				<tr>
				<td width="25%" align="center">
				<font color="red">请选择机房或光交：</font><input id="cenPoint" style="vertical-align:middle;" readonly="readonly" >&nbsp;&nbsp;
				<input type="button" onclick="queHouse()" value="查询" class="btn"> 
				</td>
				<td width="15%" align="center">
				<font color="red">请选择搜索层数：</font><select id="hierarchy" name="hierarchy" style="vertical-align:middle;width: 70">
									<option value="1" selected="selected" >1</option>
									<option value="2" >2</option>
									<option value="3" >3</option>
								    </select>
				</td>
				<td width="" align="left" >&nbsp;&nbsp;
				<input type="button" onclick="serRout()" value="显示拓扑图" class="btn1"> 

		        </td>
				</tr>
				<input type="hidden" id="rootId" name="rootId" >
				<input type="hidden" id="topoDefId" name="topoDefId" value="430016">
				<input type="hidden" id="hierarchy" name="hierarchy" value="1">
				<input type="hidden" id="typeId" name="typeId" >
			</table>
			
		
		</div>
		<div  id="show" width="100%" height="90%" id="tab4" style="display:">
		 <iframe name="tuopFrame2" id="tuopFrame2" src="" frameborder=0 width="100%" height="95%" scrolling="auto"></iframe>
		</div>
	</BODY>
	<script type="text/javascript">
	
	
	
	   
		var selectMAPLAYER_ID,lastSelectMAPLAYER_ID;
		
		function initMap(){
		    //var housName="长宁临空";
			//document.getElementById("cenPoint").value=housName;
			//housName=encodeURIComponent(housName);
			//var url="<%=request.getContextPath()%>/list/routeSearch?action=initMap&housName="+housName;
         	//dhtmlxAjax.get(url,function(loader){
    		//alert(loader.xmlDoc.responseText);
    		//var ROOT_id =loader.xmlDoc.responseText;
    		//document.getElementById("RootId").value=ROOT_id;
    		//document.getElementById("typeId").value=205;
    		//serRout();
			//});
		}
        function queHouse(){
        //var url="openRouteTab.jsp";
		//showOpen(url,700,460);
        }
        
        function fillCenPnt(cenPnt,cenPntId,is_house){
        	document.getElementById("cenPoint").value=cenPnt;
        	document.getElementById("rootId").value=cenPntId;
        	if(is_house==1)
        	document.getElementById("typeId").value=205;
        	else
        	document.getElementById("typeId").value=703;
        	
        }
        function showOpen(url,width,height){
           // show(1);return;
            var sw,sh,w,h,pra;
            w=width;
            h=height;
            sw=Math.floor((window.screen.width/2-w/2));
			sh=Math.floor((window.screen.height/2-h/2));
			pra="edge: Raised; center: Yes; help: no; resizable: No; status: No;dialogHeight:"+height+"px;dialogWidth:"+width+"px";
			//pra="height="+h+", width="+w+", top="+sh+", left="+sw+"menubar=no, scrollbars=yes, resizable=no,location=no, status=no";
			//var win=window.open(url,"",pra,true);
			//window.showModalDialog("openReOptInfo.jsp?opt_sect_id="+opt_sect_id,"",'edge: Raised; center: Yes; help: no; resizable: Yes; status: No;dialogHeight:600px;dialogWidth:900px');
			//window.showModalDialog(url,"",pra,true);
			window.showModalDialog(url,window,pra,true);
           // window.focus();//解决window.open 不正确弹出问题。
            //win.focus();
            }
         function serRout(){

         	var rootId =document.getElementById("rootId").value;
         	rootId='000102050000000000010767';
         	
         	if(rootId==null||rootId==""){
         	alert("请选择接入点名称");
         	return;
         	}
         	
         	var hierarchy=document.getElementById("hierarchy").value;
         	var typeId=document.getElementById("typeId").value;
         	var topoDefId=document.getElementById("topoDefId").value;
         	typeId='205';
         	var serviceCall = new ServiceCall();
   			
			serviceCall.init("topoService","queryOpticalMaplayerId");
			selectMAPLAYER_ID=serviceCall.execute( rootId, hierarchy, typeId, topoDefId);
			alert(selectMAPLAYER_ID);
			if(selectMAPLAYER_ID!=lastSelectMAPLAYER_ID)
			{
			lastSelectMAPLAYER_ID=selectMAPLAYER_ID;
         	frames["tuopFrame2"].location.href ="testTwaverOptAccessTopo.jsp";
         	}
         	
         }
         
        function coverdivIsShow(isShow){
		 if(typeof(isShow)=="undefined"||isShow==null||isShow==false){
		  document.getElementById("coverdiv").style.display="none";
		  document.getElementById("coverdiv-loading").style.display="none";
		 }else{
		 //////alert("begin cover");
		  document.getElementById("coverdiv").style.display="block";
		  document.getElementById("coverdiv-loading").style.display="block";
		  ////alert("end cover");
		 }
		}
		function testload(){			
			//window.moveTo(300,300);
			//window.resizeTo(500,350);
					
		}
		function showOver(obj){
			//obj.style.borderStyle="inset"; 
			obj.style.cursor="hand";
		}
		function showOut(obj){
			//obj.style.borderStyle="outset"; 
		}
       
	</script>
     </HTML>
