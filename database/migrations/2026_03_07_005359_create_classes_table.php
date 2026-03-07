<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // Manager who created the class (nullable)
            $table->foreignId('manager_id')->nullable()->constrained('users')->nullOnDelete();
            // Store the manager name for historical reference
            $table->string('created_by');
            // Admin always involved (cannot be null)
            $table->foreignId('admin_id')->constrained('users')->cascadeOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
