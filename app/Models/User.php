<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', 
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    
    //----------Relationships----------
    // Parents can have many students
    public function children ()
    {
        return $this->hasMany(Student::class, 'parent_id');
    } 

    // If user is admin/administrator, can create classes
    public function managedClasses ()
    {
        return $this->hasMany(Classe::class, 'managed_id');
    }

    // Admin role for classes
    public function adminClasse ()
    {
        return $this->hasMany(Classe::class, 'admin_id');
    }
    
    // ---------- Helper Functions----------

    Public function isAdmin ()
    {
        return $this->role === 'admin';
    }

    public function isManager () 
    {
        return $this->role === 'manager';
    }

    public function isParent () 
    {
        return $this->role === 'parent';
    }
}
