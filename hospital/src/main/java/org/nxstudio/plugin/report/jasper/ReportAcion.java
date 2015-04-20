package org.nxstudio.plugin.report.jasper;

import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JRRuntimeException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;

import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.controller.BaseAction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * JasperReport报表服务Acion
 *
 * @author XiongChun
 * @see BaseAction
 * @since 2009-09-03
 */
@Controller
@RequestMapping("/report")
public class ReportAcion extends BaseAction {

    /**
     * 打印模板页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=initAppletPage")
    public String initAppletPage(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        String flag = request.getParameter("flag");
        String url = request.getContextPath() + "/report.ered?reqCode=appletPreview&jsessionid=" + request.getSession().getId();
        if (!G4Utils.isEmpty(flag)) {
            url = url + "&reportflag=" + flag;
        }
        request.setAttribute("dataUrl", url);
        return "/resource/jasper/printInit";
    }

    /**
     * PDF模板页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=initPdfPage")
    public String initPdfPage(HttpServletRequest request,
                              HttpServletResponse response) throws Exception {
        String flag = request.getParameter("flag");
        String url = request.getContextPath() + "/report.ered?reqCode=pdfPreview&jsessionid=" + request.getSession().getId();
        if (!G4Utils.isEmpty(flag)) {
            url = url + "&reportflag=" + flag;
        }
        request.setAttribute("dataUrl", url);
        return "/resource/jasper/pdfInit";
    }

    /**
     * 实例化报表对象,填充报表数据 显示方式:applet
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=appletPreview")
    public String appletPreview(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        // 接收url传过来的报表标识参数
        String flag = request.getParameter("reportflag");
        flag = G4Utils.isEmpty(flag) ? "default" : flag;
        JasperPrint jasperPrint = getJasperPrintObjectFromSession(flag, request);
        if (G4Utils.isEmpty(jasperPrint)) {
            throw new JRRuntimeException("实例化打印对象失败,请检查填充数据域和模板文件");
        }
        response.setContentType("application/octet-stream");
        ServletOutputStream ouputStream = response.getOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(ouputStream);
        oos.writeObject(jasperPrint);
        oos.flush();
        oos.close();
        ouputStream.flush();
        ouputStream.close();
        return null;
    }

    /**
     * 实例化报表对象,填充报表数据 显示方式:pdf
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=pdfPreview")
    public String pdfPreview(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        // 接收url传过来的报表标识参数
        String flag = request.getParameter("reportflag");
        flag = G4Utils.isEmpty(flag) ? "default" : flag;
        JasperPrint jasperPrint = getJasperPrintObjectFromSession(flag, request);
        if (G4Utils.isEmpty(jasperPrint)) {
            throw new JRRuntimeException("实例化打印对象失败,请检查填充数据域和模板文件");
        }
        OutputStream os = response.getOutputStream();
        response.setContentType("application/pdf");
        JRPdfExporter exporter = new JRPdfExporter();
        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, os);
        exporter.exportReport();
        os.close();
        return null;
    }

    /**
     * 获取JasperPrint对象
     *
     * @param pFlag
     * @return
     */
    private JasperPrint getJasperPrintObjectFromSession(String pFlag, HttpServletRequest request) throws Exception {
        ReportData reportData = super.getSessionContainer(request).getReportData(pFlag);
        if (G4Utils.isEmpty(reportData)) {
            throw new JRRuntimeException("没有获取到报表数据对象[ReportData],请检查!");
        }
        InputStream is = servletContext.getResourceAsStream(reportData.getReportFilePath());
        if (is == null) {
            throw new JRRuntimeException("模板文件未找到,请确认模板文件路径是否正确" + "[" + reportData.getReportFilePath() + "]");
        }
        JasperPrint jasperPrint = null;
        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(is);
        List fieldsList = reportData.getFieldsList();
        if (G4Utils.isEmpty(fieldsList)) {
            jasperPrint = JasperFillManager.fillReport(jasperReport, reportData.getParametersDto(),
                    new JREmptyDataSource());
        } else {
            JRBeanCollectionDataSource jRDataSource = new JRBeanCollectionDataSource(fieldsList);
            jasperPrint = JasperFillManager.fillReport(jasperReport, reportData.getParametersDto(), jRDataSource);
        }
        return jasperPrint;
    }
}
