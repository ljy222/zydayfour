var gulp=require("gulp");
var mincss=require("gulp-minify-css");
var concat=require("gulp-concat");
var rename=require("gulp-rename");
var uglify=require("gulp-uglify");
var webserver=require("gulp-webserver");
var imagemin=require("gulp-imagemin");
var htmlmin=require("gulp-htmlmin");
var path=require("path");
var url=require("url");
var fs=require("fs");
gulp.task("server",function(){
    gulp.src(".")
    .pipe(webserver({
        port:8880,
        host:"localhost",
        middleware:function(req,res,next){
            res.writeHead(200,{
                "Content-type":"text/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            })
            var filesplit=req.url.split("/")[1];
            var datafile=path.join(__dirname,"data",filesplit+".json");
            fs.exists(datafile,function(exits){
                if(exits){
                    fs.readFile(datafile,function(err,data){
                        if(err) return console.error(err)
                        res.end(data)
                    })
                }else{
                    var data="错误信息"+filesplit
                    res.end(data)
                }
            })
        }
    }))
})
gulp.task("minCss",function(){
    gulp.src("./css/*.css")
    .pipe(mincss())
    .pipe(gulp.dest("newcss"))
})
gulp.task("minimg",function(){
    gulp.src("./images/*.jpg")
    .pipe(imagemin())
    .pipe(gulp.dest("newimg"))
})
var options={
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
}
gulp.task("minHtml",function(){
    gulp.src("./index.html")
    .pipe(htmlmin(options))
    .pipe(gulp.dest("./html"))
})