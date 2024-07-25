var
    gulp = require('gulp'),
    config = require('./config/gulp'),
    //del = require('del'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload
    ;

// gulp task to clear the dist directory 
// gulp.task('clean', function () {
//     return del(config.paths.dist_dir);
// });
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