<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Njasm\Soundcloud\Soundcloud;
use Njasm\Soundcloud\SoundcloudFacade;

class SoundcloudRepository extends Soundcloud
{
  /**
   * The Soundcloud instance.
   */
  protected $soundcloud;

  /**
   * Pass Soundcloud API details up.
   */
  public function __construct(SoundcloudFacade $soundcloud) {
    parent::__construct(env('SOUNDCLOUD_CLIENT_ID'), env('SOUNDCLOUD_CLIENT_SECRET'), env('SOUNDCLOUD_CALLBACK_URL'));
    $this->soundcloud = $soundcloud;
  }

  /**
   * Get user object.
   */
  public function me($access_token) {
    $this->get('/me', ['oauth_token' => $access_token]);
    return $this->request()->bodyObject();
  }

  /**
   * Get user playlists.
   * @param  integer $user_id      user id for which to fetch playlists.
   * @param  string $access_token  authentication access_token.
   */
  public function playlists($user_id, $access_token) {
    $this->get("/playlists/$user_id", ['oauth_token' => $access_token]);
    return $this->request()->bodyObject();
  }

  /**
   * Get user liked music.
   * @param  integer $user_id      user id for which to fetch playlists.
   * @param  string $access_token  authentication access_token.
   */
  public function favorites($user_id, $access_token) {
    $this->get("/users/$user_id/favorites", [
      'oauth_token' => $access_token,
      'q' => [
        'streamable' => 1,
      ],
    ]);
    return $this->request()->bodyObject();
  }

  /**
   * Return login/logout link and corresponding image.
   */
  public function getAuthLinks(Request $request) {
    $soundcloud_link = url('/logout/soundcloud');
    $soundcloud_img = asset('img/btn-disconnect-s.png');

    // Show login link instead of logout.
    if (!$request->session()->has('services.soundcloud')) {
      $soundcloud_link = $this->soundcloud->getAuthUrl();
      $soundcloud_img = asset('img/btn-connect-s.png');
    }

    return [
      'link' => $soundcloud_link,
      'image' => $soundcloud_img,
    ];
  }
}
