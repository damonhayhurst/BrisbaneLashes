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
            $table->string('studio_name');
            $table->string('studio_abn');
            //studio_entity
            //studio_tn
            $table->string('studio_addr_1');
            $table->string('studio_addr_2');
            $table->string('studio_suburb');
            $table->string('studio_pcode', 10);
            $table->string('studio_state', 50);
            $table->string('studio_phone', 20);
            $table->string('studio_fax', 20);
            $table->string('studio_email', 50);
            $table->binary('studio_logo');
            $table->string('studio_status');
            //studio_pmt_cycle
            //studio_pmt_type
            //studio_start_date
            $table->boolean('studio_sms_notify');
            $table->boolean('studio_email_notify');
            //studio_smtp_server
            //studio_smtp_user
            //studio_smtp_pass
            //studio_smtp_from
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
