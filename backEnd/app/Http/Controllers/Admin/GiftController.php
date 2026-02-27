<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gift;
use Illuminate\Http\Request;
use App\Services\GiftService;


class GiftController extends Controller
{
    // listar regalos
    public function getGifts()
    {
        $gifts = Gift::with('category')->get();

        return response()->json($gifts);
    }


    public function createGifts(Request $request, GiftService $service)
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
}
