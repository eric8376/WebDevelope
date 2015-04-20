/**
 * @class Ext4.Com.Other.calendar.src.view.Week
 * @extends Ext4.Com.Other.calendar.src.DayView
 * <p>Displays a calendar view by week. This class does not usually need ot be used directly as you can
 * use a {@link Ext4.Com.Other.calendar.src.CalendarPanel CalendarPanel} to manage multiple calendar views at once including
 * the week view.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext4.Com.Other.calendar.src.view.Week', {
    extend: 'Ext4.Com.Other.calendar.src.view.Day',
    alias: 'widget.weekview',

    /**
     * @cfg {Number} dayCount
     * The number of days to display in the view (defaults to 7)
     */
    dayCount: 7
});
