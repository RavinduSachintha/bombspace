var program = require ('commander');
var browserify = require('browserify');
var express = require('express');
var path = require('path');
var rimraf = require('rimraf');

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var buffer = require('gulp-buffer');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var eslint = require('gulp-eslint');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var micro = require('gulp-micro');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var source = require('vinyl-source-stream');

var prod = false;

program.on('--help', function () {
  console.log('  Tasks:');
  console.log();
  console.log('    build       build the game');
  console.log('    clean       delete generated files');
  console.log('    dist        generate archive');
  console.log('    serve       launch development server');
  console.log('    watch       watch for file changes and rebuild automatically');
  console.log();
});

program
  .usage('<task> [options]')
  .option('-P, --prod', 'generate production assets')
  .action(function (options) {
    prod = options.prod;
  })
  .parse(process.argv);

function buildSource() {
  var bundler = browserify('./src/main', { debug: !prod });
  if (prod) {
    bundler.plugin(require('bundle-collapser/plugin'));
  }

  return bundler
    .bundle()
    .on('error', browserifyError)
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(gulpif(prod, uglify()))
    .pipe(gulp.dest('build'));
}

function buildIndex() {
  return gulp.src('src/index.html')
    .pipe(gulpif(prod, htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
    })))
    .pipe(gulp.dest('build'));
}

function buildStyles() {
  return gulp.src('src/styles.less')
    .pipe(less())
    .pipe(concat('build.css'))
    .pipe(gulpif(prod, cssmin()))
    .pipe(gulp.dest('build'));
}

function clean() {
  rimraf.sync('build');
  rimraf.sync('dist');
}

function lint() {
  return gulp.src(['*.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
}

function finalDist() {
  if (!prod) {
    gutil.log(gutil.colors.yellow('WARNING'), gutil.colors.gray('Missing flag --prod'));
    gutil.log(gutil.colors.yellow('WARNING'), gutil.colors.gray('You should generate production assets to lower the archive size'));
  }

  return gulp.src('build/*')
    .pipe(zip('archive.zip'))
    .pipe(size())
    .pipe(micro({ limit: 13 * 1024 }))
    .pipe(gulp.dest('dist'));
}

function watch() {
  gulp.watch('src/**/*.js', gulp.series(lint, buildSource));
  gulp.watch('src/styles.less', gulp.series(buildStyles));
  gulp.watch('src/index.html', gulp.series(buildIndex));
}

function finalServe() {
  var htdocs = path.resolve(__dirname, 'build');
  var app = express();

  app.use(express.static(htdocs));
  app.listen(3000, function () {
    gutil.log("Server started on '" + gutil.colors.green('http://localhost:3000') + "'");
  });
}

// complex tasks
var build = gulp.parallel(buildSource, buildIndex, buildStyles);
var dist = gulp.series(build, finalDist);
var serve = gulp.series(build, finalServe);

gulp.task('default', build);
gulp.task('build', build);
gulp.task('dist', dist);
gulp.task('watch', gulp.series(watch));
gulp.task('serve', gulp.series(serve));

gulp.task('build_source', gulp.series(buildSource));
gulp.task('build_index', gulp.series(buildIndex));
gulp.task('build_styles', gulp.series(buildStyles));

gulp.task('clean', gulp.series(clean));
gulp.task('lint', gulp.series(lint));

function browserifyError(err) {
  gutil.log(gutil.colors.red('ERROR'), gutil.colors.gray(err.message));
  this.emit('end');
}
