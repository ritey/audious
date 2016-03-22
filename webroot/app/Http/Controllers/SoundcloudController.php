<?php
//https://developers.soundcloud.com/docs/api/reference#me
//https://developers.soundcloud.com/docs/api/guide
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\SoundcloudRepository;
use GuzzleHttp\Client;

class SoundcloudController extends Controller
{
  /**
   * The Soundcloud instance.
   */
  protected $soundcloud;

  /**
   * The Soundcloud repository instance.
   */
  protected $soundcloudRepository;

  /**
   * Get access_token from Soundcloud.
   * @param  string $code Soundcloud auth code.
   * @return string       access_token
   */
  private function getAccessToken($code) {
    $response = $this->soundcloud->codeForToken($code);

    // Check if we got 200 response code
    if ($response->getHttpCode() != "200") {
      return false;
    }

    // Extract access_token.
    return $response->bodyObject()->access_token;
  }

  private function saveSession(Request $request, $access_token) {
    $me = $this->soundcloudRepository->me();
    $data = [
      'soundcloud' => [
        'access_token' => $access_token,
        'user' => $me
      ],
    ];

    //$data['soundcloud']['music'] = $this->soundcloudRepository->getPlaylists($me->id, $access_token);

    // If first login.
    if (!$request->session()->has('services')) {
      $request->session()->put('services', $data);
    }
    else {
      // If not first service login, i.e. already logged in via youtube,
      // Append services session.
      $request->session()->put('services.soundcloud', $data['soundcloud']);
    }
  }

  /**
   * Soundcloud login callback.
   */
  public function login(Request $request) {
    // Check if we have code query.
    if (!$request->has('code')) {
      // If not, redirect to homepage.
      return redirect('/');
    }

    // Parse returned code.
    $code = $request->get('code');

    // Use Guzzle to form request.
    $client = new Client();
    // Get access_token.
    $response = $client->request('POST', 'https://api.soundcloud.com/oauth2/token', [
      'form_params' => [
        'code'          => $code,
        'client_id'     => env('SOUNDCLOUD_CLIENT_ID'),
        'client_secret' => env('SOUNDCLOUD_CLIENT_SECRET'),
        'redirect_uri'  => env('SOUNDCLOUD_CALLBACK_URL'),
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
    $this->initSoundcloudRepository($request, $access_token);

    $this->saveSession($request, $access_token);

    return redirect('/');
  }

  private function initSoundcloudRepository($request, $access_token) {
    $this->soundcloudRepository = new SoundcloudRepository($request, $access_token);
  }
}
