<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Classe; 

class ClasseController extends Controller
{
    //Show All Classes
    public function index () 
    {
        $classes = Classe::all(); // pagination later
        return Inertia::render('Classes/Index', [
            'classes' => $classes
        ]);
    }

    public function create () 
    {
        return Inertia::render('Classes/Create');
    }

    
}
