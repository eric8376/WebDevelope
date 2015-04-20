package org.nxstudio.service.socketserver.constants;

public class CodeConst {
    public static final String SERVICE_ERR_CODE_DEFAULT = "SRV_ERR_001";//服务层默认异常

    /**
     * 系统管理异常**
     */
    public static final String SYS_ROLE_EXIST_ERR = "SYS_ROLE_ROLENAME_EXIST";//角色已经存在
    //public static final String SYS_ROLE_REFERED="SYS_ROLE_REFERED";//角色已经被使用

    public static final String SYS_USERNO_EXIST_ERR = "SYS_USERNO_EXIST";//用户已经存在
    public static final String BRANCH_INNERNO_EXIST = "BRANCH_INNERNO_EXIST"; //机构号已经存在

    public static final String DATA_REFERED = "DATA_REFERED"; //数据已经被使用

    public static final String USER_EMPTY_BRANCH_ERR = "USER_EMPTY_BRANCH_ERR";//	空机构用户不可分配角色
    public static final String SYS_NOTSAP_USER_ERR = "SYS_NOTSAP_USER";//用户编号在sap用户中不存在


    /**
     * 登陆*
     */
    public static final String USER_NOT_FOUND = "SRV_ERR_USER_001";//找不到指定用户
    public static final String USER_PASSWORD_ERROR = "USER_PASSWORD_ERROR";//找不到指定用户
    public static final String USER_PASSWORD_INEFFECT = "USER_PASSWORD_INEFFECT_ERROR";//密码失效
    public static final String USER_FIRST_LOGIN = "USER_FIRST_LOGIN";//用户第一次登录
    public static final String USER_UNEFFECTED_ERR = "USER_UNEFFECTED_ERR";//无效用户
    public static final String USER_LOCKED_ERR = "USER_LOCKED_ERR";//用锁定

	
	
	/*public static final String USER_PASSWORD_ERROR="SRV_ERROR_PASSWORD";//用户密码错误
	public static final String USER_NOT_FOUND="SRV_ERR_USER_001";//找不到指定用户
	public static final String USER_HAVENOT_RIGHT="SRV_ERR_USER_002";//用户没有分配权限
	public static final String USER_NOT_BRCH="SRV_ERR_USER_004";//用户没有分配机构
	public static final String TRY_OVER_THREETIMES="SRV_ERR_USER_003";//密码输入错误超过3次
	public static final String LOGON_PASSWORD_ERR="LOGON_PASSWORD_ERR";//密码输入错误
	public static final String LOGON_PASSWORD_EXPIRED="pwd_overdue";//密码过期
	public static final String LOGON_FIRST="first_login";/
	*/

    /**
     * 各类产品标识
     */
    public static final String BBSP_ACPT_TYPE = "ACPT";//承兑
    public static final String BBSP_DISC_TYPE = "DISC";//贴现
    public static final String BBSP_REBUY_TYPE = "REBUY";//转入
    public static final String BBSP_SALE_TYPE = "SALE";//转卖
    public static final String BBSP_SAVE_TYPE = "SAVE";//质押
    public static final String BD_HISTORY_SQL_ERROR = "BD_HISTORY_SQL_ERROR";//票据{0}查询条件为空
    public static final String BD_HISTORY_MESSAGE_ERROR = "BD_HISTORY_MESSAGE_ERROR";//票据{0}来源信息获取不到,请检查当前票据数据来源

    public static final String BA_FACADE_ABOLISH_VOUCHER_FAILURE = "FACADE_ABOLISH_VOUCHER_FAILURE";

    /**
     * BA异常
     */
    public static final String BA_BILL_NOT_FOUND = "BA_SRV_ERR_BILL_001";//找不到指定票据
    public static final String BA_BILL_SIGN_NOT_FOUND = "BA_BILL_SIGN_NOT_FOUND";//查询未用退回信息失败
    public static final String BA_OBJECT_NOT_FOUNDS = "BA_SRV_ERR_OBJECT_001";//找不到指定对象
    /**
     * BA业务层异常
     */
    public static final String BA_DIFFERENT_DRAWEEBANKNO_ERROR = "BA_DIFFERENT_DRAWEEBANKNO_ERROR";//所选清单付款行行号并不统一
    public static final String BA_DIFFERENT_DRAWEEBANKNO_NULL_ERROR = "BA_DIFFERENT_DRAWEEBANKNO_NULL_ERROR";//所选清单付款行行号为空
    public static final String BA_DIFFERENT_BILLTYPE_ERROR = "BA_DIFFERENT_BILLTYPE_ERROR";//所选清单存在银商互混情况
    public static final String BA_DIFFERENT_BILLDATE_ERROR = "BA_DIFFERENT_BILLDATE_ERROR";//清单出票日小于票面到期日
    public static final String BA_DIFFERENT_BILLMONTH_ERROR = "BA_DIFFERENT_BILLMONTH_ERROR";//票面到期日超过六个月
    public static final String BA_DIFFERENT_SUB_ERROR = "BA_DIFFERENT_SUB_ERROR";//发出托收清单已发出托收，签收撤消无法执行
    public static final String BA_DIFFERENT_SUBCOLLLIST_DEL_ERROR = "BA_DIFFERENT_SUBCOLLLIST_DEL_ERROR";//发出托收清单已使用，签收删除无法执行
    public static final String BA_DIFFERENT_BILLINFO_REPEAT_ERROR = "BA_DIFFERENT_BILLINFO_REPEAT_ERROR";//所选票据已经发出托收，不允许重复发出
    public static final String BA_FENLU_ERROR = "BA_FENLU_ERROR";//查询分录信息失败
    public static final String BA_CHECK_ERROR = "BA_CHECK_ERROR";//校验失败
    public static final String BA_QUERY_MESSAGE_ERROR = "BA_QUERY_MESSAGE_ERROR";//查询审核信息失败
    public static final String BA_COPY_OBJECT_ERROR = "BA_COPY_OBJECT_ERROR";//复制对象失败
    public static final String BA_COPY_FLOW_ERROR = "BA_COPY_FLOW_ERROR";//查询流水信息失败
    public static final String BA_IMPORT_EXCEL_ERROR = "BA_IMPORT_EXCEL_ERROR";//解析excel文件失败


    /**
     * AcptaccountService 异常
     */
    public static final String BA_ACPTACCOUNT_LOADACPTACCOUNTINFO_ERROR = "BA_ACPTACCOUNT_LOADACPTACCOUNTINFO_ERROR";//分配票号失败
    public static final String BA_ACPTACCOUNT_ACPTLOADACPTACCOUNTBILLNOBYBACH_ERROR = "BA_ACPTACCOUNT_ACPTLOADACPTACCOUNTBILLNOBYBACH_ERROR";// 获得工作流中申请下清单信息(分配票号)失败
    public static final String BA_ACPTACCOUNT_LOADACPTACCOUNTBILLNOINFO_ERROR = "BA_ACPTACCOUNT_LOADACPTACCOUNTBILLNOINFO_ERROR";// 分配票号明细失败
    public static final String BA_ACPTACCOUNT_ASSIGNBILLNO_ERROR = "BA_ACPTACCOUNT_ASSIGNBILLNO_ERROR";// 分配票号失败
    public static final String BA_CANCELASSIGNBILLNO_ERROR = "BA_CANCELASSIGNBILLNO_ERROR";// 撤销分配票号失败
    public static final String BA_ACPTACCOUNT_PRINTBILLINFO_ERROR = "BA_ACPTACCOUNT_PRINTBILLINFO_ERROR";//打印票据失败
    public static final String BA_LOADACPTBILLINFOBYASSIGNBILLNOOVER_ERROR = "BA_LOADACPTBILLINFOBYASSIGNBILLNOOVER_ERROR";//提交前判断申请下是否含有分配票号完成的清单失败
    public static final String BA_LOADACCOUNTASSIGNBILLNOBACHINFO_ERROR = "BA_LOADACCOUNTASSIGNBILLNOBACHINFO_ERROR";//加载申请页面失败
    public static final String BA_workSubmitAccountAssignBillNo_ERROR = "BA_workSubmitAccountAssignBillNo_ERROR";//提交分配票号失败
    public static final String BA_workSubmitAccountMoneyReceive_ERROR = "BA_workSubmitAccountMoneyReceive_ERROR";//提交费用收取失败
    public static final String BA_queryInstanceId_ERROR = "BA_queryInstanceId_ERROR";//根据票据Task查询流程ID失败
    public static final String BA_loadAccountMoneyReceiveInfo_ERROR = "BA_loadAccountMoneyReceiveInfo_ERROR";//费用收取失败
    public static final String BA_loadAccountMoneyReceiveBach_ERROR = "BA_loadAccountMoneyReceiveBach_ERROR";//费用收取失败
    public static final String BA_loadAcptAccountBach_ERROR = "BA_loadAcptAccountBach_ERROR";//承兑记账失败
    public static final String BA_loadAcptAccountBachInfoBySubmit_ERROR = "BA_loadAcptAccountBachInfoBySubmit_ERROR";//承兑记账申请失败
    public static final String BA_applyAcptAccount_ERROR = "BA_applyAcptAccount_ERROR";//承兑记账处理失败
    public static final String BA_loadAccountMoneyReceiveInfoByBach_ERROR = "BA_loadAccountMoneyReceiveInfoByBach_ERROR";//费用收取－获得工作流中申请下清单信息失败
    public static final String BA_loadAcctMoneyReceiveInfoByBach_ERROR = "BA_loadAcctMoneyReceiveInfoByBach_ERROR";//费用收取－获得工作流中申请下清单信息失败
    public static final String BA_loadAcptAccountInfoByBach_ERROR = "BA_loadAcptAccountInfoByBach_ERROR";//承兑记账－获得工作流中申请下清单信息失败
    public static final String BA_loadAcptWaitPrintBillInfo_ERROR = "BA_loadAcptWaitPrintBillInfo_ERROR";//add by taoli 2010-07-18 获取待打印的清单信息异常
    public static final String BA_workAcceptRgctBill_ERROR = "BA_workAcceptRgctBill_ERROR";//记账异常
    public static final String BA_workReturnAcptAccountService_ERROR = "BA_workReturnAcptAccountService_ERROR";//记账退回异常
    public static final String BA_updateAcptAccountBillNo_ERROR = "BA_updateAcptAccountBillNo_ERROR";// 更换票号失败
    public static final String BA_moneyCount_ERROR = "BA_moneyCount_ERROR";// 费用计算异常
    public static final String BA_audiOptionBillTrue_ERROR = "BA_audiOptionBillTrue_ERROR";// 更新清单信息异常
    public static final String BA_toUpdateAcptAccountBillNo_ERROR = "BA_toUpdateAcptAccountBillNo_ERROR";// 查询已签收清单信息异常
    public static final String BA_loadAllAcptAccountInfoByBach_ERROR = "BA_loadAllAcptAccountInfoByBach_ERROR";//查询承兑记账清单信息异常
    public static final String BA_loadAllAccountMoneyReceiveInfoByBach_ERROR = "BA_loadAllAccountMoneyReceiveInfoByBach_ERROR";//查询所有费用收取清单信息异常

    /* 分配票号 */
    public static final String BA_QUERYBILLNO_FOR_USED_ERROR = "BA_QUERYBILLNO_FOR_USED_ERROR";

    public static final String BA_QUERYBILLNO_FOR_NOTUSED_ERROR = "BA_QUERYBILLNO_FOR_NOTUSED_ERROR";
    /**
     * AcptAudiOpinionService 异常
     */

    public static final String BA_queryAudiOpinionInfo_ERROR = "BA_queryAudiOpinionInfo_ERROR"; // 查询失败
    public static final String BA_queryInstance_ERROR = "BA_queryInstance_ERROR"; // 查询失败
    public static final String BA_queryMaxIDAudiOpinionInfo_ERROR = "BA_queryMaxIDAudiOpinionInfo_ERROR"; // 查询失败
    public static final String BA_workSaveAudiOpinionInfo_ERROR = "BA_workSaveAudiOpinionInfo_ERROR";//保存审核异常
    public static final String BA_workSaveAcptAudiOpinionInfo_ERROR = "BA_workSaveAcptAudiOpinionInfo_ERROR";//保存初审意见异常
    public static final String BA_findAcptBachAndBillInfo_ERROR = "BA_findAcptBachAndBillInfo_ERROR";//查询申请信息和清单信息异常
    public static final String BA_workSubmitAcptAuditionInfo_ERROR = "BA_workSubmitAcptAuditionInfo_ERROR";//提交承兑初审异常
    public static final String BA_loadAuditingBachInfo_ERROR = "BA_loadAuditingBachInfo_ERROR";//加载审核异常
    public static final String BA_acptLoadAudiOpinionInfo_ERROR = "BA_acptLoadAudiOpinionInfo_ERROR";//加载承兑审核异常
    public static final String BA_acptLoadAudiOpinionInfoByBach_ERROR = "BA_acptLoadAudiOpinionInfoByBach_ERROR";//获得工作流中申请下清单信息异常
    public static final String BA_queryAudiOpinionBach_ERROR = "BA_queryAudiOpinionBach_ERROR";//查询异常
    public static final String BA_saveAudiOpinionBach_ERROR = "BA_saveAudiOpinionBach_ERROR";//保存审核申请意见异常
    public static final String BA_queryAcptAudiOpinionInfoAndBach_ERROR = "BA_queryAcptAudiOpinionInfoAndBach_ERROR";//承兑审核查询异常
    public static final String BA_queryAudiOpinionInfoAndBach_ERROR = "BA_queryAudiOpinionInfoAndBach_ERROR";//承兑初审查询申请和清单异常
    public static final String BA_workSubmitAcptAudition_ERROR = "BA_workSubmitAcptAudition_ERROR";//提交承兑审核异常
    public static final String BA_workHighRiskAuditingService_ERROR = "BA_workHighRiskAuditingService_ERROR";//高风险审核异常
    public static final String BA_loadEditAcptAudiOpinionInfo_ERROR = "BA_loadEditAcptAudiOpinionInfo_ERROR";//承兑审核加载异常
    public static final String BA_loadSubmitAcptBachInfo_ERROR = "BA_loadSubmitAcptBachInfo_ERROR";//编辑审核的选择申请和提交异常
    public static final String BA_isAuditingOver_ERROR = "BA_isAuditingOver_ERROR";//判断异常
    public static final String BA_loadAcptBillInfoByAuditingOver_ERROR = "BA_loadAcptBillInfoByAuditingOver_ERROR";//查询所有审核完成的清单信息异常
    public static final String BA_loadAuditingResult_ERROR = "BA_loadAuditingResult_ERROR";//查看审核结果异常
    public static final String BA_queryAcptBillInfoByIdNew_ERROR = "BA_queryAcptBillInfoByIdNew_ERROR";//查询异常
    public static final String BA_queryAcptBillInfoByBachId_ERROR = "BA_queryAcptBillInfoByBachId_ERROR";//查询异常

