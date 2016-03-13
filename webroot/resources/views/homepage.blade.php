
@extends('layouts.app')

@section('content')
  <ul id="playlist"></ul>
@endsection

@section('header')

  @if (count($services) > 0)
    <!-- Services links -->
    <div class="services">
      <ul>
        @foreach ($services as $name => $service)
          <li class="{{ $name }}"><a href="{{ $service['link'] }}"><i class="{{ $service['icon'] }}" title="{{ $name }}" /></i></li>
        @endforeach
      </ul>
    </div>
    <!-- Endof Services link -->
  @endif

@endsection
