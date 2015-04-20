/**
 * @class Ext4.Com.Other.calendar.src.view.DayHeader
 * @extends Ext4.Com.Other.calendar.src.MonthView
 * <p>This is the header area container within the day and week views where all-day events are displayed.
 * Normally you should not need to use this class directly -- instead you should use {@link Ext4.Com.Other.calendar.src.DayView DayView}
 * which aggregates this class and the {@link Ext4.Com.Other.calendar.src.DayBodyView DayBodyView} into the single unified view
 * presented by {@link Ext4.Com.Other.calendar.src.CalendarPanel CalendarPanel}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext4.Com.Other.calendar.src.view.DayHeader', {
    extend: 'Ext4.Com.Other.calendar.src.view.Month',
    alias: 'widget.dayheaderview',

    requires: [
        'Ext4.Com.Other.calendar.src.template.DayHeader'
    ],

    // private configs
    weekCount: 1,
    dayCount: 1,
    allDayOnly: true,
    monitorResize: false,

    /**
     * @event dayclick
     * Fires after the user clicks within the day view container and not on an event element
     * @param {Ext4.Com.Other.calendar.src.DayBodyView} this
     * @param {Date} dt The date/time that was clicked on
     * @param {Boolean} allday True if the day clicked on represents an all-day box, else false. Clicks within the
     * DayHeaderView always return true for this param.
     * @param {Ext.core.Element} el The Element that was clicked on
     */

    // private
    afterRender: function () {
        if (!this.tpl) {
            this.tpl = new Ext4.Com.Other.calendar.src.template.DayHeader({
                id: this.id,
                showTodayText: this.showTodayText,
                todayText: this.todayText,
                showTime: this.showTime
            });
        }
        this.tpl.compile();
        this.addCls('ext-cal-day-header');

        this.callParent(arguments);
    },

    // private
    forceSize: Ext.emptyFn,

    // private
    refresh: function () {
        this.callParent(arguments);
        this.recalcHeaderBox();
    },

    // private
    recalcHeaderBox: function () {
        var tbl = this.el.down('.ext-cal-evt-tbl'),
            h = tbl.getHeight();

        this.el.setHeight(h + 7);

        // These should be auto-height, but since that does not work reliably
        // across browser / doc type, we have to size them manually
        this.el.down('.ext-cal-hd-ad-inner').setHeight(h + 5);
        this.el.down('.ext-cal-bg-tbl').setHeight(h + 5);
    },

    // private
    moveNext: function (noRefresh) {
        return this.moveDays(this.dayCount, noRefresh);
    },

    // private
    movePrev: function (noRefresh) {
        return this.moveDays(-this.dayCount, noRefresh);
    },

    // private
    onClick: function (e, t) {
        var el = e.getTarget('td', 3),
            parts,
            dt;
        if (el) {
            if (el.id && el.id.indexOf(this.dayElIdDelimiter) > -1) {
                parts = el.id.split(this.dayElIdDelimiter);
                dt = parts[parts.length - 1];

                this.fireEvent('dayclick', this, Ext.Date.parseDate(dt, 'Ymd'), true, Ext.get(this.getDayId(dt)));
                return;
            }
        }
        this.callParent(arguments);
    }
});
