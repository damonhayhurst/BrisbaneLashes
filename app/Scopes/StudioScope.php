<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\JWTAuthUser;
use Illuminate\Http\Request;

class StudioScope implements Scope {
    
    use JWTAuthUser;
    
    public function apply(Builder $builder, Model $model) {
        $studioId = $this->getAuthUser(request())->studio_id;
        $builder->where('studio_id', $studioId);
    }
}