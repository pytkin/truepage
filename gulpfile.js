var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var wiredep = require('wiredep').stream;

gulp.task('styles', function () {
	return gulp.src('app/styles/stylus/main.styl')
		.pipe($.sourcemaps.init())
		.pipe($.stylus())
		.pipe($.postcss([
			require('postcss-font-family'),
			require('postcss-merge-rules'),
			require('postcss-minify-font-weight'),
			require('postcss-normalize-url'),
			require('postcss-discard-empty'),
			require('autoprefixer')({browsers: ['last 2 versions']}),
			require('css-mqpacker'),
			require('postcss-reporter')
		]))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/css'))
		.pipe(reload({stream: true}));
});

gulp.task('jscodestyle', function () {
  return gulp.src(['app/js/**/*.js', '!app/js/vendors/**/*.js'])
	.pipe(reload({stream: true, once: true}))
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
	.pipe($.jscs({fix: true}))
    .pipe($.jscs.reporter())
    .pipe($.jscs.reporter('fail'))
	.pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
});

gulp.task('html', ['styles'], function () {
	var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

	return gulp.src('app/**/*.html')
		.pipe(assets)
		//.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.csscomb()))
		.pipe($.if('*.css', $.csso()))
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
	return gulp.src(['app/img/**/*.{jpg,jpeg,gif,svg,png}', '!app/img/sprites'])
		.pipe($.imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false, mergePaths: false}]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('make-svg-sprite', ['update-svg-revision'], function () {
	return gulp.src('app/img/sprites/svg/**/*.svg')
		.pipe($.rename({ prefix: 'icon-' }))
		.pipe($.svgmin({ mergePaths: false }))
		.pipe($.svgstore({ inlineSvg: true }))
		.pipe($.rename({ basename: 'svg_sprite' }))
		.pipe($.size({title: 'make-svg-sprite'}))
		.pipe(gulp.dest('app/img/sprites'));
});

gulp.task('update-svg-revision', function () {
	return gulp.src('app/js/icon-loader.js')
		.pipe($.replace(/var revision = [0-9]{10}/g, 'var revision = ' + Math.floor(Date.now() / 1000)))
		.pipe(gulp.dest('app/js'));
});

gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*.{eot,svg,ttf,woff,woff2}')
		.pipe(gulp.dest('.tmp/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components',
				'/node_modules': 'node_modules'
			}
		}
	});

	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/img/**/*',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch('app/styles/**/*.styl', ['styles']);
	gulp.watch('app/img/sprites/svg/*.svg', ['make-svg-sprite']);
	gulp.watch('app/fonts/**/*', ['fonts']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

// inject bower components
// gulp.task('wiredep', function () {
// 	gulp.src('app/*.html')
// 		.pipe(wiredep({
// 			exclude: ['bootstrap.js'],
// 			ignorePath: /^(\.\.\/)*\.\./
// 		}))
// 		.pipe(gulp.dest('app'));
// });

gulp.task('build', ['jscodestyle', 'html', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: false}));
});

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
