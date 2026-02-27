<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Gift;

class GiftSeeder extends Seeder
{
    public function run(): void
    {
        $hogar = Category::where('name', 'Hogar')->first();
        $lunaMiel = Category::where('name', 'Luna de Miel')->first();

        if (!$hogar || !$lunaMiel) {
            return;
        }

        $gifts = [
            [
                'name' => 'Juego de platos',
                'category_id' => $hogar->id,
                'description' => 'Set completo para 6 personas',
                'image' => null,
                'type' => 'basic',
                'max_quantity' => 5,
            ],
            [
                'name' => 'Licuadora',
                'category_id' => $hogar->id,
                'description' => 'Licuadora profesional',
                'image' => null,
                'type' => 'special',
                'max_quantity' => 1, // 👈 importante
            ],
            [
                'name' => 'Excursión en barco',
                'category_id' => $lunaMiel->id,
                'description' => 'Paseo romántico al atardecer',
                'image' => null,
                'type' => 'special',
                'max_quantity' => 1, // 👈 importante
            ],
            [
                'name' => 'Cena romántica',
                'category_id' => $lunaMiel->id,
                'description' => 'Cena especial en la playa',
                'image' => null,
                'type' => 'basic',
                'max_quantity' => 3,
            ],
        ];

        foreach ($gifts as $gift) {
            Gift::updateOrCreate(
                ['name' => $gift['name']],
                array_merge($gift, [
                    'reserved_quantity' => 0, // 👈 aseguramos contador limpio
                ])
            );
        }
    }
}
