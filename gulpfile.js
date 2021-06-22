var gulp = require("gulp");
var replace = require("gulp-replace");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
	copy();
	return tsProject
		.src()
		.pipe(tsProject())
		.js.pipe(replace("process.env.NODE_ENV", `"${process.env.NODE_ENV}"`))
		.pipe(gulp.dest("dist"));
});

function copy() {
	return gulp
		.src("src/**/*.handlebars")
		.pipe(gulp.dest("dist/"));
}
