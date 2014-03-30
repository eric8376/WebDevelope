set CATALINA_HOME=F:\tomcat\tomcat7
set CATALINA_BASE=F:\eric\workspace\proj\WebDevelope\instance
set JAVA_OPTS=-server -Xmx768m -noverify -javaagent:F:/eric/workspace/proj/WebDevelope/instance/lib/jrebel.jar -Drebel.dirs=F:/eric/workspace/proj/WebDevelope/src/main/webapp/WEB-INF/classes -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=8099 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false
set JPDA_ADDRESS=8123
cd\
call F:\tomcat\tomcat7\bin\catalina.bat  jpda run
pause

