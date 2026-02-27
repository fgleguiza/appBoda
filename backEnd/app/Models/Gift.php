<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gift extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'image',
        'type',
        'max_quantity',
        'reserved_quantity'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/' . $this->image)
            : null;
    }


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function getAvailableQuantityAttribute()
    {
        return $this->max_quantity - $this->reserved_quantity;
    }
}
