<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppointmentRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointment_requests', function (Blueprint $table) {
            $table->increments('id')->unsigned()->index();
            $table->integer('employee_assigned_id')->unsigned()->nullable();
            $table->integer('client_id')->unsigned()->nullable();
            $table->integer('studio_id')->unsigned();
            $table->dateTime('start');
            $table->dateTime('end');
            $table->decimal('price', 6, 2)->nullable();
            $table->status('status')
            $table->string('notes')->nullable();
            
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
        Schema::dropIfExists('appointment_requests');
    }
}
