var gulp = require("gulp"),
    Script = require("./script");

/*
 * 将 cmpt3rd 复制 dest目录
 */
gulp.task("cmpt3rd", function () {
    return Script.cmpt3rd();
});


/*
 * 将 cmpt3rd 复制 dest目录 (release)
 */
gulp.task("cmpt3rd:release", function () {
    return Script.cmpt3rd_release();
}); 