var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var concatJs = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var stripLine = require('gulp-strip-line');
var browserSync = require('browser-sync').create();

var paths = {
  css: {
    bootstrap: './node_modules/bootstrap/dist/css/bootstrap.min.css',
    main: './main.css'
  },
  favicon: [
    './favicon.ico'
  ],
  html: {
    index: './index.html'
  },
  img: [
    './assets/*.png',
    './assets/*.jpg'
  ],
  js: {
    jquery: './node_modules/jquery/dist/jquery.min.js',
    jqueryVisible: './node_modules/jquery-visible/jquery.visible.min.js',
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    main: './main.js'
  }
};

gulp.task('build.css', function() {
  var srcPaths = [
    paths.css.bootstrap,
    paths.css.main
  ];

  gulp.src(srcPaths)
    .pipe(autoprefixer())
    .pipe(concatCss('main.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build.html', function() {
  var srcPaths = [
    paths.html.index
  ];
  var linesToStrip = ['node_modules'];

  gulp.src(srcPaths)
    .pipe(stripLine(linesToStrip))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});


gulp.task('build.img', function() {
  gulp.src(paths.img)
    .pipe(copy('./dist'))
});

gulp.task('build.favicon', function() {
  gulp.src(paths.favicon)
    .pipe(copy('./dist'))
});

gulp.task('build.js', function() {
  var srcPaths = [
    paths.js.jquery,
    paths.js.jqueryVisible,
    paths.js.bootstrap,
    paths.js.main
  ];
  gulp.src(srcPaths)
    .pipe(uglify())
    .pipe(concatJs('main.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sync', function() {
  browserSync.init({
    server: {
    baseDir: './'
    },
    open: false
  });

  gulp.watch(paths.html.index).on('change', browserSync.reload);
  gulp.watch(paths.js.main).on('change', browserSync.reload);
  gulp.watch(paths.css.main, ['injectCss']);
});

gulp.task('injectCss', function() {
  return gulp.src(paths.css.main)
    .pipe(browserSync.stream());
});
