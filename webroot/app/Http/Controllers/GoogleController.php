<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GoogleController extends Controller
{
  public function login(Request $request) {
    // Works up to this point.
    // @TODO get access_token.
    // https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps#Obtaining_Access_Tokens
    // THEN get playlists like listed here:
    // https://developers.google.com/youtube/v3/docs/playlists/list#request
    // PHP youtube API samples: https://github.com/youtube/api-samples/tree/master/php
    //
    // might be useful https://laracasts.com/discuss/channels/tips/google-api-service-account-connection-laravel-5
    die('hello from the other side');
  }
}
