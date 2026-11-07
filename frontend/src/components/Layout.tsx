import type { ComponentType } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HomeIcon, CalendarIcon, UsersIcon, BadgeIcon, SparkleIcon } from './Icons';

interface NavItem {
  to: string;
  label: string;
  icon: ComponentType;
  end?: boolean;
}

const links: NavItem[] = [
  { to: '/', label: 'Início', icon: HomeIcon, end: true },
  { to: '/agendamentos', label: 'Agenda', icon: CalendarIcon },
  { to: '/clientes', label: 'Clientes', icon: UsersIcon },
  { to: '/profissionais', label: 'Profissionais', icon: BadgeIcon },
  { to: '/servicos', label: 'Serviços', icon: SparkleIcon },
];

export default function Layout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <div className="brand-name">Studio Stelima</div>
            <div className="brand-sub">Estética &amp; Bem-estar</div>
          </div>
        </div>
        <nav className="nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className="nav-link">
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
