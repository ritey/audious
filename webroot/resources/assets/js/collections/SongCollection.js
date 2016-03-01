import { Song } from '../models/Song';

var { Collection } = Backbone;

/**
 * Song Collection
 */
export class SongList extends Collection
{
  constructor(options) {
    super(options);

    this.model = Song;
  }

  /**
   * Populate Collection with static data.
   * At this stage we receive whole data object with all songs.
   * Lets return Soundcloud favorites list to model level for time being.
   * In model level it will iterate through individual items.
   * Figure how to load only needed stuff in the feature.
   */
  parse(response) {
    return response.music.soundcloud.favorites;
  }
}
