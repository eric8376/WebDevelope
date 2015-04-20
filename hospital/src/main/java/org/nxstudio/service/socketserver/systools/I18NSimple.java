package org.nxstudio.service.socketserver.systools;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class I18NSimple {
    public static void main(String args[]) {

        new I18NSimple().getFile(new File("D:/product/bbspnew/src/com/leadmind/basesystem"));

    }

    public void display(String args[]) {
        String language;
        String country;
        if (args.length != 2) {
            language = new String("en");
        }
    }

    public File getFile(File file) {

        File[] f = file.listFiles();
        for (int i = 0; i < f.length; i++) {
            if (f[i].isDirectory()) {
                getFile(f[i]);
            } else {
                try {

                    System.out.println(f[i].getPath());
                    //BufferedReader reader = new BufferedReader(new FileReader(f[i]));
                    String path = f[i].getPath();
                    if (!path.endsWith(".java")) {
                        continue;
                    }
                    String text = "";
                    InputStreamReader inputStreamReader = new InputStreamReader(new FileInputStream(f[i]), "gbk");
                    String encode = "";
                    System.out.println(encode);
                    BufferedReader reader = new BufferedReader(inputStreamReader);


                    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path + ".bak"), "utf-8"));
                    int c;
                    while ((c = reader.read()) != -1) {
                        writer.write(c);
                    }
                    reader.close();
                    writer.close();
                    f[i].delete();
                    File dd = new File(path + ".bak");
                    dd.renameTo(new File(path));

//					while (reader.) {
//						text += line+"\n";
//					}
//					text = text;
//					text = new String(text.getBytes("iso-8859-1"));
//					reader.close();
//					
//					//FileWriter fileWriter = new FileWriter(f[i]);
//					
//					writer.
//					writer.write(text);
//					writer.flush();
//					writer.close();

                } catch (Exception e) {

                    e.printStackTrace();
                }
            }
        }

        return null;

    }
}
