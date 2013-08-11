// ----------------------------------------------------------
// *****************  风声 JS 菜单树 V1.00  *****************
// 作者：风声
// 版本：1.00
// 网站：http://www.fonshen.com
// 邮件：webmaster@fonshen.com
// 版权：版权全体,源代码公开,各种用途均可免费使用
// **********************************************************
// ----------------------------------------------------------
function _MenuTree(codeName, data, iconPath, target)
{
	// 必须赋值
	this.CodeName = codeName;
	this.Data = data;
	this.IconPath = iconPath ? iconPath : "";
	this.Target = target ? target : "_self";

	// 有默认值
	this.ClassName = null;
	this.IconName = "default";
	this.LastIconName = null;
	this.SwapMode = 0;

	// 只读
	this.Version = "Fonshen JS MenuTree V1.00.07.07.22";
	this.Self = null;

	// 当作 Private 属性
	this.ActiveLayer = null;
	this.ActiveLink = null;
	this.IsSwap = false;
	this.Ubound = data.length - 1;
	this.Links = null;
	this.Layers = null;
}

// ---- Public 绘制菜单树 ---- //
_MenuTree.prototype.Draw = function(obj, n)
{
	var sLastIconName = this.LastIconName ? this.LastIconName : this.IconName;
	var iNextDepth = -1, sMenuTree = "", arrIconClose = new Array();
	switch(this.SwapMode)
	{
		case 0: n = (n && n > 0) ? n : 0; break;
		case 1: n = 0; break;
		case 2: n = (n && n > 1) ? n : 1; break;
		case 3: n = 1; break;
	}
	for(var i=this.Ubound; i>-1; i--)
	{
		var bSwap = this.Data[i][0] < iNextDepth;
		var bOpen = iNextDepth <= n;
		var bLast = !arrIconClose[this.Data[i][0]];
		if(bLast)arrIconClose[this.Data[i][0]] = true;

		var sTemp = "<li><p class=\"MT_L" + this.Data[i][0] + "_ITEM\"";
		if(bSwap) sTemp += " onclick=\"" + this.CodeName + ".Swap(this, 2)\"";
		sTemp += "><img alt=\"\" src=\"" + this.IconPath;
		sTemp += this.Data[i][4] ? this.Data[i][4] : (bLast ? sLastIconName : this.IconName);
		sTemp += bSwap ? (bOpen ? "_open" : "_close") : "_leaf";
		sTemp += ".gif\" /><a";
		if(this.Data[i][2])
			sTemp += " onclick=\"" + this.CodeName + ".Mark(null, this)\" href=\"" + this.Data[i][2] + "\" target=\"" + (this.Data[i][5] ? this.Data[i][5] : this.Target) + "\"";
		else
			sTemp += " class=\"NONE\"";
		if(this.Data[i][3]) sTemp += " title=\"" + this.Data[i][3] + "\"";
		sTemp += ">" + this.Data[i][1] + "</a></p>";
		
		if(this.Data[i][0] > iNextDepth)
			for(var j=this.Data[i][0]; j>iNextDepth; j--)
				sTemp += "</li></ul><p class=\"MT_L" + j + "_FOOTER\"></p></div>";

		if(bSwap)
		{
			sTemp += "<div style=\"display:" + (bOpen ? "block" : "none") + "\" class=\"MT_L" + iNextDepth;
			if(bLast) sTemp += " LAST";
			sTemp += "\"><p class=\"MT_L" + iNextDepth + "_HEADER\"></p><ul class=\"MT_L" + iNextDepth + "_BODY\">";
			arrIconClose[iNextDepth] = false;
		}
		else
		{
			if(i != this.Ubound)sTemp += "</li>";
		}
		
		sMenuTree = sTemp + sMenuTree;
		iNextDepth = this.Data[i][0];
	}
	sMenuTree = "<p class=\"MT_L0_HEADER\"></p><ul class=\"MT_L0_BODY\">" + sMenuTree;
	sMenuTree = "<div id=\"" + this.CodeName + "\" class=\"" + (this.ClassName ? this.ClassName : this.CodeName) + "\">" + sMenuTree;

	if(obj)
		obj.innerHTML = sMenuTree;
	else
		document.write(sMenuTree);

	this.Self = document.getElementById(this.CodeName);
	this.Links = this.Self.getElementsByTagName("a");
}

