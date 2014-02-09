package com.microwill.framework.enums;



public enum SysLogEnum {
    	//Service异常
  	ServiceException(0001,SysLogTypeEnum.Other.getLogType(),"服务层异常"),
	//com.chinaj.scf.controller.admin.BizstoreController 后台零售商相关
	AddBizstore(1001,SysLogTypeEnum.WebAdmin.getLogType(),"新增零售商资料"),
	UpdBizstore(1002,SysLogTypeEnum.WebAdmin.getLogType(),"修改零售商资料"),
	OpenOrFreezedBizstore(1003,SysLogTypeEnum.WebAdmin.getLogType(),"开启或冻结零售商"),
	AddLevel(1004,SysLogTypeEnum.WebAdmin.getLogType(),"新增内部供应商级别"),
	UpdLevel(1005,SysLogTypeEnum.WebAdmin.getLogType(),"修改内部供应商级别"),
	AddInnerSupplyNum(1006,SysLogTypeEnum.WebAdmin.getLogType(),"新增内部供应商编号"),
	UpdInnerSupplyNum(1007,SysLogTypeEnum.WebAdmin.getLogType(),"修改内部供应商编号"),
	AddShop(1008,SysLogTypeEnum.WebAdmin.getLogType(),"新增门店"),
	UpdShop(1009,SysLogTypeEnum.WebAdmin.getLogType(),"修改门店"),
	AddGoodsType(1010,SysLogTypeEnum.WebAdmin.getLogType(),"新增品类归属"),
	UpdGoodsType(1011,SysLogTypeEnum.WebAdmin.getLogType(),"修改品类归属"),
	AddAccountRate(1012,SysLogTypeEnum.WebAdmin.getLogType(),"新增佣金系数"),
	UpdAccountRate(1013,SysLogTypeEnum.WebAdmin.getLogType(),"修改佣金系数"),
	DelAccountRate(1014,SysLogTypeEnum.WebAdmin.getLogType(),"删除佣金系数"),
	
	//com.chinaj.scf.controller.admin.SupplyController 后台供应商相关
	AddSupply(1101,SysLogTypeEnum.WebAdmin.getLogType(),"新增供应商"),
	UpdSupply(1102,SysLogTypeEnum.WebAdmin.getLogType(),"修改供应商"),
	OpenOrFreezedSupplyLoan(1103,SysLogTypeEnum.WebAdmin.getLogType(),"激活或冻结供应商贷款"),
	OpenOrFreezedSupply(1104,SysLogTypeEnum.WebAdmin.getLogType(),"开启或冻结供应商"),
	UploadForSupply(1105,SysLogTypeEnum.WebAdmin.getLogType(),"上传后台供应商图片或附件资料"),
	ResetPwdForSupply(1106,SysLogTypeEnum.WebAdmin.getLogType(),"重置供应商的密码"),
	ExportReceiveAndPayDetailForSupply(1107,SysLogTypeEnum.WebAdmin.getLogType(),"导出供应商的应收应付详情"),
	
	//com.chinaj.scf.controller.admin.SysInformController 后台系统公告 
	AddOrUpdInform(1201,SysLogTypeEnum.WebAdmin.getLogType(),"新增或修改系统公告/最新动态/平台公告"),
	DelInform(1202,SysLogTypeEnum.WebAdmin.getLogType(),"删除系统公告/最新动态/平台公告"),
	CancelSetTopInform(1203,SysLogTypeEnum.WebAdmin.getLogType(),"取消置顶系统公告/最新动态/平台公告"),
	UploadForInform(1204,SysLogTypeEnum.WebAdmin.getLogType(),"上传公告图片"),
	
	//com.chinaj.scf.controller.admin.UserController 后台用户管理 
	AddLender(1301,SysLogTypeEnum.WebAdmin.getLogType(),"新增出资人"),
	UpdLender(1302,SysLogTypeEnum.WebAdmin.getLogType(),"修改自有资金机构出资人"),
	DelLender(1303,SysLogTypeEnum.WebAdmin.getLogType(),"删除出资人"),
	OpenLender(1304,SysLogTypeEnum.WebAdmin.getLogType(),"启用出资人"),
	FreezedLender(1305,SysLogTypeEnum.WebAdmin.getLogType(),"停用出资人"),
	OpenAutoBid(1306,SysLogTypeEnum.WebAdmin.getLogType(),"开通委托自动投标"),
	AddInnerUser(1307,SysLogTypeEnum.WebAdmin.getLogType(),"新增运营人员"),
	UpdInnerUser(1308,SysLogTypeEnum.WebAdmin.getLogType(),"修改运营人员"),
	DisabledInnerUser(1309,SysLogTypeEnum.WebAdmin.getLogType(),"停用运营人员"),
	OpenInnerUser(1310,SysLogTypeEnum.WebAdmin.getLogType(),"开启运营人员"),
	DelInnerUser(1311,SysLogTypeEnum.WebAdmin.getLogType(),"删除运营人员"),
	UpdPwdForUser(1312,SysLogTypeEnum.WebAdmin.getLogType(),"修改为用户输入的密码"),
	ResetDefaultPwdForUser(1313,SysLogTypeEnum.WebAdmin.getLogType(),"重置用户密码"),
	
