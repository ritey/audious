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

  /*public function services() {
      return $this->hasMany(Service::class);
  }*/


  public function getPlaylist($playlist, $service_name) {
    // Generic:
    return User::with(['playlists.songs', 'playlists.service'])
      ->join('playlists', 'playlists.user_id', '=', 'users.id')
      ->join('services', 'services.id', '=', 'playlists.service_id')
      ->where('services.name', '=', $service_name)->get();
  }
}
