
var gulp = require("gulp"),
	Script = require("./script");

/*
 * 图片复制
 * 
 */
gulp.task("img", function () {
	return Script.img();
});

/*
 * 图片复制 (release)
 * 
 */
gulp.task("img:release", function () {
	return Script.img_release();
}); 