var config = require('./config'),
    gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    header = require('gulp-header'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    minifyCss = require("gulp-minify-css"),
    browserSync = require('browser-sync'),
    runSequence = require('gulp4-run-sequence'),
    tasks_list = [];
var tasksCreator = function (config) {
    var scssTaskTemplate = function (i) {
        return function () {
            return gulp.src('css/pages/*.scss')
                .pipe(header('$language: ' + config.languages[i].languageCode + ';\n'))
                .pipe(sass().on('error', sass.logError))
                .pipe(gulpif(config.autoPrefixer, autoprefixer(config.autoPrefixerOptions)))
                .pipe(gulpif(config.beautifyCSS, csscomb()))
                .pipe(gulpif(config.minifyCSS, minifyCss()))
                .pipe(gulp.dest('build/' + config.languages[i].outputfolder + '/css'))
                .pipe(browserSync.reload({
                    stream: true
                }));
        };
    };
    for (var i = 0; i < config.languages.length; i++) {
        gulp.task(config.languages[i].taskName, scssTaskTemplate(i));
        tasks_list.push(config.languages[i].taskName);
    }
    tasks_list.push('browserSync');
    gulp.task('watch', function () {
        if (tasks_list.indexOf('browserSync') != -1) {
            tasks_list.splice(tasks_list.indexOf('browserSync'), 1);
        }
        gulp.watch('css/scss/**/*.scss', tasks_list);
        gulp.watch('build/**/*.html', browserSync.reload);
        gulp.watch('build/**/js/*.js', browserSync.reload);
    });
};
gulp.task('browserSync', function () {
    gulp.src('index.html')
        .pipe(handlebars(config.languages))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build'));
    gulp.src('build/ltr/css/cart.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('cart-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/acc.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('acc-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/categories.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('categories-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/index.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('index-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/checkout.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('checkout-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/item.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('item-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/orders.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('orders-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/service.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('service-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/sub-category.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('sub-category-ltr.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/ltr/css/wishlist.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('wishlist-ltr.css'))
        .pipe(gulp.dest('build/css'));
    //rtl
    gulp.src('build/rtl/css/cart.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('cart-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/acc.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('acc-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/categories.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('categories-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/index.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('index-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/checkout.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('checkout-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/item.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('item-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/orders.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('orders-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/service.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('service-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/sub-category.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('sub-category-rtl.css'))
        .pipe(gulp.dest('build/css'));
    gulp.src('build/rtl/css/wishlist.css')
        .pipe(handlebars(config.languages))
        .pipe(rename('wishlist-rtl.css'))
        .pipe(gulp.dest('build/css'));

    browserSync({
        server: {
            baseDir: 'build'
        }
    });
});
gulp.task('default', function (callback) {
    tasksCreator(config);
    runSequence(tasks_list, 'watch', callback);
});

