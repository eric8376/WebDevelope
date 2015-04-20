package org.nxstudio.service.socketserver.systools;

import java.text.DecimalFormat;

/**
 * @author Administrator
 *         <p/>
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class DoubleUtil {
    private static String _pattern = "##,###.00";

    /**
     * @param d
     * @return
     */
    public static String format(double d) {
        DecimalFormat df = new DecimalFormat(_pattern);
        String str = df.format(d);
        if (str.equals(".00")) {
            str = "0";
        }
        return str;
    }

    public static String formatnodot(double d) {
        d = d + 0.00000001;
        DecimalFormat df = new DecimalFormat("##0.00");
        String str = df.format(d);
        if (str.equals("0.00")) {
            str = "0";
        }
        return str;
    }

    public static String formatnodot_nw(double d) {
        DecimalFormat df = new DecimalFormat("##0.00000000000000000000");
        String str = df.format(d);
        return str;
    }

    public static double format2bit(double d) {
        d = d + 0.00000001;
        DecimalFormat df = new DecimalFormat("##0.00");
        String str = df.format(d);
        if (str.equals("0.00")) {
            str = "0";
        }
        return Double.parseDouble(str);
    }

    public static double format4bit(double d) {
        d = d + 0.00000001;
        DecimalFormat df = new DecimalFormat("##0.0000");
        String str = df.format(d);
        if (str.equals("0.00")) {
            str = "0";
        }
        return Double.parseDouble(str);
    }

    public static double format6bit(double d) {
        d = d + 0.00000001;
        DecimalFormat df = new DecimalFormat("##0.000000");
        String str = df.format(d);
        if (str.equals("0.00")) {
            str = "0";
        }
        return Double.parseDouble(str);
    }

    public static void main(String[] arg) {
        double a = 1002.22556002;
        double b = 2.23503002;
        System.out.println(a);
        System.out.println(b);
        System.out.println("a:" + format4bit(a));
        System.out.println("b:" + format4bit(b));

    }

}
