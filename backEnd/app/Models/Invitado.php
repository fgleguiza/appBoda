<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitado extends Model
{
    protected $fillable = [
        'token',
        'nombre_invitado',
        'email_invitado',
        'role',
        'confirmado',
        'fecha_confirmacion'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($invitado) {
            $invitado->token = Str::random(40);
        });
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
