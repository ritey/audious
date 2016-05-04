import { SONG_LI_TPL } from '../templates/song_li.tpl';
import { SONG_DETAILS_PLAYER } from '../templates/song_details_player.tpl';

var { View } = Backbone;

export class SongView extends View
{
  // Define events we gonna listen on.
  get events() {
    return {
      "click button.play": "play"
    };
  }

  constructor(options) {
    super(options);
    // Cache templates:
    // Song item tpl.
    this.template = SONG_LI_TPL;
    // Player song details tpl.
    this.song_details_template = SONG_DETAILS_PLAYER;
    // Listen for model changes.
    this.listenTo(this.model, 'change', this.render);

    // Render item.
    this.render();
  }

  render() {
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
  play() {
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
  deactivate() {
    var active = this.model.collection.active();
    if (active.length) {
      // Just in case if there were more than 1 active song.
      for (var i=0; i<active.length; i++) {
        active[i].toggle();
      }
    }
  }

  /**
   * Update Music Player details
   */
  updateMusicPlayer(song) {
    $('#player .song-details').html(this.song_details_template(song.toJSON()));
  }

  /**
   * Play
   * @param  {[type]} $song [description]
   * @return {[type]}       [description]
   */
  soundcloud_play($song) {
    SC.stream('/tracks/' + $song.get('identifier')).then(function(player){
      player.play();
    });
  }
}
