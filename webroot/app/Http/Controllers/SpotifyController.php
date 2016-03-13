<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use App\Repositories\SpotifyRepository;

/**
 * Example how to paly spotify music:
 * http://jsfiddle.net/JMPerez/p30pb38z/
 * Authorise:
 * https://developer.spotify.com/web-api/authorization-guide/
 */
class SpotifyController extends Controller
{
  /**
   * The SpotifyRepository.
   */
  protected $spotifyRepository;

  public function login(Request $request) {
    // Check if we got code. Redirect to homepage otherwise.
    if (!$request->has('code')) {
      return redirect('/');
    }

    // Parse returned code.
    $code = $request->get('code');

    // Use Guzzle to form request.
    $client = new Client();
    // Get access_token.
    $response = $client->request('POST', 'https://accounts.spotify.com/api/token', [
      'form_params' => [
        'code'          => $code,
        'client_id'     => env('SPOTIFY_CLIENT_ID'),
        'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        'redirect_uri'  => env('SPOTIFY_CALLBACK_URL'),
        'grant_type'    => 'authorization_code',
      ],
    ]);

    // Redirect to homepage if response status is not 200.
    if ($response->getStatusCode() != 200) {
      return redirect('/');
    }

    // Parse access_token.
    $response = json_decode($response->getBody()->getContents());
    $access_token = $response->access_token;

    //Init GoogleRepository after authentication when we have access_token.
    $this->initSpotifyRepository($request, $access_token);

    $this->saveSession($request, $access_token);

    return redirect('/');
  }

  /**
   * Spotify logout link.
   */
  public function logout(Request $request) {
    // Delete Spotify session data.
    $request->session()->forget('services.spotify');
    return redirect('/');
  }

  /**
   * Init GoogleRepository after authentication when we have access_token.
   */
  private function initSpotifyRepository($request, $access_token) {
    $this->spotifyRepository = new SpotifyRepository($request, $access_token);
  }

  /**
   * Save Spotify login to session.
   * Very similar code to soundcloud...
   * @todo clean this up!
   */
  private function saveSession(Request $request, $access_token) {
    //$user = $this->spotifyRepository->me();
    $data = [
      'spotify' => [
        'access_token' => $access_token,
        //'user' => $user,
        'music' => $this->spotifyRepository->getPlaylists(),
      ],
    ];

    // We need user id which will be found above.
    //$data['spotify']['music'] = $this->spotifyRepository->getPlaylists($user->id);

    // If first login.
    if (!$request->session()->has('services')) {
      $request->session()->put('services', $data);
    }
    else {
      // If not first service login, i.e. already logged in via youtube,
      // Append services session.
      $request->session()->put('services.spotify', $data['spotify']);
    }
  }
}
