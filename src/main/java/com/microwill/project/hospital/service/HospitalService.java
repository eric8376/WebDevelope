package com.microwill.project.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * 借款人服务
 * 
 * <pre>
 * @date 2013-7-12
 * @author 钟晓勇
 * @功能说明:
 * ...................
 * @版本更新列表
 * 修改版本: 1.0.0
 * 修改日期: 2013-7-12
 * 修  改  人: 钟晓勇
 * 修改说明: 形成初始版本
 * 复  审  人:
 * </pre>
 */
@Service
@Transactional(readOnly = true)
public class HospitalService {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void importTable(List objList, String hosp_id) {
		
		String sql = "insert into t_per_record(record_id,xm_id,hj_id,zb_id,ejzb_id,ks_id,post,user_name,check_time,result,dianping,jiance,kaohe,beizhu,hosp_id) values(uuid(),?,?,?,?,?,?,?,?,?,?,?,?,?,'"
				+ hosp_id + "')";
		System.out.println("一共导入" + objList.size() + "条记录.");
		jdbcTemplate.batchUpdate(sql, objList);
		System.out.println("导入成功");
		doUpdateDictData(hosp_id);
		System.out.println("刷新成功");

	}
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void doUpdateDictData(String hosp_id){
		
		String sql="update t_per_record t2, t_dict_table t1 set t2.ks_id=t1.dict_id where t1.dict_text=t2.ks_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='ks';";
		System.out.println("科室一共更新了"+jdbcTemplate.update(sql)+"条记录 ");
		sql="update t_per_record t2, t_dict_table t1 set t2.xm_id=t1.dict_id where t1.dict_text=t2.xm_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='xm';";
		System.out.println("项目一共更新了"+jdbcTemplate.update(sql)+"条记录 ");
		sql="update t_per_record t2, t_dict_table t1 set t2.hj_id=t1.dict_id where t1.dict_text=t2.hj_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='hj';";
		System.out.println("环节一共更新了"+jdbcTemplate.update(sql)+"条记录 ");
		sql="update t_per_record t2, t_dict_table t1 set t2.zb_id=t1.dict_id where t1.dict_text=t2.zb_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='zb';";
		System.out.println("指标一共更新了"+jdbcTemplate.update(sql)+"条记录 ");
		sql="update t_per_record t2, t_dict_table t1 set t2.ejzb_id=t1.dict_id where t1.dict_text=t2.ejzb_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='ejzb';";
		System.out.println("二级指标一共更新了"+jdbcTemplate.update(sql)+"条记录 ");
		sql="UPDATE t_per_record SET post= (CASE "
				+ "WHEN post='检验师' THEN 0 WHEN post='药学人员' THEN 1 WHEN post='放射师' THEN 2 WHEN post='实习护士' THEN 3 WHEN post='实习医生' THEN 4 "
				+ "WHEN post='医生' THEN 5 WHEN post='护士' THEN 6 WHEN post='进修医生' THEN 7 WHEN post='规培医生' THEN 8 WHEN post='工勤人员' THEN 9 WHEN post='患者' THEN 10 "
				+ "WHEN post='患者家属' THEN 11 WHEN post='就医者' THEN 12 WHEN post='其他人员' THEN 13  "
				+ "ELSE post END);";
		System.out.println("职位指标一共更新了"+jdbcTemplate.update(sql)+"条记录 ");
		
	}
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void doDeleteDictData(String hosp_id){
		String sql="delete from t_per_record where hosp_id='"+hosp_id+"'";
		int recordNum=jdbcTemplate.update(sql);
		System.out.println("一共删除了"+recordNum+"条记录 ");
	}
}
