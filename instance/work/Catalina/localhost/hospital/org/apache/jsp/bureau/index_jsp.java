/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/8.0.0-RC1
 * Generated at: 2013-09-11 04:58:10 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.bureau;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


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
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
      out.write("<title>厦门市卫生局医疗机构医疗服务关键环节质量监督管理系统</title>\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("var contextPath='");
      out.print(request.getContextPath());
      out.write("';\r\n");
      out.write("</script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/dhtmlx/dhtmlx.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/jquery-1.9.1.min.js\"></script>\r\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/base.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/performance/bureau/login.js\"></script>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(request.getContextPath());
      out.write("/js/dhtmlx/dhtmlx.css\" type=\"text/css\" media=\"screen\">\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write("body\r\n");
      out.write("        {\r\n");
      out.write("            padding: 0;\r\n");
      out.write("            margin: 0;\r\n");
      out.write("            background: #ebebeb;\r\n");
      out.write("        }\r\n");
      out.write("        #hosp\r\n");
      out.write("        {\r\n");
      out.write("            float: left;\r\n");
      out.write("            margin-right: 10px;\r\n");
      out.write("        }\r\n");
      out.write("        #user\r\n");
      out.write("        {\r\n");
      out.write("            float: left;\r\n");
      out.write("            margin-right: 10px;\r\n");
      out.write("        }\r\n");
      out.write("        #pass\r\n");
      out.write("        {\r\n");
      out.write("            float: left;\r\n");
      out.write("            margin-right: 10px;\r\n");
      out.write("        }\r\n");
      out.write("        #button\r\n");
      out.write("        {\r\n");
      out.write("            float: left;\r\n");
      out.write("            width: 100px;\r\n");
      out.write("            height: 28px;\r\n");
      out.write("            cursor: pointer;\r\n");
      out.write("            margin-top: 26px;\r\n");
      out.write("            background: url(../images/performance/bureau/hospitalimg/login1.jpg) 50% 50% no-repeat;\r\n");
      out.write("        }\r\n");
      out.write("        #button:hover\r\n");
      out.write("        {\r\n");
      out.write("            float: left;\r\n");
      out.write("            width: 100px;\r\n");
      out.write("            height: 28px;\r\n");
      out.write("            cursor: pointer;\r\n");
      out.write("            background: url(../images/performance/bureau/hospitalimg/login2.jpg) 50% 50% no-repeat;\r\n");
      out.write("        }\r\n");
      out.write("        input\r\n");
      out.write("        {\r\n");
      out.write("            width: 120px;\r\n");
      out.write("            height: 20px;\r\n");
      out.write("        }\r\n");
      out.write("</style>\r\n");
      out.write("<script>\r\n");
      out.write("//add by zxt,套用赋值原来的登陆界面\r\n");
      out.write("var contextPath='");
      out.print(request.getContextPath());
      out.write("/bureau';\r\n");
      out.write("\r\n");
      out.write(" \r\n");
      out.write("$(document).ready(function(){\t\r\n");
      out.write("\tfunction mylogin(){\r\n");
      out.write("\t\tvar users=$('#userInput').val();\r\n");
      out.write("\t\tvar pss=$('#passwordInput').val();\r\n");
      out.write("\t\tvar hospital=$('#hospSelect').val();\r\n");
      out.write("\t\tvar oldname=$(\"input[name='username']\");\r\n");
      out.write("\t\tvar oldpss=$(\"input[name='password']\");\r\n");
      out.write("\t\tvar oldhosp=$(\"input[name='hospital']\");\r\n");
      out.write("\t\toldname.val(users);\r\n");
      out.write("\t\toldpss.val(pss);\r\n");
      out.write("\t\toldhosp.val(hospital);\r\n");
      out.write("\t\t\r\n");
      out.write("\t    login();//login.js里面的方法\t\t\r\n");
      out.write("\t}\r\n");
      out.write("\tvar serviceCall = new ServiceCall();\r\n");
      out.write("\tvar obj = new Object();\r\n");
      out.write("\tobj.sql = \"select hosp_id as 'key',hosp_name as 'value' from bureau.t_per_hosp\";\r\n");
      out.write("\tserviceCall.init(\"queryDataSvc\");\r\n");
      out.write("\tvar rt = serviceCall.execute(obj);\r\n");
      out.write("\t$.each(rt.list, function (index, value) {\r\n");
      out.write("\t    $('#hospSelect').append($('<option>', { \r\n");
      out.write("\t        value: rt.list[index].key,\r\n");
      out.write("\t        text : rt.list[index].value \r\n");
      out.write("\t    }));\r\n");
      out.write("\t});\r\n");
      out.write("\r\n");
      out.write("    $('#button').bind(\"click\",function(){        \t\r\n");
      out.write("    \tmylogin();   \t  \r\n");
      out.write("    \t});\r\n");
      out.write("    \r\n");
      out.write("    $('#userInput').bind('keyup', function(event){\r\n");
      out.write("    \t   if (event.keyCode==\"13\"){\r\n");
      out.write("    \t\t   mylogin();   \t\r\n");
      out.write("    \t\t   }\r\n");
      out.write("    });\r\n");
      out.write("    \r\n");
      out.write("    $('#passwordInput').bind('keyup', function(event){\r\n");
      out.write(" \t   if (event.keyCode==\"13\"){\r\n");
      out.write("\t\t   mylogin();   \t\r\n");
      out.write("\t\t   }\r\n");
      out.write("     });\r\n");
      out.write("    \r\n");
      out.write("    \r\n");
      out.write("});\r\n");
      out.write("\r\n");
      out.write("</script>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("<div style=\"height: 580px; background: #bdd4e2;\">\r\n");
      out.write("        <div style=\"background: url(../images/performance/bureau/hospitalimg/bgt.jpg) 50% 50% no-repeat; height: 381px;\r\n");
      out.write("            margin: 0 auto;\">\r\n");
      out.write("        </div>\r\n");
      out.write("        <div style=\"background: url(../images/performance/bureau/hospitalimg/barm1.jpg)  repeat-x; height: 33px;\">\r\n");
      out.write("        </div>\r\n");
      out.write("        <div style=\"background: url(../images/performance/bureau/hospitalimg/bgb.jpg)  repeat-x; height: 166px;\">\r\n");
      out.write("            <div style=\"height: 80px; line-height: 80px; float: right;padding-right:30px;\">\r\n");
      out.write("                <form action=\"login.spr\" method=\"post\" id=\"form1\">\r\n");
      out.write("                <div>\r\n");
      out.write("                \t<div id=\"hosp\">\r\n");
      out.write("                  \t\t 质控中心:<select  name=\"hospSelect\" id=\"hospSelect\"></select>\r\n");
      out.write("               \t\t</div>      \r\n");
      out.write("                    <div id=\"user\">\r\n");
      out.write("           \t\t\t\t用户:<input type=\"text\" name=\"userInput\" id=\"userInput\"/>\r\n");
      out.write("           \t\t\t</div>\r\n");
      out.write("                    <div id=\"pass\">\r\n");
      out.write("                        \t密码:<input type=\"password\" name=\"passwordInput\" id=\"passwordInput\"/>\r\n");
      out.write("                     </div>       \r\n");
      out.write("                    <div id=\"button\">\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("                      <div id=\"form_container\" style=\"display:none;position:absolute;left:550px;top:290px;\" ></div>\r\n");
      out.write("                </form>\r\n");
      out.write("            </div>\r\n");
      out.write("            <div style=\"clear: both;\">\r\n");
      out.write("            </div>\r\n");
      out.write("            <div style=\"background: url(../images/performance/bureau/hospitalimg/bgb2.jpg) 50% 50% no-repeat; height: 50px;\r\n");
      out.write("                padding-top: 25px;\">\r\n");
      out.write("            </div>\r\n");
      out.write("        </div>\r\n");
      out.write("    </div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}