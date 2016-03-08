<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class GoogleController extends Controller
{
  /**
   * Login using Google oAuth.
   * How to login:
   * https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps#Obtaining_Access_Tokens
   * @param  Request $request [description]
   * @return [type]           [description]
   */
  public function login(Request $request) {
    // THEN get playlists like listed here:
    // https://developers.google.com/youtube/v3/docs/playlists/list#request
    // PHP youtube API samples: https://github.com/youtube/api-samples/tree/master/php
    //
    // might be useful https://laracasts.com/discuss/channels/tips/google-api-service-account-connection-laravel-5 parse_url

    // Check if we have token query.
    if (!$request->has('code')) {
      // If not, redirect to homepage.
      return redirect('/');
    }

    // Parse returned code.
    $code = $request->get('code');

    // Use Guzzle to form request.
    $client = new Client();
    // Get access_token.
    $response = $client->request('POST', 'https://accounts.google.com/o/oauth2/token', [
      'form_params' => [
        'code'          => $code,
        'client_id'     => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect_uri'  => env('GOOGLE_CALLBACK_URL'),
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

    $this->saveSession($request, $access_token);

    return redirect('/');
  }

  /**
   * Google logout link.
   */
  public function logout(Request $request) {
    // Delete Google session data.
    $request->session()->forget('services.youtube');
    return redirect('/');
  }

  /**
   * Save Google login to session.
   * Very similar code to soundcloud...
   * @todo clean this up!
   */
  private function saveSession(Request $request, $access_token) {
    $data = [
      'youtube' => [
        'access_token' => $access_token,
        //'user' => $this->soundcloudRepository->me($access_token),
      ],
    ];

    //$data['soundcloud']['music']['favorites'] = $this->soundcloudRepository->favorites($data['soundcloud']['user']->id, $access_token);

    // If first login.
    if (!$request->session()->has('services')) {
      $request->session()->put('services', $data);
    }
    else {
      // If not first service login, i.e. already logged in via youtube,
      // Append services session.
      $request->session()->put('services.youtube', $data['youtube']);
    }
  }
}
