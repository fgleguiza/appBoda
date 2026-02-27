<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    // Listar categorías
    public function getCategories()
    {
        $categories = Category::all();

        return response()->json($categories);
    }
}
