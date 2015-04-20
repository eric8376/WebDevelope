/**
 * CommonAccountResponseVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 12, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo.commonaccount;


import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;

/**
 * <pre>功能描述: </pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 12, 2010
 * @since 1.0
 * 修改日期：Aug 12, 2010 林邵诚
 */
public class CommonAccountResponseVO extends CommonMessageVO {

    /**
     * UID
     */
    private static final long serialVersionUID = 314646780430931322L;

    /**
     * 总金额
     */
    private Double ZONGJE = null;

    /**
     * 总笔数
     */
    private Integer ZBISHU = null;

    /**
     * 延迟记账标识，默认为1：延迟记账，批处理
     * <pre>
     * 0:实时记账
     * 1:延迟记账,批处理
     * 2:延迟记账，守护进程
     * </pre>
     */
    private String JIZBZZ = null;

    /**
     * 备注信息
     */
    private String BEIZHU = null;

    /* (non-Javadoc)
     * @see com.leadmind.bbsp.integration.send.vo.CommonMessageVO#validate()
     */
    @Override
    public String validate() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object getMaindata() {
        return null;
    }

    /**
     * @return the zONGJE 总金额
     */
    public Double getZONGJE() {
        return ZONGJE;
    }

    /**
     * @param zongje 总金额 the zONGJE to set
     */
    public void setZONGJE(Double zongje) {
        ZONGJE = zongje;
    }

    /**
     * @return the zBISHU 总笔数
     */
    public Integer getZBISHU() {
        return ZBISHU;
    }

    /**
     * @param zbishu 总笔数 the zBISHU to set
     */
    public void setZBISHU(Integer zbishu) {
        ZBISHU = zbishu;
    }

    /**
     * @return the jIZBZZ 延迟记账标识
     */
    public String getJIZBZZ() {
        return JIZBZZ;
    }

    /**
     * @param jizbzz 延迟记账标识 the jIZBZZ to set
     */
    public void setJIZBZZ(String jizbzz) {
        JIZBZZ = jizbzz;
    }

    /**
     * @return the bEIZHU 备注信息
     */
    public String getBEIZHU() {
        return BEIZHU;
    }

    /**
     * @param beizhu 备注信息 the bEIZHU to set
     */
    public void setBEIZHU(String beizhu) {
        BEIZHU = beizhu;
    }

}
