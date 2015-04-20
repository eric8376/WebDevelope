function getMapping(taskId, procDefKey) {
    var makeForm = "";
    switch (procDefKey) {
        case "VerifyCheckRecord":
            makeForm = getVerifyCheckRecordMapping(taskId);
            break;
    }
    return makeForm;
}
//渠道信息审核流程
function getVerifyCheckRecordMapping(taskId) {
    var makeForm = "";
    switch (taskId) {
        case "usertask1":
            makeForm = "makeVerifyCheckRecordForm";
            break;
        case "usertask2":
            makeForm = "makeModifyCheckRecordForm";
            break;

    }
    return makeForm;
}