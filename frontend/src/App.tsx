import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Clients from './pages/Clients';
import Professionals from './pages/Professionals';
import Offerings from './pages/Offerings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="agendamentos" element={<Appointments />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="profissionais" element={<Professionals />} />
        <Route path="servicos" element={<Offerings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
