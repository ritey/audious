import { SONG_LI_TPL } from '../templates/song_li.tpl';

var { View } = Backbone;

export class SongView extends View
{
  constructor(options) {
    super(options);

    this.tagName = 'li';

    // Cache the template function for a single item.
    this.template = SONG_LI_TPL;
  }

  render() {
    // Pass model data to template and then append to DOM.
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
}
