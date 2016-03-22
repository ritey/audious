//import Marionette from 'backbone.marionette';
import { SongList } from './collections/SongCollection';
import { SongView } from './views/SongView';

var { Model, View, Collection, Router } = Backbone;
var { Application } = Marionette;
// Global Songs collection variable.
var Songs = new SongList();

//http://marionettejs.com/docs/v3.0.0-pre.2/marionette.application.html#getting-started
export class App extends Application
{
  constructor() {
    super();
    console.log('hello, Marionette');
  }
}

export class AppView extends View
{
  constructor() {
    super();

    this.$el = $('#app');
    this.$sync = $('#sync');

    this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    this.authorise();

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
   * Display all songs.
   */
  addAll() {
    this.$('#playlist').html('');
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
      client_id: document.querySelector("meta[name='client_id']").getAttribute('content'),
      redirect_uri: document.querySelector("meta[name='redirect_uri']").getAttribute('content')
    });

    this.soundcloudReady = true;
  }
}
