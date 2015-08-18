var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var watchify = require('watchify');
var assign = require('lodash.assign');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

var customOpts = {
  entries: ['./app/js/main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b
    .transform(babelify.configure({
      blacklist: ["regenerator"]
    }))
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('all.js'))
    .pipe(gulp.dest('./app/dist'));
}

gulp.task('serve', ['js', 'sass'], function() {
  browserSync({
    server: "./app"
  });

  gulp.watch('./app/scss/*.scss', ['sass']);

  gulp.watch([
    './app/dist/*.js',
    './app/*.html'
  ]).on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/dist'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['serve']);