// ---- Public 将链接标记为活动 ---- //
_MenuTree.prototype.Mark = function(absURL, oLink)
{
	// 搜索链接
	if(oLink)
	{
		if(oLink.parentNode.nextSibling)this.IsSwap = true;
	}
	else
	{
		var strUrl = "http://" + location.host + absURL.toLowerCase();
		for(var i=0; i<this.Links.length; i++)
		{
			if(this.Links[i].href.toLowerCase() == strUrl)break;
		}
		if(i == this.Links.length)return;
		oLink = this.Links[i];
	}

	// 改变链接样式
	if(this.ActiveLink)
	{
		if(oLink == this.ActiveLink)return;
		this.ActiveLink.className = null;
		var oActiveNode = this.ActiveLink.parentNode;
		oActiveNode.className = oActiveNode.className.split(" ")[0];
	}
	this.ActiveLink = oLink;
	this.ActiveLink.className = "ACTIVE";
	var oActiveNode = this.ActiveLink.parentNode;
	var sClassName = oActiveNode.className;
	oActiveNode.className = sClassName + " " + sClassName + "_ACTIVE";

	// 展开到该节点
	var oFrom = this.ActiveLink.parentNode.parentNode.parentNode.parentNode;
	var oEnd = this.Swaps(oFrom, this.Self, 1);
	if(this.SwapMode == 1 || this.SwapMode == 3)
	{
		this.Swaps(this.ActiveLayer, oEnd, 0);
		this.ActiveLayer = oFrom;
	}
}

// ---- Public 展开/关闭所有项 ---- //
_MenuTree.prototype.SwapAll = function(action)
{
	if(this.SwapMode == 1 || this.SwapMode == 3)return -1;
	if(!this.Layers) this.Layers = this.Self.getElementsByTagName("div");
	var j = action;
	for(var i = 0; i < this.Layers.length; i++)
		if(this.SwapMode == 0 || this.GetDepthByClassName(this.Layers[i].className) > 1)
			j = this.Swap(null, j, this.Layers[i]);
	return(j);
}

// ---- Public 修正菜单树 ---- //
_MenuTree.prototype.Modify = function()
{
	for(var i=0; i<this.Links.length; i++)
	{
		if(this.Links[i].href)
		{
			if(!this.Links[i].onclick)this.Links[i].setAttribute("onclick",this.CodeName + ".Mark(null, this)");
			if(!this.Links[i].target)this.Links[i].setAttribute("target", this.Target);
		}
	}
}

// ---- Private 展开/关闭项 ---- //
_MenuTree.prototype.Swap = function(obj, action, oLayer)
{
	if(this.IsSwap){ this.IsSwap = false; return; }
	oLayer = oLayer ? oLayer : obj.nextSibling;
	if(oLayer.style.display == "none")
	{
		if(action == 0)return(0);
		var oEnd = oLayer.parentNode.parentNode.parentNode;
		this.Swaps(oLayer, oEnd, 1);
		if(this.SwapMode == 1 || this.SwapMode == 3)
		{
			this.Swaps(this.ActiveLayer, oEnd, 0);
			this.ActiveLayer = oLayer;
		}
		return(1);
	}
	else
	{
		if(action == 1)return(1);
		this.ActiveLayer = oLayer.parentNode.parentNode.parentNode;
		if(this.SwapMode > 1 && this.ActiveLayer == this.Self)return(1);
		this.Swaps(oLayer,this.ActiveLayer, 0);
		return(0);
	}
}

// ---- Private 展开/关闭数项 ---- //
_MenuTree.prototype.Swaps = function(oFrom, oEnd, action)
{
	if(!oFrom)return(null);
	var sSuffix = action ? "_open.gif" : "_close.gif";
	var sDisplay= action ? "block" : "none";	
	for(var obj; oFrom!=oEnd; oFrom=obj)
	{
		obj = oFrom.parentNode.parentNode.parentNode;
		if(this.SwapMode == 3 && obj == this.Self)
		{
			if(action == 0)return;
			if(action == 1 && oFrom.style.display == sDisplay)continue;
		}
		if(oFrom.style.display == sDisplay)break;
		var icon = oFrom.previousSibling.firstChild;
		icon.src = this.AlterSuffix(icon.src,sSuffix);
		oFrom.style.display = sDisplay;
	}
	return(oFrom);
}

// ---- Private 更改字串后缀 ---- //
_MenuTree.prototype.AlterSuffix = function(str, suffix)
{
	return(str.replace(/_[^_]*$/,suffix));
}

// ---- Private 获取深度 ---- //
_MenuTree.prototype.GetDepthByClassName = function(sClassName)
{
	var reg = new RegExp("^MT_L(\\d+)", "i");
	if (reg.test(sClassName)) return parseInt(RegExp.$1);
	return -1;
}