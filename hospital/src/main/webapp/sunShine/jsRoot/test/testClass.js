/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【测试动态加载js类】
 * 时间: 2013-06-26  下午3:15
 */
//importJs("sunShine.common.UXGrid1");
//importJs("sunShine.common.UXTree1");
//Ext.define('sunShine.test.testClass', {
//    extend: 'sunShine.common.UXWindow1',
//    alias: 'widget.myWindow',
//    width: 1007,
//    height: 489,
//
//    layout: 'border',
//    title: '测试窗口',
//    items: [
//        {
//            xtype: 'UXTree1',
//            store:getTreeStore(),
//            region:'west',
//            title: '左边'
//        },
//        {
//            xtype: 'UXGrid1',
//            store:getGridStore({autoLoad:true}),
//            columns:[{text:'名字',dataIndex:'name',flex:1}],
//            region: 'center',
//            title: '欢迎您',
//            operWin:Ext.create('sunShine.test.testOperWin')
//        },
//        {
//            xtype:'UXGrid1',
//            store:getGridStore({autoLoad:true,headers:['编号','名字','未知']}),
//            region: 'south',
//            height:200,
//            title: '欢迎您南部',
//            event_del:function(record){alert(record.get("name"));},
//            collapseFlag:true,
//            operWin:Ext.create('sunShine.test.testOperWin',{title:'测试窗口2'})
//        }
//    ],
//    initComponent:function(){
//        var me=this;
//        me.callParent(arguments);
//    }
//});
//data to be loaded into the ArrayStore
var data = [
    [true, false, 1, "LG KS360", 54, "240 x 320 pixels", "2 Megapixel", "Pink", "Slider", 359, 2.400000],
    [true, true, 2, "Sony Ericsson C510a Cyber-shot", 180, "320 x 240 pixels", "3.2 Megapixel", "Future black", "Candy bar", 11, 0.000000],
    [true, true, 3, "LG PRADA KE850", 155, "240 x 400 pixels", "2 Megapixel", "Black", "Candy bar", 113, 0.000000],
    [true, true, 4, "Nokia N900 Smartphone 32 GB", 499, "800 x 480 pixels", "5 Megapixel", "( the image of the product displayed may be of a different color )", "Slider", 320, 3.500000],
    [true, false, 5, "Motorola RAZR V3", 65, "96 x 80 pixels", "0.3 Megapixel", "Silver", "Folder type phone", 5, 2.200000],
    [true, true, 6, "LG KC910 Renoir", 242, "240 x 400 pixels", "8 Megapixel", "Black", "Candy bar", 79, 0.000000],
    [true, true, 11115, "BlackBerry Curve 8520 BlackBerry", 299, "320 x 240 pixels", "2 Megapixel", "Frost", "Candy bar", 320, 2.640000],
    [true, true, 8, "Sony Ericsson W580i Walkman", 120, "240 x 320 pixels", "2 Megapixel", "Urban gray", "Slider", 1, 0.000000],
    [true, true, 9, "Nokia E63 Smartphone 110 MB", 170, "320 x 240 pixels", "2 Megapixel", "Ultramarine blue", "Candy bar", 319, 2.360000],
    [true, true, 11115, "Sony Ericsson W705a Walkman", 274, "320 x 240 pixels", "3.2 Megapixel", "Luxury silver", "Slider", 5, 0.000000],
    [false, false, 11, "Nokia 5310 XpressMusic", 140, "320 x 240 pixels", "2 Megapixel", "Blue", "Candy bar", 344, 2.000000],
    [false, true, 12, "Motorola SLVR L6i", 50, "128 x 160 pixels", "", "Black", "Candy bar", 38, 0.000000],
    [false, true, 13, "T-Mobile Sidekick 3 Smartphone 64 MB", 75, "240 x 160 pixels", "1.3 Megapixel", "", "Sidekick", 115, 0.000000],
    [false, true, 14, "Audiovox CDM8600", 5, "", "", "", "Folder type phone", 1, 0.000000],
    [false, true, 15, "Nokia N85", 315, "320 x 240 pixels", "5 Megapixel", "Copper", "Dual slider", 143, 2.600000],
    [false, true, 16, "Sony Ericsson XPERIA X1", 399, "800 x 480 pixels", "3.2 Megapixel", "Solid black", "Slider", 14, 0.000000],
    [false, true, 17, "Motorola W377", 77, "128 x 160 pixels", "0.3 Megapixel", "", "Folder type phone", 35, 0.000000],
    [true, true, 18, "LG Xenon GR500", 1, "240 x 400 pixels", "2 Megapixel", "Red", "Slider", 658, 2.800000],
    [true, false, 19, "BlackBerry Curve 8900 BlackBerry", 349, "480 x 360 pixels", "3.2 Megapixel", "", "Candy bar", 21, 2.440000],
    [true, false, 20, "Samsung SGH U600 Ultra Edition 10.9", 135, "240 x 320 pixels", "3.2 Megapixel", "", "Slider", 169, 2.200000],

    [true, false, 1, "LG KS360", 54, "240 x 320 pixels", "2 Megapixel", "Pink", "Slider", 359, 2.400000],
    [true, true, 2, "Sony Ericsson C510a Cyber-shot", 180, "320 x 240 pixels", "3.2 Megapixel", "Future black", "Candy bar", 11, 0.000000],
    [true, true, 3, "LG PRADA KE850", 155, "240 x 400 pixels", "2 Megapixel", "Black", "Candy bar", 113, 0.000000],
    [true, true, 4, "Nokia N900 Smartphone 32 GB", 499, "800 x 480 pixels", "5 Megapixel", "( the image of the product displayed may be of a different color )", "Slider", 320, 3.500000],
    [true, false, 11115, "Motorola RAZR V3", 65, "96 x 80 pixels", "0.3 Megapixel", "Silver", "Folder type phone", 5, 2.200000],
    [true, true, 11126, "LG KC910 Renoir", 242, "240 x 400 pixels", "8 Megapixel", "Black", "Candy bar", 79, 0.000000],
    [true, true, 7, "BlackBerry Curve 8520 BlackBerry", 299, "320 x 240 pixels", "2 Megapixel", "Frost", "Candy bar", 320, 2.640000],
    [true, true, 8, "Sony Ericsson W580i Walkman", 120, "240 x 320 pixels", "2 Megapixel", "Urban gray", "Slider", 1, 0.000000],
    [true, true, 9, "Nokia E63 Smartphone 110 MB", 170, "320 x 240 pixels", "2 Megapixel", "Ultramarine blue", "Candy bar", 319, 2.360000],
    [true, true, 11115, "Sony Ericsson W705a Walkman", 274, "320 x 240 pixels", "3.2 Megapixel", "Luxury silver", "Slider", 5, 0.000000],
    [false, false, 11115, "Nokia 5310 XpressMusic", 140, "320 x 240 pixels", "2 Megapixel", "Blue", "Candy bar", 344, 2.000000],
    [false, true, 12, "Motorola SLVR L6i", 50, "128 x 160 pixels", "", "Black", "Candy bar", 38, 0.000000],
    [false, true, 13, "T-Mobile Sidekick 3 Smartphone 64 MB", 75, "240 x 160 pixels", "1.3 Megapixel", "", "Sidekick", 115, 0.000000],
    [false, true, 14, "Audiovox CDM8600", 5, "", "", "", "Folder type phone", 1, 0.000000],
    [false, true, 15, "Nokia N85", 315, "320 x 240 pixels", "5 Megapixel", "Copper", "Dual slider", 143, 2.600000],
    [false, true, 16, "Sony Ericsson XPERIA X1", 399, "800 x 480 pixels", "3.2 Megapixel", "Solid black", "Slider", 14, 0.000000],
    [false, true, 17, "Motorola W377", 77, "128 x 160 pixels", "0.3 Megapixel", "", "Folder type phone", 35, 0.000000],
    [true, true, 18, "LG Xenon GR500", 1, "240 x 400 pixels", "2 Megapixel", "Red", "Slider", 658, 2.800000],
    [true, false, 19, "BlackBerry Curve 8900 BlackBerry", 349, "480 x 360 pixels", "3.2 Megapixel", "", "Candy bar", 21, 2.440000],
    [true, false, 20, "Samsung SGH U600 Ultra Edition 10.9", 135, "240 x 320 pixels", "3.2 Megapixel", "", "Slider", 169, 2.200000]
];

