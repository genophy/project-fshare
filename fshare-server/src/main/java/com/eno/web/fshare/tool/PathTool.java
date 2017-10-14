package com.eno.web.fshare.tool;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.eno.web.fshare.util.Constants;

/**
 * upload path
 *
 * @author eno
 */

@Component
public class PathTool {
    private static final File rootPath = new File(PropertiesConfTool.getKey(Constants.PROP_KEY_LOCAL_PATH));

    static {
        if (!initRootPath()) {
            System.err.println("---------------- the file " + Constants.PROP_KEY_LOCAL_PATH + " created error!");
        }
    }

    /**
     * init root path
     *
     * @return
     */
    private static boolean initRootPath() {
        if (rootPath.exists() && rootPath.isDirectory()) {
            System.out.println("-------------- the rootpath " + rootPath.getAbsolutePath() + " is exists");
            return true;
        }
        System.out.println("-------------- the rootpath " + rootPath.getAbsolutePath() + " is created");
        return rootPath.mkdirs();
    }

    /**
     * 目录递归删除 ，若存在不成功，则返回false
     *
     * @param file
     * @return
     */
    private static Boolean fileDelRecursion(File file) {
        Boolean flag = true;
        if (file.isDirectory()) {
            File[] fChild = file.listFiles();
            for (File f : fChild) {
                if (!fileDelRecursion(f)) {
                    flag = false;
                }
            }
        }
        if (!file.delete()) {
            flag = false;
        }

        return flag;
    }

    /**
     * 预备文件名
     *
     * @param pathNames
     * @return
     */
    public static String preparePathNames(String pathNames) {
        // if suite path
        if (".".equals(pathNames)) {
            pathNames = "";

        }
        pathNames = pathNames.replaceAll("^./", "");
        return pathNames;
    }

    /**
     * @param pathNames
     * @return
     */
    public static List<String> parsePathNamesToList(String pathNames) {

        pathNames = preparePathNames(pathNames);

        return Arrays.asList(pathNames.split("/"));
    }

    ;

    /**
     * 获取path的目录
     *
     * @param pathNamesList
     * @return
     */
    public static File getFullPath(List<String> pathNamesList) {
        File tempPath = new File(rootPath.getPath());
        // if the pathname is not null
        if (null != pathNamesList && 0 != pathNamesList.size()) {

            for (String pathName : pathNamesList) {
                if ("".equals(pathName)) {
                    continue;
                }
                // if path is not directory ,return
                if (null == tempPath || !tempPath.isDirectory()) {
                    return null;
                }
                // else find
                File[] tpa = tempPath.listFiles(new FilenameFilter() {

                    @Override
                    public boolean accept(File dir, String name) {

                        return pathName.equals(name);
                    }
                });

                if (0 == tpa.length) {
                    return null;
                }

                tempPath = tpa[0];
            }
        }
        return tempPath;
    }

    /**
     * @param out
     * @param bos
     * @param sourceFile
     * @param base
     * @throws Exception
     */
    public static void compressToZip(ZipOutputStream out, BufferedOutputStream bos, File sourceFile, String base) throws Exception {
        //如果路径为目录（文件夹）
        if (sourceFile.isDirectory()) {

            //取出文件夹中的文件（或子文件夹）
            File[] flist = sourceFile.listFiles();

            if (flist.length == 0)//如果文件夹为空，则只需在目的地zip文件中写入一个目录进入点
            {
                out.putNextEntry(new ZipEntry(base + "/"));
            } else//如果文件夹不为空，则递归调用compress，文件夹中的每一个文件（或文件夹）进行压缩
            {
                for (int i = 0; i < flist.length; i++) {
                    compressToZip(out, bos, flist[i], base + "/" + flist[i].getName());
                }
            }
        } else//如果不是目录（文件夹），即为文件，则先写入目录进入点，之后将文件写入zip文件中
        {
            out.putNextEntry(new ZipEntry(base));
            FileInputStream fos = new FileInputStream(sourceFile);
            BufferedInputStream bis = new BufferedInputStream(fos);

            int tag;
            System.out.println(base);
            //将源文件写入到zip文件中
            while ((tag = bis.read()) != -1) {
                bos.write(tag);
            }
            bis.close();
            fos.close();

        }
    }

    /**
     * @param pathName
     * @return
     */
    public static long getPathSize(String pathName) {
        return getPathSize(getFullPath(pathName));
    }

    /**
     * 获取path大小
     *
     * @param path
     * @return
     */
    public static long getPathSize(File path) {
        long size = 0;
        if (path.isDirectory()) {
            for (File f : path.listFiles()) {
                size += getPathSize(f) + 4096;
            }
        } else {
            size += path.length();

        }
        return size ;
    }

    /**
     * 获取path的目录
     *
     * @param pathNames
     * @return
     */
    public static File getFullPath(String pathNames) {
        return getFullPath(parsePathNamesToList(pathNames));

    }

    /**
     * 获取path的子目录
     *
     * @param pathNamesList
     * @return
     */
    public static List<File> getPathChildrenList(List<String> pathNamesList) {
        File tempPath = getFullPath(pathNamesList);
        if (null == tempPath || !tempPath.isDirectory()) {
            return new ArrayList<>();
        }
        return Arrays.asList(tempPath.listFiles());
    }

    /**
     * 获取path的子目录
     *
     * @param pathNames
     * @return
     */
    public static List<File> getPathChildrenList(String pathNames) {
        return getPathChildrenList(parsePathNamesToList(pathNames));
    }

    /**
     * 建立目录
     *
     * @param pathNames
     * @param name
     * @return
     */
    public static Boolean mkdir(String pathNames, String name) {
        File newFile = new File(preparePathNames(pathNames) + "/" + name);
        return newFile.mkdirs();
    }

    /**
     * 删除文件和目录
     *
     * @param pathNamesList
     */
    public static Boolean rm(List<String> pathNamesList) {
        for (String pathNames : pathNamesList) {
            File file = getFullPath(pathNames);
            fileDelRecursion(file);
        }

        return true;
    }

    /**
     * @param files
     */
    public static void saveUploadedFiles(File path, MultipartFile[] files) throws Exception {
        String storeSize = PropertiesConfTool.getKey(Constants.PROP_KEY_MAX_STORE_SIZE);
        if(null != storeSize){
            long fileSize = 0;
            for(MultipartFile file:files){
                fileSize += file.getSize();
            }
            if(Long.valueOf( storeSize) < (fileSize + getPathSize(PropertiesConfTool.getKey(Constants.PROP_KEY_LOCAL_PATH)))){
                throw new Exception(Constants.PROP_KEY_LOCAL_PATH.concat(" is full,cannot upload more files"));
            }
        }


        if (!path.exists()) {
            path.mkdirs();
        }
        for (MultipartFile file : files) {
            File newFile = new File(path.getAbsolutePath() + "/" + file.getOriginalFilename());
            if (newFile.exists()) {
                String str = file.getOriginalFilename();
                str = str.substring(0, str.lastIndexOf(".")) + "." + new Date().getTime() + str.substring(str.lastIndexOf('.'));
                newFile = new File(path.getAbsolutePath() + "/" + str);
            }
            System.out.println("upload file to : " + newFile.getAbsolutePath());
            IOUtils.copy(file.getInputStream(), new FileOutputStream(newFile));
        }
    }

}
