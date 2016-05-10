<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\SoundcloudRepository;
use App\Repositories\GoogleRepository;
use App\Repositories\SpotifyRepository;
use App\Song;
use App\Service;
use App\Playlist;

class PageController extends Controller
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
   * The Google repository instance.
   */
  protected $googleRepository;

  /**
   * The Spotify repository instance.
   */
  protected $spotifyRepository;


  /**
   * Create a controller instance.
   *
   * @param  SoundcloudFacade  $soundcloud
   * @return void
   */
  public function __construct(SoundcloudRepository $soundcloudRepository, GoogleRepository $googleRepository, SpotifyRepository $spotifyRepository) {
    $this->soundcloud = $soundcloud;
    $this->soundcloudRepository = $soundcloudRepository;
    $this->googleRepository = $googleRepository;
    $this->spotifyRepository = $spotifyRepository;
  }

  /**
   * Homepage
   */
  public function index(Request $request) {
    $playlists = [];
    if ($request->user()) {
      $playlists = [
        'soundcloud' => $request->user()->getPlaylists('Soundcloud'),
      ];
    }

    return view('homepage', [
      'client_id' => getenv('SOUNDCLOUD_CLIENT_ID'),
      'redirect_uri' => getenv('SOUNDCLOUD_CALLBACK_URL'),
      'services' => [
        'soundcloud' => $this->soundcloudRepository->getAuthLinks($request),
        //'google' => $this->googleRepository->getAuthLinks($request),
        //'spotify' => $this->spotifyRepository->getAuthLinks($request)
      ],
      'playlists' => $playlists,
    ]);
  }
}
