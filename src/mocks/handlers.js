import { http, HttpResponse, graphql } from 'msw';

const destinosMock = [
  {
    id: 'bariloche',
    nombre: 'Bariloche',
    pais: 'Argentina',
    descripcion: 'Lagos cristalinos, bosques andinos y centros de ski.',
    actividadesPopulares: [
      'Circuito Chico y mirador Campanario',
      'Navegación por Lago Nahuel Huapi',
      'Ascenso a Cerro Catedral',
    ],
  },
  {
    id: 'cusco',
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Capital histórica del Imperio Inca y puerta al Valle Sagrado.',
    actividadesPopulares: [
      'Excursión a Machu Picchu',
      'Recorrido por el Valle Sagrado',
      'Visita a Sacsayhuamán y San Blas',
    ],
  },
  {
    id: 'madrid',
    nombre: 'Madrid',
    pais: 'España',
    descripcion: 'Museos de primer nivel, plazas vibrantes y gastronomía tradicional.',
    actividadesPopulares: [
      'Visita al Museo del Prado y Reina Sofía',
      'Paseo por el Parque del Retiro',
      'Ruta de tapas por La Latina',
    ],
  },
];

const opcionesPorDestino = {
  bariloche: {
    vuelos: [
      {
        id: 'v-brc-1',
        aerolinea: 'Sky Airline',
        origen: 'Santiago (SCL)',
        fecha: '2026-12-10',
        precio: 245000,
        disponibilidad: '8 asientos disponibles',
      },
      {
        id: 'v-brc-2',
        aerolinea: 'LATAM',
        origen: 'Santiago (SCL)',
        fecha: '2026-12-12',
        precio: 289000,
        disponibilidad: '4 asientos disponibles',
      },
    ],
    hoteles: [
      {
        id: 'h-brc-1',
        nombre: 'Hotel Llao Llao View',
        noches: 4,
        precioNoche: 95000,
        disponibilidad: 'Disponible',
      },
      {
        id: 'h-brc-2',
        nombre: 'Cabañas Nahuel Huapi',
        noches: 4,
        precioNoche: 68000,
        disponibilidad: 'Últimas 2 habitaciones',
      },
    ],
  },
  cusco: {
    vuelos: [
      {
        id: 'v-cuz-1',
        aerolinea: 'LATAM',
        origen: 'Santiago (SCL)',
        fecha: '2026-12-15',
        precio: 310000,
        disponibilidad: '11 asientos disponibles',
      },
    ],
    hoteles: [
      {
        id: 'h-cuz-1',
        nombre: 'Casa Andina Plaza Cusco',
        noches: 5,
        precioNoche: 82000,
        disponibilidad: 'Disponible',
      },
      {
        id: 'h-cuz-2',
        nombre: 'Hotel San Blas Boutique',
        noches: 5,
        precioNoche: 74000,
        disponibilidad: 'Disponible',
      },
    ],
  },
  madrid: {
    vuelos: [
      {
        id: 'v-mad-1',
        aerolinea: 'Iberia',
        origen: 'Santiago (SCL)',
        fecha: '2027-01-08',
        precio: 790000,
        disponibilidad: '6 asientos disponibles',
      },
    ],
    hoteles: [
      {
        id: 'h-mad-1',
        nombre: 'Hotel Gran Vía Central',
        noches: 6,
        precioNoche: 125000,
        disponibilidad: 'Disponible',
      },
    ],
  },
};

export const handlers = [
  http.get('*/api/destinos', () => {
    return HttpResponse.json(destinosMock, { status: 200 });
  }),

  graphql.query('GetOpcionesViaje', ({ variables }) => {
    const destinoId = variables?.destinoId;
    const detalle = opcionesPorDestino[destinoId];

    if (!detalle) {
      return HttpResponse.json({
        errors: [{ message: `No se encontraron vuelos ni hoteles para el destino "${destinoId}".` }],
      });
    }

    return HttpResponse.json({
      data: {
        opcionesViaje: {
          destinoId,
          vuelos: detalle.vuelos,
          hoteles: detalle.hoteles,
        },
      },
    });
  }),
];