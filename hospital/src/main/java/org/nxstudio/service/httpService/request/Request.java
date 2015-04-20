package org.nxstudio.service.httpService.request;

        import javax.servlet.http.HttpSession;
        import java.net.URI;
        import java.util.Map;

/**
 *Created by Administrator on 2015/4/10.
 * @Description: 请求接口
 * @date 2014年11月12日 下午3:54:58
 * @version V1.0
 */
public interface Request {
    public final static String GET = "GET";
    public final static String POST = "POST";

    public String getParamter(String param);
    public Map<String, String> getParamters();
    public String getMethod();

    public URI getReuestURI();

    public void initRequestHeader();

    public void initRequestParam();

    public void initRequestBody();

    public String getRequestBody();
}

