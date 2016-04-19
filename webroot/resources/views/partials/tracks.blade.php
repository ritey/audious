<!-- Partial for tracks list in main section -->

@if (count($playlists) > 0)
  @foreach ($playlists as $service => $service_playlists)

    <div class="{{$service}} tracklist" data-service="{{$service}}">
      @foreach ($service_playlists as $playlist)
        <ul class="{{ $playlist->name }}">
          @foreach ($playlist->songs as $song)
            <li class="">{{$song->title}}</li>
          @endforeach
        </ul>
      @endforeach
    </div>
  @endforeach
@endif
