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

  /**
   * Get user's playlists.
   * @param  String $service_name Service name i.e. Soundcloud
   * @return Collection of playlists with songs attached.
   */
  public function getPlaylists($service_name) {
    // Get Service object to parse id later.
    $service = Service::where('name', $service_name)->first();
    // Get playlists and songs.
    return $this->playlists()->with('songs')->where('service_id', $service->id)->get();
  }
}
