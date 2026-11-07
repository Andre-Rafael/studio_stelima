import { request } from './http';
import type {
  Appointment,
  AppointmentRequest,
  Client,
  ClientRequest,
  Offering,
  OfferingRequest,
  Professional,
  ProfessionalRequest,
  UUID,
} from '../types';

/* ---------- Clientes (/client) — multipart com foto ---------- */

function clientFormData(data: ClientRequest, file: File): FormData {
  const fd = new FormData();
  fd.append('cliente', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  fd.append('file', file);
  return fd;
}

export const clientsApi = {
  list: () => request<Client[]>('/client'),
  get: (id: UUID) => request<Client>(`/client/${id}`),
  create: (data: ClientRequest, file: File) =>
    request<Client>('/client', { method: 'POST', body: clientFormData(data, file) }),
  update: (id: UUID, data: ClientRequest, file: File) =>
    request<Client>(`/client/${id}`, { method: 'PUT', body: clientFormData(data, file) }),
  remove: (id: UUID) => request<void>(`/client/${id}`, { method: 'DELETE' }),
};

/* ---------- Profissionais (/profissional) ---------- */

export const professionalsApi = {
  list: () => request<Professional[]>('/profissional'),
  create: (data: ProfessionalRequest) => request<Professional>('/profissional', { method: 'POST', body: data }),
  update: (id: UUID, data: ProfessionalRequest) =>
    request<Professional>(`/profissional/${id}`, { method: 'PUT', body: data }),
  remove: (id: UUID) => request<void>(`/profissional/${id}`, { method: 'DELETE' }),
};

/* ---------- Serviços (/servico) ----------
 * A API recebe { name, description, duration_minutes, price, category }
 * mas devolve { nome, descricao, duracao_min, preco, categoria, ativo }.
 */

export const offeringsApi = {
  list: () => request<Offering[]>('/servico'),
  create: (data: OfferingRequest) => request<Offering>('/servico', { method: 'POST', body: data }),
  update: (id: UUID, data: OfferingRequest) => request<Offering>(`/servico/${id}`, { method: 'PUT', body: data }),
  remove: (id: UUID) => request<void>(`/servico/${id}`, { method: 'DELETE' }),
};

/* ---------- Agendamentos (/agendamento) ---------- */

export const appointmentsApi = {
  list: () => request<Appointment[]>('/agendamento'),
  create: (data: AppointmentRequest) => request<Appointment>('/agendamento', { method: 'POST', body: data }),
  update: (id: UUID, data: AppointmentRequest) =>
    request<Appointment>(`/agendamento/${id}`, { method: 'PUT', body: data }),
  cancel: (id: UUID) => request<void>(`/agendamento/${id}`, { method: 'DELETE' }),
};

/** Converte um agendamento vindo da API no formato aceito pelo PUT. */
export function appointmentToRequest(a: Appointment, overrides: Partial<AppointmentRequest> = {}): AppointmentRequest {
  return {
    date: a.date,
    horaInicio: a.horaInicio,
    horaFim: a.horaFim,
    status: a.status,
    obs: a.obs ?? '',
    salaId: a.salaId,
    cliente: { id: a.cliente?.id },
    profissional: { id: a.profissional?.id },
    offering: { id: a.servico?.id },
    ...overrides,
  };
}

/** Carrega tudo que o dashboard e a agenda precisam. */
export async function loadStudioData() {
  const [appointments, clients, professionals, offerings] = await Promise.all([
    appointmentsApi.list(),
    clientsApi.list(),
    professionalsApi.list(),
    offeringsApi.list(),
  ]);
  return { appointments, clients, professionals, offerings };
}

export type StudioData = Awaited<ReturnType<typeof loadStudioData>>;
