package org.nxstudio.util.code;

import org.krysalis.barcode4j.impl.code128.Code128Bean;
import org.krysalis.barcode4j.impl.datamatrix.DataMatrixBean;
import org.krysalis.barcode4j.impl.datamatrix.SymbolShapeHint;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.output.bitmap.BitmapEncoder;
import org.krysalis.barcode4j.output.bitmap.BitmapEncoderRegistry;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【条形码、矩阵码生成服务】
 * 时间: 2013-07-01 下午3:17
 */

public class CodeHelper {
    final static int dpi = 1200;

    /**
     * 核心码
     */
    private static BufferedImage createCode(int model, String code) throws IOException {
        final boolean antiAlias = false;
        final int orientation = 0;

        //创建二进制绘图板
        BitmapCanvasProvider canvas = new BitmapCanvasProvider(dpi, BufferedImage.TYPE_BYTE_BINARY, antiAlias, orientation);
        //创建矩阵码
        if (model == 1) {
            DataMatrixBean bean = new DataMatrixBean();
            bean.setShape(SymbolShapeHint.FORCE_SQUARE);
            bean.generateBarcode(canvas, code);
        } else {//创建条形码
            Code128Bean bean = new Code128Bean();
            bean.generateBarcode(canvas, code);
        }
        canvas.finish();

        //获取生成的二进制图片
        BufferedImage symbol = canvas.getBufferedImage();
        int width = symbol.getWidth();
        int height = symbol.getHeight();

        //绘制到图板上
        BufferedImage bitmap = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_BINARY);
        Graphics2D g2d = (Graphics2D) bitmap.getGraphics();
        g2d.drawRenderedImage(symbol, null);
        g2d.dispose();

        return bitmap;
    }

    /**
     * 生成条形码
     */
    public static void generateBarCode(File outputFile, String code) throws IOException {
        //Encode bitmap as file
        String mime = "image/png";
        OutputStream out = new FileOutputStream(outputFile);
        try {
            final BitmapEncoder encoder = BitmapEncoderRegistry.getInstance(mime);
            encoder.encode(createCode(2, code), out, mime, dpi);
        } finally {
            out.close();
        }
    }

    /**
     * .
     * 生成二维码
     */
    public static void generateQRecode(File outputFile, String code) throws IOException {
        //Encode bitmap as file
        String mime = "image/png";
        OutputStream out = new FileOutputStream(outputFile);
        try {
            final BitmapEncoder encoder = BitmapEncoderRegistry.getInstance(mime);
            encoder.encode(createCode(1, code), out, mime, dpi);
        } finally {
            out.close();
        }
    }

    /**
     * 生成二进制流文件
     *
     * @param mode 1:二维码 2:条形码
     */
    public static ByteArrayOutputStream generateByteArray(int mode, String code) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
        String mime = "image/png";
        try {
            final BitmapEncoder encoder = BitmapEncoderRegistry.getInstance(mime);
            encoder.encode(createCode(mode, code), out, mime, dpi);
        } finally {
            out.close();
        }

        return out;
    }


}
