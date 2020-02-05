"use strict";

//загружаем gulp
var gulp = require("gulp");

//загружаем плагины gulp
var server    = require("browser-sync").create();
var posthtml  = require("gulp-posthtml");
var include   = require("posthtml-include");

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]));
    //.pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    //server: "build/",
    server: "",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("*.+(html|js|css)", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series("html"));
gulp.task("start", gulp.series("build", "server"));