    /**
     * AcptBachService 异常
     */
    public static final String BA_createAcptBatch_ERROR = "BA_createAcptBatch_ERROR";//新增承兑申请失败
    public static final String BA_searchAcptBatch_ERROR = "BA_searchAcptBatch_ERROR";//查询承兑申请失败
    public static final String BA_searchAcptBillInfoByBatchId_ERROR = "BA_searchAcptBillInfoByBatchId_ERROR";//查询承兑申请及承兑清单失败
    public static final String BA_updateAcptBatch_ERROR = "BA_updateAcptBatch_ERROR";//修改承兑申请失败
    public static final String BA_loadAcptBach_ERROR = "BA_loadAcptBach_ERROR";//查询承兑申请明细失败
    public static final String BA_acptLoadCancelAcptBatch_ERROR = "BA_acptLoadCancelAcptBatch_ERROR";//加载撤销申请失败
    public static final String BA_searchInfoAndBatch_ERROR = "BA_searchInfoAndBatch_ERROR";//提交申请失败
    public static final String BA_acptDeleteAcptBach_ERROR = "BA_acptDeleteAcptBach_ERROR";//删除申请失败
    public static final String BA_workAcptCancelAcptBatch_ERROR = "BA_workAcptCancelAcptBatch_ERROR";//撤销申请失败
    public static final String BA_workAcptCancelAcptBatchNow_ERROR = "BA_workAcptCancelAcptBatchNow_ERROR";//撤销申请失败，申请下存在非正确状态的票据{0}
    public static final String BA_acptLoadUpdateAcptBatch_ERROR = "BA_acptLoadUpdateAcptBatch_ERROR";//查询失败
    public static final String BA_searchAllWork_ERROR = "BA_searchAllWork_ERROR";//查询失败
    public static final String BA_acptLoadFirstTrialBachInfo_ERROR = "BA_acptLoadFirstTrialBachInfo_ERROR";//加载承兑初审申请失败
    public static final String BA_workSubmitAcptApply_ERROR = "BA_workSubmitAcptApply_ERROR";//提交承兑申请失败
    public static final String BA_workSubmitWrok_ERROR = "BA_workSubmitWrok_ERROR";//客户签约验证失败
    public static final String BA_workSubmit_ERROR = "BA_workSubmit_ERROR";//产品授权验证失败
    public static final String BA_workSubmit_KHZR_ERROR = "BA_workSubmit_KHZR_ERROR";//签约票据准入验证失败
    public static final String BA_workSubmit_YHZR_ERROR = "BA_workSubmit_YHZR_ERROR";//银行票据准入验证失败

    /**
     * AcptBillInfoService 异常
     */
    public static final String BA_createAcceptanceBillInfo_ERROR = "BA_createAcceptanceBillInfo_ERROR";//新增承兑清单失败
    public static final String BA_deleteAcceptanceBillInfo_ERROR = "BA_deleteAcceptanceBillInfo_ERROR";//删除承兑清单失败
    public static final String BA_acptUpdateDeleteBillInfo_ERROR = "BA_acptUpdateDeleteBillInfo_ERROR";//修改申请—删除清单失败
    public static final String BA_loadAcceptanceBillInfo_ERROR = "BA_loadAcceptanceBillInfo_ERROR";//查询承兑清单失败
    public static final String BA_searchAcceptanceBillInfo_ERROR = "BA_searchAcceptanceBillInfo_ERROR";//查询承兑清单失败
    public static final String BA_updateAcceptanceBillInfo_ERROR = "BA_updateAcceptanceBillInfo_ERROR";//修改承兑清单失败
    public static final String BA_searchAcceptanceBillInfoByBatch_ERROR = "BA_searchAcceptanceBillInfoByBatch_ERROR";//查询申请下的明细失败
    public static final String BA_searchAcptBillInfoByBatch_ERROR = "BA_searchAcptBillInfoByBatch_ERROR";//查询失败
    public static final String BA_updateInfoAndBachRelation_ERROR = "BA_updateInfoAndBachRelation_ERROR";//删除清单失败
    public static final String BA_searchAcptBillInfoByOperStatus_ERROR = "BA_searchAcptBillInfoByOperStatus_ERROR";//查询失败
    public static final String BA_acptLoadUpdateAcptBatchBill_ERROR = "BA_acptLoadUpdateAcptBatchBill_ERROR";//查询满足操作状态的申请信息失败
    public static final String BA_acptUpdateToSaveBill_ERROR = "BA_acptUpdateToSaveBill_ERROR";//修改申请失败
    public static final String BA_toGoOnAddBillInfo_ERROR = "BA_toGoOnAddBillInfo_ERROR";//承兑申请中的继续添加失败
    public static final String BA_toGoAddBillInfo_ERROR = "BA_toGoAddBillInfo_ERROR";//修改申请中的继续添加失败
    public static final String BA_toGoOnUpdateBillInfo_ERROR = "BA_toGoOnUpdateBillInfo_ERROR";//修改申请中的继续添加失败
    public static final String BA_acptLoadFirstTrialBillInfo_ERROR = "BA_acptLoadFirstTrialBillInfo_ERROR";//查询清单信息失败

    /**
     * AcptMateBillService 异常
     */
    public static final String BA_createAcptMateBill_ERROR = "BA_createAcptMateBill_ERROR";//新增实物票据失败
    public static final String BA_deleteAcptMateBill_ERROR = "BA_deleteAcptMateBill_ERROR";//删除一条已插入登记中心的记录失败
    public static final String BA_deleteNoSignAcptMateBill_ERROR = "BA_deleteNoSignAcptMateBill_ERROR";//删除一条未插入登记中心的记录失败
    public static final String BA_updateNoSignAcptMateBill_ERROR = "BA_updateNoSignAcptMateBill_ERROR";//更新未插入登记中心的票据失败
    public static final String BA_updateAcptMateBill_ERROR = "BA_updateAcptMateBill_ERROR";//更新票据失败
    public static final String BA_searchAcptBillMate_ERROR = "BA_searchAcptBillMate_ERROR";//查询承兑签收实物票据失败
    public static final String BA_inputEndorInfo_ERROR = "BA_inputEndorInfo_ERROR";//录入背书信息失败
    public static final String BA_importAcptMateBill_ERROR = "importAcptMateBill";//批量导入票据信息失败
    public static final String BA_loadAccptanceBillInfo_ERROR = "BA_loadAccptanceBillInfo_ERROR";//查找票据信息失败
    public static final String BA_queryBillEndorInfo_ERROR = "BA_queryBillEndorInfo_ERROR";//查找背书信息失败
    public static final String BA_loadEndorInfoByRgctId_ERROR = "BA_loadEndorInfoByRgctId_ERROR";//查询承兑签收电子票据失败
    public static final String BA_submitAcptMateBill_ERROR = "BA_submitAcptMateBill_ERROR";//确认签收票据失败
    public static final String BA_searchAcptElecBill_ERROR = "BA_searchAcptElecBill_ERROR";//查询背书签收电子票据失败
    public static final String BA_searchEndorBillMate_ERROR = "BA_searchEndorBillMate_ERROR";//查询背书签收实物票失败
    public static final String BA_createEndorMateBill_ERROR = "BA_createEndorMateBill_ERROR";//新增实物票失败
    public static final String BA_searchEndorBillEditMate_ERROR = "BA_searchEndorBillEditMate_ERROR";//查询签收票据失败
    public static final String BA_inputAcptInfo_ERROR = "BA_inputAcptInfo_ERROR";//保存签收信息失败
    public static final String BA_searchBillInfoAndSignInfo_ERROR = "BA_searchBillInfoAndSignInfo_ERROR";//查找票据信息和签收信息失败
    public static final String BA_submitAcptElecBill_ERROR = "BA_submitAcptElecBill_ERROR";//背书签收/拒绝电子票确认提交失败
    public static final String BA_queryEndorInfo_ERROR = "BA_queryEndorInfo_ERROR";//查询背书信息失败
    public static final String BA_queryEndorInfoByRgctId_ERROR = "BA_queryEndorInfoByRgctId_ERROR";//查询背书信息失败
    public static final String BA_updateEndorInfo_ERROR = "BA_updateEndorInfo_ERROR";//更新失败
    public static final String BA_loadBillAndEndorInfo_ERROR = "BA_loadBillAndEndorInfo_ERROR";//查找票据和背书的信息失败
    public static final String BA_submitAfterUpdate_ERROR = "BA_submitAfterUpdate_ERROR";//在背书编辑修改完成后提交失败
    public static final String BA_deleteEndorInfo_ERROR = "BA_deleteEndorInfo_ERROR";//删除背书信息失败

    /**
     * AcptMatuService 异常
     */
    public static final String BA_deductFund_ERROR = "BA_deductFund_ERROR";//到期扣款失败
    public static final String BA_searchAcptMatuBill_ERROR = "BA_searchAcptMatuBill_ERROR";//到期扣款提醒查询失败
    public static final String BA_searchAcptMatuDeduct_ERROR = "BA_searchAcptMatuDeduct_ERROR";//到期扣款查询失败
    public static final String BA_searchAcptMatuProvide_ERROR = "BA_searchAcptMatuProvide_ERROR";//到期扣款准备查询失败
    public static final String BA_searchDeductFund_ERROR = "BA_searchDeductFund_ERROR";//到期扣款冲正失败
    public static final String BA_searchExpectBill_ERROR = "BA_searchExpectBill_ERROR";//垫款信息查询失败
    public static final String BA_submitDeductBill_ERROR = "BA_submitDeductBill_ERROR";//选择扣款失败
    public static final String BA_queryAcptBillInfoByBillId_ERROR = "BA_queryAcptBillInfoByBillId_ERROR";//查询清单信息失败
    public static final String BA_updateAcptBillInfoForAccountNo_ERROR = "BA_updateAcptBillInfoForAccountNo_ERROR";//更新还款账号失败
    public static final String BA_queryMoreAcptBillInfoByIds_ERROR = "BA_queryMoreAcptBillInfoByIds_ERROR";//查询失败
    public static final String BA_queryDeductBill_ERROR = "BA_queryDeductBill_ERROR";//查询冲正分录失败
    /**
     * BaAskForReplyService 异常
     */

    public static final String BA_createBaReplyForAsk_ERROR = "BA_createBaReplyForAsk_ERROR";//新增发出查询收到查复信息失败
    public static final String BA_searchBaReplyForAsk_ERROR = "BA_searchBaReplyForAsk_ERROR";//查询发出查询收到查复信息失败
    public static final String BA_updateBaReplyForAsk_ERROR = "BA_updateBaReplyForAsk_ERROR";//修改发出查询收到查复信息失败
    public static final String BA_recviveBaReplyForAsk_ERROR = "BA_recviveBaReplyForAsk_ERROR";//承兑收到查复失败
    public static final String BA_queryBaReplyForAsk_ERROR = "BA_queryBaReplyForAsk_ERROR";//发出查询失败

    /**
     * BaAskReplyBillService 异常
     */

    public static final String BA_createBaAskReplyBill_ERROR = "BA_createBaAskReplyBill_ERROR";//新增查询查复清单信息失败
    public static final String BA_baAskReplyBillToBillInfo_ERROR = "BA_baAskReplyBillToBillInfo_ERROR";//失败
    public static final String BA_updateAcptBillInfo_ERROR = "BA_updateAcptBillInfo_ERROR";//更新失败
    public static final String BA_deleteBaAskReplyBill_ERROR = "BA_deleteBaAskReplyBill_ERROR";//删除查询查复清单信息失败
    public static final String BA_submitBaAskReplyBill_ERROR = "BA_submitBaAskReplyBill_ERROR";//修改查询查复清单信息失败
    public static final String BA_updateBaAskReplyBill_ERROR = "BA_updateBaAskReplyBill_ERROR";//确认查询查复清单信息失败
    public static final String BA_copyBaAskReplyBill_ERROR = "BA_copyBaAskReplyBill_ERROR";//增加查询查复清单信息失败
    public static final String BA_submitSubAskReply_ERROR = "BA_submitSubAskReply_ERROR";//签收查询查复清单信息失败
    public static final String BA_queryAskForReply_ERROR = "BA_queryAskForReply_ERROR";//查询可进行发出查询查复清单信息失败
    public static final String BA_queryAskForReplyResult_ERROR = "BA_queryAskForReplyResult_ERROR";//查询可进行收到查复查复清单信息失败
    public static final String BA_loadBaAskReplyBill_ERROR = "BA_loadBaAskReplyBill_ERROR";//查询单个查询查复清单信息失败
    public static final String BA_queryReplyForAsk_ERROR = "BA_queryReplyForAsk_ERROR";//查询收到查询清单信息失败
    public static final String BA_queryReply_ERROR = "BA_queryReply_ERROR";//查询发出查复清单信息失败
    public static final String BA_queryAll_ERROR = "BA_queryAll_ERROR";//查询可供打印查询查复清单信息失败

    /**
     * BaRecvAskReplyService 异常*
     */
    public static final String BA_createRecvAskReply_ERROR = "BA_createRecvAskReply_ERROR";//新增查询查复签收信息失败
    public static final String BA_searchRecvAskReply_ERROR = "BA_searchRecvAskReply_ERROR";//查询查询查复签收信息失败
    public static final String BA_updateRecvAskReply_ERROR = "BA_updateRecvAskReply_ERROR";//修改查询查复签收信息失败
    public static final String BA_searchBaRecvAskReply_ERROR = "BA_searchBaRecvAskReply_ERROR";//查询查询查复及签收票据信息失败

