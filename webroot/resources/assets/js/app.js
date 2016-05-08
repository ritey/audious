//import Marionette from 'backbone.marionette';
import { SongCollection } from './collections/SongCollection';

//import { PlaylistCollection } from './collections/PlaylistCollection';
//import { SongView } from './views/SongView';
//import { SyncView } from './views/SyncView';
//import { SyncCollection } from './collections/SyncCollection';

var { Model, View, Collection, Router } = Backbone;
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
var Songs = new SongCollection();

export class AppView extends View
{
  // Define events we gonna listen on.
  get events() {
    return {
      "click button.player.play": "player_play",
      "click button.player.pause": "player_pause"
    };
  }

  constructor() {
    super();

    this.$el = $('#app');
    //this.$sync = $('#sync');

    //this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    /*if ($("meta[name='soundcloud_client_id']").length) {
      this.authorise();
    }*/

    // Init player.
    this.player = new Audio();
    // Variable for playing song. holds even when paused.
    this.current_song = null;
    // Soundcloud cliend_id;
    this.soundcloud_client_id = $("meta[name='soundcloud_client_id']").attr('content');
    // Listen for events.
    this.listenTo(Songs, 'play', this.play);
    this.listenTo(Songs, 'pause', this.pause);

    // Add CSRF token for ajax requests.
    this.addCSRFToken();

    // Sync music if needed.
    this.syncAllMusic();
  }

  /**
   * Render App.
   */
  render() {
    var active = Songs.active();
  }

  /**
   * Add CSRF token for ajax requests.
   */
  addCSRFToken() {
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
  syncAllMusic() {
    var context = this;
    // Check if there is any refresh icons.
    if ($('#sync i.fa-refresh').length) {
      // Found refresh icon - sync.
      $('#sync i.fa-refresh').each(function() {
        context.syncMusic($(this).parents('li.sync-service'));
      });
    }
  }

  /**
   * Sync service music
   * @param  jQuery obj $elem
   */
  syncMusic($elem) {
    var title = $elem.attr('data-service-title');
    Backbone.ajax({
      dataType: "json",
      url: "/api/sync/" + title,
      data: "",
      success: function(val){
        //collection.add(val);  //or reset
        //console.log(collection);
        console.log(val);
      }
    });
  }

  play(song) {
    /*
    // Play song. Call dynamically service named function and pass active song model.
    //this[this.model.get('service') + '_stop'](this.model);

    // Play song. Call dynamically service named function and pass active song model.
    //this[this.model.get('service') + '_play'](this.model);
    */
    if (this.current_song != song) {
      this[song.get('service') + '_load'](song);
    }
    else {
      this[song.get('service') + '_play'](song);
    }
  }

  player_pause() {
    console.log('player pause');
  }

  pause(song) {
    console.log('lets pause');
    this[song.get('service') + '_pause'](song);
  }

  /**
   * Play
   */
  soundcloud_load(song) {
    this.player.pause();
    this.player.src = 'https://api.soundcloud.com/tracks/'+song.get('identifier')+'/stream?consumer_key=' + this.soundcloud_client_id;
    this.player.load();
    this.player.play();

    this.current_song = song;
  }

  /**
   * Play song.
   */
  soundcloud_play(song) {
    this.player.play();
  }
  /**
   * Stop song.
   */
  soundcloud_stop(song) {
    this.soundcloud_pause();
  }

  /**
   * Pause song.
   */
  soundcloud_pause(song) {
    this.player.pause();
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
  /*authorise() {
    SC.initialize({
      client_id: $("meta[name='soundcloud_client_id']").attr('content'),
      redirect_uri: $("meta[name='soundcloud_redirect_uri']").attr('content')
    });

    this.soundcloudReady = true;
  }*/
}
