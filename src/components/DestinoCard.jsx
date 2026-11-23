import { Link } from 'react-router-dom';

function DestinoCard({ destino }) {
  return (
    <article className="destino-card">
      <div className="destino-header">
        <div>
          <span className="destino-pais">{destino.pais}</span>
          <h2>{destino.nombre}</h2>
        </div>
      </div>

      <p className="destino-descripcion">{destino.descripcion}</p>

      <div className="actividades-box">
        <h3>Actividades populares</h3>
        <ul>
          {destino.actividadesPopulares.map((actividad, index) => (
            <li key={index}>{actividad}</li>
          ))}
        </ul>
      </div>

      <div className="destino-acciones">
        <Link to={`/destino/${destino.id}`} className="btn-primary">
          Ver vuelos y hoteles
        </Link>
      </div>
    </article>
  );
}

export default DestinoCard;