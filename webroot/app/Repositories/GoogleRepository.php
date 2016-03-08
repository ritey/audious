<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class GoogleRepository
{
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
      'image' => asset('img/google-sign-in.png'),
    ];
  }

  public function getPlaylists(Request $request) {
    if (!$request->session()->has('services.youtube')) {
      return [];
    }

    $access_token = $request->session()->get('services.youtube.access_token');

    $client = new Client();
    $response = $client->request('GET', 'https://www.googleapis.com/youtube/v3/playlists',[
      'headers' => [
        'Authorization' => "Bearer $access_token",
      ],
      'query' => [
        'part' => 'snippet',
        'mine' => 'true',
        'key' => $access_token,
      ],
    ]);

    $playlists = $response->getBody()->getContents();

    // Got all user playlists.
  }
}
