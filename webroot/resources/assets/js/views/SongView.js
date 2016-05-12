import { SONG_INACTIVE_LI_TPL } from '../templates/song_inactive_li.tpl';
import { SONG_ACTIVE_LI_TPL } from '../templates/song_active_li.tpl';

var { View } = Backbone;

export class SongView extends View
{
  // Define events we gonna listen on.
  get events() {
    return {
      "click button.playlist.play": "play",
      "click button.playlist.pause": "pause"
    };
  }

  constructor(options) {
    super(options);
    // Cache templates:
    // Song inactive item tpl.
    this.song_inactive_li_template = SONG_INACTIVE_LI_TPL;
    // Song active item tpl.
    this.song_active_li_template = SONG_ACTIVE_LI_TPL;
    // Player song details tpl.
    //this.song_details_template = SONG_DETAILS_PLAYER;
    // Listen for model changes.
    this.listenTo(this.model, 'change', this.render);

    // Render item.
    this.render();
  }

  render() {
    var is_active = this.model.get('active');

    if (is_active) {
      // Pass model data to template and then append to DOM.
      this.$el.html(this.song_active_li_template(this.model.toJSON()));
    }
    else {
      // Pass model data to template and then append to DOM.
      this.$el.html(this.song_inactive_li_template(this.model.toJSON()));
    }

    // Add active class to active song DOM elem.
    this.$el.toggleClass('active', is_active);

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

    this.model.trigger('play', this.model);

    this.render();
  }

  /**
   * Pause button event callback.
   */
  pause() {
    // Deactivate current active song.
    this.deactivate();

    this.model.trigger('pause', this.model);

    this.render();
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
}
