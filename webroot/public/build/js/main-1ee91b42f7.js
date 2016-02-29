(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SongCollection = require('./collections/SongCollection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var Model = _Backbone.Model;
var View = _Backbone.View;
var Collection = _Backbone.Collection;
var Router = _Backbone.Router;
var LocalStorage = _Backbone.LocalStorage;

// Global Songs collection variable.

var Songs = new _SongCollection.SongList();

// Populate Songs collection with static data provided by server in data var.
Songs.reset(data, { parse: true });

var AppView = exports.AppView = function (_View) {
  _inherits(AppView, _View);

  function AppView() {
    _classCallCheck(this, AppView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppView).call(this));

    _this.$el = $('#app');
    _this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    _this.authorise();

    _this.listenTo(Songs, 'play', _this.play);
    return _this;
  }

  /**
   * Authorize Soundcloud SDK
   */


  _createClass(AppView, [{
    key: 'authorise',
    value: function authorise() {
      SC.initialize({
        client_id: document.querySelector("meta[name='client_id']").getAttribute('content'),
        redirect_uri: document.querySelector("meta[name='redirect_uri']").getAttribute('content')
      });

      this.soundcloudReady = true;
    }

    /**
     * Play song.
     */

  }, {
    key: 'play',
    value: function play() {
      if (this.soundcloudReady) {}
    }
  }]);

  return AppView;
}(View);

},{"./collections/SongCollection":2}],2:[function(require,module,exports){
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

/**
 * Song Collection
 */

var SongList = exports.SongList = function (_Collection) {
  _inherits(SongList, _Collection);

  function SongList(options) {
    _classCallCheck(this, SongList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SongList).call(this, options));

    _this.model = _Song.Song;

    //this.localStorage = new LocalStorage('songs');
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
  new _app.AppView();
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
  }, {
    key: 'parse',
    value: function parse(response) {
      console.log(response);
      return response;
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

},{}]},{},[3]);

//# sourceMappingURL=main.js.map
