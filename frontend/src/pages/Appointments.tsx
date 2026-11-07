import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { appointmentsApi, appointmentToRequest, loadStudioData } from '../api';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../components/Toast';
import Modal, { ConfirmDialog } from '../components/Modal';
import { PageHeader, Loading, ErrorState, EmptyState, Field, SearchInput } from '../components/ui';
import { PlusIcon } from '../components/Icons';
import AppointmentRow from '../components/AppointmentRow';
import { SALAS, STATUS } from '../constants';
import { addMinutes, formatDateLong, formatMoney, formatDuration, todayISO } from '../utils/format';
import type { Appointment, AppointmentRequest, ISODate, ScheduleStatus, Time, UUID } from '../types';

type Period = 'PROXIMOS' | 'HOJE' | 'TODOS';
type StatusFilter = ScheduleStatus | 'TODOS';

interface AppointmentForm {
  date: ISODate;
  horaInicio: Time;
  horaFim: Time;
  status: ScheduleStatus;
  obs: string;
  salaId: UUID;
  clienteId: UUID;
  profissionalId: UUID;
  offeringId: UUID;
}

type FormField = keyof AppointmentForm;
type InputEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const PERIODS: [Period, string][] = [
  ['PROXIMOS', 'Próximos'],
  ['HOJE', 'Hoje'],
  ['TODOS', 'Todos'],
];

const emptyForm = (): AppointmentForm => ({
  date: todayISO(),
  horaInicio: '09:00',
  horaFim: '10:00',
  status: 'AGENDADO',
  obs: '',
  salaId: SALAS[0].id,
  clienteId: '',
  profissionalId: '',
  offeringId: '',
});

