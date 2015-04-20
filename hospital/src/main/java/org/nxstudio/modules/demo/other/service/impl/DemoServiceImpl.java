package org.nxstudio.modules.demo.other.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.demo.other.dao.DemoDao;
import org.nxstudio.modules.demo.other.service.DemoService;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientCallback;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.SQLException;

@Service("demoService")
public class DemoServiceImpl implements DemoService {

    @Autowired
    private DemoDao demoDao;

    /**
     * 插入一条收费项目
     *
     * @param pDto
     * @return
     */
    public Dto saveSfxmDomain(Dto pDto) {
        Dto outDto = new BaseDto();
        String xmid = IDHelper.getXmID();
        pDto.put("xmid", xmid);
        demoDao.insert("Demo.insertEz_sfxmDomain", pDto);
        outDto.put("xmid", xmid);
        return outDto;
    }

    /**
     * 插入一批收费项目(JDBC批处理演示)
     *
     * @param pDto
     * @return
     * @throws SQLException
     */
    public Dto batchSaveSfxmDomains(final Dto pDto) {
        Dto outDto = new BaseDto();
      /*  demoDao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
            public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
                executor.startBatch();
                for (int i = 0; i < pDto.getAsInteger("count").intValue(); i++) {
                    Dto dto = new BaseDto();
                    String xmid = IDHelper.getXmID();
                    dto.put("xmid", xmid);
                    dto.put("sfdlbm", "99");
                    executor.insert("Demo.insertEz_sfxmDomain", dto);
                }
                executor.executeBatch();
                return null;
            }
        });*/
        return outDto;
    }

    /**
     * 修改一条收费项目
     *
     * @param pDto
     * @return
     */
    public Dto updateSfxmDomain(Dto pDto) {
        Dto outDto = new BaseDto();
        demoDao.update("Demo.updatesfxm", pDto);
        return outDto;
    }

    /**
     * 删除一条收费项目
     *
     * @param pDto
     * @return
     */
    public Dto deleteSfxm(Dto pDto) {
        Dto outDto = new BaseDto();
        demoDao.delete("Demo.deleteSfxm", pDto);
        return outDto;
    }

    /**
     * 调用存储过程演示
     *
     * @return
     */
    public Dto callPrc(Dto inDto) {
        Dto prcDto = new BaseDto();
        prcDto.put("myname", inDto.getAsString("myname"));
        prcDto.put("number1", inDto.getAsBigDecimal("number1"));
        prcDto.put("number2", inDto.getAsBigDecimal("number2"));
        demoDao.callPrc("Demo.g4_prc_demo", prcDto);
        return prcDto;
    }

    /**
     * 演示声明式事务配置
     */
    public Dto doTransactionTest() {
        Dto dto = new BaseDto();
        dto.put("sxh", "BJLK1000000000935");
        dto.put("fyze", new BigDecimal(300));
        demoDao.update("Demo.updateByjsb", dto);
        // 如果在这里制造一个异常,事务将被回滚
        dto.put("fyze", new BigDecimal(300));
        demoDao.update("Demo.updateByjsb1", dto);
        Dto outDto = (Dto) demoDao.queryForObject("Demo.queryBalanceInfo", dto);
        return outDto;
    }

    /**
     * 客户端异常处理
     */
    public Dto doError() {
        Dto dto = new BaseDto();
        dto.put("sxh", "BJLK1000000000935");
        Dto outDto = (Dto) demoDao.queryForObject("Demo.queryBalanceInfo1", dto);
        return outDto;
    }

    /**
     * 保存文件上传数据
     *
     * @param pDto
     * @return
     */
    public Dto doUpload(Dto pDto) {
        pDto.put("fileid", IDHelper.getIdSequenceByKey("FILESEQUENCES"));
        demoDao.insert("Demo.insertEa_demo_uploadPo", pDto);
        return null;
    }

    /**
     * 删除文件数据
     *
     * @param pFileId
     * @return
     */
    public Dto delFile(String pFileId) {
        demoDao.delete("Demo.delFileByFileID", pFileId);
        return null;
    }


    public Dto saveStudentDomain(Dto pDto) {
        Dto outDto = new BaseDto();
        String sid = IDHelper.getXmID();

        pDto.put("sid", sid);
        demoDao.insert("Demo.insertEz_StudentDomain", pDto);
        outDto.put("sid", sid);
        return outDto;
    }

    public Dto updateStudentDomain(Dto pDto) {
        Dto outDto = new BaseDto();
        demoDao.update("Demo.updatestudent", pDto);
        return outDto;
    }


    public Dto deleteStudent(Dto pDto) {
        Dto outDto = new BaseDto();
        String[] arrChecked = pDto.getAsString("strChecked").split(",");
        for (int i = 0; i < arrChecked.length; i++) {
            outDto.put("sid", arrChecked[i]);
            demoDao.delete("Demo.deleteStudent", outDto);
        }

        return outDto;
    }

}
