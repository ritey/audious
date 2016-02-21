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
}
