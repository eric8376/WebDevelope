<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8" />
<title>资源查询</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<style type="text/css">

body {
    background: #f1f1f1;
    background: #f1f1f1 -webkit-gradient(linear, left top, left 95%, from(#fff), to(#f1f1f1)) no-repeat;
    background: #f1f1f1 -moz-linear-gradient(center top , #FFFFFF 10%, #F1F1F1 100%);
    color: #444;
    font: normal 12px/1.6 Helvetica, Arial, sans-serif;
    margin: 0 auto;
    padding: 0;
}



ul, ol, p {
    margin: 0 0 1em;
}

a:link,
a:visited {
    color: #0464BB;
    text-decoration: none;
}

a:hover,
a:focus,
a:active {
    color: #0464BB;
    text-decoration: underline;
}

h1,h2,h3,h4,h5,h6 {
    color: #111;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    margin-bottom: 0;
    padding-bottom: 0;
}

ol#grid {
    list-style: none;
    overflow: auto;
}

ol#grid li {
    float: left;
    position: relative;
}

ol#grid li a {
    background: transparent;
    -webkit-border-radius: 12px;
    -moz-border-radius:    12px;
    border-radius:         12px;

    -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.153);

    color: #0464BB;
    display: block;
    font-size: 16px;
    height: 72px;
    line-height: 20px;
    padding: 0;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 0 rgba(255,255,255,0.333);
    vertical-align: middle;
    width: 72px;

}

ol#grid li a img {
    border: none;
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition:    opacity 0.5s ease-in-out;
    transition:         opacity 0.5s ease-in-out;
}

ol#grid li a#kitchensink span {
    color: #0464BB;
}

ol#grid li a#kitchensink {
    -webkit-animation: glow 2s ease-in-out infinite;
}

@-webkit-keyframes "pulse" {
    0% {
        -webkit-transform: rotate(0deg) scale(1,1);
    }
    80% {
        -webkit-transform: rotate(0deg) scale(1,1);
    }
    85% {
        -webkit-transform: rotate(-7.5deg);
    }
    90% {
        -webkit-transform: rotate(7.5deg) scale(1.15,1.15);
    }
    95% {
        -webkit-transform: rotate(-7.5deg);
    }
    97.5% {
        -webkit-transform: rotate(0deg) scale(1,1);
    }
    100% {
        -webkit-transform: rotate(0deg) scale(1,1);
    }
}

@-webkit-keyframes "glow" {
    0% {
        -webkit-box-shadow: 0 0 10px  rgba(0,0,0,0.153);
    }
    50% {
        -webkit-box-shadow: 0 0 40px rgba(0,89,208,0.45);
    }
    100% {
        -webkit-box-shadow: 0 0 10px  rgba(0,0,0,0.153)
    }
}


ol#grid li a:hover,
ol#grid li a:focus,
ol#grid li a:active {
    background: #F36043;
}

ol#grid li a:hover img,
ol#grid li a:focus img,
ol#grid li a:active img {
    opacity: 0.65;
}

ol#grid li a span {
    color: #444;
    font-weight: ;
    font-size: 12px;
    letter-spacing: -0.01em;
    text-shadow: 0 1px 0 rgba(255,255,255,0.5);
}

hr {
    color: #e0e0e0;
    background-color: #e0e0e0;
    height: 1px;
    border: none;
    outline: none;
}



/*
.container {
    margin: 0 auto;
    padding: 24px 52px;
    width: 623px;
}

ol#grid {
    list-style: none;
    overflow: auto;
    padding: 24px 52px;
    margin: 0 auto 24px;
    width: 623px;
}


*/




/*
ol#grid li a b {
    background: #f6f6f6 -webkit-gradient(linear, left top, left 95%, from(#e9e9e9), to(#f6f6f6)) no-repeat;
    border: 1px solid #ddd;
    -webkit-border-radius: 12px;
    -moz-border-radius:    12px;
    border-radius:         12px;

    -webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,1.0);

    display: block;
    height: 70px;
    width: 70px;
}
*/




/* Portrait */
@media screen and (max-width: 768px)
{

    body {
        width: 768px;
    }

    .container,
    ol#grid {
        padding: 0 81px;
        width: 603px;
    }

    ol#grid {
        padding-top: 24px;
    }

    ol#grid li a {
      margin: 0 105px 88px 0;
    }

    ol#grid li:nth-child(4n+4) a {
        margin-right: 0;
    }

    ol#grid li:nth-child(5n+5) a {
        margin-right: 105px;
    }

}

/* Landscape */
@media screen and (min-width: 769px)
{

    body {
        width: 1024px;
    }

    .container,
    ol#grid {
        padding: 0 90px;
        width: 844px;
    }

    ol#grid {
        padding-top: 24px;
    }

    ol#grid li a {
      margin: 0 120px 71px 0;
    }

    ol#grid li:nth-child(4n+4) a {
        margin-right: 120px;
    }

    ol#grid li:nth-child(5n+5) a {
        margin-right: 0;
    }


}

/* iPhone */
@media screen and (max-width: 480px)
{

    body {
        margin: 0;
        padding: 0;
        width: 320px;
    }

    .container,
    ol#grid {
        padding: 0 17px 16px;
        width: 286px;
    }

    ol#grid {
        padding-top: 24px;
    }

    ol#grid li a {
        -webkit-box-shadow: none;
        margin: 0 19px 31px 0;
        text-shadow: none;
    }

    ol#grid li a,
    ol#grid li a img {
        height: 57px;
        width:  57px;
    }

    ol#grid li a span {
        display: block;
        font-size: 11px;
        line-height: 11px;
        white-space: nowrap;
        -webkit-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }

    ol#grid li:nth-child(4n+4) a {
        margin-right: 0px;
    }

    ol#grid li:nth-child(5n+5) a {
        margin-right: 19px;
    }
}

</style>

</head>
<body>
<ol id="grid">
    <li><a id="guide" href="<%=request.getContextPath()%>/main/touch/capabilityDPLC.jsp" target="_blank">
        <img src="<%=request.getContextPath()%>/style/touch/images/unicom/main/icon_big/DPLC.png" alt="Guide" height="72" width="72" />
        <span>DPLC计算</span>
    </a></li>
    <li><a id="ajax" href="<%=request.getContextPath()%>/main/touch2/siteQuery.jsp" target="_blank">
        <img src="<%=request.getContextPath()%>/style/touch/images/unicom/main/icon_big/sitequery.png" alt="AJAX" height="72" width="72" />
        <span>站点查询</span>
    </a></li>
</ol>
</body>
</html>