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

    public function update(Gift $gift, array $data, $image = null)
    {
        $oldPath = $gift->image;
        $newPath = null;

        try {
            DB::beginTransaction();

            if ($image) {
                $newPath = $image->store('gifts', 'public');
                $data['image'] = $newPath;
            }

            $gift->update($data);

            DB::commit();

            // Si se cambió la imagen, borramos la anterior
            if ($newPath && $oldPath && $oldPath !== $newPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }

            return $gift->fresh();
        } catch (\Exception $e) {
            DB::rollBack();

            // Si se guardó la nueva imagen pero falló la BD → la borramos
            if ($newPath && Storage::disk('public')->exists($newPath)) {
                Storage::disk('public')->delete($newPath);
            }

            throw $e;
        }
    }
}
