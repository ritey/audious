<?php

use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
      $db = DB::table('services')->insert([
        ['name' => 'Soundcloud'],
        ['name' => 'Youtube'],
        ['name' => 'Spotify']
      ]);
    }
}
