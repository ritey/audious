<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class GoogleRepository
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
      if (!$request->session()->has('services.youtube.access_token')) {
        return;
      }

      $access_token = $request->session()->get('services.youtube.access_token');
    }
    //
    $this->guzzle = new Client([
      'base_uri' => 'https://www.googleapis.com/youtube/v3/',
      'headers' => [
        'Authorization' => "Bearer $access_token",
      ],
      'query' => [
        'key' => $access_token,
      ],
    ]);
  }

  /**
   * Return login/logout link and corresponding image.
   */
  public function getAuthLinks() {
    $params = [
      'client_id' => env('GOOGLE_CLIENT_ID'),
      'redirect_uri' => env('GOOGLE_CALLBACK_URL'),
      'response_type' => 'code',
      'scope' => 'https://www.googleapis.com/auth/youtube.readonly',
    ];
    return [
      'link' => 'https://accounts.google.com/o/oauth2/auth?' . http_build_query($params),
      'icon' => 'fa fa-youtube-square',
    ];
  }

  /**
   * Get Youtube playlists.
   */
  public function getPlaylists() {
    // Append guzzle instance with needed params and execute.
    $response = $this->guzzle->request('GET', 'playlists', [
      'query' => [
        'part' => 'snippet',
        'mine' => 'true',
        // Gets max 50 channels (would need to make pagination otherwise).
        'maxResults' => 50,
      ],
    ]);

    $playlists = json_decode($response->getBody()->getContents());
    $playlist_items = [];

    // Google might support requests batch but performance isn't number,
    // one priority for this project.
    foreach ($playlists->items as $playlist) {
      $playlist_items[$playlist->snippet->title] = $this->getPlaylistItems($playlist->id);
    }

    return $playlist_items;
  }

  /**
   * Fetch playlist videos.
   * @param   $id playlist id
   * @return  playlist items info.
   */
  private function getPlaylistItems($id) {
    $response = $this->guzzle->request('GET', 'playlistItems', [
      'query' => [
        'part' => 'snippet',
        'playlistId' => $id,
        // Gets max 50 videos per channel (would need to make pagination otherwise).
        'maxResults' => 50,
      ],
    ]);
    $response = json_decode($response->getBody()->getContents());
    return $response->items;
  }
}
