<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMasterStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('master_staff', function (Blueprint $table) {
            $table->increments('id')->unsigned()->index();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('abn', 11)->nullable();
            $table->string('addr_1')->nullable();
            $table->string('addr_2')->nullable();
            $table->string('suburb')->nullable();
            $table->string('pcode')->nullable();
            $table->string('state')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('master_staff');
    }
}
