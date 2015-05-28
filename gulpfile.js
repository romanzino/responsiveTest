var gulp = require('gulp'),
	watch = require('gulp-watch'),
	stylus = require('gulp-stylus'),
	dookie = require('dookie-css'),
	concat = require('gulp-concat'),
	rupture = require('rupture'),
	combineMq = require('gulp-combine-mq'),
	spritesmith = require('gulp.spritesmith'),
	minifyCSS = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	combineMq = require("gulp-combine-mq");

gulp.task('stylus', function () {
	gulp
		.src('./stylus/*.styl')
		.pipe(stylus({
			use: [dookie.css(), rupture()]
		}))
		.pipe(gulp.dest('./css'));
});


gulp.task('watch', function () {
	gulp.watch('./stylus/**/*.styl', ['stylus', 'cssbuild']);
});

gulp.task('sprite', function () {
  var sprites = gulp.src('images/sprites/**/*.png')
	.pipe(spritesmith({
  	cssFormat: 'stylus',
  	imgName: 'sprites.png',
  	cssName: 'index.styl',
  	imgPath: '../images/sprites.png',
  	cssVarMap: function(sprite) {
  	    sprite.name = 'i-' + sprite.name;
  	}
  }));

  sprites.img.pipe(gulp.dest('./images/'));
  sprites.css.pipe(gulp.dest('./stylus/sprites/'));
});

gulp.task('cssbuild', function () {

	gulp
		.src(['css/normalize.css', 'css/grid.css', 'css/main.css'])
			.pipe(combineMq())
			.pipe(concat('main.css'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('jsbuild', function () {
	gulp.
		src("js/app.js")
			.pipe(uglify())
		.pipe(gulp.dest("./build/"))
})

gulp.task('default', ['stylus', 'watch']);