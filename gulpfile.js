const gulp = require('gulp');
// const gulpif = require('gulp-if');
// const sprity = require('sprity');
const clean = require('gulp-clean');
// const changed = require('gulp-changed');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
// const webpack = require('webpack-stream');

// Webpack
const webpack = require('webpack');
const webpackConf = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');


// gulp.task('default', function () {
//   return gulp.src(['*.js',
//     'config/*.js', 'config/**/*.js',
//     'client/js/common/*.js',
//     'client/js/*.js',
//     'libs/*.js'
//   ])
//     .pipe(jscs())
//     .pipe(jscs.reporter());
// });


// clears dist directory
gulp.task('clean', function () {
  return gulp.src(['dist', 'lib'], {
    read: true
  }).pipe(clean());
});

gulp.task('pack', ['clean'], function (done) {
  webpack(webpackConf('testing'), function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
    done();
  });
});

gulp.task('static', function (done) {
  var config = webpackConf('development');
  var compiler;
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devtool = 'eval-inline';
  config.debug = true;
  compiler = webpack(config);


  //   compiler.run(function(err, stats) {
  //     if (err) {
  //       throw new gutil.PluginError('webpack:build-dev', err);
  //     }
  //     gutil.log('[webpack:build-dev]', stats.toString({
  //       colors: true
  //     }));
  //     done();
  //   });
  new WebpackDevServer(compiler, {
    stats: {
      colors: true
    },
    hot: true,
    contentBase: './client/',
    watchDelay: 300,
    publicPath: config.output.publicPath,
    inline: false,
    lazy: false
  }).listen(4000, '127.0.0.1', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});


// generate sprite.png and _sprite.scss
// gulp.task('sprites', function () {
//   return sprity.src({
//     src: './client/img/icon/*.{png,jpg}',
//     style: './sprite.css',
//     cssPath: '../../less/',
//     margin: 0,

//     // ... other optional options
//     // for example if you want to generate scss instead of css
//     // make sure you have installed sprity-sass
//     processor: 'css'
//   })
//     .pipe(gulpif('*.png', gulp.dest('./client/img/'), gulp.dest('./client/less/')));
// });


gulp.task('compile', ['clean'], (done) => {
  var tsProject = ts.createProject('./server/tsconfig.json');
  var tsResult = gulp.src([
    'server/**/*.ts'
  ])
    .pipe(tsProject());
  tsResult.js.pipe(gulp.dest('./lib'));
});

gulp.task('watch', (done) => {
  gulp.watch('server/**/*.ts', ['compile']);
});
