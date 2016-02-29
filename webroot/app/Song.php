<?php

namespace App;

use Session;

class Song
{
  /**
   * Returns all songs from a given provider and playlist
   * @param  string $provider Soundcloud, Youtube etc.
   * @param  string $playlist palylist name, i.e. favorites.
   * @return array of song details.
   */
  public static function songs($provider, $playlist)
  {
    if (Session::has("services.$provider.music.$playlist"))
    {
      return Session::get("services.$provider.music.$playlist");
    }

    return false;
  }
}
