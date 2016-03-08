<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Njasm\Soundcloud\SoundcloudFacade;
use App\Repositories\SoundcloudRepository;
use App\Repositories\GoogleRepository;
use App\Song;

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
   * Create a controller instance.
   *
   * @param  SoundcloudFacade  $soundcloud
   * @return void
   */
  public function __construct(SoundcloudFacade $soundcloud, SoundcloudRepository $soundcloudRepository, GoogleRepository $googleRepository) {
    $this->soundcloud = $soundcloud;
    $this->soundcloudRepository = $soundcloudRepository;
    $this->googleRepository = $googleRepository;
  }

  /**
   * Homepage
   */
  public function index(Request $request) {
    $this->googleRepository->getPlaylists($request);

    return view('homepage', [
      'client_id' => env('SOUNDCLOUD_CLIENT_ID'),
      'redirect_uri' => env('SOUNDCLOUD_CALLBACK_URL'),
      'services' => [
        'soundcloud' => $this->soundcloudRepository->getAuthLinks($request),
        'google' => $this->googleRepository->getAuthLinks($request),
      ]
    ]);
  }
}
