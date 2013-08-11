package org.apache.jsp.WEB_002dINF.jsp.performance.bureau;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;

public final class workbench_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=utf-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("    \r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
      out.write("<title>厦门市卫生局医疗机构医疗服务关键环节质量监督管理系统</title>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/dhtmlx/dhtmlx.js\"></script>\r\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/prototype.js\"></script>\r\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/jquery.js\"></script>\r\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/base.js\"></script>\r\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/performance/bureau/workbench.js\"></script>\r\n");

   Map loginedUserInfo=(Map)request.getSession().getAttribute("loginedUser");

      out.write("\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("var contextPath='");
      out.print(request.getContextPath());
      out.write("';\r\n");
      out.write("var loginedUserInfo={};\r\n");
      out.write("loginedUserInfo.realName='");
      out.print(loginedUserInfo.get("REAL_NAME") );
      out.write("';\r\n");
      out.write("loginedUserInfo.ks='");
      out.print(loginedUserInfo.get("ks") );
      out.write("';\r\n");
      out.write("loginedUserInfo.jb='");
      out.print(loginedUserInfo.get("jb") );
      out.write("';\r\n");
      out.write("loginedUserInfo.bm='");
      out.print(loginedUserInfo.get("bm") );
      out.write("';\r\n");
      out.write("loginedUserInfo.hospId='");
      out.print(loginedUserInfo.get("hosp_id") );
      out.write("';\r\n");
      out.write("loginedUserInfo.userId='");
      out.print(loginedUserInfo.get("user_id") );
      out.write("';\r\n");
      out.write("function changeBg(obj){\r\n");
      out.write("\t$('li').removeClass('fn');\r\n");
      out.write("\t$(obj).parent().addClass('fn');\r\n");
      out.write("}\r\n");
      out.write("</script>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(request.getContextPath());
      out.write("/js/dhtmlx/dhtmlx.css\" type=\"text/css\" media=\"screen\"><link rel=\"stylesheet\" href=\"");
      out.print(request.getContextPath());
      out.write("/js/dhtmlx/dhtmlx_custom.css\" type=\"text/css\" media=\"screen\">\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write(".fn{\r\n");
      out.write("background-color:#b6cdec;\r\n");
      out.write("}\r\n");
      out.write("a:hover {color: #FF00FF}\r\n");
      out.write("a:active {color: #0000FF}\r\n");
      out.write("</style>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\r\n");
      out.write("<div style=\"background: url(images/performance/banner.jpg);height:90px;width:100%;padding:0px;margin:0px;border:0px;\">&nbsp;</div>\r\n");
      out.write("<div id=\"parentId\" style=\"position: relative;   width: 100%; height: 600px; aborder: #B5CDE4 1px solid;\"></div>\r\n");
      out.write("<div id=\"controlPanel\" style=\"position: relative;   width: 100%; height: 600px; aborder: #B5CDE4 1px solid;padding:0px;margin:0px;border:0px;\">\r\n");
      out.write("<ul id=\"controllist\" style=\"width: 100%; height: 100%;padding:20px 0px 20px 0px;margin:0px;border:0px;text-align:left;list-style-type:none;text-indent:4em;\">\r\n");
      out.write("<li class=\"fn\" style=\"display:none;\"><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=recordManage');\" >记录管理</a></li>\r\n");
      out.write("<li class=\"fn\"><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=recordAnalysis');\" >记录分析</a></li>\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=searchRecord');\">记录搜索</a></li>\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=changePassword');\">用户控制面板</a></li>\r\n");
if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("1")||loginedUserInfo.get("jb").equals("2"))){ 

      out.write("\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=addRecord&operation=add');\">记录录入</a></li>\r\n");
 }
      out.write('\r');
      out.write('\n');
if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("1"))){ 

      out.write("\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=userManage');\">用户管理</a></li>\r\n");
 }
      out.write('\r');
      out.write('\n');
if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("1"))){ 

      out.write("\r\n");
      out.write("<!-- li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=roleManage');\">角色管理</a></li-->\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=roomManage&roomType=zb');\">一级指标管理</a></li>\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=projectManage&mapType=hj');\">关键环节管理</a></li>\r\n");
      out.write("<li><a href=\"#\" onclick=\"changeBg(this);loadPage('manage.spr?action=projectManage&mapType=xm');\">项目管理</a></li>\r\n");
 }
      out.write("\r\n");
      out.write("<li><a href=\"logon.spr?action=signout\" >退出</a></li>\r\n");
      out.write("</ul>\r\n");
      out.write("\r\n");
      out.write("</div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
