import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DestinosPage from './pages/DestinosPage';
import PlanificadorPage from './pages/PlanificadorPage';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DestinosPage />} />
          <Route path="/destino/:destinoId" element={<PlanificadorPage />} />
          <Route path="/planificador" element={<PlanificadorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;