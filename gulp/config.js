module.exports = {
  CSS_DEPS: [
    'scss/libs/_reset.scss',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/swiper/dist/css/swiper.min.css',
    'scss/libs/_sidebar-menu.scss',
    'scss/libs/_icheck.scss',
    'plugins/jquery-ui/jquery-ui.css'
  ],
  JS_DEPS: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/swiper/dist/js/swiper.min.js',
  ],
  CSS_COMPATIBILITY: [
    'last 2 versions',
    'ie >= 9',
    'Android >= 2.3',
    'ios >= 7'
  ],
  SASS_LINT_FILES: [
    'scss/about/**/*.scss'
  ]

};


