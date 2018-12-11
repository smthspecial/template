"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
sass.compiler = require("node-sass");

gulp.task("brs", function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
//   gulp.watch("./public").on("change", browserSync.reload);
  gulp.watch("./src/**/*.scss", gulp.series("sass"));
});

gulp.task("sass", function() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", gulp.series('sass', 'brs'), function() {
  gulp.watch("./src/**/*.scss",).on('change', gulp.series('sass'));
});
