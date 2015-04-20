package org.nxstudio.modules.demo.other.controller;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.modules.demo.other.service.DemoService;
import org.nxstudio.plugin.report.fcf.*;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * 演示用 Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-06-13
 */
@Controller
@RequestMapping("/test")
public class TestAction extends BaseAction {
    @Autowired
    private DemoService demoService;
//    = (DemoService)getService("demoService");


    /**
     * 测试页面1初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=test1Init")
    public String test1Init(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        //实例化一个图形配置对象
        GraphConfig graphConfig = new GraphConfig();
        //主标题
        graphConfig.setCaption("Google软件2010年月度销售业绩图表");
        //设置数字值的前缀
        graphConfig.setNumberPrefix("$");
        //使用这种方式可以加入框架没有封装的原生报表属性,原生属可以参考《开发指南》的相关章节
        //graphConfig.put("propertyName", "value");
        graphConfig.setCanvasBorderThickness(new Boolean(true));
        //实例化组合种类配置对象
        CategoriesConfig categoriesConfig = new CategoriesConfig();
        List cateList = new ArrayList();
        cateList.add(new Categorie("一月"));
        cateList.add(new Categorie("二月"));
        cateList.add(new Categorie("三月"));
        cateList.add(new Categorie("四月"));
        cateList.add(new Categorie("五月"));
        cateList.add(new Categorie("六月"));
        cateList.add(new Categorie("七月"));
        cateList.add(new Categorie("八月"));
        cateList.add(new Categorie("九月"));
        cateList.add(new Categorie("十月"));
        cateList.add(new Categorie("十一月"));
        cateList.add(new Categorie("十二月"));
        categoriesConfig.setCategories(cateList);
        List list = getFcfDataList4LineGroup(new BaseDto());
        String xmlString = FcfDataMapper.toFcfXmlData(list, graphConfig, categoriesConfig);
        request.setAttribute("xmlString", xmlString);
        return "/demo/test/test1";
    }


    /**
     * 测试页面2初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=test2Init")
    public String test2Init(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        request.setAttribute("ID", "测试");
        return "/demo/test/test2";
    }

    /**
     * 测试3页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=test3Init")
    public String test3Init(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {

        return "/demo/test/test3";
    }

    /**
     * 测试4页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=test4Init")
    public String test4Init(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {

        return "/demo/test/test4";
    }

    /**
     * 测试5页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=test5Init")
    public String test5Init(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {

        return "/demo/test/test5";
    }

    /**
     * 获取FlashReport元数据 (折线组合图)
     *
     * @param pDto
     * @return
     */
    private List getFcfDataList4LineGroup(Dto pDto) {
        pDto.put("rownum", "12");
        List dataList = new ArrayList();
        DataSet dataSet1 = new DataSet();
        dataSet1.setSeriesname("产品A");
        dataSet1.setColor("FDC12E");
        pDto.put("product", "1");
        List alist = g4Reader.queryForList("Demo.getFcfDataList", pDto);
        List aSetList = new ArrayList();
        for (int i = 0; i < alist.size(); i++) {
            Dto dto = (BaseDto) alist.get(i);
            Set set = new Set();
            set.setValue(dto.getAsString("value"));
            aSetList.add(set);
        }
        dataSet1.setData(aSetList);
        dataList.add(dataSet1);

        DataSet dataSet2 = new DataSet();
        dataSet2.setSeriesname("产品B");
        dataSet2.setColor("44BC2F");
        pDto.put("product", "2");
        List blist = g4Reader.queryForList("Demo.getFcfDataList", pDto);
        List bSetList = new ArrayList();
        for (int i = 0; i < blist.size(); i++) {
            Dto dto = (BaseDto) blist.get(i);
            Set set = new Set();
            set.setValue(dto.getAsString("value"));
            bSetList.add(set);
        }
        dataSet2.setData(bSetList);
        dataList.add(dataSet2);
        return dataList;
    }

    @RequestMapping(params = "reqCode=saveTheSubmitInfo")
    public String saveTheSubmitInfo(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        System.out.println("接收到的表单提交参数：\n" + dto);
        response.setCharacterEncoding("UTF-8");
        //int i = 3/0;
        demoService.doError();
        setOkTipMsg("数据提交成功:" + dto.toString(), response);
        return null;
    }

    @RequestMapping(params = "reqCode=loadCallBack")
    public String loadCallBack(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Dto outDto = new BaseDto();
        outDto.put("text1", "熊春");
        outDto.put("text2", "托尼贾");
        String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, null);
        super.write(jsonString, response);
        return null;
    }
}
