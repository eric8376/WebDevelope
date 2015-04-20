/*
 * This calendar application was forked from Ext Calendar Pro
 * and contributed to Ext JS as an advanced example of what can 
 * be built using and customizing Ext components and templates.
 * 
 * If you find this example to be useful you should take a look at
 * the original project, which has more features, more examples and
 * is maintained on a regular basis:
 * 
 *  http://ext.ensible.com/products/calendar
 */
Ext.define('Ext4.Com.Other.calendar.src.ProductRule', {
        extend: 'Ext.Viewport',
        requires: [
            'Ext4.PM.Other.ChoiceProduceWin',
            'Ext.layout.container.Border',
            'Ext.picker.Date',
            'Ext4.Com.Other.calendar.src.util.Date',
            'Ext4.Com.Other.calendar.src.CalendarPanel',
            'Ext4.Com.Other.calendar.src.data.MemoryCalendarStore',
            'Ext4.Com.Other.calendar.src.data.MemoryEventStore',
            'Ext4.Com.Other.calendar.src.data.ProductRuleEvents',
            'Ext4.Com.Other.calendar.src.data.ProductRuleTimeType',
            'Ext4.Com.Other.calendar.src.form.EventWindow'
        ],
        productid: '',
        layout: 'border',
        renderTo: 'calendar-ct',
        first1: false,
        first2: false,
        first3: false,
        first4: false,
        first5: false,
        first6: false,
        first7: false,
        first8: false,
        first9: false,
        first10: false,
        smallTime: '',
        bigTime: '',
        isBaseProduce: true,
        beforeCloseSveValue: true,
        initComponent: function () {
            //动态加载css
            Ext.util.CSS.removeStyleSheet('Calendarstyles');
            Ext.util.CSS.removeStyleSheet('Calendar_styles');
            Ext.util.CSS.swapStyleSheet('Calendarstyles', './Extjs4Classes/Com/Other/calendar/resources/css/calendar.css');
            Ext.util.CSS.swapStyleSheet('Calendar_styles', './Extjs4Classes/Com/Other/calendar/resources/css/examples.css');
            // Minor workaround for OSX Lion scrollbars
            this.checkScrollOffset();
            var me = this;
            // This is an example calendar store that enables event color-coding
            this.calendarStore = Ext.create('Ext4.Com.Other.calendar.src.data.MemoryCalendarStore', {
//                data: Ext4.Com.Other.calendar.src.data.Calendars.getData()
                data: Ext4.Com.Other.calendar.src.data.ProductRuleTimeType.getData()
            });
            me.getEventStore();
            var WeeKend = new Ext.form.field.Radio({
                anchor: '100%',
                itemId: 'WeeKend',
                name: 'day',
                boxLabel: '节假日可使用',
                listeners: {
                    change: function (v) {
                        if (me.first1) {
                            if (me.WeeKend.getValue()) {
                                if (Ext.getCmp('zdy').getValue() && !Ext.isEmpty(Ext.getCmp('customTime').getValue()) && Ext.getCmp('customTime').getValue() < 7) {
                                    Ext.Msg.alert("提示", "您选择的消费时间段为节假日，天数不得低于7天")
                                    return;
                                    //customTime
                                }
                                if (Ext.getCmp('zdy').getValue() && Ext.isEmpty(Ext.getCmp('customTime').getValue())) {
                                    Ext.Msg.alert("提示", "您选择的消费时间段为节假日，天数不得低于7天")
                                    return;
                                }
                            }
                            me.saveCheckBoxValue(v, 1, me);
                        } else {
                            me.first1 = true;
                        }

                    }
                }
            });
            var OrdinaryDays = new Ext.form.field.Radio({
                anchor: '100%',
                itemId: 'Usually',
                name: 'day',
                boxLabel: '平日票可使用',
                listeners: {
                    change: function (v) {
                        if (me.first2) {
                            me.saveCheckBoxValue(v, 2, me);
                        } else {
                            me.first2 = true;
                        }
                    }
                }
            })
            var allDays = new Ext.form.field.Radio({
                anchor: '100%',
                itemId: 'OrdinaryDays',
                name: 'day',
                boxLabel: '长期可使用',
                listeners: {
                    change: function (v) {
                        if (me.first3) {
                            me.saveCheckBoxValue(v, 3, me);
                        } else {
                            me.first3 = true;
                        }

                    }
                }
            })
            var weekRadioGroup = new Ext.form.RadioGroup({
                vertical: true,
                columns: 1,
                items: [
                    WeeKend, OrdinaryDays, allDays
                ]
            })

            var effectiveTime = new Ext.form.field.Number({
                name: 'time',
                id: 'effectiveTime',
                labelWidth: 80,
                fieldLabel: '产品延迟生效自定义(小时)',
                allowBlank: false,  // requires a non-empty value
                hidden: true,
                oldValues: '',
                checkForm: {},
                minValue: 1,
                decimalPrecision: 0,
                isOk: false,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                listeners: {
                    focus: function (v) {
                        this.oldValues = v.value;
                        this.isOk = true;
                        me.beforeCloseSveValue = false;
                    },
                    blur: function (v) {
                        if (v.value == 0) {
                            v.setValue(this.oldValues);
                            return;
                        }
                        if (v.value.toString().length > 6) {
                            v.setValue(this.oldValues);
                            return;
                        }
                        if (v.value.toString().length == 0) {
                            v.setValue(this.oldValues);
                            Ext.Msg.alert("提示", "您填写的天数不可以为空");
                            return;
                        }
                        if (v.oldValues != v.value && !Ext.isEmpty(v.value) && this.isOk) {
                            me.saveCheckBoxValue(this.checkForm, 10, me, v.value);
                            this.isOk = false;
                        }
                    }
                }
            })


            //产品生效策略
            var effectiveRadioGroup = new Ext.form.RadioGroup({
                vertical: true,
                columns: 1,
                fieldLabel: '生效策略',
                items: [
                    {
                        boxLabel: '游玩时间有效', id: 'ywsjyx', name: 'ywsj', listeners: {
                        change: function (v) {
                            if (me.first4) {
                                me.saveCheckBoxValue(v, 4, me);
                            } else {
                                me.first4 = true;
                            }
                        }
                    }
                    },
                    {
                        boxLabel: '下单时间立即生效', id: 'xdsjljsx', name: 'ywsj', listeners: {
                        change: function (v) {
                            if (me.first5) {
                                me.saveCheckBoxValue(v, 5, me);
                            } else {
                                me.first5 = true;
                            }
                        }
                    }
                    },
                    {
                        boxLabel: '生效时间延迟', id: 'sxsjyc', name: 'ywsj', listeners: {
                        change: function (v, newV, oldV) {
                            if (me.first10) {
                                if (newV) {
                                    effectiveTime.checkForm = v;
                                    effectiveTime.show();
                                } else if (!newV) {
                                    effectiveTime.hide();
                                    me.saveCheckBoxValue(v, 10, me, effectiveTime.getValue());
                                }
                            } else {
                                me.first10 = true;
                            }
                        }
                    }
                    }
                ]
            });

            var customTime = new Ext.form.field.Number({
                name: 'name',
                id: 'customTime',
                labelWidth: 80,
                fieldLabel: '产品有效期自定义(天数)',
                allowBlank: false,  // requires a non-empty value
                hidden: true,
                oldValues: '',
                checkForm: {},
                minValue: 1,
                decimalPrecision: 0,
                isOk: false,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                listeners: {
                    focus: function (v) {
                        this.oldValues = v.value;
                        this.isOk = true;
                        me.beforeCloseSveValue = false;
                    },
                    blur: function (v) {
                        if (v.value == 0) {
                            v.setValue(this.oldValues);
                            return;
                        }
                        if (v.value.toString().length > 6) {
                            v.setValue(this.oldValues);
                            return;
                        }
                        if (v.value.toString().length == 0) {
                            v.setValue(this.oldValues);
                            Ext.Msg.alert("提示", "您填写的天数不可以为空");
                            return;
                        }
                        if (me.WeeKend.getValue() && v.value < 7) {
                            Ext.Msg.alert("提示", "您选择的消费时间段为节假日，天数不得低于7天")
                            return;
                            //customTime
                        }
                        if (v.oldValues != v.value && !Ext.isEmpty(v.value) && this.isOk) {
                            me.saveCheckBoxValue(this.checkForm, 8, me, v.value);
                            this.isOk = false;
                        }
                    }
                }
            })
            //产品有效期策略
            var effectiveTimeRadioGroup = new Ext.form.RadioGroup({
                vertical: true,
                columns: 1,
                fieldLabel: '产品有效期',
                items: [
                    {
                        boxLabel: '7天', id: 'Seven', name: 'effectiveDay', listeners: {
                        change: function (v) {
                            if (me.first6) {
                                me.saveCheckBoxValue(v, 6, me);
                            } else {
                                me.first6 = true;
                            }
                        }
                    }
                    },
                    {
                        boxLabel: '15天', id: 'Fifteen', name: 'effectiveDay', listeners: {
                        change: function (v) {
                            if (me.first7) {
                                me.saveCheckBoxValue(v, 7, me);
                            } else {
                                me.first7 = true;
                            }
                        }
                    }
                    },
                    {
                        boxLabel: '永久有效', id: 'forever', name: 'effectiveDay', listeners: {
                        change: function (v) {
                            if (me.first9) {
                                me.saveCheckBoxValue(v, 9, me);
                            } else {
                                me.first9 = true;
                            }
                        }
                    }
                    },
                    {
                        boxLabel: '自定义天数', id: 'zdy', name: 'effectiveDay', listeners: {
                        change: function (v, newV, oldV) {
                            if (me.first8) {
                                if (newV) {
                                    customTime.checkForm = v;
                                    customTime.show();
                                } else if (!newV) {
                                    customTime.hide();
                                    me.saveCheckBoxValue(v, 8, me, customTime.getValue());
                                }
                            } else {
                                me.first8 = true;
                            }
                        }
                    }
                    }
                ]
            });

            me.items = [
                {
                    xtype: 'component',
                    id: 'app-header',
                    region: 'north',
                    height: 35,
                    contentEl: 'app-header-content'
                },
                {
                    id: 'app-center',
                    title: '...', // will be updated to the current view's date range
//                        region: 'center',
//                        titleAlign: 'center',
                    layout: 'border',
                    region: 'center',
                    listeners: {
                        'afterrender': function () {
                            Ext.getCmp('app-center').header.addCls('app-center-header');
                        }
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'app-west',
                            region: 'west',
                            layout: {
                                type: 'column',
                                columns: 2
                            },
                            width: document.body.clientWidth * 0.5,
                            items: [
                                {
                                    columnWidth: 0.32,
                                    height: 200,
                                    xtype: 'datepicker',
                                    hidden: true,
                                    id: 'app-nav-picker',
                                    cls: 'ext-cal-nav-picker',
                                    listeners: {
                                        'select': {
                                            fn: function (dp, dt) {
                                                me.Calendar_Panel.setStartDate(dt);
                                                me.AllDataReload(true);
                                            },
                                            scope: this
                                        }
                                    }
                                },
                                {
                                    columnWidth: 0.4,
                                    height: document.body.clientHeight * 0.6,
                                    xtype: 'form',
                                    titleAlign: 'left',
                                    fieldDefaults: {
                                        labelWidth: 60,
                                        labelAlign: 'right'
                                    },
                                    title: '平日与节假日票',
                                    items: [
                                        weekRadioGroup
                                    ],
                                    anchor: '100%'
                                }
                                ,
                                {
                                    columnWidth: 0.6,
                                    height: document.body.clientHeight * 0.6,
                                    xtype: 'form',
                                    titleAlign: 'left',
                                    fieldDefaults: {
                                        labelWidth: 60,
                                        labelAlign: 'right'
                                    },
                                    title: '生效策略',
                                    items: [
                                        effectiveRadioGroup,
                                        effectiveTime,
                                        effectiveTimeRadioGroup,
                                        customTime
                                    ],
                                    anchor: '100%'
                                }
                                ,
                                Ext.create('Ext4.PM.GridPanel.ProduceSimpleRuleGridPanel',
                                    {
                                        columnWidth: 1,
                                        title: '自定义消费时间段',
                                        priority: '4',
                                        height: document.body.clientHeight * 0.25,
                                        productid: me.productid,
                                        loginuserid: loginuserid,
                                        autoloaddata: true,
                                        storeId: 'ProduceSimpleRuleStoreID'
                                    })
                            ]
                        },
                        {
                            xtype: 'calendarpanel',
                            productid: me.productid,
                            App: me,
                            itemId: 'Calendar_Panel',
                            eventStore: this.eventStore,
                            calendarStore: this.calendarStore,
                            border: false,
                            id: 'app-calendar',
                            region: 'center',
                            activeItem: 3, // month view
                            monthViewCfg: {
                                showHeader: true,
                                showWeekLinks: true,
                                showWeekNumbers: true
                            },
                            listeners: {
                                //修改事件
                                'eventclick': {
                                    fn: function (vw, rec, el) {
                                        this.showEditWindow(rec, el);
                                        this.clearMsg();
                                    },
                                    scope: this
                                },
                                'eventover': function (vw, rec, el) {
//                               console.log('Entered evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                                },
                                'eventout': function (vw, rec, el) {
//                               console.log('Leaving evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                                },
                                'eventadd': {
                                    fn: function (cp, rec) {
                                        this.showMsg('使用时间段：' + rec.data.Title + ' 添加成功');
                                    },
                                    scope: this
                                },
                                'eventupdate': {
                                    fn: function (cp, rec) {
                                        this.showMsg('使用时间段：' + rec.data.Title + ' 更新成功');
                                    },
                                    scope: this
                                },
                                'eventcancel': {
                                    fn: function (cp, rec) {
                                        // edit canceled
                                    },
                                    scope: this
                                },
                                'viewchange': {
                                    fn: function (p, vw, dateInfo) {
                                        me.AllDataReload(true);
                                        if (this.editWin) {
                                            this.editWin.hide();
                                        }
                                        if (dateInfo) {
                                            // will be null when switching to the event edit form so ignore
                                            me.appnavPickerChange(dateInfo.activeDate)
                                            this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                                        }
                                    },
                                    scope: this
                                },
                                //新增事件
                                'dayclick': {
                                    fn: function (vw, dt, ad, el) {
                                        this.showEditWindow({
                                            StartDate: dt,
                                            IsAllDay: ad,
                                            priority: 1
                                        }, el);
                                        this.clearMsg();
                                    },
                                    scope: this
                                },
                                'rangeselect': {
                                    fn: function (win, dates, onComplete) {
                                        dates.priority = 2;
                                        this.showEditWindow(dates);
                                        this.editWin.on('hide', onComplete, this, {single: true});
                                        this.clearMsg();
                                    },
                                    scope: this
                                },
                                'eventmove': {
                                    fn: function (vw, rec) {
                                        alert("暂时不支持移动");
                                        return;
//                                        var mappings = Ext4.Com.Other.calendar.src.data.EventMappings,
//                                            time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';
//                                        rec.data.operate = 'update';
//                                        me.doTerminatorPayConfigCUD(rec.data, function () {
//                                            me.TerminatorPayConfigStoreReload();
//                                            rec.commit();
//                                            me.showMsg('产品使用时间段：' + rec.data[mappings.Title.name] + ' 成功移动到 ' +
//                                                Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS' + time)));
//
//                                        })
                                    },
                                    scope: this
                                },
                                'eventresize': {
                                    fn: function (vw, rec) {
                                        rec.data.operate = 'update';
                                        me.doTerminatorPayConfigCUD(rec.data, function () {
                                            me.TerminatorPayConfigStoreReload();
                                            rec.commit();
                                            me.showMsg(productname + '的产品使用时间段更新成功');
                                        })

                                    },
                                    scope: this
                                },
                                'eventdelete': {
                                    fn: function (win, rec) {
                                        this.eventStore.remove(rec);
                                        this.showMsg(productname + '的产品使用时间段删除成功');
                                    },
                                    scope: this
                                },
                                'initdrag': {
                                    fn: function (vw) {
                                        if (this.editWin && this.editWin.isVisible()) {
                                            this.editWin.hide();
                                        }
                                    },
                                    scope: this
                                }
                            }
                        }
                    ]
                }
            ];
            this.callParent(arguments);
            me.OrdinaryDays = me.down('#OrdinaryDays');
            me.Usually = me.down('#Usually')
            me.WeeKend = me.down('#WeeKend');
            me.Calendar_Panel = me.down('#Calendar_Panel');
            me.configtype = me.down('#' + Ext4.Com.Other.calendar.src.data.EventMappings.configType.name);

        },


        saveCheckBoxValue: function (v, type, me, value) {
            var js = this;
            var fme = me;
            var textFiledNumber = "";
            if (value) {
                textFiledNumber = value;
            }
            if (type == 6 || type == 7 || type == 8 || type == 9 && !js.isBaseProduce) {
                if (textFiledNumber > js.smallTime) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '有效时间不得低于所有基础产品的最低值,最小值为' + js.smallTime,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
            }
            Ext.Ajax.request({
                url: './ProduceAction.ered?reqCode=saveUseCheckBox',
                params: {
//                    justyear: curdate.cur_year,//当前年份
                    priority: '\'1\',\'2\'',//优先级，周末和平日
                    productid: me.productid,
                    loginuserid: loginuserid,
                    userid: userid,
                    textFiledNumber: textFiledNumber,
                    checkBoxValue: v.value,
                    isBaseProduce: js.isBaseProduce,
                    type: type
                },
                success: function (response, opts) {
                    //产品名称
                    if (v.value) {
                        Ext.Msg.alert('提示', '数据保存成功');
                    }
                },
                failure: function (response, opts) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '获取数据异常。请联系相关工作人员',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
            });


        },

        // The edit popup window is not part of the CalendarPanel itself -- it is a separate component.
        // This makes it very easy to swap it out with a different type of window or custom view, or omit
        // it altogether. Because of this, it's up to the application code to tie the pieces together.
        // Note that this function is called from various event handlers in the CalendarPanel above.
        showEditWindow: function (rec, animateTarget) {
            var me = this;
            if (!this.editWin) {
                Ext.override(Ext4.Com.Other.calendar.src.form.EventWindow, {
                    constructor: function (config) {
                        var out_me = this;
                        var formPanelCfg = {
                            xtype: 'form',
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelAlign: 'right',
                                labelWidth: 65
                            },
                            frame: false,
                            bodyStyle: 'background:transparent;padding:5px 10px 10px;',
                            bodyBorder: false,
                            border: false,
                            items: [
                                {
                                    xtype: 'daterangefield',
                                    itemId: 'date-range',
                                    name: 'dates',
                                    anchor: '100%',
                                    fieldLabel: '消费时间段'
                                }
                            ]
                        };
                        if (config.calendarStore) {
                            this.calendarStore = config.calendarStore;
                            delete config.calendarStore;

                            formPanelCfg.items.push({
                                xtype: 'calendarpicker',
                                readOnly: false,
                                itemId: 'calendar',
                                name: Ext4.Com.Other.calendar.src.data.EventMappings.CalendarId.name,
                                anchor: '100%',
                                store: this.calendarStore
                            });
                        }
                        formPanelCfg.items.push({
                            xtype: 'textarea',
                            itemId: 'TextArea',
                            name: Ext4.Com.Other.calendar.src.data.EventMappings.TextArea.name,
                            anchor: '100%',
                            fieldLabel: '备注'
                        });
                        formPanelCfg.items.push({
                            xtype: 'textfield',
                            itemId: 'ProductId',
                            name: Ext4.Com.Other.calendar.src.data.EventMappings.ProductId.name,
                            anchor: '100%',
                            hidden: true
                        });
                        this.callParent([Ext.apply({
                                titleTextAdd: '添加',
                                titleTextEdit: '修改',
                                width: 600,
                                autocreate: true,
                                border: true,
                                closeAction: 'hide',
                                modal: true,
                                resizable: false,
                                buttonAlign: 'left',
                                savingMessage: '保存数据中...',
                                deletingMessage: '删除数据中...',
                                layout: 'fit',

//            defaultFocus: 'title',
                                onEsc: function (key, event) {
                                    event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                                    this.onCancel();
                                },

                                fbar: [/*{
                                 xtype: 'tbtext',
                                 text: '<a href="#" id="tblink">Edit Details...</a>'
                                 },*/
                                    '->',
                                    {
                                        itemId: 'delete-btn',
                                        text: '删除',
                                        disabled: false,
                                        handler: this.onDelete,
                                        scope: this,
                                        hideMode: 'offsets'
                                    },
                                    {
                                        text: '保存',
                                        disabled: false,
                                        handler: this.onSave,
                                        scope: this
                                    },
                                    {
                                        text: '取消',
                                        disabled: false,
                                        handler: this.onCancel,
                                        scope: this
                                    }],
                                items: formPanelCfg
                            },
                            config)]);
                    }
                })

                this.editWin = Ext.create('Ext4.Com.Other.calendar.src.form.EventWindow', {
                    calendarStore: this.calendarStore,
                    productid: me.productid,
                    listeners: {
                        'eventadd': {
                            fn: function (win, rec) {
                                //ajax请求保存数据
//                                this.eventStore.add(rec);
//                                this.eventStore.sync();
                                me.doTerminatorPayConfigCUD(rec.data, function (result) {
                                    win.hide();
                                    rec.data.IsNew = false;
                                    rec.data.EventId = result.EventId;
                                    rec.data.Title = result.EventId;
                                    me.eventStore.add(rec);
                                    me.eventStore.sync();
                                    me.TerminatorPayConfigStoreReload();
                                    me.showMsg(productname + '的产品使用时间段添加成功');

                                })

                            },
                            scope: this
                        },
                        'eventupdate': {
                            fn: function (win, rec) {
                                //ajax请求更新数据
                                me.doTerminatorPayConfigCUD(rec.data, function () {
                                    win.hide();
                                    me.eventStore.sync();
                                    me.showMsg(productname + '的产品使用时间段更新成功');
                                    me.TerminatorPayConfigStoreReload();
                                })

                            },
                            scope: this
                        },
                        'eventdelete': {
                            fn: function (win, rec) {
                                var me = this;
                                //ajax请求删除数据
                                Ext.Msg.confirm('请确认', '删除操作确认', function (btn, text) {
                                    if (btn == 'yes') {
                                        rec.data.operate = 'delete';
                                        me.doTerminatorPayConfigCUD(rec.data, function () {
                                            win.hide();
                                            me.eventStore.remove(rec);
                                            me.eventStore.sync();
                                            me.showMsg(productname + '的产品使用时间段删除成功');
                                            me.TerminatorPayConfigStoreReload();
                                        })

                                    }
                                });


                            },
                            scope: this
                        }/*,
                         'editdetails': {
                         fn: function(win, rec){
                         win.hide();
                         Ext.getCmp('app-calendar').showEditForm(rec);
                         }
                         }*/
                    }
                    ////////////////////////////////////////////////////////


                    ////////////////////////////////////////////////////////////
                });
            }
            this.editWin.show(rec, animateTarget);
        },

        // The CalendarPanel itself supports the standard Panel title config, but that title
        // only spans the calendar views.  For a title that spans the entire width of the app
        // we added a title to the layout's outer center region that is app-specific. This code
        // updates that outer title based on the currently-selected view range anytime the view changes.
        updateTitle: function (startDt, endDt) {
            var p = Ext.getCmp('app-center'),
                fmt = Ext.Date.format;

            if (Ext.Date.clearTime(startDt).getTime() == Ext.Date.clearTime(endDt).getTime()) {
                p.setTitle(fmt(startDt, 'F j, Y'));
            }
            else if (startDt.getFullYear() == endDt.getFullYear()) {
                if (startDt.getMonth() == endDt.getMonth()) {
                    p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'j, Y'));
                }
                else {
                    p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'F j, Y'));
                }
            }
            else {
                p.setTitle(fmt(startDt, 'F j, Y') + ' - ' + fmt(endDt, 'F j, Y'));
            }
        },

        // This is an application-specific way to communicate CalendarPanel event messages back to the user.
        // This could be replaced with a function to do "toast" style messages, growl messages, etc. This will
        // vary based on application requirements, which is why it's not baked into the CalendarPanel.
        showMsg: function (msg) {
            Ext.fly('app-msg').update(msg).removeCls('x-hidden');
        },
        clearMsg: function () {
            Ext.fly('app-msg').update('').addCls('x-hidden');
        },

        // OSX Lion introduced dynamic scrollbars that do not take up space in the
        // body. Since certain aspects of the layout are calculated and rely on
        // scrollbar width, we add a special class if needed so that we can apply
        // static style rules rather than recalculate sizes on each resize.
        checkScrollOffset: function () {
            var scrollbarWidth = Ext.getScrollbarSize ? Ext.getScrollbarSize().width : Ext.getScrollBarWidth();

            // We check for less than 3 because the Ext scrollbar measurement gets
            // slightly padded (not sure the reason), so it's never returned as 0.
            if (scrollbarWidth < 3) {
                Ext.getBody().addCls('x-no-scrollbar');
            }
            if (Ext.isWindows) {
                Ext.getBody().addCls('x-win');
            }
        },
        getPickerYear: function () {
            var picker = Ext.getCmp('app-calendar');
            var CurDate = new Date();
            var curSelectDate = {};
            if (picker) {
                CurDate = picker.startDateClone;
            }
            var lastInMonth = Ext.Date.getLastDateOfMonth(CurDate);
            var cur_year = CurDate.getFullYear();
            var cur_month = CurDate.getMonth() + 1;
            curSelectDate.cur_year = cur_year;
            curSelectDate.cur_month = cur_month;
            curSelectDate.lastInMonth = lastInMonth;
            return curSelectDate;
        },
