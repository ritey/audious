<?php

namespace App\Repositories;

use Njasm\Soundcloud\Soundcloud;

class SoundcloudRepository extends Soundcloud
{
  /**
   * Pass Soundcloud API details up.
   */
  public function __construct()
  {
    parent::__construct(env('SOUNDCLOUD_CLIENT_ID'), env('SOUNDCLOUD_CLIENT_SECRET'), env('SOUNDCLOUD_CALLBACK_URL'));
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
  public function playlists($user_id, $access_token)
  {
    $this->get("/playlists/$user_id", ['oauth_token' => $access_token]);
    return $this->request()->bodyObject();
  }

  /**
   * Get user liked music.
   * @param  integer $user_id      user id for which to fetch playlists.
   * @param  string $access_token  authentication access_token.
   */
  public function favorites($user_id, $access_token)
  {
    $this->get("/users/$user_id/favorites", [
      'oauth_token' => $access_token,
      'q' => [
        'streamable' => 1,
      ],
    ]);
    return $this->request()->bodyObject();
  }
}
