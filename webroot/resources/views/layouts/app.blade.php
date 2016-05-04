<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">
    <meta name="soundcloud_client_id" content="{{ $client_id }} ">
    <meta name="soundcloud_redirect_uri" content="{{ $redirect_uri }} ">
    <title>Audious</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
  </head>
  <body>

  <!-- App container -->
    <div id="app">

      <!-- Header -->
      <header>
        <ul class="user-auth-links">
          @if (Auth::guest())
            <li><a href="{{ url('/login') }}">Login</a></li>
            <li><a href="{{ url('/register') }}">Register</a></li>
          @else
            <li>Welcome, {{ Auth::user()->name }} (<a href="{{ url('/logout') }}">Logout</a>)</li>
          @endif
        </ul>

        @if (!Auth::guest())
            <ul id="sync">
                <li class="label">Sync with: </li>
                @foreach ($services as $name => $service)
                  <li class="sync-service" data-service-title="{{ $name }}"><a href="{{ $service['link'] }}"><i class="{{ $service['icon'] }}" data-icon-replace="{{ $service['icon_replacement'] }}" title="{{ $name }}" /></i></a></li>
                @endforeach
            </ul>
        @endif

        @yield('header')
      </header>
      <!-- End of Header -->

      <!-- Left Sidebar -->
      <aside id="left-sidebar" class="sidebar left">
        @yield('left-sidebar')
      </aside>
        <!-- Endof Left Sidebar -->

      <!-- Main Content -->
      <main class="container" id="tracklist">
        @yield('content')
      </main>
      <!-- Endof Main Content -->

      <!-- Player -->
      @include('partials.player')
      <!-- Endof Player -->

    </div>
    <!-- App container -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
    <script src="http://underscorejs.org/underscore-min.js" type="text/javascript"></script>
    <script src="http://backbonejs.org/backbone-min.js" type="text/javascript"></script>
    <script src="http://marionettejs.com/downloads/backbone.marionette.min.js" type="text/javascript"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min.js" type="text/javascript"></script>-->
    <script src="{{ elixir('js/main.js') }}" type="text/javascript"></script>
  </body>
</html>
