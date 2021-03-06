/**
 * ES6
 * ref:
 * http://tastejs.com/todomvc-backbone-es6/
 * https://github.com/tastejs/todomvc-backbone-es6/blob/gh-pages/js/app.js
 * https://github.com/tastejs/todomvc-backbone-es6/blob/gh-pages/js/todo-app.js
 * Browserify: https://github.com/substack/node-browserify#usage
 * Image lazyload:
 * http://luis-almeida.github.io/unveil/
 * http://stackoverflow.com/questions/18366550/using-lazy-loading-with-backbone
 *
 * Backbone tutorial:
 * https://github.com/amejiarosario/Backbone-tutorial/blob/master/backbone-tutorial.html
 * http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
 *
 * Soundcloud JS SDK
 * https://developers.soundcloud.com/docs/api/sdks
 *
 * Handy!!
 * http://simblestudios.com/blog/development/wmtafo-backbone-part1.html
 *
 * Backbone.js Patterns:
 * http://ricostacruz.com/backbone-patterns/index.html
 *
 * soundcloud player:
 * https://github.com/soundcloud/soundcloud-custom-player/blob/master/js/sc-player.js
 */

import { AppView, App } from './app';

/**
 * Document ready event
 */
$(() => {
  // Need to pass el in order for events to work.
  // This is probably because I am trying to attach events on existing DOM.
  new AppView({el: "#app"});
});