export default function Appointments() {
  const { data, loading, error, reload } = useFetch(loadStudioData);
  const notify = useToast();

  const [period, setPeriod] = useState<Period>('PROXIMOS');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('TODOS');
  const [search, setSearch] = useState('');

  const [editing, setEditing] = useState<Appointment | 'new' | null>(null);
  const [form, setForm] = useState<AppointmentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toCancel, setToCancel] = useState<Appointment | null>(null);

  const activeOfferings = (data?.offerings ?? []).filter((o) => o.ativo);
  const activeProfessionals = (data?.professionals ?? []).filter((p) => p.active !== false);

  const openNew = () => {
    setForm(emptyForm());
    setEditing('new');
  };
  const openEdit = (a: Appointment) => {
    setForm({
      date: a.date,
      horaInicio: a.horaInicio,
      horaFim: a.horaFim,
      status: a.status,
      obs: a.obs ?? '',
      salaId: a.salaId,
      clienteId: a.cliente?.id ?? '',
      profissionalId: a.profissional?.id ?? '',
      offeringId: a.servico?.id ?? '',
    });
    setEditing(a);
  };
  const close = () => setEditing(null);

  const set = (k: FormField) => (e: InputEvent) => {
    const value = e.target.value;
    setForm((f) => {
      const next = { ...f, [k]: value } as AppointmentForm;
      // Recalcula o horário de término com base na duração do serviço.
      if (k === 'offeringId' || k === 'horaInicio') {
        const off = data?.offerings.find((o) => o.id === next.offeringId);
        if (off) next.horaFim = addMinutes(next.horaInicio, off.duracao_min);
      }
      return next;
    });
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    if (form.horaFim <= form.horaInicio) {
      notify('O horário de término deve ser depois do início.', 'error');
      return;
    }
    const payload: AppointmentRequest = {
      date: form.date,
      horaInicio: form.horaInicio,
      horaFim: form.horaFim,
      status: form.status,
      obs: form.obs,
      salaId: form.salaId,
      cliente: { id: form.clienteId },
      profissional: { id: form.profissionalId },
      offering: { id: form.offeringId },
    };
    setSaving(true);
    try {
      if (editing === 'new') await appointmentsApi.create(payload);
      else await appointmentsApi.update(editing.id, payload);
      notify(editing === 'new' ? 'Agendamento criado!' : 'Agendamento atualizado!');
      close();
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function complete(a: Appointment) {
    try {
      await appointmentsApi.update(a.id, appointmentToRequest(a, { status: 'CONCLUIDO' }));
      notify('Atendimento concluído ✿');
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    }
  }

  async function cancel() {
    if (!toCancel) return;
    setSaving(true);
    try {
      await appointmentsApi.cancel(toCancel.id);
      notify('Agendamento cancelado.');
      setToCancel(null);
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  const groups = useMemo<[ISODate, Appointment[]][]>(() => {
    const today = todayISO();
    const q = search.trim().toLowerCase();
    const filtered = (data?.appointments ?? [])
      .filter((a) => (period === 'HOJE' ? a.date === today : period === 'PROXIMOS' ? a.date >= today : true))
      .filter((a) => statusFilter === 'TODOS' || a.status === statusFilter)
      .filter(
        (a) =>
          !q ||
          `${a.cliente?.name ?? ''} ${a.profissional?.name ?? ''} ${a.servico?.nome ?? ''}`.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const cmp = `${a.date} ${a.horaInicio}`.localeCompare(`${b.date} ${b.horaInicio}`);
        return period === 'TODOS' ? -cmp : cmp;
      });

    const map = new Map<ISODate, Appointment[]>();
    for (const a of filtered) {
      const list = map.get(a.date) ?? [];
      list.push(a);
      map.set(a.date, list);
    }
    return [...map.entries()];
  }, [data, period, statusFilter, search]);

  const selectedOffering = data?.offerings.find((o) => o.id === form.offeringId);
  const missingSetup =
    !!data && (data.clients.length === 0 || activeProfessionals.length === 0 || activeOfferings.length === 0);

  return (
    <>
      <PageHeader
        title="Agenda"
        subtitle="Agendamentos do studio"
        action={
          <button className="btn btn-primary" onClick={openNew} disabled={!data}>
            <PlusIcon /> Novo agendamento
          </button>
        }
      />

      <div className="toolbar">
        <div className="chips">
          {PERIODS.map(([k, label]) => (
            <button key={k} className={`chip${period === k ? ' chip-active' : ''}`} onClick={() => setPeriod(k)}>
              {label}
            </button>
          ))}
        </div>
        <select
          className="select-inline"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="TODOS">Todos os status</option>
          {Object.entries(STATUS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <SearchInput value={search} onChange={setSearch} placeholder="Cliente, profissional ou serviço…" />
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : groups.length === 0 ? (
        <EmptyState
          title="Nenhum agendamento"
          text={period === 'TODOS' ? 'Crie o primeiro agendamento do studio.' : 'Nada marcado para este período.'}
        />
      ) : (
        <div className="agenda">
          {groups.map(([date, items]) => (
            <section key={date} className="agenda-day">
              <h2 className="agenda-date">
                {formatDateLong(date)}
                {date === todayISO() && <span className="today-pill">Hoje</span>}
              </h2>
              <div className="card agenda-list">
                {items.map((a) => (
                  <AppointmentRow
                    key={a.id}
                    appointment={a}
                    onEdit={() => openEdit(a)}
                    onComplete={() => complete(a)}
                    onCancel={() => setToCancel(a)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing === 'new' ? 'Novo agendamento' : 'Editar agendamento'}
        onClose={close}
        size="lg"
        footer={
          <>
            <button className="btn btn-ghost" onClick={close}>Cancelar</button>
            <button className="btn btn-primary" type="submit" form="appt-form" disabled={saving || missingSetup}>
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
          </>
        }
      >
        {missingSetup && (
          <div className="notice">
            Para agendar, é preciso ter ao menos uma cliente, uma profissional ativa e um serviço ativo cadastrados.
          </div>
        )}
        <form id="appt-form" className="form-grid" onSubmit={submit}>
          <Field label="Cliente" required full>
            <select value={form.clienteId} onChange={set('clienteId')} required>
              <option value="">Selecione…</option>
              {[...(data?.clients ?? [])]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((c) => (
                  <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>
                ))}
            </select>
          </Field>
          <Field
            label="Serviço"
            required
            full
            hint={selectedOffering && `${formatDuration(selectedOffering.duracao_min)} · ${formatMoney(selectedOffering.preco)}`}
          >
            <select value={form.offeringId} onChange={set('offeringId')} required>
              <option value="">Selecione…</option>
              {activeOfferings.map((o) => (
                <option key={o.id} value={o.id}>{o.nome}</option>
              ))}
            </select>
          </Field>
          <Field label="Profissional" required>
            <select value={form.profissionalId} onChange={set('profissionalId')} required>
              <option value="">Selecione…</option>
              {activeProfessionals.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.specialty})</option>
              ))}
            </select>
          </Field>
          <Field label="Sala" required>
            <select value={form.salaId} onChange={set('salaId')} required>
              {SALAS.map((s) => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </Field>
          <Field label="Data" required>
            <input type="date" value={form.date} onChange={set('date')} required />
          </Field>
          <div className="field-pair">
            <Field label="Início" required>
              <input type="time" value={form.horaInicio} onChange={set('horaInicio')} required />
            </Field>
            <Field label="Fim" required>
              <input type="time" value={form.horaFim} onChange={set('horaFim')} required />
            </Field>
          </div>
          {editing !== 'new' && (
            <Field label="Status" required>
              <select value={form.status} onChange={set('status')}>
                {Object.entries(STATUS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </Field>
          )}
          <Field label="Observações" full>
            <textarea rows={3} value={form.obs} onChange={set('obs')} placeholder="Alergias, preferências, etc." />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toCancel}
        title="Cancelar agendamento"
        message={`Cancelar o horário de ${toCancel?.cliente?.name ?? 'cliente'} às ${toCancel?.horaInicio}?`}
        confirmLabel="Cancelar agendamento"
        danger
        busy={saving}
        onConfirm={cancel}
        onClose={() => setToCancel(null)}
      />
    </>
  );
}
