var gulp            = require('gulp'),
	browserSync     = require('browser-sync').create(),
	proxyMiddleware = require('http-proxy-middleware'),

	Config          = require('./config');

/*
 * 启动服务器
 */
gulp.task('serve', function() {
	return Config.gulpVerifyArgumentName(process, 'serve', 'project', function(argv) {
		var baseDir = './dest/dev/#project#/'.replace('#project#', argv);
		var proxy   = proxyMiddleware('/rest',
			{
				target: 'http://localhost:8080',
			});
		browserSync.init({
			port:      Config.PORT.DEV_PORT,
			startPath: '/',
			browser:   ['chromium'],
			server:    {
				baseDir:    baseDir,
				middleware: [proxy],
			},

		});
	});

});

/*
 * 启动服务器
 */
gulp.task('serve:release', function() {
	return Config.gulpVerifyArgumentName(process, 'serve', 'project', function(argv) {
		var baseDir = './dest/release/#project#/'.replace('#project#', argv);
		var proxy   = proxyMiddleware('/rest',
			{
				target: 'http://localhost:8080',
			});

		browserSync.init({
			port:      Config.PORT.DEV_PORT,
			startPath: '/',
			browser:   ['chromium'],
			server:    {
				baseDir:    baseDir,
				middleware: [proxy],
			},

		});
	});

});
