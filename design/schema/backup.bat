rem *******************************Code Start*****************************
@echo off
set "Ymd=%date:~,4%%date:~5,2%%date:~8,2%"
"C:\Program Files (x86)\MySQL\MySQL Workbench CE 5.2.44"\mysqldump --opt -u root --password=weizhi2012 hospital > D:\microWillWeb2JE\backup\hospital\hospital_%Ymd%.sql
@echo on
rem *******************************Code End*****************************
rem pause