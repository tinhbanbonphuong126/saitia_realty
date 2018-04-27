var gulp = require('gulp');
var port = process.env.SERVER_PORT || 3000;
var browserSync = require('browser-sync');
var requireDir = require('require-dir');

requireDir('./gulp/tasks');

gulp.task('build', ['scss']);

// Start a browserSync instance
gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: "./",
        port: port,
    });
});

// Watch file for changes
gulp.task('watch', function () {

    // Only compile common style
    gulp.watch(['scss/style.scss',
            'scss/components/*.scss',
            'scss/_base.scss',
            'scss/_common-jp.scss',
            'scss/_layout.scss',
            'scss/_responsive.scss',
            'scss/_utilities.scss'], ['scss:common']);

    // Watch submodule to rebuild style
    gulp.watch(['scss/**/*.scss',
        '!scss/*.scss',
        '!scss/components/*.scss',
        '!scss/mixins/*.scss',
        '!scss/utilities/*.scss'], ['scss']);

    // Watch common for all style, if change build all project
    gulp.watch([
            'scss/mixins/*',
            'scss/_functions.scss',
            'scss/_variables.scss',
            'scss/_mixins.scss',
            'scss/_require.scss'], ['scss:common', 'scss:recompile']);

    // Watch html status, if change refresh browser
    gulp.watch(['**/*.html',
        '!bower_components/*',
        '!node_modules/*',
        '!plugins/*'])
        .on('change', browserSync.reload);
});

// Default gulp
gulp.task('default', ['serve', 'scss:lib', 'scss:common', 'watch']);
