var { Model } = Backbone;
/**
 * Song model.
 */
export class Song extends Model
{
  /**
   * Default Song model params.
   */
  defaults()
  {
    return {
      title: '',
      duration: 0,
      active: false,
    };
  }

  /**
   * Parse Song details.
   * At this stage Backbone iterates through individual SongCollection items.
   */
  parse(response)
  {
    console.log(response);
    return response;
  }

  /**
   * Toggle active state.
   */
  toggle()
  {
    this.save({
      active: !this.get('active')
    })
  }
}
