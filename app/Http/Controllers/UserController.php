<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // Show all users
    public function index()
    {
        $users = User::all(); // pagination later!!
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    // Show Form 
    public function create ()
    {
        return Inertia::render('Users/Create');
    }

    // Store new user
    public function store(Request $request) 
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|min:8',
            'role' => 'required|in:admin,manager,parent',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role
        ]);

        return redirect()->route('users.index');
    }

    // Show edit form
    public function edit (User $user) 
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }
    
    // Update user
    public function update(Request $request, User $user)
    {
        $request-> validate([
            'name' => 'required|string|max:100',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
                ],
                'role' => 'required|in:admin,manager,parent' ,
                'password' => 'nullable|min:6',
        ]);

        $user->update([
            'name' => $request->name,
            'email'=> $request->email,
            'role' => $request->role,
        ]);

        if ($request->password) 
        {
            $user->update(['password' => Hash::make($request->password)]);
        };
        
        return redirect()->route('users.index');
    }

    // Delete User
    public function destroy (User $user)
    {
        $user->destroy();
        return redirect()->route(users.index);
    }
}