	//com.chinaj.scf.controller.admin.ProductController 后台贷款管理-产品
	DisableProduct(1401,SysLogTypeEnum.WebAdmin.getLogType(),"下架产品"),
	RecommendProduct(1402,SysLogTypeEnum.WebAdmin.getLogType(),"修改产品推荐"),
	AddProduct(1403,SysLogTypeEnum.WebAdmin.getLogType(),"新增产品"),
	ValidProduct(1404,SysLogTypeEnum.WebAdmin.getLogType(),"上架产品"),
	UploadAttachement(1405,SysLogTypeEnum.WebAdmin.getLogType(),"上传产品图片"),
	
	//com.chinaj.scf.controller.admin.ProjectController 后台贷款管理-项目
	AuditProject(1501,SysLogTypeEnum.WebAdmin.getLogType(),"通过项目审核"),
	RefuseProject(1502,SysLogTypeEnum.WebAdmin.getLogType(),"驳回项目审核"),
	AuditProjectForOrg(1503,SysLogTypeEnum.WebAdmin.getLogType(),"通过机构资金配置审核"),
	AuditProjectForP2P(1504,SysLogTypeEnum.WebAdmin.getLogType(),"通过P2P资金配置审核"),
	RefuseProjectFundConf(1505,SysLogTypeEnum.WebAdmin.getLogType(),"驳回资金配置审核"),
	AdvanceProject(1506,SysLogTypeEnum.WebAdmin.getLogType(),"通过放款审核"),
	DoRejectProject(1507,SysLogTypeEnum.WebAdmin.getLogType(),"驳回放款审核"),
	MessageNotify(1508,SysLogTypeEnum.WebAdmin.getLogType(),"预警短信提醒"),
	CloseWarning(1509,SysLogTypeEnum.WebAdmin.getLogType(),"关闭预警"),
	WriteOff(1510,SysLogTypeEnum.WebAdmin.getLogType(),"收款后核销坏账"),
	UpdateUrge(1511,SysLogTypeEnum.WebAdmin.getLogType(),"修改电话与上门催收状态"),
	UpdateToBaddebt(1512,SysLogTypeEnum.WebAdmin.getLogType(),"项目转为坏账"),
	ExportCompensatoryFile(1513,SysLogTypeEnum.WebAdmin.getLogType(),"导出逾期代偿项目文件"),
	ExportAllCompensatoryFile(1514,SysLogTypeEnum.WebAdmin.getLogType(),"导出全部逾期代偿项目文件"),
	ExportCompensatoryFileAgain(1515,SysLogTypeEnum.WebAdmin.getLogType(),"重新导出逾期代偿项目文件"),
	Compensate(1516,SysLogTypeEnum.WebAdmin.getLogType(),"修改代偿项目为已赔付"),
	DownLoadPast(1517,SysLogTypeEnum.WebAdmin.getLogType(),"历史贷款下载合同"),
	DoSureUpload(1518,SysLogTypeEnum.WebAdmin.getLogType(),"保理项目质押上传确认"),
	//com.chinaj.scf.controller.admin.StatisticAnalysisController 后台统计分析
	ExportLenderProfit(1601,SysLogTypeEnum.WebAdmin.getLogType(),"导出出资人收益分析"),
	ExportEnterpriseProfit(1602,SysLogTypeEnum.WebAdmin.getLogType(),"导出公司运营收益分析"),
	ExportReturnSituationAnalysis(1603,SysLogTypeEnum.WebAdmin.getLogType(),"导出还款情况统计分析"),
	ExportExceedAndBadDebtAnalysis(1604,SysLogTypeEnum.WebAdmin.getLogType(),"导出逾期坏账分析"),
	
