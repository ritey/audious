<!-- Partial for tracks list in main section -->

@if (count($playlists) > 0)
  @foreach ($playlists as $service => $service_playlists)

    <div class="{{$service}} playlists" data-service="{{$service}}">
      @foreach ($service_playlists as $playlist)
        <ul class="playlist" data-playlist="{{ $playlist->name }}">
          @foreach ($playlist->songs as $song)
            <li class="song" data-identifier="{{ $song->song_identifier }}" data-id="{{ $song->id }}">{{$song->title}}</li>
          @endforeach
          <li class="playlist-footer">{{ $playlist->name }}</li>
        </ul>
      @endforeach
    </div>
  @endforeach
@endif
