/*
取中文长度
*/
String.prototype.length2 = function() {
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
}

/* 去掉空格 */
String.prototype.trim = function() {
   return this.replace(/(^\s*)|(\s*$)/g, "");
}

function Trim(s){return s.replace(/(^\s*)|(\s*$)/g, "");}

/* 文字转日期 */
function StringToDate(s){
  var aD = s.split(/[\/\-: ]/);
  if(aD.length<3)return null;
  if(aD.length<4) aD[3]=aD[4]=aD[5]="00";
  var d = new Date(aD[0],parseInt(aD[1]-1),aD[2],aD[3],aD[4],aD[5]);
  if(isNaN(d))return null;
  return d;
}

String.prototype.toInt = function(){
	return parseInt(this,10);
}

/*如果字符为null，替换 */
function NullRepl(inStr, repStr){return (inStr!=null)? inStr : repStr;}

/*如果字符为空，替换null */
function BlankRepl(inStr){return (Trim(inStr)=='')? null : inStr;}


