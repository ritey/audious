<!-- Partial for playlists sidebar -->

@if (count($playlists) > 0)
  @foreach ($playlists as $service => $service_playlists)
    <ul class="{{$service}} playlist">
      @foreach ($service_playlists as $playlist)
      <li class="">{{$playlist->name}}</li>
      @endforeach
    </ul>
  @endforeach
@endif
