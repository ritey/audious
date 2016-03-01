import { SongList } from './collections/SongCollection';

var { Model, View, Collection, Router, LocalStorage } = Backbone;

// Global Songs collection variable.
var Songs = new SongList();

// Populate Songs collection with static data provided by server in data var.
Songs.reset(data, {parse: true});

export class AppView extends View
{
  constructor() {
    super();

    this.$el = $('#app');
    this.soundcloudReady = false;

    // Authorise Soundcloud SDK.
    this.authorise();

    this.listenTo(Songs, 'play', this.play);
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
