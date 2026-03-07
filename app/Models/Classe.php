<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'namae',
        'manager_id',
        'created_by',
        'admin_id'
    ];
    // Auto-fill created_by when creating a class
    protected static function booted() 
    {
        static::creating(function ($classe){

            $user = Auth::user();
             // Always set admin
            $classe->admin_id = $user->role === 'admin'
                ? $user->id
                : $user->admin_id;
              // If a manager is assigned
            if ($classe->manager_id) {
                $manager = User::find($classe->manager_id);
                $classe->created_by = $manager ? $manager->name : null;
            } 
            // If no manager -> admin created it
            else {
                $classe->created_by = $classe->admin_id;
            }
        });
    }
    //Relations
    
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function students ()
    {
        return $this-hasMany(Student::class, 'class_id');
    }


}
