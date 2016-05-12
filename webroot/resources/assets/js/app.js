//import Marionette from 'backbone.marionette';
import { SongCollection } from './collections/SongCollection';
import { SONG_DETAILS_PLAYER } from './templates/song_details_player.tpl';
import { Song } from './models/Song';
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

export class AppView extends View
{
  // Define events we gonna listen on.
  get events() {
    return {
      "click button.player.play": "player_play",
      "click button.player.pause": "player_pause",
      "click button.player.stop": "player_stop"
    };
  }

  constructor(options) {
    super(options);

    //this.el = '#app';
    //this.$sync = $('#sync');

    //this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    /*if ($("meta[name='soundcloud_client_id']").length) {
      this.authorise();
    }*/

    // Player song details tpl.
    this.song_details_template = SONG_DETAILS_PLAYER;

    // Init player.
    this.player = new Audio();
    // Variable for playing song. holds even when paused.
    this.current_song = {
      model: {},
      current_time: 0,
      total_time: 0
    };
    // Soundcloud cliend_id;
    this.soundcloud_client_id = $("meta[name='soundcloud_client_id']").attr('content');

    this.songs = new SongCollection();

    // Listen for events.
    this.listenTo(this.songs, 'play', this.play);
    this.listenTo(this.songs, 'pause', this.pause);

    // Add CSRF token for ajax requests.
    this.addCSRFToken();

    // Sync music if needed.
    this.syncAllMusic();
  }

  /**
   * Render App.
   */
  render() {
    this.$el.html(this.template());
    return this;
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
    // Construct function name from service variable and call it.
    if (this.current_song.model != song) {
      this[song.get('service') + '_load'](song);
    }
    else {
      this[song.get('service') + '_play'](song);
    }

    this.updateMusicPlayer(song);
  }

  pause(song) {
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

    this.current_song.model = song;
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
 *  MUSIC PLAYER AT BOTTOM FUNCTIONS.
 */

 player_play() {
    if (this.current_song.model.id.length) {
      this.current_song.model.toggle();
      this.play(this.current_song.model);
    }
  }

  /**
   * Music Player pause button action.
   */
  player_pause() {
    // Duplicate in SongView!
    this.current_song.model.toggle();
    this.pause(this.current_song.model);
    this.updateMusicPlayer(this.current_song);
  }

  /**
   * Music Player stop button action.
   */
  player_stop() {
    this.current_song.model.toggle();
    this.pause(this.current_song.model);
    this.current_song.model = new Song();
    this.updateMusicPlayer(this.current_song);
  }
/**
   * Update Music Player details
   */
  updateMusicPlayer(song) {
    // Set play/pause button.
    var play_action = this.player.paused ? 'play' : 'pause';
    var extend = {
      play_action: play_action,
      current_time: 0
    }
    var data = _.extend(song.toJSON(), extend);
    $('#player').html(this.song_details_template(data));
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
