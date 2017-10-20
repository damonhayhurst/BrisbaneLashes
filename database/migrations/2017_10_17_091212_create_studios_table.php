<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studio_details', function (Blueprint $table) {
            $table->increments('studio_ID');
            $table->string('studio_name', 50);
            $table->string('studio_abn', 12);
            $table->string('studio_entity')->nullable();
            $table->string('studio_tn')->nullable();
            $table->string('studio_addr_1');
            $table->string('studio_addr_2');
            $table->string('studio_suburb');
            $table->string('studio_pcode', 10);
            $table->string('studio_state', 50);
            $table->string('studio_phone', 20);
            $table->string('studio_fax', 20)->nullable();
            $table->string('studio_email', 50);
            $table->binary('studio_logo')->nullable();
            $table->string('studio_status')->nullable();
            $table->string('studio_pmt_cycle')->nullable();
            $table->string('studio_pmt_type')->nullable();
            $table->string('studio_start_date')->nullable();
            $table->boolean('studio_sms_notify')->default(true);
            $table->boolean('studio_email_notify')->default(true);
            $table->string('studio_smtp_server')->nullable();
            $table->string('studio_smtp_user')->nullable();
            $table->string('studio_smtp_pass')->nullable();
            $table->string('studio_smtp_from')->nullable();
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
        Schema::dropIfExists('studio_details');
    }
}
