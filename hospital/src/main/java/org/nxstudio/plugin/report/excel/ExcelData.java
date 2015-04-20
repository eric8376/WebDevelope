package org.nxstudio.plugin.report.excel;

import java.util.List;

import org.nxstudio.core.model.Dto;

/**
 * Excel数据对象
 *
 * @author XiongChun
 * @since 2010-08-12
 */
public class ExcelData {

    /**
     * Excel参数元数据对象
     */
    private Dto parametersDto;

    /**
     * Excel集合元对象
     */
    private List<Dto> fieldsList;

    /**
     * Excel分组字段名
     */
    private String GroupFieldName;


    /**
     * 构造函数
     *
     * @param pDto           元参数对象
     * @param pList          集合元对象
     * @param groupFieldName Excel分组字段名
     */
    public ExcelData(Dto parametersDto, List fieldsList, String groupFieldName) {
        this.fieldsList = fieldsList;
        GroupFieldName = groupFieldName;
        this.parametersDto = parametersDto;
    }

    /**
     * 构造函数
     *
     * @param pDto  元参数对象
     * @param pList 集合元对象
     */
    public ExcelData(Dto pDto, List pList) {
        setParametersDto(pDto);
        setFieldsList(pList);
    }

    public Dto getParametersDto() {
        return parametersDto;
    }

    public void setParametersDto(Dto parametersDto) {
        this.parametersDto = parametersDto;
    }

    public List getFieldsList() {
        return fieldsList;
    }

    public void setFieldsList(List fieldsList) {
        this.fieldsList = fieldsList;
    }

    public String getGroupFieldName() {
        return GroupFieldName;
    }

    public void setGroupFieldName(String groupFieldName) {
        GroupFieldName = groupFieldName;
    }
}
