/**
 * @class Ext4.Com.Other.calendar.src.form.EventWindow
 * @extends Ext.Window
 * <p>A custom window containing a basic edit form used for quick editing of events.</p>
 * <p>This window also provides custom events specific to the calendar so that other calendar components can be easily
 * notified when an event has been edited via this component.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext4.Com.Other.calendar.src.form.EventWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventeditwindow',
    resource_id: '',
    requires: [
        'Ext.form.Panel',
        'Ext4.Com.Other.calendar.src.util.Date',
        'Ext4.Com.Other.calendar.src.data.EventModel',
        'Ext4.Com.Other.calendar.src.data.EventMappings'
    ],

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
                    itemId: 'title',
                    name: Ext4.Com.Other.calendar.src.data.EventMappings.Title.name,
                    fieldLabel: '产品名称',
                    readOnly: true,
                    xtype: 'textfield',
                    allowBlank: false,
                    emptyText: '点击选择产品',
                    listeners: {
                        'focus': function () {
                            var me = this;
                            new Ext4.PM.Other.ChoiceProduceWin({
                                canMultiChoice: false,
                                resource_id: out_me.resource_id,
                                isBaseProduce: true,
                                product_type: '\'PR00101\',\'PR00102\'',
                                backFunctionForChoice: function (rec) {
                                    //请求ajax,参数 product_id ,cur_year
                                    me.setValue(rec[0].get('product_name'));
                                    out_me.ProductId.setValue(rec[0].get('product_id'))
                                    this.close();
                                }

                            }).show()

                        }
                    },
                    anchor: '100%'
                },
                new Ext.form.field.ComboBox({
                    name: Ext4.Com.Other.calendar.src.data.EventMappings.configType.name,
                    hiddenName: Ext4.Com.Other.calendar.src.data.EventMappings.configType.name,
                    store: PR009Store,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'value', allowBlank: false,
                    displayField: 'text',
                    fieldLabel: '支付类型',
                    emptyText: '请选择...',
                    forceSelection: true,
                    lastQuery: '',
                    editable: false,
                    anchor: "100%"
                }),
                {
                    xtype: 'daterangefield',
                    itemId: 'date-range',
                    name: 'dates',
                    anchor: '100%',
                    fieldLabel: '时间'
                }
            ]
        };

        if (config.calendarStore) {
            this.calendarStore = config.calendarStore;
            delete config.calendarStore;

            formPanelCfg.items.push({
                xtype: 'calendarpicker',
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
    },

    // private
    newId: 10000,

    // private
    initComponent: function () {
        this.callParent();

        this.formPanel = this.items.items[0];

        this.addEvents({
            /**
             * @event eventadd
             * Fires after a new event is added
             * @param {Ext4.Com.Other.calendar.src.form.EventWindow} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was added
             */
            eventadd: true,
            /**
             * @event eventupdate
             * Fires after an existing event is updated
             * @param {Ext4.Com.Other.calendar.src.form.EventWindow} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was updated
             */
            eventupdate: true,
            /**
             * @event eventdelete
             * Fires after an event is deleted
             * @param {Ext4.Com.Other.calendar.src.form.EventWindow} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was deleted
             */
            eventdelete: true,
            /**
             * @event eventcancel
             * Fires after an event add/edit operation is canceled by the user and no store update took place
             * @param {Ext4.Com.Other.calendar.src.form.EventWindow} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was canceled
             */
            eventcancel: true//,
            /**
             * @event editdetails
             * Fires when the user selects the option in this window to continue editing in the detailed edit form
             * (by default, an instance of {@link Ext4.Com.Other.calendar.src.EventEditForm}. Handling code should hide this window
             * and transfer the current event record to the appropriate instance of the detailed form by showing it
             * and calling {@link Ext4.Com.Other.calendar.src.EventEditForm#loadRecord loadRecord}.
             * @param {Ext4.Com.Other.calendar.src.form.EventWindow} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The {@link Ext4.Com.Other.calendar.src.EventRecord record} that is currently being edited
             */
//            editdetails: true
        });
    },

    // private
    afterRender: function () {
        this.callParent();

        this.el.addCls('ext-cal-event-win');

//        Ext.get('tblink').on('click', this.onEditDetailsClick, this);

        this.titleField = this.down('#title');
        this.dateRangeField = this.down('#date-range');
        this.calendarField = this.down('#calendar');
        this.deleteButton = this.down('#delete-btn');
        this.ProductId = this.down('#ProductId');

    },

