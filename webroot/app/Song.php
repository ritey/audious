<?php

namespace App;

//use Session;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'title',
    'song_identifier',
    'image',
    'url',
    'song_created',
    'service_id'
  ];

  public function playlist() {
    return $this->belongsTo(Playlist::class);
  }
}
