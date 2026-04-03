<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Listar categorías
    public function index()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    // Crear categoría
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category = Category::create($request->only(['name', 'description']));

        return response()->json([
            'mensaje' => 'Categoría creada correctamente',
            'category' => $category
        ], 201);
    }

    // Mostrar categoría específica
    public function show(Category $category)
    {
        return response()->json($category);
    }

    // Actualizar categoría
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category->update($request->only(['name', 'description']));

        return response()->json([
            'mensaje' => 'Categoría actualizada correctamente',
            'category' => $category
        ]);
    }

    // Eliminar categoría
    public function destroy(Category $category)
    {
        // Verificar si tiene regalos asociados
        if ($category->gifts()->count() > 0) {
            return response()->json([
                'mensaje' => 'No se puede eliminar la categoría porque tiene regalos asociados'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'mensaje' => 'Categoría eliminada correctamente'
        ]);
    }
}
