const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', () => {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('dist'));
});