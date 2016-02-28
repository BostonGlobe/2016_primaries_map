var gulp          = require('gulp');
var rename        = require('gulp-rename');
var browserSync   = require('browser-sync');
var webpackStream = require('webpack-stream');
var webpack       = require('webpack');

const config = {
	module: {
		loaders: [
			{ test: /\.csv?$/, loader: 'dsv-loader' },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.TEST': JSON.stringify(process.env.TEST)
		})
	]
};

const prod_config = {
	...config,
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		...config.plugins
	]
};

gulp.task('js-dev', function() {

	return gulp.src('src/js/main.js')
		.pipe(webpackStream(config))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('dist/dev/js'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('js-prod', function() {

	return gulp.src('src/js/main.js')
		.pipe(webpackStream(prod_config))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('.tmp/js'));
});
