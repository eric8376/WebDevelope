//@define Ext4.Com.Other.calendar.src.data.CalendarMappings
/**
 * @class Ext4.Com.Other.calendar.src.data.CalendarMappings
 * @extends Object
 * A simple object that provides the field definitions for Calendar records so that they can be easily overridden.
 */
Ext.ns('Ext4.Com.Other.calendar.src.data');

Ext4.Com.Other.calendar.src.data.CalendarMappings = {
    CalendarId: {
        name: 'CalendarId',
        mapping: 'id',
        type: 'int'
    },
    Title: {
        name: 'Title',
        mapping: 'title',
        type: 'string'
    },
    Description: {
        name: 'Description',
        mapping: 'desc',
        type: 'string'
    },
    ColorId: {
        name: 'ColorId',
        mapping: 'color',
        type: 'int'
    },
    IsHidden: {
        name: 'IsHidden',
        mapping: 'hidden',
        type: 'boolean'
    }
};