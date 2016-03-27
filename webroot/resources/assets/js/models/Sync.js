var { Model } = Backbone;

/**
 * Sync Model.
 */
export class Sync extends Model
{
  defaults() {
    return {
      name: '',
      icon: '',
      icon_replace: '',
      link: '',
    }
  }

  doSync() {
    Backbone.ajax({
      dataType: "json",
      url: "/api/sync/" + this.get('name'),
      data: "",
      success: function(val){
        //collection.add(val);  //or reset
        //console.log(collection);
        console.log(val);
      }
    });
  }
}