    /**
     * BaReplyForAskService 异常
     */
    public static final String BA_createBaAskForReply_ERROR = "BA_createBaAskForReply_ERROR";//新增收到查询发出查复信息失败
    public static final String BA_updateBaAskForReply_ERROR = "BA_updateBaAskForReply_ERROR";//修改收到查询发出查复信息失败
    public static final String BA_recviveBaAskForReply_ERROR = "BA_recviveBaAskForReply_ERROR";//收到查询信息失败


    /**
     * BaSubAskReplyService 异常
     */
    public static final String BA_createBaSubAskReply_ERROR = "BA_createBaSubAskReply_ERROR";//新增提交/撤消查询查复信息失败
    public static final String BA_searchBaSubAskReply_ERROR = "BA_searchBaSubAskReply_ERROR";//查询提交/撤消查询查复信息失败
    public static final String BA_queryCancelAskForReply_ERROR = "BA_queryCancelAskForReply_ERROR";//查询可以(签收、撤消)查询查复的票据信息失败
    public static final String BA_querySubAskForReply_ERROR = "BA_querySubAskForReply_ERROR";//查询签收查询查复的票据信息失败
    public static final String BA_queryReplyResult_ERROR = "BA_queryReplyResult_ERROR";//查询查复结果信息失败

    /**
     * BehiTimeBillService 异常
     */
    public static final String BA_createBehiTimeBill_ERROR = "BA_createBehiTimeBill_ERROR";//逾期结清登记失败
    public static final String BA_createTimeBill_ERROR = "BA_createTimeBill_ERROR";//逾期结清登记失败
    public static final String BA_searchBehiTimeBill_ERROR = "BA_searchBehiTimeBill_ERROR";//查询待提交逾期登记票据信息及逾期信息失败
    public static final String BA_searchEndBehiTimeBill_ERROR = "BA_searchEndBehiTimeBill_ERROR";//逾期信息查询失败
    public static final String BA_submitBehiTimeBill_ERROR = "BA_submitBehiTimeBill_ERROR";//新增逾期清单信息失败
    public static final String BA_queryBill_ERROR = "BA_queryBill_ERROR";//查询转逾期登记信息失败
    public static final String BA_updateBehiTimeBill_ERROR = "BA_updateBehiTimeBill_ERROR";//修改转逾期登记信息失败
    public static final String BA_receiveBehiTime_ERROR = "BA_receiveBehiTime_ERROR";//接收逾期登记信息失败
    public static final String BA_createBehiBillInfo_ERROR = "BA_createBehiBillInfo_ERROR";//新增逾期清单信息失败
    public static final String BA_loadBehiBillInfo_ERROR = "BA_loadBehiBillInfo_ERROR";//查询逾期清单信息失败
    public static final String BA_searchBeanBehiBillInfo_ERROR = "BA_searchBeanBehiBillInfo_ERROR";//逾期清单信息查询失败
    public static final String BA_queryOneBehiTime_ERROR = "BA_queryOneBehiTime_ERROR";//查询逾期清单信息失败
    public static final String BA_queryThreeBehiTime_ERROR = "BA_queryThreeBehiTime_ERROR";//逾期信息查询失败
    public static final String BA_queryTwoBehiTime_ERROR = "BA_queryTwoBehiTime_ERROR";//查询逾期清单信息失败
    public static final String BA_queryBillTime_ERROR = "BA_queryBillTime_ERROR";//查询逾期结清登记信息失败
    public static final String BA_submitTimeBill_ERROR = "BA_submitTimeBill_ERROR";//逾期登记申请失败
    public static final String BA_submitAsTimeBill_ERROR = "BA_submitAsTimeBill_ERROR";//逾期登记确认失败
    public static final String BA_rgctBehiTime_ERROR = "BA_rgctBehiTime_ERROR";//产生逾期信息失败
    public static final String BA_queryOneAsBehiTime_ERROR = "BA_queryOneAsBehiTime_ERROR";//查询逾期清单信息失败
    public static final String BA_searchAsBehiTimeBill_ERROR = "BA_searchAsBehiTimeBill_ERROR";//查询待确认逾期申请票据信息及逾期信息失败

    /**
     * BillService 异常
     */
    public static final String BA_loadBehiBill_ERROR = "BA_loadBehiBill_ERROR";//查询逾期代理清单信息失败
    public static final String BA_submitBehiBill_ERROR = "BA_submitBehiBill_ERROR";//新增逾期代理清单信息失败
    public static final String BA_submitUpdateBehiBill_ERROR = "BA_submitUpdateBehiBill_ERROR";//新增逾期代理清单信息失败
    public static final String BA_loadBehiAgency_ERROR = "BA_loadBehiAgency_ERROR";//查询逾期代理信息失败
    public static final String BA_updateBehiAgency_ERROR = "BA_updateBehiAgency_ERROR";//查询逾期代理信息失败
    public static final String BA_loadBehi_ERROR = "BA_loadBehi_ERROR";//反馈逾期结清申请处理结果
    public static final String BA_loadAllBehiBill_ERROR = "BA_loadAllBehiBill_ERROR";//查询逾期结清登记信息
    public static final String BA_loadSignBehiBill_ERROR = "BA_loadSignBehiBill_ERROR";//查询逾期签收信息

    /**
     * BillOwerChgeService 异常
     */
    public static final String BA_searchBillOwerChge_ERROR = "BA_searchBillOwerChge_ERROR";//查询待背书票据失败
    public static final String BA_signature_ERROR = "BA_signature_ERROR";//电子签名失败
    public static final String BA_searchBillOwerChgeByID_ERROR = "BA_searchBillOwerChgeByID_ERROR";//查询待背书票据失败
    public static final String BA_endorSign_ERROR = "BA_endorSign_ERROR";//背书登记服务失败
    public static final String BA_cancelBillOwerChge_ERROR = "BA_cancelBillOwerChge_ERROR";//撤消背书失败
    public static final String BA_InputEndorInfo_ERROR = "BA_InputEndorInfo_ERROR";//录入背书信息失败
    public static final String BA_queryEndorResult_ERROR = "BA_queryEndorResult_ERROR";//查询背书结果失败
    public static final String BA_searchBillAndEndorInfoById_ERROR = "BA_searchBillAndEndorInfoById_ERROR";//获取票据信息和对应的背书信息失败
    public static final String BA_endorseementResponse_ERROR = "BA_endorseementResponse_ERROR";//被背书回复失败

    /**
     * CancelLossService 异常
     */
    public static final String BA_quashCancelLoss_ERROR = "BA_quashCancelLoss_ERROR";//撤消提交挂失止付票据失败
    public static final String BA_createCancelLoss_ERROR = "BA_createCancelLoss_ERROR";//新增挂失止付失败
    public static final String BA_queryCancelLoss_ERROR = "BA_queryCancelLoss_ERROR";//查询挂失止付信息失败
    public static final String BA_queryAcptBill_ERROR = "BA_queryAcptBill_ERROR";//查询承兑信息失败
    public static final String BA_queryAsCancelLoss_ERROR = "BA_queryAsCancelLoss_ERROR";//查询挂失止付信息失败
    public static final String BA_searchCancelLoss_ERROR = "BA_searchCancelLoss_ERROR";//查询挂失止付票据失败
    public static final String BA_submitCancelLoss_ERROR = "BA_submitCancelLoss_ERROR";//确认提交挂失止付票据失败
    public static final String BA_updateCancelLoss_ERROR = "BA_updateCancelLoss_ERROR";//修改挂失止付失败

    /**
     * ClientAcptBachService 异常
     */
    public static final String BA_Client_CreateAcptBatch_ERROR = "BA_Client_CreateAcptBatch_ERROR";//新增承兑申请失败
    public static final String BA_Client_searchAcptBatch_ERROR = "BA_Client_searchAcptBatch_ERROR";//查询承兑申请失败
    public static final String BA_Client_searchAcptBillInfoByBatchId_ERROR = "BA_Client_searchAcptBillInfoByBatchId_ERROR";//查询承兑申请及承兑清单失败
    public static final String BA_Client_workSubmitAcptBatch_ERROR = "BA_Client_workSubmitAcptBatch_ERROR";//确认承兑申请失败
    public static final String BA_Client_updateAcptBatch_ERROR = "BA_Client_updateAcptBatch_ERROR";//修改承兑申请失败
    public static final String BA_Client_loadAcptBach_ERROR = "BA_Client_loadAcptBach_ERROR";//查询承兑申请失败
    public static final String BA_Client_searchAcptBillInfoByBatch_ERROR = "BA_Client_searchAcptBillInfoByBatch_ERROR";//查询申请下的清单信息失败
    public static final String BA_Client_acptLoadCancelAcptBatch_ERROR = "BA_Client_acptLoadCancelAcptBatch_ERROR";//查询撤销申请失败
    public static final String BA_Client_searchInfoAndBatch_ERROR = "BA_Client_searchInfoAndBatch_ERROR";//加载提交申请选择失败
    public static final String BA_Client_acptDeleteAcptBach_ERROR = "BA_Client_acptDeleteAcptBach_ERROR";//删除申请失败
    public static final String BA_Client_acptCancelAcptBatch_ERROR = "BA_Client_acptCancelAcptBatch_ERROR";//撤销申请失败
    public static final String BA_Client_acptLoadUpdateAcptBatch_ERROR = "BA_Client_acptLoadUpdateAcptBatch_ERROR";//获得满足操作状态的申请信息失败
    public static final String BA_Client_searchAllWork_ERROR = "BA_Client_searchAllWork_ERROR";//获得工作流提交选择信息失败
    public static final String BA_Client_acptLoadFirstTrialBachInfo_ERROR = "BA_Client_acptLoadFirstTrialBachInfo_ERROR";//加载承兑初审失败

    /**
     * ClientAcptBillInfoService 异常
     */
    public static final String BA_Client_createAcceptanceBillInfo_ERROR = "BA_Client_createAcceptanceBillInfo_ERROR";//新增承兑清单失败
    public static final String BA_Client_deleteAcceptanceBillInfo_ERROR = "BA_Client_deleteAcceptanceBillInfo_ERROR";//删除承兑清单失败
    public static final String BA_Client_acptUpdateDeleteBillInfo_ERROR = "BA_Client_acptUpdateDeleteBillInfo_ERROR";//修改申请—删除清单失败
    public static final String BA_Client_loadAcceptanceBillInfo_ERROR = "BA_Client_loadAcceptanceBillInfo_ERROR";//查询承兑清单失败
    public static final String BA_Client_searchAcceptanceBillInfo_ERROR = "BA_Client_loadAcceptanceBillInfo_ERROR";//查询承兑清单失败
    public static final String BA_Client_updateAcceptanceBillInfo_ERROR = "BA_Client_updateAcceptanceBillInfo_ERROR";//修改承兑清单失败
    public static final String BA_Client_searchAcceptanceBillInfoByBatch_ERROR = "BA_Client_searchAcceptanceBillInfoByBatch_ERROR";//查询申请下的明细失败
    public static final String BA_Client_updateInfoAndBachRelation_ERROR = "BA_Client_updateInfoAndBachRelation_ERROR";//解除申请下清单信息失败
    public static final String BA_Client_searchAcptBillInfoByOperStatus_ERROR = "BA_Client_updateInfoAndBachRelation_ERROR";//修改申请下添加清单失败
    public static final String BA_Client_AcptLoadUpdateAcptBatch_ERROR = "BA_Client_AcptLoadUpdateAcptBatch_ERROR";//获得满足操作状态的申请信息失败
    public static final String BA_Client_acptUpdateToSaveBill_ERROR = "BA_Client_acptUpdateToSaveBill_ERROR";//新增承兑清单失败
    public static final String BA_Client_toGoOnAddBillInfo_ERROR = "BA_Client_toGoOnAddBillInfo_ERROR";//继续添加失败
    public static final String BA_Client_acptLoadFirstTrialBillInfo_ERROR = "BA_Client_acptLoadFirstTrialBillInfo_ERROR";//获取清单信息失败
    public static final String BA_Client_loadBillInfo_ERROR = "BA_Client_loadBillInfo_ERROR";//查询批量或单笔清单失败
    public static final String BA_Client_queryAcptBillInfoById_ERROR = "BA_Client_queryAcptBillInfoById_ERROR";//查询失败
    public static final String BA_Client_queryAcptBillInfoByBachId_ERROR = "BA_Client_queryAcptBillInfoByBachId_ERROR";//查询清单信息失败

    /**
     * AcptFlowService 异常
     */
    public static final String BA_saveAcptFlowList_ERROR = "BA_saveAcptFlowList_ERROR";//保存承兑记账明细失败
    public static final String BA_saveAcptFlowBatch_ERROR = "BA_saveAcptFlowBatch_ERROR";//保存承兑记账批次失败
    public static final String BA_queryAcptFlowBatchById_ERROR = "BA_queryAcptFlowBatchById_ERROR";//查询承兑记账批次失败
    public static final String BA_queryAcptFlowListById_ERROR = "BA_queryAcptFlowListById_ERROR";//查询承兑记账明细失败
    public static final String BA_updateAcptFlowBatch_ERROR = "BA_updateAcptFlowBatch_ERROR";//更新数据失败
    public static final String BA_updateAcptFlowList_ERROR = "BA_updateAcptFlowList_ERROR";//更新数据失败
    public static final String BA_queryCountOfAccountFailure_ERROR = "BA_queryCountOfAccountFailure_ERROR";//查询承兑记账批次流水中记账失败的记录总数失败
    public static final String BA_queryAcptFlowBatchByBatchId_ERROR = "BA_queryAcptFlowBatchByBatchId_ERROR";//查询承兑记账批次流水信息失败
    public static final String BA_queryCollFlowBatchByBatchId_ERROR = "BA_queryCollFlowBatchByBatchId_ERROR";//查询承兑记账批次流水信息失败

