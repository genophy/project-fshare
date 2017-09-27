"use strict";

exports.WEBPACK_ALIAS = {

};

exports.FILE_PROP = {
    CONTROLLER_SUFFIX: ".app.js"
};

exports.PORT = {
    DEV_PORT: "8000",
    RELEASE_PORT: "8100",
    MOCK_PORT: "8500"
};

/*
 * gulp的--<argument>==<v>中的argument是否存在，若存在则返回<v>，否则为null
 */
exports.gulpArgumentNameExist = function (process, argumentName) {
    var processArgvs = process.argv.join(" ");
    var matcherArr = processArgvs.match(eval('/--' + argumentName + '=\\S*/i'));
    if (matcherArr && matcherArr.length > 0) {
        return matcherArr[0].replace("--".concat(argumentName).concat("="), "");
    }
    else {
        return null;
    }
}

/*
 * gulp验证项目名称的输入,若验证不通过则抛出异常 
 */
exports.gulpVerifyArgumentName = function (process, taskName, argumentName, successFn) {

    if (!process || !taskName || !argumentName) {
        throw new Error("process or taskName or argumentName is undefined or null");
    } else {
        // var processArgvs = process.argv.join(" ");
        // var matcherArr = processArgvs.match(eval('/--' + argumentName + '=\\S*/i'));
        var argument = this.gulpArgumentNameExist(process,argumentName);
        if (argument) {
            return successFn && successFn(argument);
        } else {
            throw new Error("[#taskName#] no taskName, the usage maybe is : gulp #taskName# --#argumentName#=<#argumentName#-name>"
                .replace(/#taskName#/g, taskName).replace(/#argumentName#/g, argumentName));
        }
    }
};