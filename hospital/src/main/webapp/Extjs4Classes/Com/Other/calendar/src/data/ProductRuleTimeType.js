Ext.define('Ext4.Com.Other.calendar.src.data.ProductRuleTimeType', {
    statics: {
        getData: function () {
            return {
                "calendars": [{
                    "id": 1,
                    "title": "此时间段内不可使用,若可使用与不可使用并存则先采取先录先用"
                }, {
                    "id": 2,
                    "title": "此时间段内可使用"
                }]
            };
        }
    }
});