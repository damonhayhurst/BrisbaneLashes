<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Studio extends Model
{
    protected $primaryKey = 'studio_ID';
    protected $table = 'studio_details';
    protected $fillable = array('studio_ID', 'studio_name', 'studio_abn', 'studio_addr_1', 'studio_addr_2', 'studio_suburb', 'studio_pcode', 'studio_state', 'studio_phone', 'studio_fax', 'studio_email', 'studio_logo', 'studio_status', 'studio_email_notify', 'studio_sms_notify');
}
