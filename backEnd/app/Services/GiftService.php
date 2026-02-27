<?php

namespace App\Services;

use App\Models\Gift;
use Exception;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class GiftService
{


    public function create(array $data, $image = null)
    {
        $path = null;

        try {

            DB::beginTransaction();

            if ($image) {
                $path = $image->store('gifts', 'public');
                $data['image'] = $path;
            }

            $gift = Gift::create($data);

            DB::commit();

            return $gift;
        } catch (\Exception $e) {

            DB::rollBack();

            // Si se guardó la imagen pero falló la BD → la borramos
            if ($path && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            throw $e;
        }
    }
}
