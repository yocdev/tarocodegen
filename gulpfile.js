var gulp = require("gulp");
var replace = require("gulp-replace");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
	return tsProject
		.src()
		.pipe(tsProject())
		.js.pipe(replace("process.env.NODE_ENV", `"${process.env.NODE_ENV}"`))
		.pipe(gulp.dest("dist"));
});
