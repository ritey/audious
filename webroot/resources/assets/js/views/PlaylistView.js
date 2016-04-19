var { View } = Backbone;
//import { SyncCollection } from '../collections/SyncCollection';

export class PlaylistView extends View
{
  constructor(options) {
    //options.tagName = 'ul';
console.log('playlistView');
    super(options);

    // fix context issues
    //_.bindAll(this, 'doSync', 'render');
    //this.listenTo(Songs, 'reset', this.addAll);
  }

  render() {
    $(this.el).html('TEST');
    return this;
  }
}
