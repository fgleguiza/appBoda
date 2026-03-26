# 🔐 Sistema de Autenticación y Rutas - Documentación

## 📋 Resumen de Cambios

Se ha refactorizado completamente el sistema de autenticación y rutas del frontend según los siguientes criterios:

✅ **Rutas Admin** - Solo accesibles si `role === "novio"`  
✅ **Rutas Invitado** - Requieren token válido (sin requerir confirmación)  
✅ **Confirmación** - Separada de autenticación, guardada en sesión del home  
✅ **Sin Token** - Redirección a página 404 personalizada  
✅ **Servicios** - Separados por dominio en carpetas específicas

---

## 📁 Estructura de Carpetas

### `/src/types/`

```
auth.types.ts          - Interfaces: UserRole, GuestUser, AuthContextType
```

### `/src/context/`

```
AuthContext.tsx        - Contexto centralizado de autenticación
                         Reemplaza a InvitationContext.tsx (deprecado)
InvitationContext.tsx  - ⚠️ DEPRECADO - Usar AuthContext
```

### `/src/services/`

```
api.ts                 - Cliente axios con interceptores automáticos
                         Agrega token a headers automáticamente
                         Maneja errores 401

/auth/
  authService.ts       - Funciones de autenticación e tokens
    ✓ verifyTokenService(token)
    ✓ getStoredToken() / saveToken() / clearToken()

/guest/
  guestService.ts      - Operaciones del invitado
    ✓ confirmGuestService(email)
    ✓ getGuestsGiftsService()
    ✓ reserveGiftService(giftId)
    ✓ cancelReservationService(giftId)

  sessionService.ts    - Sesión del home (opcional)
    ✓ saveSessionConfirmation(confirmed)
    ✓ getSessionConfirmation()
    ✓ getSession() / clearSession()

/admin/
  adminService.ts      - Operaciones del panel admin (CRUD)
    ✓ Invitados: CRUD completo
    ✓ Categorías: CRUD completo
    ✓ Regalos: CRUD con soporte multipart/form-data
```

### `/src/guards/`

```
TokenGuard.tsx         - Verifica token y rol opcional
                         Lectura desde URL o localStorage
                         Carga automática mientras verifica

AdminGuard.tsx         - Verifica solo role === "novio"
                         Redirige a /404 si no es admin

InvitationGuard.tsx    - ⚠️ DEPRECADO - Usar TokenGuard
```

### `/src/hooks/`

```
useAuth.ts             - Hook para acceder al contexto de autenticación
                         Lanza error si se usa fuera de AuthProvider

// Uso:
const { user, token, isAdmin, setAuth, logout } = useAuth();
```

### `/src/pages/`

```
NotFound.tsx           - Página 404 personalizada con diseño del proyecto
                         Muestra razones posibles del error
                         Botones: "Volver al inicio" y "Atrás"
```

### `/src/router/`

```
index.tsx              - Rutas actualizadas con AuthProvider y Guards
```

---

## 🔄 Flujo de Autenticación

### 1. Usuario sin Token

```
Browser → /home (página pública, sin requerimientos)
```

### 2. Usuario con Token (Invitado)

```
URL: /regalos/:token
↓
TokenGuard verifica token
↓
authService.verifyTokenService(:token)
↓
✓ Válido → Guardar en localStorage + setAuth()
✗ Inválido → Redireccionar a /404
↓
Mostrar Gifts.tsx
```

### 3. Usuario con Token (Admin)

```
URL: /admin/invitados (requiere autenticación previa)
↓
AdminGuard verifica role === "novio"
↓
✓ Es admin → Mostrar AdminLayout
✗ No es admin → Redireccionar a /404
```

### 4. Confirmación de Asistencia

```
/confirm/:token
↓
TokenGuard
↓
SaveToDate.tsx carga
↓
Usa: useAuth() + sessionService.saveSessionConfirmation(true)
↓
Nota: NO requiere confirmación para acceder a otros endpoints
```

---

## 🎯 Rutas y Permisos

| Ruta              | Requiere Token | Requiere Role | Guard      | Descripción              |
| ----------------- | -------------- | ------------- | ---------- | ------------------------ |
| `/home`           | ❌             | -             | -          | Página pública           |
| `/regalos`        | ✅             | invitado      | TokenGuard | Regalos sin token en URL |
| `/regalos/:token` | ✅             | invitado      | TokenGuard | Regalos con token en URL |
| `/confirm/:token` | ✅             | invitado      | TokenGuard | Confirmación asistencia  |
| `/admin/**`       | ✅             | novio         | AdminGuard | Panel admin              |
| `/404`            | ❌             | -             | -          | Página error             |
| `/*`              | ❌             | -             | -          | Fallback a 404           |

---

## 🛠️ Cómo Usar en Componentes

### Acceder a datos del usuario

```tsx
import { useAuth } from "../hooks/useAuth";

export default function MyComponent() {
  const { user, token, isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <div>No autorizado</div>;

  return <div>Bienvenido, {user?.name}</div>;
}
```

