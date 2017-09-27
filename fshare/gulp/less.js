
var gulp = require("gulp"),
    Script = require("./script");

/*
 * 脚本编译
 * 
 * 将 *.app.less 编译成为同目录下的*.app.css
 * 
 * 优先级 (最大级若存在且不为空文件，则只编译最大级别到 *.app.css。若*.app.js以上级别的文件都为空文件，则不进行编译 )
 * 
 * 
 * *.app.css <_ *.app.less
 */
gulp.task("less", function () {
	return Script.less();
});

/*
 * 脚本编译 (release)
 * 
 * 将 *.app.less 编译成为同目录下的*.app.css
 * 
 * 优先级 (最大级若存在且不为空文件，则只编译最大级别到 *.app.css。若*.app.js以上级别的文件都为空文件，则不进行编译 )
 * 
 * 
 * *.app.css <_ *.app.less
 */
gulp.task("less:release", function () {
	return Script.less_release();
}); 