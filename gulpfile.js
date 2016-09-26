var exec = require('child_process').exec;
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var paths = {
  css: {
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

gulp.task('build', function(done) {
  runSequence(
    'clean',
    ['build.css', 'build.html', 'build.js', 'build.img', 'copy.favicon'],
    done
  );
})

gulp.task('clean', function(done) {
  exec('rm -rf ./dist', done);
});

gulp.task('build.css', function() {
  var srcPaths = [
    paths.css.main
  ];

  return gulp.src(srcPaths)
    .pipe(plugins.autoprefixer())
    .pipe(plugins.concatCss('main.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build.html', function() {
  var srcPaths = [
    paths.html.index
  ];
  var linesToStrip = ['node_modules'];

  return gulp.src(srcPaths)
    .pipe(plugins.stripLine(linesToStrip))
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});


gulp.task('build.img', function() {
  return gulp.src(paths.img)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy.favicon', function() {
  return gulp.src(paths.favicon)
    .pipe(plugins.copy('./dist'));
});

gulp.task('build.js', function() {
  var srcPaths = [
    paths.js.jquery,
    paths.js.jqueryVisible,
    paths.js.bootstrap,
    paths.js.main
  ];

  return gulp.src(srcPaths)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('main.js'))
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
