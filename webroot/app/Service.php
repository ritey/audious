<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['name'];

  /**
   * Get all user playlists for the service.
   */
  public function playlists() {
    return $this->hasMany(Playlist::class);
  }

  public function user() {
    return $this->belongsTo(User::class);
  }
}
