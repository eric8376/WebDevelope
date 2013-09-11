/*function getParam(){var col=document.all.tags("script");var jsrc=col.item(col.length-1).src;return((jsrc.indexOf("?")!=-1)?jsrc.substr(parseInt(jsrc.indexOf("?"))+1,jsrc.length):null);}
var suffParam=getParam();
document.write("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" background=\""+gWebAbsPath+"/images/main_top_bg.gif\"><tr>");
document.write("<td valign=\"bottom\"><img src=\""+gWebAbsPath+((suffParam)?"/images/icon/"+suffParam:"/images/icon/def_title.gif")+"\" align=\"absbottom\"><span style=\"font-size:13px;font-weight:bold; FILTER:Dropshadow(color=#F7F7F7, Offx=1, OffY=1, Positive=1)\" id=\"topTitle\">"+document.title+"</span></td>");
document.write("</tr><tr><td bgcolor=\"#BBBBBB\"><spacer height=\"1\" type=\"block\"></td></tr>");
document.write("<tr><td height=\"8\"><spacer height=\"1\" type=\"block\"></td></tr></table>");
suffParam = null;
*/
var gWebAbsPath = "/DispatchDesign";
document.body.insertAdjacentHTML('afterBegin','<div id="p_o_p_9" style="top:'+ (parseInt(document.body.offsetHeight)/2-55) +'; left:'+ (parseInt(document.body.offsetWidth)/2-130) +'; height:26px; background-color:#FFFFE7; display:none; position:absolute; z-index:3;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="240" height="100"><param name=movie value="'+gWebAbsPath+'/images/main/loading.swf"><param name=quality value=high><embed src="'+gWebAbsPath+'/images/main/loading.swf" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="240" height="100"></embed></object></div>');