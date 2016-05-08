/**
 * Songs list item template.
 */
export var SONG_INACTIVE_LI_TPL = _.template(
  "<button class='play playlist'><i class='fa fa-play' aria-hidden='true'></i></button>" +
  "<span class='title'><%= title %></span>"
);
