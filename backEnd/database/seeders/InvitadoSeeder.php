<?php

namespace Database\Seeders;

use App\Models\Invitado;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InvitadoSeeder extends Seeder
{
    public function run(): void
    {
        Invitado::firstOrCreate(
            ['email_invitado' => 'fgleguiza2001@gmail.com'],
            [
                'nombre_invitado' => 'Facundo leguiza',
                'role' => 'novio',
                'token' => Str::random(40)
            ]
        );

        Invitado::updateOrCreate(
            ['email_invitado' => 'aldana@gmail.com'],
            [
                'nombre_invitado' => 'Aldana pinieiro',
                'role' => 'novio',
                'token' => Str::random(40)
            ]
        );
    }
}
