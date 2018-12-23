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
var imagemin = require('gulp-imagemin');


gulp.task('css', function(){
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false})]))
    // .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat("app.js"))
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

gulp.task('img', function(){
    return gulp.src('./src/img/**/*.*')
    .pipe(sourcemaps.init())
    .pipe(imagemin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/img'))
    .pipe(browserSync.stream());
})



gulp.task("build", gulp.series('css', 'js', 'img' 
// 'nextTask'
));

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.series('css'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch('./src/img/**/*.*', gulp.series('img'));
    // gulp.watch('./src/**/*.*', gulp.series('nextTask'));
});

gulp.task('server', function(){
    browserSync.init({
        server: {baseDir: 'public/',
                 browser: "google chrome"}
        
    });

    browserSync.watch("public/**/*.*").on('change', browserSync.reload);
})

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
// gulp.task('build:prod', gulp.series())


