
@extends('layouts.app')

@section('content')

<p>Homepage</p>

@endsection

@section('header')
  @if (count($services) > 0)
    <!-- Services links -->
    <div class="services">
      <ul>
        @foreach ($services as $name => $service)
          <li class="{{ $name }}"><a href="{{ $service['link'] }}"><img src="{{ $service['image'] }}" title="{{ $name }}" /></a></li>
        @endforeach
      </ul>
    </div> <!-- Endof Services link -->
  @endif
@endsection
