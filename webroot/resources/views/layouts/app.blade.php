<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Audious</title>
    <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
  </head>
  <body>

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

    <!-- Footer -->
    <footer>
      <p>{{ date('Y') }}</p>
    </footer>
    <!-- Endof Footer -->
  </body>
</html>
