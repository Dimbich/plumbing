const { src, dest ,series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const tinypng = require('gulp-tinypng-compress');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const minifyInline = require('gulp-minify-inline');

function minifyCss() {
  return src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(minifyInline())
    .pipe(dest('./dist/css/'));
}

function imageMin() {
  return src('./src/img/**/*.{png,jpg,jpeg}')
  .pipe(tinypng({
    key: 'XfUopX2KrUmE7PhmWn67XhNz0XqNbYzY'
}))
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5})
  ]))
  .pipe(dest('./dist/img/'));
}

function moveJs() {
  return src('./src/js/*.js')
  .pipe(minify())
  .pipe(minifyInline())
  .pipe(dest('./dist/js'));
}

function minHtml() {
  return src('./src/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .minifyInline()
  .pipe(dest('./dist/'));
}

function moveFonts() {
  return src('./src/fonts/**/*')
  .pipe(dest('./dist/fonts/'));
}



exports.default = series(minifyCss, imageMin, moveJs, minHtml, moveFonts);