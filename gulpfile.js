const browserSync = require('browser-sync');

var
    gulp = require('gulp'),
    config = require('./config/gulp'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass')(require('sass'));
    // cleanCSS = require('gulp-clean-css');
    // sourcemaps = require('gulp-sourcemaps');
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload
    ;

// gulp task to clear the dist directory 
// gulp.task('clean', function () {
//     return del(config.paths.dist_dir);
// });

// Clean the dist folder
function clean() {
    return del(['dist']);
}

// Compiling SASS to CSS
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dist(paths.styles.dist))
    .pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch('dist/views/**/*.ejs').on('change', browserSync.reload);
    gulp.watch(paths.scripts.src).on('change', browserSync.reload);
}

// gulp task to define our VIEWS
gulp.task('dev:views', function() {
    return gulp
    .src(config.paths.views.src)
    // To process the views
    .pipe(gulp.dest(config.paths.views.dist))
})

// gulp task to watch the views directory
gulp.task('watch:views', function(done) {
    gulp.watch(config.paths.views.src, gulp.series('dev:views'));
    done();
})

// gulp task to watch for styles in the styles directory
gulp.task('dev:styles', function() {
    return gulp
    .src(config.paths.styles.src)
    // To process the styles
    .pipe(gulp.dest(config.paths.styles.dist))
})

// gulp task to watch for scripts in the scripts directory
gulp.task('watch:styles', function (done) {
    gulp.watch(config.paths.styles.src, gulp.series('dev:styles'));
    done();
})

// gulp task to serve the files
gulp.task('server', function (serve) {
    var called = false;
    return nodemon(config.plugins.nodemon)
    .on('start', function () {
        if (!called) {
            called = true;
            console.log('Server started...');
            serve();
        }
    })
});

// Set up browser-sync to work with gulp
function browserSyncInit(done) {
    browserSync.init(config.plugins.browserSync);
    done(); 
}

gulp.task('browser-sync', browserSyncInit);

// Watch for changes to the files
gulp.task('dev', gulp.parallel('watch:views', 'watch:styles'));

gulp.task('watch', gulp.parallel('watch:styles', 'watch:views'));

gulp.task('default', gulp.series( 'dev', 'server', gulp.parallel('watch', 'browser-sync')));