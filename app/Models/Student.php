<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    // Parent relationship
    public function parent ()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    // Class relationship
    public function classe ()
    {
        return $this->belongsTo(Classe::class, 'class_id');
    }
}
