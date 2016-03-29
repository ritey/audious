//import Marionette from 'backbone.marionette';
import { SongList } from './collections/SongCollection';
import { SongView } from './views/SongView';
//import { SyncView } from './views/SyncView';
import { SyncCollection } from './collections/SyncCollection';

var { Model, View, Collection, Router } = Backbone;
var { Application } = Marionette;

// Global Songs collection variable.
var Songs = new SongList();

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
  constructor() {
    super();

    this.$el = $('#app');
    this.$sync = $('#sync');

    this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    if ($("meta[name='soundcloud_client_id']").length) {
      this.authorise();
    }

    // Sync music if needed.
    this.syncAllMusic();

    // Event when all songs are added. Runs on startup.
    this.listenTo(Songs, 'reset', this.addAll);

    // Populate Songs collection with static data provided by server in data var.
    //Songs.reset(data, {parse: true});
    Songs.fetch();
  }

  /**
   * Render App.
   */
  render() {

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
  addAll() {
    //this.$('#playlist').html('');
    // Iterate through songs and add each to html.
    Songs.each(this.addOne, this);
  }

  /**
   * Display one song.
   */
  addOne(model) {
    var view = new SongView({ model });
    // Append list with rendered Song partial view.
    $('#playlist').append(view.render().el);
  }

  /**
   * Authorize Soundcloud SDK
   */
  authorise() {
    SC.initialize({
      client_id: $("meta[name='soundcloud_client_id']").getAttribute('content'),
      redirect_uri: $("meta[name='soundcloud_redirect_uri']").getAttribute('content')
    });

    this.soundcloudReady = true;
  }
}
