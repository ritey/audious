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

  // Login routes.
  Route::group(['prefix' => 'login'], function() {
    // Soundcloud login route.
    Route::get('soundcloud', 'SoundcloudController@login');
  });
  // Logout routes.
  Route::group(['prefix' => 'logout'], function() {
    // Soundcloud login route.
    Route::get('soundcloud', 'SoundcloudController@logout');
  });

  // API Callbacks for BackboneJS.
  Route::group(['prefix' => 'api'], function () {
    // Return all songs.
    Route::get('songs', 'ApiController@index');
  });
});
