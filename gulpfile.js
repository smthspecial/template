"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var babel = require('gulp-babel');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require("browser-sync").create();
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');


gulp.task('css', function(){
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

// gulp.task('nextTask', function(){
//     return gulp.src('./src/**/*.*')
//     .pipe(sourcemaps.init())

//     .pipe(nextTaskPlugin())

//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./public'))
//     .pipe(browserSync.stream());
// })



gulp.task("build", gulp.series('css', 'js', 
// 'nextTask'
));

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.series('css'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    // gulp.watch('./src/**/*.*', gulp.series('nextTask'));
});

gulp.task('server', function(){
    browserSync.init({
        server: {baseDir: 'public/'}
    });

    browserSync.watch("public/**/*.*").on('change', browserSync.reload);
})

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
// gulp.task('build:prod', gulp.series())

















//sass.compiler = require("node-sass");

// gulp.task("brs", function() {
//   browserSync.init({
//     server: {
//       baseDir: "./public"
//     }
//   });
// //   gulp.watch("./public").on("change", browserSync.reload);
//   gulp.watch("./src/**/*.scss", gulp.series("sass"));
// });

// gulp.task("sass", function() {
//   return gulp
//     .src("./src/scss/**/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(gulp.dest("./public/css"))
//     .pipe(browserSync.stream());
// });

// gulp.task("watch", gulp.series('sass', 'brs'), function() {
//   gulp.watch("./src/**/*.scss",).on('change', gulp.series('sass'));
// });
