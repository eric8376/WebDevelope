Ext.onReady(function () {
// 布局模型
    var viewport = new Ext.Viewport({
        layout: 'fit',
        items: [inhandworkgrid]/*,
         listeners : {
         resize : function(viewport, adjWidth, adjHeight, rawWidth,
         rawHeight) {
         inhandworkgrid.setWidth(document.body.clientWidth);
         inhandworkgrid.doLayout();
         Ext.getCmp("inhandwork")
         .setWidth(document.body.clientWidth);
         Ext.getCmp("inhandwork")
         .setHeight((document.body.clientHeight) );

         }
         }*/
    });
});