    /**
     * AcptConsignService 异常
     */
    public static final String BA_acptconsign_getCollAcctBatch_ERROR = "BA_acptconsign_getCollAcctBatch_ERROR";//查询批次流水失败
    public static final String BA_acptconsign_getCollAcctList_ERROR = "BA_acptconsign_getCollAcctList_ERROR";//查询明细流水失败
    public static final String BA_acptconsign_saveCollAcctBatch_ERROR = "BA_acptconsign_saveCollAcctBatch_ERROR";//增加批次流水失败
    public static final String BA_acptconsign_saveCollAcctList_ERROR = "BA_acptconsign_saveCollAcctList_ERROR";//增加明细流水失败
    public static final String BA_acptconsign_updateCollAcctBatch_ERROR = "BA_acptconsign_updateCollAcctBatch_ERROR";//更新批次流水失败
    public static final String BA_acptconsign_updateCollAcctList_ERROR = "BA_acptconsign_updateCollAcctList_ERROR";//更新明细流水失败
    public static final String BA_acptconsign_getAllCollAcctListByAbId_ERROR = "BA_acptconsign_getAllCollAcctListByAbId_ERROR";//查询明细流水失败
    public static final String BA_acptconsign_countCollAcctListOfFailure_ERROR = "BA_acptconsign_countCollAcctListOfFailure_ERROR";//统计执行失败明细流水记录总数失败

    /**
     * SignCancelService 异常
     */
    public static final String BA_chongZhengSignCancel_ERROR = "BA_chongZhengSignCancel_ERROR";//冲正未用退回票据失败
    public static final String BA_createSignCancel_ERROR = "BA_createSignCancel_ERROR";//新增未用退回失败
    public static final String BA_searchSignCancel_ERROR = "BA_searchSignCancel_ERROR";//查询未用退回票据失败
    public static final String BA_submitSignCancel_ERROR = "BA_submitSignCancel_ERROR";//确认未用退回票据失败
    public static final String BA_submitSignCancelForShopFront_ERROR = "BA_submitSignCancelForShopFront_ERROR";//门面调用失败
    public static final String BA_updateSignCancel_ERROR = "BA_updateSignCancel_ERROR";//修改未用退回失败
    public static final String BA_QueryAcptBill_ERROR = "BA_QueryAcptBill_ERROR";//查询承兑清单状态失败
    public static final String BA_querySignCancel_ERROR = "BA_querySignCancel_ERROR";//查询未用退回失败
    public static final String BA_applySignCancel_ERROR = "BA_applySignCancel_ERROR";//确认未用退回票据失败

    /**
     * SubCollAccountService 异常
     */
    public static final String BA_queryWorkSubCollBatch_ERROR = "BA_queryWorkSubCollBatch_ERROR";//查询工作流中申请信息失败
    public static final String BA_SearchAllWork_ERROR = "BA_SearchAllWork_ERROR";//查询工作流中申请下清单信息失败
    public static final String BA_workConsignRgctReturn_ERROR = "BA_workConsignRgctReturn_ERROR";//托收回执失败
    public static final String BA_searchAllSub_ERROR = "BA_searchAllSub_ERROR";//查询工作流申请及清单信息失败
    public static final String BA_QueryInstanceId_ERROR = "BA_QueryInstanceId_ERROR";//查询流程ID失败

    /**
     * SubCollBatchService 异常
     */
    public static final String BA_saveSubCollBatch_One_ERROR = "BA_saveSubCollBatch_One_ERROR";//新增托收申请失败
    public static final String BA_saveSubCollBatch_Two_ERROR = "BA_saveSubCollBatch_Two_ERROR";//修改托收清单失败
    public static final String BA_createSubCollBatch_Two_ERROR = "BA_createSubCollBatch_Two_ERROR";//新增托收清单失败
    public static final String BA_deleteSubCollBatch_ERROR = "BA_deleteSubCollBatch_ERROR";//删除托收申请失败
    public static final String BA_searchSubCollBatch_ERROR = "BA_searchSubCollBatch_ERROR";//查询托收申请失败
    public static final String BA_updateSubCollBatch_ERROR = "BA_updateSubCollBatch_ERROR";//修改托收申请失败
    public static final String BA_SearchAllSub_ERROR = "BA_SearchAllSub_ERROR";//查询托收申请及申请下明细失败
    public static final String BA_searchSubList_ERROR = "BA_searchSubList_ERROR";//查询发出托收申请下清单失败
    public static final String BA_workSubmitSubCollBatch_ERROR = "BA_workSubmitSubCollBatch_ERROR";//提交托收申请失败
    public static final String BA_QueryWorkSubCollBatch_ERROR = "BA_QueryWorkSubCollBatch_ERROR";//查询工作流中申请信息失败
    public static final String BA_subcollbatch_searchAllWork_ERROR = "BA_subcollbatch_searchAllWork_ERROR";//查询工作流中申请下清单信息失败

    /**
     * SubCollClientService 异常
     */
    public static final String BA_searchSubCollClient_ERROR = "BA_searchSubCollClient_ERROR";//查询待托收票据失败
    public static final String BA_loadSubCollInfo_ERROR = "BA_loadSubCollInfo_ERROR";//查询托收信息失败
    public static final String BA_searchSubCollClientSign_ERROR = "BA_searchSubCollClientSign_ERROR";//查询选中的托收票据失败
    public static final String BA_sendSubCollById_ERROR = "BA_sendSubCollById_ERROR";//对单张票据发出托收失败
    public static final String BA_sendSubColl_ERROR = "BA_sendSubColl_ERROR";//对票据发出托收失败
    public static final String BA_cancelSubCollInfo_ERROR = "BA_cancelSubCollInfo_ERROR";//更新托收信息失败
    public static final String BA_cancelSubCollClient_ERROR = "BA_cancelSubCollClient_ERROR";//查询待撤销托收票据失败
    public static final String BA_querySubCollClient_ERROR = "BA_querySubCollClient_ERROR";//查询已发托票据失败
    public static final String BA_querySubCollInfo_ERROR = "BA_querySubCollInfo_ERROR";//查询提交托收信息失败
    public static final String BA_loadSubCollList_ERROR = "BA_loadSubCollList_ERROR";//查询托收清单失败
    public static final String BA_querySubCollInfoByStatus_ERROR = "BA_querySubCollInfoByStatus_ERROR";//查询托收信息失败
    public static final String BA_elecBillPrompt_ERROR = "BA_elecBillPrompt_ERROR";//电子票提示付款失败
    public static final String BA_elecBillPromptByID_ERROR = "BA_elecBillPromptByID_ERROR";//查询提示付款的电子票据失败
    public static final String BA_elecBillPromptSubmitByID_ERROR = "BA_elecBillPromptSubmitByID_ERROR";//提交提示付款的电子票据失败
    public static final String BA_receiveReturnReceipt_ERROR = "BA_receiveReturnReceipt_ERROR";//收到托收回执查询失败
    public static final String BA_queryDelayPaySign_ERROR = "BA_queryDelayPaySign_ERROR";//延迟收款查询失败
    public static final String BA_queryDelayPaySignByID_ERROR = "BA_queryDelayPaySignByID_ERROR";//延迟收款查询失败
    public static final String BA_queryDelayPaySignSubMitByID_ERROR = "BA_queryDelayPaySignSubMitByID_ERROR";//提交延迟收款登记失败
    public static final String BA_queryDelayPaySignResult_ERROR = "BA_queryDelayPaySignResult_ERROR";//已登记延迟收款查询失败
    public static final String BA_withdrawDelayPaySignSubMitByID_ERROR = "BA_withdrawDelayPaySignSubMitByID_ERROR";//撤销延迟收款登记失败
    public static final String BA_Signature_ERROR = "BA_Signature_ERROR";//电子签名失败
    public static final String BA_shangPiaoReceive_ERROR = "BA_shangPiaoReceive_ERROR";//商票收到托收查询失败
    public static final String BA_loadSubCollByCondition_ERROR = "BA_loadSubCollByCondition_ERROR";//查询托收对象失败

    /**
     * SubCollInOutService 异常
     */
    public static final String BA_subcollinout_queryWorkSubCollBatch_ERROR = "BA_subcollinout_queryWorkSubCollBatch_ERROR";//查询工作流中申请信息失败
    public static final String BA_subcollinout_searchAllWork_ERROR = "BA_subcollinout_searchAllWork_ERROR";//查询工作流中申请下清单信息失败
    public static final String BA_subcollinout_searchAllSub_ERROR = "BA_subcollinout_searchAllSub_ERROR";//查询工作流申请及清单信息失败
    public static final String BA_subcollinout_workPromptBillOut_ERROR = "BA_subcollinout_workPromptBillOut_ERROR";//票据提交出库失败
    public static final String BA_subcollinout_queryInstanceId_ERROR = "BA_subcollinout_queryInstanceId_ERROR";//查询流程失败
    public static final String BA_subcollinout_queryRgct_ERROR = "BA_subcollinout_queryRgct_ERROR";//查询流程失败

    /**
     * SubCollListService 异常
     */
    public static final String BA_subcolllist_searchSubCollInfo_ERROR = "BA_subcolllist_searchSubCollInfo_ERROR";//查询已提交托收信息失败
    public static final String BA_subcolllist_searchSubCollInfoCancel_ERROR = "BA_subcolllist_searchSubCollInfoCancel_ERROR";//查询已签收信息失败
    public static final String BA_subcolllist_searchSubCollAndCollSignInfo_ERROR = "BA_subcolllist_searchSubCollAndCollSignInfo_ERROR";//查询托收信息和签收信息失败
    public static final String BA_subcolllist_saveCollSignInfo_ERROR = "BA_subcolllist_saveCollSignInfo_ERROR";//保存签收意见失败
    public static final String BA_subcolllist_updateCollSignInfo_ERROR = "BA_subcolllist_updateCollSignInfo_ERROR";//修改签收意见失败
    public static final String BA_subcolllist_deleteSubCollList_ERROR = "BA_subcolllist_deleteSubCollList_ERROR";// 删除签收意见失败
    public static final String BA_subcolllist_collSubmitSign_ERROR = "BA_subcolllist_collSubmitSign_ERROR";//托收信息和签收信息做提交处理失败
    public static final String BA_subcolllist_searchSubCollList_ERROR = "BA_subcolllist_searchSubCollList_ERROR";//查询发出托收清单失败
    public static final String BA_subcolllist_querySubCollListByCond_ERROR = "BA_subcolllist_querySubCollListByCond_ERROR";//查询发出托收清单失败
    public static final String BA_subcolllist_queryWaitAccountSubCollList_ERROR = "BA_subcolllist_queryWaitAccountSubCollList_ERROR";//查询待收款记账的发出托收清单失败
    public static final String BA_subcolllist_querySignWaitAccountSubCollList_ERROR = "BA_subcolllist_querySignWaitAccountSubCollList_ERROR";//查询待记账的发出托收清单失败
    public static final String BA_subcolllist_workSubCollReceiveMoneyAccount_ERROR = "BA_subcolllist_workSubCollReceiveMoneyAccount_ERROR";//托收收款记账提交失败
    public static final String BA_subcolllist_querySignWaitInputAccountSubCollList_ERROR = "BA_subcolllist_querySignWaitInputAccountSubCollList_ERROR";//查询待入库记账的发出托收清单失败
    public static final String BA_subcolllist_workSubCollInputAccount_ERROR = "BA_subcolllist_workSubCollInputAccount_ERROR";//托收入库失败
    public static final String BA_subcolllist_workCZSubCollInputAccount_ERROR = "BA_subcolllist_workCZSubCollInputAccount_ERROR";//托收入库冲正失败
    public static final String BA_subcolllist_queryWaitInputCounteractSubCollList_ERROR = "BA_subcolllist_queryWaitInputCounteractSubCollList_ERROR";//查询待退票入库冲正的票据失败
    public static final String BA_subcolllist_listAddToApply_ERROR = "BA_subcolllist_listAddToApply_ERROR";//托收清单加入申请失败
    public static final String BA_subcolllist_querySubCollReceipt_ERROR = "BA_subcolllist_querySubCollReceipt_ERROR";//查询登记托收回执失败
    public static final String BA_subcolllist_savePromPayResult_ERROR = "BA_subcolllist_savePromPayResult_ERROR";//保存提示付款结果信息失败
    public static final String BA_subcolllist_receiveReturnReceipt_ERROR = "BA_subcolllist_receiveReturnReceipt_ERROR";//托收回执查询失败
    public static final String BA_subcolllist_updatereceiveReturn_ERROR = "BA_subcolllist_updatereceiveReturn_ERROR";//提示付款信息修改失败

    public static final String BA_subcolllist_searchSubCollBack_ERROR = "BA_subcolllist_searchSubCollBack_ERROR";//托收退票查询失败
    public static final String BA_subcolllist_queryWaitReturnBillAccountSubCollList_ERROR = "BA_subcolllist_queryWaitReturnBillAccountSubCollList_ERROR";// 查询待退票记账的发出托收清单失败
    public static final String BA_subcolllist_workReturnBillAccountSubCollList_ERROR = "BA_subcolllist_workReturnBillAccountSubCollList_ERROR";//托收退票记账失败
    public static final String BA_subcolllist_collReturnBillAccount_ERROR = "BA_subcolllist_collReturnBillAccount_ERROR";//托收退票记账服务失败
    public static final String BA_subcolllist_queryWaitReceiveMoneyAccountCounteractSubCollList_ERROR = "BA_subcolllist_queryWaitReceiveMoneyAccountCounteractSubCollList_ERROR";//查询待托收收款记账冲正的清单失败
    public static final String BA_subcolllist_displayChooseSubCollList_ERROR = "BA_subcolllist_displayChooseSubCollList_ERROR";//托收清单失败
    public static final String BA_subcolllist_receiveMoneyAccountCounteract_ERROR = "BA_subcolllist_receiveMoneyAccountCounteract_ERROR";//收款记账冲正失败
    public static final String BA_subcolllist_workReceiveCollections_ERROR = "BA_subcolllist_workReceiveCollections_ERROR";//托收收款登记失败
    public static final String BA_subcolllist_queryWaitInputSubCollList_ERROR = "BA_subcolllist_queryWaitInputSubCollList_ERROR";//查询待托收退票入库的票据失败
    public static final String BA_subcolllist_queryWaitAccountCounteractSubCollList_ERROR = "BA_subcolllist_queryWaitAccountCounteractSubCollList_ERROR";//查询待托收退票记账冲正的票据失败
    public static final String BA_subcolllist_querySubCollList_ERROR = "BA_subcolllist_querySubCollList_ERROR";//查询发出托收清单失败
    public static final String BA_subcolllist_queryOneSubCollList_ERROR = "BA_subcolllist_queryOneSubCollList_ERROR";//查询发出托收清单失败
    public static final String BA_subcolllist_listLostToApply_ERROR = "BA_subcolllist_listLostToApply_ERROR";//托收清单离开申请失败
    public static final String BA_subcolllist_loadSubCollBatch_ERROR = "BA_subcolllist_loadSubCollBatch_ERROR";//查询托收申请失败
    public static final String BA_subcolllist_searchSubCollNotify_ERROR = "BA_subcolllist_searchSubCollNotify_ERROR";//到期托收提醒失败
    public static final String BA_subcolllist_loadSubCollList_ERROR = "BA_subcolllist_loadSubCollList_ERROR";//获得发出托收清单对象失败
    public static final String BA_subcolllist_queryCollSignInfo_ERROR = "BA_subcolllist_queryCollSignInfo_ERROR";//查询托收签收信息失败
    public static final String BA_subcolllist_updateSubColl_ERROR = "BA_subcolllist_updateSubColl_ERROR";//修改托收清单失败
    public static final String BA_subcolllist_saveInputBillInfo_ERROR = "BA_subcolllist_saveInputBillInfo_ERROR";//保存票据失败
    public static final String BA_subcolllist_subCollListInfoToBillInfo_ERROR = "BA_subcolllist_subCollListInfoToBillInfo_ERROR";//复制录入失败
    public static final String BA_subcolllist_queryInstanceId_ERROR = "BA_subcolllist_queryInstanceId_ERROR";//查询流程失败

