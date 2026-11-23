import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Destinos (REST)', end: true },
  { to: '/planificador', label: 'Vuelos y Hoteles (GraphQL)', end: false },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          RutaAndina Viajes
        </NavLink>
        <nav className="nav-links" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;