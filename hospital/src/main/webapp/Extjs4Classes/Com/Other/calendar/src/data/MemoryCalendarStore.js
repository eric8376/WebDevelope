/*
 * A simple reusable store that loads static calendar field definitions into memory
 * and can be bound to the CalendarCombo widget and used for calendar color selection.
 */
Ext.define('Ext4.Com.Other.calendar.src.data.MemoryCalendarStore', {
    extend: 'Ext.data.Store',
    model: 'Ext4.Com.Other.calendar.src.data.CalendarModel',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext4.Com.Other.calendar.src.data.CalendarModel',
        'Ext4.Com.Other.calendar.src.data.CalendarMappings'
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'calendars'
        },
        writer: {
            type: 'json'
        }
    },

    autoLoad: true,

    initComponent: function () {
        var me = this,
            calendarData = Ext4.Com.Other.calendar.src.data;

        me.sorters = me.sorters || [{
            property: calendarData.CalendarMappings.Title.name,
            direction: 'ASC'
        }];

        me.idProperty = me.idProperty || calendarData.CalendarMappings.CalendarId.name || 'id';

        me.fields = calendarData.CalendarModel.prototype.fields.getRange();

        me.callParent(arguments);
    }
});