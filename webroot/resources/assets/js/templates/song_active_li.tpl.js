/**
 * Songs list item template.
 */
export var SONG_ACTIVE_LI_TPL = _.template(
  "<button class='pause playlist'><i class='fa fa-pause' aria-hidden='true'></i></button>" +
  "<span class='title'><%= title %></span>"
);
