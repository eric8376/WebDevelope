package org.nxstudio.service.httpService.response;

import com.sun.net.httpserver.HttpExchange;

/**
 * Created by Administrator on 2015/4/10.
 *
 * @version V1.0
 * @Description: 相应类接口
 * @date 2014年11月12日 下午3:54:02
 */
public interface Response {

    public void write(String result);

}

