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
Ext.define('Ext4.Com.Other.calendar.src.App', {
        extend: 'Ext.Viewport',
        requires: [
            'Ext4.PM.Other.ChoiceProduceWin',
            'Ext.layout.container.Border',
            'Ext.picker.Date',
            'Ext4.Com.Other.calendar.src.util.Date',
            'Ext4.Com.Other.calendar.src.CalendarPanel',
            'Ext4.Com.Other.calendar.src.data.MemoryCalendarStore',
            'Ext4.Com.Other.calendar.src.data.MemoryEventStore',
            'Ext4.Com.Other.calendar.src.data.Events',
            'Ext4.Com.Other.calendar.src.data.Calendars',
            'Ext4.Com.Other.calendar.src.form.EventWindow',
            'Ext4.PM.GridPanel.TerminatorPayConfigGridPanel'
        ],
        resource_id: '',
        weekdays: '',
        holidays: '',
        layout: 'border',
        renderTo: 'calendar-ct',
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
                data: Ext4.Com.Other.calendar.src.data.Calendars.getData()
            });
            me.getEventStore();
            var WeeKend = new Ext.form.TextField({
                anchor: '100%',
                itemId: 'WeeKend',
                emptyText: '请设置今年节假日票',
                fieldLabel: '节假日票'
            });
            var OrdinaryDays = new Ext.form.TextField({
                emptyText: '请设置今年平日票',
                anchor: '100%',
                itemId: 'OrdinaryDays',
                fieldLabel: '平日票'
            })
