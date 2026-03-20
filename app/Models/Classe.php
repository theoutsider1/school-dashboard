<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Support\Facades\Auth;
use App\Models\User; 
use App\Models\Student; 
class Classe extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
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

                $adminName = User::find($classe->admin_id)?->name ?? $user->name;

              // If a manager is assigned
            if ($classe->manager_id) {
                $manager = User::find($classe->manager_id);

                // Prefer manager’s name; if missing, fall back to admin name
                $classe->created_by = $manager?->name ?? $adminName;
            } 
            // If no manager -> admin created it
            else {
                $classe->created_by = $adminName;
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
        return $this->hasMany(Student::class, 'class_id');
    }


}
