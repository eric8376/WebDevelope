<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="/common/include/taglib.jsp" %>
<eRedG4:html title="图表">
    <eRedG4:import src="/resource/commonjs/FusionCharts.js"/>
    <eRedG4:body>
        <div id="my2DpChart_div" class="x-hidden" align="center" style="${style}"></div>
        <script type="text/javascript">
            var my2DpChart_chart_object = new FusionCharts("/sjyg/resource/fcf/Pie2D.swf", "my2DpChart", "550", "350");
            my2DpChart_chart_object.setDataXML("<?xml version='1.0' encoding='GB2312'?><graph baseFontSize='12' baseFont='宋体' caption='Google软件2010年月度销售业绩图表' showNames='1' numberPrefix='$' canvasBorderThickness='1'><set isSliced='0' color='AFD8F8' name='一月' value='1098'/><set isSliced='0' color='F6BD0F' name='二月' value='40000'/><set isSliced='0' color='8BBA00' name='三月' value='99999'/><set isSliced='0' color='008E8E' name='四月' value='109000'/><set isSliced='1' color='D64646' name='五月' value='35000'/><set isSliced='0' color='8E468E' name='六月' value='90000'/><set isSliced='0' color='588526' name='七月' value='50000'/><set isSliced='1' color='B3AA00' name='八月' value='63000'/><set isSliced='0' color='008ED6' name='九月' value='152000'/><set isSliced='0' color='9D080D' name='十月' value='122000'/><set isSliced='0' color='A186BE' name='十一月' value='30000'/><set isSliced='0' color='1EBE38' name='十二月' value='50000'/></graph>");
            my2DpChart_chart_object.addParam("wmode", "Opaque");
            my2DpChart_chart_object.render("my2DpChart_div");
        </script>
    </eRedG4:body>
    <script language="JavaScript">
        Ext.onReady(function () {
            var panel = new Ext.Panel({
                contentEl: 'my2DpChart_div'
            });

            var window = new Ext.Window({
                layout: 'fit',
                width: 570,
                height: 390,
                resizable: false,
                draggable: true,
                closeAction: 'hide',
                title: '<span class="commoncss">Google软件2010年月度销售业绩图表</span>',
                collapsible: true,
                titleCollapse: false,
                //下拉层的动画效果必须关闭,否则将出现Flash图标下拉动画过场异常的现象
                animCollapse: false,
                maximizable: true,
                border: false,
                closable: false,
                animateTarget: Ext.getBody(),
                constrain: true,
                items: [panel]
            });

            window.show();
        });
    </script>

</eRedG4:html>