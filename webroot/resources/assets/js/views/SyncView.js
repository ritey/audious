var { View } = Marionette;
//import { SyncCollection } from '../collections/SyncCollection';

export class SyncView extends View
{
  constructor(options) {
    console.log('SyncView constructor');
    console.log(options);

    options.tagName = 'li';

    super(options);
console.log(this);
    // fix context issues
    //_.bindAll(this, 'doSync', 'render');
    //this.listenTo(Songs, 'reset', this.addAll);
  }

  doSync() {
    console.log('z?');
    this.model.doSync();
  }

  render() {
    $(this.el).html('TEST');
    return this;
  }
}
