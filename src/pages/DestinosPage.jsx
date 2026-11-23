import { useEffect, useState } from 'react';
import DestinoCard from '../components/DestinoCard';
import { obtenerDestinos } from '../services/destinosService';

function DestinosPage() {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reintentar, setReintentar] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    obtenerDestinos(controller.signal)
      .then((data) => {
        setDestinos(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Ocurrió un problema inesperado al cargar los destinos.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [reintentar]);

  return (
    <section className="page-section">
      <div className="hero-banner">
        <h1>Explora destinos para tu próximo viaje</h1>
        <p>
          Catálogo obtenido mediante <strong>API REST simulada</strong>. Selecciona un destino
          para consultar vuelos y hoteles disponibles vía <strong>GraphQL</strong>.
        </p>
      </div>

      {loading && <p className="status-msg">Cargando destinos disponibles...</p>}

      {error && (
        <div className="error-box" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="btn-retry"
            onClick={() => setReintentar((prev) => prev + 1)}
          >
            Reintentar consulta
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="destinos-grid">
          {destinos.map((destino) => (
            <DestinoCard key={destino.id} destino={destino} />
          ))}
        </div>
      )}
    </section>
  );
}

export default DestinosPage;