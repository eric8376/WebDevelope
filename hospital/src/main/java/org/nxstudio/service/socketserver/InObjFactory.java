package org.nxstudio.service.socketserver;


import org.nxstudio.service.socketserver.util.BaseObj;
import org.nxstudio.service.socketserver.util.Helper;

public class InObjFactory {
    public InObjFactory() {

    }

    public static BaseObj getInObj(byte[] in) throws Exception {
        BaseObj obj = null;
        obj = Helper.buildInData(in);
        return obj;
    }
}
