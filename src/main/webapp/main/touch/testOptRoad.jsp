<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<link rel="stylesheet" href="../../style/touch/ext-touch.css" type="text/css" media="screen">
<link rel="stylesheet" href="../../style/touch/touchGridPanel.css" type="text/css" media="screen">
<script type="text/javascript" src="../../js/touch/ext-touch.js"></script>
<script type="text/javascript" src="../../js/touch/touchGridPanel.js"></script>
<style type="text/css" media="screen">
	 .demos-loading {
          background: rgba(0,0,0,.3) url(<%=request.getContextPath()%>/images/shared/loading.gif) center center no-repeat;
          display: block;
          width: 10em;
          height: 10em;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -5em;
          margin-top: -5em;  
          -webkit-border-radius: .5em;
          color: #fff;
          text-shadow: #000 0 1px 1px;
          text-align: center;
          padding-top: 8em;
          font-weight: bold;
        }
</style>
<body>

</body>
<script  type="text/javascript">
var carousel1;
var list;
var testStore;
var selectRecord,selectEl,selectCustID,lastCustID1,lastCustID2;

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
     // Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
    	 Ext.regModel('Customer', {
          fields: ['CUST_NO','CUST_ID']
      });
      var store = new Ext.data.JsonStore({
          model  : 'Customer',
          autoLoad :true,
          sorters: 'CUST_ID',
          proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryCust',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'CUST_ID'
	            },
	            callback: function(response) {
	            	alert(1);
	            }
	            
      		}
      });
      store.addListener('afterload',function(store,records,successful){
      	 alert(1);
      	if(successful){
      		Ext.getBody().unmask();
      	}
      
      });
      var listConfig = {
          tpl: '<tpl for="."><div class="contact"><strong><img height="32" src="../../images/LOGO/{CUST_ID}.png"/>{CUST_NO}</strong></div></tpl>',
          itemSelector: 'div.contact',
          singleSelect: true,
            title:'客户列表',
          id:"card0",
          grouped     : false,
          store: store,
          dockedItems: [
                {
                    xtype: 'toolbar',
                    dock : 'top',
                    
                    items: [
                        {xtype: 'spacer'},
                        {
                            xtype      : 'textfield',
                            placeHolder: 'Search...',
                            listeners  : {
                                scope: this,
                                
                                keyup: function(field) {
                                    var value = field.getValue();
                                    
                                    if (!value) {
                                        store.filterBy(function() {
                                            return true;
                                        });
                                    } else {
                                        var searches = value.split(' '),
                                            regexps  = [],
                                            i;
                                        for (i = 0; i < searches.length; i++) {
                                            if (!searches[i]) return;
                                            regexps.push(new RegExp(searches[i], 'i'));
                                        };
                                        
                                        store.filterBy(function(record) {
                                            var matched = [];
                                            
                                            for (i = 0; i < regexps.length; i++) {
                                                var search = regexps[i];
                                                
                                                if (record.get('CUST_NO').match(search)) matched.push(true);
                                                else matched.push(false);
                                            };
                                            
                                            if (regexps.length > 1 && matched.indexOf(false) != -1) {
                                                return false;
                                            } else {
                                                return matched[0];
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        {xtype: 'spacer'}
                    ]
                }
            ]
      };
      list=new Ext.List(Ext.apply(listConfig, {
	                fullscreen: true
	            }))
    Ext.regModel("OPT", {
			fields     : [
		        "BUZ_TYPE",
		        "CIRCUIT_NO",
		        "OPT_PAIR_NUM",
		        "A_NAME",
		        "Z_NAME",
		        "CIRCUIT_ID"
			]
		});
		testStore = new Ext.data.JsonStore({
          model  : 'OPT',
          autoLoad :false,
          sorters: 'CIRCUIT_ID',
          proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryOptRoad',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'CIRCUIT_ID'
	            }
      		}
      }); 
		var testGrid = new Ext.ux.TouchGridPanel({
			fullscreen  : true,
			id:"card1",
			store       : testStore,
			title : "光路列表",
			colModel    : [{
				header  : "光纤类别",
				mapping : "BUZ_TYPE"
			},{
				header   : "光路编码",
				mapping  : "CIRCUIT_NO"
			},{
				header   : "纤芯数量",
				mapping  : "OPT_PAIR_NUM"
			},{
				header   : "起端设备",
				mapping  : "A_NAME"
			},{
				header   : "终端设备",
				mapping  : "Z_NAME"
			}
			]
		});
        var tabPanel = new Ext.TabPanel({
            fullscreen: true,
            type: 'dark',
            sortable: true,
            items: [
            	list	,
	            testGrid,
	            {
                title: '机房拓扑',
                id:"card2",
                html: '<iframe id="topoFrame" name ="topoFrame" scrolling="auto" width="100%" height="100%"   src="<%=request.getContextPath()%>/main/touch/noTuopo.html"></iframe>',
                cls: 'card3'
            }]
        });
     
   
	tabPanel.on('cardswitch',function(tabPanel,newCard,oldCard,index,animated){
		 var custId=selectRecord.get("CUST_ID");
		if(selectRecord){
			if(newCard.id=="card0"){
				list.select(selectEl);
			}else if(newCard.id=="card1"){
				 if(lastCustID1!=custId){
				 	Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				 	lastCustID1 = custId;
             	 	testStore.load({params:{'custId':custId}});
             	 }
			}else{ 
			 	if(lastCustID2!=custId){
					lastCustID2 = custId;
					window.frames["topoFrame"].location.replace("<%=request.getContextPath()%>/main/touch/testTwaver.jsp");
				//Ext.getBody().unmask();
				}
			}
		}
	});
    list.on('itemtap',function(dataView,index,item,e){
    	selectRecord = list.getSelectedRecords()[0];
    	selectCustID = selectRecord.get("CUST_ID");
    	selectEl = item;
    });
    
    }
    

});


</script>
</head>
<body ></body>

</html>