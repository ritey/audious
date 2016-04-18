<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Playlist;
use App\Service;
use DB;
use Auth;

class SoundcloudRepository
{
  /**
   * Guzzle object.
   */
  protected $guzzle;

  /**
   * Access token.
   */
  protected $access_token;

  /**
   * Pass Soundcloud API details up.
   */
  /*public function __construct(SoundcloudFacade $soundcloud) {
    parent::__construct(env('SOUNDCLOUD_CLIENT_ID'), env('SOUNDCLOUD_CLIENT_SECRET'), env('SOUNDCLOUD_CALLBACK_URL'));
    $this->soundcloud = $soundcloud;
  }*/
  /**
  * Pre-define common Guzzle params.
  */
  public function __construct(Request $request, $access_token = NULL) {
    if (!$access_token) {
      if (!$request->session()->has('services.soundcloud.access_token')) {
        return;
      }

      $access_token = $request->session()->get('services.soundcloud.access_token');
    }

    // Save access token.
    $this->access_token = $access_token;

    $this->guzzle = new Client([
      'base_uri' => 'https://api.soundcloud.com/',
      'headers' => [
        'Authorization' => "Bearer $access_token",
      ],
      'query' => [
        'key' => $access_token,
        'oauth_token' => $access_token,
      ],
    ]);
  }

  /**
   * Get user object.
   */
  public function me() {
    $response = $this->guzzle->request('GET', 'me');

    // Check response status code.
    if ($response->getStatusCode() != 200) {
      return [];
    }

    return json_decode($response->getBody()->getContents());
  }

  /**
   * Get user liked music.
   * @param  integer $user_id      user id for which to fetch playlists.
   * @param  string $access_token  authentication access_token.
   */
  public function getPlaylists($user_id) {
    $playlists = [];

    $playlists += $this->playlists($user_id);
    $playlists['user_favorites'] = $this->favorites($user_id);

    return $playlists;
  }

  /**
   * Get user favorites.
   */
  private function favorites($user_id) {
    $response = $this->guzzle->request('GET', "users/$user_id/favorites");

    // Redirect to homepage if response status is not 200.
    if ($response->getStatusCode() != 200) {
      return [];
    }

    return json_decode($response->getBody()->getContents());
  }

  /**
   * Return playlists
   */
  private function playlists($user_id) {
    $response = $this->guzzle->request('GET', "users/$user_id/playlists");

    // Redirect to homepage if response status is not 200.
    if ($response->getStatusCode() != 200) {
      return [];
    }

    $response = json_decode($response->getBody()->getContents());
    $playlists = [];

    foreach ($response as $v) {
      $playlists[$v->permalink] = $v->tracks;
    }
    return $playlists;
  }

  /**
   * Return login/logout link and corresponding image.
   */
  public function getAuthLinks(Request $request) {
    $icon = 'fa fa-soundcloud';
    $icon_replacement = 'fa-refresh fa-spin';
    $params = [
      'client_id' => env('SOUNDCLOUD_CLIENT_ID'),
      'redirect_uri' => env('SOUNDCLOUD_CALLBACK_URL'),
      'response_type' => 'code',
    ];
    $soundcloud_link = 'https://soundcloud.com/connect?' . http_build_query($params);

    // Change icon if we need to sync music.
    if ($request->session()->has('services.soundcloud')) {
      $icon = 'fa fa-refresh fa-spin';
      $icon_replacement = 'fa fa-soundcloud';
    }

    return [
      'link' => $soundcloud_link,
      'icon' => $icon,
      'icon_replacement' => $icon_replacement,
    ];
  }

  /**
   * Sync tracks.
   */
  public function sync(Request $request, $service) {
    //$user_id = null;
    $user = $request->session()->get('services.soundcloud.user');
    if (!$user) {
      return [];
    }

    $service = Service::id($service);
    $all_music = $this->getPlaylists($user->id);
    $new_music = $this->syncUpdate($request, $service, $all_music);
    return $all_music;
  }

  /**
   * Save new tracks to db.
   */
  private function syncUpdate($request, $service, $all_music) {
    foreach ($all_music as $playlist_name => $tracks) {
      // Get playlist.
      $playlist = Playlist::getPlaylist($playlist_name, ucfirst($service->name));

      // If playlist not in DB - add.
      if (empty($playlist)) {
        $playlist = Auth::user()->playlists()->create([
          'name' => $playlist_name,
          'service_id' => $service->id
        ]);
      }

      // Get list of existing songs in db.
      $song_identifier_in_db = $this->extractPlaylistSongIds($playlist);

      foreach ($tracks as $track) {
        // If song already in db, skip and remove from array of existing ids.
        if (isset($song_identifier_in_db[$track->id])) {
          unset($song_identifier_in_db[$track->id]);
          continue;
        }

        // Create new song.
        $playlist->songs()->firstOrCreate([
          'title' => $track->title,
          'song_identifier' => $track->id,
          'image' => $track->artwork_url,
          'url' => $track->permalink_url,
          'song_created' => $track->created_at,
          'service_id' => $service->id
        ]);
      }

      // Check if any songs left in songs list from db. If so, remove thos songs from db.
      if (!empty($song_identifier_in_db)) {
        $song_identifier_in_db = collect($song_identifier_in_db);
        $ids = $song_identifier_in_db->keyBy('id')->keys();
        Song::destroy($ids);
      }
    }

    // Delete deleted playlists including songs.
    Playlist::deletePlaylist(array_keys($all_music), $service->id);
  }

  /**
   * Extract songs identifiers from given playlist.
   */
  private function extractPlaylistSongIds($playlist) {
    return $playlist->songs->keyBy('song_identifier')->toArray();
  }

}
