set CATALINA_HOME=F:\tomcat\tomcat8
set CATALINA_BASE=F:\eric\workspace\proj\WebDevelope\instance
SET  JAVA_OPTS=-Xms256m -Xmx512m -XX:MaxNewSize=256m -XX:MaxPermSize=256m 
set JPDA_ADDRESS=8000
cd\
call F:\tomcat\tomcat8\bin\catalina.bat  jpda run
pause