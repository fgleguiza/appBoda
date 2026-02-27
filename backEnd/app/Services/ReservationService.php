<?php

namespace App\Services;

use App\Models\Gift;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use Exception;

class ReservationService
{
    public function reserve(int $invitado_id, int $giftId): void
    {
        DB::transaction(function () use ($invitado_id, $giftId) {

            $gift = Gift::lockForUpdate()->findOrFail($giftId);

            if ($gift->reserved_quantity >= $gift->max_quantity) {
                throw new Exception('Este regalo ya no está disponible.');
            }

            $alreadyReserved = Reservation::where('invitado_id', $invitado_id)
                ->where('gift_id', $giftId)
                ->exists();

            if ($alreadyReserved) {
                throw new Exception('Ya reservaste este regalo.');
            }

            Reservation::create([
                'invitado_id' => $invitado_id,
                'gift_id'  => $giftId,
            ]);

            $gift->increment('reserved_quantity');
        });
    }
}