//    // private
//    onEditDetailsClick: function(e){
//        e.stopEvent();
//        this.updateRecord(this.activeRecord, true);
//        this.fireEvent('editdetails', this, this.activeRecord, this.animateTarget);
//    },

    /**
     * Shows the window, rendering it first if necessary, or activates it and brings it to front if hidden.
     * @param {Ext.data.Record/Object} o Either a {@link Ext.data.Record} if showing the form
     * for an existing event in edit mode, or a plain object containing a StartDate property (and
     * optionally an EndDate property) for showing the form in add mode.
     * @param {String/Element} animateTarget (optional) The target element or id from which the window should
     * animate while opening (defaults to null with no animation)
     * @return {Ext.Window} this
     */
    show: function (o, animateTarget) {
        // Work around the CSS day cell height hack needed for initial render in IE8/strict:
        var me = this,
            anim = (Ext.isIE8 && Ext.isStrict) ? null : animateTarget,
            M = Ext4.Com.Other.calendar.src.data.EventMappings;
        this.callParent([anim/*, function(){
         me.titleField.focus(true);
         }*/]);

        this.deleteButton[o.data && o.data[M.EventId.name] ? 'show' : 'hide']();

        var rec,
            f = this.formPanel.form;
        if (o.data) {
            rec = o;
            this.hideEndDate(f, rec.data.CalendarId);
            this.setTitle(rec.phantom ? this.titleTextAdd : this.titleTextEdit);
            rec.data.operate = 'update';
            f.loadRecord(rec);
        }
        else {
            this.setTitle(this.titleTextAdd);

            var start = o[M.StartDate.name],
                end = o[M.EndDate.name] || Ext4.Com.Other.calendar.src.util.Date.add(start, {hours: 1}),
                priority = o[M.CalendarId.name];
            this.hideEndDate(f, priority);
            rec = Ext.create('Ext4.Com.Other.calendar.src.data.EventModel');
            rec.data[M.StartDate.name] = start;
            rec.data[M.EndDate.name] = end;
            rec.data[M.CalendarId.name] = priority;
            rec.data[M.IsAllDay.name] = !!o[M.IsAllDay.name] || start.getDate() != Ext4.Com.Other.calendar.src.util.Date.add(end, {millis: 1}).getDate();
            rec.data.operate = 'create';
            f.reset();
            f.loadRecord(rec);
        }

        if (this.calendarStore) {
            this.calendarField.setValue(rec.data[M.CalendarId.name]);
        }
        this.dateRangeField.setValue(rec.data);
        this.activeRecord = rec;

        return this;
    },
    hideEndDate: function (f, priority) {
        var daterange = this.down('#date-range');
        var endDate = daterange.down('#' + daterange.id + '-end-date');
        var startDate = daterange.down('#' + daterange.id + '-start-date');
        if (priority == 4) {
            startDate.setReadOnly(true);
            endDate.setReadOnly(true);
        } else {
            startDate.setReadOnly(false);
            endDate.setReadOnly(false);
        }

    },
    // private
    roundTime: function (dt, incr) {
        incr = incr || 15;
        var m = parseInt(dt.getMinutes(), 10);
        return dt.add('mi', incr - (m % incr));
    },

    // private
    onCancel: function () {
        this.cleanup(true);
        this.fireEvent('eventcancel', this);
    },

    // private
    cleanup: function (hide) {
        if (this.activeRecord && this.activeRecord.dirty) {
            this.activeRecord.reject();
        }
        delete this.activeRecord;

        if (hide === true) {
            // Work around the CSS day cell height hack needed for initial render in IE8/strict:
            //var anim = afterDelete || (Ext.isIE8 && Ext.isStrict) ? null : this.animateTarget;
            this.hide();
        }
    },

    // private
    updateRecord: function (record, keepEditing) {
        var fields = record.fields,
            values = this.formPanel.getForm().getValues(),
            name,
            M = Ext4.Com.Other.calendar.src.data.EventMappings,
            obj = {};

        fields.each(function (f) {
            name = f.name;
            if (name in values) {
                obj[name] = values[name];
            }
        });

        var dates = this.dateRangeField.getValue();
        obj[M.StartDate.name] = dates[0];
        obj[M.EndDate.name] = dates[1];
        obj[M.IsAllDay.name] = dates[2];

        record.beginEdit();
        record.set(obj);

        if (!keepEditing) {
            record.endEdit();
        }

        return this;
    },

    // private
    onSave: function () {
        var f = this.formPanel.form;
        if (!f.isValid()) {
            return;
        }
        if (!this.updateRecord(this.activeRecord)) {
            this.onCancel();
            return;
        }
        Ext.apply(this.activeRecord.data, f.getValues())
        this.fireEvent(this.activeRecord.phantom ? 'eventadd' : 'eventupdate', this, this.activeRecord, this.animateTarget);

        // Clear phantom and modified states.
        this.activeRecord.commit();
    },

    // private
    onDelete: function () {
        var f = this.formPanel.form;
        this.fireEvent('eventdelete', this, this.activeRecord, this.animateTarget);
    }
});