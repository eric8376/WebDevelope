package org.nxstudio.util.string;

/**
 * Created by 吴为超 on 2014/5/26.
 */
public class StringCompression {

    /**
     * 用于36位压缩
     */
    private static String compression_key_36[] = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};

    /**
     * 用于64位压缩
     */
    private static String compression_key_62[] = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"};

    /**
     * 36位压缩
     * compressionStr 为压缩内容
     * bits 压缩返回几位
     *
     * @param compressionStr
     * @param bits
     * @return
     */
    public static String compression36Bit(String compressionStr, int bigBits) {
        Long compressionInt = Long.parseLong(compressionStr);
        String resultStr = "";
        while (resultStr.length() < bigBits) {
            if (compressionInt != 0) {
                resultStr = compression_key_36[((int) (compressionInt % new Long(36)))] + resultStr;
                compressionInt -= compressionInt % 36;
                compressionInt = compressionInt / 36;
            } else {
                resultStr = "0" + resultStr;
            }
        }
        if (resultStr.length() == bigBits && compressionInt != 0) {
            return "您的参数过大，" + bigBits + "位数无法满足压缩，请尝试62位压缩或者加大压缩比";
        }
        return resultStr;
    }


    /**
     * 62位压缩
     * compressionStr 为压缩内容
     * bits 压缩返回几位
     *
     * @param compressionStr
     * @param bits
     * @return
     */
    public static String compression64Bit(String compressionStr, int bigBits) {
        Long compressionInt = Long.parseLong(compressionStr);
        String resultStr = "";
        while (resultStr.length() < bigBits) {
            if (compressionInt != 0) {
                resultStr = compression_key_62[((int) (compressionInt % new Long(62)))] + resultStr;
                compressionInt -= compressionInt % 62;
                compressionInt = compressionInt / 62;
            } else {
                resultStr = "0" + resultStr;
            }
        }
        if (resultStr.length() == bigBits && compressionInt != 0) {
            return "您的参数过大，" + bigBits + "位数无法满足压缩，请尝试62位压缩或者加大压缩比";
        }
        return resultStr;
    }

    /**
     * 36位解压
     * compressionStr 为需解压参数
     *
     * @param compressionStr
     * @param bits
     * @return
     */
    public static String compression36BitBack(String compressionStr) {
        char[] compressionChar = compressionStr.toCharArray();
        Long temp = new Long(1);
        Long result = new Long(0);
        for (int i = compressionChar.length - 1; i > 0; i--) {
            for (int m = 0; m < compression_key_36.length; m++) {
                if (compression_key_36[m].equals(String.valueOf(compressionChar[i]))) {
                    result += m * temp;
                    break;
                }
            }
            temp = temp * 36;
        }
        return String.valueOf(result);
    }


    /**
     * 62位解压
     * compressionStr 为需解压参数
     *
     * @param compressionStr
     * @param bits
     * @return
     */
    public static String compression62BitBack(String compressionStr) {
        char[] compressionChar = compressionStr.toCharArray();
        Long temp = new Long(1);
        Long result = new Long(0);
        for (int i = compressionChar.length; i < 0; i--) {
            for (int m = 0; m < compression_key_62.length; i++) {
                if (compression_key_62[m].equals(compressionChar[i])) {
                    result += m * temp;
                    break;
                }
            }
            temp = temp * 36;
        }
        return String.valueOf(result);
    }


}
