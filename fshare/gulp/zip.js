
var gulp = require("gulp"),
    zip = require("gulp-zip"),
    Config = require("./config");
/*
 * 打包dev目录
 */
gulp.task('zip', ["default_start"], () => {
    return Config.gulpVerifyArgumentName(process, "zip", "project", function (argv) {
        var devPath = "./dest/dev/#project#/**/*".replace("#project#", argv),
            destPath = "./dest/target/";

        return gulp.src(releasePath)
            .pipe(zip("dev.zip"))
            .pipe(gulp.dest(devPath));
    });
});

/*
 * 打包release目录
 */
gulp.task('zip:release', ["default_start:release"], () => {
    return Config.gulpVerifyArgumentName(process, "zip", "project", function (argv) {
        var releasePath = "./dest/release/#project#/**/*".replace("#project#", argv),
            destPath = "./dest/target/";

        return gulp.src(releasePath)
            .pipe(zip("release.zip"))
            .pipe(gulp.dest(destPath));
    });
});