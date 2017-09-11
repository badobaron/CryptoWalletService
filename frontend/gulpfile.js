var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

 gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});


gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./app/bower.json'])
        .pipe(install());
});

gulp.task('sass', function(){
  return gulp.src('app/styles/app.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/css/'))
});


//gulp.task('build-css', function() {
//    return gulp.src('./app/css/app.css')
//        .pipe(sourcemaps.init())
////        .pipe(sass())
//        .pipe(cachebust.resources())
////        .on('error', gutil.log)
//        .pipe(sourcemaps.write('./maps'))
//        .pipe(gulp.dest('./dist/css/'));
//});

gulp.task('jshint', function() {
    gulp.src(['./app/*.js', './app/components/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build-js', function() {
    var b = browserify({
        entries: './app/app.js',
        debug: true,
        paths: ['./app','./app/components/**'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task('build', [ 'clean', 'sass', 'build-js'], function() {
    return gulp.src('./app/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
    return gulp.watch(['./app/index.html','./app/components/**/*.html', './app/styles/*.*css', './app/**/*.js'], ['build']);
});


gulp.task('webserver', ['watch','build'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8001/dist/index.html"
        }));
});


gulp.task('default', ['build']);