# RutaAndina Viajes — Integración Frontend con Backend (REST y GraphQL)

Aplicación web desarrollada en **React** y **Vite** para una agencia de viajes, correspondiente a la actividad sumativa de la **Semana 5** (*"Integrando nuestro frontend con backend"*) de la asignatura **Desarrollo Frontend II (`PFY2202`)**.

## Enlaces del proyecto

- **Repositorio GitHub:** `https://github.com/Rodrigo1223/viajes-rodrigo-olavarria-pfy2202.git`
- **Aplicación desplegada (GitHub Pages):** `https://rodrigo1223.github.io/viajes-rodrigo-olavarria-pfy2202/`

## Descripción general

La aplicación permite explorar destinos turísticos y planificar viajes consultando vuelos y hoteles disponibles mediante un entorno simulado con **Mock Service Worker (MSW)** y **Apollo Client**, combinando **API REST** y **GraphQL**.

- **API REST simulada (`MSW`):** Expone los destinos disponibles con información como país, descripción y actividades populares.
- **API GraphQL simulada (`MSW` + `Apollo Client`):** Consulta vuelos y hoteles por destino, incluyendo detalles como precios, fechas y disponibilidad.
- **Navegación con React Router:** Permite desplazarse entre el listado de destinos y la vista de planificación por destino, gestionando rutas dinámicas y desconocidas.

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