Ext.define('Mobile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'hasEmail', type: 'bool'},
        {name: 'hasCamera', type: 'bool'},
        {name: 'id', type: 'int'},
        'name',
        {name: 'price', type: 'int'},
        'screen',
        'camera',
        'color',
        'type',
        {name: 'reviews', type: 'int'},
        {name: 'screen-size', type: 'int'}
    ]
});

var store = Ext.create('Ext.data.ArrayStore', {
    data: data,
    model: 'Mobile',
    sortInfo: {
        field: 'name',
        direction: 'ASC'
    }
});

//setInterval(function(){
//     var record=new Mobile();
//     record.set('name','测试');
//     store.add(record);
//    record=new Mobile();
//    record.set('name','测试');
//     store.add(record);
//    record=new Mobile();
//    record.set('name','测试');
//     store.add(record);
//},750);

Ext.define('sunShine.test.testClass', {
    extend: 'sunShine.common.UXWindow1',
    alias: 'widget.myWindow',
    width: 1007,
    height: 489,

    layout: 'border',
    title: '测试窗口',
    items: [
        {
            xtype: 'panel',
            id: 'xcvcxvds',
            title: 'drag and drop',
            region: 'center',
            bodyStyle: 'background:lightgreen;',
            //width:100000,
            layout: 'auto',
            //style:'over-flow:hidden;',
            items: [
                {
                    xtype: 'dataview',
                    store: store,
                    style: '',
                    width: 10000,
                    height: '100%',
                    tpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                        '<div class="phone"  style="width:64;height:64;float:left;border:1px solid blue;margin:3px;">',
                        '{id}',
                        '</div>',
                        '</tpl>',
                        '<br/><img style="width:100px;height:100PX;border:1px solid black;" src="Quick.ered?reqCode=getCodeImg&model=1&code=123422222222222222256789">'
                    ),

                    plugins: [
                        Ext.create('Ext.ux.DataView.Animated', {
                            duration: 750,
                            idProperty: 'id'
                        }),
                        new slidePage()
                    ],

                    itemSelector: 'div.phone',
                    overItemCls: 'phone-hover',
                    multiSelect: true,
                    autoScroll: true,
//                    width:500,
//                    height:200,
//                    store:store,
//                    itemSelector:'div.border',
//                    id:'dataview11111',
//                    deferInitialRefresh: false,
//                   // x:0,y:34,
//                    tpl:[
//                        '<tpl for="."><div class="border" style="width:100px;height:100px;float:left;border:1px solid blue;margin:4px;">中文</div></tpl>'
//                    ],
//                    plugins : [
//                        Ext.create('Ext.ux.DataView.Animated', {
//                            duration  : 550,
//                            idProperty: 'id'
//                        })
//                    ],
                    listeners: {
                        afterrender2: function () {
                            alert(1);
                            var me = this;
                            var pressStartXY = [0, 0];
                            var meXY = [0, 0];
                            var pressEndXY = [0, 0];
                            var isPress = false;
                            this.getEl().dom.onmousedown = function (e) {
                                pressStartXY = [e.x, e.y];
                                meXY = me.getXY();
                                isPress = true;
                            };
                            document.body.onmouseup = function (e) {
                                pressEndXY = [e.x, e.y];
                                isPress = false;
                                me.setXY(meXY);
                            };
                            document.body.onmousemove = function (e) {
                                me.isPress = isPress;
                                if (isPress) {
                                    var xy = me.getXY();
                                    me.setXY([(meXY[0] + (e.x - pressStartXY[0])), (meXY[1] + (e.y - pressStartXY[1]))]);
                                }
                            };
                        },
                        itemclick2: function (view, record) {

                            var me = this;
                            if (!me.isPress) {
                                var store = me.getStore();
                                store.suspendEvents();
                                store.clearFilter();
                                store.resumeEvents();
//                                store.filter([{
//                                    fn: function(record) {
//                                        return record.get('price')>0;
//                                    }
//                                }]);
                                var record = new Mobile();
                                record.set('name', '测试')
                                store.add(record);
                            }
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        var me = this;

//// 创建一个Socket实例
//        var socket = new WebSocket('ws://localhost:9988');
//        alert(1);
//// 打开Socket
//        socket.onopen = function(event) {
//              alert(1);
//            // 发送一个初始化消息
//            socket.send('I am the client and I\'m listening!');
//
//            // 监听消息
//            socket.onmessage = function(event) {
//                console.log('Client received a message',event);
//            };
//
//            // 监听Socket的关闭
//            socket.onclose = function(event) {
//                console.log('Client notified socket has closed',event);
//            };
//
//            // 关闭Socket....
//            //socket.close()
//        };

        me.callParent(arguments);


    }
});

function slidePage() {
    this.width = 10000;
    this.itemwidth = 80;
    this.pageWidth = 100;
    this.parentWidth = 1000;
    this.mode = 1,
        this.init = function (dataview) {
            dataview.on("afterrender", function () {
                var me = this;

                var pressStartXY = [0, 0];
                var meXY = [0, 0];
                var pressEndXY = [0, 0];
                var isPress = false;
                var targetXY = [0, 0];
                this.getEl().dom.onmousedown = function (e) {
                    pressStartXY = [e.x, e.y];
                    meXY = me.getXY();
                    isPress = true;
                };

                document.body.onmouseup = function (e) {

                    isPress = false;
                    pressEndXY = [e.x, e.y];


                    //do the movements
                    var startTime = 0;
                    var duration = 750;

                    var doAnimate = function () {
                        var elapsed = new Date() - startTime,
                            fraction = elapsed / duration;

                        if (fraction >= 1) {
//                     console.log(me.getXY());
//                     console.log(targetXY);
                            Ext.TaskManager.stop(task);
//                     me.setXY(targetXY);
                        } else {
                            var xy = me.getXY();
                            var x = fraction * (targetXY[0] - xy[0]);
//                     console.log([(x+xy[0]),meXY[1]]);
                            me.setXY([(x + xy[0]), meXY[1]]);
                        }
                    };
                    var task = {
                        run: doAnimate,
                        interval: 20,
                        scope: this
                    };

                    if (pressEndXY[0] - pressStartXY[0] > 100) {
                        targetXY = [(meXY[0] + 1635), meXY[1]];
                    } else if (pressEndXY[0] - pressStartXY[0] < -100) {
                        targetXY = [(meXY[0] - 1635), meXY[1]];
                    } else {
                        targetXY = meXY;
                    }

//             console.log("跑至:"+targetXY);
                    startTime = new Date();
                    Ext.TaskManager.start(task);
                };
                document.body.onmousemove = function (e) {
                    me.isPress = isPress;
                    if (isPress) {
                        me.setXY([(meXY[0] + (e.x - pressStartXY[0])), meXY[1]]);
                    }
                };

            }, dataview);
        }
}

