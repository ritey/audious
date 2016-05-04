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
    $service_obj = 'App\\Repositories\\' . ucfirst($service) . 'Repository';
    $service_obj = new $service_obj($request);
    // sync music and return new tracks.
    $new_tracks = $service_obj->sync($request, $service);
    return response()->json($new_tracks);
  }

  /**
   * Update Song attributes. ATM it is just setting whether song is active.
   */
  public function update(Request $request, Song $song) {
    $song->active = $request->active;
    $song->save();
  }
}
