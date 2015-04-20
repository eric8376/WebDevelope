/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共js】
 * 时间: 2013-06-27  上午10:04
 */

/**
 *导入js类
 */
function importJs(className) {
    Ext.require(className);
}

/**
 * 获取Ext.data.Store
 */
function getGridStore(settings) {
    if (!settings) {
        settings = {};
    }
    //默认设定
    var baseSettings = {
        autoLoad: false,
        pageSize: 25,
        fields: ['sql_no', 'ref_no', 'name', 'explain', 'columns'],
        proxy: {
            type: 'ajax',
            url: "Quick.ered?reqCode=listAll",
            reader: {
                type: 'json',
                root: 'ROOT',
                totalProperty: 'TOTALCOUNT'
            },
            extraParams: {ref_no: '89757', searchKey: '%'}
        },
        getParams: function () {
            return this.getProxy().extraParams;
        },
        setParams: function (params) {
            Ext.apply(this.getParams(), params);
        }
    };

    //覆盖设定
    Ext.apply(baseSettings, settings);

    //设置url
    if (settings.url) {
        baseSettings.proxy.url = settings.url;
    }

    //设置参数
    if (settings.params) {
        Ext.apply(baseSettings.proxy.extraParams, settings.params);
    }

    return Ext.create('Ext.data.Store', baseSettings);
}

/**
 * 获取Ext.data.TreeStore
 */
function getTreeStore(settings) {
    if (!settings) {
        settings = {};
    }
    //默认设定
    var baseSettings = {
        fields: ['id', 'text', 'expanded', 'leaf'],
        proxy: {
            type: 'ajax',
            url: 'SysPbAction.ered?reqCode=queryDeptTreeWithUser1'
        },
        root: {
            text: '根目录',
            id: 'root',
            expanded: true
        }
    };

    //覆盖设定
    Ext.apply(baseSettings, settings);

    //设置url
    if (settings.url) {
        baseSettings.proxy.url = settings.url;
    }

    //设置参数
    if (settings.rootId) {
        Ext.apply(baseSettings.root.id, settings.rootId);
    }

    return Ext.create('Ext.data.TreeStore', baseSettings);
}

/**
 * 提交表单给service
 */
function submitForm(formPanel, targetService, targetMethod, params, successFunction, failureFunction) {
    //验证是否符合直接访问
    if ((!targetService) || (!targetMethod)) {
        Ext.Msg.alert('提示', '使用快捷表单提交请指定service和method<br/>原函数为:【submitForm(formPanel,targetService,targetMethod,params,successFunction,failureFunction)】');
        return;
    }

    //验证表单
    var tempForm = formPanel.getForm();
    if (!tempForm.isValid())
        return;

    //基础设定
    var baseSettings = {
        url: 'Quick.ered?reqCode=exec',
        params: {
            exec_target: 'anyService',
            exec_method: 'anyPublicMethodOfService'
        },
        success: function (form, action) {
            Ext.Msg.alert('提示', action.result.msg);
        },
        failure: function (form, action) {
            switch (action.failureType) {
                case Ext.form.action.Action.CLIENT_INVALID:
                    Ext.Msg.alert('提示', '表单未被正确填写，请注意完善红色警告线处！');
                    break;
                case Ext.form.action.Action.CONNECT_FAILURE:
                    Ext.Msg.alert('提示', '异步通信未连接成功！请注意检查网络！');
                    break;
                case Ext.form.action.Action.SERVER_INVALID:
                    Ext.Msg.alert('提示', action.result.msg);
            }
        }
    };

    //设定参数
    if (params) {
        Ext.apply(baseSettings.params, params);
    }
    baseSettings.params.exec_target = targetService;
    baseSettings.params.exec_method = targetMethod;
    if (successFunction) {
        baseSettings.success = successFunction;
    }
    if (failureFunction) {
        baseSettings.failure = failureFunction;
    }

    //提交表单
    tempForm.submit(baseSettings);
}

/**
 * 提交ajax给service
 */
function submitAjax(targetService, targetMethod, params, successFunction, failureFunction) {
    //验证是否符合直接访问
    if ((!targetService) || (!targetMethod)) {
        Ext.Msg.alert('提示', '使用快捷异步提交请指定service和method<br/>原函数为:【targetService,targetMethod,params,successFunction,failureFunction】');
        return;
    }

    //基础设定
    var baseSettings = {
        url: 'Quick.ered?reqCode=exec',
        params: {
            exec_target: 'anyService',
            exec_method: 'anyPublicMethodOfService'
        },
        success: function (response, opts) {
            var obj = Ext.decode(response.responseText);
            Ext.Msg.alert('提示', obj.msg);
        },
        failure: function (response, opts) {
            Ext.MessageBox.alert('提示', '异步通信未连接成功！请注意检查网络！异常码:' + response.status);
        }
    };

    //设定参数
    if (params) {
        Ext.apply(baseSettings.params, params);
    }
    baseSettings.params.exec_target = targetService;
    baseSettings.params.exec_method = targetMethod;
    if (successFunction) {
        baseSettings.success = successFunction;
    }
    if (failureFunction) {
        baseSettings.failure = failureFunction;
    }

    //提交ajax
    Ext.Ajax.request(baseSettings);
}

