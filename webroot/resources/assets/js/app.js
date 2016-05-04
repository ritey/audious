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
  constructor() {
    super();

    this.$el = $('#app');
    //this.$sync = $('#sync');

    this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    if ($("meta[name='soundcloud_client_id']").length) {
      this.authorise();
    }

    // Add CSRF token for ajax requests.
    this.addCSRFToken();

    // Sync music if needed.
    this.syncAllMusic();

    // Event when all playlists are processed.
    //this.listenTo(Playlists, 'reset', this.addAll);
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
  authorise() {
    SC.initialize({
      client_id: $("meta[name='soundcloud_client_id']").attr('content'),
      redirect_uri: $("meta[name='soundcloud_redirect_uri']").attr('content')
    });

    this.soundcloudReady = true;
  }
}
