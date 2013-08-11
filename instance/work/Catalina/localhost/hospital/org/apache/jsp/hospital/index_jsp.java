package org.apache.jsp.hospital;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
      out.write("<title>医院全面质量与绩效考核系统</title>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/dhtmlx/dhtmlx.js\"></script>\r\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/inc/json/json.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/performance/hospital/login.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(request.getContextPath());
      out.write("/js/jquery-1.9.1.min.js\"></script>\r\n");
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
      out.write("            background: url(../images/performance/hospital/hospitalimg/login1.jpg) 50% 50% no-repeat;\r\n");
      out.write("        }\r\n");
      out.write("        #button:hover\r\n");
      out.write("        {\r\n");
      out.write("            float: left;\r\n");
      out.write("            width: 100px;\r\n");
      out.write("            height: 28px;\r\n");
      out.write("            cursor: pointer;\r\n");
      out.write("            background: url(../images/performance/hospital/hospitalimg/login2.jpg) 50% 50% no-repeat;\r\n");
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
      out.write("/hospital';\r\n");
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
      out.write("\t\r\n");
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
      out.write("        <div style=\"background: url(../images/performance/hospital/hospitalimg/bgt.jpg) 50% 50% no-repeat; height: 381px;\r\n");
      out.write("            margin: 0 auto;\">\r\n");
      out.write("        </div>\r\n");
      out.write("        <div style=\"background: url(../images/performance/hospital/hospitalimg/barm1.jpg)  repeat-x; height: 33px;\">\r\n");
      out.write("        </div>\r\n");
      out.write("        <div style=\"background: url(../images/performance/hospital/hospitalimg/bgb.jpg)  repeat-x; height: 166px;\">\r\n");
      out.write("            <div style=\"height: 80px; line-height: 80px; float: right;padding-right:30px;\">\r\n");
      out.write("                <form action=\"login.spr\" method=\"post\" id=\"form1\">\r\n");
      out.write("                <div>\r\n");
      out.write("                \t<div id=\"hosp\">\r\n");
      out.write("                  \t\t 医院:<input  name=\"text\" id=\"hospSelect\"/>\r\n");
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
      out.write("            <div style=\"background: url(../images/performance/hospital/hospitalimg/bgb2.jpg) 50% 50% no-repeat; height: 50px;\r\n");
      out.write("                padding-top: 25px;\">\r\n");
      out.write("            </div>\r\n");
      out.write("        </div>\r\n");
      out.write("    </div>\r\n");
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
