var { Model, View, Collection, Router, LocalStorage } = Backbone;

export class AppView extends View {
  constructor() {
    super();
    console.log('Hello from ES6 class!');

    this.$el = $('#app');
    // Authorise Soundcloud SDK.
    this.authorise();
  }

  render() {
    this.$el.html('hi');
  }

  /**
   * Authorize Soundcloud SDK
   */
  authorise() {
    SC.initialize({
      client_id: document.querySelector("meta[name='client_id']").getAttribute('content'),
      redirect_uri: document.querySelector("meta[name='redirect_uri']").getAttribute('content')
    });
    console.log('Soundcloud authorised!');
  }
}
