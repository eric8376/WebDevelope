/*
 * This source code is part of TWaver Web 4.0
 * 
 * Serva Software PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * Copyright 2004 - 2010 Serva Software. All rights reserved.
 */
var isOpera, isWebkit, isMobileSafari, isChrome, isIE, isGecko, isIE7, isIE9, isFirefox, isFirefox3_6, isIPod, isIPad, isIPhone, isAndroid, isWebOS, hasTouchSupport, isMobile, isMac;
(function checkBrowser() {
	if (!navigator)
		return;
	var $ = navigator.userAgent.toLowerCase();
	isOpera = (/opera/).test($);
	isWebkit = (/webkit|khtml/).test($);
	isIE = !isOpera && (/msie/).test($);
	isIE7 = !isOpera && $.indexOf("msie 7") > -1;
	isIE9 = !isOpera && $.indexOf("msie 9") > -1;
	isGecko = !isWebkit && $.indexOf("gecko") > -1;
	isFirefox3_6 = $.indexOf("firefox/3.6") > -1;
	isFirefox = (/firefox/i).test($);
	isChrome = (/chrome/i).test($);
	isIPhone = (/iphone/).test($);
	isIPod = (/ipod/).test($) || isIPhone;
	isIPad = (/ipad/).test($);
	isAndroid = $.match(/android/i);
	isWebOS = $.match(/webos/i);
	hasTouchSupport = (isIPod || isIPhone || isAndroid || isWebOS || isIPad);
	isMobile = hasTouchSupport;
	isMobileSafari = isIPod || isIPad;
	isMac = (/macintosh|mac os x/).test($)
})();
if (isIE && !isIE7) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {
	}
}
TWaver = {
	debug : true,
	version : "4.0",
	apply : function(B, _, $) {
		if ($)
			TWaver.apply(B, $);
		if (B && _ && typeof _ == "object")
			for (var A in _)
				B[A] = _[A];
		return B
	},
	applyIf : function(A, $) {
		if (A && $)
			for (var _ in $)
				if (typeof A[_] == "undefined")
					A[_] = $[_];
		return A
	},
	override : function(B, $) {
		if ($) {
			var _ = B.prototype;
			for (var A in $)
				_[A] = $[A]
		}
	},
	extend : function(D, C, B) {
		if (!(D instanceof Function))
			throw new Error("subclass must be type of Function");
		var A = null;
		if (typeof C == "object") {
			A = C;
			C = D;
			D = function() {
				C.apply(this, arguments)
			}
		}
		var _ = D.prototype, $ = function() {
		};
		$.prototype = C.prototype;
		D.prototype = new $();
		D.superclass = C.prototype;
		D.superclass.constructor = C;
		TWaver.override(D, _);
		if (A)
			TWaver.override(D, A);
		if (B)
			TWaver.override(D, B);
		return D
	}
};
TWaver.Event = function(_, $) {
	this.name = $;
	this.obj = _;
	this.listeners = [];
	this.createListener = function(A, $) {
		$ = $ || this.obj;
		var _ = {
			fn : A,
			scope : $
		};
		_.fireFn = A;
		return _
	};
	this.isListening = function(_, $) {
		return this.findListener(_, $) >= 0
	};
	this.findListener = function(C, $) {
		$ = $ || this.obj;
		var _ = this.listeners;
		for (var D = 0, B = _.length; D < B; D++) {
			var A = _[D];
			if (A.fn == C && A.scope == $)
				return D
		}
		return -1
	};
	this.addListener = function(_, $) {
		if (!this.isListening(_, $))
			this.listeners.push(this.createListener(_, $))
	};
	this.removeListener = function(A, _) {
		var $ = this.findListener(A, _);
		if ($ >= 0)
			this.listeners.splice($, 1)
	};
	this.fireEvent = function(A) {
		var _ = this.listeners, $, C = _.length;
		if (C > 0) {
			this.firing = true;
			for (var D = 0; D < C; D++) {
				var B = _[D];
				if (B.fireFn.apply(B.scope || this.obj || window, arguments) === false) {
					this.firing = false;
					return false
				}
			}
			this.firing = false
		}
		return true
	};
	this.destroy = function() {
		delete this.name;
		delete this.obj;
		delete this.listeners
	}
};
TWaver.EventDispatcher = function($) {
	if ($)
		TWaver.apply(this, $);
	this.events = {};
	TWaver.Utils.addEventListener(window, "beforeunload", TWaver.Utils
					.createEventFunction(this, this.destroy))
};
TWaver.EventDispatcher.prototype = {
	events : null,
	addEvents : function() {
	},
	getEvent : function(_, A) {
		_ = _.toLowerCase();
		if (!this.events)
			this.events = {};
		var $ = this.events[_];
		if (!$ && A) {
			$ = new TWaver.Event(this, _);
			this.events[_] = $
		}
		return $
	},
	fireEvent : function(A, _) {
		if (_ && !_.source)
			_.source = this;
		var $ = this.getEvent(A, true);
		return $.fireEvent(_)
	},
	on : function(B, A, $) {
		var _ = this.getEvent(B, true);
		_.addListener(A, $)
	},
	un : function(B, A, $) {
		var _ = this.getEvent(B);
		if (_)
			_.removeListener(A, $)
	},
	destroy : function() {
		if (!this.events)
			return;
		for (var _ in this.events) {
			var $ = this.events[_];
			if ($ instanceof TWaver.Event)
				$.destroy()
		}
		delete this.events;
		if (isIE)
			CollectGarbage()
	},
	toString : function() {
		return "TWaver.EventDispatcher"
	}
};
TWaver.Const = {
	BASE_PATH : "./twaver/",
	NS_XHTML : "http://www.w3.org/1999/xhtml",
	NS_SVG : "http://www.w3.org/2000/svg",
	NS_XLINK : "http://www.w3.org/1999/xlink",
	nullFunction : function() {
		return false
	},
	BLANK_SVG : "resource/blank.svg",
	CURSOR_XOFFSET : 8,
	CURSOR_YOFFSET : 12
};
var hasSVGSupport;
if (isIE && !isIE9) {
	try {
		new ActiveXObject("Adobe.SVGCtl");
		hasSVGSupport = true
	} catch (e) {
		hasSVGSupport = false
	}
} else
	hasSVGSupport = true;
