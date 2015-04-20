package org.nxstudio.service.socketserver.restools;
/**
 * 文件产生工具
 */

import org.nxstudio.service.socketserver.systools.DateTimeUtil;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;


public class FileGen {

    private FileOutputStream fos;

    private PrintWriter pw;

    private String file;

    private boolean isDebug = false;

    private boolean isError = false;

    private boolean isOutConsole = true;


    public boolean isOutConsole() {
        return isOutConsole;
    }

    public void setOutConsole(boolean isOutConsole) {
        this.isOutConsole = isOutConsole;
    }

    public boolean isError() {
        return isError;
    }

    public void setError(boolean isError) {
        this.isError = isError;
    }

    public boolean isDebug() {
        return isDebug;
    }

    public void setDebug(boolean isDebug) {
        this.isDebug = isDebug;
    }

    public FileGen(String file) {
        this.file = file;
        init();
    }

    private void init() {
        try {
            fos = new FileOutputStream(file);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            OutputStreamWriter osw = new OutputStreamWriter(bos);
            BufferedWriter bw = new BufferedWriter(osw);
            pw = new PrintWriter(bw);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void println(Object obj) {
        String timeMark = DateTimeUtil.get_YYYY_MM_DD_Date() + " " + DateTimeUtil.get_hhmmss_time() + "->";
        if (isOutConsole)
            System.out.println(timeMark + obj);

        if (this.isDebug())
            pw.println(timeMark + obj);

        if (this.isError()) {
            if (obj instanceof Exception) {
                pw.println(timeMark + obj);
            }
        }

        pw.flush();
    }

    public void debug(Object obj) {
        this.setDebug(true);
        this.setError(false);

        println(obj);

    }

//	public void debug(Object obj,BaseAction bc){
//		if(bc!=null){
//			bc.mbNews(obj+"");
//		}
//		debug(obj);
//	}

    public void error(Object obj) {
        this.setDebug(false);
        this.setError(true);
        println(obj);
    }

    //


    public void close() {
        try {
            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        FileGen fg = new FileGen("E:\\gd\\exapFile\\source.txt");
        fg.println("dkfla");
    }

}
