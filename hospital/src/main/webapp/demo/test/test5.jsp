<%@ page language="java" contentType="text/html; charset=utf-8"
         isELIgnored="false" %>
<%@ include file="/common/include/taglib.jsp" %>
<G4Studio:html title="测试5" fcfEnabled="true">
    <G4Studio:import src="/demo/test/js/test5.js"/>
    <G4Studio:body>
        <div id="myLineMsChart_div" class="x-hidden" align="center" style="${style}"></div>
        <script type="text/javascript">
            var myLineMsChart_chart_object = new FusionCharts("/G4Studio/resource/fcf/MSCombiDY2D.swf", "myLineMsChart", "550", "350");
            myLineMsChart_chart_object.setDataXML("<?xml version='1.0' encoding='GB2312'?><graph formatNumberScale='0' baseFontSize='12' baseFont='宋体' caption='三年收入、税额变化趋势图' numberPrefix='￥' canvasBorderThickness='1'><categories font='宋体' categories='[{name=2008年1~12月}, {name=2009年1~12月}, {name=2010年1~12月}]' fontSize='12'><category name='2008年1~12月'/><category name='2009年1~12月'/><category name='2010年1~12月'/></categories><dataset dataList='[{value=87937585.68}, {value=56759049.91}, {value=39874892.29}]' seriesname='销售收入' renderAs='Line' color='008ED6' parentYAxis='P'><set value='87937585.68'/><set value='56759049.91'/><set value='39874892.29'/></dataset><dataset dataList='[{value=2808914.02}, {value=1223444.94}, {value=709703.31}]' seriesname='应纳税额' color='FF0066' parentYAxis='S'><set value='2808914.02'/><set value='1223444.94'/><set value='709703.31'/></dataset></graph>");
            myLineMsChart_chart_object.addParam("wmode", "Opaque");
            myLineMsChart_chart_object.render("myLineMsChart_div");
        </script>
        <script language="JavaScript">
            Ext.onReady(function () {
                var panel = new Ext.Panel({
                    contentEl: 'myLineMsChart_div'
                });
                var window = new Ext.Window({
                    layout: 'fit',
                    width: 580,
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
    </G4Studio:body>
</G4Studio:html>