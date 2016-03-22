(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppView = exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SongCollection = require('./collections/SongCollection');

var _SongView = require('./views/SongView');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import Marionette from 'backbone.marionette';


var _Backbone = Backbone;
var Model = _Backbone.Model;
var View = _Backbone.View;
var Collection = _Backbone.Collection;
var Router = _Backbone.Router;
var _Marionette = Marionette;
var Application = _Marionette.Application;
// Global Songs collection variable.

var Songs = new _SongCollection.SongList();

var App = exports.App = function (_Application) {
  _inherits(App, _Application);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

    console.log('hello, Marionette');
    return _this;
  }

  return App;
}(Application);

var AppView = exports.AppView = function (_View) {
  _inherits(AppView, _View);

  function AppView() {
    _classCallCheck(this, AppView);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AppView).call(this));

    _this2.$el = $('#app');
    _this2.$sync = $('#sync');

    _this2.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    _this2.authorise();

    // Event when all songs are added. Runs on startup.
    _this2.listenTo(Songs, 'reset', _this2.addAll);

    // Populate Songs collection with static data provided by server in data var.
    //Songs.reset(data, {parse: true});
    Songs.fetch();
    return _this2;
  }

  /**
   * Render App.
   */


  _createClass(AppView, [{
    key: 'render',
    value: function render() {}

    /**
     * Display all songs.
     */

  }, {
    key: 'addAll',
    value: function addAll() {
      this.$('#playlist').html('');
      // Iterate through songs and add each to html.
      Songs.each(this.addOne, this);
    }

    /**
     * Display one song.
     */

  }, {
    key: 'addOne',
    value: function addOne(model) {
      var view = new _SongView.SongView({ model: model });
      // Append list with rendered Song partial view.
      $('#playlist').append(view.render().el);
    }

    /**
     * Authorize Soundcloud SDK
     */

  }, {
    key: 'authorise',
    value: function authorise() {
      SC.initialize({
        client_id: document.querySelector("meta[name='client_id']").getAttribute('content'),
        redirect_uri: document.querySelector("meta[name='redirect_uri']").getAttribute('content')
      });

      this.soundcloudReady = true;
    }
  }]);

  return AppView;
}(View);

},{"./collections/SongCollection":2,"./views/SongView":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SongList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Song = require('../models/Song');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var Collection = _Backbone.Collection;
var LocalStorage = _Backbone.LocalStorage;

/**
 * Song Collection
 */

var SongList = exports.SongList = function (_Collection) {
  _inherits(SongList, _Collection);

  function SongList(options) {
    _classCallCheck(this, SongList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SongList).call(this, options));

    _this.model = _Song.Song;

    _this.url = '/api/songs';
    return _this;
  }

  /**
   * Populate Collection with static data.
   * At this stage we receive whole data object with all songs.
   * Lets return Soundcloud favorites list to model level for time being.
   * In model level it will iterate through individual items.
   * Figure how to load only needed stuff in the feature.
   */


  _createClass(SongList, [{
    key: 'parse',
    value: function parse(response) {
      return response.music.soundcloud.favorites;
    }
  }]);

  return SongList;
}(Collection);

},{"../models/Song":4}],3:[function(require,module,exports){
'use strict';

var _app = require('./app');

/**
 * Document ready event
 */
$(function () {
  //new AppView();
  new _app.App();
}); /**
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
     */

},{"./app":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var Model = _Backbone.Model;
/**
 * Song model.
 */

var Song = exports.Song = function (_Model) {
  _inherits(Song, _Model);

  function Song() {
    _classCallCheck(this, Song);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Song).apply(this, arguments));
  }

  _createClass(Song, [{
    key: 'defaults',

    /**
     * Default Song model params.
     */
    value: function defaults() {
      return {
        title: '',
        duration: 0,
        active: false
      };
    }

    /**
     * Parse Song details.
     * At this stage Backbone iterates through individual SongCollection items.
     */

  }, {
    key: 'parse',
    value: function parse(response) {
      /**
       * Convenient underscore.js method to extract needed data subset from larger one.
       */
      return _.pick(response, 'title', 'duration');
    }

    /**
     * Toggle active state.
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      this.save({
        active: !this.get('active')
      });
    }
  }]);

  return Song;
}(Model);

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Songs list item template.
 */
var SONG_LI_TPL = exports.SONG_LI_TPL = _.template("<span class='title'><%= title %></span>" + "<button class='play'>Play</button>");

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SongView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _song_li = require('../templates/song_li.tpl');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var View = _Backbone.View;

var SongView = exports.SongView = function (_View) {
  _inherits(SongView, _View);

  function SongView(options) {
    _classCallCheck(this, SongView);

    // Parent element doesn't have defined tagName,
    // Therefore append options object with it
    // because this.tagName will not work in this context.
    options.tagName = 'li';
    // Add class to li element.
    options.className = 'playlist-song';

    // Attach events.
    options.events = {
      "click button.play": "play"
    };

    // Cache the template function for a single item.

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SongView).call(this, options));

    _this.template = _song_li.SONG_LI_TPL;
    return _this;
  }

  _createClass(SongView, [{
    key: 'render',
    value: function render() {
      // Pass model data to template and then append to DOM.
      this.$el.html(this.template(this.model.toJSON()));

      this.$el.toggleClass('active', this.model.get('active'));
      return this;
    }

    /**
     * Play button event callback.
     */

  }, {
    key: 'play',
    value: function play() {
      this.model.toggle();
    }
  }]);

  return SongView;
}(View);

},{"../templates/song_li.tpl":5}]},{},[3]);

//# sourceMappingURL=main.js.map
