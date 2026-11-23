Markdown
# RutaAndina Viajes — Integración Frontend con Backend (REST y GraphQL)

Aplicación web desarrollada en **React** y **Vite** para una agencia de viajes, correspondiente a la actividad sumativa de la **Semana 5** (*"Integrando nuestro frontend con backend"*) de la asignatura **Desarrollo Frontend II (`PFY2202`)**[cite: 2, 3, 4].

## Descripción general

La aplicación permite explorar destinos turísticos y planificar viajes consultando vuelos y hoteles disponibles mediante un entorno simulado con **Mock Service Worker (MSW)** y **Apollo Client**, combinando **API REST** y **GraphQL**[cite: 2, 3, 4].

- **API REST simulada (`MSW`):** Expone los destinos disponibles con información como país, descripción y actividades populares[cite: 3].
- **API GraphQL simulada (`MSW` + `Apollo Client`):** Consulta vuelos y hoteles por destino, incluyendo detalles como precios, fechas y disponibilidad[cite: 3].
- **Navegación con React Router:** Permite desplazarse entre el listado de destinos y la vista de planificación por destino, gestionando rutas dinámicas y desconocidas[cite: 3].

## Estructura del proyecto

```text
src/
├── components/
│   ├── DestinoCard.jsx
│   └── Navbar.jsx
├── mocks/
│   ├── browser.js
│   └── handlers.js
├── pages/
│   ├── DestinosPage.jsx
│   └── PlanificadorPage.jsx
├── services/
│   └── destinosService.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
Instalación y ejecución local
Instalar dependencias:

Bash
npm install
Iniciar el servidor de desarrollo:

Bash
npm run dev
Generar la compilación de producción:

Bash
npm run build