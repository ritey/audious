import { SongList } from './collections/SongCollection';
import { SongView } from './views/SongView';

var { Model, View, Collection, Router, LocalStorage } = Backbone;

// Global Songs collection variable.
var Songs = new SongList();

export class AppView extends View
{
  constructor() {
    super();

    this.$el = $('#app');
    this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    this.authorise();

    // Event when all songs are added. Runs on startup.
    this.listenTo(Songs, 'reset', this.addAll);
    this.listenTo(Songs, 'play', this.play);

    // Populate Songs collection with static data provided by server in data var.
    Songs.reset(data, {parse: true});
  }

  /**
   * Render App.
   */
  render() {
    if (Songs.length) {

    }
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

  /**
   * Play song.
   */
  play() {
    if (this.soundcloudReady)
    {

    }
  }
}
