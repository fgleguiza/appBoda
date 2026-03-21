<?php

namespace App\Helpers;

use App\Enums\HttpsCodeEnum;

class ResponseHelper
{
    public static function response(HttpsCodeEnum $code, $message = null,  $data = null, $errors = null)
    {
        return response()->json([
            'code' => $code->http(),
            'message' => $message,
            'data' => $data,
            'errors' => $errors
        ], $code->http());
    }
}
