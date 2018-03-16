//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');
    sourcemaps = require('gulp-sourcemaps');//当less有各种引入关系时，编译后不容易找到对应less文件，所以需要生成sourcemap文件，方便修改
    //当编译less时出现语法错误或者其他异常，会终止watch事件，通常需要查看命令提示符窗口才能知道，
    //这并不是我们所希望的，所以我们需要处理出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）。
    notify = require('gulp-notify');
    plumber = require('gulp-plumber');
 
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src(['src/less/**/*.less']) //该任务针对的文件
    	.pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
    	.pipe(sourcemaps.init())
        .pipe(less()) //该任务调用的模块
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});
 
gulp.task('default',['testLess', 'elseTask']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

gulp.task('testWatch',function(){
	gulp.watch('src/less/**/*.less',['testLess']);//当所有less文件发生改变时，调用testLess任务
});
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径