    /**
     * AcptMatuPayyService 异常
     */
    public static final String BA_CollEnrol_ERROR = "BA_CollEnrol_ERROR";//托收登记交易处理失败
    public static final String BA_CollChargeBack_ERROR = "BA_CollChargeBack_ERROR";//查询商票到期扣款失败
    public static final String BA_CollPayyAcptBill_ERROR = "BA_CollPayyAcptBill_ERROR";//付款清单查询失败失败
    public static final String BA_CollInceptAcptBill_ERROR = "BA_CollInceptAcptBill_ERROR";//保存签收意见交易处理失败
    public static final String BA_CollModifyEnroBill_ERROR = "BA_CollModifyEnroBill_ERROR";//修改托收票据失败
    public static final String BA_CollRemoveEnroBill_ERROR = "BA_CollRemoveEnroBill_ERROR";//删除托收登记失败
    public static final String BA_CollUpdateReceCollBill_ERROR = "BA_CollUpdateReceCollBill_ERROR";//修改托收登记失败
    public static final String BA_CollRemoveReceCollBill_ERROR = "BA_CollRemoveReceCollBill_ERROR";//删除托收登记失败
    public static final String BA_CollSignAcptBill_ERROR = "BA_CollSignAcptBill_ERROR";//查询票据清单失败


    //JiTiService异常
    public static final String JiTi_queryProvision_ERROR = "JiTi_queryProvision_ERROR";//查询记提失败
    public static final String JiTi_queryDetail_ERROR = "JiTi_queryDetail_ERROR";//查询记提明细失败
    public static final String JiTi_queryProd_name_ERROR = "JiTi_queryProd_name_ERROR";//查询产品类型名称失败


    public static final String DAO_ERR_CODE_DEFAULT = "DAO_ERR_001";//DAO层默认异常
    /**
     * DAO层查询异常
     */
    public static final String DAO_ERR_CODE_QUERY = "DAO_ERR_002";
    public static final String DAO_ERR_CODE_NOT_FOUND = "DAO_ERR_003";    //没有找到数据

    /**
     * FieldCodeMap映射类别
     */
    public static final int FIELD_CODE_MAPPING_TYPE = 1;    //映射Code表内的数据集
    /**
     * BD模块异常
     */
    public static final String BD_BILL_NOT_FOUND = "BD_BILL_NOT_FOUND";
    public static final String BD_BILL_NOT_FOUND2 = "BD_BILL_NOT_FOUND2";
    public static final String BD_BILL_NOT_FOUND_FORBUYBACK = "BD_BILL_NOT_FOUND_FORBUYBACK";
    public static final String BD_BILL_NOT_FOUND_FORSALEBACK = "BD_BILL_NOT_FOUND_FORSALEBACK";
    public static final String BD_APPLY_NOT_FOUND = "BD_APPLY_NOT_FOUND";
    public static final String BD_APPLY_NOT_FOUND2 = "BD_APPLY_NOT_FOUND2";
    public static final String BD_APPLY_NOT_FOUND_FORBUYBACK = "BD_APPLY_NOT_FOUND_FORBUYBACK";
    public static final String BD_APPLY_NOT_FOUND_FORSALEBACK = "BD_APPLY_NOT_FOUND_FORSALEBACK";
    public static final String BD_ACCTINFO_NOT_FOUND = "BD_ACCTINFO_NOT_FOUND";
    public static final String BD_ACCTINFO_NOT_FOUND2 = "BD_ACCTINFO_NOT_FOUND2";
    public static final String BD_DIFFERENT_PRODUCT_ERROR = "BD_DIFFERENT_PRODUCT_ERROR";
    public static final String BD_DIFFERENT_CUST_ERROR = "BD_DIFFERENT_CUST_ERROR";
    public static final String BD_DIFFERENT_DUEDATE_ERROR = "BD_DIFFERENT_DUEDATE_ERROR";
    public static final String BD_BILL_IN_FLOW = "BD_BILL_IN_FLOW";
    public static final String BD_DIFFERENT_BILLCLASS_ERROR = "BD_DIFFERENT_BILLCLASS_ERROR";
    public static final String BD_DIFFERENT_BILLTYPE_ERROR = "BD_DIFFERENT_BILLTYPE_ERROR";
    public static final String BD_OPERSTATUS_ISNOTREQUIRED_ERROR = "BD_OPERSTATUS_ISNOTREQUIRED_ERROR";
    public static final String BD_VALUES_ISNULL_ERROR = "BD_VALUES_ISNULL_ERROR";
    public static final String BD_OPERSTATUS_BILL_ERROR = "BD_OPERSTATUS_BILL_ERROR";//查无此票
    public static final String BD_OPERSTATUS_TYPEORCLASS_ERROR = "BD_OPERSTATUS_TYPEORCLASS_ERROR";//票据种类或类型不一致
    public static final String BD_OPERSTATUS_NOBILL_ERROR = "BD_OPERSTATUS_NOBILL_ERROR";//请选择票据
    public static final String BD_OPERSTATUS_DUSUBMIT_ERROR = "BD_OPERSTATUS_DUSUBMIT_ERROR";//请勿重复提交
    public static final String BD_PRODUCT_TYPE_ERROR = "BD_PRODUCT_TYPE_ERROR";//产品类型不一致
    public static final String BD_BILL_QUERRY_ERROR = "BD_BILL_QUERRY_ERROR";//未查到票据信息
    public static final String BD_COMPARE_DATE_ERROR = "BD_COMPARE_DATE_ERROR";//贴现日小于出票日
    public static final String BD_DISC_DATE_ERROR = "BD_DISC_DATE_ERROR";//贴现日不能为空
    public static final String BD_ERROR_All_BILL_ED_ANALYZEED = "BD_ERROR_All_BILL_ED_ANALYZEED";//所有的票要进行额度分析
    public static final String BD_ERROR_NOT_CACULATE_INTEREST = "BD_ERROR_NOT_CACULATE_INTEREST";//所有的票要都要计算利息
    //saleacpt
    public static final String BD_SALEACPT_DATE_ERROR = "BD_SALEACPT_DATE_ERROR";//回购到期日或转卖日与票据出票日或票面到期日冲突
    public static final String BD_SALEACPT_PRODUCT_ERROR = "BD_SALEACPT_PRODUCT_ERROR";//请选择产品
    public static final String BD_SALEACPT_CLASSORTYPE_ERROR = "BD_SALEACPT_CLASSORTYPE_ERROR";//申请批次的票据类型或种类与票据的类型或种类不一致
    public static final String BD_SALEREGACCOUNT_BILLSTATUS_ERROR = "BD_SALEREGACCOUNT_BILLSTATUS_ERROR";//票据状态异常

    //rebuyaccept
    public static final String BD_RebuyAccept_BILLNO_ERROR = "BD_RebuyAccept_BILLNO_ERROR";//录入票号是空,或小于12位
    public static final String BD_RebuyAccept_Acceptor_ERROR = "BD_RebuyAccept_Acceptor_ERROR";//承兑人不能为空
    public static final String BD_RebuyAccept_PAYEE_ERROR = "BD_RebuyAccept_PAYEE_ERROR";//收款人不能为空
    public static final String BD_RebuyAccept_PayeeBankName_ERROR = "BD_RebuyAccept_PayeeBankName_ERROR";//收款人开户行不能为空
    public static final String BD_RebuyAccept_PayeeAccount_ERROR = "BD_RebuyAccept_PayeeAccount_ERROR";//收款人账号不能为空
    public static final String BD_RebuyAccept_OutBillAccount_ERROR = "BD_RebuyAccept_OutBillAccount_ERROR";//出款人账号不能为空
    public static final String BD_RebuyAccept_OutBillPerson_ERROR = "BD_RebuyAccept_OutBillPerson_ERROR";//出款人不能为空
    public static final String BD_RebuyAccept_OutBillBank_ERROR = "BD_RebuyAccept_OutBillBank_ERROR";//出款人开户行不能为空
    public static final String BD_RebuyAccept_CheckRight_ERROR = "BD_RebuyAccept_CheckRight_ERROR";//产品授权验证不通过
    //rebuyapply
    public static final String BD_RebuyApply_RebuyDate_ERROR = "BD_RebuyApply_RebuyDate_ERROR";//买入日不能为空
    public static final String BD_RebuyApply_Rate_ERROR = "BD_RebuyApply_Rate_ERROR";//利率不能为空
    public static final String BD_RebuyApply_CustId_ERROR = "BD_RebuyApply_CustId_ERROR";//对方行不能为空
    public static final String BD_RebuyApply_IfDummy_ERROR = "BD_RebuyApply_IfDummy_ERROR";//是否移票不能为空
    public static final String BD_RebuyApply_IfInner_ERROR = "BD_RebuyApply_IfInner_ERROR";//是否系统内不能为空
    public static final String BD_RebuyApply_CustIdIfRight_ERROR = "BD_RebuyApply_CustIdIfRight_ERROR";//产生批次信息的票不是同一个银行
    public static final String BD_RebuyApply_BillTypeNoSame_ERROR = "BD_RebuyApply_BillTypeNoSame_ERROR";//产生批次信息的票不是同一个类型

    public static final String BD_RebuyApply_BillSaleApply_ERROR = "BD_RebuyApply_BillSaleApply_ERROR";//系统内的票不是同一个买入批次
    public static final String BD_RebuyApply_BillInnerNoSame_ERROR = "BD_RebuyApply_BillInnerNoSame_ERROR";//产生批次信息的票不是同为系统内或系统外
    public static final String BD_RebuyApply_BillClassNoSame_ERROR = "BD_RebuyApply_BillClassNoSame_ERROR";//产生批次信息的票不是同一个种类
    public static final String BD_RebuyApply_CustIdNoSame_ERROR = "BD_RebuyApply_CustIdNoSame_ERROR";//票据客户不同
    public static final String BD_RebuyApply_credit_STATUS_ERROR = "BD_RebuyApply_credit_STATUS_ERROR";//票据没有全部额度分析
    public static final String BD_RebuyApply_BillType_ERROR = "BD_RebuyApply_BillType_ERROR";//票据类型与选择批次类型不同
    public static final String BD_RebuyApply_CheckIfInner_ERROR = "BD_RebuyApply_CheckIfInner_ERROR";//票据是系统类型与选择批次类型不同
    public static final String BD_RebuyApply_MaxAndMinDate_ERROR = "BD_RebuyApply_MaxAndMinDate_ERROR";//转入日不能大于最小票面到期日也不能小于最大出票日
    public static final String BD_RebuyApply_rebuyDateAndMinDate_ERROR = "BD_RebuyApply_rebuyDateAndMinDate_ERROR";//回购日小于转买日或大于最小票面到期日
    public static final String BD_RebuyApply_rebuyDateAndMinDateForBid_ERROR = "BD_RebuyApply_rebuyDateAndMinDateForBid_ERROR";//双买到期日小于转买日或大于最小票面到期日

    public static final String BD_Rebuyfir_checkdate_ERROR = "BD_Rebuyfir_checkdate_ERROR";//买入日大于买入返售到期日请修改
    //RebuyFirstRetril
    public static final String BD_RebuyFirstRetril_FirstRetrilStatus_ERROR = "BD_RebuyFirstRetril_FirstRetrilStatus_ERROR";//只有提交申请后的票能进行初审初审
    public static final String BD_RebuyFirstRetril_FirstRetrilRate_ERROR = "BD_RebuyFirstRetril_FirstRetrilRate_ERROR";//只有计算利息后的的票能进行初审提交
    public static final String BD_RebuyApply_CheckrbybuyAndBidectDueDt_ERROR = "BD_RebuyApply_CheckrbybuyAndBidectDueDt_ERROR";//买入日大于双买到期日
    //RebuyApprove
    public static final String BD_RebuyApprove_ApproveStatus_ERROR = "BD_RebuyApprove_ApproveStatus_ERROR";//只有明细审核提交后的票能进行确认提交
    //rebuyAccountCheck
    public static final String BD_RebuyAccount_AccountCheck_ERROR = "BD_RebuyApprove_AccountCheck_ERROR";//只有编辑审核后的票才能计息复核
    //rebuyInput
    public static final String BD_RebuyInPut_InPutStatus_ERROR = "BD_RebuyInPut_InPutStatus_ERROR";//只有计息复核后的票才能入库
    //rebuyAccount
    public static final String BD_RebuyAccount_Status_ERROR = "BD_RebuyAccount_Status_ERROR";//只有入库后的票才能记账
    //pay
    public static final String BD_RebuyPay_Status_ERROR = "BD_RebuyPay_Status_ERROR";//只有记账后的票才能划款
    //redeem
    public static final String BD_RedeemCharge_Status_ERROR = "BD_RedeemCharge_Status_ERROR";//所有票据都要计算费用 对应 errmsg.xml added by gaoheng
    /**
     * 调用外部额度中心异常
     */
    public static final String CRED_LIMT_REMOTE_INVOKE_ERROR = "CRED_LIMT_REMOTE_INVOKE";

