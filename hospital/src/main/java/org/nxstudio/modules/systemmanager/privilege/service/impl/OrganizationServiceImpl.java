package org.nxstudio.modules.systemmanager.privilege.service.impl;

import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Eadept;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemmanager.privilege.dao.OrganizationDao;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IdGenerator;
import org.nxstudio.util.json.JsonHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * 组织机构模型业务实现类
 *
 * @author XiongChun
 * @since 2010-01-13
 */
@Service("organizationService")
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationDao organizationDao;

    /**
     * 获取用户信息
     *
     * @param pDto
     * @return
     */
    public Dto getUserInfo(Dto pDto) {
        Dto outDto = new BaseDto();
        pDto.put("lock", ArmConstants.LOCK_N);
        pDto.put("enabled", ArmConstants.ENABLED_Y);
        UserInfoVo userInfo = (UserInfoVo) organizationDao.queryForObject("Organization.getUserInfo", pDto);
        outDto.put("userInfo", userInfo);
        return outDto;
    }

    /**
     * 查询部门信息生成部门树
     *
     * @param pDto
     * @return
     */
    public Dto queryDeptItems(Dto pDto) {
        Dto outDto = new BaseDto();
        List deptList = organizationDao.queryForList("Organization.queryDeptsForManage", pDto);
        Dto deptDto = new BaseDto();
        for (int i = 0; i < deptList.size(); i++) {
            deptDto = (BaseDto) deptList.get(i);
            if (deptDto.getAsString("leaf").equals(ArmConstants.LEAF_Y))
                deptDto.put("leaf", true);
            else
                deptDto.put("leaf", false);
//			if (deptDto.getAsString("deptid").length() == 6)
//				deptDto.put("expanded", true);
        }
        pDto.put("listData",deptList);
        outDto.put("jsonString", JsonHelper.encodeObject2Json(deptList));
        return outDto;
    }

    /**
     * 保存部门
     *
     * @param pDto
     * @return
     */
    public synchronized Dto saveDeptItem(Dto pDto) {
        //部门重复性校验
        List<Dto> deptlist = organizationDao.CheckDeptUnion(pDto);
        if (G4Utils.isNotEmpty(deptlist)) {
            if (deptlist.size() == 1) {
                Dto deptdto = deptlist.get(0);
                pDto.putAll(deptdto);
                pDto.put("error", "部门已存在。无法添加部门");
            } else {
                pDto.put("error", "存在多个部门。无法添加部门");
                pDto.put("errorflag", true);
            }
            return null;
        }
        IdGenerator idGenerator = new IdGenerator();
        String deptid = idGenerator.getDeptIdGenerator(pDto.getAsString("parentid"));
        pDto.put("deptid", deptid);
        pDto.put("leaf", ArmConstants.LEAF_Y);
        // MYSQL下int类型字段不能插入空字符
        pDto.put("sortno",
                G4Utils.isEmpty(pDto.getAsString("sortno")) ? Integer.valueOf("0") : pDto.getAsString("sortno"));
        pDto.put("enabled", ArmConstants.ENABLED_Y);
        organizationDao.insert("Organization.saveDeptItem", pDto);
        Dto updateDto = new BaseDto();
        updateDto.put("deptid", pDto.getAsString("parentid"));
        updateDto.put("leaf", ArmConstants.LEAF_N);
        organizationDao.update("Organization.updateLeafFieldInEaDept", updateDto);
        return null;
    }

    /**
     * 修改部门
     *
     * @param pDto
     * @return
     */
    public Dto updateDeptItem(Dto pDto) {
        if (G4Utils.isEmpty(pDto.getAsString("sortno"))) {
            pDto.put("sortno", "0");
        }
        if (pDto.getAsString("parentid").equals(pDto.getAsString("parentid_old"))) {
            pDto.remove("parentid");
            organizationDao.update("Organization.updateDeptItem", pDto);
        } else {
            organizationDao.update("Organization.updateEadeptItem", pDto);
            saveDeptItem(pDto);
            pDto.put("parentid", pDto.getAsString("parentid_old"));
            updateLeafOfDeletedParent(pDto);
        }
        return null;
    }

    /**
     * 调整被删除部门的直系父级部门的Leaf属性
     *
     * @param pDto
     */
    private void updateLeafOfDeletedParent(Dto pDto) {
        String parentid = pDto.getAsString("parentid");
        pDto.put("deptid", parentid);
        Integer countInteger = (Integer) organizationDao.queryForObject("Organization.prepareChangeLeafOfDeletedParentForEadept", pDto);
        if (countInteger.intValue() == 0) {
            pDto.put("leaf", ArmConstants.LEAF_Y);
        } else {
            pDto.put("leaf", ArmConstants.LEAF_N);
        }
        organizationDao.update("Organization.updateLeafFieldInEaDept", pDto);
    }

    /**
     * 删除部门项
     *
     * @param pDto
     * @return
     */
    public Dto deleteDeptItems(Dto pDto) {
        Dto dto = new BaseDto();
        if (pDto.getAsString("type").equals("1")) {
            // 列表复选删除
            String[] arrChecked = pDto.getAsString("strChecked").split(",");
            for (int i = 0; i < arrChecked.length; i++) {
                dto.put("deptid", arrChecked[i]);
                deleteDept(dto);
            }
        } else {
            // 部门树右键删除
            dto.put("deptid", pDto.getAsString("deptid"));
            deleteDept(dto);
        }
        return null;
    }

    @Override
    public void deleteDeptByHql(Dto pDto) {
        Eadept eadept = organizationDao.get(Eadept.class, pDto.getAsString("deptid"));
        if (G4Utils.isNotEmpty(eadept)) {
            if (!eadept.getDeptname().equals("待验证用户部门")) {
                organizationDao.deleteObject(eadept);
            }

        }
    }

    /**
     * 删除部门 类内部调用
     *
     * @param pDto
     */
    private void deleteDept(Dto pDto) {
        Dto changeLeafDto = new BaseDto();
        Dto tempDto = (BaseDto) organizationDao.queryForObject("Organization.queryDeptItemsByDto", pDto);
        if (G4Utils.isNotEmpty(tempDto)) {
            changeLeafDto.put("parentid", tempDto.getAsString("parentid"));
        }
        organizationDao.delete("Organization.deleteEaroleAuthorizeInDeptManage", pDto);
        organizationDao.delete("Organization.deleteEaroleInDeptManage", pDto);
        organizationDao.delete("Organization.deleteEauserauthorizeInDeptManage", pDto);
        organizationDao.delete("Organization.deleteEauserauthorizeInDeptManage2", pDto);
        organizationDao.delete("Organization.deleteEausermenumapInDeptManage", pDto);
        organizationDao.delete("Organization.deleteEausersubinfoInDeptManage", pDto);
        organizationDao.delete("Organization.deleteEausermenumapInDeptManage", pDto);
        organizationDao.delete("Organization.deleteEarolemenumapInDeptManage", pDto);
        organizationDao.update("Organization.updateEauserInDeptManage", pDto);
        organizationDao.update("Organization.updateEadeptItem", pDto);
        if (G4Utils.isNotEmpty(tempDto)) {
            updateLeafOfDeletedParent(changeLeafDto);
        }
    }

    /**
     * 根据用户所属部门编号查询部门对象<br>
     * 用于构造组织机构树的根节点
     *
     * @param
     * @return
     */
    public Dto queryDeptinfoByDeptid(Dto pDto) {
        Dto outDto = new BaseDto();
        outDto.putAll((BaseDto) organizationDao.queryForObject("Organization.queryDeptinfoByDeptid", pDto));
        outDto.put("success", true);
        return outDto;
    }

    /**
     * 保存用户主题信息
     *
     * @param pDto
     */
    public Dto saveUserTheme(Dto pDto) {
        Dto outDto = new BaseDto();
        organizationDao.update("Organization.saveUserTheme", pDto);
        outDto.put("success", true);
        return outDto;
    }

    /**
     * 保存部门管理
     *
     * @param pDto
     * @return
     */
    public void saveDeptManager(Dto pDto) {
        Dto inDto = null;
        List<Dto> list = organizationDao.queryForList("Organization.queryDeptManagerByDeptId", pDto);
        int count = list.size();
        for (int i = 0; i < count; i++) {
            inDto = list.get(i);
            if (inDto.getAsString("roletype").equals("1")) {
                if (!pDto.getAsString("directorid").equals(inDto.getAsString("userid"))) {
                    inDto.put("userid", pDto.getAsString("directorid"));
                    organizationDao.update("Organization.updateDeptManager", inDto);
                    pDto.remove("directorid");
                } else if (!pDto.containsKey("directorid") || "".equals(pDto.getAsString("directorid"))) {
                    organizationDao.delete("Organization.deleteDeptManager", inDto);
                } else if (pDto.getAsString("directorid").equals(inDto.getAsString("userid"))) {
                    pDto.remove("directorid");
                }
            } else if (inDto.getAsString("roletype").equals("2")) {
                if (!pDto.getAsString("usualdirectorid").equals(inDto.getAsString("userid"))) {
                    inDto.put("userid", pDto.getAsString("usualdirectorid"));
                    organizationDao.update("Organization.updateDeptManager", inDto);
                    pDto.remove("usualdirectorid");
                } else if (!pDto.containsKey("usualdirectorid") || "".equals(pDto.getAsString("usualdirectorid"))) {
                    organizationDao.delete("Organization.deleteDeptManager", inDto);
                    pDto.remove("usualdirectorid");
                } else if (pDto.getAsString("usualdirectorid").equals(inDto.getAsString("userid"))) {
                    pDto.remove("usualdirectorid");
                }
            }
        }
        if (pDto.containsKey("directorid") && pDto.getAsString("directorid").length() > 0) {
            pDto.put("userid", pDto.getAsString("directorid"));
            pDto.put("roletype", "1");
            organizationDao.insert("Organization.saveDeptManager", pDto);
        }
        if (pDto.containsKey("usualdirectorid") && pDto.getAsString("usualdirectorid").length() > 0) {
            pDto.put("userid", pDto.getAsString("usualdirectorid"));
            pDto.put("roletype", "2");
            organizationDao.insert("Organization.saveDeptManager", pDto);
        }
    }

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByUserId(Dto inDto, boolean isTManager) throws SQLException {
        inDto.put("start", 0);
        inDto.put("limit", 9999999);
        List<Dto> list = organizationDao.queryForPage("Organization.queryDeptManagerByUserId", inDto);
        Dto dto = packageToDto(list);
        boolean isManager = false;
        if (isTManager && dto.containsKey("directorid") && inDto.getAsString("userid").equals(dto.getAsString("directorid"))) {
            isManager = true;
        }
        if (isTManager && dto.containsKey("usualdirectorid") && inDto.getAsString("userid").equals(dto.getAsString("usualdirectorid"))) {
            isManager = true;
        }
        if (isManager || list == null || list.size() == 0) {
            List<Dto> users = organizationDao.queryForList("User.queryDeptInfoByUser", inDto);
            if (users != null && users.size() > 0) {
                String deptId = users.get(0).getAsString("parentid");
                if (!isTManager) {
                    deptId = users.get(0).getAsString("deptid");
                }
                if (deptId == null)
                    return dto;
                inDto.put("deptid", deptId);
                dto = queryDeptManagerByDeptId(inDto, isTManager);
                dto.put("deptid", users.get(0).getAsString("deptid"));
            }
        }
        return dto;
    }

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByUserId(Dto inDto) throws SQLException {
        return queryDeptManagerByUserId(inDto, true);
    }

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByAccount(Dto inDto, boolean isTManager) throws SQLException {
        inDto.put("start", 0);
        inDto.put("limit", 9999999);
        List<Dto> list = organizationDao.queryForPage("Organization.queryDeptManagerByAccount", inDto);
        Dto dto = packageToDto(list);
        boolean isManager = false;
        if (isTManager && dto.containsKey("directorid") && inDto.getAsString("account").equals(dto.getAsString("directoraccount"))) {
            isManager = true;
        }
        if (isTManager && dto.containsKey("usualdirectorid") && inDto.getAsString("account").equals(dto.getAsString("usualdirectoraccount"))) {
            isManager = true;
        }
        if (isManager || list == null || list.size() == 0) {
            List<Dto> users = organizationDao.queryForList("User.queryDeptInfoByUser", inDto);
            if (users != null && users.size() > 0) {
                String deptId = users.get(0).getAsString("parentid");
                if (!isTManager) {
                    deptId = users.get(0).getAsString("deptid");
                }
                if (deptId == null)
                    return dto;
                inDto.put("deptid", deptId);
                dto = queryDeptManagerByDeptId(inDto, isTManager);
                dto.put("deptid", users.get(0).getAsString("deptid"));
            }
        }
        return dto;
    }

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByAccount(Dto inDto) throws SQLException {
        return queryDeptManagerByAccount(inDto, true);
    }

    /**
     * 根据部门获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByDeptId(Dto inDto, boolean isTManager) {
        List<Dto> list = organizationDao.queryForList("Organization.queryDeptManagerByDeptId", inDto);
        if (list == null || list.size() == 0) {
            Dto dto = (Dto) organizationDao.queryForObject("Organization.queryDeptItemsByDto", inDto);
            if (dto == null)
                return new BaseDto();
            if (!"".equals(dto.getAsString("parentid"))) {
                Dto pdto = new BaseDto();
                pdto.put("deptid", dto.getAsString("parentid"));
                return queryDeptManagerByDeptId(pdto, isTManager);
            }
        }
        Dto managerDto = packageToDto(list);
        if (isTManager && ((managerDto.containsKey("directorid") && inDto.getAsString("userid").equals(managerDto.getAsString("directorid"))) || (managerDto.containsKey("directoraccount") && inDto.getAsString("account").equals(managerDto.getAsString("directoraccount"))))) {
            managerDto.clear();
        }
        if (isTManager && ((managerDto.containsKey("usualdirectorid") && inDto.getAsString("userid").equals(managerDto.getAsString("usualdirectorid"))) || managerDto.containsKey("usualdirectoraccount") && inDto.getAsString("account").equals(managerDto.getAsString("usualdirectoraccount")))) {
            managerDto.clear();
        }
        return managerDto;
    }

    @Override
    public String moveData() {
        //0是财务补充，1是客服补充
        organizationDao.update("User.updateCostOther");

        List<Dto> listProjectId = organizationDao.queryForList("User.queryCostOtherProjectidForProjectinfo");
//        List<Dto> listPlaneProjecidId = organizationDao.queryForList("User.queryCostOtherProjectidForPlane");
        List<Dto> listProjectidIsNotNull = new ArrayList<Dto>();
        List<Dto> listPlaneProjectidIsNotNull = organizationDao.queryForList("User.queryCostOtherProjectidForPlane");
        String isNotNullStr = "";
        for (int w = 0; w < listPlaneProjectidIsNotNull.size(); w++) {
            if (w == listPlaneProjectidIsNotNull.size() - 1) {
                isNotNullStr += "'" + listPlaneProjectidIsNotNull.get(w).getAsString("projectid") + "'";
            } else {
                isNotNullStr += "'" + listPlaneProjectidIsNotNull.get(w).getAsString("projectid") + "',";
            }
        }
        Dto isNotNullDto = new BaseDto();
        isNotNullDto.put("isNotNullStr", isNotNullStr);
        listProjectidIsNotNull = organizationDao.queryForList("User.queryCostOtherProjectidIsNotNull", isNotNullDto);
        String projectIdForPlaneStr = "";
        String projectIdForProjectInfoStr = "";
        for (int g = 0; g < listProjectidIsNotNull.size(); g++) {
            if (g == listProjectidIsNotNull.size() - 1) {
                projectIdForProjectInfoStr += "'" + listProjectidIsNotNull.get(g).getAsString("projectid") + "'";
            } else {
                projectIdForProjectInfoStr += "'" + listProjectidIsNotNull.get(g).getAsString("projectid") + "',";
            }
        }
        isNotNullDto.put("projectIdForProjectInfoStr", projectIdForProjectInfoStr);
        isNotNullDto.put("projectIdForPlaneStr", isNotNullStr);
        List<Dto> planeCost = organizationDao.queryForList("User.queryCostOtherPlane", isNotNullDto);
        List<Dto> proejctInfoCost = organizationDao.queryForList("User.queryCostOtherProjectid", isNotNullDto);
        List<Dto> planeCostCopy = organizationDao.queryForList("User.queryCostOtherPlane", isNotNullDto);
        int planeCostCopySize = planeCostCopy.size();
        for (int q = 0; q < planeCost.size(); q++) {
            for (int e = 0; e < planeCostCopySize; e++) {
                if (planeCost.get(q).getAsString("projectid").equals(planeCostCopy.get(e).getAsString("projectid"))) {
                    if (planeCost.get(q).getAsLong("planeid") > planeCostCopy.get(e).getAsLong("planeid")) {
                        planeCostCopy.remove(e);
                        planeCostCopySize -= 1;
                        e = -1;
                    }
                }

            }
        }

//        for(int size=0;size<planeCostCopy.size();size++){
//            System.err.println("------------"+size+"-------------------");
//            Dto tempDto = planeCostCopy.get(size);
//            organizationDao.update("User.updateCount",tempDto);
//        }

        planeCostCopy.addAll(proejctInfoCost);
        List<Dto> list = new ArrayList<Dto>();
        for (int k = 0; k < planeCostCopy.size(); k++) {
            Dto expensDto = new BaseDto();
            String otherCostStr = planeCostCopy.get(k).getAsString("othercost");
            otherCostStr = otherCostStr.substring(2, otherCostStr.length() - 2);
            otherCostStr = otherCostStr.replaceAll("\"", "");
//            String[] str= jsonString.split(",");
            String[] str = otherCostStr.split("\\},\\{");
            for (int i = 0; i < str.length; i++) {
                int index = str[i].indexOf(",");
                String[] TempStr = str[i].split(",", index + 2);
                Dto dtoNew = new BaseDto();
                for (int x = 0; x < TempStr.length; x++) {
                    String[] lastStr = TempStr[x].split(":");
                    dtoNew.put(lastStr[0], lastStr[1]);
                }
                dtoNew.put("projectid", planeCostCopy.get(k).getAsString("projectid"));
                list.add(dtoNew);
            }
            System.out.println(planeCostCopy.get(k).getAsString("projectid"));
            System.out.println(otherCostStr);
        }
        for (int listIndex = 0; listIndex < list.size(); listIndex++) {
            Dto insertDto = list.get(listIndex);
            organizationDao.insert("User.insertCostOther", insertDto);
        }
        return "Ok";  //To change body of implemented methods use File | Settings | File Templates.
    }

    /**
     * 根据部门获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByDeptId(Dto inDto) {
        return queryDeptManagerByDeptId(inDto, true);
    }

    /**
     * 封装管理信息成DTO
     *
     * @param list
     * @return
     */
    private Dto packageToDto(List<Dto> list) {
        Dto outDto = new BaseDto();
        if (list != null) {
            int count = list.size();
            Dto dto = null;
            for (int i = 0; i < count; i++) {
                dto = list.get(i);
                if ("1".equals(dto.getAsString("roletype"))) {
                    outDto.put("director", dto.getAsString("username"));
                    outDto.put("directorid", dto.getAsString("userid"));
                    outDto.put("directoraccount", dto.getAsString("account"));
                } else if ("2".equals(dto.getAsString("roletype"))) {
                    outDto.put("usualdirector", dto.getAsString("username"));
                    outDto.put("usualdirectorid", dto.getAsString("userid"));
                    outDto.put("usualdirectoraccount", dto.getAsString("account"));
                }
                outDto.put("deptid", dto.getAsString("deptid"));
            }
        }
        return outDto;
    }

    @Override
    public List<Dto> CheckDeptUnion(Dto dto) {
        return organizationDao.CheckDeptUnion(dto);
    }
}