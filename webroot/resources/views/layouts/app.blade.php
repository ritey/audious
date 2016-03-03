<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="client_id" content="{{ $client_id }}">
    <meta name="redirect_uri" content="{{ $redirect_uri }}">
    <title>Audious</title>
    <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
    <script>
      var data = {!! json_encode($js_config) !!};
    </script>
  </head>
  <body>

  <!-- App container -->
    <div id="app">

      <!-- Header -->
      <header>
        @yield('header')
      </header>
      <!-- End of Header -->

      <!-- Main Content -->
      <main class="container">
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min.js" type="text/javascript"></script>
    <script src="{{ elixir('js/main.js') }}" type="text/javascript"></script>
  </body>
</html>
