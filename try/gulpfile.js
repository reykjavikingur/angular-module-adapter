var gulp = require('gulp');
var browserify = require('browserify');

gulp.task('build-simple', function() {
	return gulp.src('src/simple/**/*.js')
		.pipe(browserify())
		.pipe(gulp.dest('dst'));
});