	//com.chinaj.scf.controller.admin.ModelController 后台风控模型管理
	SaveOrUpdModel(1701,SysLogTypeEnum.WebAdmin.getLogType(),"新增或修改风控模型"),
	DelModel(1702,SysLogTypeEnum.WebAdmin.getLogType(),"删除风控模型"),
	SaveCreditLevelFirst(1703,SysLogTypeEnum.WebAdmin.getLogType(),"保存信用评级评分大项模型信息"),
	DelCreditLevelFirst(1704,SysLogTypeEnum.WebAdmin.getLogType(),"删除信用评级评分大项模型信息"),
	SaveCreditLevelSecond(1705,SysLogTypeEnum.WebAdmin.getLogType(),"保存信用评级评分细项模型信息"),
	DelCreditLevelSecond(1706,SysLogTypeEnum.WebAdmin.getLogType(),"删除信用评级评分细项模型信息"),
	SaveCreditLevelRule(1707,SysLogTypeEnum.WebAdmin.getLogType(),"保存信用评级评分规则"),
	DelCreditLevelRule(1708,SysLogTypeEnum.WebAdmin.getLogType(),"删除信用评级评分规则"),
	SaveLimitCal(1709,SysLogTypeEnum.WebAdmin.getLogType(),"保存额度测算模型信息"),
	SaveLevelScore(1710,SysLogTypeEnum.WebAdmin.getLogType(),"保存企业评分评级信息"),
	DelLevelScore(1711,SysLogTypeEnum.WebAdmin.getLogType(),"删除企业评分评级"),
	UpdatePostMonitorRule(1712,SysLogTypeEnum.WebAdmin.getLogType(),"修改贷后监控模型的规则设定"),
	AddPostMonitorRule(1713,SysLogTypeEnum.WebAdmin.getLogType(),"增加贷后监控模型的规则设定"),
	DeletePostMonitor(1714,SysLogTypeEnum.WebAdmin.getLogType(),"删除贷后监控模型的规则设定"),
	UpdateColumnCodomain(1715,SysLogTypeEnum.WebAdmin.getLogType(),"修改字段信息"),
	DeleteColumnCodomain(1716,SysLogTypeEnum.WebAdmin.getLogType(),"删除字段信息"),
	AddColumnCodomain(1717,SysLogTypeEnum.WebAdmin.getLogType(),"增加字段信息"),
	SaveFieldItem(1718,SysLogTypeEnum.WebAdmin.getLogType(),"保存值域"),
	DeleteFieldItem(1719,SysLogTypeEnum.WebAdmin.getLogType(),"删除值域信息"),
	
	//com.chinaj.scf.controller.admin.ContractController 后台合同管理
	AddContractTemplate(1801,SysLogTypeEnum.WebAdmin.getLogType(),"创建合同模板"),
	UpdContractTemplate(1802,SysLogTypeEnum.WebAdmin.getLogType(),"修改合同模板"),
	ContractDownload(1803,SysLogTypeEnum.WebAdmin.getLogType(),"合同下载"),
			
	//com.chinaj.scf.controller.admin.BaseSettingController 后台基础设置
	SaveEnterpriseProperties(1901,SysLogTypeEnum.WebAdmin.getLogType(),"新增或修改企业性质"),
	FreezeEnterprise(1902,SysLogTypeEnum.WebAdmin.getLogType(),"冻结相关企业"),
	StartEnterprise(1903,SysLogTypeEnum.WebAdmin.getLogType(),"开启相关企业"),
	DeleteSaleRate(1904,SysLogTypeEnum.WebAdmin.getLogType(),"删除销售额系数"),
	UpdateSaleRate(1905,SysLogTypeEnum.WebAdmin.getLogType(),"修改销售额系数"),
	SaveSaleRate(1906,SysLogTypeEnum.WebAdmin.getLogType(),"保存销售额系数"),
	SaveTradeInformation(1907,SysLogTypeEnum.WebAdmin.getLogType(),"保存新的行业资料"),
	DeleteTradeInformation(1908,SysLogTypeEnum.WebAdmin.getLogType(),"删除行业"),
	SaveAreaInformation(1909,SysLogTypeEnum.WebAdmin.getLogType(),"保存新的区域资料"),
	DeleteAreaInformation(1910,SysLogTypeEnum.WebAdmin.getLogType(),"删除区域资料"),
	SaveFundCostParameter(1911,SysLogTypeEnum.WebAdmin.getLogType(),"保存资金成本参数"),
	SaveCreditRatingParameter(1912,SysLogTypeEnum.WebAdmin.getLogType(),"保存风险议价参数"),
	SaveBaddebitRateParameter(1913,SysLogTypeEnum.WebAdmin.getLogType(),"保存坏账率参数"),
	SaveSettingParameter(1914,SysLogTypeEnum.WebAdmin.getLogType(),"保存通用参数"),
	SaveOverdueRateParameter(1915,SysLogTypeEnum.WebAdmin.getLogType(),"保存逾期费率参数"),
	UpDateConf(1916,SysLogTypeEnum.WebAdmin.getLogType(),"修改系统设置"),
	DeleteFundCost(1917,SysLogTypeEnum.WebAdmin.getLogType(),"删除资金成本"),
	DeleteCreditRating(1918,SysLogTypeEnum.WebAdmin.getLogType(),"删除风险议价参数"),
	DeleteBaddebitRate(1919,SysLogTypeEnum.WebAdmin.getLogType(),"删除坏账率参数"),
	DeleteSetting(1920,SysLogTypeEnum.WebAdmin.getLogType(),"删除通用参数"),
	DeleteOverdueRate(1921,SysLogTypeEnum.WebAdmin.getLogType(),"删除逾期费率参数"),
	
