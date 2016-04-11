const gulp = require('gulp');
const gulpif = require('gulp-if');
const sprity = require('sprity');
const jscs = require('gulp-jscs');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const gutil = require('gulp-util');



// Webpack
const webpack = require('webpack');
const webpackConf = require('./webpack.config');



gulp.task('default', function() {
  return gulp.src(['*.js',
    'config/*.js', 'config/**/*.js',
    'client/js/common/*.js',
    'client/js/*.js',
    'libs/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});


// clears dist directory
gulp.task('clean', function() {
  return gulp.src(['dist'], { read: true }).pipe(clean());
});

gulp.task('test', ['clean'], function(done) {
  webpack(webpackConf('testing'), function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    done();
  });
});


// generate sprite.png and _sprite.scss
gulp.task('sprites', function() {
  return sprity.src({
    src: './client/img/icon/*.{png,jpg}',
    style: './sprite.css',
    cssPath: '../../less/',
    margin: 0,

    // ... other optional options
    // for example if you want to generate scss instead of css
    // make sure you have installed sprity-sass
    processor: 'css'
  })
    .pipe(gulpif('*.png', gulp.dest('./client/img/'), gulp.dest('./client/less/')));
});
