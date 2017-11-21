<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'customers';
    protected $fillable = array('first_name', 'last_name', 'addr_1', 'addr_2', 'suburb', 'pcode', 'state', 'phone', 'fax', 'email', 'password', 'profile_image', 'notes', 'status', 'email_notify', 'sms_notify');
}
