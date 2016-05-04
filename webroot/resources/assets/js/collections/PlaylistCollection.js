import { Playlist } from '../models/Playlist';
import { PlaylistView } from '../views/PlaylistView';

var { Collection } = Backbone;

export class PlaylistCollection extends Collection
{
  constructor() {
    super();

    this.model = Playlist;

    _.each($('#tracklist ul'), function(service) {
      var playlist = new Playlist(),
          songs = [];

      _.each($(service).children('li.song'), function(song) {
        songs.push({
          title: $(song).text()
        });
      }, this);

      playlist.set({
        service: $(service).parents('.songlist').attr('data-service'),
        songs: songs
      });

      // If ever need to attach a view to it.
      var playlistView = new PlaylistView({
        model: playlist,
        el: 'ul'
      });

    }, this);
  }
}
