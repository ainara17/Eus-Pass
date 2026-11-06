# <u>Euskadi Pass</u>

Aplicación móvil (*Mobile-First*) que digitaliza y gamifica la agenda cultural pública de **Kulturklik** (Gobierno Vasco), incentivando la exploración intraterritorial mediante recompensas y sellos provinciales.

---

## <u>Características Principales</u>

* **Catálogo Dinámico:** Consumo asíncrono de la API pública de Kulturklik con paginación (`async/await`).
* **Búsqueda y Filtros Combinados:** Filtrado simultáneo por texto libre, provincia (Bizkaia, Gipuzkoa, Araba) y categoría.
* **Persistencia Local:** Guardado y gestión de eventos favoritos mediante `localStorage`.
* **Pasaporte Gamificado:** Colección visual de sellos provinciales y simulador de escaneo de códigos QR para registrar visitas a eventos.

---

## <u>Arquitectura del Código</u>

El desarrollo utiliza **Programación Orientada a Objetos (POO)** en JavaScript vanilla sin dependencias externas:

* **Modelo (`Event.js`):** Clase principal que representa la entidad del evento y aplica métodos de sanitización de datos (limpieza de tags HTML, formato de fechas, asignación de imágenes por defecto y conversión de códigos de provincia).
* **Servicios (`api.js` & `localStorage.js`):** Capa dedicada al consumo asíncrono de endpoints y gestión de persistencia.
* **Control y Renderizado (`renderer.js` & `filters.js`):** Lógica centralizada para manipulaciones dinámicas del DOM y filtrado en una sola pasada.

---

## <u>Estructura del Proyecto</u>

```text
├── index.html              # Vista principal (Inicio / Misión activa)
├── assets/                 # Recursos multimedia e imágenes
├── css/
│   ├── generalStyles.css   # Estilos base y variables globales
│   ├── indexStyles.css
│   ├── exploreStyles.css
│   ├── detailStyles.css
│   ├── pass.css
│   └── profile.css
├── html/
│   ├── explore.html        # Catálogo general con filtrado
│   ├── detail.html         # Vista detallada de evento
│   ├── favorites.html      # Eventos guardados
│   ├── pass.html           # Pasaporte de sellos y simulación QR
│   └── profile.html        # Perfil de usuario
└── src/
    └── core/
        ├── Event.js        # Clase modelo del dominio
        ├── Favorites.js    # Lógica de favoritos
        ├── index.js        # Inicializador y orquestador global
        ├── localStorage.js # Adaptador de persistencia
        ├── components/     # Lógica modular de vistas (detail, pass)
        ├── services/       # Conectores de datos (api)
        ├── ui/             # Funciones de renderizado DOM
        └── utils/          # Helpers de filtrado y control de errores