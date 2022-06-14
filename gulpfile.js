var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var minirleikirpostcss = require('./postcss/minirleikir');
var rename = require('gulp-rename');
var liveReload = require('gulp-livereload');
var teams = require('./data/cssValues');
var processors = [
    minirleikirpostcss
];

var gulpif = require('gulp-if');
var env = process.env.NODE_ENV || 'development';
console.log(env);

var webpack = require('gulp-webpack');
var webpackConfigDev = require('./webpack.dev.config');
var webpackConfigProd = require('./webpack.prod.config');
var webpackConfig = env === 'development' ? webpackConfigDev : webpackConfigProd;

var env = process.env.NODE_ENV || 'development';

gulp.task('css', function(){
	teams.forEach(function(team){
		return gulp.src('./src/css/main.css')
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(liveReload());
	})
})

gulp.task('cssprod', function(){
	teams.forEach(function(team){
		return gulp.src('./src/css/main.css')
		.pipe(cssnano())
		.pipe(gulp.dest('./public/stylesheets'))
	})
})

gulp.task('scripts', function(){
	console.log('scripts');
	return gulp.src('./src/js/App.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./public/js'))
		
});

gulp.task('watch', function(){
	liveReload.listen();
	gulp.watch('./src/css/*.css', ['css']);
	//gulp.watch('./src/less/**/*.*', ['less','printless']);
	gulp.watch('./src/js/**/*.{js,jsx,less}', ['scripts']);
});


gulp.task('default', ['scripts','watch']);

