package org.nxstudio.service.socketserver.business.common;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.jdom.JDOMException;


/**
 * 解析信贷发送过来的报文
 *
 * @author ltao
 * @version 2010-5-28
 */
public class AuditDraftUtil {

    /**
     * add by taoli 2010-5-27
     * 解析信贷发过来的报文，获取报文中的批次号，存储到集合中
     *
     * @param xml XML数据格式文件
     * @return 含批次号的集合
     * @throws java.io.IOException
     * @throws org.jdom.JDOMException
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> parseAuditDraft(String draft) {
        Map<String, Object> targetMap = new HashMap<String, Object>();
        //	List<Object> target=new ArrayList<Object>();
        org.jdom.input.SAXBuilder builder = null;
        org.jdom.Document doc = null;
        InputStream in = null;
        try {
            builder = new org.jdom.input.SAXBuilder();
            String draftType = draft.substring(6, 10);
            String xml = draft.substring(draft.indexOf("#") + 1);
            targetMap.put("draftType", draftType);
            in = new ByteArrayInputStream(xml.getBytes("UTF-8"));
            doc = builder.build(in);
            org.jdom.Element root = doc.getRootElement();
            org.jdom.Element batchEl = root.getChild("main_data").getChild("Batch_No");
            if (batchEl != null) {
                targetMap.put("batchNo", batchEl.getText());
            }
            org.jdom.Element draftEl = root.getChild("main_data").getChild("Batch_Type");
            if (draftEl != null) {
                targetMap.put("batchType", draftEl.getText());
            }
            org.jdom.Element fileNameEl = root.getChild("main_data").getChild("FILENAME");
            if (fileNameEl != null) {
                targetMap.put("fileName", fileNameEl.getText());
            }

        } catch (JDOMException e1) {
            e1.printStackTrace();
            targetMap.put("exception", e1.getMessage());
        } catch (IOException e2) {
            e2.printStackTrace();
            targetMap.put("exception", e2.getMessage());
        }
        return targetMap;
    }

    /**
     * 返回已提交贴现申请报文信息
     *
     * @param discLst
     * @return
     *//*
    public static String retDiscAuditXml(List<DiscAuditBean> discLst){
		StringBuilder sb=new StringBuilder();
		sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
		.append("<msg>")
		.append("<comm_head>");
		sb.append("<rsp_no>AAAAAAA</rsp_no>");
		sb.append("<rsp_msg>").append(AuditDraftConst.DRAFT_GET_COMMON_DATA_SUCCESS).append("</rsp_msg>");
		sb.append("</comm_head>");
		sb.append("<main_data>");
			 	sb.append("<list_01>");
			 	sb.append("<row_qt>").append(discLst.size()).append("</row_qt>");
			 	sb.append("<begin_row>1</begin_row>");
		for(int i=0;i<discLst.size();i++){
			    DiscAuditBean bean=discLst.get(i);
			    sb.append("<row>");
				sb.append("<billNo>").append(bean.getAcptBillInfo().getBillNo()).append("</billNo>");
				sb.append("<billType>").append(bean.getAcptBillInfo().getBillType()).append("</billType>");
				sb.append("<acptDt>").append(bean.getAcptBillInfo().getAcptDt()).append("</acptDt>");
				sb.append("<dueDt>").append(bean.getAcptBillInfo().getDueDt()).append("</dueDt>");
				sb.append("<custType>").append(bean.getCustInfo().getCustType()).append("</custType>");
				sb.append("<custName>").append(bean.getCustInfo().getCustName()).append("</custName>");
				sb.append("<orgCode>").append(bean.getCustInfo().getOrgCode()).append("</orgCode>");
				sb.append("<remitterCustAcct>").append(bean.getAcptBillInfo().getRemitterCustAcct()).append("</remitterCustAcct>");
				sb.append("<remitterCustBankNo>").append(bean.getAcptBillInfo().getRemitterCustBankNo()).append("</remitterCustBankNo>");
				sb.append("<acceptor>").append(bean.getAcptBillInfo().getAcceptorBank()).append("</acceptor>");//承兑人名称
				sb.append("<acceptorAcct>").append(bean.getAcptBillInfo().getAcceptorAcct()).append("</acceptorAcct>");
				sb.append("<acceptorBankNo>").append(bean.getAcptBillInfo().getAcceptorBankNo()).append("</acceptorBankNo>");
				sb.append("<billMoney>").append(bean.getAcptBillInfo().getBillMoney()).append("</billMoney>");
				sb.append("<protEndors>").append(bean.getAcptBillInfo().getProtEndors()).append("</protEndors>");
				sb.append("<payee>").append(bean.getAcptBillInfo().getPayee()).append("</payee>");
				sb.append("<payeeAcct>").append(bean.getAcptBillInfo().getPayeeAcct()).append("</payeeAcct>");
				sb.append("<payeeBankNo>").append(bean.getAcptBillInfo().getPayeeBankNo()).append("</payeeBankNo>");
				sb.append("<batchNo>").append(bean.getDiscBuyApply().getDibuId()).append("</batchNo>");
				sb.append("</row>");
		}
				sb.append("</list_01>");
		sb.append("</main_data>");
		sb.append("</msg>");
		return sb.toString();
	}

	*/
 /* public static String retDiscFileAddress(String fileName){
	   StringBuilder sb=new StringBuilder();
		sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
		.append("<msg>")
		.append("<comm_head>");
		sb.append("<rsp_no>AAAAAAA</rsp_no>");
		sb.append("<rsp_msg>").append(AuditDraftConst.DRAFT_GET_COMMON_DATA_SUCCESS).append("</rsp_msg>");
		sb.append("</comm_head>");
		sb.append("<main_data>");
		sb.append("<fileName>").append(fileName).append("</fileName>");
		sb.append("</main_data>");
		sb.append("</msg>");
		return sb.toString();
  }*/
  
