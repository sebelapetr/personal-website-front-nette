
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    run = require('gulp-run'),
    server = lr(),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

var css = {
    source: 'src/css',
    target: 'www/dist/css'
};

// Styles
gulp.task('css', function() {
    return gulp.src([
        css.source + '/*.css'
    ])
        .pipe(minifycss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(css.target))
        .pipe(notify({ message: 'Styles task complete' }));
});

/*
gulp.task('css', function() {
    return gulp.src('src/css/main.scss')
        .pipe(sass({ style: 'expanded', }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('www/dist/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest('www/dist/css/'))
        .pipe(notify({ message: 'Styles task complete' }));
});
 */

// Scripts
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('www/dist/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('www/dist/js/'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(livereload(server))
        .pipe(gulp.dest('www/dist/img'));
});


// Fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('www/dist/fonts'));
});

// Clean
gulp.task('clean', function() {
    console.log("clean");
    return gulp.src(['www/dist/css/*', 'www/dist/js/*', 'www/dist/img/*', 'www/dist/fonts/*'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', gulp.series('clean', 'css', 'js', 'img', 'fonts'), function() {
});

// Watch
gulp.task('watch', function() {

        // Watch .scss files
        gulp.watch('src/styles/*.css', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('css');
        });

        // Watch .js files
        gulp.watch('src/scripts/**/*.js', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('js');
        });

        // Watch image files
        gulp.watch('src/images/**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('img');
        });


});