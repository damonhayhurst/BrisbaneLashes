<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'events';
    protected $fillable = array('start_time', 'end_time', 'price', 'final_price', 'notes', 'client_id', 'all_day', 'class_name');
}
