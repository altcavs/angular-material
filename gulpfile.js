// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

var connect = require('gulp-connect');
/*
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
*/
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
});

/*
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
*/
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 1717
  });
});
// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('js/*.js', ['lint']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['./*.html'], ['html']);
});

// Default Task
gulp.task('default', ['lint', 'sass','webserver','watch']);