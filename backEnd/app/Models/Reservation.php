<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'invitado_id',
        'gift_id',
        'quantity'
    ];

    public function invitado()
    {
        return $this->belongsTo(Invitado::class, 'invitado_id');
    }

    public function gift()
    {
        return $this->belongsTo(Gift::class);
    }
}
