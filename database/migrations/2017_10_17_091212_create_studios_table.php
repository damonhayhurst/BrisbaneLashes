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
        Schema::create('studios', function (Blueprint $table) {
            $table->increments('id')->unsigned()->index();
            $table->string('name', 50);
            $table->string('abn', 11);
            $table->string('entity')->nullable();
            $table->string('tn')->nullable();
            $table->string('addr_1');
            $table->string('addr_2')->nullable();
            $table->string('suburb');
            $table->string('pcode', 4);
            $table->string('state', 50);
            $table->string('phone', 20);
            $table->string('fax', 20)->nullable();
            $table->string('email', 50);
            $table->binary('logo')->nullable();
            $table->string('status')->nullable();
            $table->string('pmt_cycle')->nullable();
            $table->string('pmt_type')->nullable();
            $table->string('start_date')->nullable();
            $table->boolean('sms_notify')->default(true);
            $table->boolean('email_notify')->default(true);
            $table->string('smtp_server')->nullable();
            $table->string('smtp_user')->nullable();
            $table->string('smtp_pass')->nullable();
            $table->string('smtp_from')->nullable();
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
        Schema::dropIfExists('studios');
    }
}
