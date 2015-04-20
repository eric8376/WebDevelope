function showTraceView(pid) {
    var imageUrl = "WorkFlowAction.ered?reqCode=loadByProcessInstance&type=image&pid=" + pid;
    var urlPath = "WorkFlowAction.ered?reqCode=traceProcess";
    Ext.Ajax.request({
        url: urlPath,
        method: 'post',
        params: {"pid": pid},
        success: function (response, options) {
            var o = Ext.JSON.decode(response.responseText);
            var positionHtml = "";
            for (var i = 0; i < o.length; i++) {
                var v = o[i];
                var positionDiv = createElement("div", {
                    position: 'absolute',
                    left: (v.x - 1),
                    top: (v.y - 1),
                    width: (v.width - 2),
                    height: (v.height - 2),
                    backgroundColor: 'black',
                    filter: "alpha(opacity=0)",
                    "background-color": "rgb(0, 0, 0)",
                    opacity: 0,
                    zIndex: 14999
                });
                var border = createElement("div", {
                    position: 'absolute',
                    left: (v.x - 1),
                    top: (v.y - 1),
                    width: (v.width - (Ext.isIE ? -4 : 4)),
                    height: (v.height - (Ext.isIE ? -3 : 3)),
                    zIndex: 14998
                });
//                var innerTxt = "";
//                for (var key in v.vars) {
//                    innerTxt += key + "：" + (v.vars[key] == null ? "" : v.vars[key]) + "\n";
//                }
                positionDiv.title = v.title;
                if (v.currentActiviti) {
                    border.style["border"] = '3px solid red';
                }
                positionHtml += positionDiv.outerHTML + border.outerHTML;
            }

            var iPanel = {
                border: false,
                html: "<img src='" + imageUrl + "' />" + positionHtml
            };
            var win = new Ext.Window({
                title: "流程跟踪",
                width: 650,
                maximized: true,
                autoScroll: true,
                maximizable: true,
                height: 450,
                items: [iPanel],
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                            alert(win.scroller.dom.scrollLeft);
                        }
                    }
                ]
            });
            win.show();
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
        }
    });
}
function createElement(tagName, css) {
    var tag = document.createElement(tagName);
    for (var key in css) {
        tag.style[key] = css[key];
    }
    return tag;
}