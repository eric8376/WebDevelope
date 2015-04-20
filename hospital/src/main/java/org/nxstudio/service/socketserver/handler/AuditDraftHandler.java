package org.nxstudio.service.socketserver.handler;

import org.nxstudio.service.socketserver.business.core.IAuditDraftService;
import org.nxstudio.service.socketserver.business.dao.AuditDraftLogDao;
import org.nxstudio.service.socketserver.event.EventAdapter;
import org.nxstudio.service.socketserver.integration.send.vo.test.ScoreVo;
import org.nxstudio.service.socketserver.integration.send.vo.test.TestVO;
import org.nxstudio.service.socketserver.integration.util.XMLUtil;
import org.nxstudio.service.socketserver.io.Request;
import org.nxstudio.service.socketserver.io.Response;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * 与信贷通讯服务句柄
 *
 * @author ltao
 * @version 2010-5-27
 */
@Component
public class AuditDraftHandler extends EventAdapter implements ApplicationContextAware {
    //上下文
    public static ApplicationContext applicationContext;
    public static Integer curNum = 0;
    public IAuditDraftService auditDraftService;
    private static final Log log = LogFactory.getLog(AuditDraftHandler.class);

    @Override
    public void onRead(Request request) throws Exception {
    /*	byte[] in = request.getDataInput();
        byte[] datatemp=new byte[2048];
        int circle=0;
        //XMLUtil.generateRequestMessage(request);
//        if(in.length>2048) {
//            System.out.println("接收到大于2048字节的请求");
//        }
//        if(in.length<2048) {
//            System.out.println("接收到小于2048字节的请求");
//        }
//        if(in.length==2048) {
//            System.out.println("接收到=2048字节的请求");
//        }
//        if(in.length<=0) {
//            System.out.println("接收到=2048字节的请求");
//        }
		if(in.length>0)
		{
            curNum++;
            System.out.println("第"+curNum+"次传输的数据长度:"+in.length);
            circle++;
            System.arraycopy(in, 0, datatemp,0 , 2048);
			String msg = new String(datatemp, "UTF-8");

//			log.error("做为服务端收到第"+circle+"条的数据：" + msg);
            //通过报文头判断去读取哪个xml模版
            //通过模版去转成vo

            //通过vo的报文头判断转成成什么格式的xml

//		    String retStr=AuditDraftService.process(msg);
//            String retStr=  AuditDraftUtil.retAcptOrDiscDraft("11", "22","33", "44", AuditDraftConst.DRAFT_TRADE_SUCCESS_CODE, AuditDraftConst.DRAFT_TRADE_QUERY_SUCCESS_MSG);
//            Msg msg1=    XMLUtil.XMLStringToBean(Msg.class,retStr);
//           String mg=    XMLUtil.BeanToXMLString(msg1,"UTF-8");
            String classkey=msg.substring(0,6).trim();
            msg=msg.substring(6);
            String classname= XMLUtil.generateRequestVOByName(classkey);
            if(G4Utils.isNotEmpty(classname))
            {
                Class onwClass = Class.forName(classname);
//                AuditDraftMsg testvo = (AuditDraftMsg) onwClass.newInstance();
                TestVO   testvo= (TestVO) XMLUtil.XMLStringToBean(onwClass,msg);
//                AuditDraftService.saveAuditDraftLog(testvo.getMaindata().getSex());
                Dto dto=new BaseDto();
                dto.put("req_context",testvo.getMaindata().getSex());
                auditDraftService.saveTempAudit("Demo.savetempaudit",dto);
                testvo.getMaindata().setAge(111);
              List<ScoreVo> list=  testvo.getMaindata().getScore();

                for(int i =0;i<2;i++)
                {
                    list.addAll(list);
                }
                testvo.getMaindata().setScore(list);
                  msg=    XMLUtil.BeanToXMLString(testvo,"UTF-8");
            }
//            log.error(msg);
            byte[] rsult=msg.getBytes("UTF-8");
            String len = "["+String.format("%06d", rsult.length)+"]";
            msg= len +msg;
            request.setDataInput(msg.getBytes("UTF-8"));
//			log.error("做为服务端返回的第"+circle+"条的数据：" + msg);
		}else
        {
            System.out.println("长度为0啦");
        }*/
    }

    @Override
    public void onWrite(Request request, Response response) throws Exception {
        //log.error("--------------------------------onWrite():" + new Date(System.currentTimeMillis()));
        String out = new String(request.getDataInput(), "UTF-8");
        //log.error("----------------------------------------" + out);
        // 随机休息一段时间（小于2000毫秒）
//		Thread.sleep(new java.util.Random().nextInt(2000));
        response.send(out.getBytes("UTF-8"));
    }


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
