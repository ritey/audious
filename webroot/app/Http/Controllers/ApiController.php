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
}
