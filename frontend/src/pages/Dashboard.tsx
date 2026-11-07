import { Link } from 'react-router-dom';
import { loadStudioData } from '../api';
import { useFetch } from '../hooks/useFetch';
import { Loading, ErrorState, EmptyState } from '../components/ui';
import AppointmentRow from '../components/AppointmentRow';
import { formatDateLong, formatMoney, todayISO } from '../utils/format';
import type { Appointment } from '../types';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

const byTime = (a: Appointment, b: Appointment) =>
  `${a.date} ${a.horaInicio}`.localeCompare(`${b.date} ${b.horaInicio}`);

export default function Dashboard() {
  const { data, loading, error, reload } = useFetch(loadStudioData);
  const today = todayISO();

  const appts = data?.appointments ?? [];
  const todays = appts.filter((a) => a.date === today && a.status !== 'CANCELADO').sort(byTime);
  const upcoming = appts.filter((a) => a.date > today && a.status === 'AGENDADO').sort(byTime).slice(0, 6);

  const month = today.slice(0, 7);
  const revenue = appts
    .filter((a) => a.status === 'CONCLUIDO' && a.date?.startsWith(month))
    .reduce((sum, a) => sum + (a.servico?.preco ?? 0), 0);

  const stats: { label: string; value: string | number }[] = [
    { label: 'Atendimentos hoje', value: todays.length },
    { label: 'Próximos agendados', value: appts.filter((a) => a.date >= today && a.status === 'AGENDADO').length },
    { label: 'Clientes', value: data?.clients.length ?? 0 },
    { label: 'Faturado no mês', value: formatMoney(revenue) },
  ];

  return (
    <>
      <header className="hero">
        <div>
          <p className="hero-kicker">{formatDateLong(today)}</p>
          <h1>{greeting()}! ✿</h1>
          <p className="muted">Aqui está o resumo do Studio Stelima.</p>
        </div>
        <Link to="/agendamentos" className="btn btn-primary">Ver agenda</Link>
      </header>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : (
        <>
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="card stat">
                <span className="stat-value">{s.value}</span>
                <span className="muted">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="dash-grid">
            <section>
              <h2 className="section-title">Agenda de hoje</h2>
              {todays.length === 0 ? (
                <div className="card">
                  <EmptyState title="Dia livre" text="Nenhum atendimento marcado para hoje." />
                </div>
              ) : (
                <div className="card agenda-list">
                  {todays.map((a) => (
                    <AppointmentRow key={a.id} appointment={a} compact />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="section-title">Próximos dias</h2>
              {upcoming.length === 0 ? (
                <div className="card">
                  <EmptyState title="Nada por enquanto" text="Sem agendamentos futuros." />
                </div>
              ) : (
                <div className="card agenda-list">
                  {upcoming.map((a) => (
                    <div key={a.id} className="upcoming">
                      <span className="upcoming-date">{formatDateLong(a.date).split(',')[1]?.trim()}</span>
                      <AppointmentRow appointment={a} compact />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
