//Follow the instructions to configurate gulp in your project folder:
//1. Ensure you have gulp installed as global
//      => sudo npm install gulp -g
//2. In the project folder => npm init
//      => to create package.json
//3. Install gulp as local in your project folder
//      => sudo npm install gulp --save-dev
//      => Gulp is being installed as dependency now
//4.Install de next dependencies:
//$ sudo npm install --save-dev gulp-sass
//$ sudo npm install --save-dev gulp-plumber
//$ sudo npm install --save-dev gulp-minify-css
//$ sudo npm install --save-dev gulp-uglify
//$ sudo npm install --save-dev gulp-concat
//for watch any npm is installed
//$ npm install browser-sync gulp --save-dev
//5. Create gulpfile.js in the root directory with this content below:


////////////////////////////////////////////////////////////////////////////////
//REQUIRE
////////////////////////////////////////////////////////////////////////////////
const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      plumber       = require('gulp-plumber'),
      minifyCSS     = require('gulp-minify-css'),
      uglify        = require('gulp-uglify'),
      concat        = require('gulp-concat'),
      browserSync   = require('browser-sync');

const dest_js = 'dist/js',
      dest_css = 'dist/css',
      src_sass = 'src/sass/*.sass',
      src_js = 'src/js/main.js';

////////////////////////////////////////////////////////////////////////////////
//TASKS
////////////////////////////////////////////////////////////////////////////////
//SASS to CSS
gulp.task('sass', function(){
  gulp.src(src_sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dest_css))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest(dest_css))
    .pipe(browserSync.reload({stream: true}));
});

//COMPILE JS
gulp.task('JavaScript', function(){
  gulp.src(src_js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(dest_js));
});


////////////////////////////////////////////////////////////////////////////////
//WATCH
////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function(){
  browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  gulp.watch(src_sass, ['sass']);
  gulp.watch(src_js, ['JavaScript']);
});


////////////////////////////////////////////////////////////////////////////////
//DEFAULT
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['watch']);


////////////////////////////////////////////////////////////////////////////////

//6. Run in the terminal $ gulp => automatic reload for SASS and JS files
