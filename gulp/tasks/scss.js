'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');

var CONFIG = require('../config.js');
var SRC = 'scss/**/*.scss';
var DESTINATION = 'css';
var DESTINATION_JS = 'js';

// Compile Sass files into css
gulp.task('scss', ['scss:compile']);

gulp.task('scss:compile', function () {
    var processors = [
        autoprefixer()
    ];
    return gulp.src(SRC)
        .pipe(changed(DESTINATION, {extension: '.css'}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(DESTINATION))
        .pipe(cleanCSS())
        // .pipe(concat('haguruma.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DESTINATION))
        .pipe(browserSync.stream());
});

// Recompile all
gulp.task('scss:recompile', function () {
    var processors = [
        autoprefixer()
    ];
    return gulp.src(SRC)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(DESTINATION))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DESTINATION))
        .pipe(browserSync.stream());
});

// Compile library
gulp.task('scss:lib', function () {
    return gulp.src(CONFIG.CSS_DEPS)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat('lib.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DESTINATION));
});
gulp.task('scss:lib_js', function () {
    return gulp.src(CONFIG.JS_DEPS)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DESTINATION_JS));
});

// Compile common
gulp.task('scss:common', function () {
    return gulp.src('scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});
