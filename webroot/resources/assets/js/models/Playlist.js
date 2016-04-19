var { Model } = Backbone;

/**
 * Playlist Model.
 */
export class Playlist extends Model
{
  defaults() {
    return {
      service: '',
      songs: [],
    }
  }
}
