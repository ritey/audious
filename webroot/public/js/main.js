(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlaylistCollection = require('./collections/PlaylistCollection');

var _SongView = require('./views/SongView');

var _SyncCollection = require('./collections/SyncCollection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import Marionette from 'backbone.marionette';
//import { SongList } from './collections/SongCollection';

//import { SyncView } from './views/SyncView';


var _Backbone = Backbone;
var Model = _Backbone.Model;
var View = _Backbone.View;
var Collection = _Backbone.Collection;
var Router = _Backbone.Router;
var _Marionette = Marionette;
var Application = _Marionette.Application;

// Global Songs collection variable.
//var Songs = new SongList();

var Playlists = new _PlaylistCollection.PlaylistCollection();

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

var AppView = exports.AppView = function (_View) {
  _inherits(AppView, _View);

  function AppView() {
    _classCallCheck(this, AppView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppView).call(this));

    _this.$el = $('#app');
    _this.$sync = $('#sync');

    _this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    if ($("meta[name='soundcloud_client_id']").length) {
      _this.authorise();
    }

    // Sync music if needed.
    _this.syncAllMusic();

    // Event when all playlists are processed.
    //this.listenTo(Playlists, 'reset', this.addAll);

    // Populate Songs collection with static data provided by server in data var.
    //Songs.reset(data, {parse: true});
    //Songs.fetch();
    return _this;
  }

  /**
   * Render App.
   */


  _createClass(AppView, [{
    key: 'render',
    value: function render() {}

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
        client_id: $("meta[name='soundcloud_client_id']").getAttribute('content'),
        redirect_uri: $("meta[name='soundcloud_redirect_uri']").getAttribute('content')
      });

      this.soundcloudReady = true;
    }
  }]);

  return AppView;
}(View);

},{"./collections/PlaylistCollection":2,"./collections/SyncCollection":3,"./views/SongView":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaylistCollection = undefined;

var _Playlist = require('../models/Playlist');

var _PlaylistView = require('../views/PlaylistView');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var Collection = _Backbone.Collection;

var PlaylistCollection = exports.PlaylistCollection = function (_Collection) {
  _inherits(PlaylistCollection, _Collection);

  function PlaylistCollection() {
    _classCallCheck(this, PlaylistCollection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlaylistCollection).call(this));

    _this.model = _Playlist.Playlist;

    _.each($('#tracklist ul'), function (service) {
      var playlist = new _Playlist.Playlist(),
          songs = [];

      _.each($(service).children('li'), function (song) {
        songs.push({
          title: $(song).text()
        });
      }, this);

      playlist.set({
        service: $(service).parents('.tracklist').attr('data-service'),
        songs: songs
      });

      var playlistView = new _PlaylistView.PlaylistView({
        model: playlist,
        el: 'ul'
      });
    }, _this);
    return _this;
  }

  return PlaylistCollection;
}(Collection);

},{"../models/Playlist":5,"../views/PlaylistView":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncCollection = undefined;

var _Sync = require('../models/Sync');

var _SyncView = require('../views/SyncView');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var Collection = _Backbone.Collection;

var SyncCollection = exports.SyncCollection = function (_Collection) {
  _inherits(SyncCollection, _Collection);

  function SyncCollection() {
    _classCallCheck(this, SyncCollection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SyncCollection).call(this));

    console.log('SyncCollection constructor');

    _this.model = _Sync.Sync;

    _.each($('#sync li'), function (a) {
      if ($(a).hasClass('label')) {
        return;
      }

      var $icon_elem = $(a).find('i'),
          sync = new _Sync.Sync();

      sync.set({
        icon: $icon_elem.attr('class'),
        icon_replace: $icon_elem.attr('data-icon-replace'),
        link: $(a).children().attr('href'),
        name: $icon_elem.attr('title')
      });

      var syncView = new _SyncView.SyncView({
        model: sync,
        el: a
      });

      // Check if need to sync service.
      if (_.indexOf(sync.get('icon').split(' '), 'fa-spin') != -1) {
        console.log('needs sync');
        sync.doSync();
      }

      // Add this new model to the collection
      this.add(sync);
    }, _this);
    return _this;
  }

  return SyncCollection;
}(Collection);

},{"../models/Sync":6,"../views/SyncView":10}],4:[function(require,module,exports){
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

},{"./app":1}],5:[function(require,module,exports){
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
 * Playlist Model.
 */

var Playlist = exports.Playlist = function (_Model) {
  _inherits(Playlist, _Model);

  function Playlist() {
    _classCallCheck(this, Playlist);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Playlist).apply(this, arguments));
  }

  _createClass(Playlist, [{
    key: 'defaults',
    value: function defaults() {
      return {
        service: '',
        songs: []
      };
    }
  }]);

  return Playlist;
}(Model);

},{}],6:[function(require,module,exports){
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
 * Sync Model.
 */

var Sync = exports.Sync = function (_Model) {
  _inherits(Sync, _Model);

  function Sync() {
    _classCallCheck(this, Sync);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sync).apply(this, arguments));
  }

  _createClass(Sync, [{
    key: 'defaults',
    value: function defaults() {
      return {
        name: '',
        icon: '',
        icon_replace: '',
        link: ''
      };
    }
  }, {
    key: 'doSync',
    value: function doSync() {
      Backbone.ajax({
        dataType: "json",
        url: "/api/sync/" + this.get('name'),
        data: "",
        success: function success(val) {
          //collection.add(val);  //or reset
          //console.log(collection);
          console.log(val);
        }
      });
    }
  }]);

  return Sync;
}(Model);

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Songs list item template.
 */
var SONG_LI_TPL = exports.SONG_LI_TPL = _.template("<span class='title'><%= title %></span>" + "<button class='play'>Play</button>");

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Backbone = Backbone;
var View = _Backbone.View;
//import { SyncCollection } from '../collections/SyncCollection';

var PlaylistView = exports.PlaylistView = function (_View) {
  _inherits(PlaylistView, _View);

  function PlaylistView(options) {
    _classCallCheck(this, PlaylistView);

    //options.tagName = 'ul';
    console.log('playlistView');
    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlaylistView).call(this, options));

    // fix context issues
    //_.bindAll(this, 'doSync', 'render');
    //this.listenTo(Songs, 'reset', this.addAll);
  }

  _createClass(PlaylistView, [{
    key: 'render',
    value: function render() {
      $(this.el).html('TEST');
      return this;
    }
  }]);

  return PlaylistView;
}(View);

},{}],9:[function(require,module,exports){
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

},{"../templates/song_li.tpl":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Marionette = Marionette;
var View = _Marionette.View;
//import { SyncCollection } from '../collections/SyncCollection';

var SyncView = exports.SyncView = function (_View) {
  _inherits(SyncView, _View);

  function SyncView(options) {
    _classCallCheck(this, SyncView);

    console.log('SyncView constructor');
    console.log(options);

    options.tagName = 'li';

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SyncView).call(this, options));

    console.log(_this);
    // fix context issues
    //_.bindAll(this, 'doSync', 'render');
    //this.listenTo(Songs, 'reset', this.addAll);
    return _this;
  }

  _createClass(SyncView, [{
    key: 'doSync',
    value: function doSync() {
      console.log('z?');
      this.model.doSync();
    }
  }, {
    key: 'render',
    value: function render() {
      $(this.el).html('TEST');
      return this;
    }
  }]);

  return SyncView;
}(View);

},{}]},{},[4]);

//# sourceMappingURL=main.js.map
