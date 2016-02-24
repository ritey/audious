var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
  // Compile CSS.
  mix.sass('app.scss');

  // Compile JS.
  // Lets use browserify to nicely split JS files.
  mix.browserify('main.js');

  mix.version([
    'css/app.css',
    'js/main.js',
  ]);
});
