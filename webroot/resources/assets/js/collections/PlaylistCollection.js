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

      _.each($(service).children('li'), function(song) {
        songs.push({
          title: $(song).text()
        });
      }, this);

      playlist.set({
        service: $(service).parents('.tracklist').attr('data-service'),
        songs: songs
      });

      var playlistView = new PlaylistView({
        model: playlist,
        el: 'ul'
      });

    }, this);
  }
}
