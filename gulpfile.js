var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var htmlBeautify = require('gulp-html-beautify');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var reload = browserSync.reload;
// var del = require('del');

gulp.task('serve', ['build'], function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		open: false
	});

	gulp.watch(['*.pug', 'styles/**/*.scss'], {cwd: 'src'}, function () { gulp.start('build') });
	gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
// gulp.task('clean', function () { 
	// del(['build']) 
// });

gulp.task('pug', function () {
	return gulp.src('./src/**/*.pug')
		.pipe(pug())
		.pipe(htmlBeautify({ indentSize: 2 }))
		.pipe(gulp.dest('app'))
		.pipe(reload({ stream: true }));
});

gulp.task('sass', function () {
	return gulp.src('./src/styles/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/styles'))
		.pipe(reload({ stream: true }));
})

gulp.task('js', function() {
	// temp solution
	return gulp.src('app/scripts/**/*.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('app/scripts'));
})

gulp.task('beautify', function () {
	var options = {
		indentSize: 2
	};
	gulp.src('./app/*.html')
		.pipe(htmlBeautify(options))
		.pipe(gulp.dest('app'))
		.pipe(reload({ stream: true }));
});

gulp.task('build', function () {
	gulp.start('pug', 'sass', 'js');//, 'beautify');
})

gulp.task('default', ['build']);