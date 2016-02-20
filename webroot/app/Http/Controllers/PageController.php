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
    //print_r($request->session()->get('services.soundcloud.access_token'));die;
    //print_r($this->soundcloud->get('/me', ['oauth_token' => 'services.soundcloud.access_token']));die;
    return view('homepage', [
      'services' => [
        'soundcloud' => [
          'link' => $this->soundcloud->getAuthUrl(),
          'image' => asset('img/btn-connect-s.png'),
        ],
      ],
    ]);
  }
}
