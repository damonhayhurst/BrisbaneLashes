<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Studio extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'studios';
    protected $fillable = array('name', 'abn', 'addr_1', 'addr_2', 'suburb', 'pcode', 'state', 'phone', 'fax', 'email', 'logo', 'status', 'email_notify', 'sms_notify');
}
