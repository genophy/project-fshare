var gulp   = require('gulp'),
	Config = require('./config');

/*
 *  默认执行
 * 	command:	gulp --project=<projectname> 
 *  
 */
gulp.task('default_start', ['less', 'webpack', 'img', 'json', 'html', 'cmpt3rd'], function() {
});

/*
 *  默认执行(release)
 * 	command:	gulp --project=<projectname> 
 *  
 */
gulp.task('default_start:release', ['less:release', 'webpack:release', 'img:release', 'json:release', 'html:release', 'cmpt3rd:release'], function() {
});
