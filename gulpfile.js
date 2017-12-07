////////////////////////////////////////////////////////////////////////////////
//REQUIRE
////////////////////////////////////////////////////////////////////////////////
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
(sourcemaps = require('gulp-sourcemaps')),
    (autoprefixer = require('gulp-autoprefixer')),
    (browserSync = require('browser-sync'));

const dest_js = 'dist/js',
    dest_css = 'dist/css',
    src_sass = 'src/sass/*.sass',
    src_js = 'src/js/main.js';

////////////////////////////////////////////////////////////////////////////////
//TASKS
////////////////////////////////////////////////////////////////////////////////
//SASS to CSS
gulp.task('sass', function() {
    gulp
        .src(src_sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(
            autoprefixer({
                browsers: [
                    'last 2 version',
                    'safari 5',
                    'ie 6',
                    'ie 7',
                    'ie 8',
                    'ie 9',
                    'opera 12.1',
                    'ios 6',
                    'android 4'
                ]
            })
        )
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest_css))
        .pipe(minifyCSS({ keepBreaks: true }))
        .pipe(gulp.dest(dest_css))
        .pipe(browserSync.reload({ stream: true }));
});

//COMPILE JS
gulp.task('JavaScript', function() {
    gulp
        .src(src_js)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(dest_js));
});

////////////////////////////////////////////////////////////////////////////////
//WATCH
////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(src_sass, ['sass']);
    gulp.watch(src_js, ['JavaScript']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

////////////////////////////////////////////////////////////////////////////////
//DEFAULT
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['watch']);
