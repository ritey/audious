<?php

namespace App;

use Njasm\Soundcloud\Soundcloud;

class SoundcloudRepository extends Soundcloud
{

    /**
     * Get user object.
     */
    public function me($access_token) {
      return $this->get('/me', ['oauth_token' => $access_token]);
    }
}
