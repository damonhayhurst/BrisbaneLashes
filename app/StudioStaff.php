<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class StudioStaff extends Authenticatable
{
    protected $primaryKey = 'id';
    protected $table = 'studio_staff';
    protected $fillable = array('first_name', 'last_name', 'email', 'password');
    protected $hidden = array('password', 'remember_token');
    
    public function studio() {
        return $this->belongsTo('App\Studio');
    }
}
