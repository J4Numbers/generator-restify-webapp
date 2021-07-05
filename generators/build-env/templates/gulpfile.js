const del = require('del');
const sassCompiler = require('sass');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(sassCompiler);

const centralDest = 'out/';
const pathLists = require('./gulp-sources.json');

const testInputSrc = (sources) => sources.length > 0;

const clean = () => del([ centralDest ]);

const fonts = () => {
  if (testInputSrc(pathLists.fonts.src)) {
    return gulp.src(pathLists.fonts.src)
      .pipe(gulp.dest(pathLists.fonts.dest));
  }
  return Promise.resolve();
}

const images = () => {
  if (testInputSrc(pathLists.images.src)) {
    return gulp.src(pathLists.images.src)
      .pipe(gulp.dest(pathLists.images.dest));
  }
  return Promise.resolve();
}

const babelise = () => {
  if (testInputSrc(pathLists.babel.src)) {
    return gulp.src(pathLists.babel.src)
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(gulp.dest(pathLists.babel.dest));
  }
  return Promise.resolve();
}

const scripts = () => {
  if (testInputSrc(pathLists.scripts.src)) {
    return gulp.src(pathLists.scripts.src)
      .pipe(gulp.dest(pathLists.scripts.dest));
  }
  return Promise.resolve();
}

const styles = () => {
  if (testInputSrc(pathLists.styles.src)) {
    return gulp.src(pathLists.styles.src)
      .pipe(sass({}))
      .pipe(gulp.dest(pathLists.styles.dest));
  }
  return Promise.resolve();
}

const assets = gulp.parallel(fonts, images, babelise, scripts, styles);

exports.assets = assets;
exports.babelise = babelise;
exports.clean = clean;
exports.fonts = fonts;
exports.images = images;
exports.scripts = scripts;
exports.styles = styles;
