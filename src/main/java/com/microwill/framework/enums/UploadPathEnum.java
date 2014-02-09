package com.microwill.framework.enums;

public enum UploadPathEnum
{
    Temp("temp", "临时目录"),
    ProductPhoto("productphoto", "产品图片"),
    ContractTemplate("contracttemplate", "合同模板"),
    ContractChinajBorrower("contractchinajborrower","网贷公司和借款人合同"),
    ContractChinajLender("contractchinajlender","网贷公司和出资人合同"),
    ContractBorrowerLender("contractborrowerlender","出资人和借款人合同"),
    ContractBorrowerTotal("contractborrowertotal","借款人总合同"),
    ContractFactoringBusiness("contractFactoringBusiness","商业保理合同"),
    ContractFactoringEntrust("contractFactoringEntrust","保理委托合同"),
    /*AccountIDCard("accouontidcard", "会计师身份证"),
    AccountLicense("accountlicense", "会计师执照"),
    AccountCertificate("accountcertificate", "会计师资格证书"),
    CustomerLicense("customerlicense", "企业执照"),
    CustomerIDcard("customeridcard", "企业法人身份证"),
    CustomerLogo("customerlogo", "企业logo");*/
    User("user", "用户证照附件");
    
    private UploadPathEnum(String path, String name){
        this.path = path;
        this.name = name;
    }
    
    private String path;
    private String name;
    
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

}
