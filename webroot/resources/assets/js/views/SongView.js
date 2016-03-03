import { SONG_LI_TPL } from '../templates/song_li.tpl';

var { View } = Backbone;

export class SongView extends View
{
  constructor(options) {

    // Parent element doesn't have defined tagName,
    // Therefore append options object with it
    // because this.tagName will not work in this context.
    options.tagName = 'li';
    // Add class to li element.
    options.className = 'playlist-song';

    // Attach events.
    options.events = {
      "click button.play": "play"
    }

    super(options);

    // Cache the template function for a single item.
    this.template = SONG_LI_TPL;
  }

  render() {
    // Pass model data to template and then append to DOM.
    this.$el.html(this.template(this.model.toJSON()));

    this.$el.toggleClass('active', this.model.get('active'));
    return this;
  }

  /**
   * Play button event callback.
   */
  play() {
    this.model.toggle();
  }
}
