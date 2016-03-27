<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
  // Homepage.
  Route::get('/', 'PageController@index');

  // Authentication Routes...
  Route::auth();

  // Login routes.
  Route::group(['prefix' => 'login'], function() {
    // Soundcloud login route.
    Route::get('soundcloud', 'SoundcloudController@login');
    // Google login route.
    Route::get('google', 'GoogleController@login');
    // Spotify login route.
    Route::get('spotify', 'SpotifyController@login');
  });

  // API Callbacks for BackboneJS.
  Route::group(['prefix' => 'api'], function () {
    // Return all songs.
    Route::get('songs', 'ApiController@index');
    // Sync music.
    Route::get('sync/{service}', 'ApiController@sync');
  });
});
