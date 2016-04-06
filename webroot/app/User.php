<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name', 'email', 'password',
  ];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [
      'password', 'remember_token',
  ];

  public function playlists() {
      return $this->hasMany(Playlist::class);
  }

  public function services() {
      return $this->hasMany(Service::class);
  }


  public function getPlaylist($playlist) {
    print_r($this->playlists()->get());die;
    $res = $this->playlists()
      ->with('services')
      ->get();
    print_r($res);die;
  }
}
