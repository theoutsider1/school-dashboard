<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
            'email' => 'required|email|unique:user,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,manager,parent',
        ]);

        User::create([
            'name' => $required->name,
            'email' => $required->email,
            'password' => $required->Hash::make($request->password),
            'role' => $required->role
        ]);

        return redirect()->route('users.index');
    }

    // Show edit form
    public function edit (User $user) 
    {
        return Inertia::render('Users/Edit', [
            'User' => $user
        ]);
    }
    
    // Update user
    public function update(Request $request, User $user)
    {
        $request-> validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:user,email,{$user->id}',
            'role' => 'required|in:admin,manager,parent'
        ]);

        $user->update([
            'name' => $request->name,
            'email'=> $request->name,
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