    public static final String BD_ERROR_BILL_TYPE = "BD_ERROR_BILL_TYPE";
    public static final String BD_ERROR_CANCEL_APPLY = "BD_ERROR_CANCEL_APPLY";
    public static final String BD_ERROR_BILL_STATUS = "BD_ERROR_BILL_STATUS";
    public static final String BD_ERROR_INTEREST_CACUED = "BD_ERROR_INTEREST_CACUED";//利息已经计算
    public static final String BD_ERROR_AUDIT_NOT_PASS = "BD_ERROR_AUDIT_NOT_PASS";//审核没有通过

    /**
     * BC异常
     */
    public static final String BC_USER_NOT_FOUND_ERROR = "BC_USER_NOT_FOUND_ERROR";//人工任务未分配用户
    public static final String BC_INTEREST_PARAM_NULL_ERROR = "BC_INTEREST_PARAM_NULL_ERROR";//服务调用传入参数有为空值
    public static final String BC_DELAYRULE_NONINIT_ERROR = "BC_DELAYRULE_NONINIT_ERROR";//系统未初始化顺延规则
    public static final String BC_CHARGERULE_NONINIT_ERROR = "BC_CHARGERULE_NONINIT_ERROR";//系统未初始化费用规则
    public static final String BC_CHARGERULE_PARAM_NULL_ERROR = "BC_CHARGERULE_PARAM_NULL_ERROR";//服务调用传入参数有为空值
    public static final String BC_PROCESSDEFINITION_ERROR = "BC_PROCESSDEFINITION_ERROR";//流程发布异常
    public static final String BC_PROCESSDEFINITION_NOT_FOUND = "BC_PROCESSDEFINITION_NOT_FOUND";//流程发布异常

    /**
     * CreditGrantBatchService
     */
    public static final String BC_addCreditGrantBatch_ERROR = "BC_addCreditGrantBatch_ERROR";//新增额度批复异常
    public static final String BC_deleteCreditGrantBatch_ERROR = "BC_deleteCreditGrantBatch_ERROR";//删除额度批复异常
    public static final String BC_getCreditGrantBatchByCondition_ERROR = "BC_getCreditGrantBatchByCondition_ERROR";//查询额度批复异常
    public static final String BC_getCreditGrantBatchById_ERROR = "BC_getCreditGrantBatchById_ERROR";//查询额度批复异常
    public static final String BC_updateCreditGrantBatch_ERROR = "BC_updateCreditGrantBatch_ERROR";//更新额度批复异常
    public static final String BC_getCustInfo_ERROR = "BC_getCustInfo_ERROR";//查询客户信息异常
    public static final String BC_getBranchInfo_ERROR = "BC_getBranchInfo_ERROR";//查询机构信息异常
    public static final String BC_findByCustNo_ERROR = "BC_findByCustNo_ERROR";//查询额度批复异常
    public static final String BC_findById_ERROR = "BC_findById_ERROR";//查询额度批复异常
    public static final String BC_save_ERROR = "BC_save_ERROR";//新增额度批复异常
    public static final String BC_updateEduBatch_ERROR = "BC_updateEduBatch_ERROR";//更新额度批复异常
    public static final String BC_findAllEduBatch_ERROR = "BC_findAllEduBatch_ERROR";//更新额度批复异常
    /**
     * CreditResumeTaskService
     */
    public static final String BC_addCredResumeTask_ERROR = "BC_addCredResumeTask_ERROR";//增加额度恢复任务异常
    public static final String BC_deleteCredResumeTask_ERROR = "BC_deleteCredResumeTask_ERROR";//增加额度恢复任务异常
    public static final String BC_findAllCredResumeTask_ERROR = "BC_findAllCredResumeTask_ERROR";//取得额度恢复任务列表异常
    public static final String BC_getCredresumeTaskById_ERROR = "BC_getCredresumeTaskById_ERROR";//取得额度恢复任务异常
    public static final String BC_updateCredResumeTask_ERROR = "BC_updateCredResumeTask_ERROR";//修改额度恢复任务异常
    public static final String BC_findStatusAndResumeDate_ERROR = "BC_findStatusAndResumeDate_ERROR";//查询额度恢复任务异常
    /**
     * CreditResumeOccasionService
     */
    public static final String BC_addCredResuOcca_ERROR = "BC_addCredResuOcca_ERROR";//增加额度恢复时机管理异常
    public static final String BC_deleteCredResuOcca_ERROR = "BC_deleteCredResuOcca_ERROR";//删除额度恢复时机管理异常
    public static final String BC_findAllCredResuOcca_ERROR = "BC_findAllCredResuOcca_ERROR";//取得额度恢复时机管理异常
    public static final String BC_getCredResuOccaById_ERROR = "BC_getCredResuOccaById_ERROR";//取得额度恢复时机管理异常
    public static final String BC_updateCredResuOcca_ERROR = "BC_updateCredResuOcca_ERROR";//修改额度恢复时机管理异常
    public static final String BC_findCredResuOccaByCond_ERROR = "BC_findCredResuOccaByCond_ERROR";//取得额度恢复时机管理异常

    /**
     * CreditGrantInfoService
     */
    public static final String BC_addCreditGrantInfo_ERROR = "BC_addCreditGrantInfo_ERROR";//新增额度批复异常
    public static final String BC_deleteCreditGrantInfo_ERROR = "BC_deleteCreditGrantInfo_ERROR";//删除额度批复异常
    public static final String BC_getCreditGrantInfoByCondition_ERROR = "BC_getCreditGrantInfoByCondition_ERROR";//查询额度批复异常
    public static final String BC_getCreditGrantInfoById_ERROR = "BC_getCreditGrantInfoById_ERROR";//查询额度批复异常
    public static final String BC_updateCreditGrantInfo_ERROR = "BC_updateCreditGrantInfo_ERROR";//更新额度信息异常
    public static final String BC_commitCreditGrantInfo_ERROR = "BC_commitCreditGrantInfo_ERROR";//提交异常
    public static final String BC_withdrawCreditGrantInfo_ERROR = "BC_withdrawCreditGrantInfo_ERROR";//撤销异常
    public static final String BC_haveDetail_ERROR = "BC_haveDetail_ERROR";//判断是否有明细信息异常
    public static final String BC_getCheckCreditGrantInfo_ERROR = "BC_getCheckCreditGrantInfo_ERROR";//查询待复核的额度信息异常
    public static final String BC_checkCreditGrantInfo_ERROR = "BC_checkCreditGrantInfo_ERROR";//复核额度信息异常
    public static final String BC_delete_ERROR = "BC_delete_ERROR";//删除额度信息异常
    public static final String BC_findAllEduPool_ERROR = "BC_findAllEduPool_ERROR";//查找票据信息失败
    public static final String BC_findByID_ERROR = "BC_findByID_ERROR";//查询额度信息失败
    public static final String BC_findEduPoolByCustNoANDType_ERROR = "BC_findEduPoolByCustNoANDType_ERROR";//查找额度信息失败
    public static final String BC_findGrantInfo_ERROR = "BC_findGrantInfo_ERROR";//查询额度批复明细信息失败
    public static final String BC_queryCaution_ERROR = "BC_queryCaution_ERROR";//保证金金额查询失败
    public static final String BC_creditgrantinfo_save_ERROR = "BC_creditgrantinfo_save_ERROR";//保存额度池对象失败
    public static final String BC_creditgrantinfo_updateDEduPool_ERROR = "BC_creditgrantinfo_updateDEduPool_ERROR";//更新额度池对象失败
    public static final String BC_creditgrantinfo_findByCustNo_ERROR = "BC_creditgrantinfo_findByCustNo_ERROR";//查询额度批复列表失败
    public static final String BC_creditgrantinfo_findAllCreditGrantInfo_ERROR = "BC_creditgrantinfo_findAllCreditGrantInfo_ERROR";//查询所有授信信息失败
    public static final String BC_creditgrantinfo_getByInfoNo_ERROR = "BC_creditgrantinfo_getByInfoNo_ERROR";//查询额度明细信息失败
    public static final String BC_creditgrantinfo_disuseCreditGrantInfo_ERROR = "BC_creditgrantinfo_disuseCreditGrantInfo_ERROR";//废弃额度信息失败
    public static final String BC_creditgrantinfo_withdrawCheckedCreditGrantInfo_ERROR = "BC_creditgrantinfo_withdrawCheckedCreditGrantInfo_ERROR";//撤销已复核生效的额度信息失败
    public static final String BC_creditgrantinfo_rebateMoneyValidityCheck_ERROR = "BC_creditgrantinfo_rebateMoneyValidityCheck_ERROR";//判断授信金额失败
    public static final String BC_creditgrantinfo_addCreditGrantInfo_ERROR = "BC_creditgrantinfo_addCreditGrantInfo_ERROR";//新增额度信息失败

    /**
     * CreditObjectService
     */
    public static final String BC_addCredObj_ERROR = "BC_addCredObj_ERROR";//增加授信使用对象失败
    public static final String BC_deleteCredObj_ERROR = "BC_deleteCredObj_ERROR";//删除授信使用对象失败
    public static final String BC_findAllCredObj_ERROR = "BC_findAllCredObj_ERROR";//取得授信使用对象列表失败
    public static final String BC_getCredObjById_ERROR = "BC_getCredObjById_ERROR";//取得授信使用对象失败
    public static final String BC_updateCredObj_ERROR = "BC_updateCredObj_ERROR";//更新授信使用信息失败
    public static final String BC_findCreObjByCredProdNo_ERROR = "BC_findCreObjByCredProdNo_ERROR";//查询授信使用对象失败

    /**
     * CreditControlLogService
     */
    public static final String BC_addCredControlLog_ERROR = "BC_addCredControlLog_ERROR";//增加额度监控记录失败
    public static final String BC_deleteCredControlLog_ERROR = "BC_deleteCredControlLog_ERROR";//删除额度监控记录失败
    public static final String BC_getAllCredControlLog_ERROR = "BC_getAllCredControlLog_ERROR";//取得额度监控记录列表失败
    public static final String BC_getCredControlLogById_ERROR = "BC_getCredControlLogById_ERROR";//取得额度监控记录信息失败
    public static final String BC_updateCredControlLog_ERROR = "BC_updateCredControlLog_ERROR";//修改额度监控记录失败
    public static final String BC_findAllEduFlow_ERROR = "BC_findAllEduFlow_ERROR";//查找授信操作流水失败
    public static final String BC_updateDEduFlow_ERROR = "BC_updateDEduFlow_ERROR";//更新额度对象值失败
    public static final String BC_ERR_CODE_CREDIT_CONTROL_LOG = "BC_ERR_CREDIT_CONTROL_LOG";    //查询额度信息

    /**
     * CreditProductRuleService *
     */
    public static final String BC_deleteCreditProductRule_ERROR = "BC_deleteCreditProductRule_ERROR";//删除授信产品规则失败
    public static final String BC_getCreditProductRuleByIDs_ERROR = "BC_getCreditProductRuleByIDs_ERROR";//获取授信产品规则失败
    public static final String BC_updateCreditProductRule_ERROR = "BC_updateCreditProductRule_ERROR";//更新授信产品规则失败
    public static final String BC_getCreditProductRuleByOperKindID_ERROR = "BC_getCreditProductRuleByOperKindID_ERROR";//获取业务类型下的授信产品规则失败

    /**
     * CreditOperRuleService*
     */
    public static final String BC_addCreditOperRule_ERROR = "BC_addCreditOperRule_ERROR";//新增授信业务规则失败
    public static final String BC_deleteCreditOperRule_ERROR = "BC_deleteCreditOperRule_ERROR";//删除授信业务规则失败
    public static final String BC_getCreditOperRuleById_ERROR = "BC_getCreditOperRuleById_ERROR";//获取授信业务规则失败
    public static final String BC_updateCreditOperRule_ERROR = "BC_updateCreditOperRule_ERROR";//更新授信业务规则失败
    public static final String BC_getCreditOperRuleByCondition_ERROR = "BC_getCreditOperRuleByCondition_ERROR";//获取授信业务规则失败
    public static final String BC_getCreditOperRuleByOperKindID_ERROR = "BC_getCreditOperRuleByOperKindID_ERROR";//获取业务类型下的授信业务规则失败

    /**
     * CreditOperKindService*
     */
    public static final String BC_deleteCreditOperKind_ERROR = "BC_deleteCreditOperKind_ERROR";//删除授信业务类型失败

    /**
     * CreditProductService*
     */
    public static final String BC_addCreditProduct_ERROR = "BC_addCreditProduct_ERROR";//新增授信品种失败
    public static final String BC_deleteCreditProduct_ERROR = "BC_deleteCreditProduct_ERROR";//删除授信品种失败
    public static final String BC_getCreditProductById_ERROR = "BC_getCreditProductById_ERROR";//获取授信品种失败
    public static final String BC_updateCreditProduct_ERROR = "BC_updateCreditProduct_ERROR";//更新授信品种失败

    /**
     * 该业务额度在使用中，不能再次进行额度分析。
     */
    public static final String BC_CREDITLIMIT_ANALY_001 = "BC_CREDITLIMIT_ANALY_001";


    /**
     * 客户数据异常 *
     */
    public static final String CUST_INFO_NOT_EXIST = "CUST_INFO_NOT_EXIST"; //客户不存在
    public static final String BRANCH_INFO_NOT_EXIST = "BRANCH_INFO_NOT_EXIST"; //机构不存在
    public static final String CUMA_INFO_NOT_EXIST = "CUMA_INFO_NOT_EXIST"; //机构不存在


    /**
     * RGSTBUYBILL异常
     */

