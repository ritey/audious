var { Model } = Backbone;
/**
 * Song model.
 */
export class Song extends Model
{
  /**
   * Default Song model params.
   */
  defaults() {
    return {
      title: '',
      duration: 0,
      active: false
    };
  }

  /**
   * Parse Song details.
   * At this stage Backbone iterates through individual SongCollection items.
   */
  parse(response) {
    /**
     * Convenient underscore.js method to extract needed data subset from larger one.
     */
    return _.pick(response, 'title', 'duration');
  }

  /**
   * Toggle active state.
   */
  toggle() {
    this.save({
      active: !this.get('active')
    });
  }
}
