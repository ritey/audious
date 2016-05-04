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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import Marionette from 'backbone.marionette';


//import { PlaylistCollection } from './collections/PlaylistCollection';
//import { SongView } from './views/SongView';
//import { SyncView } from './views/SyncView';
//import { SyncCollection } from './collections/SyncCollection';

var _Backbone = Backbone;
var Model = _Backbone.Model;
var View = _Backbone.View;
var Collection = _Backbone.Collection;
var Router = _Backbone.Router;
//var { Application } = Marionette;

//var Playlists = new PlaylistCollection();

//http://marionettejs.com/docs/v3.0.0-pre.2/marionette.application.html#getting-started
/*export class App extends Application
{
  constructor() {
    super();
    this.addRegions({
      syncRegion: "#sync"
    });

    this.syncCollection = new SyncCollection();
    //var syncView = new SyncView();
    console.log(this.syncCollection);
    console.log('hello, Marionette');
  }
}*/

var Songs = new _SongCollection.SongCollection();

var AppView = exports.AppView = function (_View) {
  _inherits(AppView, _View);

  function AppView() {
    _classCallCheck(this, AppView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppView).call(this));

    _this.$el = $('#app');
    //this.$sync = $('#sync');

    _this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    if ($("meta[name='soundcloud_client_id']").length) {
      _this.authorise();
    }

    // Add CSRF token for ajax requests.
    _this.addCSRFToken();

    // Sync music if needed.
    _this.syncAllMusic();

    // Event when all playlists are processed.
    //this.listenTo(Playlists, 'reset', this.addAll);
    return _this;
  }

  /**
   * Render App.
   */


  _createClass(AppView, [{
    key: 'render',
    value: function render() {
      var active = Songs.active();
    }

    /**
     * Add CSRF token for ajax requests.
     */

  }, {
    key: 'addCSRFToken',
    value: function addCSRFToken() {
      if ($("meta[name='_token'").length) {
        $.ajaxSetup({
          headers: {
            "accept": "application/json",
            "X-CSRF-TOKEN": $("meta[name='_token'").attr('content')
          }
        });
      }
    }

    /**
     * Sync all music.
     */

  }, {
    key: 'syncAllMusic',
    value: function syncAllMusic() {
      var context = this;
      // Check if there is any refresh icons.
      if ($('#sync i.fa-refresh').length) {
        // Found refresh icon - sync.
        $('#sync i.fa-refresh').each(function () {
          context.syncMusic($(this).parents('li.sync-service'));
        });
      }
    }

    /**
     * Sync service music
     * @param  jQuery obj $elem
     */

  }, {
    key: 'syncMusic',
    value: function syncMusic($elem) {
      var title = $elem.attr('data-service-title');
      Backbone.ajax({
        dataType: "json",
        url: "/api/sync/" + title,
        data: "",
        success: function success(val) {
          //collection.add(val);  //or reset
          //console.log(collection);
          console.log(val);
        }
      });
    }

    /**
     * Display all songs.
     */
    /*addAll() {
      //this.$('#playlist').html('');
      // Iterate through songs and add each to html.
      Songs.each(this.addOne, this);
    }*/

    /**
     * Display one song.
     */
    /*addOne(model) {
      var view = new SongView({ model });
      // Append list with rendered Song partial view.
      $('#playlist').append(view.render().el);
    }*/

    /**
     * Authorize Soundcloud SDK
     */

  }, {
    key: 'authorise',
    value: function authorise() {
      SC.initialize({
        client_id: $("meta[name='soundcloud_client_id']").attr('content'),
        redirect_uri: $("meta[name='soundcloud_redirect_uri']").attr('content')
      });

      this.soundcloudReady = true;
    }
  }]);

  return AppView;
}(View);

},{"./collections/SongCollection":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SongCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Song = require('../models/Song');

var _SongView = require('../views/SongView');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var Collection = _Backbone.Collection;

/**
 * Song Collection
 */

var SongCollection = exports.SongCollection = function (_Collection) {
  _inherits(SongCollection, _Collection);

  function SongCollection() {
    _classCallCheck(this, SongCollection);

    // Attach model.

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SongCollection).call(this));

    _this.model = _Song.Song;

    // backend API url
    _this.url = '/api/song';

    // Parse songs from DOM.
    _.each($('#tracklist ul li.song'), function (elem) {
      var song = new _Song.Song({
        id: $(elem).attr('data-id'),
        identifier: $(elem).attr('data-identifier'),
        title: $(elem).text(),
        service: $(elem).parents('.playlists').attr('data-service'),
        playlist: $(elem).parents('.playlist').attr('data-playlist'),
        active: $(elem).hasClass('active')
      });

      // If ever need to attach a view to it.
      var songView = new _SongView.SongView({
        model: song,
        el: elem,
        tagName: 'li'
      });

      this.add(song);
    }, _this);
    return _this;
  }

  /**
   * Get active song.
   */


  _createClass(SongCollection, [{
    key: 'active',
    value: function active() {
      return this.filter(function (song) {
        return song.get('active');
      });
    }
  }]);

  return SongCollection;
}(Collection);

},{"../models/Song":4,"../views/SongView":7}],3:[function(require,module,exports){
'use strict';

var _app = require('./app');

/**
 * Document ready event
 */
$(function () {
  new _app.AppView();
  //new App();
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
        id: '',
        identifier: '',
        title: '',
        service: '',
        playlist: '',
        //duration: 0,
        active: false
      };
    }

    /**
     * Parse Song details.
     * At this stage Backbone iterates through individual SongCollection items.
     */
    /*parse(response) {*/
    /**
     * Convenient underscore.js method to extract needed data subset from larger one.
     */
    /*return _.pick(response, 'title', 'duration');
    }*/

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
 * Song details in music player at the bottom of the screen.
 */
var SONG_DETAILS_PLAYER = exports.SONG_DETAILS_PLAYER = _.template("<span class='title'><%= title %></span>");

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Songs list item template.
 */
var SONG_LI_TPL = exports.SONG_LI_TPL = _.template("<button class='play'>Play</button>" + "<span class='title'><%= title %></span>");

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SongView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _song_li = require('../templates/song_li.tpl');

var _song_details_player = require('../templates/song_details_player.tpl');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var View = _Backbone.View;

var SongView = exports.SongView = function (_View) {
  _inherits(SongView, _View);

  _createClass(SongView, [{
    key: 'events',

    // Define events we gonna listen on.
    get: function get() {
      return {
        "click button.play": "play"
      };
    }
  }]);

  function SongView(options) {
    _classCallCheck(this, SongView);

    // Cache templates:
    // Song item tpl.

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SongView).call(this, options));

    _this.template = _song_li.SONG_LI_TPL;
    // Player song details tpl.
    _this.song_details_template = _song_details_player.SONG_DETAILS_PLAYER;
    // Listen for model changes.
    _this.listenTo(_this.model, 'change', _this.render);

    // Render item.
    _this.render();
    return _this;
  }

  _createClass(SongView, [{
    key: 'render',
    value: function render() {
      var is_active = this.model.get('active');
      // Pass model data to template and then append to DOM.
      this.$el.html(this.template(this.model.toJSON()));
      // Add active class to active song DOM elem.
      this.$el.toggleClass('active', is_active);
      // Change Music player details.
      if (is_active) {
        this.updateMusicPlayer(this.model);
      }

      return this;
    }

    /**
     * Play button event callback.
     */

  }, {
    key: 'play',
    value: function play() {
      // Deactivate current active song.
      this.deactivate();
      // Activate new song.
      this.model.toggle();

      // Play song. Call dynamically service named function and pass active song model.
      this[this.model.get('service') + '_play'](this.model);
    }

    /**
     * Deactivate current active song.
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      var active = this.model.collection.active();
      if (active.length) {
        // Just in case if there were more than 1 active song.
        for (var i = 0; i < active.length; i++) {
          active[i].toggle();
        }
      }
    }

    /**
     * Update Music Player details
     */

  }, {
    key: 'updateMusicPlayer',
    value: function updateMusicPlayer(song) {
      $('#player .song-details').html(this.song_details_template(song.toJSON()));
    }

    /**
     * Play
     * @param  {[type]} $song [description]
     * @return {[type]}       [description]
     */

  }, {
    key: 'soundcloud_play',
    value: function soundcloud_play($song) {
      SC.stream('/tracks/' + $song.get('identifier')).then(function (player) {
        player.play();
      });
    }
  }]);

  return SongView;
}(View);

},{"../templates/song_details_player.tpl":5,"../templates/song_li.tpl":6}]},{},[3]);

//# sourceMappingURL=main.js.map