	//com.chinaj.scf.controller.admin.LogQueryController 后台日志查询
	OperateServe(2001,SysLogTypeEnum.WebAdmin.getLogType(),"修改服务日志状态"),
	WithholdAgain(2002,SysLogTypeEnum.WebAdmin.getLogType(),"重新放款操作"),
	
	//com.chinaj.scf.controller.admin.UserAccountController 后台资金账户管理
	UpdateFundsIncomeAccount(2101,SysLogTypeEnum.WebAdmin.getLogType(),"修改-资金收入账号"),
	DeleteFundsIncomeAccount(2102,SysLogTypeEnum.WebAdmin.getLogType(),"删除-资金收入账号"),
	AddFactoringAndOrganization(2103,SysLogTypeEnum.WebAdmin.getLogType(),"增加保理和机构出资人账户"),
	
	//com.chinaj.scf.controller.admin.PostboxVerifyController 后台p2p运营
	GeneratePostbox(2201,SysLogTypeEnum.WebAdmin.getLogType(),"生成email邀请码"),
	
	//com.chinaj.scf.controller.supplychain.BizstoreController 前台零售商
	ExpBizStoreProfitSheet(2301,SysLogTypeEnum.WebFrontForBizstore.getLogType(),"导出零售商单据"),
	ExpBizStoreProfitSheetFile(2302,SysLogTypeEnum.WebFrontForBizstore.getLogType(),"导出零售商全部佣金单据"),
	EditBizstoreInformation(2303,SysLogTypeEnum.WebFrontForBizstore.getLogType(),"编辑零售商资料"),
	SaveBizstoreInformation(2304,SysLogTypeEnum.WebFrontForBizstore.getLogType(),"保存修改后的零售商资料"),
	
	//com.chinaj.scf.controller.supplychain.SupplyController 前台供应商
	SaveSupplyAndSendEmail(2401,SysLogTypeEnum.WebFrontForSupply.getLogType(),"保存供应商信息，并发邮件"),
	ActivateEmail(2402,SysLogTypeEnum.WebFrontForSupply.getLogType(),"激活邮箱"),
	ConfirmDataAgreement(2403,SysLogTypeEnum.WebFrontForSupply.getLogType(),"供应商登陆时同意服务协议"),
	ExpDocumentsList(2404,SysLogTypeEnum.WebFrontForSupply.getLogType(),"导出供应商近期应收单据"),
	ReBindSendCode(2405,SysLogTypeEnum.WebFrontForSupply.getLogType(),"重新绑定手机号或邮箱并发送验证码"),
	UploadDataForSupply(2406,SysLogTypeEnum.WebFrontForSupply.getLogType(),"前台供应商上传资料"),
	DeleteDataForSupply(2407,SysLogTypeEnum.WebFrontForSupply.getLogType(),"前台供应商删除资料"),
	UpdateSupplyInformation(2408,SysLogTypeEnum.WebFrontForSupply.getLogType(),"前台供应商修改自身资料"),
	DataAgreement(2409,SysLogTypeEnum.WebFrontForSupply.getLogType(),"查看数据服务协议"),
	ResetSecurityProtection(2410,SysLogTypeEnum.WebFrontForSupply.getLogType(),"重置密保"),
	CheckSecurityProtection(2411,SysLogTypeEnum.WebFrontForSupply.getLogType(),"输入密保校验"),
	
	//com.chinaj.scf.controller.supplychain.SupplyloanController 前台供应商-我要贷款 
	ApplyForProduct(2501,SysLogTypeEnum.WebFrontForSupply.getLogType(),"申请自有贷款产品"),
	CancelMark(2502,SysLogTypeEnum.WebFrontForSupply.getLogType(),"知晓项目流标"),
	DownLoad(2503,SysLogTypeEnum.WebFrontForSupply.getLogType(),"供应商下载合同"),
	ApplyPinganProduct(2504,SysLogTypeEnum.WebFrontForSupply.getLogType(),"申请平安产品"),
	ApplyForProductPage(2505,SysLogTypeEnum.WebFrontForSupply.getLogType(),"贷款意向"),
	
