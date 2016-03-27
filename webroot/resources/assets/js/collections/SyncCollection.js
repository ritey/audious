import { Sync } from '../models/Sync';
import { SyncView } from '../views/SyncView';

var { Collection } = Backbone;

export class SyncCollection extends Collection
{
  constructor() {
    super();

    console.log('SyncCollection constructor');

    this.model = Sync;

    _.each($('#sync li'), function(a) {
      if ($(a).hasClass('label')) {
        return;
      }

      var $icon_elem = $(a).find('i'),
          sync = new Sync();

      sync.set({
        icon: $icon_elem.attr('class'),
        icon_replace: $icon_elem.attr('data-icon-replace'),
        link: $(a).children().attr('href'),
        name: $icon_elem.attr('title'),
      });

      var syncView = new SyncView({
        model: sync,
        el: a
      });

      // Check if need to sync service.
      if (_.indexOf(sync.get('icon').split(' '), 'fa-spin') != -1) {
        console.log('needs sync');
        sync.doSync();
      }

      // Add this new model to the collection
      this.add(sync);
    }, this);
  }
}
