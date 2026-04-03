<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gift;
use Illuminate\Http\Request;
use App\Services\GiftService;


class GiftController extends Controller
{
    // Listar regalos
    public function index()
    {
        $gifts = Gift::with('category')->get();

        return response()->json($gifts);
    }

    // Crear regalo
    public function store(Request $request, GiftService $service)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'type' => 'required|in:basic,special',
            'max_quantity' => 'required|integer|min:1',
            'image' => 'nullable|image|max:2048'
        ]);

        $imagen = $request->file('image');
        $gift = $service->create($validated, $imagen);

        return response()->json($gift, 201);
    }

    // Mostrar regalo específico
    public function show(Gift $gift)
    {
        $gift->load('category');

        return response()->json($gift);
    }

    // Actualizar regalo
    public function update(Request $request, Gift $gift, GiftService $service)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'type' => 'required|in:basic,special',
            'max_quantity' => 'required|integer|min:1',
            'image' => 'nullable|image|max:2048'
        ]);

        $imagen = $request->file('image');
        $updatedGift = $service->update($gift, $validated, $imagen);

        return response()->json($updatedGift);
    }

    // Eliminar regalo
    public function destroy(Gift $gift)
    {
        // Verificar si tiene reservaciones
        if ($gift->reservations()->count() > 0) {
            return response()->json([
                'mensaje' => 'No se puede eliminar el regalo porque tiene reservaciones asociadas'
            ], 400);
        }

        $gift->delete();

        return response()->json([
            'mensaje' => 'Regalo eliminado correctamente'
        ]);
    }

    // Alias para mantener compatibilidad
    public function getGifts()
    {
        return $this->index();
    }

    public function createGifts(Request $request, GiftService $service)
    {
        return $this->store($request, $service);
    }
}
