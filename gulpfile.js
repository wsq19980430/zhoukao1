// 引入gulp插件
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var mincss = require('gulp-clean-css');
// css
gulp.task('css', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('src/css'))
});
//js
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});
//启服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            host: '169.254.152.214',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
            }
        }))
})