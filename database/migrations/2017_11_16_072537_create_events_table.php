<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id')->unsigned()->index();
            $table->integer('employee_created_id')->unsigned();
            $table->integer('employee_assigned_id')->unsigned();
            $table->integer('client_id')->unsigned()->nullable();
            $table->integer('studio_id')->unsigned();
            $table->boolean('all_day');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->decimal('price', 6, 2);
            $table->decimal('final_price', 6, 2)->nullable();
            $table->string('notes')->nullable();
            $table->string('category');
            
            $table->foreign('employee_created_id')->references('id')->on('studio_staff');
            $table->foreign('employee_assigned_id')->references('id')->on('studio_staff');
            $table->foreign('client_id')->references('id')->on('customers');
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
        Schema::dropIfExists('events');
    }
}
