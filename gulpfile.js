var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    cssmin = require('gulp-minify-css'),
    concatJs = require('gulp-concat'),
    concatCss = require('gulp-concat-css');


gulp.task('styles:bootstrap:uncss', function() {
    gulp.src('./assets/css/bootstrap.min.css')
        .pipe(uncss({
            html: ['./index.html'],
            ignore: [
                /in+/,
                /out+/,
                /open+/,
                /collapsing+/
            ]
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('styles:prefix', function() {
    gulp.src('./main.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'));
});

gulp.task('styles:concat', function() {
    gulp.src(['./bootstrap.min.css', './main.css'])
        .pipe(concatCss('main.min.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('styles:minify', function() {
    gulp.src('./main.min.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./'));
});


gulp.task('js:concat', function() {
    gulp.src(['./assets/jquery.min.js', './assets/jquery.visible.min.js', './assets/js/bootstrap.min.js', './main.js'])
        .pipe(concatJs('main.min.js'))
        .pipe(gulp.dest('./'));
});
