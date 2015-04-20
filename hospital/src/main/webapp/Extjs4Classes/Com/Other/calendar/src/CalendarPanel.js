/**
 * @class Ext4.Com.Other.calendar.src.CalendarPanel
 * @extends Ext.Panel
 * <p>This is the default container for Ext calendar views. It supports day, week and month views as well
 * as a built-in event edit form. The only requirement for displaying a calendar is passing in a valid
 * {@link #calendarStore} config containing records of type {@link Ext4.Com.Other.calendar.src.EventRecord EventRecord}. In order
 * to make the calendar interactive (enable editing, drag/drop, etc.) you can handle any of the various
 * events fired by the underlying views and exposed through the CalendarPanel.</p>
 * {@link #layoutConfig} option if needed.</p>
 * @constructor
 * @param {Object} config The config object
 * @xtype calendarpanel
 */
Ext.define('Ext4.Com.Other.calendar.src.CalendarPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.calendarpanel',

    requires: [
        'Ext.layout.container.Card',
        'Ext4.Com.Other.calendar.src.view.Day',
        'Ext4.Com.Other.calendar.src.view.Week',
        'Ext4.Com.Other.calendar.src.view.Month',
        'Ext4.Com.Other.calendar.src.form.EventDetails',
        'Ext4.Com.Other.calendar.src.data.EventMappings'
    ],

    /**
     * @cfg {Boolean} showDayView
     * True to include the day view (and toolbar button), false to hide them (defaults to true).
     */
    showDayView: true,
    /**
     * @cfg {Boolean} showWeekView
     * True to include the week view (and toolbar button), false to hide them (defaults to true).
     */
    showWeekView: true,
    /**
     * @cfg {Boolean} showMonthView
     * True to include the month view (and toolbar button), false to hide them (defaults to true).
     * If the day and week views are both hidden, the month view will show by default even if
     * this config is false.
     */
    showMonthView: true,
    /**
     * @cfg {Boolean} showNavBar
     * True to display the calendar navigation toolbar, false to hide it (defaults to true). Note that
     * if you hide the default navigation toolbar you'll have to provide an alternate means of navigating the calendar.
     */
    showNavBar: true,
    /**
     * @cfg {String} todayText
     * Alternate text to use for the 'Today' nav bar button.
     */
    todayText: 'Today',
    /**
     * @cfg {Boolean} showTodayText
     * True to show the value of {@link #todayText} instead of today's date in the calendar's current day box,
     * false to display the day number(defaults to true).
     */
    showTodayText: true,
    /**
     * @cfg {Boolean} showTime
     * True to display the current time next to the date in the calendar's current day box, false to not show it
     * (defaults to true).
     */
    showTime: true,
    /**
     * @cfg {String} dayText
     * Alternate text to use for the 'Day' nav bar button.
     */
    dayText: 'Day',
    /**
     * @cfg {String} weekText
     * Alternate text to use for the 'Week' nav bar button.
     */
    weekText: 'Week',
    /**
     * @cfg {String} monthText
     * Alternate text to use for the 'Month' nav bar button.
     */
    monthText: 'Month',

    // private
    layoutConfig: {
        layoutOnCardChange: true,
        deferredRender: true
    },
    wk: '',
    month: '',
    day: '',
    // private property
    startDate: new Date(),
    startDateClone: new Date(),
    App: '',
    // private
    initComponent: function () {
        this.tbar = {
            cls: 'ext-cal-toolbar',
            border: true,
            items: ['->', {
                id: this.id + '-tb-prev',
                handler: this.onPrevClick,
                scope: this,
                iconCls: 'x-tbar-page-prev'
            }]
        };

        this.viewCount = 0;

        if (this.showDayView) {
            this.tbar.items.push({
                id: this.id + '-tb-day',
                text: this.dayText,
                handler: this.onDayClick,
                scope: this,
                toggleGroup: 'tb-views'
            });
            this.viewCount++;
        }
        if (this.showWeekView) {
            this.tbar.items.push({
                id: this.id + '-tb-week',
                text: this.weekText,
                handler: this.onWeekClick,
                scope: this,
                toggleGroup: 'tb-views'
            });
            this.viewCount++;
        }
        if (this.showMonthView || this.viewCount == 0) {
            this.tbar.items.push({
                id: this.id + '-tb-month',
                text: this.monthText,
                handler: this.onMonthClick,
                scope: this,
                toggleGroup: 'tb-views'
            });
            this.viewCount++;
            this.showMonthView = true;
        }
        this.tbar.items.push({
            id: this.id + '-tb-next',
            handler: this.onNextClick,
            scope: this,
            iconCls: 'x-tbar-page-next'
        });
        this.tbar.items.push('->');

        var idx = this.viewCount - 1;
        this.activeItem = this.activeItem === undefined ? idx : (this.activeItem > idx ? idx : this.activeItem);

        if (this.showNavBar === false) {
            delete this.tbar;
            this.addCls('x-calendar-nonav');
        }

        this.callParent();

        this.addEvents({
            /**
             * @event eventadd
             * Fires after a new event is added to the underlying store
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was added
             */
            eventadd: true,
            /**
             * @event eventupdate
             * Fires after an existing event is updated
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was updated
             */
            eventupdate: true,
            /**
             * @event eventdelete
             * Fires after an event is removed from the underlying store
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was removed
             */
            eventdelete: true,
            /**
             * @event eventcancel
             * Fires after an event add/edit operation is canceled by the user and no store update took place
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The new {@link Ext4.Com.Other.calendar.src.EventRecord record} that was canceled
             */
            eventcancel: true,
            /**
             * @event viewchange
             * Fires after a different calendar view is activated (but not when the event edit form is activated)
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext.Ext4.Com.Other.calendar.src.view.AbstractCalendar} view The view being activated (any valid {@link Ext4.Com.Other.calendar.src.view.AbstractCalendar AbstractCalendar} subclass)
             * @param {Object} info Extra information about the newly activated view. This is a plain object
             * with following properties:<div class="mdetail-params"><ul>
             * <li><b><code>activeDate</code></b> : <div class="sub-desc">The currently-selected date</div></li>
             * <li><b><code>viewStart</code></b> : <div class="sub-desc">The first date in the new view range</div></li>
             * <li><b><code>viewEnd</code></b> : <div class="sub-desc">The last date in the new view range</div></li>
             * </ul></div>
             */
            viewchange: true

            //
            // NOTE: CalendarPanel also relays the following events from contained views as if they originated from this:
            //
            /**
             * @event eventsrendered
             * Fires after events are finished rendering in the view
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             */
            /**
             * @event eventclick
             * Fires after the user clicks on an event element
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The {@link Ext4.Com.Other.calendar.src.EventRecord record} for the event that was clicked on
             * @param {HTMLNode} el The DOM node that was clicked on
             */
            /**
             * @event eventover
             * Fires anytime the mouse is over an event element
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The {@link Ext4.Com.Other.calendar.src.EventRecord record} for the event that the cursor is over
             * @param {HTMLNode} el The DOM node that is being moused over
             */
            /**
             * @event eventout
             * Fires anytime the mouse exits an event element
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The {@link Ext4.Com.Other.calendar.src.EventRecord record} for the event that the cursor exited
             * @param {HTMLNode} el The DOM node that was exited
             */
            /**
             * @event datechange
             * Fires after the start date of the view changes
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Date} startDate The start date of the view (as explained in {@link #getStartDate}
             * @param {Date} viewStart The first displayed date in the view
             * @param {Date} viewEnd The last displayed date in the view
             */
            /**
             * @event rangeselect
             * Fires after the user drags on the calendar to select a range of dates/times in which to create an event
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Object} dates An object containing the start (StartDate property) and end (EndDate property) dates selected
             * @param {Function} callback A callback function that MUST be called after the event handling is complete so that
             * the view is properly cleaned up (shim elements are persisted in the view while the user is prompted to handle the
             * range selection). The callback is already created in the proper scope, so it simply needs to be executed as a standard
             * function call (e.g., callback()).
             */
            /**
             * @event eventmove
             * Fires after an event element is dragged by the user and dropped in a new position
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The {@link Ext4.Com.Other.calendar.src.EventRecord record} for the event that was moved with
             * updated start and end dates
             */
            /**
             * @event initdrag
             * Fires when a drag operation is initiated in the view
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             */
            /**
             * @event eventresize
             * Fires after the user drags the resize handle of an event to resize it
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Ext4.Com.Other.calendar.src.EventRecord} rec The {@link Ext4.Com.Other.calendar.src.EventRecord record} for the event that was resized
             * containing the updated start and end dates
             */
            /**
             * @event dayclick
             * Fires after the user clicks within a day/week view container and not on an event element
             * @param {Ext4.Com.Other.calendar.src.CalendarPanel} this
             * @param {Date} dt The date/time that was clicked on
             * @param {Boolean} allday True if the day clicked on represents an all-day box, else false.
             * @param {Ext.core.Element} el The Element that was clicked on
             */
        });

        this.layout = 'card';
        // do not allow override
        if (this.showDayView) {
            var day = Ext.apply({
                    xtype: 'dayview',
                    title: this.dayText,
                    showToday: this.showToday,
                    showTodayText: this.showTodayText,
                    showTime: this.showTime
                },
                this.dayViewCfg);

            day.id = this.id + '-day';
            day.store = day.store || this.eventStore;
            this.initEventRelay(day);
            this.add(day);
            this.day = day;
        }
        if (this.showWeekView) {
            var wk = Ext.applyIf({
                    xtype: 'weekview',
                    title: this.weekText,
                    showToday: this.showToday,
                    showTodayText: this.showTodayText,
                    showTime: this.showTime
                },
                this.weekViewCfg);

            wk.id = this.id + '-week';
            wk.store = wk.store || this.eventStore;
            this.initEventRelay(wk);
            this.add(wk);
            this.wk = wk;
        }
        if (this.showMonthView) {
            var month = Ext.applyIf({
                    xtype: 'monthview',
                    title: this.monthText,
                    showToday: this.showToday,
                    showTodayText: this.showTodayText,
                    showTime: this.showTime,
                    listeners: {
                        'weekclick': {
                            fn: function (vw, dt) {
                                this.showWeek(dt);
                            },
                            scope: this
                        }
                    }
                },
                this.monthViewCfg);

            month.id = this.id + '-month';
            month.store = month.store || this.eventStore;
            this.initEventRelay(month);
            this.add(month);
            this.month = month;
        }

        this.add(Ext.applyIf({
                xtype: 'eventeditform',
                id: this.id + '-edit',
                calendarStore: this.calendarStore,
                listeners: {
                    'eventadd': {
                        scope: this,
                        fn: this.onEventAdd
                    },
                    'eventupdate': {
                        scope: this,
                        fn: this.onEventUpdate
                    },
                    'eventdelete': {
                        scope: this,
                        fn: this.onEventDelete
                    },
                    'eventcancel': {
                        scope: this,
                        fn: this.onEventCancel
                    }
                }
            },
            this.editViewCfg));
    },

    // private
    initEventRelay: function (cfg) {
        cfg.listeners = cfg.listeners || {};
        cfg.listeners.afterrender = {
            fn: function (c) {
                // relay the view events so that app code only has to handle them in one place
                this.relayEvents(c, ['eventsrendered', 'eventclick', 'eventover', 'eventout', 'dayclick',
                    'eventmove', 'datechange', 'rangeselect', 'eventdelete', 'eventresize', 'initdrag']);
            },
            scope: this,
            single: true
        };
    },

    // private
    afterRender: function () {
        this.callParent(arguments);

        this.body.addCls('x-cal-body');

        Ext.defer(function () {
            this.updateNavState();
            this.fireViewChange();
        }, 10, this);
    },

    // private
    onLayout: function () {
        this.callParent();
        if (!this.navInitComplete) {
            this.updateNavState();
            this.navInitComplete = true;
        }
    },

    // private
    onEventAdd: function (form, rec) {
        rec.data[Ext4.Com.Other.calendar.src.data.EventMappings.IsNew.name] = false;
        this.hideEditForm();
        this.eventStore.add(rec);
        this.eventStore.sync();
        this.fireEvent('eventadd', this, rec);
    },

    // private
    onEventUpdate: function (form, rec) {
        this.hideEditForm();
        rec.commit();
        this.eventStore.sync();
        this.fireEvent('eventupdate', this, rec);
    },

    // private
    onEventDelete: function (form, rec) {
        this.hideEditForm();
        this.eventStore.remove(rec);
        this.eventStore.sync();
        this.fireEvent('eventdelete', this, rec);
    },

    // private
    onEventCancel: function (form, rec) {
        this.hideEditForm();
        this.fireEvent('eventcancel', this, rec);
    },
    /**
     * Shows the built-in event edit form for the passed in event record.  This method automatically
     * hides the calendar views and navigation toolbar.  To return to the calendar, call {@link #hideEditForm}.
     * @param {Ext4.Com.Other.calendar.src.EventRecord} record The event record to edit
     * @return {Ext4.Com.Other.calendar.src.CalendarPanel} this
     */
    showEditForm: function (rec) {
        this.preEditView = this.layout.getActiveItem().id;
        this.setActiveView(this.id + '-edit');
        this.layout.getActiveItem().loadRecord(rec);
        return this;
    },

    /**
     * Hides the built-in event edit form and returns to the previous calendar view. If the edit form is
     * not currently visible this method has no effect.
     * @return {Ext4.Com.Other.calendar.src.CalendarPanel} this
     */
    hideEditForm: function () {
        if (this.preEditView) {
            this.setActiveView(this.preEditView);
            delete this.preEditView;
        }
        return this;
    },

    // private
    setActiveView: function (id) {
        var l = this.layout,
            tb = this.getDockedItems('toolbar')[0];

        // show/hide the toolbar first so that the layout will calculate the correct item size
        if (tb) {
            tb[id === this.id + '-edit' ? 'hide' : 'show']();
        }

        l.setActiveItem(id);
        this.doComponentLayout();
        this.activeView = l.getActiveItem();

        if (id !== this.id + '-edit') {
            if (id !== this.preEditView) {
                l.activeItem.setStartDate(this.startDate, true);
            }
            this.updateNavState();
        }
        this.fireViewChange();
    },

    // private
    fireViewChange: function () {
        if (this.layout && this.layout.getActiveItem) {
            var view = this.layout.getActiveItem();
            if (view && view.getViewBounds) {
                var vb = view.getViewBounds();
                var info = {
                    activeDate: view.getStartDate(),
                    viewStart: vb.start,
                    viewEnd: vb.end
                };
            }
            ;
            this.fireEvent('viewchange', this, view, info);
        }
    },

    // private
    updateNavState: function () {
        if (this.showNavBar !== false) {
            var item = this.layout.activeItem,
                suffix = item.id.split(this.id + '-')[1],
                btn = Ext.getCmp(this.id + '-tb-' + suffix);

            if (btn) {
                btn.toggle(true);
            }
        }
    },

    /**
     * Sets the start date for the currently-active calendar view.
     * @param {Date} dt
     */
    setStartDate: function (dt) {
        var ActiveView = this.layout.activeItem;
        if (ActiveView.xtype == 'dayview' || ActiveView.xtype == 'weekview') {
            ActiveView.header.setStartDate(dt, true);
            ActiveView.body.setStartDate(dt, true);
            this.startDateClone = ActiveView.header.startDate;
        } else {
            ActiveView.setStartDate(dt, true);
            this.startDateClone = ActiveView.startDate;
        }
        this.updateNavState();
        this.fireViewChange();
    },

    // private
    showWeek: function (dt) {
        this.setActiveView(this.id + '-week');
        this.setStartDate(dt);
    },

    // private
    onPrevClick: function () {
        var me = this;
//        var oldMonth = me.startDate.getMonth() + 1;
        me.startDateClone = Ext.clone(me.startDate);
        me.resetStartDate(-1);
//        var newMonth = me.startDateClone.getMonth() + 1;
        //如果是按月移动的话，就更新月份数据
//        if (newMonth != oldMonth) {
//            me.App.AllDataReload(function () {
//                me.startDate = me.layout.activeItem.movePrev();
//                me.updateStore()
//            });
//        } else {
        //判断是否改月份了，是的话就重新获取月份数据
        me.startDate = me.layout.activeItem.movePrev();
        me.updateStore();
//        }
    },
    // private
    onNextClick: function () {
        var me = this;
//        var oldMonth = me.startDate.getMonth() + 1;
        me.startDateClone = Ext.clone(me.startDate);
        me.resetStartDate(1);
        me.startDate = me.layout.activeItem.moveNext();
        /*       var newMonth = me.startDateClone.getMonth() + 1;
         if (newMonth != oldMonth) {
         me.App.AllDataReload(function () {
         me.startDate = me.layout.activeItem.moveNext();
         me.updateStore()
         });
         } else {
         //判断是否改月份了，是的话就重新获取月份数据
         me.startDate = me.layout.activeItem.moveNext();*/
        me.updateStore();
//        }
    },
    updateStore: function () {
        this.updateNavState();
        this.fireViewChange();
    },
    resetStartDate: function (value) {
        if (this.layout.activeItem.title == this.todayText) {
            this.startDateClone = Ext4.Com.Other.calendar.src.util.Date.add(this.startDateClone, {days: value});
        } else if (this.layout.activeItem.title == this.weekText) {
            this.startDateClone = Ext4.Com.Other.calendar.src.util.Date.add(this.startDateClone, {weeks: value});
        } else if (this.layout.activeItem.title == this.monthText) {
            this.startDateClone = Ext4.Com.Other.calendar.src.util.Date.add(this.startDateClone, {months: value});
        }

    },
    // private
    onDayClick: function () {
        this.setActiveView(this.id + '-day');
    },

    // private
    onWeekClick: function () {
        this.setActiveView(this.id + '-week');
    },

    // private
    onMonthClick: function () {
        this.setActiveView(this.id + '-month');
    },

    /**
     * Return the calendar view that is currently active, which will be a subclass of
     * {@link Ext4.Com.Other.calendar.src.view.AbstractCalendar AbstractCalendar}.
     * @return {Ext4.Com.Other.calendar.src.view.AbstractCalendar} The active view
     */
    getActiveView: function () {
        return this.layout.activeItem;
    },
    resetAllStore: function () {
        var wk = this.wk;
        var day = this.day;
        var month = this.month;
        var newStore = this.eventStore;
        if (wk != '') {
            wk.store = newStore;
        }
        if (month != '') {
            month.store = newStore;
        }
        if (day != '') {
            day.store = newStore;
        }
    }
});
