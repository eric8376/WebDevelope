package org.nxstudio.service.socketserver.business.common;

/**
 * 与信贷通讯报文常量类
 *
 * @author ltao
 * @version 2010-5-28
 */
public class AuditDraftConst {

    public static final String DRAFT_TRADE_AUDIT_PASS = "1";

    public static final String DRAFT_TRADE_AUDIT_UNPASS = "2";

    public static final String DRAFT_TRADE_ACPT_QUERY_TRADE_CODE = "s301";//承兑查询交易码

    public static final String DRAFT_TRADE_DISC_QUERY_TRADE_CODE = "s302";//贴现查询交易码

    public static final String DRAFT_TRADE_BP_QUERY_TRADE_CODE = "s303";//质押查询交易码

    public static final String DRAFT_TRADE_ACPT_AUDIT_RESULT_TRADE_CODE = "s304";//承兑审批结果交易码

    public static final String DRAFT_TRADE_DISC_AUDIT_RESULT_TRADE_CODE = "s305";//贴现审批结果交易码

    public static final String DRAFT_TRADE_BP_AUDIT_RESULT_TRADE_CODE = "s306";//质押审批结果交易码

    public static final String DRAFT_TRADE_SUCCESS_CODE = "SUCCESS";//交易成功

    public static final String DRAFT_TRADE_QUERY_DATA_ERROR_CODE = "AUDIT_001";

    public static final String DRAFT_TRADE_NOT_FOUND_DATA_CODE = "AUDIT_002";

    public static final String DRAFT_TRADE_PARSER_ERROR_CODE = "AUDIT_003";

    public static final String DRAFT_TRADE_WRITE_FILE_ERROR_CODE = "AUDIT_004";

    public static final String DRAFT_TRADE_UPLOAD_FILE_ERROR_CODE = "AUDIT_005";

    public static final String DRAFT_TRADE_DOWN_FILE_ERROR_CODE = "AUDIT_006";

    public static final String DRAFT_TRADE_UPDATE_DATA_ERROR_CODE = "AUDIT_007";

    public static final String DRAFT_TRADE_QUERY_SUCCESS_MSG = "查询数据成功";

    public static final String DRAFT_TRADE_NOT_FOUND_DATA_MSG = "没有查询到相关数据";

    public static final String DRAFT_TRADE_PARSER_ERROR_MSG = "解析报文异常";

    public static final String DRAFT_TRADE_UPLOAD_FILE_ERROR_MSG = "上传文件异常";

    public static final String DRAFT_TRADE_WRITE_FILE_ERROR_MSG = "写文件异常";

    public static final String DRAFT_TRADE_QUERY_DATA_ERROR_MSG = "查询数据异常";

    public static final String DRAFT_TRADE_DOWN_FILE_ERROR_MSG = "下载文件异常";

    public static final String DRAFT_TRADE_UPDATE_DATA_ERROR_MSG = "更新数据异常";

    public static final String DRAFT_TRADE_UPDATE_DATA_SUCCESS = "更新数据成功";

    public static final String DRAFT_TRADE_AUDIT_RESULT_SPLIT_STR = "|";//审批结果，数据分割符

    public static final int DRAFT_QUERY_BATCH_SIZE = 10;

    public static final String DRAFT_AUDIT_RESULT_Desc_1 = "审批中";

    public static final String DRAFT_AUDIT_RESULT_Desc_2 = "审批已通过";

    public static final String DRAFT_AUDIT_RESULT_Desc_3 = "审批未通过";

    public static final String DRAFT_AUDIT_RESULT_Desc_4 = "不需要审批";

    public static final String DRAFT_AUDIT_RESULT_CODE_1 = "";

    public static final String DRAFT_AUDIT_RESULT_CODE_2 = "1";

    public static final String DRAFT_AUDIT_RESULT_CODE_3 = "2";

    public static final String DRAFT_AUDIT_RESULT_CODE_4 = "3";//不需要审批
}
