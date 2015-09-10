var gulp = require('gulp'),
    shell = require('gulp-shell'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    path = require('path'),
    fs = require('fs'),
    config = require('./www/jxcore/config')(__dirname),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    useref = require('gulp-useref'),
    npm = require('npm');

gulp.task('install-jxcore-modules', function (callback) {
    npm.load(function (err) {
        if (err) {
            callback(err);
        } else {
            npm.commands.install(config.absJXcorePath, [], function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    });
});

gulp.task('watch-jxcore-modules', ['install-jxcore-modules'], function () {
    watch([config.absJXcorePath, 'package.json'], function () {
        gulp.start('install-jxcore-modules');
    });
});

gulp.task('build-ngpack', function () {
    return gulp.src('').pipe(shell('ngpack build'));
});

gulp.task('watch-ngpack', ['build-ngpack'], function () {
    var moduleJSFilesPath = path.join(config.publicPath, 'modules', './**/*.js');

    watch([moduleJSFilesPath, 'ngpack.json'], function () {
        gulp.start('build-ngpack');
    });
});

gulp.task('move-ngpack-html', function () {
    var moduleHTMLBasePath = path.join(config.publicPath, 'modules');
        moduleHTMLFilesPath = path.join(moduleHTMLBasePath, './**/*.html');

    return gulp
        .src(moduleHTMLFilesPath, { base: config.publicPath })
        .pipe(gulp.dest(config.buildPath));
});

gulp.task('move-shared', function () {
    return gulp.src('./shared/**', { base: './shared' })
        .pipe(gulp.dest(path.join(config.publicPath, 'shared_components')));
});

gulp.task('watch-shared', ['move-shared'], function () {
    watch(['./shared/**/*.js'], function () {
        gulp.start('move-shared');
    });
});

gulp.task('start-server', ['install-jxcore-modules'], function () {
    return nodemon({
        script: path.resolve(config.absJXcorePath, 'app.js'),
        ext: 'js',
        ignore: ['node_modules/*'],
        env: {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('install-bower-modules', function () {
    return gulp.src('').pipe(shell('bower install --allow-root'));
});

gulp.task('watch-bower-modules', ['install-bower-modules'], function () {
    watch(['./bower.json'], function () {
        gulp.start('install-bower-modules');
    });
});

gulp.task('start', [
    'watch-jxcore-modules',
    'watch-bower-modules',
    'watch-ngpack',
    'watch-shared',
    'start-server'
], function () {
    
});

// build
gulp.task('build-html-assets', ['install-bower-modules', 'build-ngpack', 'move-shared'], function () {
    var assets = useref.assets();
    
    return gulp.src(path.join(config.publicPath, 'index.html'))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({
            keepSpecialComments: 0
        })))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.buildPath)); 
});

gulp.task('move-custom-fonts', function () {
    return gulp.src(path.join(config.publicPath, 'fonts/**'))
        .pipe(gulp.dest(path.join(config.buildPath, 'fonts'))); 
});

gulp.task('move-images', function () {
    return gulp.src(path.join(config.publicPath, 'img/**'))
        .pipe(gulp.dest(path.join(config.buildPath, 'img')));
});

gulp.task('build', [
    'build-jxcore-modules',
    'build-html-assets',
    'move-ngpack-html',
    'move-custom-fonts',
    'move-images'
], function (){

});