	//com.chinaj.scf.controller.supplychain.VSSEntryController 前台供应商-VSS登录
	VssLogin(2601,SysLogTypeEnum.WebFrontForSupply.getLogType(),"供应商通过vss方式登录"),
	VssInclude(2602,SysLogTypeEnum.WebFrontForSupply.getLogType(),"引用VSS系统提供动态的脚本"),
	
	//com.chinaj.scf.controller.lender.LenderController 前台p2p
	RegisterSendCode(2701,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"P2P注册时发送手机验证码"),
	RegisterForLender(2702,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p注册"),
	EditEmailForLender(2703,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p注册过程中修改邮箱"),
	SendActivateEmailCode(2704,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"发送邮箱验激活码"),
	ActivateEmailForLender(2705,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"激活邮箱操作"),
	CaculateGatheringPlanList(2706,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"申请认购回报试算"),
	LenderInvest(2707,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"出资人认购项目"),
	SendPhoneCodeForLender(2708,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"发送短信验证码"),
	UpdatePhone(2709,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p用户修改手机号"),
	DelNotificationMessage(2710,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p用户批量删除消息"),
	UpdPasswordForLender(2711,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p用户修改密码"),
	SignAgreementForLender(2712,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p用户签订委托协议"),
	ClearCollect(2713,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"p2p收款中项目列表转到投资历史"),
	DownLoadForLender(2714,SysLogTypeEnum.WebFrontForPersonalLender.getLogType(),"合同下载"),
	
	//com.chinaj.scf.controller.pay.PayController 环迅账户管理
	CreateEnterpiseAcct(2801,SysLogTypeEnum.WebCommonFront.getLogType(),"开启银企直连账户"),
	SignTrade(2802,SysLogTypeEnum.WebCommonFront.getLogType(),"出资人委托投标"),
	TenderTrade(2803,SysLogTypeEnum.WebCommonFront.getLogType(),"出资人进行投标/认购"),
	CreateAcct(2804,SysLogTypeEnum.WebCommonFront.getLogType(),"出资人或借款人开始开环迅户"),
	Drawing(2805,SysLogTypeEnum.WebCommonFront.getLogType(),"出资人或借款人开始提现"),
	Recharge(2806,SysLogTypeEnum.WebCommonFront.getLogType(),"出资人或借款人开始充值"),
	RepaymentTrade(2807,SysLogTypeEnum.WebCommonFront.getLogType(),"借款人开始还款"),
	PayMemberFee(2808,SysLogTypeEnum.WebCommonFront.getLogType(),"开始支付会员费"),
	PayPinganBankPoundage(2809,SysLogTypeEnum.WebCommonFront.getLogType(),"开始支付第三方合作产品渠道费"),
	
	//com.chinaj.scf.controller.AttachmentController 附件操作管理
	DownLoadFile(2901,SysLogTypeEnum.WebFrontForSupply.getLogType(),"下载附件(图片，合同，其它)资料"),
	
	//com.chinaj.scf.controller.UserController 前台用户管理
	SupplyRegistration(3001,SysLogTypeEnum.WebFrontForSupply.getLogType(),"前台供应商登记"),
	SendPhoneCode(3002,SysLogTypeEnum.WebCommonFront.getLogType(),"发送短信验证码"),
	ResetPasswordForFront(3003,SysLogTypeEnum.WebCommonFront.getLogType(),"重置密码"),
	LoginForAll(3004,SysLogTypeEnum.WebCommon.getLogType(),"后台和门户登陆"),
	LogoutForAll(3005,SysLogTypeEnum.WebCommon.getLogType(),"通用登出"),
  	LoginForP2P(3006,SysLogTypeEnum.WebCommon.getLogType(),"p2p登陆");
	
	
	
	private SysLogEnum(Integer logType, Integer background, String event) {
		this.logType = logType;
		this.background = background;
		this.event = event;
	}
	
	
	/**
	 * 操作类型
	 */
	private final Integer logType;
	/**
	 * 是否后台操作
	 * <p>0-否；1-是</p>
	 */
	private final Integer background;
	/**
	 * 事件标题
	 */
	private final String event;
	
	
	public Integer getLogType() {
		return logType;
	}
	public Integer getBackground() {
		return background;
	}
	public String getEvent() {
		return event;
	}
}
