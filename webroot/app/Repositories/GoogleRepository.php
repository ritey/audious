<?php

namespace App\Repositories;

use Illuminate\Http\Request;

class GoogleRepository
{
  /**
   * Return login/logout link and corresponding image.
   */
  public function getAuthLinks() {
    $params = [
      'client_id' => env('GOOGLE_CLIENT_ID'),
      'redirect_uri' => env('GOOGLE_CALLBACK_URL'),
      'response_type' => 'token',
      'scope' => 'https://www.googleapis.com/auth/youtube.readonly',
    ];
    return [
      'link' => 'https://accounts.google.com/o/oauth2/auth?' . http_build_query($params),
      'image' => asset('img/google-sign-in.png'),
    ];
  }
}
