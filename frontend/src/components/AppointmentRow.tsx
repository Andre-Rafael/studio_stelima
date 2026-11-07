import { Badge } from './ui';
import { CheckIcon, EditIcon, XIcon } from './Icons';
import { STATUS, salaNome } from '../constants';
import type { Appointment, Tone } from '../types';

interface AppointmentRowProps {
  appointment: Appointment;
  onEdit?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  compact?: boolean;
}

export default function AppointmentRow({ appointment: a, onEdit, onComplete, onCancel, compact }: AppointmentRowProps) {
  const status: { label: string; tone: Tone } = STATUS[a.status] ?? { label: a.status, tone: 'gray' };
  const open = a.status === 'AGENDADO';

  return (
    <div className={`appt status-${a.status?.toLowerCase()}`}>
      <div className="appt-time">
        <strong>{a.horaInicio}</strong>
        <span className="muted">{a.horaFim}</span>
      </div>
      <div className="appt-main">
        <div className="appt-title">
          <span className="strong">{a.cliente?.name ?? 'Cliente removida'}</span>
          <Badge tone={status.tone}>{status.label}</Badge>
        </div>
        <div className="muted small">
          {a.servico?.nome ?? 'Serviço'} · {a.profissional?.name ?? '—'}
          {!compact && <> · {salaNome(a.salaId)}</>}
        </div>
        {!compact && a.obs && <div className="appt-obs small">“{a.obs}”</div>}
      </div>
      {!compact && (
        <div className="row-actions">
          {open && (
            <button className="icon-btn icon-btn-success" onClick={onComplete} aria-label="Concluir" title="Concluir">
              <CheckIcon />
            </button>
          )}
          <button className="icon-btn" onClick={onEdit} aria-label="Editar" title="Editar">
            <EditIcon />
          </button>
          {open && (
            <button className="icon-btn icon-btn-danger" onClick={onCancel} aria-label="Cancelar" title="Cancelar">
              <XIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