TWaver.Utils = {
	isNull : function($) {
		return $ === null || $ === undefined
	},
	toString : function(A) {
		if (!A || TWaver.Utils.isString(A))
			return A;
		if (TWaver.Utils.isArray(A)) {
			var $ = "";
			for (var B = 0; B < A.length; B++) {
				var _ = A[B];
				$ += (B == 0 ? "" : ";") + TWaver.Utils.toString(_)
			}
			return $
		}
		return A.toString()
	},
	getBody : function() {
		if (document.body)
			return document.body;
		var $ = document.getElementsByTagName("body");
		if ($ && $.length > 0)
			return $.item(0);
		return document.documentElement
	},
	trace : function(A) {
		if (!TWaver.debug)
			return;
		if (!TWaver.Utils.isString(A))
			A = TWaver.Utils.getDetail(A);
		if (isIPhone || isIPod) {
			console.log(A);
			return
		}
		var B = TWaver.DebugTextArea;
		if (!B) {
			var _ = TWaver.Utils.getBody();
			if (!_)
				return;
			var $ = TWaver.Utils.createHTMLElement("div");
			TWaver.Utils.setClassAttribute($, "twaver_debug");
			B = TWaver.Utils.createHTMLElement("textarea");
			TWaver.DebugTextArea = B;
			var D = TWaver.Utils.createHTMLElement("button");
			D.innerHTML = "Hidden";
			var C = TWaver.Utils.createHTMLElement("button");
			C.innerHTML = "Clear";
			C.onclick = function() {
				TWaver.DebugTextArea.value = ""
			};
			D.onclick = function() {
				if (B.style.display != "none") {
					B.style.display = "none";
					C.style.display = "none";
					D.innerHTML = "Show<br>Log";
					$.style.height = "30px";
					$.style.width = "50px"
				} else {
					B.style.display = isIE ? "" : null;
					C.style.display = isIE ? "" : null;
					D.innerHTML = "Hidden";
					$.style.height = null;
					$.style.width = null
				}
			};
			$.appendChild(D);
			$.appendChild(C);
			$.appendChild(B);
			_.appendChild($)
		}
		B.value += A + "\n";
		B.scrollTop = B.scrollHeight
	},
	getDetail : function(H, I, K, D, E, F) {
		if (!H || TWaver.Utils.isString(H) || TWaver.Utils.isNumber(H)
				|| TWaver.Utils.isBoolean(H))
			return H;
		var J = I ? "<br>" : (isIPhone || isIPod ? " ; " : "\n"), G, A, $ = 0;
		for (var B in H) {
			if (!B)
				continue;
			if (K && (B.toString().indexOf(K) < 0))
				continue;
			var C;
			try {
				C = H[B]
			} catch (_) {
				continue
			}
			if (C && C instanceof Function) {
				if (!D)
					C = "[Function]"
			} else if (E)
				continue;
			if (G)
				G += J + B + " : " + C;
			else
				G = B + " : " + C;
			if (F > 0) {
				$++;
				if ($ >= F) {
					if (!A)
						A = [];
					A.push(G + J + J + "and more...");
					$ = 0;
					G = null
				}
			}
		}
		if (A) {
			if (G)
				A.push(G);
			return A
		}
		return G
	},
	alert : function(_, B, $, A) {
		_ = TWaver.Utils.getDetail(_, false, B, $, A, hasSVGSupport ? 15 : 30);
		if (!_) {
			alert(_);
			return
		}
		if (_ instanceof Array) {
			for (var C = 0; C < _.length; C++)
				alert(_[C]);
			return
		}
		alert(_)
	},
	getLoadingSVGUrl : function() {
		if (!TWaver.Const.BASE_PATH || TWaver.Const.BASE_PATH.length == 0)
			return TWaver.Const.BLANK_SVG;
		if (TWaver.Const.BASE_PATH.charAt(TWaver.Const.BASE_PATH.length - 1) != "/")
			TWaver.Const.BASE_PATH += "/";
		return TWaver.Const.BASE_PATH + TWaver.Const.BLANK_SVG
	},
	createSVGEmbedNode : function(_) {
		if (!_)
			_ = TWaver.Utils.getLoadingSVGUrl();
		var $ = TWaver.Utils.createHTMLElement("embed");
		$.src = _;
		$.setAttribute("type", "image/svg+xml");
		$.setAttribute("width", "100%");
		$.setAttribute("left", "0px");
		$.setAttribute("top", "0px");
		$.setAttribute("height", "100%");
		$.setAttribute("wmode", "transparent");
		$.setAttribute("pluginspage",
				"http://www.adobe.com/svg/viewer/install/");
		return $
	},
	createSVGDocument : function(D, B) {
		if (isIE && !isIE9) {
			if (!hasSVGSupport) {
				var $ = TWaver.Utils.createHTMLElement("div");
				$.setAttribute("class", "no_svg");
				$.style.width = "100%";
				$.style.height = "100%";
				D.appendChild($);
				$.innerHTML = "<p>Your browser does not support Scalable Vector Graphics. If you install the \n"
						+ "<a\n"
						+ "href=\"http://www.adobe.com/svg/viewer/install/auto/\"\n"
						+ "title=\"Adobe SVG Viewer Download Area\"\n"
						+ ">Adobe SVG Viewer</a>, or upgrade to an\n"
						+ "<a\n"
						+ "href=\"http://www.mozilla.org/projects/svg/\"\n"
						+ "title=\"Mozilla SVG Project\"\n"
						+ ">SVG-compatible web browser</a>\n" + "</p>";
				return
			}
			var C = TWaver.Utils.createSVGEmbedNode();
			TWaver.Utils.setClassAttribute(C, "svg_component");
			D.appendChild(C);
			var A = function(_, $) {
				if (_.window)
					$(_);
				else
					setTimeout(function() {
								A(_, $)
							}, 200)
			};
			A(C, function($) {
						if (B instanceof Function)
							B($.window.document.documentElement,
									$.window.document, $)
					})
		} else {
			var _ = document.createElementNS(TWaver.Const.NS_SVG, "svg");
			TWaver.Utils.setClassAttribute(_, "svg_component");
			_.setAttribute("xmlns", TWaver.Const.NS_SVG);
			_.setAttribute("xmlns:xlink", TWaver.Const.NS_XLINK);
			_.setAttribute("width", "100%");
			_.setAttribute("height", "100%");
			TWaver.Utils.initializeSVG(_);
			D.appendChild(_);
			B(_, _.ownerDocument, null)
		}
	},
	initializeSVG : function(_) {
		var B = document.createElementNS(TWaver.Const.NS_SVG, "rect");
		B.setAttribute("width", "100%");
		B.setAttribute("height", "100%");
		B.setAttribute("fill", "rgb(224,224,225)");
		_.appendChild(B);
		var A = document.createElementNS(TWaver.Const.NS_SVG, "text");
		A.setAttribute("x", "45%");
		A.setAttribute("y", "45%");
		var $ = document.createTextNode("loading...");
		A.appendChild($);
		_.appendChild(A)
	},
	getPageOffset : function() {
		if (isWebkit)
			return {
				x : window.pageXOffset,
				y : window.pageYOffset
			};
		var $ = document.documentElement.clientWidth == 0
				? document.body
				: document.documentElement;
		return {
			x : $.scrollLeft - $.clientLeft,
			y : $.scrollTop - $.clientTop
		}
	},
	getOffset : function($) {
		if (!$)
			return TWaver.Utils.getPageOffset();
		var _ = 0, A = 0;
		while ($.offsetParent) {
			_ += $.clientLeft + $.offsetLeft - $.scrollLeft;
			A += $.clientTop + $.offsetTop - $.scrollTop;
			$ = $.offsetParent
		}
		return {
			x : _,
			y : A
		}
	},
	getMousePageLocation : function($, _) {
		if (isIE) {
			var A = TWaver.Utils.getOffset(_);
			return {
				x : $.clientX + (A.x ? A.x : 0),
				y : $.clientY + (A.y ? A.y : 0)
			}
		}
		return {
			x : $.pageX,
			y : $.pageY
		}
	},
	getMouseLayerLocation : function($, _) {
		if (isOpera) {
			var A = TWaver.Utils.getOffset($.currentTarget);
			return {
				x : $.pageX - A.x,
				y : $.pageY - A.y
			}
		}
		if (isIE)
			return {
				x : $.x || $.clientX,
				y : $.y || $.clientY
			};
		if ($.touches)
			$ = $.touches[0];
		if (isWebkit && _)
			return hasTouchSupport ? {
				x : $.clientX + _.scrollLeft,
				y : $.clientY + _.scrollTop
			} : {
				x : $.layerX + _.scrollLeft,
				y : $.layerY + _.scrollTop
			};
		return {
			x : $.layerX,
			y : $.layerY
		}
	},
	getMouseViewportLocation : function(_, A) {
		if (!A)
			A = TWaver.Utils.getBody();
		var $ = TWaver.Utils.getMouseLayerLocation(_, A);
		$.x -= A.scrollLeft;
		$.y -= A.scrollTop;
		return $
	},
	clearChildren : function(_) {
		if (!_)
			return;
		if (_.innerHTML) {
			_.innerHTML = "";
			return
		}
		while (_.childElementCount > 0) {
			var $ = _.childNodes.item(0);
			if (isIE) {
				$.onmousedown = null;
				$.onmouseover = null;
				$.onmouseout = null;
				$.onclick = null;
				$.oncontextmenu = null
			}
			_.removeChild($)
		}
	},
	createHTMLElement : function($) {
		if (isIE)
			return document.createElement($);
		return document.createElementNS(TWaver.Const.NS_XHTML, $)
	},
	createElement : function(A, _, B, C) {
		var $ = (_ == null) ? A.createElement(B) : A.createElementNS(_, B);
		if (C)
			TWaver.Utils.setAttributes($, C);
		return $
	},
	eventPreventDefault : function($) {
		if (!$)
			$ = window.event;
		if ($.preventDefault)
			$.preventDefault();
		else
			$.returnValue = false
	},
	eventStopPropagation : function($) {
		if (!$)
			$ = window.event;
		if ($.stopPropagation)
			$.stopPropagation();
		else if (!$.cancelBubble)
			$.cancelBubble = true
	},
	stopEvent : function($) {
		TWaver.Utils.eventPreventDefault($);
		TWaver.Utils.eventStopPropagation($)
	},
	getEvent : function($) {
		if (!$)
			$ = window.event;
		return $
	},
	setClassAttribute : function($, _) {
		if (isIE)
			$.setAttribute("className", _);
		$.setAttribute("class", _)
	},
	addEventListener : function(B, A, _, $) {
		if (!B || !A || !_)
			return;
		if (B.addEventListener)
			B.addEventListener(A, _, ($ ? true : false));
		else if (B.attachEvent)
			B.attachEvent("on" + A, _)
	},
	createFunction : function(A, $) {
		var _ = [];
		if (!A)
			A = window;
		if (arguments.length > 2)
			for (var B = 2; B < arguments.length; B++)
				_.push(arguments[B]);
		return function() {
			var B = [].concat(_);
			for (var C = 0; C < arguments.length; C++)
				B.push(arguments[C]);
			return $.apply(A, B)
		}
	},
	createEventFunction : function(_, $) {
		return function(A) {
			$.call(_, A)
		}
	},
	getEventTarget : function(A) {
		var _ = A.target;
		if (!isIE) {
			var $ = _.correspondingUseElement;
			if ($)
				_ = $
		}
		return _
	},
	setSVGCTM : function(_, $, A) {
		if (!_ || !$)
			return;
		if (A && $.inverse)
			$ = $.inverse();
		var B = "matrix(" + $.a + " " + $.b + " " + $.c + " " + $.d + " " + $.e
				+ " " + $.f + ")";
		_.setAttribute("transform", B);
		return B
	},
	getSVGChildByIndex : function(_, $) {
		if (!_ || $ < 0)
			throw new Error("SVGElement can't be null or index must be a positive integer");
		if (isOpera || isGecko)
			return _.children[$];
		else {
			var A = _.childNodes;
			for (var B = 0; B < A.length; B++)
				if (A.item(B).tagName) {
					if ($ == 0)
						return A.item(B);
					$--
				}
		}
		return null
	},
    getFirstElementChildByTagName : function(parentNode, tagName){
        if(!TWaver.Utils.isString(tagName)){
            throw new Arror('Tag name can not be null');
        }
        tagName = tagName.toUpperCase();
        var element = isIE ? parentNode.firstChild : parentNode.firstElementChild;
        while(element && (element.nodeType != 1 || (element.tagName && element.tagName.toUpperCase() != tagName))){
            element = isIE ? element.nextSibling : element.nextElementSibling;
        }
        if(element && element.nodeType == 1 && element.tagName && element.tagName.toUpperCase() == tagName){
            return element;
        }
        return null;
    },
	getFirstElementChild : function(_) {
		if (isIE) {
			var $ = _.firstChild;
			while ($ && $.nodeType != 1)
				$ = $.nextSibling;
			return $
		}
		return _.firstElementChild
	},
	getChildById : function(A, C, _) {
		if (!A)
			return null;
		if (!_)
			_ = document;
		if (!C)
			return _.getElementById(A);
		var B = _.getElementById(A);
		if (!B || B.parentNode == C)
			return B;
		if (C.getElementById)
			return C.getElementById(A);
		var D = C.childNodes;
		for (var E = 0; E < D.length; E++) {
			var $ = D.item(E);
			if ($.nodeType == 1 && $.id == A)
				return $
		}
		return null
	},
	getChildrenByTagName : function(_, A) {
		var B = [], C = _.childNodes;
		for (var D = 0; D < C.length; D++) {
			var $ = C.item(D);
			if ($ && $.nodeType == 1 && (!A || $.tagName == A))
				B.push($)
		}
		return B
	},
	forEachChildren : function(_, C, D, $) {
		if ($ === undefined || $ < 1)
			$ = 1;
		var E = _.childNodes;
		if (!E || E.length == 0)
			return;
		$--;
		for (var F = 0, B = E.length; F < B; F++) {
			var A = E.item(F);
			if (D)
				C.call(D, A);
			else
				C(A);
			if ($ > 0)
				TWaver.Utils.forEachChildren(A, C, D, $)
		}
	},
	getClientRect : function(_) {
		var D, C;
		if (!_) {
			_ = (document.doctype || (isIE && document.documentElement.clientWidth > 0))
					? document.documentElement
					: document.body;
			D = isWebkit ? window.pageXOffset : _.scrollLeft;
			C = isWebkit ? window.pageYOffset : _.scrollTop
		} else {
			var B = TWaver.Utils.getOffset(_);
			D = B.x + _.scrollLeft;
			C = B.y + _.scrollTop
		}
		var A = isWebkit && isMobile
				? (_.scrollWidth || window.innerWidth)
				: _.clientWidth, $ = isWebkit && isMobile
				? (_.scrollHeight || window.innerHeight)
				: _.clientHeight;
		return {
			x : D,
			y : C,
			left : D,
			top : C,
			right : D + A,
			bottom : C + $,
			width : A,
			height : $
		}
	},
	getViewport : function(A) {
		var C = A.scrollLeft, B = A.scrollTop, _ = A.clientWidth, $ = A.clientHeight;
		return {
			x : C,
			y : B,
			left : C,
			top : B,
			right : C + _,
			bottom : B + $,
			width : _,
			height : $
		}
	},
	ensureInViewport : function(_, D, C, $) {
		if (!$)
			$ = this.getClientRect();
		var B = _.offsetWidth, A = _.offsetHeight;
		if (D + B > $.x + $.width)
			D = $.x + $.width - B;
		if (C + A > $.y + $.height)
			C = $.y + $.height - A;
		if (D < $.x)
			D = $.x;
		if (C < $.y)
			C = $.y;
		_.style.left = D + "px";
		_.style.top = C + "px";
		return {
			x : D,
			y : C
		}
	},
	showAt : function(_, C, B, A) {
		if (A !== false) {
			var $ = this.ensureInViewport(_, C, B);
			C = $.x;
			B = $.y
		}
		_.style.left = C + "px";
		_.style.top = B + "px";
		_.style.visibility = "visible"
	},
	isNumber : function($) {
		return $ instanceof Number || (typeof $) == "number"
	},
	isString : function($) {
		if (!$)
			return false;
		return $ instanceof String || typeof $ == "string"
	},
	isBoolean : function($) {
		if ($ instanceof Boolean || typeof $ == "boolean")
			return true;
		return false
	},
	isArray : function($) {
		if (!$)
			return false;
		return $ instanceof Array || (typeof $) == "array"
	},
	isCtrlKey : function($) {
		return $.ctrlKey || (isMac && $.metaKey)
	},
	hasHorizontalScrollBar : function($) {
		return $.clientWidth < $.scrollWidth
	},
	hasVerticalScrollBar : function($) {
		return $.clientHeight < $.scrollHeight
	},
	scrollToCenter : function($, C, A, _, D) {
		var B = C - $.clientWidth / 2, E = A - $.clientHeight / 2;
		TWaver.Utils.scrollTo($, B, E, _, D)
	},
	scrollTo : function($, J, H, E, I, D, B, _) {
		if (!I || isNaN(I) || (!isNaN(I) && I == D)) {
			$.scrollLeft = J;
			$.scrollTop = H;
			if (E instanceof Function)
				return E();
			return
		}
		var F = parseInt($.scrollTop), G = parseInt($.scrollLeft), A = Math
				.abs(G - J), C = Math.abs(F - H);
		if (A < 15 && C < 15)
			return TWaver.Utils.scrollTo($, J, H, E, 0);
		if (!D)
			D = 1;
		if (!B)
			B = (J - G) / I;
		if (!_)
			_ = (H - F) / I;
		TWaver.Utils.scrollTo($, G + B, F + _, null, 0);
		D++;
		setTimeout(function() {
					TWaver.Utils.scrollTo($, J, H, E, I, D, B, _)
				}, 10)
	},
	drawRect : function(I, B, G, K, J, _, H, D, L, A, F, E, $) {
		var C = I.createElementNS(TWaver.Const.NS_SVG, "rect");
		TWaver.Utils.setAttribute(C, "shape-rendering", "crispEdges");
		TWaver.Utils.setAttribute(C, "id", G);
		TWaver.Utils.setAttribute(C, "fill", A);
		TWaver.Utils.setAttribute(C, "stroke", D);
		TWaver.Utils.setAttribute(C, "stroke-width", L);
		TWaver.Utils.setAttribute(C, "x", K);
		TWaver.Utils.setAttribute(C, "y", J);
		TWaver.Utils.setAttribute(C, "width", _);
		TWaver.Utils.setAttribute(C, "height", H);
		TWaver.Utils.setAttribute(C, "fill-opacity", F);
		TWaver.Utils.setAttribute(C, "stroke-dasharray", $);
		TWaver.Utils.setAttribute(C, "pointer-events", E);
		if (B)
			B.appendChild(C);
		return C
	},
	drawPath : function(J, B, K, G, C, L, A, F, D, _) {
		if (!K || K.length < 2)
			return;
		var M = K[0], $ = "M" + M.x + " " + M.y;
		for (var E = 1; E < K.length; E++) {
			var H = K[E];
			$ += "L" + H.x + " " + H.y
		}
		var I = J.createElementNS(TWaver.Const.NS_SVG, "path");
		TWaver.Utils.setAttribute(I, "shape-rendering", "crispEdges");
		TWaver.Utils.setAttribute(I, "id", G);
		TWaver.Utils.setAttribute(I, "fill", A);
		TWaver.Utils.setAttribute(I, "stroke", C);
		TWaver.Utils.setAttribute(I, "stroke-width", L);
		TWaver.Utils.setAttribute(I, "fill-opacity", F);
		TWaver.Utils.setAttribute(I, "stroke-dasharray", _);
		TWaver.Utils.setAttribute(I, "pointer-events", D);
		TWaver.Utils.setAttribute(I, "d", $);
		if (B)
			B.appendChild(I);
		return I
	},
	drawPolyline : function(D, C, E, $, G, I, A, H, F, _) {
		if (!E || E.length == 0)
			return;
		if (TWaver.Utils.isArray(E))
			E = TWaver.Utils.pointArrayToString(E);
		var B = D.createElementNS(TWaver.Const.NS_SVG, "polyline");
		TWaver.Utils.setAttribute(B, "shape-rendering", "crispEdges");
		TWaver.Utils.setAttribute(B, "id", $);
		TWaver.Utils.setAttribute(B, "fill", A);
		TWaver.Utils.setAttribute(B, "stroke", G);
		TWaver.Utils.setAttribute(B, "stroke-width", I);
		TWaver.Utils.setAttribute(B, "fill-opacity", H);
		TWaver.Utils.setAttribute(B, "stroke-dasharray", _);
		TWaver.Utils.setAttribute(B, "pointer-events", F);
		TWaver.Utils.setAttribute(B, "points", E);
		if (C)
			C.appendChild(B);
		return B
	},
	stringToPointArray : function($) {
		var A = [], D = $.split(" ");
		if (D.length == 0)
			return A;
		for (var C = 0; C < D.length; C++) {
			var _ = D[C];
			if (!_)
				continue;
			var B = _.split(",");
			A.push({
						x : new Number(B[0]),
						y : new Number(B[1])
					})
		}
		return A
	},
	pointArrayToString : function(_) {
		var $ = "";
		for (var A = 0; A < _.length; A++)
			$ += _[A].x + "," + _[A].y + " ";
		return $
	},
	drawRectAtCenter : function(J, B, H, D, C, _, I, E, M, A, G, F, $) {
		var L = D - _ / 2, K = C - I / 2;
		return TWaver.Utils.drawRect(J, B, H, L, K, _, I, E, M, A, G, F, $)
	},
	setAttribute : function(_, $, A) {
		if (A !== undefined && A !== null)
			_.setAttribute($, A);
		return _
	},
	setAttributes : function($, A) {
		for (var _ in A)
			TWaver.Utils.setAttribute($, _, A[_]);
		return $
	},
	setCursor : function($, _) {
		$.setAttribute("cursor", _);
		return $
	},
	containPoint : function(_, $) {
		return $.x >= _.x && $.x <= _.x + _.width && $.y >= _.y
				&& $.y <= _.y + _.height
	},
	containRect : function($, _) {
		return _.left >= $.left && _.right <= $.right && _.top >= $.top
				&& _.bottom <= $.bottom
	},
	intersects : function(_, B) {
		var C = _.width, H = _.height, E = B.width, D = B.height;
		if (E <= 0 || D <= 0 || C <= 0 || H <= 0)
			return false;
		var A = _.x, $ = _.y, F = B.x, G = B.y;
		E += F;
		D += G;
		C += A;
		H += $;
		return ((E < F || E > A) && (D < G || D > $) && (C < A || C > F) && (H < $ || H > G))
	},
	intersectRectPath : function(G, F, B, A, D) {
		var $ = D.getTotalLength();
		if ($ <= 0)
			return false;
		var E = G + B, C = F + A;
		while ($ > 0) {
			var _ = D.getPointAtLength($--);
			if (_.x > G && _.x < E && _.y > F && _.y < C)
				return true
		}
		return false
	},
	doReady : function($) {
		if (TWaver.Utils.doReady.done)
			return $();
		if (TWaver.Utils.doReady.timer)
			TWaver.Utils.doReady.ready.push($);
		else {
			TWaver.Utils.addEventListener(window, "load",
					TWaver.Utils.isDomReady);
			TWaver.Utils.doReady.ready = [$];
			TWaver.Utils.doReady.timer = setInterval(TWaver.Utils.isDomReady,
					13)
		}
	},
	isDomReady : function() {
		if (TWaver.Utils.doReady.done)
			return false;
		if (document && document.getElementsByTagName
				&& document.getElementById && document.body) {
			clearInterval(TWaver.Utils.doReady.timer);
			TWaver.Utils.doReady.timer = null;
			for (var $ = 0; $ < TWaver.Utils.doReady.ready.length; $++)
				TWaver.Utils.doReady.ready[$]();
			TWaver.Utils.doReady.ready = null;
			TWaver.Utils.doReady.done = true
		}
	}
};
TWaver.trace = TWaver.Utils.trace;
TWaver.alert = TWaver.Utils.alert;
TWaver.Ajax = {
	createXMLHttpRequest : function() {
		if (!isIE)
			return new XMLHttpRequest();
		else {
			var $ = ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.3.0",
					"MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			for (var A = 0; A < $.length; A++) {
				try {
					return new ActiveXObject($[A])
				} catch (_) {
				}
			}
		}
		throw new Error("Create XMLHttpRequest Error")
	},
	readystatechange : function(_, A, B) {
		if (4 == _.readyState)
			if (200 == _.status) {
				var $ = _.responseText;
				_.onreadystatechange = TWaver.Const.nullFunction;
				delete _;
				if (A)
					TWaver.Utils.createFunction(B, A, $)()
			}
	},
	request : function(F, C, B, E, _, A, D) {
		var $ = this.createXMLHttpRequest();
		if (!F)
			throw new Error("Url can't be null");
		if (!B)
			B = "post";
		if (E !== false)
			$.onreadystatechange = function() {
				TWaver.Ajax.readystatechange($, _, A)
			};
		$.open(B, F, E !== false);
		if (!D)
			D = "application/x-www-form-urlencoded; charset=utf-8";
		$.setRequestHeader("Content-Type", D);
		if (C && !TWaver.Utils.isString(C))
			C = TWaver.Ajax.buildParams(C);
		$.send(C);
		if (E === false && $.readyState == 4 && $.status == 200)
			return $.responseText
	},
	asyncRequest : function(D, B, A, $, _, C) {
		TWaver.Ajax.request(D, B, A, true, $, _, C)
	},
	synchronizedRequest : function(D, B, A, $, _, C) {
		return TWaver.Ajax.request(D, B, A, false, $, _, C)
	},
	buildParams : function(A) {
		var $ = "";
		for (prop in A) {
			var _ = A[prop];
			if (_ === null || _ === undefined)
				continue;
			$ = $ + encodeURIComponent(prop) + "="
					+ encodeURIComponent(TWaver.Utils.toString(A[prop])) + "&"
		}
		$ = $.substring(0, $.length - 1);
		return $
	}
};
TWaver.AJAXDataProvider = function($) {
	this.url = $;
	if (!$)
		throw new Error("url can't be null");
	this.request = function(_, B, A) {
		TWaver.Ajax.asyncRequest($, B, "post", A, _)
	}
};
TWaver.SelectionModel = function() {
	this.init();
	this.addEvents("selection.change")
};
TWaver.SelectionModel.prototype = {
	selection : null,
	lastSelection : null,
	init : function() {
		this.selection = {}
	},
	clearSelection : function($) {
		delete this.lastSelection;
		if (!this.hasSelection())
			return;
		var _ = this.selection;
		this.selection = {};
		if (!$)
			this.fireEvent("selection.change", {
						type : "clear",
						target : _,
						value : false
					})
	},
	getSelection : function() {
		if (!this.selection)
			return null;
		var _ = [];
		for (var $ in this.selection)
			if ($)
				_.push($);
		return _
	},
	isOneSelected : function() {
		var _ = 0;
		for (var $ in this.selection) {
			if (_ > 0)
				return null;
			_++
		}
		return _ == 1
	},
	getSize : function() {
		var _ = 0;
		for (var $ in this.selection)
			_++;
		return _
	},
	keyFunction : function($) {
		if ($ && $.id)
			return $.id;
		return $
	},
	setSelection : function(A, $) {
		if ($) {
			this.selection = A;
			if (A) {
				for (var _ in A)
					this.lastSelection = _
			} else
				delete this.lastSelection;
			return
		}
		this.clearSelection($);
		this.selectElements(A, true, false, $)
	},
	selectElements : function(G, E, B, _) {
		if (!G || G.length == 0)
			return;
		if (E !== false)
			E = true;
		var $ = [], D = [], F = TWaver.Utils.isArray(G), C;
		for (var H = 0; H < G.length; H++) {
			var A = F ? G[H] : G.item(H);
			if (B)
				C = this.reverseSelect(A, true);
			else
				C = this._select(A, E, true);
			if (_)
				break;
			if (C === true)
				$.push(A);
			else if (C === false)
				D.push(A)
		}
		if (_)
			return;
		if ($.length > 0)
			this.fireEvent("selection.change", {
						type : "add",
						target : $,
						value : true
					});
		if (D.length > 0)
			this.fireEvent("selection.change", {
						type : "remove",
						target : D,
						value : false
					})
	},
	isSelected : function($) {
		$ = this.keyFunction($);
		if (!$)
			return;
		return this.selection[$]
	},
	hasSelection : function() {
		for (var $ in this.selection)
			return true;
		return false
	},
	_select : function(_, B, $) {
		var C = this.keyFunction(_);
		if (!C)
			return;
		if (B !== false)
			B = true;
		if (B && this.isSelectable && !this.isSelectable(_))
			return;
		var A = this.selection[C];
		if (A == B)
			return;
		if (B) {
			this.lastSelection = _;
			this.selection[C] = B
		} else {
			if (this.lastSelection == _)
				delete this.lastSelection;
			delete this.selection[C]
		}
		if (!$)
			this.fireEvent("selection.change", {
						type : B ? "add" : "remove",
						oldValue : A,
						newValue : B,
						value : B,
						target : _
					});
		return B
	},
	select : function(_, $) {
		return this._select(_, true, $)
	},
	unselect : function(_, $) {
		return this._select(_, false, $)
	},
	reverseSelect : function(A, _) {
		var $ = this.keyFunction(A);
		return this._select($, !this.selection[$], _)
	},
	isSelectable : function($) {
		return true
	},
	toString : function() {
		return "TWaver.SelectionModel"
	}
};
TWaver.extend(TWaver.SelectionModel, TWaver.EventDispatcher);
TWaver.DataBox = function($, _) {
	TWaver.DataBox.superclass.constructor.call(this, _);
	this.setDataProvider($);
	this.selectionModel = new TWaver.SelectionModel();
	this.on("databox.update", this.onDataBoxUpdate);
	this.responseTargets = []
};
TWaver.DataBox.prototype = {
	defaultParams : null,
	responseTargets : null,
	selectionModel : null,
	dataProvider : null,
	_removeResponseTarget : function(A) {
		if (!TWaver.Utils.isString(A))
			return;
		var $ = [];
		for (var B = 0, _ = this.responseTargets.length; B < _; B++)
			if (this.responseTargets[B] != item)
				$.push(this.responseTargets[B]);
		this.responseTargets = $
	},
	_appendResponseTarget : function(_) {
		if (!TWaver.Utils.isString(_))
			return;
		for (var A = 0, $ = this.responseTargets.length; A < $; A++)
			if (this.responseTargets[A] == _)
				return;
		this.responseTargets.push(_)
	},
	_appendDefaultParams : function(_) {
		if (!this.defaultParams)
			this.defaultParams = _;
		else
			for (var $ in _)
				this.defaultParams[$] = _[$]
	},
	_removeDefaultParams : function(_) {
		if (!this.defaultParams || !_)
			return;
		if (TWaver.Utils.isString(_))
			delete this.defaultParams[_];
		else if (TWaver.Utils.isArray(_))
			for (var A = 0, $ = _.length; A < $; A++)
				if (TWaver.Utils.isString(_[A]))
					delete this.defaultParams[_[A]]
	},
	setDataProvider : function(_, $) {
		if (TWaver.Utils.isString(_))
			this.dataProvider = new TWaver.AJAXDataProvider(_);
		else {
			if (!_.request)
				throw new Error("dataProvider must implements function \"request(databox, params, callBack)\".");
			this.dataProvider = _
		}
		if ($)
			this.update()
	},
	setElementProperty : function(_, $, D, B, A, C) {
		if (!_)
			throw Error("element id can't be null");
		if (!$)
			throw Error("property name can't be null");
		if (_.id)
			_ = _.id;
		var E = {};
		E["twaver.element.id"] = _;
		E["twaver.element.property.name"] = $;
		E["twaver.value"] = D;
		E["twaver.class.name"] = B;
		this.__update("handleElementProperty", E, A, C)
	},
	addLink : function(E, $, A, D, _, B) {
		var C = {};
		C["twaver.link.from.id"] = E;
		C["twaver.link.to.id"] = $;
		C["twaver.element.name"] = A;
		C["twaver.points"] = D;
		this.__update("handleAddLink", C, _, B)
	},
	addShapeNode : function(C, _, $, A) {
		var B = {};
		B["twaver.element.name"] = _;
		B["twaver.points"] = C;
		if (!$ || !$["twaver.class.name"])
			B["twaver.class.name"] = "twaver.ShapeNode";
		this.__update("handleAddElement", B, $, A)
	},
	addElement : function(D, _, C, B, $, A) {
		var E = {};
		E["twaver.class.name"] = D;
		E["twaver.element.name"] = _;
		if (C || B)
			E["twaver.element.center"] = C + "," + B;
		this.__update("handleAddElement", E, $)
	},
	removeElement : function(_, $, A) {
		if (!_)
			throw Error("elementId can't be null");
		var B = {};
		if (TWaver.Utils.isString(_))
			B["twaver.element.id"] = _;
		else
			B["twaver.element.ids"] = _;
		this.__update("handleRemoveElement", B, $, A)
	},
	moveElement : function(C, A, B, $, E, _, D) {
		if (!C || C.length == 0)
			return;
		var F = {};
		F["twaver.element.offset"] = A + "," + B;
		F["twaver.element.ids"] = C;
		F["twaver.parent.id"] = $;
		F["twaver.host.id"] = E;
		this.__update("handleElementLocation", F, _, D)
	},
	resizeElement : function($, F, E, B, A, _, C) {
		if (!$ || isNaN(F) || isNaN(E) || isNaN(B) || isNaN(A))
			return;
		var D = {};
		D["twaver.value"] = F + "," + E + "," + B + "," + A;
		D["twaver.element.id"] = $;
		this.__update("handleElementResize", D, _, C)
	},
	setShapePoint : function($, E, D, A, _, B) {
		var C = {};
		C["twaver.point"] = E + "," + D;
		if (!isNaN(A))
			C["twaver.index"] = A;
		C["twaver.element.id"] = $;
		this.__update("handleShapePoint", C, _, B)
	},
	attachmentAction : function($, D, B, _, A) {
		if (!$)
			throw new Error("element id can't be null");
		var C = {};
		C["twaver.attachment"] = D;
		C["twaver.attachment.action"] = B;
		C["twaver.element.id"] = $;
		this.__update("handleAttachmentAction", C, _, A)
	},
	copy : function(C, B, A, $, _, D) {
		if (!C)
			throw new Error("element id can't be null");
		var E = {};
		E["twaver.element.ids"] = C;
		if (B !== 0 || A !== 0)
			E["twaver.element.offset"] = B + "," + A;
		E["twaver.parent.id"] = $;
		this.__update("handleCopy", E, _, D)
	},
	undo : function($, _) {
		this.update("handleUndo", $, _)
	},
	redo : function($, _) {
		this.update("handleRedo", $, _)
	},
	dropIntoSubNetwork : function($, _, A) {
		var B = {};
		B["twaver.element.id"] = $;
		this.__update("handleDropIntoSubNetwork", B, _, A)
	},
	resizeGrid : function(A, E, C, _, $, B) {
		var D = {};
		D["twaver.element.id"] = A;
		D["twaver.grid.index"] = _;
		D["twaver.grid.iscolumn"] = C;
		D["twaver.grid.gap"] = E;
		this.__update("handleGridResize", D, $, B)
	},
	__update : function(C, B, $, A) {
		if (!B)
			B = {};
		if ($)
			for (paramName in $) {
				if (!TWaver.Utils.isNull(B[paramName]))
					continue;
				var _ = $[paramName];
				if (TWaver.Utils.isNull(_))
					continue;
				B[paramName] = _
			}
		this.update(C, B, A)
	},
	update : function(C, B, A) {
		if (!B)
			B = {};
		if (arguments.length == 1 && C instanceof Function)
			A = C;
		else if (C)
			B["twaver.handle.method"] = C;
		if (!B["twaver.response.target"]) {
			var $ = "";
			for (var D = 0, _ = this.responseTargets.length; D < _; D++)
				if (D == 0)
					$ = this.responseTargets[D];
				else
					$ += "," + this.responseTargets[D];
			B["twaver.response.target"] = $
		}
		this.request(B, A)
	},
	getDefaultParams : function() {
		return this.defaultParams
	},
	request : function(B, A) {
		if (!B)
			B = {};
		var _ = this.getDefaultParams();
		if (_)
			for (p in _)
				if (B[p] === undefined)
					B[p] = _[p];
		for (p in B) {
			var $ = B[p];
			if (TWaver.Utils.isNull($))
				delete B[p]
		}
		this.dataProvider.request(this, B, TWaver.Utils.createFunction(this,
						function($) {
							this.fireEvent("databox.update", $);
							if (A instanceof Function)
								A($)
						}))
	},
	onDataBoxUpdate : function($) {
		this.response($)
	},
	response : function(A) {
		if (!A)
			return;
		if (TWaver.Utils.isString(A))
			if (isIE) {
				var $ = new ActiveXObject("Microsoft.XMLDOM");
				$.loadXML(A);
				A = $
			} else
				A = (new DOMParser()).parseFromString(A, "text/xml");
		var _ = A.documentElement;
		if (_)
			this.updateViews(_)
	},
	updateViews : function($) {
		TWaver.Utils.forEachChildren($, this._updateView, this)
	},
	_updateView : function(_) {
		if (!_ || !_.tagName)
			return;
		var $ = _.tagName;
		if ($.indexOf("twaver.") == 0)
			$ = $.substring("twaver.".length);
		this.fireEvent($ + ".update", {
					value : _
				})
	},
	getSVGData : function($) {
		if ($.value)
			$ = $.value;
		return TWaver.Utils.getFirstElementChildByTagName($, "svg")
	},
	getJSONData : function(data) {
		if (!data)
			return;
		if (data.value)
			data = data.value;
		if (data.nodeType) {
			data = data.firstChild;
			if (!data)
				return;
			data = data.nodeValue
		}
		if (TWaver.Utils.isString(data))
			data = eval("(" + data + ")");
		return data
	},
	_export : function(D, $) {
		if (!D)
			throw new Error("type can't be null");
		if (this.dataProvider instanceof TWaver.AJAXDataProvider) {
			var E = this.dataProvider.url, H = E.indexOf("?") > 0 ? "&" : "?";
			E = E + H + "twaver.response.format=" + D + (_ ? "&" + _ : "");
			var _;
			if ($)
				_ = TWaver.Ajax.buildParams($);
			var G = [];
			G.push(E);
			if (arguments.length > 2)
				for (var F = 2, C = arguments.length; F < C; F++)
					G.push(arguments[F]);
			if (isIE) {
				var A = "_blank", B;
				if (G.length > 1)
					A = G[1];
				if (G.length > 2) {
					B = G[2];
					window.open(E, A, B)
				} else
					window.open(E, A)
			} else
				window.open.apply(window, G)
		}
	},
	exportImage : function($) {
		this._export("image", $)
	},
	exportXML : function($) {
		this._export("xml", $)
	},
	exportSVG : function($) {
		this._export("svg", $)
	},
	align : function(A, _, $) {
		if (!A || !_)
			return;
		this.update("handleAlign", {
					"twaver.element.ids" : A,
					"twaver.align.type" : _
				}, $)
	},
	toString : function() {
		return "TWaver.DataBox"
	}
};
TWaver.extend(TWaver.DataBox, TWaver.EventDispatcher);
TWaver.PopupMenu = function($) {
	if ($)
		this.items = $;
	this._menus = []
};
TWaver.PopupMenu.Separator = "separator";
TWaver.PopupMenu.prototype = {
	_menus : null,
	zIndex : 10000,
	dom : null,
	items : [],
	add : function($) {
		this.items.push($)
	},
	addSeparator : function() {
		this.add(TWaver.PopupMenu.Separator)
	},
	resetItemClass : function(_, $) {
		if ($.disabled) {
			TWaver.Utils.setClassAttribute(_, "disabled");
			return
		}
		if ($.menu && $.menu.length > 0)
			TWaver.Utils.setClassAttribute(_, "more");
		else
			TWaver.Utils.setClassAttribute(_, "none")
	},
	renderItem : function(G, D, C) {
		var E = TWaver.Utils.createHTMLElement("li");
		if (D == TWaver.PopupMenu.Separator) {
			TWaver.Utils.setClassAttribute(E, "separator");
			return E
		}
		var B = D.text, A = D.icon, _ = D.handler, $ = D.id, F = D.menu, H = D.className;
		if (A)
			B = "<img class='.twaver_popupmenu_icon' classname='.twaver_popupmenu_icon' src='"
					+ A + "'> &nbsp;" + B;
		if (B)
			E.innerHTML = B;
		if (H) {
			TWaver.Utils.setClassAttribute(E, H);
			return E
		}
		this.resetItemClass(E, D);
		if (D.disabled)
			return E;
		E.onmousedown = TWaver.Utils.createEventFunction(this, function($) {
					this.hide();
					if (_)
						if (_.length > 1)
							_($, D);
						else if (_.length == 1)
							_($);
						else
							_()
				});
		var I = null;
		if (D.menu && D.menu.length > 0)
			I = this.renderMenu(D.menu, C);
		E.onmouseover = TWaver.Utils.createEventFunction(this, function($) {
					TWaver.Utils.setClassAttribute(E, "over");
					if (G.showingMenu)
						this.hide(G.showingMenu);
					G.showingMenu = I;
					if (I)
						this.showMenu(E, I)
				});
		E.onmouseout = TWaver.Utils.createEventFunction(this, function($) {
					this.resetItemClass(E, D)
				});
		return E
	},
	renderMenu : function($, _) {
		var A = TWaver.Utils.createHTMLElement("ul");
		TWaver.Utils.setClassAttribute(A, "twaver_menu");
		A.style.visibility = "hidden";
		A.style.zIndex = _;
		var C = $.length;
		for (var D = 0; D < C; D++) {
			var B = this.renderItem(A, $[D], _ + 1);
			A.appendChild(B)
		}
		TWaver.Utils.getBody().appendChild(A);
		if (!this._menus)
			this._menus = [];
		this._menus.push(A);
		return A
	},
	showMenu : function(C, A) {
		var _ = C.clientWidth, F = TWaver.Utils.getClientRect(), E = TWaver.Utils
				.getOffset(C), B = E.x - F.x, D = F.x + F.width - E.x - _, $ = A.clientWidth, H = D > $
				? (E.x + _)
				: (E.x - $), G = E.y;
		TWaver.Utils.showAt(A, H, G)
	},
	render : function() {
		this.dom = this.renderMenu(this.items, this.zIndex)
	},
	isVisible : function() {
		if (!this.dom)
			return false;
		return this.dom.style.visibility != "hidden"
	},
	showAt : function($) {
		var A = 0, _ = 0;
		if ($ instanceof Array) {
			A = $[0];
			_ = $[1]
		} else {
			A = $.x;
			_ = $.y
		}
		if (!this.dom)
			this.render();
		this.dom.oncontextmenu = TWaver.Const.nullFunction;
		TWaver.Utils.showAt(this.dom, A, _)
	},
	hide : function($) {
		if (!$) {
			this.destroy();
			return
		}
		while ($) {
			$.style.visibility = "hidden";
			$ = $.showingMenu
		}
	},
	destroy : function() {
		if (this._menus) {
			for (var _ = 0; _ < this._menus.length; _++) {
				var $ = this._menus[_];
				if (!$)
					continue;
				TWaver.Utils.clearChildren($);
				if ($.parentNode)
					$.parentNode.removeChild($);
				delete $
			}
			this._menus = null
		}
		if (this.dom && this.dom.parentNode) {
			TWaver.Utils.clearChildren(this.dom);
			this.dom.parentNode.removeChild(this.dom)
		}
		this.dom = null;
		if (isIE)
			CollectGarbage()
	},
	toString : function() {
		return "TWaver.PopupMenu"
	}
};
TWaver.SVGComponent = function(_, $) {
	TWaver.SVGComponent.superclass.constructor.call(this, $);
	this.addEvents("initialize", "svgdocument.complete", "svgroot.change",
			"before.load", "before.interaction.change", "interaction.change");
	this.on("svgroot.change", this.onSVGRootChange);
	this.on("before.interaction.change", this.beforeInteractionChange, this);
	this.setCanvas(_);
	this._inputHandlers = [];
	this._customInputHandlers = []
};
TWaver.SVGComponent.prototype = {
	enableMouseEvent : true,
	enableKeyboardEvent : true,
	SVGDocument : null,
	SVGRoot : null,
	SVGDefsNode : null,
	SVGWindow : null,
	IEEmbedNode : null,
	canvas : null,
	interactionName : null,
	defaultCursor : "default",
	_inputHandlers : null,
	_customInputHandlers : null,
	initialized : false,
	setCanvas : function($) {
		this.unloadSVG();
		this.canvas = $;
		this.canvas.className += " svg_component"
	},
	unloadSVG : function() {
		if (!this.canvas)
			return;
		if (this.SVGRoot) {
			this.uninstallSVGListeners();
			var $ = this.SVGRoot.parentNode;
			if ($)
				$.removeChild(this.SVGRoot)
		}
		if (isIE && this.IEEmbedNode)
			this.canvas.removeChild(this.IEEmbedNode);
		delete this.canvas;
		delete this.SVGRoot;
		delete this.SVGDocument;
		delete this.IEEmbedNode;
		delete this.SVGWindow
	},
	loadSVG : function(_, $) {
		if (!this.SVGDocument) {
			if (!this.canvas)
				throw new Error("SVG canvas is not set, set canvas as follows: \nvar svgComponent = new TWaver.SVGComponent(canvas);\n"
						+ "or\nvar svgComponent = new TWaver.SVGComponent();\nsvgComponent.setCanvas(canvas);\ncanvas should be type of \"HTML Element\"");
			TWaver.Utils.createSVGDocument(this.canvas, TWaver.Utils
							.createFunction(this, function(A, $, _) {
										this.SVGDocument = $;
										this.SVGRoot = A;
										if (isIE && !isIE9) {
											this.IEEmbedNode = _;
											this.SVGWindow = _.window;
											this.SVGWindow.disableAutoUpdate()
										} else
											this.SVGWindow = window;
										this.fireEvent("svgdocument.complete",
												{
													value : this.SVGDocument
												})
									}))
		}
		if (!_)
			return;
		this.fireEvent("before.load", {
					value : _
				});
		if (!this.SVGDocument)
			this.on("svgdocument.complete", TWaver.Utils.createFunction(this,
							function(A) {
								this.loadSVGData(_);
								if ($)
									$.call(this)
							}));
		else {
			this.loadSVGData(_);
			if ($)
				$.call(this)
		}
	},
	getWindow : function() {
		return isIE && !isIE9 ? this.SVGWindow : window
	},
	loadSVGData : function($) {
		if (!hasSVGSupport)
			throw new Error("your browser is not support svg.");
		if (!$)
			throw new Error("empty svg data");
		if (!this.SVGDocument)
			throw new Error("svg document has not been initialized.");
		if (isIE) {
			if ($.xml)
				$ = $.xml;
			if (TWaver.Utils.isString($))
				$ = this.getWindow().parseXML($, this.SVGDocument)
		} else if (TWaver.Utils.isString($)) {
			var _ = (new DOMParser()).parseFromString($, "text/xml");
			$ = _.documentElement
		}
		this.setSVGRoot($);
		if (!this.initialized) {
			this.initialized = true;
			this.fireEvent("initialize", {
						value : true
					})
		}
	},
	setSVGRoot : function(A) {
		if (!A || A == this.SVGRoot)
			return;
		this.uninstallSVGListeners();
		var $ = this.SVGRoot;
		if (isIE && !isIE9) {
			if (this.SVGRoot)
				this.SVGDocument.replaceChild(A, this.SVGRoot);
			else
				this.SVGDocument.appendChild(A);
			this.SVGRoot = this.SVGDocument.documentElement;
			if (this.SVGRoot.hasAttribute("viewBox"))
				this.SVGRoot.removeAttribute("viewBox")
		} else {
			A.removeAttribute("viewBox");
			var _ = this.SVGRoot.parentNode;
			if (this.SVGDocument.adoptNode)
				A = this.SVGDocument.adoptNode(A);
			else {
				A = this.SVGDocument.importNode(A, true);
				if (isFirefox)
					A = this.SVGDocument.importNode(A, true)
			}
			_.replaceChild(A, this.SVGRoot);
			this.SVGRoot = A;
			this.SVGRoot.oncontextmenu = function($) {
				$.cancelBubble = true;
				return false
			};
			_ = null
		}
		this.installSVGListeners();
		this.fireEvent("svgroot.change", {
					oldValue : $,
					newValue : this.SVGRoot,
					value : this.SVGRoot
				});
		delete $
	},
	onSVGRootChange : function($) {
		delete this.SVGDefsNode;
		this.SVGDefsNode = TWaver.Utils.getFirstElementChildByTagName(
				this.SVGRoot, "defs");
		this.beforeInteractionChange();
		if (isMobileSafari)
			this.SVGRoot.setAttribute("class", "svg_component")
	},
	setEnableMouseEvent : function($) {
		if (this.enableMouseEvent == $)
			return;
		this.enableMouseEvent = $;
		if (this.enableMouseEvent) {
			this.installMouseListeners();
			if (hasTouchSupport)
				this.installTouchListeners()
		} else {
			this.uninstallMouseListeners();
			if (hasTouchSupport)
				this.uninstallTouchListeners()
		}
	},
	setEnableKeyboardEvent : function($) {
		if (this.enableKeyboardEvent == $)
			return;
		this.enableKeyboardEvent = $;
		if (this.enableKeyboardEvent)
			this.installKeyboardListeners();
		else
			this.uninstallKeyboardListeners()
	},
	installKeyboardListeners : function() {
		if (!(isIE && !isIE9) && !this.inputBox) {
			var A = document.createElement("input");
			A.style.width = 0;
			A.style.height = 0;
			var _ = TWaver.Utils.createHTMLElement("div");
			_.setAttribute("name", "twaverKeyboardListener");
			_.disabled = true;
			_.style.width = 0;
			_.style.height = 0;
			_.style.top = 0;
			_.style.left = 0;
			_.style.position = "absolute";
			_.style.overflow = "hidden";
			_.style.zIndex = -1;
			_.appendChild(A);
			this.canvas.appendChild(_);
			this.inputBox = A;
			this.inputBoxDiv = _
		}
		if (this.inputBox)
			this.inputBox.value = null;
		if (!this.keydown) {
			this.keydown = this._createEventListener("keydown");
			this.keypress = this._createEventListener("keypress");
			this.keyup = this._createEventListener("keyup")
		}
		var $ = isIE && !isIE9 ? this.SVGRoot : this.inputBox;
		$.addEventListener("keydown", this.keydown, false);
		$.addEventListener("keypress", this.keypress, false);
		$.addEventListener("keyup", this.keyup, false)
	},
	uninstallKeyboardListeners : function() {
		if (!this.keydown)
			return;
		var $ = isIE ? this.SVGRoot : this.inputBox;
		if (!$)
			return;
		$.removeEventListener("keydown", this.keydown, false);
		$.removeEventListener("keypress", this.keypress, false);
		$.removeEventListener("keyup", this.keyup, false);
		delete this.keydown;
		delete this.keypress;
		delete this.keyup
	},
	installTouchListeners : function() {
		if (!hasTouchSupport)
			return;
		if (!this.touchstart) {
			this.doubletap = this._createEventListener("doubletap");
			this.touchstart = this._createEventListener("touchstart", function(
							_) {
						if (_.touches.length == 1) {
							var $ = _.timeStamp;
							if (this.touchTime && $ - this.touchTime < 200) {
								delete this.touchTime;
								return this.doubletap(_, this)
							}
							this.touchTime = $
						}
					});
			this.touchmove = this._createEventListener("touchmove");
			this.touchend = this._createEventListener("touchend");
			this.touchcancel = this._createEventListener("touchcancel");
			this.gesturestart = this._createEventListener("gesturestart");
			this.gesturechange = this._createEventListener("gesturechange");
			this.gestureend = this._createEventListener("gestureend")
		}
		this.SVGRoot.ontouchstart = this.touchstart;
		this.SVGRoot.ontouchmove = this.touchmove;
		this.SVGRoot.ontouchend = this.touchend;
		this.SVGRoot.ontouchcancel = this.touchcancel;
		this.SVGRoot.ongesturestart = this.gesturestart;
		this.SVGRoot.ongesturechange = this.gesturechange;
		this.SVGRoot.ongestureend = this.gestureend
	},
	uninstallTouchListeners : function() {
		if (!hasTouchSupport)
			return;
		this.SVGRoot.ontouchstart = TWaver.Const.nullFunction;
		this.SVGRoot.ontouchmove = TWaver.Const.nullFunction;
		this.SVGRoot.ontouchend = TWaver.Const.nullFunction;
		this.SVGRoot.ontouchcancel = TWaver.Const.nullFunction;
		this.SVGRoot.ongesturestart = TWaver.Const.nullFunction;
		this.SVGRoot.ongesturechange = TWaver.Const.nullFunction;
		this.SVGRoot.ongestureend = TWaver.Const.nullFunction;
		delete this.touchstart;
		delete this.touchmove;
		delete this.touchend;
		delete this.touchcancel;
		delete this.gesturestart;
		delete this.gesturechange;
		delete this.gestureend
	},
	installMouseListeners : function() {
		if (!this.mouseclick) {
			this.mouseclick = this._createEventListener("mouseclick");
			this.mouseover = this._createEventListener("mouseover");
			this.mousedown = this._createEventListener("mousedown",
					function($) {
						if (isIE && $.detail == 2) {
							this.doubleclick($);
							if (!$.cancelBubble)
								this.canvas.fireEvent("ondblclick")
						}
						if ($.button == 2)
							this.rightclick($)
					});
			this.doubleclick = this._createEventListener("doubleclick");
			this.mouseout = this._createEventListener("mouseout");
			this.mouseup = this._createEventListener("mouseup");
			if (!hasTouchSupport) {
				this.rightclick = this._createEventListener("rightclick");
				this.mousemove = this._createEventListener("mousemove");
				this.mousewheel = this._createEventListener("mousewheel")
			}
		}
		if (!isIE)
			this.SVGRoot.addEventListener("dblclick", this.doubleclick, false);
		this.SVGRoot.addEventListener("mousedown", this.mousedown, false);
		this.SVGRoot.addEventListener("click", this.mouseclick, false);
		this.SVGRoot.addEventListener("mouseover", this.mouseover, false);
		this.SVGRoot.addEventListener("mouseup", this.mouseup, false);
		this.SVGRoot.addEventListener("mouseout", this.mouseout, false);
		if (!hasTouchSupport) {
			this.SVGRoot.addEventListener("mousemove", this.mousemove, false);
			if (isIE && !isIE9)
				this.IEEmbedNode.onmousewheel = this.mousewheel;
			else
				this.SVGRoot.addEventListener((isGecko
								? "DOMMouseScroll"
								: "mousewheel"), this.mousewheel, false)
		}
	},
	uninstallMouseListeners : function() {
		if (!this.mouseclick || !this.SVGRoot)
			return;
		if (!isIE)
			this.SVGRoot.removeEventListener("dblclick", this.doubleclick,
					false);
		this.SVGRoot.removeEventListener("mousedown", this.mousedown, false);
		this.SVGRoot.removeEventListener("mouseup", this.mouseup, false);
		this.SVGRoot.removeEventListener("click", this.mouseclick, false);
		this.SVGRoot.removeEventListener("mouseout", this.mouseout, false);
		this.SVGRoot.removeEventListener("mouseover", this.mouseover, false);
		if (!hasTouchSupport) {
			this.SVGRoot
					.removeEventListener("mousemove", this.mousemove, false);
			if (isIE && !isIE9)
				this.IEEmbedNode.onmousewheel = TWaver.Const.nullFunction;
			else
				this.SVGRoot.removeEventListener((isGecko
								? "DOMMouseScroll"
								: "mousewheel"), this.mousewheel, false)
		}
		delete this.doubleclick;
		delete this.mousedown;
		delete this.mouseup;
		delete this.mouseclick;
		delete this.mouseout;
		delete this.mouseover;
		delete this.mousemove;
		delete this.mousewheel
	},
	installSVGListeners : function() {
		if (this.enableKeyboardEvent && !hasTouchSupport)
			this.installKeyboardListeners();
		if (this.enableMouseEvent) {
			this.installMouseListeners();
			if (hasTouchSupport)
				this.installTouchListeners()
		}
	},
	uninstallSVGListeners : function() {
		this.uninstallKeyboardListeners();
		this.uninstallMouseListeners();
		this.uninstallTouchListeners()
	},
	getAllInputHandlers : function() {
		return this._inputHandlers.concat(this._customInputHandlers)
	},
	addCustomInputHandler : function($) {
		if ($)
			this._customInputHandlers.push($)
	},
	removeCustomInputHandler : function($) {
		if ($) {
			if ($.destroy instanceof Function)
				$.destroy(network);
			this._customInputHandlers.remove($)
		}
	},
	clearCustomInputHandlers : function() {
		while (this._customInputHandlers.length > 0)
			this.removeCustomInputHandler(this._customInputHandlers[0])
	},
	addInputHandler : function($) {
		if ($)
			this._inputHandlers.push($)
	},
	removeInputHandler : function($) {
		if ($) {
			if ($.destroy instanceof Function)
				$.destroy(network);
			this._inputHandlers.remove($)
		}
	},
	beforeInteractionChange : function($) {
		if (!this._inputHandlers || this._inputHandlers.length == 0)
			return;
		for (var A = 0; A < this._inputHandlers.length; A++) {
			var _ = this._inputHandlers[A];
			if (_ && _.destroy instanceof Function)
				_.destroy(this)
		}
	},
	setInteractionMode : function(_, A, $) {
		if (!A)
			A = [];
		this.fireEvent("before.interaction.change", {
					source : this,
					oldValue : this._inputHandlers,
					value : A,
					oldName : this.interactionName,
					name : _
				});
		this.interactionName = _;
		this._inputHandlers = A;
		this.fireEvent("interaction.change", {
					source : this,
					value : A,
					name : _
				});
		if (!$)
			$ = this.defaultCursor;
		this.setCursor($)
	},
	clearInputHandlers : function() {
		this.setInteractionMode()
	},
	_fireEvents : function($, _, C) {
		for (var D = 0; D < $.length; D++) {
			var B = $[D];
			if (B && B[C] instanceof Function) {
				var A = B[C].length;
				if (A == 0)
					B[C]();
				else if (A == 1)
					B[C](_);
				else if (A > 1)
					B[C](_, this)
			}
		}
	},
	_createEventListener : function(_, $) {
		return TWaver.Utils.createEventFunction(this, function(B) {
					if (!B && isIE)
						B = window.event;
					var A = false;
					if (this["before" + _] instanceof Function)
						if (this["before" + _](B) === false)
							A = true;
					if (!A && this["on" + _] instanceof Function)
						if (this["on" + _](B) === false)
							A = true;
					if (!A) {
						var C = this.getAllInputHandlers();
						this._fireEvents(C, B, "before" + _);
						this._fireEvents(C, B, _);
						if ($ instanceof Function)
							TWaver.Utils.createFunction(this, $)(B);
						this._fireEvents(C, B, "after" + _);
						if (this["after" + _] instanceof Function)
							this["after" + _](B)
					}
				})
	},
	popupMenuGenerater : function(_, $) {
		return null
	},
	getElementById : function($) {
		if (!$ || !this.SVGDocument)
			return;
		if ($.tagName)
			return $;
		return this.SVGDocument.getElementById($)
	},
	destroy : function() {
		this.unloadSVG();
		TWaver.SVGComponent.superclass.destroy.call(this)
	},
	setCursor : function($) {
		if (!this.SVGRoot)
			return;
		return TWaver.Utils.setCursor(this.SVGRoot, $)
	},
	setSize : function(_, $) {
		if (_) {
			this.SVGRoot.setAttribute("width", _);
			if (this.IEEmbedNode)
				this.IEEmbedNode.setAttribute("width", _)
		}
		if ($) {
			this.SVGRoot.setAttribute("height", $);
			if (this.IEEmbedNode)
				this.IEEmbedNode.setAttribute("height", $)
		}
	},
	getSVGNode : function() {
		return isIE && !isIE9 ? this.IEEmbedNode : this.SVGRoot
	},
	focus : function($) {
		if (isIE && !isIE9) {
			if (this.IEEmbedNode)
				this.IEEmbedNode.focus()
		} else if (this.inputBox) {
			var _ = $ ? TWaver.Utils.getMouseLayerLocation($, this.canvas) : {
				x : this.canvas.scrollLeft,
				y : this.canvas.scrollTop
			};
			this.inputBoxDiv.style.left = _.x + "px";
			this.inputBoxDiv.style.top = _.y + "px";
			this.inputBox.focus()
		}
	},
	toString : function() {
		return "TWaver.SVGComponent"
	}
};
TWaver.extend(TWaver.SVGComponent, TWaver.EventDispatcher);
TWaver.SVGNetwork = function($, A, _) {
	if (TWaver.Utils.isString($))
		$ = new TWaver.DataBox(databox);
	else if (!$ instanceof TWaver.DataBox)
		throw new Error("dataBox should be type of \"TWaver.DataBox\"");
	TWaver.SVGNetwork.superclass.constructor.call(this, A, _);
	this
			.addEvents("databox.change", "scale.change",
					"currentsubnetwork.change");
	this.init($);
	this.on("interaction.change", this.onInteractionChange)
};
TWaver.SVGNetwork.prototype = {
	init : function($) {
		this.subnetworkViewports = {};
		this.__initSelectionModel(new TWaver.SelectionModel());
		this.setDefaultInteraction();
		if ($)
			this.setDataBox($)
	},
	synchronizeSelection : true,
	selectionModel : null,
	originalWidth : 0,
	originalHeight : 0,
	mouseDowning : false,
	mouseDragging : false,
	elementResizing : false,
	scale : 1,
	tx : 0,
	ty : 0,
	minScale : 0.1,
	maxScale : 5,
	markerCanvas : null,
	selectionRect : null,
	elementRoot : null,
	background : null,
	type : "network",
	dataBox : null,
	selectionRectStroke : "#888888",
	selectionRectStrokeWidth : 1,
	selectionRectFillColor : "#FFFFFF",
	selectionRectFillOpacity : 0.6,
	selectionRectStrokeDasharray : [3],
	defaultSelectionColor : "#DDDDDD",
	defaultSelectionStrokeWidth : 2,
	defaultResizeHandlerStrokeColor : "#000022",
	defaultResizeHandlerFillColor : "#FFFFEE",
	defaultResizeHandlerSize : 6,
	defaultSubnetworkId : "default",
	subnetworkViewports : null,
	MODE_NAME_DEFAULT : "default",
	MODE_NAME_EDIT : "edit",
	MODE_NAME_CREATELINK : "createLink",
	MODE_NAME_PAN : "pan",
	MODE_NAME_ZOOM : "zoom",
	referenceLineDasharray : 3,
	referenceLineWidth : 1,
	referenceLineColor : "#000000",
	selectionAdjusting : false,
	isEditing : false,
	currentSubNetworkId : null,
	elementEditable : true,
	elementResizable : true,
	enableRectangleSelect : true,
	getViewport : function($) {
		if (!$)
			$ = this.getCurrentSubNetworkId();
		return this.subnetworkViewports[$]
	},
	setCurrentSubNetwork : function(_) {
		if (this.currentSubNetworkId == _)
			return;
		var $ = this.currentSubNetworkId;
		this.currentSubNetworkId = _;
		this.fireEvent("currentsubnetwork.change", {
					oldValue : $,
					newValue : _,
					value : _
				})
	},
	getCurrentSubNetworkId : function() {
		if (!this.SVGRoot)
			return this.defaultSubnetworkId;
		var $ = this.SVGRoot.getAttribute("CSNID");
		if (!$ || $ == "null")
			$ = this.defaultSubnetworkId;
		return $
	},
	saveCurrentViewport : function() {
		this.subnetworkViewports[this.getCurrentSubNetworkId()] = this
				.getCurrentViewport()
	},
	getCurrentViewport : function() {
		var C = this.canvas.scrollLeft / this.scale, D = this.canvas.scrollTop
				/ this.scale, B = this.canvas.clientWidth / this.scale, _ = this.canvas.clientHeight
				/ this.scale, A = C + B / 2, $ = D + _ / 2;
		return {
			x : C,
			y : D,
			left : C,
			top : D,
			width : B,
			height : _,
			centerX : A,
			centerY : $
		}
	},
	resetViewport : function() {
		var $ = this.getViewport();
		if (!$)
			return;
		this.scrollToCenter($.centerX * this.scale, $.centerY * this.scale)
	},
	scrollTo : function(_, A, $) {
		TWaver.Utils.scrollTo(this.canvas, _, A, $ ? 20 : 0)
	},
	scrollToCenter : function(A, _, $) {
		TWaver.Utils.scrollToCenter(this.canvas, A, _, $ ? 20 : 0)
	},
	__initSelectionModel : function($) {
		this.selectionModel = new TWaver.SelectionModel();
		this.selectionModel.isSelectable = TWaver.Utils.createFunction(this,
				function($) {
					return this.isSelectable($)
				});
		this.selectionModel
				.on("selection.change", this.onSelectionChange, this)
	},
	getDataBox : function() {
		return this.dataBox
	},
	setDataBox : function($) {
		if (!$ instanceof TWaver.DataBox)
			throw new Error("dataBox should be type of \"TWaver.DataBox\"");
		if (this.dataBox == $)
			return;
		if (this.dataBox) {
			this.dataBox._removeResponseTarget(this.type);
			this.dataBox.un("network.update", this.update, this);
			this.dataBox.selectionModel.un("selection.change",
					this.onDataBoxSelectionChange)
		}
		this.dataBox = $;
		this.dataBox._appendResponseTarget(this.type);
		this.dataBox.on("network.update", this.update, this);
		this.dataBox.selectionModel.on("selection.change",
				this.onDataBoxSelectionChange, this);
		this.synchronizeSelectionFromDataBox()
	},
	synchronizeSelectionFromDataBox : function() {
		if (!this.synchronizeSelection || this.selectionAdjusting)
			return;
		this.selectionAdjusting = true;
		this.clearSelection();
		var $ = this.dataBox.selectionModel.getSelection();
		if ($)
			this.selectElements($);
		this.selectionAdjusting = false
	},
	synchronizeSelectionToDataBox : function() {
		if (!this.synchronizeSelection || this.selectionAdjusting)
			return;
		this.selectionAdjusting = true;
		var $ = this.selectionModel.getSelection();
		if ($)
			this.getDataBox().selectionModel.setSelection($);
		this.selectionAdjusting = false
	},
	setSynchronizeSelection : function($) {
		if (this.synchronizeSelection == $)
			return;
		this.synchronizeSelection = $;
		this.synchronizeSelectionFromDataBox()
	},
	onDataBoxSelectionChange : function($) {
		if (this.selectionAdjusting || !this.synchronizeSelection)
			return;
		this.synchronizeSelectionFromDataBox();
		this.checkSelection();
		if ($.type == "add") {
			var _ = $.target;
			if (TWaver.Utils.isArray(_) || _.length > 0)
				_ = _[_.length - 1];
			this.ensureVisible(_)
		}
	},
	onSelectionChange : function($) {
		this.synchronizeSelectionDrawing($);
		this.synchronizeSelectionToDataBox()
	},
	synchronizeSelectionDrawing : function($) {
		var B = $.type;
		if (B == "clear") {
			this._drawSelections($.target, false);
			return
		}
		var A = $.target;
		if (!A)
			return;
		var _ = (B == "add");
		if (!TWaver.Utils.isArray(A)) {
			A = this._checkElement(A);
			if (A) {
				_ ? this.drawSelection(A) : this.undrawSelection(A);
				if (_)
					this.ensureVisible(A, true)
			}
		} else if (A.length > 0) {
			this._drawSelections(A, _);
			if (_)
				this.ensureVisible(A[A.length - 1], true)
		}
	},
	_drawSelections : function(B, $) {
		if (!B)
			return;
		if (TWaver.Utils.isArray(B)) {
			for (var C = 0, A = B.length; C < A; C++) {
				var _ = this._checkElement(B[C]);
				if (_)
					$ ? this.drawSelection(_) : this.undrawSelection(_)
			}
		} else
			for (_ in B) {
				_ = this._checkElement(_);
				if (_)
					$ ? this.drawSelection(_) : this.undrawSelection(_)
			}
	},
	_checkElement : function($) {
		if (!$)
			return;
		if (TWaver.Utils.isString($))
			return TWaver.Utils.getChildById($, this.elementRoot,
					this.SVGDocument);
		return $
	},
	update : function(_) {
		if (!isMobile)
			this.saveCurrentViewport();
		var $ = this.dataBox.getSVGData(_);
		this.loadSVG($);
		if (!isMobile)
			this.resetViewport();
		this.setCurrentSubNetwork(this.getCurrentSubNetworkId())
	},
	_resetEditing : function() {
		if (this.interactionName != this.MODE_NAME_EDIT
				&& this.interactionName != this.MODE_NAME_DEFAULT)
			return;
		var $ = this.interactionName == this.MODE_NAME_EDIT;
		if (this.isEditing == $)
			return;
		this.isEditing = $;
		this.checkSelection()
	},
	onInteractionChange : function($) {
		this._resetEditing()
	},
	setDefaultInteraction : function() {
		if (isMobile) {
			this.setInteractionMode(this.MODE_NAME_DEFAULT, [
							TWaver.DefaultInputHandler,
							TWaver.SelectionInputHandler,
							TWaver.MoveInputHandler]);
			return
		}
		this.setInteractionMode(this.MODE_NAME_DEFAULT, [
						TWaver.BaseInputHandler, TWaver.DefaultInputHandler,
						TWaver.TooltipInputHandler,
						TWaver.PopupMenuInputHandler,
						TWaver.SelectionInputHandler,
						TWaver.RectangleSelectionInputHandler,
						TWaver.MoveInputHandler])
	},
	setEditInteraction : function() {
		if (isMobile) {
			this.setInteractionMode(this.MODE_NAME_EDIT, [
							TWaver.DefaultInputHandler,
							TWaver.SelectionInputHandler,
							TWaver.ResizeInputHandler,
							TWaver.ShapePointInputHandler,
							TWaver.MoveInputHandler]);
			return
		}
		this
				.setInteractionMode(this.MODE_NAME_EDIT, [
								TWaver.BaseInputHandler,
								TWaver.DefaultInputHandler,
								TWaver.TooltipInputHandler,
								TWaver.PopupMenuInputHandler,
								TWaver.SelectionInputHandler,
								TWaver.RectangleSelectionInputHandler,
								TWaver.ResizeInputHandler,
								TWaver.GridInputHandler,
								TWaver.ShapePointInputHandler,
								TWaver.MoveInputHandler])
	},
	setCreateLinkInteraction : function() {
		if (isMobile)
			return;
		this.setInteractionMode(this.MODE_NAME_CREATELINK, [
						TWaver.BaseInputHandler, TWaver.DefaultInputHandler,
						TWaver.TooltipInputHandler,
						TWaver.PopupMenuInputHandler,
						TWaver.SelectionInputHandler,
						TWaver.RectangleSelectionInputHandler,
						TWaver.ShapePointInputHandler,
						TWaver.CreateLinkInputHandler])
	},
	setCreateShapeNodeInteraction : function() {
		if (isMobile)
			return;
		this.setInteractionMode(this.MODE_NAME_CREATELINK, [
						TWaver.BaseInputHandler, TWaver.DefaultInputHandler,
						TWaver.TooltipInputHandler,
						TWaver.PopupMenuInputHandler,
						TWaver.CreateShapeNodeInputHandler])
	},
	setPanInteraction : function() {
		if (isMobile)
			return;
		this.setInteractionMode(this.MODE_NAME_PAN, [TWaver.BaseInputHandler,
						TWaver.DefaultInputHandler,
						TWaver.PopupMenuInputHandler,
						TWaver.SelectionInputHandler, TWaver.PanInputHandler],
				"pointer")
	},
	setZoomInteraction : function() {
		if (isMobile)
			return;
		this.setInteractionMode(this.MODE_NAME_ZOOM, [TWaver.BaseInputHandler,
						TWaver.TooltipInputHandler,
						TWaver.PopupMenuInputHandler, TWaver.ZoomInputHandler],
				"crosshair")
	},
	getElement : function($) {
		if (!$)
			return null;
		var _ = $.tagName ? $ : TWaver.Utils.getEventTarget($);
		while (_) {
			if (_.tagName == "svg" || _ == this.background
					|| _ == this.elementRoot
					|| (_.parentNode == this.elementRoot && _.tagName != "g"))
				return null;
			if (_.parentNode == this.elementRoot)
				return _;
			_ = _.parentNode
		}
		return null
	},
	getSelection : function() {
		return this.selectionModel.getSelection()
	},
	getSelectionSize : function() {
		return this.selectionModel.getSize()
	},
	hasSelection : function() {
		return this.selectionModel.hasSelection()
	},
	moveSelection : function(A, B, $, D, _, C) {
		this.dataBox.moveElement(this.getSelection(), A, B, $, D, _, C)
	},
	removeSelection : function() {
		this.getDataBox().removeElement(this.getSelection())
	},
	elementDoubleClick : function(_, B, A) {
		if (!this.dataBox)
			return;
		if (!_)
			return this.backgroundDoubleClick(B, A);
		var $ = _;
		if (_.nodeType) {
			if (!_.id)
				return;
			$ = _.id
		} else {
			_ = TWaver.Utils
					.getChildById(_, this.elementRoot, this.SVGDocument);
			if (!_)
				return
		}
		if (!this.isDoubleClickable(_))
			return;
		if (!B)
			B = {};
		B["twaver.element.id"] = $;
		this.dataBox.update("handleElementDoubleClick", B, A);
        return true;
	},
	backgroundDoubleClick : function(_, $) {
		if (this.isTopSubNetwork())
			return;
		this.dataBox.update("handleBackgroundDoubleClick", _, $)
	},
	isTopSubNetwork : function() {
		return this.currentSubNetworkId == this.defaultSubnetworkId
	},
	isDoubleClickable : function($) {
		if ($.hasAttribute("doubleClickable") || $.hasAttribute("link-expand"))
			return true;
		var _ = $.getAttribute("elementClass");
		return _ && (_ == "Group" || _ == "SubNetwork")
	},
	isAttachment : function($) {
		return $.hasAttribute("isAttachment")
	},
	isSelectable : function($) {
		if (!$)
			return false;
		$ = this._checkElement($);
		if (!$ || $.nodeType != 1)
			return false;
		return $ != this.elementRoot && $.tagName == "g"
				&& !this.isAttachment($)
				&& $.getAttribute("pointer-events") != "none"
	},
	isMovable : function($) {
		if (!$ || $.nodeType != 1)
			return false;
		var _ = $.getAttribute("elementMovable");
		return (_ && _ == "false") ? false : true
	},
	isLinkable : function($) {
		if (!$ || $.nodeType != 1)
			return false;
		var _ = $.getAttribute("elementClass");
		return _ != "Link" && _ != "ShapeLink"
	},
	isEditable : function($) {
		return this.elementEditable
	},
	isResizable : function($) {
		if (!this.elementResizable || !$ || $.nodeType != 1)
			return false;
		return $.hasAttribute("elementResizable")
	},
	selectElement : function(_, B, $) {
		var A = this.selectionModel._select(_, B, $);
		if (!(isIE && !isIE9) && A)
			this.focus();
		return A
	},
	unSelectElement : function(_, $) {
		return this.selectElement(_, false, $)
	},
	selectElements : function(B, A, _, $) {
		this.selectionModel.selectElements(B, A, _, $);
		if (!(isIE && !isIE9) && A !== false)
			this.focus()
	},
	reverseElementSelection : function(_, $) {
		this.selectionModel.reverseSelect(_, $)
	},
	clearSelection : function() {
		this.selectionModel.clearSelection()
	},
	selectAll : function() {
		var $ = TWaver.Utils.getChildrenByTagName(this.elementRoot, "g");
		this.selectElements($)
	},
	selectInverse : function() {
		var B = TWaver.Utils.getChildrenByTagName(this.elementRoot, "g");
		if (!B || B.length == 0)
			return;
		var _ = [];
		for (var C = 0, A = B.length; C < A; C++) {
			var $ = B[C];
			if (!this.isSelected($.id))
				_.push($)
		}
		this.clearSelection();
		this.selectElements(_)
	},
	isSelected : function($) {
		return this.selectionModel.isSelected($)
	},
	selectElementsByRectangle : function(J, I, A, G, D, _) {
		if (A < 0) {
			J += A;
			A = -A
		}
		if (G < 0) {
			I += G;
			G = -G
		}
		var F = {
			x : J,
			y : I,
			width : A,
			height : G,
			left : J,
			right : J + A,
			top : I,
			bottom : I + G
		}, H = TWaver.Utils.getChildrenByTagName(this.elementRoot, "g"), B = [];
		for (var E = 0; E < H.length; E++) {
			var $ = H[E], C = this.getElementBounds($);
			if (!C)
				continue;
			if (D) {
				if (this._intersects(F, C, $))
					B.push($)
			} else if (TWaver.Utils.containRect(F, C))
				B.push($)
		}
		this.selectElements(B, true, _)
	},
	_intersects : function($, B, _) {
		if (!TWaver.Utils.intersects($, B))
			return false;
		if (this.isPathElement(_)) {
			var A = this.__getPath(_);
			if (A)
				return TWaver.Utils.intersectRectPath($.x, $.y, $.width,
						$.height, A)
		}
		return true
	},
	isPathElement : function($) {
		var _ = $.getAttribute("elementClass");
		return _ == "Link" || _ == "ShapeNode" || _ == "ShapeLink"
	},
	__getPath : function(_) {
		_ = TWaver.Utils.getFirstElementChildByTagName(_, "use");
		if (!_)
			return null;
		if (_.instanceRoot)
			return _.instanceRoot.correspondingElement;
		else {
			var A = _.getAttributeNS(TWaver.Const.NS_XLINK, "href");
			if (A.charAt(0) == "#") {
				var $ = A.substring(1);
				return TWaver.Utils.getChildById($, this.SVGDefsNode,
						this.SVGDocument)
			}
		}
	},
	hasOwnBorder : function($) {
		var _ = $.getAttribute("elementClass");
		return _ && (_ == "Link" || _ == "ShapeNode" || _ == "ShapeLink")
	},
	_drawOwnBorder : function(_) {
		var $ = TWaver.Utils.getFirstElementChildByTagName(_, "use");
		$.setAttribute("visibility", "visible")
	},
	_undrawOwnBorder : function(_) {
		var $ = TWaver.Utils.getFirstElementChildByTagName(_, "use");
		$.setAttribute("visibility", "hidden")
	},
	_drawDefaultBorder : function($) {
		if (this.hasOwnBorder($))
			this._drawOwnBorder($);
		else {
			var _ = this._getElementSelectionInfo($);
			TWaver.Utils.drawRect(this.SVGDocument, $, "border", _.x, _.y,
					_.width, _.height, _.color, _.strokeWidth, "none", null,
					"none")
		}
	},
	getShapePoints : function(_) {
		var B = _.getAttribute("shapePoints");
		if (!B)
			return;
		var C = B.split(",");
		if (!C || C.length == 0)
			return;
		var D = [];
		for (var E = 0; E < C.length; E++) {
			var $ = C[E];
			if (!$)
				continue;
			var A = this._getPoint($, " ");
			if (A)
				D.push(A)
		}
		return D
	},
	_getPoint : function(_, $) {
		if (!_)
			return;
		if (!$)
			$ = ",";
		var A = _.split($);
		if (!A || A.length != 2)
			return;
		return {
			x : new Number(A[0]),
			y : new Number(A[1])
		}
	},
	_drawEditBorder : function($) {
		if (this.hasOwnBorder($)) {
			this._drawOwnBorder($);
			var A = this.getShapePoints($);
			if (A && A.length > 0)
				this._drawEditPointsBorder($, A, this._getPoint($
								.getAttribute("fromPoint")), this._getPoint($
								.getAttribute("toPoint")))
		} else {
			var _ = this._getElementSelectionInfo($);
			this._drawEditRectBorder($, _.x, _.y, _.width, _.height, _.color)
		}
	},
	drawSelection : function($) {
		if (!$)
			return;
		if (this.isEditing && this.isEditable($) && this.isResizable($))
			this._drawEditBorder($);
		else
			this._drawDefaultBorder($)
	},
	undrawSelection : function($) {
		if (!$)
			return;
		if (this.hasOwnBorder($))
			this._undrawOwnBorder($);
		this._undrawBorder($)
	},
	checkSelection : function($) {
		if (!this.SVGRoot)
			return;
		var B = {};
		for (var _ in this.selectionModel.selection) {
			_ = this._checkElement(_);
			if (_) {
				this.undrawSelection(_);
				if (!this.synchronizeSelection && this.isSelectable(_)) {
					this.drawSelection(_);
					B[_.id] = true
				}
			}
		}
		if (this.synchronizeSelection) {
			var A = this.dataBox.selectionModel.selection;
			for (_ in A) {
				_ = this._checkElement(_);
				if (!_)
					continue;
				if (this.isSelectable(_)) {
					this.drawSelection(_);
					B[_.id] = true
				}
			}
		}
		this.selectionModel.setSelection(B, true)
	},
	_drawEditRectBorder : function($, M, L, E, G, I) {
		if (E < 1)
			E = 1;
		if (G < 1)
			G = 1;
		var F = this.getResizeHandlerStrokeColor($), B = this
				.getResizeHandlerFillColor($), K = this.getResizeHandlerSize($,
				Math.min(E, G) / 2), _ = TWaver.Utils.drawRect(
				this.SVGDocument, $, "border", M, L, E, G, I,
				this.referenceLineWidth, "none", null, "none",
				this.referenceLineDasharray), D = this._drawResizeHandler($,
				"border.rect.top.left", M, L, K, F, 1, B);
		TWaver.Utils.setCursor(D, "nw-resize");
		D.isLeft = true;
		D.isTop = true;
		var C = this._drawResizeHandler($, "border.rect.top.right", M + E, L,
				K, F, 1, B);
		TWaver.Utils.setCursor(C, "ne-resize");
		C.isLeft = false;
		C.isTop = true;
		var A = this._drawResizeHandler($, "border.rect.bottom.left", M, L + G,
				K, F, 1, B);
		TWaver.Utils.setCursor(A, "sw-resize");
		A.isLeft = true;
		A.isTop = false;
		var H = this._drawResizeHandler($, "border.rect.bottom.right", M + E, L
						+ G, K, F, 1, B);
		TWaver.Utils.setCursor(H, "se-resize");
		H.isLeft = false;
		H.isTop = false;
		var J = {
			bounds : {
				x : M,
				y : L,
				width : E,
				height : G
			},
			boundsNode : _,
			topLeft : D,
			topRight : C,
			bottomLeft : A,
			bottomRight : H
		};
		D.borderInfo = J;
		C.borderInfo = J;
		A.borderInfo = J;
		H.borderInfo = J
	},
	_drawEditPointsBorder : function($, I, H, B) {
		if (!TWaver.Utils.isArray(I) || I.length == 0)
			return;
		var D = this.getResizeHandlerStrokeColor($), A = this
				.getResizeHandlerFillColor($), J = this.getResizeHandlerSize($), F, _ = 0;
		if (H && B) {
			_ = 1;
			F = [H].concat(I);
			F.push(B)
		} else
			F = I;
		var K = TWaver.Utils.drawPolyline(this.SVGDocument, $, F, "border",
				this.referenceLineColor, this.referenceLineWidth, "none", null,
				"none", this.referenceLineDasharray);
		for (var E = 0; E < I.length; E++) {
			var G = I[E], C = this._drawResizeHandler($, "border.point." + E,
					G.x, G.y, J, D, 1, A);
			if (!isIE)
				C.pointInfo = {
					points : F,
					border : K,
					indexInAllPoints : E + _,
					index : E
				};
			else {
				C.setAttribute("index", E);
				C.setAttribute("indexInAllPoints", E + _)
			}
		}
	},
	getResizeHandlerStrokeColor : function($) {
		return this.defaultResizeHandlerStrokeColor
	},
	getResizeHandlerFillColor : function($) {
		return this.defaultResizeHandlerFillColor
	},
	getResizeHandlerSize : function($, _) {
		return this.defaultResizeHandlerSize
	},
	_drawResizeHandler : function(B, $, G, E, C, D, F, _) {
		var A = TWaver.Utils.drawRectAtCenter(this.SVGDocument, B, $, G, E, C
						|| this.defaultResizeHandlerSize, C
						|| this.defaultResizeHandlerSize, D
						|| this.defaultResizeHandlerStrokeColor, 1, _
						|| this.defaultResizeHandlerFillColor);
		B.appendChild(A);
		TWaver.Utils.setCursor(A, "crosshair");
		return A
	},
	_undrawBorder : function(_) {
		var B = [], A = TWaver.Utils.getChildrenByTagName(_);
		for (var C = 0; C < A.length; C++) {
			var $ = A[C];
			if (($.tagName == "rect" || $.tagName == "path" || $.tagName == "polyline")
					&& $.id && $.id.indexOf("border") >= 0)
				B.push($)
		}
		for (C = 0; C < B.length; C++)
			_.removeChild(B[C])
	},
	drawSelectionRect : function(C, B, _, $, A) {
		if (!this.selectionRect)
			this.selectionRect = this._createSelectionRect();
		this.selectionRect.setAttribute("visibility", "hidden");
		this.markerCanvas.appendChild(this.selectionRect);
		this._drawSelectionRect(C, B, _, $, A, this.selectionRect);
		this.selectionRect.setAttribute("visibility", "visible")
	},
	_drawSelectionRect : function(D, C, _, $, A, B) {
		if (_ < 0) {
			D += _;
			_ = -_
		}
		if ($ < 0) {
			C += $;
			$ = -$
		}
		B.setAttribute("x", D);
		B.setAttribute("y", C);
		B.setAttribute("width", _);
		B.setAttribute("height", $);
		B.setAttribute("stroke-dasharray", A
						? this.selectionRectStrokeDasharray
						: null)
	},
	_createSelectionRect : function() {
		var $ = this.SVGDocument.createElementNS(TWaver.Const.NS_SVG, "rect");
		$.setAttribute("pointer-events", "none");
		$.setAttribute("fill-opacity", this.selectionRectFillOpacity);
		$.setAttribute("stroke", this.selectionRectStroke);
		$.setAttribute("stroke-linejoin", "round");
		$.setAttribute("stroke-width", this.selectionRectStrokeWidth);
		$.setAttribute("fill", this.selectionRectFillColor);
		$.setAttribute("shape-rendering", "crispEdges");
		return $
	},
	undrawSelectionRect : function() {
		if (this.markerCanvas && this.selectionRect) {
			this.markerCanvas.removeChild(this.selectionRect);
			delete this.selectionRect
		}
	},
	getSelectionColor : function($) {
		return this.defaultSelectionColor
	},
	getSelectionStrokeWidth : function($) {
		return this.defaultSelectionStrokeWidth
	},
	_getElementSelectionInfo : function(_) {
		var $ = this.getElementBounds(_), A = _.getAttribute("bcolor");
		if (!A)
			A = this.getSelectionColor(_);
		var B = this.getSelectionStrokeWidth(_);
		return {
			x : $.x,
			y : $.y,
			width : $.width,
			height : $.height,
			color : A,
			strokeWidth : B
		}
	},
	getElementBounds : function($, D) {
		if (!$.getAttribute("bx"))
			return null;
		var C = parseInt($.getAttribute("bx")), B = parseInt($
				.getAttribute("by")), A = parseInt($.getAttribute("bwidth")), _ = parseInt($
				.getAttribute("bheight"));
		if (D) {
			C *= this.scale;
			B *= this.scale;
			A *= this.scale;
			_ *= this.scale;
			C += this.tx;
			B += this.ty
		}
		return {
			left : C - A / 2,
			right : C - A / 2 + A,
			top : B - _ / 2,
			bottom : B - _ / 2 + _,
			cx : C,
			cy : B,
			x : C - A / 2,
			y : B - _ / 2,
			width : A,
			height : _
		}
	},
	resetTransform : function() {
		var $ = {
			a : this.scale,
			b : 0,
			c : 0,
			d : this.scale,
			e : this.tx,
			f : this.ty
		};
		TWaver.Utils.setSVGCTM(this.elementRoot, $);
		this.adjustBounds();
		if (isIE)
			this.adjustBounds();
		this.adjustBackground()
	},
	translate : function(_, $) {
		this.tx = _;
		this.ty = $;
		this.resetTransform()
	},
	setScale : function(_, $, B) {
		if (!B && this.scale == _)
			return;
		if (_ > this.maxScale)
			_ = this.maxScale;
		else if (_ < this.minScale)
			_ = this.minScale;
		if (!B && this.scale == _)
			return;
		var D, C;
		if ($) {
			D = {
				x : $.x / this.scale,
				y : $.y / this.scale
			};
			C = {
				x : $.x - this.canvas.scrollLeft,
				y : $.y - this.canvas.scrollTop
			}
		}
		var A = this.scale;
		this.scale = _;
		this.resetTransform();
		if (D
				&& (TWaver.Utils.hasHorizontalScrollBar(this.canvas) || TWaver.Utils
						.hasVerticalScrollBar(this.canvas)))
			this.scrollTo(D.x * this.scale - C.x, D.y * this.scale - C.y);
		if (A == this.scale)
			return;
		this.fireEvent("scale.change", {
					oldValue : A,
					newValue : this.scale
				})
	},
	resetZoom : function() {
		this.setScale(1)
	},
	zoomIn : function($) {
		this.setScale(this.scale * 1.3, $)
	},
	zoomOut : function($) {
		this.setScale(this.scale / 1.3, $)
	},
	zoomToOverview : function() {
		if (!this.SVGDocument)
			return;
		var A = this.canvas.clientWidth, _ = this.canvas.clientHeight, $ = Math
				.min(A / this.originalWidth, _ / this.originalHeight);
		this.setScale($)
	},
	adjustBackground : function() {
		if (this.background) {
			var _ = 1 / this.scale, $ = {
				a : _,
				b : 0,
				c : 0,
				d : _,
				e : -_ * this.tx,
				f : -_ * this.ty
			};
			TWaver.Utils.setSVGCTM(this.background, $)
		}
	},
	adjustBounds : function() {
		if (!this.canvas || !this.SVGRoot)
			return;
		var A = this.canvas.style.overflow;
		if (isIE && A && A.toLowerCase() == "hidden") {
			this.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
			return
		}
		var C = this.originalWidth * this.scale, B = this.originalHeight
				* this.scale, D = isMobile ? 0 : 15;
		this.setSize(C, B);
		var _ = this.canvas.clientWidth
				+ (!isMobile
						&& TWaver.Utils.hasHorizontalScrollBar(this.canvas)
						? D
						: 0), $ = this.canvas.clientHeight
				+ (!isMobile && TWaver.Utils.hasVerticalScrollBar(this.canvas)
						? D
						: 0);
		if (C < _)
			C = _;
		if (B < $)
			B = $;
		this.setSize(C, B)
	},
	prepareElement : function($, _) {
		if (isMobile)
			this.prepareTouchSuport($);
		var A = $.getAttribute("message-elementid")
				|| $.getAttribute("elementid");
		if (A) {
			$.setAttribute("isAttachment", true);
			$.setAttribute("elementId", A)
		}
		TWaver.Utils.forEachChildren($, function(_) {
			if (_.nodeType == 1
					&& (_.hasAttribute("attIcon") || _.getAttribute("type") == "handler")) {
				_.setAttribute("type", "handler");
				if ($.hasAttribute("message-elementid"))
					_.setAttribute("attachmentName", "attachment.message");
				if (_.hasAttribute("attIcon")) {
					var B = _.getAttribute("attIcon");
					_.setAttribute("action", B)
				}
				_
						.setAttribute("elementId", $.id
										|| $.getAttribute("elementId"));
				TWaver.Utils.setCursor(_, "pointer");
				if (isMobile && _.tagName == "use") {
					var E = _.instanceRoot.correspondingElement;
					if (E) {
						E = E.cloneNode(true);
						var D = _.attributes;
						for (var F = 0, A = D.length; F < A; F++) {
							var C = D[F];
							if (C.name && C.name != "xlink:href")
								E.setAttribute(C.name, C.nodeValue)
						}
						E.setAttribute("opacity", 0);
						$.appendChild(E)
					}
				}
			}
		}, this)
	},
	prepareTouchSuport : function(_) {
		if (this.isPathElement(_)) {
			var C = _.firstElementChild;
			while (C && C.tagName == "use" && C.nextElementSibling)
				if (C.nextElementSibling.tagName == "use")
					C = C.nextElementSibling;
				else
					break;
			if (C && C.tagName == "use" && C.instanceRoot) {
				var A = C.instanceRoot.correspondingElement;
				if (A && A.tagName == "path") {
					A = A.cloneNode(true);
					A.setAttribute("fill", C.getAttribute("fill"));
					A.setAttribute("stroke-width", C
									.getAttribute("stroke-width"));
					A.setAttribute("stroke", "#ff0000");
					A.setAttribute("stroke-opacity", 0);
					A.setAttribute("fill-opacity", 0);
					_.appendChild(A)
				}
			}
		} else {
			var $ = this.getElementBounds(_);
			if ($) {
				var B = this.SVGDocument.createElementNS(TWaver.Const.NS_SVG,
						"rect");
				B.setAttribute("x", $.x);
				B.setAttribute("y", $.y);
				B.setAttribute("width", $.width);
				B.setAttribute("height", $.height);
				B.setAttribute("fill", "#ff0000");
				B.setAttribute("fill-opacity", 0);
				_.appendChild(B)
			}
		}
	},
	onSVGRootChange : function() {
		delete this.markerCanvas;
		TWaver.SVGNetwork.superclass.onSVGRootChange.apply(this, arguments);
		this.originalWidth = this.SVGRoot.getAttribute("width");
		this.originalHeight = this.SVGRoot.getAttribute("height");
		this.elementRoot = TWaver.Utils.getFirstElementChildByTagName(
				this.SVGRoot, "g");
		if (!this.elementRoot)
			return;
		this.background = null;
		var E = TWaver.Utils.getFirstElementChild(this.elementRoot);
		if (E && E.id == "svg_background_id") {
			this.background = E;
			if (isMobile) {
				var C = this.background.nextElementSibling;
				if (C && C.tagName == "use")
					C.setAttribute("pointer-events", "none")
			}
		}
		if (isChrome) {
			var A = window.location.protocol + "//" + window.location.host, B = TWaver.Utils
					.getChildrenByTagName(this.SVGDefsNode, "image");
			for (var I = 0, D = B.length; I < D; I++) {
				var _ = B[I], G = _.getAttributeNS(TWaver.Const.NS_XLINK,
						"href");
				if (G && G.length > 0 && G.charAt(0) == "/")
					_.setAttributeNS(TWaver.Const.NS_XLINK, "href", A + G)
			}
		}
		var F = TWaver.Utils.getChildrenByTagName(this.elementRoot, "g"), H = F.length;
		for (I = 0; I < H; I++) {
			var $ = F[I];
			this.prepareElement($, this.elementRoot)
		}
		this.resetUndoRedo();
		this.markerCanvas = this.SVGDocument.createElementNS(
				TWaver.Const.NS_SVG, "g");
		this.markerCanvas.setAttribute("pointer-events", "none");
		this.SVGRoot.appendChild(this.markerCanvas);
		this.setScale(this.scale, null, true);
		this.checkSelection(true)
	},
	highlightColor : "#0000FF",
	highlightStrokeWidth : 2,
	highlight : function(_) {
		if (_ == this._highlightElement)
			return;
		this.unHighlight();
		if (!_)
			return;
		var $ = this.getElementBounds(_);
		if (!$)
			return;
		var A = this.drawHighlight(_, $, this.highlightColor,
				this.highlightStrokeWidth);
		A.id = "__highlight";
		this._highlightElement = _
	},
	drawHighlight : function(_, $, A, B) {
		return TWaver.Utils.drawRect(this.SVGDocument, _, "__highlight", $.x,
				$.y, $.width, $.height, A, B, "none", null, "none")
	},
	unHighlight : function() {
		var _ = this._highlightElement;
		if (!_)
			return;
		var $ = TWaver.Utils.getChildById("__highlight", _, this.SVGDocument);
		if ($)
			_.removeChild($);
		delete this._highlightElement
	},
	canUndo : null,
	canRedo : null,
	resetUndoRedo : function() {
		this.canRedo = this.SVGRoot.getAttribute("canRedo") == "true";
		this.canUndo = this.SVGRoot.getAttribute("canUndo") == "true"
	},
	copyElementIds : null,
	copy : function() {
		var $ = this.getSelection();
		if ($ && $.length > 0)
			this.copyElementIds = this.getSelection()
	},
	paste : function(_, $) {
		if (this.copyElementIds)
			this.dataBox.copy(this.copyElementIds, _ || 0, $ || 0)
	},
	exportImage : function() {
		this.dataBox.exportImage()
	},
	exportSVG : function() {
		this.dataBox.exportSVG()
	},
	ensureVisible : function(A, C, B) {
		if (!A)
			return;
		if (TWaver.Utils.isString(A)) {
			var _ = A;
			A = this._checkElement(A);
			if (!A && !C) {
				if (_ != this.NOT_FIND_ELEMENT) {
					this.NOT_FIND_ELEMENT = _;
					this.dropIntoSubNetwork(_)
				} else
					delete this.NOT_FIND_ELEMENT;
				return
			}
		}
		if (!A)
			return;
		var $ = this.getElementBounds(A, true);
		if ($)
			this.ensureVisibleByRectangle($, B)
	},
	dropIntoSubNetwork : function($, A, _) {
		this.dataBox.dropIntoSubNetwork($, A, _)
	},
	ensureVisibleByRectangle : function(_, D) {
		var $ = TWaver.Utils.getViewport(this.canvas);
		if (!D && TWaver.Utils.intersects($, _))
			return;
		var A = $.width < _.width, B = $.height < _.height, E, C;
		if (A)
			C = _.left;
		else
			C = _.cx - $.width / 2;
		if (B)
			E = _.top;
		else
			E = _.cy - $.height / 2;
		this.scrollTo(C, E)
	},
	refresh : function(_, $) {
		if (!_)
			_ = {};
		if (!_["twaver.response.target"])
			_["twaver.response.target"] = this.type;
		this.dataBox.update(null, _, $)
	},
	addLink : function(D, $, A, C, _, B) {
		this.dataBox.addLink(D, $, A, C, _, B)
	},
	addShapeNode : function(B, _, $, A) {
		this.dataBox.addShapeNode(B, _, $, A)
	},
	toString : function() {
		return "TWaver.SVGNetwork"
	}
};
TWaver.extend(TWaver.SVGNetwork, TWaver.SVGComponent);
TWaver.BaseInputHandler = {
	destroy : function($) {
		this.deleteMouseInfo($)
	},
	mouseclick : function(_, $) {
		if (isMobile) {
			TWaver.Utils.eventPreventDefault(_);
			return
		}
		if (_.shiftKey || _.ctrlKey || _.metaKey || _.altKey)
			TWaver.Utils.eventPreventDefault(_)
	},
	deleteMouseInfo : function($) {
		delete $.mouseDowning;
		delete $.mouseDragging
	},
	beforemousedown : function(_, $) {
		TWaver.Utils.eventPreventDefault(_);
		$.mouseDowning = true;
		if (!isIE)
			$.focus(_)
	},
	afterrightclick : function(_, $) {
		this.deleteMouseInfo($)
	},
	isOutCanvas : function(_, $) {
		var A = _.relatedTarget
	},
	mouseout : function(_, $) {
		if (this.isOutCanvas(_, $))
			this.deleteMouseInfo($)
	},
	beforemousemove : function(_, $) {
		if ($.mouseDowning)
			$.mouseDragging = true
	},
	aftermouseup : function(_, $) {
		this.deleteMouseInfo($)
	},
	beforekeydown : function(_, $) {
		if (_.keyCode == 27) {
			this.destroy($);
			return
		}
	}
};
TWaver.CreateLinkInputHandler = {
	LINK_COLOR : "#0000EE",
	LINK_STROKE_WIDTH : 2,
	LINK_STROKE_DASHARRAY : 2,
	createLink : function(C, A) {
		if (!A) {
			this.destroy(C);
			return
		}
		var B = [];
		for (var D = 1; D < C.drawingLinkPoints.length; D++) {
			var _ = C.drawingLinkPoints[D];
			B[D - 1] = (_.x / C.scale) + "," + (_.y / C.scale)
		}
		var $ = C.fromNode.id;
		this.destroy(C);
		C.addLink($, A.id, "link", B)
	},
	destroy : function($) {
		delete $.fromNode;
		delete $.drawingLinkPoints;
		delete $.elementResizing;
		delete $._mouseMoved;
		if ($.drawingLinkShape) {
			$.markerCanvas.removeChild($.drawingLinkShape);
			delete $.drawingLinkShape
		}
		$.unHighlight()
	},
	aftermousedown : function(_, A) {
		if (_.button == 2)
			return;
		var $ = A.getElement(_);
		if (!$ || !A.isLinkable($)) {
            TWaver.Utils.stopEvent(_);
			if (_.detail == 2) {
				this.destroy(A);
				return
			}
			if (A.drawingLinkPoints) {
				A.drawingLinkPoints.push(TWaver.Utils.getMouseLayerLocation(_,
						A.canvas));
				this.drawLink(A, A.drawingLinkPoints)
			}
			return
		}
		if (A.drawingLinkPoints && A._mouseMoved) {
			this.drawLink(A, A.drawingLinkPoints, TWaver.Utils
							.getMouseLayerLocation(_, A.canvas));
			this.createLink(A, $)
		} else {
			A.fromNode = $;
			A.drawingLinkPoints = [TWaver.Utils.getMouseLayerLocation(_,
					A.canvas)]
		}
	},
	mouseover : function(_, A) {
		var $ = A.getElement(_);
		if ($ && A.isLinkable($))
			A.highlight($)
	},
	mouseout : function($, _) {
		_.unHighlight()
	},
	mousemove : function(_, A) {
		if (!A.drawingLinkPoints)
			return;
        TWaver.Utils.stopEvent(_);
		A._mouseMoved = true;
		var $ = TWaver.Utils.getMouseLayerLocation(_, A.canvas);
		this.drawLink(A, A.drawingLinkPoints, $)
	},
	mouseup : function(_, A) {
		if (!A.mouseDragging)
			return;
		var $ = A.getElement(_);
		if ($ && A.isLinkable($) && A.drawingLinkPoints) {
			this.drawLink(A, A.drawingLinkPoints, TWaver.Utils
							.getMouseLayerLocation(_, A.canvas));
			this.createLink(A, $)
		}
	},
	drawLink : function(D, C, A) {
		if (!D.markerCanvas)
			return;
		var _ = D.drawingLinkShape;
		if (!_) {
			_ = D.SVGDocument.createElementNS(TWaver.Const.NS_SVG, "path");
			_.setAttribute("stroke", this.LINK_COLOR);
			_.setAttribute("stroke-dasharray", this.LINK_STROKE_DASHARRAY);
			_.setAttribute("stroke-width", this.LINK_STROKE_WIDTH);
			_.setAttribute("fill", "none");
			D.markerCanvas.appendChild(_);
			D.drawingLinkShape = _;
			D.elementResizing = true
		}
		var F = C[0], B = "M" + F.x + " " + F.y;
		for (var E = 1; E < C.length; E++) {
			var $ = C[E];
			B += "L" + $.x + " " + $.y
		}
		if (A)
			B += "L" + A.x + " " + A.y;
		_.setAttribute("d", B)
	},
	keydown : function($, _) {
		if ($.keyCode == 27)
			this.destroy(_)
	}
};
TWaver.CreateShapeNodeInputHandler = {
	LINK_COLOR : "#0000EE",
	LINK_STROKE_WIDTH : 2,
	LINK_STROKE_DASHARRAY : 2,
	FILL_COLOR : "#FFFFCC",
	FILL_OPACITY : 0.7,
	createShapeNode : function(A, _) {
		if (!_ || _.length == 0)
			return;
		for (var B = 0; B < _.length; B++) {
			var $ = _[B];
			_[B] = ($.x / A.scale) + "," + ($.y / A.scale)
		}
		A.addShapeNode(_, "shape node");
		this.destroy(A)
	},
	destroy : function($) {
		delete $.drawingLinkPoints;
		delete $.oldCreatePoints;
		delete $.elementResizing;
		if ($.drawingShapeNode) {
			$.markerCanvas.removeChild($.drawingShapeNode);
			delete $.drawingShapeNode
		}
	},
	aftermousedown : function($, _) {
        TWaver.Utils.stopEvent($);
		if ($.button == 2)
			return;
		if (_.drawingLinkPoints) {
			if ($.detail == 2) {
                TWaver.Utils.stopEvent($);
				this.createShapeNode(_, _.drawingLinkPoints);
				return
			}
			_.drawingLinkPoints.push(TWaver.Utils.getMouseLayerLocation($,
					_.canvas));
			this.drawLink(_, _.drawingLinkPoints)
		} else
			_.drawingLinkPoints = [TWaver.Utils.getMouseLayerLocation($,
					_.canvas)]
	},
	mousemove : function(_, A) {
		if (!A.drawingLinkPoints)
			return;
		var $ = TWaver.Utils.getMouseLayerLocation(_, A.canvas);
		this.drawLink(A, A.drawingLinkPoints, $)
	},
	drawLink : function(D, B, _) {
		if (!D.markerCanvas)
			return;
		var C = D.drawingShapeNode;
		if (!C) {
			C = D.SVGDocument.createElementNS(TWaver.Const.NS_SVG, "path");
			C.setAttribute("stroke", this.LINK_COLOR);
			C.setAttribute("stroke-dasharray", this.LINK_STROKE_DASHARRAY);
			C.setAttribute("stroke-width", this.LINK_STROKE_WIDTH);
			C.setAttribute("fill", this.FILL_COLOR);
			C.setAttribute("fill-opacity", this.FILL_OPACITY);
			D.markerCanvas.appendChild(C);
			D.drawingShapeNode = C;
			D.elementResizing = true
		}
		var F = B[0], A = "M" + F.x + " " + F.y;
		for (var E = 1; E < B.length; E++) {
			var $ = B[E];
			A += "L" + $.x + " " + $.y
		}
		if (_)
			A += "L" + _.x + " " + _.y;
		C.setAttribute("d", A)
	},
	keydown : function(A, B) {
		if (A.keyCode == 27) {
			this.destroy(B);
			return
		}
		if (B.drawingLinkPoints && TWaver.Utils.isCtrlKey(A))
			if (A.keyCode == 90 && B.drawingLinkPoints.length > 1) {
				var _ = B.drawingLinkPoints.pop();
				this.drawLink(B, B.drawingLinkPoints);
				var $ = B.oldCreatePoints;
				if (!$) {
					$ = [];
					B.oldCreatePoints = $
				}
				$.push(_)
			} else if (A.keyCode == 89 && B.oldCreatePoints
					&& B.oldCreatePoints.length > 0) {
				B.drawingLinkPoints.push(B.oldCreatePoints.pop());
				this.drawLink(B, B.drawingLinkPoints)
			}
	}
};
TWaver.DefaultInputHandler = {
	mouseup : function($, _) {
	},
	destroy : function($) {
	},
	mouseclick : function(_, D) {
		var B = TWaver.Utils.getEventTarget(_);
		if (B.getAttribute("type") == "handler") {
			var $ = B.getAttribute("elementId");
			if (!$)
				return;
			var A = B.getAttribute("action"), C = B
					.getAttribute("attachmentName");
			D.dataBox.attachmentAction($, C, A);
			return
		}
	},
	doubleclick : function(_, B) {
		var A = TWaver.Utils.getEventTarget(_), $ = B.getElement(_);
		if (!B.elementResizing) {
			if (B._startPoint)
				delete B._startPoint;
			var stop = B.elementDoubleClick($);
			if (stop)
				TWaver.Utils.stopEvent(_);
			else
				TWaver.Utils.eventPreventDefault(_);
			if (isOpera)
				TWaver.BaseInputHandler.deleteMouseInfo(B)
		}
	},
	keydown : function($, _) {
		if (!_.isEditing)
			return;
		if ($.keyCode == 8 || $.keyCode == 46 || $.keyCode == 127) {
			var A = _.getSelectionSize();
			if (A == 0)
				return;
			TWaver.Utils.eventPreventDefault($);
			if (confirm("Sure to delete these " + A + " elements ?"))
				_.removeSelection()
		} else if (TWaver.Utils.isCtrlKey($) && $.keyCode == 67) {
			TWaver.Utils.eventPreventDefault($);
			_.copy()
		} else if (TWaver.Utils.isCtrlKey($) && $.keyCode == 86) {
			TWaver.Utils.eventPreventDefault($);
			_.paste(5, 5)
		} else if (TWaver.Utils.isCtrlKey($) && $.keyCode == 90) {
			TWaver.Utils.eventPreventDefault($);
			_.dataBox.undo()
		} else if (TWaver.Utils.isCtrlKey($) && $.keyCode == 89) {
			TWaver.Utils.eventPreventDefault($);
			_.dataBox.redo()
		}
	},
	doubletap : function($, _) {
		this.doubleclick($, _)
	}
};
TWaver.GridInputHandler = {
	destroy : function($) {
		this.showBorder($);
		delete $.borderLine;
		delete $.startBorderDragPoint;
		delete $.resizeBorderLine;
		delete $.elementResizing;
		delete $.__isGridColumn;
		delete $.__gridIndex;
		delete $.__gridId;
		delete $.__gridGap
	},
	showBorder : function(_, $) {
		if (_.borderLine)
			_.borderLine.setAttribute("opacity", 0);
		if ($) {
			$.setAttribute("opacity", 1);
			_.borderLine = $
		}
	},
	mouseover : function($, A) {
		if (A.elementResizing || A.elementMoving)
			return;
		var _ = TWaver.Utils.getEventTarget($);
		if (_ && _.getAttribute("type") == "gridcellinduce")
			this.showBorder(A, _)
	},
	mouseout : function($, _) {
		if (_.elementResizing || _.elementMoving)
			return;
		if (!_.mouseDragging)
			this.showBorder(_)
	},
	mousedown : function($, A) {
		if (A.resizeBorderLine) {
			this.destroy(A);
			return
		}
		var _ = TWaver.Utils.getEventTarget($);
		if (_ && _.getAttribute("type") == "gridcellinduce") {
			A.resizeBorderLine = _;
			A.__isGridColumn = parseInt(_.getAttribute("columnIndex")) >= 0;
			A.__gridIndex = A.__isGridColumn ? parseInt(_
					.getAttribute("columnIndex")) : parseInt(_
					.getAttribute("rowIndex"));
			A.__gridId = A.getElement($).id;
			A.startBorderDragPoint = TWaver.Utils.getMouseLayerLocation($,
					A.canvas)
		}
	},
	mousemove : function(B, C) {
		if (!C.mouseDragging || !C.resizeBorderLine)
			return;
		TWaver.Utils.eventPreventDefault(B);
		C.elementResizing = true;
		var $ = TWaver.Utils.getMouseLayerLocation(B, C.canvas), _ = C.__isGridColumn
				? $.x - C.startBorderDragPoint.x
				: 0, A = C.__isGridColumn ? 0 : $.y - C.startBorderDragPoint.y;
		C.__gridGap = C.__isGridColumn ? _ : A;
		if (C.resizeBorderLine)
			C.resizeBorderLine.setAttribute("transform", "translate(" + _
							/ C.scale + "," + A / C.scale + ")")
	},
	mouseup : function($, _) {
		if (_.resizeBorderLine) {
			_.resizeBorderLine.setAttribute("transform", null);
			this.showBorder(_);
			_.dataBox.resizeGrid(_.__gridId, _.__gridGap, _.__isGridColumn,
					_.__gridIndex)
		}
		this.destroy(_)
	},
	keydown : function($, _) {
		if (_.resizeBorderLine) {
			if ($.keyCode == 27) {
				this.mouseup($, _);
				TWaver.Utils.eventPreventDefault($)
			}
			return
		}
	}
};
TWaver.MoveInputHandler = {
	MIN_OFFSET : 2,
	MOVE_STEP : 2,
	CORNER : 20,
	SPEED : 1,
	destroy : function(_) {
		delete _.elementMoving;
		if (_.draggingElementsCanvas && _.elementRoot) {
			try {
				_.elementRoot.removeChild(_.draggingElementsCanvas)
			} catch ($) {
			}
		}
		delete _.draggingElementsCanvas;
		delete _.startDragPoint;
		delete _.currentDragPoint;
		this.keyup(null, _);
		_.unHighlight()
	},
	mousedown : function(_, A) {
		if (hasTouchSupport && _.type == "mousedown")
			return;
		if (A.draggingElementsCanvas) {
			this.mouseup(_, A);
			return
		}
		var $ = A.getElement(_);
		if (!$ || !A.isSelected($) || !A.isMovable($)) {
			this.destroy(A);
			return
		}
		A.startDragPoint = TWaver.Utils.getMouseLayerLocation(_, A.canvas);
		TWaver.Utils.stopEvent(_)
	},
	mousemove : function(B, C) {
		if ((!C.mouseDragging && !hasTouchSupport) || C.elementResizing
				|| !C.startDragPoint)
			return;
		TWaver.Utils.stopEvent(B);
		var $ = TWaver.Utils.getMouseLayerLocation(B, C.canvas), _ = $.x
				- C.startDragPoint.x, A = $.y - C.startDragPoint.y;
		if (!C.draggingElementsCanvas) {
			if (Math.abs(_) < this.MIN_OFFSET && Math.abs(A) < this.MIN_OFFSET)
				return;
			this.createDragElementCanvas(C)
		}
		C.elementMoving = true;
		if (C.draggingElementsCanvas)
			C.draggingElementsCanvas.setAttribute("transform", "translate(" + _
							/ C.scale + "," + A / C.scale + ")");
		if (!hasTouchSupport)
			this.scrollMove(B, C);
		C.currentDragPoint = $;
		return $
	},
	mouseup : function(E, G) {
		if (hasTouchSupport && E.type == "mouseup")
			return;
		if (!G.draggingElementsCanvas)
			return;
		var A = hasTouchSupport ? G.currentDragPoint : TWaver.Utils
				.getMouseLayerLocation(E, G.canvas);
		if (!A || isNaN(A.x) || isNaN(A.y))
			return;
		var B = A.x - G.startDragPoint.x, D = A.y - G.startDragPoint.y, C = G._highlightElement, _, F, $ = C
				? C.id
				: null;
		if (TWaver.Utils.isCtrlKey(E) || G.keyPDowning)
			_ = $ || "";
		if (G.keyHDowning)
			F = $;
		if (hasTouchSupport)
			G._eventEnd = true;
		this.move(G, B / G.scale, D / G.scale, _, F);
		this.destroy(G);
		TWaver.Utils.stopEvent(E)
	},
	scrollMove : function(D, G) {
		if (!G.draggingElementsCanvas)
			return;
		var E = TWaver.Utils.hasHorizontalScrollBar(G.canvas), B = TWaver.Utils
				.hasVerticalScrollBar(G.canvas);
		if (!E && !B)
			return;
		var A = TWaver.Utils.getMouseViewportLocation(D, G.canvas);
		if (B) {
			var _ = G.canvas.clientHeight, C = _ > 2 * this.CORNER
					? this.CORNER
					: _ / 2, F = 0;
			if (A.y < C)
				F = -(C - A.y) * this.SPEED;
			else if (A.y > _ - C)
				F = (_ - A.y) * this.SPEED;
			if (F != 0)
				G.canvas.scrollTop += F
		}
		if (E) {
			var $ = G.canvas.clientWidth, C = $ > 2 * this.CORNER
					? this.CORNER
					: $ / 2, F = 0;
			if (A.x < C)
				F = -(C - A.x) * this.SPEED;
			else if (A.x > $ - C)
				F = ($ - A.x) * this.SPEED;
			if (F != 0)
				G.canvas.scrollLeft += F
		}
	},
	move : function(E, A, B, $, D, _, C) {
		E.moveSelection(A, B, $, D, _, C)
	},
	mouseover : function(_, A) {
		if (!A.draggingElementsCanvas
				|| !(TWaver.Utils.isCtrlKey(_) || A.keyPDowning || A.keyHDowning))
			return;
		var $ = A.getElement(_);
		if ($ && A.isSelectable($) && !A.isSelected($))
			A.highlight($)
	},
	mouseout : function($, _) {
		_.unHighlight()
	},
	createDragElementCanvas : function(D) {
		if (!D.elementRoot)
			return;
		if (!D.hasSelection())
			return;
		var B = D.SVGDocument.createElementNS(TWaver.Const.NS_SVG, "g");
		B.setAttribute("pointer-events", "none");
		D.elementRoot.appendChild(B);
		var _ = D.selectionModel.selection;
		for (var $ in _) {
			var A = D.getElementById($);
			if (D.isMovable(A)) {
				var C = isMobile ? TWaver.Utils.getChildById("border")
						.cloneNode(true) : A.cloneNode(true);
				C.setAttribute("fill-opacity", 0.6);
				B.appendChild(C)
			}
		}
		D.draggingElementsCanvas = B
	},
	keyup : function($, _) {
		delete _.keyPDowning;
		delete _.keyHDowning
	},
	keydown : function($, _) {
		if (_.draggingElementsCanvas)
			if ($.keyCode == 27) {
				this.destroy(_);
				TWaver.Utils.eventPreventDefault($);
				return
			}
		if ($.keyCode == 80) {
			_.keyPDowning = true;
			return
		}
		if ($.keyCode == 72)
			_.keyHDowning = true;
		if (!TWaver.Utils.isCtrlKey($))
			return;
		if ($.keyCode == 37) {
			this.move(_, -this.MOVE_STEP, 0);
			TWaver.Utils.eventPreventDefault($)
		} else if ($.keyCode == 39) {
			this.move(_, this.MOVE_STEP, 0);
			TWaver.Utils.eventPreventDefault($)
		} else if ($.keyCode == 38) {
			this.move(_, 0, -this.MOVE_STEP);
			TWaver.Utils.eventPreventDefault($)
		} else if ($.keyCode == 40) {
			this.move(_, 0, this.MOVE_STEP);
			TWaver.Utils.eventPreventDefault($)
		}
	},
	touchstart : function($, _) {
		if ($.touches.length == 1)
			this.mousedown($, _)
	},
	touchmove : function($, _) {
		if ($.touches.length == 1)
			this.mousemove($, _)
	},
	touchend : function($, _) {
		this.mouseup($, _)
	}
};
TWaver.OverviewInputHandler = {
	getSVGOffset : function(A, $) {
		if (isIE)
			return $.getBBox();
		var B = A.getClientRects().item(0), _ = $.getClientRects().item(0);
		return {
			x : _.left - B.left,
			y : _.top - B.top
		}
	},
	getLayerPointAtNetwork : function(A, _, B) {
		var $;
		if (isOpera)
			$ = {
				x : A.offsetX,
				y : A.offsetY
			};
		else
			$ = TWaver.Utils.getMouseLayerLocation(A, _.SVGRoot);
		if (B) {
			$.x += B.x;
			$.y += B.y
		}
		$.x *= _.network.scale / _.scale;
		$.y *= _.network.scale / _.scale;
		return $
	},
	scrollToCenter : function(A, _, B) {
		var $ = this.getLayerPointAtNetwork(A, _, B);
		if ($)
			TWaver.Utils.scrollToCenter(_.network.canvas, $.x, $.y);
		return $
	},
	mousedown : function(_, $) {
		TWaver.Utils.eventPreventDefault(_);
		if ($.mousedowning || _.button == 2
				|| ($.popupMenu && $.popupMenu.isVisible())) {
			this.destroy($);
			return
		}
		$.mousedowning = true;
		if (_.detail == 2)
			return;
		this.scrollToCenter(_, $)
	},
	mousemove : function(_, $) {
		if ($.mousedowning)
			this.scrollToCenter(_, $)
	},
	mouseup : function(_, $) {
		this.destroy($)
	},
	mousewheel : function(C, A) {
		TWaver.Utils.eventPreventDefault(C);
		var B = 0;
		if (C.wheelDelta)
			B = C.wheelDelta;
		else if (C.detail)
			B = C.detail;
		if (B == 0)
			return;
		if (isGecko)
			B = -B;
		var D;
		if (isIE) {
			var $ = A.getSVGNode();
			D = {
				x : -$.clientLeft - $.offsetLeft + $.scrollLeft,
				y : -$.clientTop - $.offsetTop + $.scrollTop
			}
		}
		var _ = this.scrollToCenter(C, A, D);
		if (B < 0)
			A.network.zoomOut(_);
		else
			A.network.zoomIn(_)
	},
	doubleclick : function(_, $) {
	},
	destroy : function($) {
		delete $.mousedowning
	},
	touchstart : function($, _) {
		if ($.touches.length == 1)
			this.mousedown($, _)
	},
	touchmove : function($, _) {
		if ($.touches.length == 1)
			this.mousemove($, _)
	},
	touchend : function($, _) {
		this.mouseup($, _)
	}
};
TWaver.PanInputHandler = {
	destroy : function($) {
		delete $._startPoint;
		delete $._oldScrollLocation
	},
	mousedown : function($, A) {
		this.destroy(A);
		var _ = A.canvas;
		if (_.scrollWidth != _.clientWidth || _.scrollHeight != _.clientHeight) {
			A._startPoint = {
				x : $.screenX,
				y : $.screenY
			};
			A._oldScrollLocation = {
				left : _.scrollLeft,
				top : _.scrollTop
			}
		}
	},
	mousemove : function(A, D) {
		if (!D.mouseDragging || !D._startPoint)
			return;
		var B = D.canvas, $ = D._startPoint.x - A.screenX, _ = D._startPoint.y
				- A.screenY, C = D._oldScrollLocation.left + $;
		if (C < 0)
			C = 0;
		var E = D._oldScrollLocation.top + _;
		if (E < 0)
			E = 0;
		B.scrollLeft = C;
		B.scrollTop = E
	},
	mouseup : function($, _) {
		this.destroy(_)
	}
};
TWaver.PopupMenuInputHandler = {
	destroy : function($) {
		if ($._popupMenu) {
			$._popupMenu.hide();
			$._popupMenu.destroy()
		}
		delete $._popupMenu
	},
	mousedown : function($, _) {
		this.destroy(_)
	},
	rightclick : function(_, A) {
		TWaver.Utils.eventPreventDefault(_);
		if (A.popupMenuGenerater instanceof Function) {
			if (A.popupMenuGenerater.length == 0)
				A._popupMenu = A.popupMenuGenerater();
			else if (A.popupMenuGenerater.length == 1)
				A._popupMenu = A.popupMenuGenerater(_);
			else
				A._popupMenu = A.popupMenuGenerater(_, A);
			if (!A._popupMenu)
				return;
			var $ = TWaver.Utils.getMousePageLocation(_, A.canvas);
			if (A._popupMenu.ctype == "Ext.Component") {
				if (!A._popupMenu.el) {
					A._popupMenu.render();
					if (A._popupMenu.el && A._popupMenu.el.dom)
						A._popupMenu.el.dom.oncontextmenu = function($) {
							TWaver.Utils.eventPreventDefault($)
						}
				}
				TWaver.Utils.showAt(A._popupMenu.el.dom, $.x, $.y);
				return
			}
			A._popupMenu.showAt($)
		}
	}
};
TWaver.RectangleSelectionInputHandler = {
	destroy : function($) {
		delete $._startPoint;
		delete $._selectionEndPoint;
		delete $._isRectangleSelecting
	},
	mousedown : function(_, A) {
		if (!A.enableRectangleSelect)
			return;
		if (A._startPoint) {
			this.mouseup(_, A);
			return
		}
		if (_.button == 2)
			return;
		var B = _.shiftKey || TWaver.Utils.isCtrlKey(_), $ = A.getElement(_);
		if (!$ || !A.isSelectable($)) {
			A._startPoint = TWaver.Utils.getMouseLayerLocation(_, A.canvas);
			if (!B)
				A.clearSelection();
			return
		}
	},
	mousemove : function(_, B) {
		if (!B.enableRectangleSelect)
			return;
		if (B.mouseDragging && B._startPoint) {
			B._isRectangleSelecting = true;
			B._selectionEndPoint = TWaver.Utils.getMouseLayerLocation(_,
					B.canvas);
			var $ = B._selectionEndPoint, A = $.x < B._startPoint.x
					&& $.y < B._startPoint.y;
			B.drawSelectionRect(B._startPoint.x, B._startPoint.y, $.x
							- B._startPoint.x, $.y - B._startPoint.y, A)
		}
	},
	mouseup : function(_, B, D) {
		if (!B.enableRectangleSelect)
			return;
		if (B._startPoint) {
			var C = _.shiftKey || TWaver.Utils.isCtrlKey(_), $ = D == true
					? B._selectionEndPoint
					: TWaver.Utils.getMouseLayerLocation(_, B.canvas);
			if ($) {
				var A = $.x < B._startPoint.x && $.y < B._startPoint.y;
				B.selectElementsByRectangle(B._startPoint.x / B.scale,
						B._startPoint.y / B.scale, ($.x - B._startPoint.x)
								/ B.scale, ($.y - B._startPoint.y) / B.scale,
						A, C);
				B.undrawSelectionRect()
			}
		}
		this.destroy(B)
	},
	mouseout : function($, _) {
		if (!_.enableRectangleSelect)
			return;
		if (_._startPoint && TWaver.RectangleSelectionInputHandler.isOut($, _))
			this.mouseup($, _, !isWebkit)
	},
	isOut : function($, A) {
		if (isOpera)
			return;
		var _ = $.relatedTarget;
		if (!_ || !_.viewportElement)
			return true
	}
};
TWaver.ResizeInputHandler = {
	destroy : function($) {
		delete $.elementResizing;
		delete $.startResizePoint;
		delete $.resizeBorderInfo
	},
	mousedown : function(_, B) {
		if (hasTouchSupport && _.type == "mousedown")
			return;
		var A = TWaver.Utils.getEventTarget(_);
		if (!A || !A.id || A.id.indexOf("border.rect.") < 0)
			return;
		var $ = B.getElement(_);
		if (!$ || !B.isResizable($))
			return;
		var C = A.borderInfo;
		C.element = $;
		C.currentCorner = A;
		B.startResizePoint = TWaver.Utils.getMouseLayerLocation(_, B.canvas);
		B.resizeBorderInfo = C
	},
	mousemove : function(F, H) {
		if ((!H.mouseDragging && !hasTouchSupport) || !H.startResizePoint
				|| !H.resizeBorderInfo)
			return;
		TWaver.Utils.eventPreventDefault(F);
		H.elementResizing = true;
		var _ = TWaver.Utils.getMouseLayerLocation(F, H.canvas), C = _.x
				- H.startResizePoint.x, D = _.y - H.startResizePoint.y;
		C /= H.scale;
		D /= H.scale;
		if (Math.abs(C) < 1 && Math.abs(D) < 1)
			return;
		var $ = H.resizeBorderInfo.bounds, I = $.x, G = $.y, E = $.width, A = $.height, B = H.resizeBorderInfo.currentCorner;
		if (B.isLeft) {
			I += C;
			E -= C
		} else
			E += C;
		if (B.isTop) {
			G += D;
			A -= D
		} else
			A += D;
		this.resize(H.resizeBorderInfo, I, G, E, A);
		H.resizeBorderInfo.bounds = {
			x : I,
			y : G,
			width : E,
			height : A
		};
		H.startResizePoint = _;
		return true
	},
	mouseup : function(_, A) {
		if (hasTouchSupport && _.type == "mouseup")
			return;
		if (!A.resizeBorderInfo)
			return;
		var $ = A.resizeBorderInfo.bounds;
		if (hasTouchSupport)
			A._eventEnd = true;
		A.dataBox.resizeElement(A.resizeBorderInfo.element.id, $.x, $.y,
				$.width, $.height);
		this.destroy(A);
		return true
	},
	resize : function(A, C, B, _, $) {
		if (_ < 0) {
			_ = -_;
			C -= _
		}
		if ($ < 0) {
			$ = -$;
			B -= $
		}
		this.setCenter(A.topLeft, C, B);
		this.setCenter(A.topRight, C + _, B);
		this.setCenter(A.bottomLeft, C, B + $);
		this.setCenter(A.bottomRight, C + _, B + $);
		A.boundsNode.setAttribute("x", C);
		A.boundsNode.setAttribute("y", B);
		A.boundsNode.setAttribute("width", _);
		A.boundsNode.setAttribute("height", $)
	},
	setCenter : function($, A, _) {
		A -= new Number($.getAttribute("width")) / 2;
		_ -= new Number($.getAttribute("height")) / 2;
		TWaver.Utils.setAttribute($, "x", A);
		TWaver.Utils.setAttribute($, "y", _)
	},
	keydown : function($, _) {
		if ($.keyCode == 27)
			this.destroy(_)
	},
	touchstart : function($, _) {
		if ($.touches.length == 1)
			this.mousedown($, _)
	},
	touchmove : function($, _) {
		if ($.touches.length == 1)
			this.mousemove($, _)
	},
	touchend : function($, _) {
		this.mouseup($, _)
	}
};
TWaver.SelectionInputHandler = {
	touchstart : function($, _) {
		if ($.touches.length == 1)
			this.mousedown($, _)
	},
	mousedown : function(_, A) {
		var $ = A.getElement(_);
		if (!$ || !A.isSelectable($)) {
			if (!(_.shiftKey || _.ctrlKey || _.metaKey))
				A.clearSelection();
			return
		}
		if (_.shiftKey || TWaver.Utils.isCtrlKey(_)) {
			A.reverseElementSelection($);
			return
		}
		if (A.isSelected($))
			return;
		A.clearSelection();
		A.selectElement($)
	},
	keydown : function($, _) {
		if ($.keyCode == 27) {
			_.clearSelection();
			return
		}
		if ((TWaver.Utils.isCtrlKey($) || $.shiftKey) && ($.keyCode == 65)) {
			TWaver.Utils.eventPreventDefault($);
			_.selectAll()
		} else if ((TWaver.Utils.isCtrlKey($) || $.shiftKey)
				&& ($.keyCode == 68)) {
			TWaver.Utils.eventPreventDefault($);
			_.clearSelection()
		}
	}
};
TWaver.ShapePointInputHandler = {
    destroy : function(network){
        delete network.elementResizing;
        delete network.startResizePoint;
        delete network.shapePointInfo;
        delete network.altKeyDownling;
    },
    /**
     * @param {MouseEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    mousedown : function(evt, network){
        if(hasTouchSupport && evt.type == 'mousedown'){
            return;
        }
        var element = network.getElement(evt);
        if(!element || !network.isSelected(element) || !network.isResizable(element)){
            return;
        }
        if((evt.altKey || network.altKeyDownling) && network.isSelected(element)){
            TWaver.Utils.eventPreventDefault(evt);
            var point = TWaver.Utils.getMouseLayerLocation(evt, network.canvas);
            var x = new Number(point.x/network.scale);
            var y = new Number(point.y/network.scale);
            network.dataBox.setShapePoint(element.id, x, y);
            this.destroy(network);
            return;
        }
        
        var target = TWaver.Utils.getEventTarget(evt);
        if(!target || !target.id || target.id.indexOf('border.point.') < 0){
            return;
        }
        
        var shapePointInfo;
        if(!isIE){
            shapePointInfo = target.pointInfo;
        }else{
            shapePointInfo = {};
            shapePointInfo.index = new Number(target.getAttribute('index'));
            shapePointInfo.indexInAllPoints = new Number(target.getAttribute('indexInAllPoints'));
            shapePointInfo.border = TWaver.Utils.getChildById('border', element, network.SVGDocument);
            shapePointInfo.points = TWaver.Utils.stringToPointArray(shapePointInfo.border.getAttribute('points'));
        }
        shapePointInfo.element = element;
        shapePointInfo.target = target;
        shapePointInfo.oldX = new Number(target.getAttribute('x'));
        shapePointInfo.oldY = new Number(target.getAttribute('y'));
        network.shapePointInfo = shapePointInfo;
        network.startResizePoint = TWaver.Utils.getMouseLayerLocation(evt, network.canvas);
    },
    /**
     * @param {MouseEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    mousemove : function(evt, network){
        if((!network.mouseDragging && !hasTouchSupport) || !network.startResizePoint || !network.shapePointInfo){
            return;
        }
        TWaver.Utils.stopEvent(evt);
        network.elementResizing = true;
        var point = TWaver.Utils.getMouseLayerLocation(evt, network.canvas);
        var dx = point.x - network.startResizePoint.x;
        var dy = point.y - network.startResizePoint.y;
        dx /= network.scale;
        dy /= network.scale;
        if(Math.abs(dx) < 1 && Math.abs(dy) < 1){
            return;
        }
        var target = network.shapePointInfo.target;
        this.movePoint(target, dx, dy, network.shapePointInfo.border, network.shapePointInfo.indexInAllPoints, network.shapePointInfo.points);
        network.startResizePoint = point;
    },
    /**
     * @param {MouseEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    mouseup : function(evt, network){
        if(hasTouchSupport && evt.type == 'mouseup'){
            return;
        }
        if(!network.shapePointInfo){
            return;
        }
        var index = network.shapePointInfo.index;
        var x = new Number(network.shapePointInfo.target.getAttribute('x'));
        var y = new Number(network.shapePointInfo.target.getAttribute('y'));
        if(Math.abs(network.shapePointInfo.oldX - x) >= 1 || Math.abs(network.shapePointInfo.oldY - y) >= 1){
            x += new Number(network.shapePointInfo.target.getAttribute('width'))/2;
            y += new Number(network.shapePointInfo.target.getAttribute('height'))/2;
            
            x += network.tx;
            y += network.ty;
            network.dataBox.setShapePoint(network.shapePointInfo.element.id, x, y, index);
        }
        this.destroy(network);
    },
    /**
     * @param {Element} pointer
     * @param {Number} dx
     * @param {Number} dy
     * @param {Element} border
     * @param {int} index
     * @param {Array} points
     */
    movePoint : function(pointer, dx, dy, border, index, points){
        var x = new Number(pointer.getAttribute('x'));
        var y = new Number(pointer.getAttribute('y'));
        
        TWaver.Utils.setAttribute(pointer, 'x', x + dx);
        TWaver.Utils.setAttribute(pointer, 'y', y + dy);
        
        var point = points[index];
        point.x += dx;
        point.y += dy;
        points[index] = point;
        var points = TWaver.Utils.pointArrayToString(points);
        TWaver.Utils.setAttribute(border,'points', points);
    },
    /**
     * @param {KeyboardEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    keydown : function(evt, network){
        if(evt.keyCode == 27){
            this.destroy(network);
            return;
        }
        if(evt.altKey || evt.keyCode == 65){
            network.altKeyDownling = true;
//            network.setCursor('crosshair');
        }
    },
    keyup : function(evt, network){
        delete network.altKeyDownling;
        network.setCursor('default');
    },
    /**
     * @param {TouchEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    touchstart : function(evt, network){
        if(evt.touches.length == 1){
            this.mousedown(evt, network);
        }
    },
    /**
     * @param {TouchEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    touchmove : function(evt, network){
        if(evt.touches.length == 1){
            this.mousemove(evt, network);
        }
    },
    /**
     * @param {TouchEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    touchend : function(evt, network){
        this.mouseup(evt, network);
    }
};
TWaver.TooltipInputHandler = {
	destroy : function($) {
		if ($.tooltipNode)
			$.tooltipNode.style.visibility = "hidden"
	},
	setLocation : function(C, B, E, A, _) {
		var $ = TWaver.Utils.getMousePageLocation(B, E.canvas), F = $.x + A, D = $.y
				+ _;
		TWaver.Utils.ensureInViewport(C, F, D)
	},
	showTooltip : function(_, B, C) {
		var D = B.getAttribute("tooltip");
		if (!D)
			return;
		var $ = TWaver.Utils.getBody(), A = C.tooltipNode;
		if (!A) {
			A = TWaver.Utils.createHTMLElement("div");
			TWaver.Utils.setClassAttribute(A, "twaver_tooltip");
			$.appendChild(A);
			C.tooltipNode = A
		}
		A.innerHTML = D;
		this.setLocation(A, _, C, hasTouchSupport
						? 0
						: TWaver.Const.CURSOR_XOFFSET, hasTouchSupport
						? 0
						: TWaver.Const.CURSOR_YOFFSET);
		A.style.visibility = "visible"
	},
	mouseover : function($, A) {
		if (A._isRectangleSelecting)
			return;
		var _ = A.getElement($);
		if (_)
			this.showTooltip($, _, A)
	},
	mouseup : function($, _) {
		if (hasTouchSupport)
			this.destroy(_)
	},
	mouseout : function($, _) {
		this.destroy(_)
	}
};
TWaver.ZoomInputHandler = {
	mouseclick : function($, _) {
		if (TWaver.Utils.isCtrlKey($))
			_.zoomOut(TWaver.Utils.getMouseLayerLocation($, _.canvas));
		else
			_.zoomIn(TWaver.Utils.getMouseLayerLocation($, _.canvas))
	}
};
TWaver.IDataProvider = {
	request : function($, A, _) {
	}
};
TWaver.IEvent = {
	source : null,
	target : null,
	value : null
};
TWaver.IInputHandler = {
	mouseclick : function(_, $) {
	},
	doubleclick : function(_, $) {
	},
	mousedown : function(_, $) {
	},
	mouseup : function(_, $) {
	},
	mousemove : function(_, $) {
	},
	mouseover : function(_, $) {
	},
	mouseout : function(_, $) {
	},
	rightclick : function(_, $) {
	},
	mousewheel : function(_, $) {
	},
	keydown : function(_, $) {
	},
	keyup : function(_, $) {
	},
	touchstart : function(_, $) {
	},
	touchmove : function(_, $) {
	},
	touchend : function(_, $) {
	},
	touchcancel : function(_, $) {
	},
	doubletap : function(_, $) {
	},
	gesturestart : function(_, $) {
	},
	gesturechange : function(_, $) {
	},
	gestureend : function(_, $) {
	},
	destroy : function($) {
	}
};
TWaver.IMenuItem = {
	text : null,
	icon : null,
	handler : null,
	menu : [],
	disabled : false
};
TWaver.IPopupMenu = {
	isVisible : function() {
		return false
	},
	showAt : {},
	hide : {},
	destroy : {}
};
TWaver.ISelectionModel = {
	clearSelection : function($) {
	},
	getSelection : function() {
	},
	getSize : function() {
	},
	setSelection : function(_, $) {
	},
	isSelected : function($) {
	},
	select : function(_, $) {
	},
	unselect : function(_, $) {
	},
	isSelectable : function($) {
	}
};
TWaver.IView = {
	type : "",
	getDataBox : function() {
	},
	setDataBox : function() {
	},
	update : function($) {
	}
};
TWaver.SVGChart = function($, A, _) {
	if (TWaver.Utils.isString($))
		$ = new TWaver.DataBox($);
	else if (!$ instanceof TWaver.DataBox)
		throw new Error("dataBox should be type of \"TWaver.DataBox\"");
	TWaver.SVGChart.superclass.constructor.call(this, A, _);
	this.init($)
};
TWaver.SVGChart.prototype = {
	type : "chart",
	autoSize : false,
	dataBox : null,
	width : null,
	height : null,
	init : function($) {
		if ($)
			this.setDataBox($);
		this.__resetChartSize()
	},
	getDataBox : function() {
		return this.dataBox
	},
	setDataBox : function($) {
		if (!$ instanceof TWaver.DataBox)
			throw new Error("dataBox should be type of \"TWaver.DataBox\"");
		if (this.dataBox == $)
			return;
		if (this.dataBox) {
			this.dataBox._removeDefaultParams("twaver.chart.width");
			this.dataBox._removeDefaultParams("twaver.chart.height");
			this.dataBox._removeResponseTarget(this.type);
			this.dataBox.un(this.type + ".update", this.update, this)
		}
		this.dataBox = $;
		this.dataBox._appendResponseTarget(this.type);
		this._appendSizeInfo();
		this.dataBox.on(this.type + ".update", this.update, this)
	},
	_appendSizeInfo : function() {
		if (!this.dataBox)
			return;
		if (this.width)
			this.dataBox._appendDefaultParams({
						"twaver.chart.width" : this.width
					});
		if (this.height)
			this.dataBox._appendDefaultParams({
						"twaver.chart.height" : this.height
					})
	},
	__resetChartSize : function() {
		if (this.autoSize) {
			this.width = this.canvas.clientWidth;
			this.height = this.canvas.clientHeight;
			this._appendSizeInfo()
		}
	},
	onSVGRootChange : function() {
		TWaver.SVGChart.superclass.onSVGRootChange.apply(this, arguments);
		this.adjustBounds()
	},
	adjustBounds : function() {
		if (!this.canvas || !this.SVGRoot)
			return;
		var A = this.SVGRoot.getAttribute("width");
		if (isNaN(A))
			return;
		var $ = this.SVGRoot.getAttribute("height");
		if (isNaN($))
			return;
		this.SVGRoot.setAttribute("viewBox", "0 0 " + A + " " + $);
		this.SVGRoot.setAttribute("preserveAspectRatio", "none");
		this.SVGRoot.setAttribute("width", "100%");
		this.SVGRoot.setAttribute("height", "100%");
		if (isChrome) {
			var B = this.canvas.style.opacity, _ = 1;
			if (B)
				_ = parseFloat(B);
			this.canvas.style.opacity = _ - 0.001;
			setTimeout(TWaver.Utils.createFunction(this, function() {
						this.canvas.style.opacity = B
					}))
		}
	},
	update : function(_) {
		if (_.value)
			_ = _.value;
		var $ = TWaver.Utils.getFirstElementChildByTagName(_, "svg");
		if ($)
			this.loadSVG($)
	},
	refresh : function(_, $) {
		if (!_)
			_ = {};
		_["twaver.response.target"] = this.type;
		if (this.width)
			_["twaver.chart.width"] = this.width;
		if (this.height)
			_["twaver.chart.height"] = this.height;
		this.getDataBox().update($, _)
	},
	toString : function() {
		return "TWaver.SVGChart"
	}
};
TWaver.extend(TWaver.SVGChart, TWaver.SVGComponent);
TWaver.SVGOverview = function(_, A, $) {
	if (!_)
		throw Error("canvas can't be null");
	_.style.overflow = "hidden";
	TWaver.SVGOverview.superclass.constructor.call(this, _, $);
	this.setNetwork(A);
	this.popupMenuGenerater = function(B, _) {
		var $ = _.popupMenu;
		if (!$) {
			$ = new TWaver.PopupMenu([{
						text : "Zoom Reset",
						handler : function() {
							_.network.resetZoom()
						}
					}, {
						text : "Zoom In",
						handler : function() {
							_.network.zoomIn(TWaver.Utils
									.getMouseViewportLocation(B, A.canvas))
						}
					}, {
						text : "Zoom Out",
						handler : function() {
							_.network.zoomOut(TWaver.Utils
									.getMouseViewportLocation(B, A.canvas))
						}
					}]);
			_.popupMenu = $
		}
		return $
	};
	this.setInteractionMode("default", [TWaver.OverviewInputHandler,
					TWaver.PopupMenuInputHandler])
};
TWaver.SVGOverview.prototype = {
	network : null,
	scale : 1,
	viewportRectangle : null,
	setNetwork : function($) {
		if (this.network)
			this.network.un("before.load", this.update, this);
		this.network = $;
		this.network.on("before.load", this.update, this);
		this.network.on("scale.change", this.drawViewport, this);
		this.network.canvas.onscroll = TWaver.Utils.createEventFunction(this,
				this.drawViewport)
	},
	update : function($) {
		var _ = $.value;
		if (!isIE && _.cloneNode)
			_ = _.cloneNode(true);
		this.loadSVG(_)
	},
	onSVGRootChange : function() {
		TWaver.SVGOverview.superclass.onSVGRootChange.apply(this, arguments);
		if (isChrome) {
			var _ = window.location.protocol + "//" + window.location.host, H = TWaver.Utils
					.getChildrenByTagName(this.SVGDefsNode, "image");
			for (var D = 0, J = H.length; D < J; D++) {
				var E = H[D], K = E.getAttributeNS(TWaver.Const.NS_XLINK,
						"href");
				if (K && K.length > 0 && K.charAt(0) == "/")
					E.setAttributeNS(TWaver.Const.NS_XLINK, "href", _ + K)
			}
		}
		var L = TWaver.Utils.getChildrenByTagName(this.SVGRoot, "g");
		if (L && L.length > 0)
			L[0].setAttribute("pointer-events", "none");
		var M = this.SVGRoot.getAttribute("width"), A = this.SVGRoot
				.getAttribute("height");
		this.SVGRoot.setAttribute("viewBox", "0 0 " + M + " " + A);
		var F = this.canvas.clientWidth / M, C = this.canvas.clientHeight / A;
		this.scale = Math.min(F, C);
		var B = this.scale * M, G = this.scale * A;
		this.setSize(B, G);
		var $ = this.getSVGNode();
		$.style.position = "absolute";
		$.style.top = "50%";
		$.style.left = "50%";
		$.style.marginTop = -G / 2 + "px";
		$.style.marginLeft = -B / 2 + "px";
		var I = this.SVGDocument.createElementNS(TWaver.Const.NS_SVG, "rect");
		I.setAttribute("x", 0);
		I.setAttribute("y", 0);
		I.setAttribute("width", "100%");
		I.setAttribute("height", "100%");
		I.setAttribute("fill", "none");
		I.setAttribute("pointer-events", "all");
		this.SVGRoot.appendChild(I);
		delete this.viewportRectangle;
		this.drawViewport()
	},
	viewportFillColor : "#AAAAFF",
	viewportFillOpacity : 0.3,
	viewportStroke : "#FFFFFF",
	createViewportRectangle : function() {
		var $ = this.SVGDocument.createElementNS(TWaver.Const.NS_SVG, "rect");
		$.setAttribute("x", 0);
		$.setAttribute("y", 0);
		$.setAttribute("width", "100%");
		$.setAttribute("height", "100%");
		$.setAttribute("stroke", this.viewportStroke);
		$.setAttribute("fill-opacity", this.viewportFillOpacity);
		$.setAttribute("shape-rendering", "crispEdges");
		$.setAttribute("fill", this.viewportFillColor);
		$.setAttribute("pointer-events", "none");
		return $
	},
	drawViewport : function() {
		if (!this.network || !this.SVGRoot)
			return;
		if (!this.viewportRectangle) {
			this.viewportRectangle = this.createViewportRectangle();
			this.SVGRoot.appendChild(this.viewportRectangle)
		}
		var $ = {
			x : this.network.canvas.scrollLeft,
			y : this.network.canvas.scrollTop,
			width : this.network.canvas.clientWidth,
			height : this.network.canvas.clientHeight
		}, D = this.network.canvas.scrollWidth, _ = this.network.canvas.scrollHeight, E, C, A, B;
		if (!TWaver.Utils.hasHorizontalScrollBar(this.network.canvas)
				&& !TWaver.Utils.hasVerticalScrollBar(this.network.canvas)) {
			E = 0;
			C = 0;
			A = "100%";
			B = "100%"
		} else {
			E = $.x / this.network.scale;
			C = $.y / this.network.scale;
			A = $.width / this.network.scale;
			B = $.height / this.network.scale
		}
		this.viewportRectangle.setAttribute("x", E);
		this.viewportRectangle.setAttribute("y", C);
		this.viewportRectangle.setAttribute("width", A);
		this.viewportRectangle.setAttribute("height", B)
	},
	toString : function() {
		return "TWaver.SVGOverview"
	}
};
TWaver.extend(TWaver.SVGOverview, TWaver.SVGComponent)