var gulp   = require('gulp'),
	Script = require('./script');

/*
 * webpack  编译 
 */
gulp.task('webpack', function() {
	return Script.webpack();
});

/*
 * webpack  编译  (release)
 */
gulp.task('webpack:release', function() {
	return Script.webpack_release();
});
