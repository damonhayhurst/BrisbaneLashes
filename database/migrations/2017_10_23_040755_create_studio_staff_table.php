<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudioStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studio_staff', function (Blueprint $table) {
            $table->increments('id')->index();
            $table->string('first_name');
            $table->string('last_name');
            $table->integer('studio_id')->unsigned();
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->rememberToken();
            
            $table->foreign('studio_id')->references('id')->on('studios');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('studio_staff');
    }
}
