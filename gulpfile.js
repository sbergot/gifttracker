/// <binding Clean='clean' />
"use strict";

var gulp   = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    tsc    = require("gulp-typescript"),
    uglify = require("gulp-uglify"),
    exec   = require('child_process').exec;

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    ts: "./typescript/*.ts",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    tsDest: webroot + "js",
    concatCssDest: webroot + "css/site.min.css"
};

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build:ts", function(cb) {
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(paths.tsDest));
});

gulp.task('build:cs', function (cb) {
  exec('dotnet build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build', ['build:cs', 'build:ts']);

gulp.task('watch:ts', ['build:ts'], function() {
    gulp.watch(paths.ts, ['build:ts']);
});

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
