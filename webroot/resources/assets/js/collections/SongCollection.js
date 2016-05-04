import { Song } from '../models/Song';
import { SongView } from '../views/SongView';

var { Collection } = Backbone;

/**
 * Song Collection
 */
export class SongCollection extends Collection
{
  constructor() {
    super();

    // Attach model.
    this.model = Song;

    // backend API url
    this.url = '/api/song';

    // Parse songs from DOM.
    _.each($('#tracklist ul li.song'), function(elem) {
      var song = new Song({
        id: $(elem).attr('data-id'),
        identifier: $(elem).attr('data-identifier'),
        title: $(elem).text(),
        service: $(elem).parents('.playlists').attr('data-service'),
        playlist: $(elem).parents('.playlist').attr('data-playlist'),
        active: $(elem).hasClass('active')
      });

      // If ever need to attach a view to it.
      var songView = new SongView({
        model: song,
        el: elem,
        tagName: 'li'
      });

      this.add(song);
    }, this);
  }

  /**
   * Get active song.
   */
  active() {
    return this.filter(song => song.get('active'));
  }
}
