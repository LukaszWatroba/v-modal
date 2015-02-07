var pkg = require('./package.json');

var banner = '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n\n';

var gulp = require('gulp'),
    karma = require('karma').server,
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    header = require('gulp-header');

gulp.task('scripts', function() {
  gulp.src([
      'src/vModal/vModal.prefix',
      'src/vModal/*.js',
      'src/vModal/directives/*.js',
      'src/vModal/services/*.js',
      'src/vModal/vModal.suffix'
    ])
    .pipe(concat('v-modal.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('v-modal.min.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'))
});

gulp.task('styles', function() {
  return gulp.src('src/vModal/styles/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({suffix: '.min'} ))
    .pipe(minifycss())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/'))
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('lint-src', function() {
  return gulp.src([
      'src/vModal/**/*.js',
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-tests', function() {
  return gulp.src([
      'test/**/*Spec.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['lint-src', 'test', 'scripts', 'styles']);

gulp.task('watch', function() {
  gulp.watch('src/vModal/**/*.js', ['lint-src', 'scripts']);
  gulp.watch('test/**/*.spec.js', ['lint-tests', 'test']);
  
  gulp.watch('src/vModal/styles/**/*.scss', ['styles']);
});