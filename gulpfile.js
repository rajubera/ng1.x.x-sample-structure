'use strict';
// =======================================================================
// Gulp Plugins
// =======================================================================
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  jscs = require('gulp-jscs'),
  concat = require('gulp-concat'),
  streamify = require('gulp-streamify'),
  uglify = require('gulp-uglify'),
  jsdoc = require('gulp-jsdoc3'),
  sourcemaps = require('gulp-sourcemaps'),
  prefix = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  del = require('del'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  runSequence = require('run-sequence'),
  gulpif = require('gulp-if'),
  process = require("process"),
  open = require('gulp-open');


// =======================================================================
// File Paths
// =======================================================================
var filePath = {
  build: {
    dest: './dist',
    destCss: './dist/css/'
  },
  lint: {
    src: ['./app/*.js', './app/**/*.js']
  },
  browserify: {
    src: './app/app.js',
    watch: [
      '!./app/assets/libs/*.js',
      '!./app/assets/libs/**/*.js',
      './app/*.js', './app/**/*.js',
      '/app/**/*.html'
    ]
  },
  styles: {
    src: [
      './app/common/styles/reset.css',
      './app/common/styles/login.css',
      './app/common/styles/style.css'
    ],
    watch: ['./app/common/styles/reset.css','./app/common/styles/login.css', './app/common/styles/style.css']
  },
  assets: {
    images: {
      src: './app/assets/images/**/*',
      watch: ['./app/assets/images', './app/assets/images/**/*'],
      dest: './dist/images/'
    },
    fonts: {
      src: ['./app/assets/fonts/**/*', './bower_components/font-awesome/fonts/*', './bower_components/bootstrap/fonts/*'],
      dest: './dist/fonts/'
    },
    audios: {
      src: './app/assets/audios/**/*',
      watch: ['./app/assets/audios', './app/assets/audios/**/*'],
      dest: './dist/audios/'
    }
  },
  vendorJS: {
    // These files will be bundled into a single vendor.js file that's called at the bottom of index.html
    src: [
      './node_modules/amazon-cognito-identity-js/dist/aws-cognito-sdk.min.js',
      './node_modules/amazon-cognito-identity-js/dist/amazon-cognito-identity.min.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/jquery/dist/jquery.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/angular-translate/angular-translate.min.js',
      './bower_components/SoundManager2/script/soundmanager2.js',
      './bower_components/angular-ui-switch/angular-ui-switch.js'
    ]
  },
  vendorCSS: {
    src: [
      './bower_components/bootstrap/dist/css/bootstrap.css', // v3.1.1
      './bower_components/font-awesome/css/font-awesome.css', // v4.1.0
      './bower_components/angular-ui-switch/angular-ui-switch.css'
    ]
  },
  copyIndex: {
    src: './app/index.html',
    watch: './app/index.html'
  },
  copyFavicon: {
    src: './app/favicon.ico'
  }
};


// =======================================================================
// Error Handling
// =======================================================================
function handleError(err) {
  console.log(err.toString());
  notify({
    message: err.toString()
  })
  this.emit('end');
}





// =======================================================================
// Clean out dist folder contents on build
// =======================================================================
gulp.task('clean-dev', function() {
  del(['./dist/*.js',
    './dist/*.css',
    '!./dist/vendor.js',
    '!./dist/vendor.css',
    './dist/*.html',
    './dist/*.png',
    './dist/*.ico'
  ]);
});

gulp.task('clean-full', function() {
  del(['./dist/*']);
});


// =======================================================================
// JSHint
// =======================================================================
gulp.task('lint', function() {
  return gulp.src(filePath.lint.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


// =======================================================================
// Javascript Checkstyles (JSCS)
// =======================================================================
gulp.task('checkstyle', function() {
  return gulp.src(filePath.lint.src)
    .pipe(jscs())
    .on('error', handleError);
});


// =======================================================================
// Browserify Bundle
// =======================================================================

var bundle = {};
bundle.conf = {
  entries: filePath.browserify.src,
  external: filePath.vendorJS.src,
  debug: true,
  cache: {},
  packageCache: {}
};

function rebundle() {
  return bundle.bundler.bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(!bundle.prod, sourcemaps.init({
      loadMaps: true
    })))
    .pipe(gulpif(!bundle.prod, sourcemaps.write('./')))
    .pipe(gulpif(bundle.prod, streamify(uglify({
      mangle: false
    }))))
    .pipe(gulp.dest(filePath.build.dest))
    .pipe(connect.reload());
}

function configureBundle(prod) {
  bundle.bundler = watchify(browserify(bundle.conf));
  bundle.bundler.on('update', rebundle);
  bundle.prod = prod;
}

gulp.task('bundle-dev', function() {
  'use strict';
  configureBundle(false);
  return rebundle();
});

gulp.task('bundle-prod', function() {
  'use strict';
  configureBundle(true);
  return rebundle();
});


// =======================================================================
// Styles Task
// =======================================================================
gulp.task('styles-dev', function() {
  return gulp.src(filePath.styles.src)
    .pipe(concat('app.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(filePath.build.destCss))
    .on('error', handleError)
    .pipe(notify({
      message: 'Styles task complete'
    }));

});

gulp.task('styles-prod', function() {
  return gulp.src(filePath.styles.src)
    .pipe(concat('app.css'))
    .on('error', handleError)
    .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7', {
      map: true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(filePath.build.destCss))
    .on('error', handleError)
});


// =======================================================================
// Images Task
// =======================================================================
gulp.task('images', function() {
  return gulp.src(filePath.assets.images.src)
    .on('error', handleError)
    .pipe(gulp.dest(filePath.assets.images.dest))
    .pipe(notify({
      message: 'Images copied'
    }))
    .pipe(connect.reload());
});

gulp.task('images-prod', function() {
  return gulp.src(filePath.assets.images.src)
    .on('error', handleError)
    .pipe(gulp.dest(filePath.assets.images.dest))
    .pipe(connect.reload());
});

// =======================================================================
// AUDIOS Task
// =======================================================================
gulp.task('audios', function() {
  return gulp.src(filePath.assets.audios.src)
    .on('error', handleError)
    .pipe(gulp.dest(filePath.assets.audios.dest))
    .pipe(notify({
      message: 'Audios copied'
    }))
    .pipe(connect.reload());
});

gulp.task('audios-prod', function() {
  return gulp.src(filePath.assets.audios.src)
    .on('error', handleError)
    .pipe(gulp.dest(filePath.assets.audios.dest))
    .pipe(connect.reload());
});
// =======================================================================
// Fonts Task
// =======================================================================
gulp.task('fonts', function() {
  return gulp.src(filePath.assets.fonts.src)
    .on('error', handleError)
    .pipe(gulp.dest(filePath.assets.fonts.dest))
    .pipe(connect.reload());
});


// =======================================================================
// Vendor JS Task
// =======================================================================
gulp.task('vendorJS', function() {
  var b = browserify({
    debug: true,
    require: filePath.vendorJS.src
  });

  return b.bundle()
    .pipe(source('vendor.js'))
    .on('error', handleError)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(filePath.build.dest))
    .pipe(notify({
      message: 'VendorJS task complete'
    }));
});

gulp.task('vendorJS-prod', function() {
  var b = browserify({
    debug: true,
    require: filePath.vendorJS.src
  });

  return b.bundle()
    .pipe(source('vendor.js'))
    .on('error', handleError)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(filePath.build.dest));
});
// =======================================================================
// Vendor CSS Task
// =======================================================================
gulp.task('vendorCSS', function() {
  return gulp.src(filePath.vendorCSS.src)
    .pipe(concat('vendor.css'))
    .on('error', handleError)
    .pipe(minifyCSS())
    .pipe(gulp.dest(filePath.build.destCss))
    .pipe(notify({
      message: 'VendorCSS task complete'
    }))
    .pipe(connect.reload());
});

gulp.task('vendorCSS-prod', function() {
  return gulp.src(filePath.vendorCSS.src)
    .pipe(concat('vendor.css'))
    .on('error', handleError)
    .pipe(minifyCSS())
    .pipe(gulp.dest(filePath.build.destCss))
    .pipe(connect.reload());
});

// =======================================================================
// Copy index.html
// =======================================================================
gulp.task('copyIndex', function() {
  return gulp.src(filePath.copyIndex.src)
    .pipe(gulp.dest(filePath.build.dest))
    .pipe(notify({
      message: 'index.html successfully copied'
    }))
    .pipe(connect.reload());
});

gulp.task('copyIndex-prod', function() {
  return gulp.src(filePath.copyIndex.src)
    .pipe(gulp.dest(filePath.build.dest))
    .pipe(connect.reload());
});


// =======================================================================
// Copy Favicon
// =======================================================================
gulp.task('copyFavicon', function() {
  return gulp.src(filePath.copyFavicon.src)
    .pipe(gulp.dest(filePath.build.dest))
    .pipe(notify({
      message: 'favicon successfully copied'
    }));
});

gulp.task('copyFavicon-prod', function() {
  return gulp.src(filePath.copyFavicon.src)
    .pipe(gulp.dest(filePath.build.dest));
});
// =======================================================================
// Watch for changes
// =======================================================================
gulp.task('watch', function() {
  gulp.watch(filePath.styles.watch, ['styles-dev']);
  gulp.watch(filePath.assets.images.watch, ['images']);
  gulp.watch(filePath.vendorJS.src, ['vendorJS']);
  gulp.watch(filePath.vendorCSS.src, ['vendorCSS']);
  gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
  gulp.watch(filePath.lint.src, ['checkstyle']);
  console.log('Watching...');
});
// =======================================================================
// Copy dist folder to XAMPP server folder
// =======================================================================
gulp.task('copy-dist', function () {
    return gulp.src('./dist/**/*')
      .pipe(gulp.dest('/Applications/XAMPP/xamppfiles/htdocs/dist/'))
      .on('error', handleError)
});
// =======================================================================
// Open index.html in chrome
// =======================================================================
gulp.task('open-index', function () {
    //return gulp.src('./index.html')
    //  .pipe(open());
    return gulp.src('')
    .pipe(open({app: '/Applications/Google\ Chrome.app', uri: 'http://localhost/dist/#/home'}));
});
// =======================================================================
// Sequential Build Rendering
// =======================================================================
gulp.task('doc', function(callback) {
  let config = require('./jsdocConfig.json');
  gulp.src(['README.md','./app/*.js', './app/**/*.js'], {read: false})
  .pipe(jsdoc(config, callback))
});

// run "gulp" in terminal to build the DEV app
gulp.task('build-dev', function(callback) {
  runSequence(
    ['clean-dev', 'lint', 'checkstyle'],
    // images and vendor tasks are removed to speed up build time. Use "gulp build" to do a full re-build of the dev app.
    ['bundle-dev', 'styles-dev', 'copyIndex', 'copyFavicon'], ['watch'],
    callback
  );
});


// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod', function(callback) {
  runSequence(
    ['clean-full', 'lint', 'checkstyle'],
    ['bundle-dev', 'styles-prod', 'images-prod', 'fonts', 'audios-prod', 'vendorJS-prod', 'vendorCSS-prod', 'copyIndex-prod', 'copyFavicon-prod'],
    ['stop'],
    callback
  );
});

// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod-dev', function(callback) {
  runSequence(
    ['clean-full', 'lint', 'checkstyle'],
    ['bundle-dev', 'styles-prod', 'images-prod', 'fonts', 'audios-prod', 'vendorJS-prod', 'vendorCSS-prod', 'copyIndex-prod', 'copyFavicon-prod'],
    ['copy-dist'],
    ['open-index'],
    ['stop'],
    callback
  );
});

// run "gulp build" in terminal for a full re-build in DEV
gulp.task('build', function(callback) {
  runSequence(
    ['clean-full', 'lint', 'checkstyle'],
    ['bundle-dev', 'styles-dev', 'images', 'fonts', 'audios', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'], ['watch'],
    callback
  );
});

gulp.task('stop', function() { process.exit(0); });

gulp.task('default', ['build-dev']);
gulp.task('prod', ['build-prod']);
