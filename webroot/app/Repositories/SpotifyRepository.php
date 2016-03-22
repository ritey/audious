<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class SpotifyRepository
{
  /**
   * Guzzle object.
   */
  protected $guzzle;

  /**
  * Pre-define common Guzzle params.
  */
  public function __construct(Request $request, $access_token = NULL) {
    if (!$access_token) {
      if (!$request->session()->has('services.spotify.access_token')) {
        return;
      }

      $access_token = $request->session()->get('services.spotify.access_token');
    }
    //
    $this->guzzle = new Client([
      'base_uri' => 'https://api.spotify.com/v1/',
      'headers' => [
        'Authorization' => "Bearer $access_token",
      ],
      'query' => [
        'key' => $access_token,
      ],
    ]);
  }
  /**
   * Return login/logout link and corresponding icon.
   */
  public function getAuthLinks(Request $request) {
    // Show login link instead of logout.
    if (!$request->session()->has('services.spotify')) {
      $params = [
        'client_id' => env('SPOTIFY_CLIENT_ID'),
        'redirect_uri' => env('SPOTIFY_CALLBACK_URL'),
        'response_type' => 'code',
        'scope' => 'playlist-read-private user-library-read',
      ];
      $link = 'https://accounts.spotify.com/authorize?' . http_build_query($params);
    }

    return [
      'link' => $link,
      'icon' => 'fa fa-spotify',
    ];
  }

  /**
   * Get user details.
   */
  public function me() {
    // Append guzzle instance with needed params and execute.
    $response = $this->guzzle->request('GET', 'me');

    // Check response status code.
    if ($response->getStatusCode() != 200) {
      return [];
    }

    return json_decode($response->getBody()->getContents());
  }

  /**
   * Get playlists.
   */
  public function getPlaylists() {
    // Append guzzle instance with needed params and execute.
    $response = $this->guzzle->request('GET', "users/me/playlists", [
      'query' => [
        'limit' => 50, // Max 50 playlists. Would need to implement pagination otherwise.
      ],
    ]);

     // Redirect to homepage if response status is not 200.
    if ($response->getStatusCode() != 200) {
      return redirect('/');
    }

    $playlists = json_decode($response->getBody()->getContents());
    $playlist_items = [];

    // Get playlists tracks.
    foreach ($playlists->items as $playlist) {
      $playlist_items[$playlist->name] = $this->getPlaylistItems($playlist->tracks->href);
    }

    return $playlist_items;
  }

  /**
   * Fetch playlist videos.
   * @param   $id playlist id
   * @return  playlist items info.
   */
  private function getPlaylistItems($href) {
    $response = $this->guzzle->request('GET', $href, [
      'query' => [
        // Gets max 100 tracks per playlist. would need pagination otherwise.
        'limit' => 100,
      ],
    ]);

    if ($response->getStatusCode() != 200) {
      return [];
    }

    return json_decode($response->getBody()->getContents());
  }
}
