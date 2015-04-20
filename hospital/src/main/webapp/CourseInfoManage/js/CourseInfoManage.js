/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 19:11.
 */
Ext.require('Ext4.HOS.GridPanel.HospitalInfo_Grid');
Ext.require('Ext4.HOS.GridPanel.CourseInfo_Grid');
Ext.onReady(function () {
    var grid = new Ext4.HOS.GridPanel.CourseInfo_Grid({
        createFlag: true,
        delFlag: true,
        updateFlag: true,
        border: false,
        paging: true,
        // width:600,
        autoScroll: true,
        title: '<span class="commoncss">科目信息列表</span>'
    })

    // 布局模型
    new Ext.Viewport({
        layout: 'fit',
        items: [grid]
    });

})