    public static final String RGSTBUYBILL_EXCEL_ERROR_BILLNO = "票号位数应该是12位";//票号位数应该是12位
    public static final String RGSTBUYBILL_EXCEL_ERROR_BILLTYPE = "汇票种类只能是0和1.其中0:银承,1:商承";//汇票种类只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_DISCTYPE = "贴现类别只能是1至8";//贴现类别只能是1至8
    public static final String RGSTBUYBILL_EXCEL_ERROR_RATETYPE = "利率类型只能是1,30和360";//利率类型只能是1,30和360
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISLOCALCITY = "承兑银行是否异地只能是0和1.其中0:否1:是";//承兑银行是否异地只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_BUSIOPPOER = "转贴现交易对手是否异地只能是0和1.其中0:否1:是";//转贴现交易对手是否异地只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISINNER = "是否系统内只能是0和1.其中0:否1:是";//是否系统内只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISVERTUAL = "是否虚拟买卖只能是0和1.其中0:否1:是";//是否虚拟买卖只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_PAYINSTTYPE = "付息类型只能是0,1和2";//付息类型只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_IFGREENWAY = "是否先贴后查只能是0和1.其中0:否1:是";//是否先贴后查只能是0和1
    public static final String RGSTBUYBILL_EXCEL_ERROR_ACCEPTORID = "承兑人客户号不能是负数";//承兑人客户号不能是负数
    public static final String RGSTBUYBILL_EXCEL_ERROR_ADJUSTDAYS = "调整天数不能是负数";//调整天数不能是负数
    public static final String RGSTBUYBILL_EXCEL_ERROR_DISCRATEMIN = "利率不能是负数";//利率不能是负数
    public static final String RGSTBUYBILL_EXCEL_ERROR_DISCRATEMAX = "利率不能超过100";//利率不能超过100
    public static final String RGSTBUYBILL_EXCEL_ERROR_INTEREST = "利息收入不能是负数";//利息收入不能是负数
    public static final String RGSTBUYBILL_EXCEL_ERROR_BUBAPAYEECUSTID = "买方付息人客户号不能是负数";//买方付息人客户号不能是负数
    public static final String RGSTBUYBILL_EXCEL_ERROR_BUBAPAYEERATIONMIN = "买方付息比例不能是负数";//买方付息比例不能是负数
    public static final String RGSTBUYBILL_EXCEL_ERROR_BUBAPAYEERATIONMAX = "买方付息比例不能超过100";//买方付息比例不能超过100
    public static final String RGSTBUYBILL_EXCEL_ERROR_FORMAT = "买方付息人客户号格式不正确,只能是整数或空";//输入的类型不正确
    public static final String RGSTBUYBILL_EXCEL_ERROR_BUBAPAYEERATIONFORMAT = "买方付息比例格式不正确,只能是整数或空";//买方付息比例格式不正确,只能是整数或空
    public static final String RGSTBUYBILL_EXCEL_ERROR_ACCEPTORIDFORMAT = "承兑人客户号格式不正确,只能是整数或空";//承兑人客户号格式不正确,只能是整数或空
    public static final String RGSTBUYBILL_EXCEL_ERROR_ACCEPTOR = "承兑人不能为空";
    public static final String RGSTBUYBILL_EXCEL_ERROR_CUSTNO = "客户号不能为空";
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISSUER = "出票单位名称不能为空";
    public static final String RGSTBUYBILL_EXCEL_ERROR_SKDW = "收款单位名称不能为空";
    public static final String RGSTBUYBILL_EXCEL_ERROR_BILLTYPENULL = "汇票种类不能为空";
    public static final String RGSTBUYBILL_EXCEL_ERROR_DISCTYPENULL = "贴现类别不能为空";
    public static final String RGSTBUYBILL_EXCEL_ERROR_ADJUSTDAYSNULL = "调整天数不能为空";
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BNFOBILLMONEYERROR = "票面金额格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_DISCTYPEERROR = "贴现类别格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_ADJUSTDAYSERROR = "调整天数格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_DISCRATEMAXERROR = "利率格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_RATETYPEERROR = "利率类型格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISLOCALCITYERROR = "承兑银行是否异地格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_BUSIOPPOERERROR = "转贴现交易对手是否异地格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISINNERERROR = "是否系统内格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_ISVERTUALERROR = "是否虚拟买卖格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_IFGREENWAYERROR = "是否先贴后查格式不正确";
    public static final String RGSTBUYBILL_EXCEL_ERROR_PAYINSTTYPEERROR = "付息类型格式不正确";
    /**
     * RGSTDBILLSIGN异常
     */
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_JIZHANGDATE = "记帐日期格式不正确,如2009-01-01";//记帐日期格式不正确
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_PLEDGERATIOFORMAT = "保证金比例格式不正确,只能是整数或空";//保证金比例数据类型不正确
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BILLNO = "票号位数应该是12位";//票号位数应该是12位
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BILLTYPE = "票据类型只能是1和2.其中0:银票,1:商票";//票据类型只能是1和2
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_OPENTYPE = "开票保证方式只能是1至5";//开票保证方式只能是1至5
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BNFOAPPLYCUSTID = "出票人客户号不能是负数";//出票人客户号
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_PLEDGERATIO = "保证金比例不能是负数";//保证金比例
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_CUSTID = "客户号不能是负数";//客户号
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BNFOPAYEECUSTID = "收款人客户号不能是负数";//收款人客户号
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_HOLDCUSTID = "票据持有人客户号不能是负数";//票据持有人客户号
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BNFOBILLMONEY = "票面金额不能是负数";//票面金额不能是负数
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_PLEDGERATIOVALUE = "保证金比例在0-100之间";//保证金比例在0-100之间
    public static final String RGSTDBILLSIGN_EXCEL_ERROR_BNFOBILLMONEYVALUE = "票面金额最大不能超过10亿";//保证金比例在0-100之间


    /**
     * 额度管理异常信息  *
     */
    public static final String CREDIT_ERR_CODE_GRANT_INFO = "CREDIT_ERR_FIND_GRANT_INFO";
    public static final String CREDIT_ERR_CODE_FREEZEN = "CREDIT_ERR_FREEZEN";
    public static final String CREDIT_ERR_CODE_UNFREEZEN = "CREDIT_ERR_UNFREEZEN";
    public static final String CREDIT_ERR_CODE_FREEZEN_TO_USE = "CREDIT_ERR_FREEZEN_TO_USE";
    public static final String CREDIT_ERR_CODE_USED_TO_FREEZEN = "CREDIT_ERR_USED_TO_FREEZE";
    public static final String CREDIT_ERR_CODE_USE = "CREDIT_ERR_USE";
    public static final String CREDIT_ERR_CODE_RESUME = "CREDIT_ERR_RESUME";
    //保证金转结算异常
    public static final String CREDIT_ERR_CODE_TRANSFER_REBATE = "CREDIT_ERR_TRANSFER_REBATE";
    //保证金归集
    public static final String CREDIT_ERR_CODE_COLLECT_REBATE = "CREDIT_ERR_COLLECT_REBATE";
    //保证金圈存
    public static final String CREDIT_ERR_CODE_FREEZE_REBATE = "CREDIT_ERR_FREEZE_REBATE";
    //保证金解圈存
    public static final String CREDIT_ERR_CODE_UNFREEZE_REBATE = "CREDIT_ERR_UNFREEZE_REBATE";
    //记录监控记录
    public static final String CREDIT_ERR_CODE_RECORD_LOG = "CREDIT_ERR_RECORD_LOG";
    //额度查询
    public static final String CREDIT_ERR_CODE_GET_AMOUNT = "CREDIT_ERR_GET_AMOUNT";


    //代理工厂异常
    public static final String AGENT_ERR_CODE_NOT_FOUND_SERVICE = "AGENT_ERR_NOT_FOUND_SERVICE";
    /**
     * 同业交换代理异常 *
     */
    public static final String FINA_ERR_CODE_REG_ACCOUNT = "FINA_ERR_REG_ACCOUNT";
    public static final String FINA_ERR_CODE_REG_ACCOUNT_CREDIT = "FINA_ERR_REG_ACCOUNT_CREDIT";
    public static final String FINA_ERR_CODE_QUERY = "FINA_ERR_QUERY";
    public static final String FINA_ERR_CODE_PAY = "FINA_ERR_PAY";
    public static final String FINA_ERR_CODE_QUERY_RESULT = "FINA_ERR_CODE_QUERY_RESULT";
    public static final String FINA_ERR_CODE_RECEIVE_QUERY = "FINA_ERR_RECEIVE_QUERY";
    public static final String FINA_ERR_CODE_SEND_ACCEPT = "FINA_ERR_SEND_ACCEPT";
    public static final String FINA_ERR_CODE_PAY_CREDIT = "FINA_ERR_PAY_CREDIT";
    //高风险审核
    public static final String RISK_AUDIT_ERR_CODE_AUDIT = "RISK_AUDIT_ERR_CODE_AUDIT";
    public static final String RISK_AUDIT_ERR_CODE_RESULT = "RISK_AUDIT_ERR_CODE_RESULT";
    public static final String RISK_AUDIT_ERR_CODE_RESELL = "RISK_AUDIT_ERR_CODE_RESELL";
    public static final String RISK_AUDIT_ERR_CODE_NOTEXIST = "RISK_AUDIT_ERR_CODE_NOTEXIST";


    //登记中心票据提醒统计异常
    public static final String RC_ERR_CODE_STATISTIC = "RC_ERR_STATISTIC";
    public static final String REMINDER_addReminderInfo_ERROR = "REMINDER_addReminderInfo_ERROR";//增加提醒信息失败
    public static final String REMINDER_deleteReminderInfo_ERROR = "REMINDER_deleteReminderInfo_ERROR";//删除提醒信息失败
    public static final String REMINDER_findReminderInfo_ERROR = "REMINDER_findReminderInfo_ERROR";//查询提醒信息失败
    public static final String REMINDER_getReminderInfoById_ERROR = "REMINDER_getReminderInfoById_ERROR";//查询提醒信息失败
    public static final String REMINDER_updateReminderInfo_ERROR = "REMINDER_updateReminderInfo_ERROR";//修改提醒信息失败


    //记帐异常信息
    public static final String ACCOUNT_ERR_CODE_REC_REPEAT = "ACCOUNT_ERR_REC_REPEAT";
    public static final String ACCOUNT_ERR_CODE_CREDIT_REPEAT = "ACCOUNT_ERR_CREDIT_REPEAT";
    public static final String ACCOUNT_ERR_CODE_REC_CHECK = "ACCOUNT_ERR_REC_CHECK";


    //客户管理异常
    /**
     * CustmagrService
     */
    public static final String COMMON_deleteCustMagr_ERROR = "COMMON_deleteCustMagr_ERROR";//删除客户经理信息失败
    public static final String COMMON_getAllCustMagr_ERROR = "COMMON_getAllCustMagr_ERROR";//取得客户经理信息列表失败
    public static final String COMMON_getById_ERROR = "COMMON_getById_ERROR";//取得客户经理信息列表失败
    public static final String COMMON_save_ERROR = "COMMON_save_ERROR";//取得客户经理信息列表失败
    public static final String COMMON_updateCustMagr_ERROR = "COMMON_updateCustMagr_ERROR";//取得客户经理信息列表失败
    public static final String COMMON_getAllDepts_ERROR = "COMMON_getAllDepts_ERROR";//取得部门信息失败
    public static final String COMMON_getAllBranchs_ERROR = "COMMON_getAllBranchs_ERROR";//取得机构信息失败
    public static final String COMMON_getCustMagrPage_ERROR = "COMMON_getCustMagrPage_ERROR";//取得客户经理信息失败
    public static final String COMMON_getCumaInfo_ERROR = "COMMON_getCumaInfo_ERROR";//取得客户经理信息失败

    /**
     * ReCumaTeamService
     */
    public static final String COMMON_delete_ERROR = "COMMON_delete_ERROR";//删除客户经理团队信息失败
    public static final String COMMON_get_ERROR = "COMMON_get_ERROR";//取得客户经理团队信息失败
    public static final String COMMON_SAVE_ERROR = "COMMON_SAVE_ERROR";//取得客户经理团队信息失败
    public static final String COMMON_update_ERROR = "COMMON_update_ERROR";//更新客户经理团队信息失败
    public static final String COMMON_getCumaTeamId_ERROR = "COMMON_getCumaTeamId_ERROR";//更新客户经理团队信息失败

    /**
     * CumaTeamService
     */
    public static final String COMMON_CUMATEAM_delete_ERROR = "COMMON_CUMATEAM_delete_ERROR";//删除团队信息失败
    public static final String COMMON_CUMATEAM_get_ERROR = "COMMON_CUMATEAM_get_ERROR";//查询团队信息失败
    public static final String COMMON_CUMATEAM_getCumaTeamById_ERROR = "COMMON_CUMATEAM_getCumaTeamById_ERROR";//查询团队信息失败
    public static final String COMMON_CUMATEAM_save_ERROR = "COMMON_CUMATEAM_save_ERROR";//新增团队信息失败
    public static final String COMMON_CUMATEAM_update_ERROR = "COMMON_CUMATEAM_update_ERROR";//更新团队信息失败
    public static final String COMMON_CUMATEAM_getCumaTeamPages_ERROR = "COMMON_CUMATEAM_getCumaTeamPages_ERROR";//查询团队信息失败
    public static final String COMMON_CUMATEAM_getCumaTeam_ERROR = "COMMON_CUMATEAM_getCumaTeam_ERROR";//查询团队信息失败
    public static final String COMMON_CUMATEAM_getStatus_ERROR = "COMMON_CUMATEAM_getStatus_ERROR";//查询有效状态团队信息失败
    public static final String COMMON_CUMATEAM_getCumaTeamByName_ERROR = "COMMON_CUMATEAM_getCumaTeamByName_ERROR";//查询团队信息失败

    /**
     * IndivdualService
     */
    public static final String COMMON_INDIVDUAL_delete_ERROR = "COMMON_INDIVDUAL_delete_ERROR";//删除自然人信息失败
    public static final String COMMON_INDIVDUAL_get_ERROR = "COMMON_INDIVDUAL_get_ERROR";//查询自然人信息失败
    public static final String COMMON_INDIVDUAL_getById_ERROR = "COMMON_INDIVDUAL_getById_ERROR";//查询自然人信息失败
    public static final String COMMON_INDIVDUAL_save_ERROR = "COMMON_INDIVDUAL_save_ERROR";//增加自然人信息失败
    public static final String COMMON_INDIVDUAL_update_ERROR = "COMMON_INDIVDUAL_update_ERROR";//修改自然人信息失败
    public static final String COMMON_INDIVDUAL_getPages_ERROR = "COMMON_INDIVDUAL_getPages_ERROR";//查询自然人信息失败
    public static final String COMMON_INDIVDUAL_getByCertNo_ERROR = "COMMON_INDIVDUAL_getByCertNo_ERROR";//查询自然人信息失败
    public static final String COMMON_INDIVDUAL_getByCertName_ERROR = "COMMON_INDIVDUAL_getByCertName_ERROR";//查询证件号失败
    public static final String COMMON_INDIVDUAL_getByCertNameAndCertNo_ERROR = "COMMON_INDIVDUAL_getByCertNameAndCertNo_ERROR";//查询自然人信息失败

