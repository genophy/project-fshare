

var gulp = require("gulp"),
    Script = require("./script");


/*
 * 初始化项目
 * 
 *    command:    gulp create:init --project=<projectname>
 *    result:      
 *          
 *   |-projectname
 *   |---style
 *   |-----less
 *   |-------site.less
 *   |-------variable.less
 * 
 */

gulp.task("create:init", function () {
    return Script.create_init();
});


/*
 * 创建项目下的模块 
 * 
 *    command:    gulp create:view --project=<projectname> --name=<viewname>
 *    result:
 * 
 *    |-projectname
 *    |---viewname
 *    |-----viewname.app.css
 *    |-----viewname.app.html
 *    |-----viewname.app.js
 *    |-----viewname.app.less
 *    |-----viewname.app.ts`
 * 
 */

gulp.task("create:view", function () {
    return Script.create_view();
});