	/*
	 * 返回错误消息
	 */
    public static String showErrMsg(String msgType, String errorMsg) {
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        sb.append("<msg><comm_head>");
        sb.append("<rsp_no>BBBBBB</rsp_no>");
        sb.append("<rsp_msg>").append(errorMsg).append("</rsp_msg>");
        sb.append("</comm_head>");
        sb.append("<main_data>");
        sb.append("</main_data>");
        sb.append("</msg>");
        return sb.toString();
    }

    /**
     * response 信贷报文
     *
     * @param draftType
     * @param acptBatchId
     * @param fileName
     * @param rspNo
     * @param rspMsg
     * @return
     */
    public static String retAcptOrDiscDraft(String batchType, String batchNo, String tradeCode, String fileName, String rspNo, String respMsg) {
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        sb.append("<msg><comm_head>");
        sb.append("<rsp_no>").append(rspNo).append("</rsp_no>");
        sb.append("<rsp_msg>").append(respMsg).append("</rsp_msg>");
        sb.append("</comm_head>");
        sb.append("<main_data>");
        sb.append("<ACPT_BATCH_ID>").append(changeNullToStr(batchNo)).append("</ACPT_BATCH_ID>");
        sb.append("<FILENAME>").append(changeNullToStr(fileName)).append("</FILENAME>");
        sb.append("<Batch_Type>").append(changeNullToStr(batchType)).append("</Batch_Type>");
        sb.append("</main_data>");
        sb.append("</msg>");
        String draftData = sb.toString();
        String draftLength = String.valueOf(draftData.length());
        StringBuilder sb2 = new StringBuilder();
        if (draftLength.length() < 6) {
            int a = 6 - draftLength.length();
            for (int i = 0; i < a; i++) {
                sb2.append("0");
            }
            sb2.append(draftLength);
        }
        sb2.append(tradeCode).append("12345678901234568888#");
        sb2.append(draftData);
        return sb2.toString();
    }

    /**
     * 返回处理审批结果报文
     *
     * @param draftType
     * @param billNo
     * @param tradeCode
     * @param fileName
     * @param respNo
     * @param respMsg
     * @return
     */
    public static String retAcptOrDiscResultDraft(String batchType, String tradeCode, String fileName, String respNo, String respMsg) {
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        sb.append("<msg><comm_head>");
        sb.append("<rsp_no>").append(respNo).append("</rsp_no>");
        sb.append("<rsp_msg>").append(respMsg).append("</rsp_msg>");
        sb.append("</comm_head>");
        sb.append("<main_data>");
        sb.append("<FILENAME>").append(changeNullToStr(fileName)).append("</FILENAME>");
        sb.append("<Batch_Type>").append(changeNullToStr(batchType)).append("</Batch_Type>");
        sb.append("</main_data>");
        sb.append("</msg>");
        String draftData = sb.toString();
        String draftLength = String.valueOf(draftData.length());
        StringBuilder sb2 = new StringBuilder();
        if (draftLength.length() < 6) {
            int a = 6 - draftLength.length();
            for (int i = 0; i < a; i++) {
                sb2.append("0");
            }
            sb2.append(draftLength);
        }
        sb2.append(tradeCode).append("12345678901234568888#");
        sb2.append(draftData);
        return sb2.toString();
    }

