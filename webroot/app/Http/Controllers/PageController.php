<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Njasm\Soundcloud\SoundcloudFacade;

class PageController extends Controller
{
  /**
   * The Soundcloud instance.
   */
  protected $soundcloud;


  /**
   * Create a controller instance.
   *
   * @param  SoundcloudFacade  $soundcloud
   * @return void
   */
  public function __construct(SoundcloudFacade $soundcloud)
  {
      $this->soundcloud = $soundcloud;
  }
  /**
   * Homepage
   */
  public function index(Request $request)
  {
    $soundcloud_link = url('/logout/soundcloud');
    $soundcloud_img = asset('img/btn-disconnect-s.png');
    // Show login link instead of logout.
    if (!$request->session()->has('services.soundcloud')) {
      $soundcloud_link = $this->soundcloud->getAuthUrl();
      $soundcloud_img = asset('img/btn-connect-s.png');
    }

    return view('homepage', [
      'services' => [
        'soundcloud' => [
          'link' => $soundcloud_link,
          'image' => $soundcloud_img,
        ],
      ],
    ]);
  }
}
