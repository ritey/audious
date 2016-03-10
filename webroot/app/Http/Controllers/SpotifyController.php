<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * Example how to paly spotify music:
 * http://jsfiddle.net/JMPerez/p30pb38z/
 * Authorise:
 * https://developer.spotify.com/web-api/authorization-guide/
 */
class SpotifyController extends Controller
{

  public function login(Request $request) {
    print_r('hi');die;
  }
}
