Ext.ux.ZteStore = Ext.extend(Ext.data.JsonStore, {
	constructor: function(config) {
		config.proxy.reader.getData = this.getPageInfo;
		Ext.ux.ZteStore.superclass.constructor.call(this, config);
	},
	load: function(options) {
		var me = this;
        options = options || {};
       
        if (Ext.isFunction(options)) {
            options = {
                callback: options
            };
        }
        Ext.applyIf(options, {
            group : {field: this.groupField, direction: this.groupDir},
            start : 0,
            limit : this.pageSize,
            addRecords: false
        });
        if(!options.params||!me.params||options.start== 0){
        	me.params = options.params;
        }
        return Ext.data.Store.superclass.load.call(this, options);
    },
    getPageInfo:function(data){
    	  var me = this;
    	if(data){
	    	this.currentPage=data.pageIndex;
	    	me.lastPage = data.lastPage;
	   	}
    	return data;
	},
    loadPage: function(page) {
        this.currentPage = page;
        if(this.params){
	        this.read({
	            page : page,
	            params :this.params,
	            start: (page - 1) * this.pageSize,
	            limit: this.pageSize,
	            addRecords: !this.clearOnPageLoad
	        });
        }else{
        	this.read({
	            page : page,
	            start: (page - 1) * this.pageSize,
	            limit: this.pageSize,
	            addRecords: !this.clearOnPageLoad
	        });
        }
    },
    reload:function (){
    	this.loadPage(this.currentPage);
    }
});
Ext.ux.ZteGridPanel = Ext.extend(Ext.ux.TouchGridPanel,{
	initComponent: function(config) {
		this.initPagebar(this);
		if(this.dockedItems){
			if(this.dockedItems instanceof Array){
				this.dockedItems[this.dockedItems.length] = this.pageBar;
			}else if(this.dockedItems instanceof Object){
				this.dockedItems = [this.dockedItems,this.pageBar];
			}
		}else{
			this.dockedItems = this.pageBar;
		}
		Ext.ux.ZteGridPanel.superclass.initComponent.call(this);
	},
	initPagebar : function(me){
		this.previousPageBut = new Ext.Button({
			iconCls: 'arrow_left',
			handler:function(){
				me.doPreviousPage();
			}
		});
		this.nextPageBut = new Ext.Button({
			iconCls: 'arrow_right',
			handler:function(){
				 me.doNextPage();
			}
		});
		this.refreshBut = new Ext.Button({
			iconCls: 'refresh',
			disabled:true,
			handler:function(){
				me.doReload();
			}
		});
		this.pageBar = new Ext.Toolbar ({
			dock : 'bottom',
            scroll: 'horizontal',
            layout: {
                pack: 'center'
            },
            defaults: {
                iconMask: true,
                ui: 'plain'
            },
            items: [
                    this.previousPageBut,
                    {xtype: 'spacer'},
                    this.refreshBut,
                    {xtype: 'spacer'},
                    this.nextPageBut
                ]
		});
	},
	doRenderRows: function(records, start) {
		var lastPage = this.store.proxy.reader.lastPage;
		var currentPage = this.store.currentPage;
		this.refreshBut.onEnable();
		if(lastPage==1||lastPage == currentPage){
			this.nextPageBut.onDisable();
		}
		if(currentPage<lastPage){
			this.nextPageBut.onEnable();
		}
		if(this.store.currentPage==1){
			this.previousPageBut.onDisable();
		}else{
			this.previousPageBut.onEnable();
		}
		
		this.setLoading(false);
		return Ext.ux.ZteGridPanel.superclass.doRenderRows.call(this,records, start);
	},
	doPreviousPage:function(){
		this.setLoading(true);
		this.getStore().previousPage();
	},
	doNextPage:function(){
		this.setLoading(true);
		this.getStore().nextPage();
		this.previousPageBut.onEnable();
	},
	doReload:function(){
		this.setLoading(true);
		this.getStore().reload();
	}
});
//Ext.override(Ext.Picker, {
//	doneButton: '确定',
//	cancelButton: '取消',
//});
//Ext.override(Ext.DatePicker, {
//	monthText: '月',
//    dayText: '日',
//    yearText: '年',
//    slotOrder: ['year','month', 'day'],
//    initComponent: function() {
//        var yearsFrom = this.yearFrom,
//            yearsTo = this.yearTo,
//            years = [],
//            days = [],
//            months = [],
//            ln, tmp, i,
//            daysInMonth;
//
//        // swap values if user mixes them up.
//        if (yearsFrom > yearsTo) {
//            tmp = yearsFrom;
//            yearsFrom = yearsTo;
//            yearsTo = tmp;
//        }
//
//        for (i = yearsFrom; i <= yearsTo; i++) {
//            years.push({
//                text: i,
//                value: i
//            });
//        }
//
//        daysInMonth = this.getDaysInMonth(1, new Date().getFullYear());
//
//        for (i = 0; i < daysInMonth; i++) {
//            days.push({
//                text: i + 1,
//                value: i + 1
//            });
//        }
//
//        for (i = 0, ln = Date.monthNames.length; i < ln; i++) {
//            months.push({
//                text:  i + 1,
//                value: i + 1
//            });
//        }
//
//        this.slots = [];
//        
//        this.slotOrder.forEach(function(item){
//            this.slots.push(this.createSlot(item, days, months, years));
//        }, this);
//        if (this.value) {
//            var value = this.value;
//            if (Ext.isDate(value)) {
//                this.value = {
//                    day : value.getDay(),
//                    year: value.getFullYear(),
//                    month: value.getMonth() + 1
//                };
//            } else if (Ext.isObject(value)) {
//                this.value = value;
//            };
//        }
//        Ext.DatePicker.superclass.initComponent.call(this);
//    },
//    createSlot: function(name, days, months, years){
//	    switch (name) {
//	        case 'year':
//	            return {
//	                name: 'year',
//	                align: 'center',
//	                data: years,
//	                title: this.yearText,
//	                flex: 3
//	            };
//	        case 'month':
//	            return {
//	                name: name,
//	                align: 'center',
//	                data: months,
//	                title:this.monthText,
//	                flex: 3
//	            };
//	        case 'day':
//	            return {
//	                name: 'day',
//	                align: 'center',
//	                data: days,
//	                title: this.dayText,
//	                flex: 2
//	            };
//	    	}
//	},
//    getValue: function() {
//        var value = Ext.DatePicker.superclass.getValue.call(this),
//            daysInMonth = this.getDaysInMonth(value.month, value.year),
//            day = Math.min(value.day, daysInMonth);
//
//        return new Date(value.year, value.month-1, day) ;
//    }
//});
