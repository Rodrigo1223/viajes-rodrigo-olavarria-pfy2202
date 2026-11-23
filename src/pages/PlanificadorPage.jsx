import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { obtenerDestinos } from '../services/destinosService';

const GET_OPCIONES_VIAJE = gql`
  query GetOpcionesViaje($destinoId: ID!) {
    opcionesViaje(destinoId: $destinoId) {
      destinoId
      vuelos {
        id
        aerolinea
        origen
        fecha
        precio
        disponibilidad
      }
      hoteles {
        id
        nombre
        noches
        precioNoche
        disponibilidad
      }
    }
  }
`;

function formatCLP(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
}

function PlanificadorPage() {
  const { destinoId } = useParams();
  const navigate = useNavigate();
  const [destinosLista, setDestinosLista] = useState([]);
  const [loadingDestinos, setLoadingDestinos] = useState(true);
  const [selectedDestino, setSelectedDestino] = useState(destinoId || '');
  const [errorDestinos, setErrorDestinos] = useState('');
  const [retryDestinosToken, setRetryDestinosToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoadingDestinos(true);
    setErrorDestinos('');

    obtenerDestinos(controller.signal)
      .then((data) => {
        setDestinosLista(data);
        setLoadingDestinos(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setErrorDestinos(err.message);
        setLoadingDestinos(false);
      });

    return () => controller.abort();
  }, [retryDestinosToken]);

  useEffect(() => {
    if (destinoId) {
      setSelectedDestino(destinoId);
      return;
    }
    if (!loadingDestinos && destinosLista.length > 0 && !selectedDestino) {
      setSelectedDestino(destinosLista[0].id);
    }
  }, [destinoId, loadingDestinos, destinosLista, selectedDestino]);

  const destinoActual = destinosLista.find((d) => d.id === selectedDestino);
  const destinoNoEncontrado =
    !loadingDestinos && destinosLista.length > 0 && Boolean(selectedDestino) && !destinoActual;

  const { data, loading, error, refetch } = useQuery(GET_OPCIONES_VIAJE, {
    variables: { destinoId: selectedDestino },
    skip: !selectedDestino || destinoNoEncontrado,
    notifyOnNetworkStatusChange: true,
  });

  const handleSelectorChange = useCallback(
    (e) => {
      const nuevoId = e.target.value;
      setSelectedDestino(nuevoId);
      navigate(`/destino/${nuevoId}`);
    },
    [navigate]
  );

  const nombreLegible = destinoActual
    ? destinoActual.nombre
    : loadingDestinos
      ? 'Cargando destino...'
      : selectedDestino || 'Sin destino';

  const opciones = data?.opcionesViaje;

  const mensajeErrorGraphQL = error
    ? error.message.includes('Failed to fetch')
      ? 'Error de conexión de red al consultar vuelos y hoteles. Intenta nuevamente.'
      : error.message
    : '';

  return (
    <section className="page-section">
      <div className="planificador-top">
        <div>
          <Link to="/" className="back-link">
            ← Volver a destinos
          </Link>
          <h1>Planificación de viaje: {nombreLegible}</h1>
          <p>
            Vuelos y hoteles consultados mediante <strong>API GraphQL simulada</strong> con Apollo
            Client.
          </p>
        </div>

        <div className="selector-box">
          <label htmlFor="destino-select">Cambiar destino:</label>
          <select
            id="destino-select"
            value={destinoActual ? selectedDestino : ''}
            onChange={handleSelectorChange}
            disabled={loadingDestinos || destinosLista.length === 0}
          >
            <option value="" disabled>
              {loadingDestinos ? 'Cargando destinos...' : 'Selecciona un destino'}
            </option>
            {destinosLista.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre} ({d.pais})
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorDestinos && (
        <div className="error-box" role="alert">
          <p>No se pudo cargar la lista de destinos: {errorDestinos}</p>
          <button
            type="button"
            className="btn-retry"
            onClick={() => setRetryDestinosToken((prev) => prev + 1)}
          >
            Reintentar carga de destinos
          </button>
        </div>
      )}

      {destinoNoEncontrado && (
        <div className="error-box" role="alert">
          <p>
            El destino &ldquo;{selectedDestino}&rdquo; no figura en el catálogo disponible. Selecciona
            otro en el selector o vuelve al listado principal.
          </p>
        </div>
      )}

      {loading && !destinoNoEncontrado && (
        <p className="status-msg">Consultando vuelos y hoteles disponibles...</p>
      )}

      {error && !destinoNoEncontrado && (
        <div className="error-box" role="alert">
          <p>{mensajeErrorGraphQL}</p>
          <button type="button" className="btn-retry" onClick={() => refetch()}>
            Reintentar consulta
          </button>
        </div>
      )}

      {!loading && !error && !destinoNoEncontrado && opciones && (
        <div className="opciones-layout">
          <div className="panel-box">
            <h2>Vuelos disponibles</h2>
            {opciones.vuelos.length === 0 ? (
              <p>No hay vuelos disponibles para este destino.</p>
            ) : (
              <div className="cards-stack">
                {opciones.vuelos.map((vuelo) => (
                  <article key={vuelo.id} className="item-card">
                    <div className="item-header">
                      <h3>{vuelo.aerolinea}</h3>
                      <span className="precio-tag">{formatCLP(vuelo.precio)}</span>
                    </div>
                    <p><strong>Ruta:</strong> {vuelo.origen} → {nombreLegible}</p>
                    <p><strong>Fecha de salida:</strong> {vuelo.fecha}</p>
                    <p><strong>Disponibilidad:</strong> {vuelo.disponibilidad}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="panel-box">
            <h2>Hoteles disponibles</h2>
            {opciones.hoteles.length === 0 ? (
              <p>No hay hoteles disponibles para este destino.</p>
            ) : (
              <div className="cards-stack">
                {opciones.hoteles.map((hotel) => (
                  <article key={hotel.id} className="item-card">
                    <div className="item-header">
                      <h3>{hotel.nombre}</h3>
                      <span className="precio-tag">{formatCLP(hotel.precioNoche)} / noche</span>
                    </div>
                    <p><strong>Estadía sugerida:</strong> {hotel.noches} noches</p>
                    <p>
                      <strong>Total estimado:</strong>{' '}
                      {formatCLP(hotel.precioNoche * hotel.noches)}
                    </p>
                    <p><strong>Disponibilidad:</strong> {hotel.disponibilidad}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default PlanificadorPage;