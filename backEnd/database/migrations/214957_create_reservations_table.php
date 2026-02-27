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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('invitado_id')
                ->constrained('invitados')
                ->cascadeOnDelete();

            $table->foreignId('gift_id')
                ->constrained('gifts')
                ->cascadeOnDelete();

            $table->timestamps();

            $table->unique(['invitado_id', 'gift_id']); // 🔥 evita repetidos
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
