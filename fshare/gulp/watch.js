var gulp = require("gulp"),
    watch = require("gulp-watch"),
    Config = require("./config"),
    Script = require("./script");

/*
 * 监视文件变动
 */
gulp.task("watch", function () {

    return Config.gulpVerifyArgumentName(process, "watch", "project", function (projectName) {
        var srcPath = "./src/#project#/view/".replace("#project#", projectName),
            resPath = srcPath.replace("/view/", "/res/"),
            stylePath = srcPath.replace("/view/", "/style/"),
            cmptPath = "./module/cmpt/",
            cmpt3rdPath = "./module/cmpt3rd/",
            currentDir = process.cwd();
        // src - html
        gulp.watch([srcPath.concat("**/*.app.html")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.html(projectName, singleFile);
            });



        // src - js
        gulp.watch([srcPath.concat("**/*.app.js")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.webpack(projectName, singleFile);
            });
        // cmpt - js
        gulp.watch([cmptPath.concat("**/*.js")], ["webpack"]);

        // res - img  
        gulp.watch([resPath.concat("img/**/*")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.img(projectName, singleFile);
            });
        
        // res - json  
        gulp.watch([resPath.concat("json/**/*")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.json(projectName, singleFile);
            });
        

        // src - less
        gulp.watch([srcPath.concat("**/*.app.less")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.less(projectName, singleFile);
            });

        // cmpt - less
        gulp.watch([stylePath.concat("**/*.less"), cmptPath.concat("**/*.less")], ["less"]);

        // cmpt3rd
        gulp.watch([cmpt3rdPath.concat("**/*")], ["cmpt3rd"]);
    });

});



/*
 * 监视文件变动(release)
 */
gulp.task("watch:release", function () {

    return Config.gulpVerifyArgumentName(process, "watch", "project", function (projectName) {
        var srcPath = "./src/#project#/view/".replace("#project#", projectName),
            resPath = srcPath.replace("/view/", "/res/"),
            stylePath = srcPath.replace("/view/", "/style/"),
            cmptPath = "./module/cmpt/",
            cmpt3rdPath = "./module/cmpt3rd/",
            currentDir = process.cwd();

        // src - html
        gulp.watch([srcPath.concat("**/*.app.html")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.html_release(projectName, singleFile);
            });


        // src - js
        gulp.watch([srcPath.concat("**/*.app.js")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.webpack_release(projectName, singleFile);
            });

        // cmpt - js
        gulp.watch([cmptPath.concat("**/*.js")], ["webpack:release"]);

        // res - img 
        gulp.watch([resPath.concat("img/**/*")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.img_release(projectName, singleFile);
            });
        
        // res - json 
        gulp.watch([resPath.concat("json/**/*")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.json_release(projectName, singleFile);
            });

        // src - less
        gulp.watch([srcPath.concat("**/*.app.less")])
            .on("change", function (file) {
                var singleFile = ".".concat(file.path.replace(currentDir, ""));
                console.log("changed:" + singleFile);
                Script.less_release(projectName, singleFile);
            });

        // cmpt - less
        gulp.watch([stylePath.concat("**/*.less"), cmptPath.concat("**/*.less")], ["less:release"]);

        // cmpt3rd
        gulp.watch([cmpt3rdPath.concat("**/*")], ["cmpt3rd:release"]);

    });

});