    /**
     * 将返回的查询出大量已提交信息，记录到文件。
     *
     * @param fileName
     * @param xml
     * @return
     */
    public static boolean writeRetDataFile(String fileName, String xml) {
        boolean flag = false;
        FileWriter writer = null;
        File file = null;
        try {
            file = new File(fileName);
            String parent = file.getParent();
            File pFile = new File(parent);
            if (!pFile.exists()) {
                pFile.mkdirs();
            }
            writer = new FileWriter(file);
            writer.write(xml);
            writer.flush();
            writer.close();
            flag = true;
        } catch (Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    /**
     * 根据时间产生文件名
     *
     * @param prefix 文件名前缀
     * @return
     */
    public static String createFileName(String prefix) {
        String fileName = "";
        SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd_HHmmss");
        if (prefix != null && !"".equals(prefix.trim())) {
            fileName = prefix + "_" + sf.format(Calendar.getInstance().getTime());
        } else {
            fileName = sf.format(Calendar.getInstance().getTime());
        }
        return fileName;
    }

    /**
     * 上传文件
     *
     * @param ftpFileDir 文件目录
     * @param fileName   文件名
     * @return
     */
    public static boolean uploadOrDownFile(String ftpFileName, String fileName, String remoteFileName) {
        boolean result = false;
        //上传票据批量文件
//		String[] arg2 = new String[] {
//                    "C:\\WINDOWS\\system32\\cmd.exe", "/c", "start", "/min",
//                    ftpFileDir+"ftpup.bat",fileName,new java.util.Date().toString()};
        String[] arg2 = new String[]{
                "C:\\WINDOWS\\system32\\cmd.exe", "/c", "start", "/min",
                ftpFileName, fileName, remoteFileName, new java.util.Date().toString()};
        try {
            Runtime runtime = Runtime.getRuntime();
            String outInfo = ""; //执行错误的输出信息
            //启动另一个进程来执行命令
            Process proc = runtime.exec(arg2);
            //得到错误信息输出
            BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line = "";
            while ((line = br.readLine()) != null) {
                outInfo = outInfo + line + "\n";
            }
            System.out.println("outInfo:" + outInfo);
            br.close();
            //等待执行完成,如果异步这句就不需要
            proc.waitFor();
            // 检查命令是否失败

            if (proc.exitValue() != 0) {
                System.err.println("exit value = " + proc.exitValue());
            }
            proc.destroy();
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        }
        return result;
    }


    private static String changeDateToYYYYMMdd(java.util.Date date) {
        String result = "";
        SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");
        result = sf.format(date);
        return result;
    }

    private static Object changeNullToStr(Object obj) {
        if (obj == null) {
            return "";
        }
        return obj;
    }

    public static void main(String[] args) throws Exception {
/*		String xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?><msg><comm_head></comm_head><main_data>" +
		"<Batch_No>1011</Batch_No><Batch_No>102</Batch_No></main_data></msg>";
       parseCreditDraft(xml);*/
        //	writeRetDataFile("F:\\discount\\20100530\\20100530discount.xml","初审，ok");
        //	System.out.println(createFileName("discount_")+".xml");

/*		String xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?><msg><comm_head></comm_head><main_data>"+
		        "<list_01><row_qt>1</row_qt><begin_row>1</begin_row><row>";
		StringBuilder sb=new StringBuilder();
		sb.append(xml);
		sb.append("<Batch_No>").append("222").append("</Batch_No>");
		sb.append("<billNo>").append("111").append("</billNo>");
		sb.append("<auditStatus>").append("B01").append("</auditStatus>");
		sb.append("</row></list_01>");
		sb.append("</main_data></msg>");
		List beanLst=parseAuditResultDraft(sb.toString());
		for(int i=0;i<beanLst.size();i++){
			AcptAuditStatus bean=(AcptAuditStatus)beanLst.get(i);
			System.out.println(bean.getBillNo()+","+bean.getOperStatus()+","+bean.getBatchNo());
		}*/
        //System.out.println(AuditDraftUtil.showErrMsg(null, AuditDraftConst.DRAFT_GET_ACPT_AUDIT_DATA_ERROR));
/*	   String draftData=retAcptDraft("ba","113345","d:\\e.txt","AAAAAA","交易成功");
	   String draftLength=String.valueOf(draftData.length());
	   StringBuilder sb2=new StringBuilder();
	   if(draftLength.length()<6){
		    int a=6-draftLength.length();
		    for(int i=0;i<a;i++){
		    	  sb2.append("0");
		    }
		    sb2.append(draftLength);
	   }
	   System.out.println(draftData+","+draftData.length()+","+draftLength.length()+","+sb2.toString());*/

        System.out.println(changeDateToYYYYMMdd(new java.util.Date()));
        String str = "0001676G0112345678901234568888#sdfsdf";
        System.out.println(str.substring(6, 10));
        boolean result = uploadOrDownFile("G:\\BillFtpUp\\ftpUp.bat", "bd__20100603_214529.txt", "bd__20100603_214529.txt");
        System.out.println("result=" + result);
		/*List<AuditResultBean> dataLst=readAuditResultFile("G:\\BillFtpUp\\BatchFile\\ba_r.txt");
		for(AuditResultBean bean:dataLst){
			System.out.println(bean.getBatchNo()+","+bean.getBillNo()+","+bean.getResult());
		}*/
    }

}