    public static final String COMMON_INDIVDUAL_CertNo_ERROR = "COMMON_INDIVDUAL_CertNo_ERROR";//有相同的证件号


    /**
     * BankService
     */
    public static final String COMMON_BANKINFO_addBank_ERROR = "COMMON_BANKINFO_addBank_ERROR";//增加银行信息失败
    public static final String COMMON_BANKINFO_deleteBank_ERROR = "COMMON_BANKINFO_deleteBank_ERROR";//删除银行信息失败
    public static final String COMMON_BANKINFO_editBank_ERROR = "COMMON_BANKINFO_editBank_ERROR";//修改银行信息失败
    public static final String COMMON_BANKINFO_getBankByBankNo_ERROR = "COMMON_BANKINFO_getBankByBankNo_ERROR";//查询银行信息失败
    public static final String COMMON_BANKINFO_getBankById_ERROR = "COMMON_BANKINFO_getBankById_ERROR";//查询银行信息失败
    public static final String COMMON_BANKINFO_getBankByName_ERROR = "COMMON_BANKINFO_getBankByName_ERROR";//查询银行信息失败
    public static final String COMMON_BANKINFO_getBankBySimpleName_ERROR = "COMMON_BANKINFO_getBankBySimpleName_ERROR";//查询银行信息失败
    public static final String COMMON_BANKINFO_getBanks_ERROR = "COMMON_BANKINFO_getBanks_ERROR";//查询银行信息失败
    public static final String COMMON_BANKINFO_findBankBySearchBean_ERROR = "COMMON_BANKINFO_findBankBySearchBean_ERROR";//查询银行信息失败

    public static final String COMMON_BANKINFO_BANKNO_ERROR = "COMMON_BANKINFO_BANKNO_ERROR";//银行号相同

    /**
     * BankCatgService
     */
    public static final String COMMON_BANKCATG_deleteBankCatg_ERROR = "COMMON_BANKCATG_deleteBankCatg_ERROR";//删除银行分类信息失败
    public static final String COMMON_BANKCATG_getBankCatg_ERROR = "COMMON_BANKCATG_getBankCatg_ERROR";//查询银行分类信息失败
    public static final String COMMON_BANKCATG_getBankCatgs_ERROR = "COMMON_BANKCATG_getBankCatgs_ERROR";//查询银行分类信息失败
    public static final String COMMON_BANKCATG_saveBankCatg_ERROR = "COMMON_BANKCATG_saveBankCatg_ERROR";//增加银行分类信息失败
    public static final String COMMON_BANKCATG_updateBankCatg_ERROR = "COMMON_BANKCATG_updateBankCatg_ERROR";//修改银行分类信息失败
    public static final String COMMON_BANKCATG_getPages_ERROR = "COMMON_BANKCATG_getPages_ERROR";//查询银行分类信息失败
    public static final String COMMON_BANKCATG_getBankByBankSort_ERROR = "COMMON_BANKCATG_getBankByBankSort_ERROR";//查询银行分类信息失败

    /**
     * CustomerService
     */
    public static final String COMMON_CUSTOMER_addCustomers_ERROR = "COMMON_CUSTOMER_addCustomers_ERROR";//增加客户信息失败
    public static final String COMMON_CUSTOMER_delCustomerInfo_ERROR = "COMMON_CUSTOMER_delCustomerInfo_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_editCustomer_ERROR = "COMMON_CUSTOMER_editCustomer_ERROR";//修改客户信息失败
    public static final String COMMON_CUSTOMER_addCustomer_ERROR = "COMMON_CUSTOMER_addCustomer_ERROR";//增加客户信息失败
    public static final String COMMON_CUSTOMER_delCustomer_ERROR = "COMMON_CUSTOMER_delCustomer_ERROR";//删除客户信息失败
    public static final String COMMON_CUSTOMER_getCustomer_ERROR = "COMMON_CUSTOMER_getCustomer_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_findCustomerByCustNo_ERROR = "COMMON_CUSTOMER_findCustomerByCustNo_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_findCustomersByCustName_ERROR = "COMMON_CUSTOMER_findCustomersByCustName_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_getCustomerBySearchBean_ERROR = "COMMON_CUSTOMER_getCustomerBySearchBean_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_getCustomerById_ERROR = "COMMON_CUSTOMER_getCustomerById_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_findAllSubCustomers_ERROR = "COMMON_CUSTOMER_findAllSubCustomers_ERROR";//取客户所有下属公司失败
    public static final String COMMON_CUSTOMER_findDirectSubCustomers_ERROR = "COMMON_CUSTOMER_findDirectSubCustomers_ERROR";//取客户直接下属公司失败
    public static final String COMMON_CUSTOMER_getCustomers_ERROR = "COMMON_CUSTOMER_getCustomers_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_findCustAddrByCustId_ERROR = "COMMON_CUSTOMER_findCustAddrByCustId_ERROR";//查询客户地址信息失
    public static final String COMMON_CUSTOMER_findCustAddrByCustNo_ERROR = "COMMON_CUSTOMER_findCustAddrByCustNo_ERROR";//查询客户地址信息失
    public static final String COMMON_CUSTOMER_getCustAttrByCustId_ERROR = "COMMON_CUSTOMER_getCustAttrByCustId_ERROR";//查询客户性质信息失败
    public static final String COMMON_CUSTOMER_findCustAttrByCustNo_ERROR = "COMMON_CUSTOMER_findCustAttrByCustNo_ERROR";//查询客户性质信息失败
    public static final String COMMON_CUSTOMER_ffindCustMangByCustId_ERROR = "COMMON_CUSTOMER_ffindCustMangByCustId_ERROR";//查询客户管理信息失败
    public static final String COMMON_CUSTOMER_findCustMgtByCustNo_ERROR = "COMMON_CUSTOMER_findCustMgtByCustNo_ERROR";//查询客户管理信息失败
    public static final String COMMON_CUSTOMER_findCustMebrByCustId_ERROR = "COMMON_CUSTOMER_findCustMebrByCustId_ERROR";//查询集团信息失败
    public static final String COMMON_CUSTOMER_findCustGrpMemByCustNo_ERROR = "COMMON_CUSTOMER_findCustGrpMemByCustNo_ERROR";//查询集团信息失败
    public static final String COMMON_CUSTOMER_getCustRegByCustId_ERROR = "COMMON_CUSTOMER_getCustRegByCustId_ERROR";//查询银行分类信息失败
    public static final String COMMON_CUSTOMER_findCustRegtByCustNo_ERROR = "COMMON_CUSTOMER_findCustRegtByCustNo_ERROR";//查询客户注册信息失败
    public static final String COMMON_CUSTOMER_getCorpCustomers_ERROR = "COMMON_CUSTOMER_getCorpCustomers_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_getFinaCustomers_ERROR = "COMMON_CUSTOMER_getFinaCustomers_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_findCustAcctByAcctNo_ERROR = "COMMON_CUSTOMER_findCustAcctByAcctNo_ERROR";//查询客户帐号相关信息失败
    public static final String COMMON_CUSTOMER_findCustAcctByCustNo_ERROR = "COMMON_CUSTOMER_findCustAcctByCustNo_ERROR";//查询客户帐号信息失败
    public static final String COMMON_CUSTOMER_findAllGrpCustInfoByCustNo_ERROR = "COMMON_CUSTOMER_findAllGrpCustInfoByCustNo_ERROR";//查询集团信息失败
    public static final String COMMON_CUSTOMER_findGrpInfoByCustNo_ERROR = "COMMON_CUSTOMER_findGrpInfoByCustNo_ERROR";//查询集团信息失败
    public static final String COMMON_CUSTOMER_getCustInfoByCustNo_ERROR = "COMMON_CUSTOMER_getCustInfoByCustNo_ERROR";//查询客户信息失败
    public static final String COMMON_CUSTOMER_getCustAcct_ERROR = "COMMON_CUSTOMER_getCustAcct_ERROR";//查询客户开户信息失败
    public static final String COMMON_CUSTOMER_addCustAcct_ERROR = "COMMON_CUSTOMER_addCustAcct_ERROR";//增加客户开户信息失败
    public static final String COMMON_CUSTOMER_deleteCustAcct_ERROR = "COMMON_CUSTOMER_deleteCustAcct_ERROR";//删除客户开户信息失败
    public static final String COMMON_CUSTOMER_editCustAcct_ERROR = "COMMON_CUSTOMER_editCustAcct_ERROR";//修改客户开户信息失败
    public static final String COMMON_CUSTOMER_getCustAcctById_ERROR = "COMMON_CUSTOMER_getCustAcctById_ERROR";//查询客户开户信息失败
    public static final String COMMON_CUSTOMER_getBranchs_ERROR = "COMMON_CUSTOMER_getBranchs_ERROR";//查询机构信息失败
    public static final String COMMON_CUSTOMER_getCustGropMebrTree_ERROR = "COMMON_CUSTOMER_getCustGropMebrTree_ERROR";//查询客户集团信息失败
    public static final String COMMON_CUSTOMER_isExistCustGroupMebrHead_ERROR = "COMMON_CUSTOMER_isExistCustGroupMebrHead_ERROR";//查询客户集团信息失败

    //打印异常
    public static final String PRINT_ERR_CODE_TEMPLATE_NOT_FOUND = "PRINT_ERR_TEMPLATE_NOT_FOUND";    //未找到打印模板
    //登记中心查询
    public static final String ESB_RGCTSEARCH_getRgctSearchBeans_ERROR = "ESB_RGCTSEARCH_getRgctSearchBeans_ERROR";    //登记中心查询失败
    public static final String ESB_RGCTSEARCH_getRgctBill_ERROR = "ESB_RGCTSEARCH_getRgctBill_ERROR";    //获取登记中心票据详细信息失败

    //提醒
    public static final String REMINDER_ERR_CONFIG = "REMINDER_ERR_CONFIG";    //提醒配置错误
    //Excel导入
    public static final String SERVICE_ERR_CODE_JIO_BEAN_PROPERTIES = "SERVICE_CODE_JIO_BEAN_PROPERTIES";    //导入对象属性配置错误
    public static final String SERVICE_ERR_CODE_JIO_EXCEL_TITLE = "SERVICE_CODE_JIO_EXCEL_TITLE";        //Excel标题读取错误
    public static final String SERVICE_ERR_CODE_JIO_EXCEL_CONTENT = "SERVICE_CODE_JIO_EXCEL_CONTENT";    //Excel内容读取错误
    public static final String SERVICE_ERR_CODE_JIO_EXCEL2BEAN = "SERVICE_CODE_JIO_EXCEL2BEAN";    //Excel数据映射错误

    //复杂查询异常
    public static final String SERVICE_ERR_CODE_COMPLEX_QUERY_GET_META = "SERVICE_ERR_COMPLEX_QUERY_GET_META";    //复杂查询异常

    public static final String BD_APPLY_NO_RISK_BILL = "BD_APPLY_NO_RISK_BILL";//所有的票要都要进行风险票据检查
    public static final String BD_INVOICENO_YERR = "BD_INVOICENO_YERR";//同一批次下发票代码相同的发票号已存在
    public static final String BD_INVOICEAMT_NERR = "BD_INVOICEAMT_NERR";//同一批次下发票代码相同的票据占用比例不足
    public static final String BD_INVOICE_NULL_ERROY = "BD_INVOICE_NULL";//发票信息为空值
    public static final String BD_CONTRACT_NULL_ERROY = "BD_CONTRACT_NULL";//合同信息为空值
    public static final String BD_INVOICE_CONTRACT = "BD_CONTRACT_INVOICE";//发票张数，与合同信息的发票张数 不相等
    public static final String BD_CONTRACT_AMOUNT_ERR = "BD_CONTRACT_AMOUNT_ERR";//合同总金额必须大于票面金额
    public static final String BD_INVOICE_AMOUNT_ERR = "BD_INVOICE_AMOUNT_ERR";//发票总金额必须大于票面金额
    public static final String BD_CONTRACT_AMOUNT_NULLERR = "BD_CONTRACT_AMOUNT_NULLERR";//合同总金额或票面金额为空
    public static final String BD_INVOICE_AMOUNT_NULLERR = "BD_INVOICE_AMOUNT_NULLERR";//发票总金额或票面金额为空
    public static final String BD_IFSEPSEC_NULLERR = "BD_IFSEPSEC_NULLERR";//是否资料后补字段为空

    //纸票登记异常
    public static final String SYS_REGISTER_TYPE_NULL = "SYS_REGISTER_TYPE_NULL";//纸票登记类型为空
    public static final String SYS_PAYMENT_TYPE_NULL = "SYS_PAYMENT_TYPE_NULL";//止付类型为空
    public static final String SYS_PAYMENT_OUT_TYPE_NULL = "SYS_PAYMENT_OUT_TYPE_NULL";//止付解除类型为空
    public static final String signerSign = "49Y3JsMTI3XzI2LE9VPUNSTCxPPUNGQ0Eg9Y3JsMTI3XzI2LE9VPUNSTCxPPUNGQ0E9Y3JsMTI3XzI2LE9VPUNSTCxPPUNGQ0EUNSTCxPPUNGQ0E9Y3JsMTI3XzI2LE9VPUNSTCxPPUNGQ0EY3JsMTI3XzI2LE9VPUNSTCxPPUNGQ0EY3JsMTI3XzI2LE9VPUNSTCxPPUNGQ0E";
    public static final String BA_DIFFERENT_BILLMONTH_E_ERROR = "BA_DIFFERENT_BILLMONTH_E_ERROR";

    //异常
    public static final String BILL_CANCEL_NOT_MESSAGE = "BILL_CANCEL_NOT_MESSAGE";//票据信息中含有非正确状态的票据{0}，不能撤销

}
