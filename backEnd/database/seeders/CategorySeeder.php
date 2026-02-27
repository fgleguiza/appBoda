<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{

    public function run(): void
    {
        Category::updateOrCreate(
            ['name' => 'Hogar'],
            ['description' => 'Regalos para el hogar']
        );

        Category::updateOrCreate(
            ['name' => 'Luna de Miel'],
            ['description' => 'Experiencias para nuestro viaje']
        );
    }
}
