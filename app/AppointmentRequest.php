<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\JWTAuthUser;
use App\Scopes\StudioScope;

class AppointmentRequest extends Model
{
    use JWTAuthUser;
    
    protected $primaryKey = 'id';
    protected $table = 'appointment_requests';
    protected $fillable = array('start_time', 'end_time', 'price', 'final_price', 'notes', 'client_id', 'class_name');
    
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new StudioScope);
    }
    
    public function scopeUser($query, $request) {
        $userId = $this->getAuthUser($request)->id;
        return $query->where('employee_assigned_id', $userId);
    }
}

