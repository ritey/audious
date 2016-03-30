<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['name', 'service_id'];

  /**
   * Indicates if the model should be timestamped.
   */
  public $timestamps = false;

  /**
   * Get all user songs in a playlist.
   */
  public function song() {
    return $this->hasMany(Song::class);
  }

  public function service() {
    return $this->belongsTo(Service::class);
  }
}
