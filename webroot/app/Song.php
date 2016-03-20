<?php

namespace App;

//use Session;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'title',
    'song_identifier',
    'image',
    'url',
    'song_created'
  ];

  public function playlist() {
    return $this->belongsTo(Playlist::class);
  }

  /**
   * Returns all songs from a given provider and playlist
   * @param  string $provider Soundcloud, Youtube etc.
   * @param  string $playlist palylist name, i.e. favorites.
   * @return array of song details.
   */
  /*public static function songs($provider, $playlist) {
    if (Session::has("services.$provider.music.$playlist"))
    {
      return Session::get("services.$provider.music.$playlist");
    }

    return false;
  }

  // Return all songs.
  public static function all() {
    // Check if user has logged in to any service.
    if (!Session::has("services")) {
      return [];
    }

    $songs = [];
    $services = Session::get("services");

    // Loop through all logged in services and gather songs.
    foreach ($services as $k => $service) {
      // Merge all playlists. i.e. favorites from Soundcloud.
      foreach ($service['music'] as $list) {
        $songs += $list;
      }
    }

    return $songs;
  }*/
}
