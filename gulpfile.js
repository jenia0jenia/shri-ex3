const gulp = require('gulp'),
      gp = require('gulp-load-plugins')(),
      gulpIf = require('gulp-if');

const webpack        = require('webpack'),
      webpack_stream = require('webpack-stream'),
      webpack_config = require('./webpack.config.js');

const path = require('path');                  // Утилита для работы с путями
const browserSync = require('browser-sync').create();
// const doiuse = require('doiuse');

 
const isDevelopment = process.env.NODE_ENV == 'development';

const paths = {
    path:                 './',
    public:               './',
    jsPathName:           '',                       // Директория с map-файлами для css
    mapPathName:          'maps/',                       // Директория с map-файлами для css
    webpackEntry:         'index.js',
}

paths.js_path               = path.join(paths.public, paths.jsPathName); // Директория, где располагаются js-файлы\
paths.html_files_mask       = path.join(paths.path, '**', '*.html');
paths.js_files_mask         = path.join(paths.js_path, '*.js');

gulp.task('html', __html);

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.parallel('watch:html')
});

gulp.task('webpack', __js);

gulp.task('watch:html', function() {
    gulp.watch(paths.html_files_mask, gulp.series('html'));
});

gulp.task('watch:js', function(done) {
    gulp.watch(paths.js_files_mask, gulp.series('webpack'));
});

gulp.task('watch:all', gulp.series(
    gulp.parallel('watch:html', 'watch:js', 'server')
));

gulp.task('build', gulp.series('html'));
// // ======== TASKS

const onError = function (err) {
    console.log(err);
};

function __html(done) {
    return gulp.src(paths.html_files_mask)
        .on('end', browserSync.reload);
}

function __js(done) {
    console.log(webpack_config);
    return gulp.src(paths.webpackEntry)
        .pipe(webpack_stream(webpack_config, webpack))
        .pipe(gulp.dest(paths.js_path))
        .on('end', browserSync.reload);
}