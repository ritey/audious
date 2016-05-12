/**
 * Song details in music player at the bottom of the screen.
 */
export var SONG_DETAILS_PLAYER = _.template(
  "<div class='controls'>" +
    "<button class='<%= play_action %> player'><i class='fa fa-<%= play_action %>' aria-hidden='true'></i></button>" +
    "<button class='stop player'><i class='fa fa-stop' aria-hidden='true'></i></button>" +
    "<button class='previous player'><i class='fa fa-backward' aria-hidden='true'></i></button>" +
    "<button class='next player'><i class='fa fa-forward' aria-hidden='true'></i></button>" +
  "</div>" +
  "<div class='song-details'>" +
    "<span class='title'><%= title %></span> <span><%= current_time %></span>" +
  "</div>"
);