//        saveProductForYear: function (rec, component, priority) {
//            var me = this;
//            me.doTerminatorPayConfigCUD({
//                operate: 'create',
//                priority: priority,//优先级，周末和平日
//                configtype:me.configtype.getValue(),
//                product_id: rec[0].get('product_id')
//            }, function () {
//                component.setValue(rec[0].get('product_name'));
////                me.TerminatorPayConfigStoreReload()
//            })
//        },
        getProductForYear: function (configtype) {
            if (!configtype) {
                configtype = 'PR01311'
            }
            var me = this;
            var curdate = me.getPickerYear();
            //ajax请求获取今年的平日票和周末票
            Ext.Ajax.request({
                url: './ProduceAction.ered?reqCode=getCheckBoxValue',
                params: {
//                    justyear: curdate.cur_year,//当前年份
                    configtype: configtype,//终端支付方式，yl表示银联
                    priority: '\'1\',\'2\'',//优先级，周末和平日
                    productid: me.productid,
                    loginuserid: loginuserid,
                    userid: userid
                },
                success: function (response, opts) {
                    //产品名称
                    var result = Ext.decode(response.responseText);
                    if (result.weekend) {
                        me.setCheckBoxValue(true, me.WeeKend);
                    } else {
                        me.setCheckBoxValue(false, me.WeeKend);
                    }
                    if (result.usually) {
                        me.setCheckBoxValue(true, me.Usually);
                    } else {
                        me.setCheckBoxValue(false, me.Usually);
                    }
                    if (result.ordinarydays) {
                        me.setCheckBoxValue(true, me.OrdinaryDays);
                    } else {
                        me.setCheckBoxValue(false, me.OrdinaryDays);
                    }
                    if (result.playTime) {
                        Ext.getCmp('ywsjyx').setValue(true);
                    } else {
                        Ext.getCmp('ywsjyx').setValue(false);
                    }

                    if (result.orderTime) {
                        Ext.getCmp('xdsjljsx').setValue(true);
                    } else {
                        Ext.getCmp('xdsjljsx').setValue(false);
                    }

                    if (result.effectiveBeforeTime) {
                        Ext.getCmp('sxsjyc').setValue(true);
                        Ext.getCmp('effectiveTime').checkForm = Ext.getCmp('sxsjyc');
                        Ext.getCmp('effectiveTime').show();
                        Ext.getCmp('effectiveTime').setValue(result.effectiveBeforeTime);
                    } else {
                        Ext.getCmp('sxsjyc').setValue(false);
                    }


                    switch (result.effectiveTime + "") {
                        case '7':
                            Ext.getCmp('Seven').setValue(true);
                            Ext.getCmp('Fifteen').setValue(false);
                            Ext.getCmp('zdy').setValue(false);
                            Ext.getCmp('forever').setValue(false);
                            break;
                        case '15':
                            Ext.getCmp('Seven').setValue(false);
                            Ext.getCmp('Fifteen').setValue(true);
                            Ext.getCmp('zdy').setValue(false);
                            Ext.getCmp('forever').setValue(false);
                            break;
                        case '9999':
                            Ext.getCmp('Seven').setValue(false);
                            Ext.getCmp('Fifteen').setValue(false);
                            Ext.getCmp('zdy').setValue(false);
                            Ext.getCmp('forever').setValue(true);
                            break;
                        default :
                            Ext.getCmp('Seven').setValue(false);
                            Ext.getCmp('Fifteen').setValue(false);
                            Ext.getCmp('zdy').setValue(true);
                            Ext.getCmp('forever').setValue(false);
                            Ext.getCmp('customTime').checkForm = Ext.getCmp('zdy');
                            Ext.getCmp('customTime').show();
                            Ext.getCmp('customTime').setValue(result.effectiveTime);
                            break;
                    }
                    me.first1 = true;
                    me.first2 = true;
                    me.first3 = true;
                    me.first4 = true;
                    me.first5 = true;
                    me.first6 = true;
                    me.first7 = true;
                    me.first8 = true;
                    me.first9 = true;
                    me.first10 = true;
//                    me.setWeekendAndOrdinaryDays(result, 1);
//                    me.setWeekendAndOrdinaryDays(result, 2);

                },
                failure: function (response, opts) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '获取数据异常。请联系相关工作人员',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
            });
        },
        //view改变时触发，即“天、周、月”切换时触发
        appnavPickerChange: function (activeDate) {
            var me = this;
            var appnavPickerChange = Ext.getCmp('app-nav-picker');
            if (activeDate) {
                appnavPickerChange.setValue(activeDate);
            }
        },

        AllDataReload: function (backfun) {
            var me = this;
            //如果年份改变了ajax请求获取今年的平日票和周末票
            me.getProductForYear();
            //重新加载自定义列表的数据
//            me.TerminatorPayConfigStoreReload({justyear:me.getPickerYear().cur_year});
            me.getEventStore(backfun);
        },
        TerminatorPayConfigStoreReload: function (newParams) {
            var ProduceSimpleRuleStoreIDStore = Ext.StoreManager.lookup('ProduceSimpleRuleStoreID');
            if (newParams) {
                Ext.apply(ProduceSimpleRuleStoreIDStore.proxy.extraParams, newParams);
            }
            ProduceSimpleRuleStoreIDStore.reload();

        },
        setCheckBoxValue: function (value, checkBox) {
            checkBox.setValue(value);

        },
        setWeekendAndOrdinaryDays: function (record, priority) {
            var me = this;
            var component;
            if (priority == 1) {
                component = me.OrdinaryDays;
            } else if (priority == 2) {
                component = me.WeeKend;
            }
            if (Ext.isEmpty(record)) {
                component.setValue('');
                return;
            }
            var hasData = false;
            for (var i = 0; i < record.length; i++) {
                var rec = record[i];
                if (rec.priority == priority) {
                    hasData = true;
                    component.setValue(rec.product_name);
                    return;
                }

            }
            if (!hasData) {
                component.setValue('');
            }


        },
        doTerminatorPayConfigCUD: function (params, backfun) {
            var me = this;
            Ext.apply(params, {
                cur_year: me.getPickerYear().cur_year,//当前年份
                productid: me.productid, loginuserid: loginuserid, userid: userid
            })
            var msgTip = Ext.MessageBox.show({
                closable: false,
                title: '提示',
                width: 250,
                msg: '数据处理中,请稍后......'
            });
            //请求ajax,参数 product_id ,cur_year
            Ext.Ajax.request({
                url: './ProduceAction.ered?reqCode=saveProductSimpleRule',
                params: params,
                success: function (response, opts) {
                    //产品名称
                    var result = Ext.decode(response.responseText);
                    msgTip.hide();
                    if (result.error) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: result.error,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    } else {
                        Ext.Msg.alert('提示', result.success);
                        if (backfun) {
                            backfun(result);
                        }
                    }

                },
                failure: function (response, opts) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '保存产品使用时间段失败。请联系相关工作人员',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
            });

        },
        getEventStore: function (backfun) {
            var me = this;
            var data_ = me.getPickerYear();
            Ext4.Com.Other.calendar.src.data.ProductRuleEvents.getData(me.productid, data_.cur_year, data_.cur_month, data_.lastInMonth, function (o) {
                me.eventStore = Ext.create('Ext4.Com.Other.calendar.src.data.MemoryEventStore', {
                    data: o
                });
                if (backfun) {
                    var activeItem = me.Calendar_Panel.getActiveView();
                    activeItem.setStore(me.eventStore);
                    me.Calendar_Panel.resetAllStore();
                    if (typeof backfun === 'function') {
                        backfun.call(me.Calendar_Panel);
                    }
                    activeItem.refresh();
                }
            });

        }
    },
    function () {
        /*
         * A few Ext overrides needed to work around issues in the calendar
         */

        Ext.form.Basic.override({
            reset: function () {
                var me = this;
                // This causes field events to be ignored. This is a problem for the
                // DateTimeField since it relies on handling the all-day checkbox state
                // changes to refresh its layout. In general, this batching is really not
                // needed -- it was an artifact of pre-4.0 performance issues and can be removed.
                //me.batchLayouts(function() {
                me.getFields().each(function (f) {
                    f.reset();
                });
                //});
                return me;
            }
        });

        // Currently MemoryProxy really only functions for read-only data. Since we want
        // to simulate CRUD transactions we have to at the very least allow them to be
        // marked as completed and successful, otherwise they will never filter back to the
        // UI components correctly.
        Ext.data.MemoryProxy.override({
            updateOperation: function (operation, callback, scope) {
                operation.setCompleted();
                operation.setSuccessful();
                Ext.callback(callback, scope || this, [operation]);
            },
            create: function () {
                this.updateOperation.apply(this, arguments);
            },
            update: function () {
                this.updateOperation.apply(this, arguments);
            },
            destroy: function () {
                this.updateOperation.apply(this, arguments);
            }
        });
    });