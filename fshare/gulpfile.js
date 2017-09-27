var gulp = require("gulp"),
    recursiveReadSync = require("recursive-readdir-sync");
try {
    files = recursiveReadSync('./gulp');
    for (var i = 0; i < files.length; i++) {
        require("./".concat(files[i]));
    }
} catch (err) {
    if (err.errno === 34) {
        console.log('Path does not exist');
    } else {
        throw err;
    }
}