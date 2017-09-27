package com.eno.web.fshare.controller;

import java.io.*;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.eno.web.fshare.tool.PathTool;

@RestController
@RequestMapping(value = "/rest/file")
public class CtrlFilleOperate {

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> uploadFile(@RequestParam("path") String path, @RequestParam("files[]") MultipartFile[] uploadfiles) {
        try {
            // 保存文件
            PathTool.saveUploadedFiles(PathTool.getFullPath(path), uploadfiles);

            return new ResponseEntity<Object>("upload success",
                    new HttpHeaders(), HttpStatus.OK);
        } catch (Exception e) {
            System.err.println(e.toString());
            return new ResponseEntity<Object>("upload fail",
                    new HttpHeaders(), HttpStatus.OK);
        }

    }

    @GetMapping("/download")
    @ResponseBody
    public void download(@RequestParam("fileName") String fileName, HttpServletResponse response) {

        try {
            File sourceFile = PathTool.getFullPath(fileName.replace("---", "/"));
            if (sourceFile.isDirectory()) {
                try (ZipOutputStream out = new ZipOutputStream(response.getOutputStream()); BufferedOutputStream bos = new BufferedOutputStream(out)) {
                    PathTool.compressToZip(out, bos, sourceFile, sourceFile.getName());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                InputStream is = new FileInputStream(sourceFile);
                response.setHeader("Content-Type", "application/octet-stream");
                response.setHeader("Content-Disposition", "attachment;filename=" + new String(sourceFile.getName().getBytes("gb2312"), "ISO8859-1"));
                IOUtils.copy(is, response.getOutputStream());
            }

            response.flushBuffer();
        } catch (Exception e) {
            System.err.println(e.toString());
        }
    }

    @PostMapping("/ls")
    public List<Map<String, String>> getChildren(@RequestParam("pathNames") String pathNames) {
        List<Map<String, String>> filesMap = new ArrayList<>();
        List<Map<String, String>> filesMap1 = new ArrayList<>(); // directory
        List<Map<String, String>> filesMap2 = new ArrayList<>(); // file

        List<File> files = PathTool.getPathChildrenList(pathNames);
        if (null != files && 0 != files.size()) {
            files.stream().forEach(f -> {
                Map<String, String> m = new HashMap<>();
                m.put("fileName", f.getName());
                m.put("isDir", "" + f.isDirectory());
                // 先add目录，后add文件
                if (f.isDirectory()) {
                    filesMap1.add(m);
                } else {
                    filesMap2.add(m);
                }
            });
        }

        filesMap.addAll(filesMap1);
        filesMap.addAll(filesMap2);

        return filesMap;
    }

    @PostMapping("/mkdir")
    public Boolean mkdir(@RequestParam("pathNames") String pathNames, @RequestParam("name") String name) {
        return PathTool.mkdir(pathNames, name);
    }

    @PostMapping("/rm")
    public Boolean del(@RequestParam("pathNamesList") List<String> pathNamesList) {
        return PathTool.rm(pathNamesList);
    }

}
