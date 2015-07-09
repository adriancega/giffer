
/*
 * gulpfile.js
 * + default
 * - build
 * + compile-scripts
 * + compile-styles
 * + watch
 */


// Required modules
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
var gulp = require( 'gulp' ),
    uglify = require( 'gulp-uglify' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    sass = require( 'gulp-ruby-sass' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    jshint = require( 'gulp-jshint' ),
    imageop = require( 'gulp-image-optimization' ),
    using = require( 'gulp-using' ),
    shell = require( 'gulp-shell' ),
    clean = require( 'gulp-clean' ),
    // sequence = require( 'run-sequence' ),
    // nodemon = require( 'gulp-nodemon' ),
    browser = require( 'browser-sync' ),
    // compile = require( 'gulp-compile-js' ),
    concat = require( 'gulp-concat' );

// Base dir to get the assets
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
var BASE_SITE_DIR = 'assets/';
var STATIC_SITE_DIR = 'public/';

// EXPORT_NAMES
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
var EXPORT_NAMES = {
    scripts: 'scripts.js',
    styles: 'style.css',
    images: 'sprite.png'
}

// PATHS
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
var PATHS = {
    site: {
	scripts: {
	    source: [
		BASE_SITE_DIR + 'js/lib/**/*.js',
		BASE_SITE_DIR + 'js/lib/*.js',
		BASE_SITE_DIR + 'js/*.js'
	    ],
	    static: STATIC_SITE_DIR + 'js/',
	    assets: BASE_SITE_DIR + 'js/'
	},
	styles: {
	    source: [
		BASE_SITE_DIR + 'stylesheets/*.sass'
	    ],
	    assets: BASE_SITE_DIR + 'styleSheets/',
	    main: BASE_SITE_DIR + 'stylesheets/main.sass',
	    static: STATIC_SITE_DIR + 'stylesheets/'
	},
	images: {
	    source: [
		BASE_SITE_DIR + 'images/**/*.{jpeg,jpg,png,gif}'
	    ],
	    static: BASE_SITE_DIR + 'static/img/',
	    assets: BASE_SITE_DIR + 'assets/img/'
	}
    },
    common: [
	BASE_SITE_DIR + '*',
	BASE_SITE_DIR + 'php/**/*.php',
	BASE_SITE_DIR + 'templates/**/*.php'
    ]
}

/**
 * Default gulp task
 */
gulp.task( 'compile-scripts', function () {
    return gulp.src( PATHS.site.scripts.source )
	.pipe( concat( EXPORT_NAMES.scripts ) )
	.pipe( uglify() )
	.pipe( gulp.dest( PATHS.site.scripts.static ) );
});

/**
 * task 'compile-styles'
 **/
gulp.task( 'compile-styles', function () {
    return gulp.src( PATHS.site.styles.main )
    // .pipe( using() )
	.pipe( sass( { 'sourcemap=none': false } ) )
	.on( 'error', function ( err ) { console.log( err.message ); })
    // .pipe( concat(EXPORT_NAMES.styles))
    // .pipe( autoprefixer( 'last 2 versions', 'ie 9' ) )
	.pipe( gulp.dest( PATHS.site.styles.static ) );
    // .pipe( browser.reload( {stream:true} ) );
});

/**
 * task 'watch'
 **/
gulp.task( 'watch', function () {

    gulp.watch( BASE_SITE_DIR + 'stylesheets/*.sass', ['compile-styles'] );
    gulp.watch( BASE_SITE_DIR + 'js/*.js', ['compile-scripts'] );
    gulp.watch( BASE_SITE_DIR + 'js/**/*.js', ['compile-scripts'] );
});
