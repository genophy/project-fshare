var gulp = require("gulp");

/*
 *  默认执行
 * 	command:	gulp --project=<projectname> 
 *  
 */
gulp.task("default", () => {
    console.log("");
    console.log("");
    console.log("==============  1  ================")
    console.log("");
    console.log("======  the  project usage  ======")
    console.log("|_gulp create:init --project=<projectname>");
    console.log("|_gulp create:view --project=<projectname> --name=<viewname>");
    console.log("");
    console.log("");
    console.log("==============  2  ================")
    console.log("");
    console.log("======  the default usage  ======")
    console.log("|_gulp default_start --project=<projectname>");
    console.log("|_gulp watch --project=<projectname>");
    console.log("|_gulp serve --project=<projectname>");
    console.log("or run [./dev_run.sh]");
    console.log("");
    console.log("");
    console.log("==============  3  ================")
    console.log("");
    console.log("======  the default:release usage  ======")
    console.log("|_gulp default_start:release --project=<projectname>");
    console.log("|_gulp watch:release --project=<projectname>");
    console.log("|_gulp serve:release --project=<projectname>");
    console.log("or run [./release_run.sh]");
    console.log("==================================")
    console.log("");
    console.log("");
});

