
@extends('layouts.app')

@section('left-sidebar')
  @include('partials.playlists')
@endsection

@section('content')
  @include('partials.tracks')
@endsection

