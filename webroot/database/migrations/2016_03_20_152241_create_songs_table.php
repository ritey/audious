<?php
/**
 * Create Songs database table.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('service_id')->index();
            $table->integer('playlist_id')->index();
            $table->string('title');
            $table->string('song_identifier')->index();
            $table->string('url');
            $table->string('image')->nullable();
            $table->date('song_created');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('songs');
    }
}
