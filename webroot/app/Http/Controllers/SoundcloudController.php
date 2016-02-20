<?php
//https://developers.soundcloud.com/docs/api/reference#me
//https://developers.soundcloud.com/docs/api/guide
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Njasm\Soundcloud\SoundcloudFacade;
use App\Repositories\SoundcloudRepository;

class SoundcloudController extends Controller
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
   * Create a controller instance.
   *
   * @param  SoundcloudFacade  $soundcloud
   * @return void
   */
  public function __construct(SoundcloudFacade $soundcloud, SoundcloudRepository $soundcloudRepository)
  {
    $this->soundcloud = $soundcloud;
    $this->soundcloudRepository = $soundcloudRepository;
  }

  /**
   * Get access_token from Soundcloud.
   * @param  string $code Soundcloud auth code.
   * @return string       access_token
   */
  private function getAccessToken($code)
  {
    $response = $this->soundcloud->codeForToken($code);

    // Check if we got 200 response code
    if ($response->getHttpCode() != "200")
    {
      return false;
    }

    // Extract access_token.
    return $response->bodyObject()->access_token;
  }

  private function saveSession(Request $request, $access_token)
  {
    $data = [
      'soundcloud' => [
        'access_token' => $access_token,
      ],
    ];

    // If first login.
    if (!$request->session()->has('services'))
    {
      $request->session()->put('services', $data);
    }
    else
    {
      // If not first service login, i.e. already logged in via youtube,
      // Append services session.
      $request->session()->push('services', $data);
    }
  }

  /**
   * Soundcloud login callback.
   */
  public function login(Request $request)
  {
    print_r($this->soundcloudRepository);die;
    // Check if we have code query.
    if (!$request->has('code'))
    {
      // If not, redirect to homepage.
      return redirect('/');
    }

    // Extract returned code.
    $code = $request->code;
    // Get access_token from code.
    $access_token = $this->getAccessToken($code);

    // Redirect to homepage if couldn't get access_token.
    if (!$access_token)
    {
      return redirect('/');
    }

    $this->saveSession($request, $access_token);

    return redirect('/');
  }
}