### Confirmar asistencia

```tsx
import { useAuth } from "../hooks/useAuth";
import { saveSessionConfirmation } from "../services/guest/sessionService";
import { confirmGuestService } from "../services/guest/guestService";

export default function SaveToDate() {
  const { user } = useAuth();

  const handleConfirm = async () => {
    await confirmGuestService(user?.email!);
    saveSessionConfirmation(true);
    // El usuario ahora está confirmado en sesión
  };

  return <button onClick={handleConfirm}>Confirmar Asistencia</button>;
}
```

### Usar servicios de admin

```tsx
import {
  getInvitadosService,
  createInvitadoService,
} from "../services/admin/adminService";

export default function GuestsPage() {
  useEffect(() => {
    getInvitadosService().then((invitados) => {
      console.log("Invitados:", invitados);
    });
  }, []);

  const handleCreate = async (data) => {
    const newGuest = await createInvitadoService(data);
    // newGuest es del tipo Invitado con todos los campos
  };
}
```

---

## 📦 Variables de Almacenamiento

### localStorage

```javascript
// Token de autenticación
localStorage.getItem("guestToken");

// Confirmación de home (sesión)
localStorage.getItem("homeSessionConfirmed");

// Session del home (completa)
localStorage.getItem("homeSession"); // JSON: { confirmed, confirmedAt, guestId }
```

---

## ⚠️ Migraciones Necesarias

### ❌ Archivos Deprecados (Pueden eliminarse)

- `src/context/InvitationContext.tsx` - Usar AuthContext en su lugar
- `src/guards/InvitationGuard.tsx` - Usar TokenGuard en su lugar
- `src/services/confirmGuestService.ts` - Ir a `services/guest/guestService.ts`
- `src/services/verifyGuestService.ts` - Ir a `services/auth/authService.ts`

### 🔄 Componentes a Actualizar

**SaveToDate.tsx** (home - confirmación)

```tsx
// Cambiar de:
import { useInvitation } from "../hooks/useInvitation";
// A:
import { useAuth } from "../hooks/useAuth";
import { sessionService } from "../services/guest/sessionService";
```

**Gifts.tsx**

```tsx
// Usar useAuth() en lugar de useInvitation()
// Usar guestService.getGuestsGiftsService() para cargar regalos
```

**Admin Pages** (GuestsPage, CategoriesPage, GiftsPage)

```tsx
// Reemplazar console.log con llamadas a adminService
// Ejemplo en GuestsPage:
import {
  getInvitadosService,
  createInvitadoService,
} from "../services/admin/adminService";
```

---

## 🔌 Endpoints Esperados (Backend)

```
GET    /api/auth/verify/:token          - Verificar token
POST   /api/guests/confirm              - Confirmar asistencia
GET    /api/guests/gifts                - Listar regalos
POST   /api/guests/gifts/:id/reserve    - Reservar regalo
DELETE /api/guests/gifts/:id/reserve    - Cancelar reserva

GET    /api/admin/guests                - Listar invitados
POST   /api/admin/guests                - Crear invitado
PUT    /api/admin/guests/:id            - Actualizar invitado
DELETE /api/admin/guests/:id            - Eliminar invitado

GET    /api/admin/categories            - Listar categorías
POST   /api/admin/categories            - Crear categoría
PUT    /api/admin/categories/:id        - Actualizar categoría
DELETE /api/admin/categories/:id        - Eliminar categoría

GET    /api/admin/gifts                 - Listar regalos
POST   /api/admin/gifts                 - Crear regalo (multipart)
PUT    /api/admin/gifts/:id             - Actualizar regalo (multipart)
DELETE /api/admin/gifts/:id             - Eliminar regalo
```

---

## ✅ Checklist de Implementación

- [x] Crear AuthContext separado de sesión home
- [x] Crear tipos en auth.types.ts
- [x] Crear servicios separados por dominio
- [x] Actualizar api.ts con interceptores
- [x] Crear TokenGuard y AdminGuard
- [x] Crear página 404
- [x] Actualizar router
- [ ] Actualizar SaveToDate.tsx
- [ ] Actualizar Gifts.tsx
- [ ] Actualizar componentes del admin
- [ ] Probar flows completos de auth
- [ ] Eliminar archivos deprecados cuando todo funcione

---

## 🐛 Troubleshooting

**"Token inválido en cada refresh"**

- Asegurar que backend retorna el token en la respuesta
- Verificar que `getStoredToken()` se lee correctamente

**"AdminGuard no funciona"**

- Verificar que backend retorna `role: "novio"` para admins
- Usar `useAuth()` para debuguear: `console.log(useAuth())`

**"Confirmación no persiste"**

- Usar `sessionService.saveSessionConfirmation(true)` en SaveToDate
- Verificar que el localStorage tiene `homeSessionConfirmed`

**"Redirige a 404 cuando no debería"**

- Verificar que el token es válido en backend
- Revisar logs de api.ts en interceptor
