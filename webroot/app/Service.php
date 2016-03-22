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
   * Indicates if the model should be timestamped.
   *
   * @var bool
   */
  public $timestamps = false;

  /**
   * Get all user playlists for the service.
   */
  public function playlist() {
    return $this->hasMany(Playlist::class);
  }

  public function user() {
    return $this->belongsTo(User::class);
  }
}
