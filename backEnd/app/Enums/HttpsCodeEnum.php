<?php

namespace App\Enums;

enum HttpsCodeEnum: string
{
    case SUCCESS = 'SUCCESS';
    case CREATED = 'CREATED';
    case UPDATED = 'UPDATED';
    case DELETED = 'DELETED';

    case VALIDATION_ERROR = 'VALIDATION_ERROR';
    case INVALID_DATA = 'INVALID_DATA';
    case MISSING_PARAMETER = 'MISSING_PARAMETER';

    case UNAUTHORIZED = 'UNAUTHORIZED';
    case TOKEN_INVALID = 'TOKEN_INVALID';
    case TOKEN_EXPIRED = 'TOKEN_EXPIRED';
    case FORBIDDEN = 'FORBIDDEN';

    case NOT_FOUND = 'NOT_FOUND';
    case ALREADY_EXISTS = 'ALREADY_EXISTS';

    case INTERNAL_ERROR = 'INTERNAL_ERROR';
    case DATABASE_ERROR = 'DATABASE_ERROR';
    case SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE';

    public function message(): string
    {
        return match ($this) {
            self::SUCCESS => 'Operación exitosa',
            self::CREATED => 'Recurso creado correctamente',
            self::UPDATED => 'Recurso actualizado',
            self::DELETED => 'Recurso eliminado',

            self::VALIDATION_ERROR => 'Error de validación',
            self::INVALID_DATA => 'Datos inválidos',
            self::MISSING_PARAMETER => 'Falta un parámetro requerido',

            self::UNAUTHORIZED => 'No autenticado',
            self::TOKEN_INVALID => 'Token inválido',
            self::TOKEN_EXPIRED => 'Token expirado',
            self::FORBIDDEN => 'No tiene permisos',

            self::NOT_FOUND => 'Recurso no encontrado',
            self::ALREADY_EXISTS => 'El recurso ya existe',

            self::INTERNAL_ERROR => 'Error interno del servidor',
            self::DATABASE_ERROR => 'Error en la base de datos',
            self::SERVICE_UNAVAILABLE => 'Servicio no disponible',
        };
    }

    public function http(): int
    {
        return match ($this) {
            self::SUCCESS => 200,
            self::CREATED => 201,
            self::UPDATED => 200,
            self::DELETED => 200,

            self::VALIDATION_ERROR,
            self::INVALID_DATA => 422,

            self::MISSING_PARAMETER => 400,

            self::UNAUTHORIZED,
            self::TOKEN_INVALID,
            self::TOKEN_EXPIRED => 401,

            self::FORBIDDEN => 403,

            self::NOT_FOUND => 404,
            self::ALREADY_EXISTS => 409,

            self::INTERNAL_ERROR,
            self::DATABASE_ERROR => 500,

            self::SERVICE_UNAVAILABLE => 503,
        };
    }
}
