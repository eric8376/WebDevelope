package com.microwill.framework.vo.mobile;

public class Version {
    private String lastVersion;
    private String minVersion;
    private String updateUrl;
    private String lastVersionName;
    private String appStoreUpdateUrl;
    
    public String getLastVersion() {
        return lastVersion;
    }
    public void setLastVersion(String lastVersion) {
        this.lastVersion = lastVersion;
    }
    public String getMinVersion() {
        return minVersion;
    }
    public void setMinVersion(String minVersion) {
        this.minVersion = minVersion;
    }
    public String getUpdateUrl() {
        return updateUrl;
    }
    public void setUpdateUrl(String updateUrl) {
        this.updateUrl = updateUrl;
    }
    public String getLastVersionName() {
        return lastVersionName;
    }
    public void setLastVersionName(String lastVersionName) {
        this.lastVersionName = lastVersionName;
    }
	public String getAppStoreUpdateUrl() {
		return appStoreUpdateUrl;
	}
	public void setAppStoreUpdateUrl(String appStoreUpdateUrl) {
		this.appStoreUpdateUrl = appStoreUpdateUrl;
	}
    
}
