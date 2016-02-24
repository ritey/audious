<section class="playlist">
  <ul>
  @foreach ($services['soundcloud']['music']['favorites'] as $track)
    <li data-track-id="{{ $track->id }}">
      <img data-src="{{ $track->artwork_url }}" />
      <div class="container">
        <h4>{{ $track->title }}</h4>
      </div>
    </li>
  @endforeach
  </ul>
</section>