//            me.closable = true;
//            me.title = '终端支付产品配置';
//            me.closeAction = 'destroy';
//            me.maximized = true;

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
                                    columnWidth: 0.68,
                                    height: 205,
                                    xtype: 'form',
                                    titleAlign: 'left',
                                    fieldDefaults: {
                                        labelWidth: 60,
                                        labelAlign: 'right',
                                        readOnly: true
                                    },
                                    title: '平日与节假日票',
                                    items: [
                                        {
                                            layout: 'column', border: false, items: [
                                            {
                                                xtype: 'form', border: false, columnWidth: 0.9, items: [
                                                OrdinaryDays
                                            ]
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'acceptIcon',
                                                text: '选择产品',
                                                handler: function () {
                                                    new Ext4.PM.Other.ChoiceProduceWin({
                                                        canMultiChoice: false,
                                                        resource_id: me.resource_id,
                                                        isBaseProduce: true,
                                                        product_type: '\'PR00101\',\'PR00102\'',
                                                        backFunctionForChoice: function (rec) {
                                                            me.saveProductForYear(rec, OrdinaryDays, '1');
                                                            this.close()
                                                        }

                                                    }).show()
                                                }
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'acceptIcon',
                                                text: '删除产品',
                                                handler: function () {
                                                    me.deleteUseProduct(me.weekdays, 1);
//                                                    new Ext4.PM.Other.ChoiceProduceWin({
//                                                        canMultiChoice: false,
//                                                        resource_id:me.resource_id,
//                                                        isBaseProduce: true,
//                                                        product_type: '\'PR00101\',\'PR00102\'',
//                                                        backFunctionForChoice: function (rec) {
//                                                            me.saveProductForYear(rec, OrdinaryDays, '1');
//                                                            this.close()
//                                                        }
//
//                                                    }).show()
                                                }
                                            }

                                        ]
                                        },
                                        {
                                            layout: 'column', xtype: 'panel', border: false, items: [
                                            {
                                                xtype: 'form', border: false, columnWidth: 0.9, items: [
                                                WeeKend
                                            ]
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'acceptIcon',
                                                text: '选择产品',
                                                handler: function () {
                                                    new Ext4.PM.Other.ChoiceProduceWin({
                                                        canMultiChoice: false,
                                                        resource_id: me.resource_id,
                                                        isBaseProduce: true,
                                                        product_type: '\'PR00101\',\'PR00102\'',
                                                        backFunctionForChoice: function (rec) {
                                                            me.saveProductForYear(rec, WeeKend, '2');
                                                            this.close()
                                                        }

                                                    }).show()
                                                }
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'acceptIcon',
                                                text: '删除产品',
                                                handler: function () {
                                                    me.deleteUseProduct(me.holidays, 2);
//                                                    new Ext4.PM.Other.ChoiceProduceWin({
//                                                        canMultiChoice: false,
//                                                        resource_id:me.resource_id,
//                                                        isBaseProduce: true,
//                                                        product_type: '\'PR00101\',\'PR00102\'',
//                                                        backFunctionForChoice: function (rec) {
//                                                            me.saveProductForYear(rec, OrdinaryDays, '1');
//                                                            this.close()
//                                                        }
//
//                                                    }).show()
                                                }
                                            }

                                        ]
                                        },
                                        new Ext.form.field.ComboBox({
                                            name: Ext4.Com.Other.calendar.src.data.EventMappings.configType.name,
                                            hiddenName: Ext4.Com.Other.calendar.src.data.EventMappings.configType.name,
                                            store: PR009Store,
                                            itemId: Ext4.Com.Other.calendar.src.data.EventMappings.configType.name,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'value',
                                            displayField: 'text',
                                            fieldLabel: '支付类型',
                                            emptyText: '请选择...',
                                            forceSelection: true,
                                            lastQuery: '',
                                            value: 'PR00901',
                                            editable: false,
                                            readOnly: false,
                                            anchor: "92%",
                                            listeners: {
                                                'change': function (combobox, newValue, oldValue, eOpts) {
                                                    me.getProductForYear(newValue)
                                                }
                                            }
                                        })

                                    ],
                                    anchor: '100%'
                                }
                                ,
                                Ext.create('Ext4.PM.GridPanel.TerminatorPayConfigGridPanel',
                                    {
                                        columnWidth: 1,
                                        title: '自定义支付产品列表',
                                        priority: '4',
                                        height: document.body.clientHeight * 0.5,
                                        resource_id: me.resource_id,
                                        loginuserid: loginuserid,
                                        storeId: 'TerminatorPayConfigStoreID'
                                    })
                            ]
                        },
                        {
                            xtype: 'calendarpanel',
                            resource_id: me.resource_id,
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
                                        this.showMsg('终端支付产品：' + rec.data.Title + ' 添加成功');
                                    },
                                    scope: this
                                },
                                'eventupdate': {
                                    fn: function (cp, rec) {
                                        this.showMsg('终端支付产品：' + rec.data.Title + ' 更新成功');
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
                                            priority: 4
                                        }, el);
                                        this.clearMsg();
                                    },
                                    scope: this
                                },
                                'rangeselect': {
                                    fn: function (win, dates, onComplete) {
                                        dates.priority = 3;
                                        this.showEditWindow(dates);
                                        this.editWin.on('hide', onComplete, this, {single: true});
                                        this.clearMsg();
                                    },
                                    scope: this
                                },
                                'eventmove': {
                                    fn: function (vw, rec) {
                                        var mappings = Ext4.Com.Other.calendar.src.data.EventMappings,
                                            time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';
                                        rec.data.operate = 'update';
                                        me.doTerminatorPayConfigCUD(rec.data, function () {
                                            me.TerminatorPayConfigStoreReload();
                                            rec.commit();
                                            me.showMsg('终端支付产品：' + rec.data[mappings.Title.name] + ' 成功移动到 ' +
                                            Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS' + time)));

                                        })
                                    },
                                    scope: this
                                },
                                'eventresize': {
                                    fn: function (vw, rec) {
                                        rec.data.operate = 'update';
                                        me.doTerminatorPayConfigCUD(rec.data, function () {
                                            me.TerminatorPayConfigStoreReload();
                                            rec.commit();
                                            me.showMsg('终端支付产品：' + rec.data.Title + ' 更新成功');
                                        })

                                    },
                                    scope: this
                                },
                                'eventdelete': {
                                    fn: function (win, rec) {
                                        this.eventStore.remove(rec);
                                        this.showMsg('终端支付产品：' + rec.data.Title + ' 删除成功');
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
            /*
             me.listeners = {
             'afterrender': function () {
             me.AllDataReload(true);
             }

             }*/
            this.callParent(arguments);
            me.OrdinaryDays = me.down('#OrdinaryDays');
            me.WeeKend = me.down('#WeeKend');
            me.Calendar_Panel = me.down('#Calendar_Panel');
            me.configtype = me.down('#' + Ext4.Com.Other.calendar.src.data.EventMappings.configType.name);
        },

        // The edit popup window is not part of the CalendarPanel itself -- it is a separate component.
        // This makes it very easy to swap it out with a different type of window or custom view, or omit
        // it altogether. Because of this, it's up to the application code to tie the pieces together.
        // Note that this function is called from various event handlers in the CalendarPanel above.
        showEditWindow: function (rec, animateTarget) {
            var me = this;
            if (!this.editWin) {
                this.editWin = Ext.create('Ext4.Com.Other.calendar.src.form.EventWindow', {
                    calendarStore: this.calendarStore,
                    resource_id: me.resource_id,
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
                                    me.eventStore.add(rec);
                                    me.eventStore.sync();
                                    me.TerminatorPayConfigStoreReload();
                                    me.showMsg('终端支付产品：' + rec.data.Title + ' 添加成功');

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
                                    me.showMsg('终端支付产品：' + rec.data.Title + ' 更新成功');
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
                                            me.showMsg('终端支付产品：' + rec.data.Title + ' 删除成功');
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
        saveProductForYear: function (rec, component, priority) {
            var me = this;
            if (priority == 2) {//周末
                me.holidays = rec[0].get('product_id');
                me.prioritys = priority;
            } else if (priority == 1) {//平日
                me.weekdays = rec[0].get('product_id');
                me.prioritys = priority;
            }
            me.doTerminatorPayConfigCUD({
                operate: 'create',
                priority: priority,//优先级，周末和平日
                configtype: me.configtype.getValue(),
                product_id: rec[0].get('product_id')
            }, function () {
                component.setValue(rec[0].get('product_name'));
//                me.TerminatorPayConfigStoreReload()
            })
        },

        deleteUseProduct: function (productId, priority) {
            if (Ext.isEmpty(productId)) {
                Ext.Msg.alert("提示", "无配置产品无法进行删除动作");
                return;
            }
            var me = this;
            //ajax请求获取今年的平日票和周末票
            Ext.Ajax.request({
                url: './TerminatorPayConfigAction.ered?reqCode=deleteUseProduct',
                params: {
//                    justyear: curdate.cur_year,//当前年份
                    priority: priority,//优先级，周末和平日
                    productId: productId,
                    resource_id: me.resource_id,
                    loginuserid: loginuserid,
                    userid: userid
                },
                success: function (response, opts) {
                    //产品名称
                    if (priority == 1) {
                        me.OrdinaryDays.setValue('');
                        me.weekdays = "";
                    } else if (priority == 2) {
                        me.WeeKend.setValue('');
                        me.holidays = "";
                    }
                    Ext.Msg.alert("提示", "删除成功");

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
        getProductForYear: function (configtype) {
            if (!configtype) {
                configtype = 'PR00901'
            }
            var me = this;
            var curdate = me.getPickerYear();
            //ajax请求获取今年的平日票和周末票
            Ext.Ajax.request({
                url: './TerminatorPayConfigAction.ered?reqCode=ListTerminatorPayConfig',
                params: {
//                    justyear: curdate.cur_year,//当前年份
                    configtype: configtype,//终端支付方式，yl表示银联
                    priority: '\'1\',\'2\'',//优先级，周末和平日
                    resource_id: me.resource_id,
                    loginuserid: loginuserid,
                    userid: userid
                },
                success: function (response, opts) {
                    //产品名称
                    var result = Ext.decode(response.responseText);
                    me.setWeekendAndOrdinaryDays(result, 1);
                    me.setWeekendAndOrdinaryDays(result, 2);

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
            me.TerminatorPayConfigStoreReload({justyear: me.getPickerYear().cur_year});
            me.getEventStore(backfun);
        },
        TerminatorPayConfigStoreReload: function (newParams) {
            var TerminatorPayConfigStore = Ext.StoreManager.lookup('TerminatorPayConfigStoreID');
            if (newParams) {
                Ext.apply(TerminatorPayConfigStore.proxy.extraParams, newParams);
            }
            TerminatorPayConfigStore.reload();

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
                    if (priority == 2) {//周末
                        me.holidays = rec.product_id;
                    } else if (priority == 1) {//平日
                        me.weekdays = rec.product_id;
                    }
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
                resource_id: me.resource_id, loginuserid: loginuserid, userid: userid
            })
            var msgTip = Ext.MessageBox.show({
                closable: false,
                title: '提示',
                width: 250,
                msg: '数据处理中,请稍后......'
            });
            //请求ajax,参数 product_id ,cur_year
            Ext.Ajax.request({
                url: './TerminatorPayConfigAction.ered?reqCode=doTerminatorPayConfigCUD',
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
                        msg: '保存终端支付产品失败。请联系相关工作人员',
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
            Ext4.Com.Other.calendar.src.data.Events.getData(me.resource_id, data_.cur_year, data_.cur_month, data_.lastInMonth, function (o) {
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