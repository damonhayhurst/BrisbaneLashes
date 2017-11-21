<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id')->unsigned()->index();
            $table->string('first_name', 30);
            $table->string('last_name', 30);
            $table->string('addr_1');
            $table->string('addr_2')->nullable();
            $table->string('suburb', 50);
            $table->string('pcode', 4);
            $table->string('state', 50);
            $table->string('phone', 20);
            $table->string('fax', 20)->nullable();
            $table->string('email', 50);
            $table->string('password', 60);
            $table->binary('profile_image')->nullable();
            $table->string('notes')->nullable();
            $table->string('status')->nullable();
            $table->boolean('sms_notify')->default(true);
            $table->boolean('email_notify')->default(true);
            $table->integer('studio_id')->unsigned();
            
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
        Schema::dropIfExists('customers');
    }
}
