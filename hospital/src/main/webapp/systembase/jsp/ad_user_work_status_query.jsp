<!--
* 编程环境 IDEA.
* 编写者: 王少伟
* 主题:【设计部-人员工作状态查询】
* 时间: 2013-06-10 下午4:36
-->

<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="人员工作状态查询">
    <!--公共css包-->
    <eRedG4:import src="/systembase/css/commonCss.css"/>
    <!-- 公共集成包 -->
    <eRedG4:import src="/systembase/js/commonJs.js"/>
    <eRedG4:import src="/WorkFlow/js/user_tasks_mgr.js"/><!--用户任务管理页面-->
    <eRedG4:import src="/systembase/js/user_work_status_query.js"/>
    <eRedG4:import src="/systembase/js/ad_user_work_status_query.js"/>
    <eRedG4:body>
        <style>
            /*整体样式*/
            .main_board {
                padding: 6px;
            }

            /*在执行的job样式*/
            .job_border {
                cursor: default;
                background: #bee6e6;
                margin: 6px;
                padding: 3px;
                width: 200;
                height: 109;
                float: left;
                border: 1px solid #6bc7e6;
                opacity: 0.85;
            }

            /*在执行的job样式_移过*/
            .job_border_over {
                cursor: pointer;
                background: #90ee90;
                margin: 6px;
                padding: 3px;
                padding-top: 5px;
                width: 200;
                height: 109;
                border: 2px solid lightblue;
                opacity: 1;
            }
        </style>
    </eRedG4:body>
</eRedG4:html>