<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Song;

class ApiController extends Controller
{
  // Return all songs.
  public function index(Request $request) {
    return response()->json(Song::all());
  }

  /**
   * Sync music.
   * @param  Request $request
   * @param  String  $service
   * @return json array of new tracks.
   */
  public function sync(Request $request, $service) {
    // Construct namespace to init service container.
    $service = 'App\\Repositories\\' . ucfirst($service) . 'Repository';
    $service = new $service($request);
    // sync music and return new tracks.
    $new_tracks = $service->sync($request);
    return response()->json($new_tracks);
  }
}
