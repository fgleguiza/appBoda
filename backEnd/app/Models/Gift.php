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

    protected $appends = ['image_url', 'available_quantity'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        
        $apiUrl = config('app.url', 'http://localhost:8000');
        return $apiUrl . '/api/storage/' . $this->image;
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
