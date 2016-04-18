<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Auth;

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
   * Listen on delete event. When Playlist model is deleted, delete all
   * associated songs.
   */
  public static function boot() {
    parent::boot();

    static::deleted(function($playlist) {
      // Get song ids.
      $song_ids = $playlist->songs->pluck('id')->toArray();

      if (!empty($song_ids)) {
        Song::destroy($song_ids);
      }
    });
  }
  /**
   * Get all user songs in a playlist.
   */
  public function songs() {
    return $this->hasMany(Song::class);
  }

  public function service() {
    return $this->hasOne(Service::class, 'id', 'service_id');
  }

  public function user() {
    return $this->belongsTo(User::class, 'id', 'user_id');
  }

  /**
   * Get playlist.
   */
  public static function getPlaylist($playlist_name, $service_name) {
    return Playlist::with(['songs'])
      ->select('playlists.*')
      ->join('users', 'users.id', '=', 'playlists.user_id')
      ->join('services', 'services.id', '=', 'playlists.service_id')
      ->where([
        ['users.id', Auth::user()->getAuthIdentifier()],
        ['services.name', $service_name],
        ['playlists.name', $playlist_name]
      ])->first();
  }

  /**
   * Delete playlists
   */
  public static function deletePlaylist($playlist_names, $service_id) {
    $playlists = Playlist::whereNotIn('name', $playlist_names)
      ->where('service_id', $service_id)
      ->get();

    foreach ($playlists as $playlist) {
      $playlist->delete();
    }
  }
}
